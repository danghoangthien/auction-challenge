import axios from 'axios';
import BigNumber from "bignumber.js";

import * as redis from './redisConnection';
import * as constants from "./constant";

const WETH_DECIMALS = 18;
const WAXE_DECIMALS = 8;
const WAXPE_2_WAXP_CONVERSION_RATE = 1_000;
const UNISWAP_TIMESTAMP_DIFFERENT_RATE = 1_000;
const NUMBER_OF_DAY_BACK = 1;
const REDIS_TOTAL_VALUE_LOCKED = 'tvl';

const ethRpc = require('eth-json-rpc')(constants.INFURA_URL);

async function getTokenPrice(tokenName: string) {
    const response = await axios.get(`${constants.COINGECKO_URL}/${tokenName}`);
    return parseFloat(response?.data?.market_data?.current_price?.usd);
}

async function getTotalSupply() {
    const res = await ethRpc.eth.call({
        methodSignature: 'totalSupply()',
        to: constants.WAXE_ETH_TOKEN_CONTRACT
    }).catch(err => {
        console.log(`totalSupply err`, err);
    });

    return ethRpc.utils.decodeRawOutput(['uint256'], res.replace('0x', ''));
}

async function getBalanceOf() {
    const res = await ethRpc.eth.call({
        methodSignature: 'balanceOf(address)',
        to: constants.WAXE_ETH_TOKEN_CONTRACT,
        args: [constants.WEAP_BRIDGE_CONTRACT]
    }).catch(err => {
        console.log(`balanceOfResponse err`, err);
    });

    return  ethRpc.utils.decodeRawOutput(['uint256'], res.replace('0x', ''));
}

async function getReserves() {
    const res = await ethRpc.eth.call({
        methodSignature: 'getReserves()',
        to: constants.WAXE_ETH_TOKEN_CONTRACT
    }).catch(err => {
        console.log(`reservesResponse err`, err);
    });

    return  ethRpc.utils.decodeRawOutput(['uint112', 'uint112', 'uint32'], res.replace('0x', ''));
}

async function getTotalValueLockedValue() {
    const tvl = await redis.get(REDIS_TOTAL_VALUE_LOCKED);
    if(!tvl) {
        const totalSupplyResponse = await getTotalSupply();
        const totalSupply = new BigNumber(totalSupplyResponse || 0).div(Math.pow(10, WETH_DECIMALS));

        const balanceOfResponse = await getBalanceOf();
        const lpTokenStaking = new BigNumber(balanceOfResponse || 0).div(Math.pow(10, WETH_DECIMALS));

        const reservesResponse = await getReserves();
        const [waxeBalanceResponse, wethBalanceResponse] = reservesResponse;
        const waxeBalance = new BigNumber(waxeBalanceResponse || 0);
        const wethBalance = new BigNumber(wethBalanceResponse || 0);
        const waxePrice = await getTokenPrice('waxe');
        const wethPrice = await getTokenPrice('weth');

        const waxeValue = waxeBalance.times(waxePrice).div(Math.pow(10, WAXE_DECIMALS));
        const wethValue = wethBalance.times(wethPrice).div(Math.pow(10, WETH_DECIMALS));

        const totalLiquidity = waxeValue.plus(wethValue);

        const updateTvl = totalLiquidity
                        .div(totalSupply)
                        .times(lpTokenStaking)
                        .toFixed(8, BigNumber.ROUND_DOWN)
                        .toString()
                        .replace(/\.?0+$/, "");
        const REDIS_EXPIRED = (new Date().getTime() / 1000) + 1; // 1 day expired
        redis.expire(REDIS_TOTAL_VALUE_LOCKED, REDIS_EXPIRED);
        redis.set(REDIS_TOTAL_VALUE_LOCKED, updateTvl);

        return updateTvl;
    }
    return tvl;
}

async function getTotalTradeVolumeValue(){
    const currentTimestamp = Math.ceil(
        new Date().getTime() / UNISWAP_TIMESTAMP_DIFFERENT_RATE,
    ).toString();

    const payload = {
        query:
            '{\n pairDayDatas(first: ' +
            NUMBER_OF_DAY_BACK +
            ', orderBy: date, orderDirection: desc,\n   where: {\n     pairAddress: "' +
            constants.WAXE_ETH_TOKEN_CONTRACT +
            '",\n     date_lt: ' +
            currentTimestamp +
            '\n   }\n ) {\n     date\n     dailyVolumeToken0\n     dailyVolumeToken1\n     dailyVolumeUSD\n     reserveUSD\n }\n}',
        variables: null,
    };

    const response = await axios.post(constants.UNISWAP_V2_SUBGRAPH, payload);
    let updateDailyVolume = 0;
    if (
        response &&
        response.data.data &&
        response.data.data.pairDayDatas &&
        response.data.data.pairDayDatas.length
    ) {
        const data = response.data.data.pairDayDatas;
        data.forEach(it => {
            const { dailyVolumeUSD } = it;
            updateDailyVolume += parseFloat(dailyVolumeUSD);
        });

        updateDailyVolume = updateDailyVolume / NUMBER_OF_DAY_BACK;
        return updateDailyVolume;
    }
    return 0;
}

export {
    getTotalValueLockedValue,
    getTotalTradeVolumeValue
}