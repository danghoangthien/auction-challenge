import { LoadingOutlined } from '@ant-design/icons';

import {
  BLUE_COLOR,
  DANGER_COLOR,
  DARK_GRAY_COLOR,
  EXTRA_DARK_GRAY_COLOR,
  EXTRA_LIGHT_BLUE_COLOR,
  EXTRA_LIGHT_ORANGE_COLOR,
  EXTRA_LIGHT_PINK_COLOR,
  EXTRA_LIGHT_PRIMARY_COLOR,
  ORANGE_COLOR,
  PINK_COLOR,
  PRIMARY_ADMIN_COLOR,
  PRIMARY_BLUE_COLOR,
  PRIMARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from 'styles/StyleConstants';

export const LIST_MODE = 0;
export const DETAIL_MODE = 1;
export const EDIT_MODE = 2;

export const YEAR_LIST = new Date().getFullYear() - 1900;
export const CURRENT_YEAR = new Date().getFullYear() + 1;
export const DATE_FORMAT = 'YYYY-MM-DD';

// VALIDATIONS
// 団体名（カナ表記）
export const REGEX_名_カナ表記 = /^[ァ-ヶー]+$/;
export const REGEX_名_カナ表記_MSG = '全角カタカナで入力して下さい。';

// 郵便番号
export const REGEX_郵便番号 = /^[0-9]+$/;
export const REGEX_郵便番号_MSG = '半角数字7桁（ハイフンなし）で入力してください。';

export const REGEX_NUMBER = /^[0-9]+$/;
export const REGEX_NUMBER_MSG = '半角数字で入力してください。';

export const REGEX_NUMBER_WITH_HYPHEN = /^[0-9-]+$/;
export const REGEX_NUMBER_WITH_HYPHEN_MSG = '半角数字で入力してください。';

export const REGEX_TEL_NUM = /^[0-9+]+$/;
export const REGEX_TEL_NUM_MSG = '半角数字（ハイフンなし）で入力でしてください。';

// eslint-disable-next-line no-irregular-whitespace
export const ZENKAKU_REGEX_KATAKANA = /^[ァ-ヶ　゛゜0-9ー「」、]+$/;
export const ZENKAKU_KATAKANA_ERR_MSG = '全角カタカナで入力してください。';

// 丁目・番地・建物名・部屋番号（カナ）
export const REGEX_番地以降カナ = /^[ァ-ヶ０-９ー0-9a-zA-Zａ-ｚＡ-Ｚ\-　\s]+$/u;
export const REGEX_番地以降カナ_MSG = '漢字・ひらがなはご利用いただけません.';
export const REGEX_番地以降カナ_required_MSG = '丁目以降(カナ)を入力してください。';

// 口座名義
export const REGEX_口座名義 = /^[ァ-ヶ0-9a-zA-Z\-()（）.ー]+$/u;
export const REGEX_口座名義_MSG = '全角カタカナで入力してください。';

// 口座番号
export const REGEX_口座番号 = /^[0-9]+$/;
export const REGEX_口座番号_MSG = '半角数字7ケタで入力してください。';

export const REGEX_EMAIL =
  /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export const REGEX_PW = /^[A-Za-z0-9_!@./#&+-]*$/;

// ICON
export const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function generateArray(min, max, flow = 'asc') {
  let result = [];

  if (flow === 'des') {
    for (let i = max; i >= min; i--) {
      result.push(i);
    }
  } else {
    for (let e = min; e <= max; e++) {
      result.push(e);
    }
  }
  return result;
}

const years = generateArray(new Date().getFullYear() - 150, new Date().getFullYear(), 'des');
const months = generateArray(1, 12);
const days = generateArray(1, 31);

export const YEAR_RANGE = years.map(item => {
  return {
    value: item,
    label: `${item}`,
  };
});

export const MONTH_RANGE = months.map(item => {
  return {
    value: item,
    label: `${item}`,
  };
});

export const DAY_RANGE = days.map(item => {
  return {
    value: item,
    label: `${item}`,
  };
});

const RECEIPT_METHODS = {
  1: 'カード決済',
  2: '銀行振込',
  3: '手渡し',
};

const DONATION_TYPES = {
  1: ['単発', '#E9F1FA', '#94BCE5', '#2878CB'], // background, border, color
  2: ['毎月', '#FCF0EB', '#EFB29B', '#DE6536'],
  3: ['毎年', '#FBEAF4', '#EA96C6', '#D42C8E'],
};

const DONATION_TYPE_CLASSES = {
  1: 'once',
  2: 'monthly',
  3: 'yearly',
};

const DONATION_TYPES_TEXT = {
  1: '単発',
  2: '毎月',
  3: '毎年',
};

const DONATION_STATUSES = {
  1: ['継続中', SUCCESS_COLOR],
  2: ['解約', DARK_GRAY_COLOR],
  3: ['再決済待ち', WARNING_COLOR],
};

export const RECCURING_ONGOING_STATUS = '1';
export const RECCURING_WAITING_STATUS = '3';
export const RECCURING_CANCEL_STATUS = '2';

const PROJECT_TYPES = {
  1: ['ベーシック', '#EFF7EB', '#B1D999', '#63B233'],
  2: ['クラウドファンディング', '#E9F1FA', '#94BCE5', '#2878CB'],
  3: ['マンスリーファンディング', '#F9EAEA', '#E39599', '#C72A32'],
};

const PROJECT_PAYMENT_TYPES = {
  1: ['銀行振込', '#DB3333'],
  2: ['Stripe決済', '#635BFF'],
  3: ['テレコム決済', '#DB3333'],
  4: ['手入力', '#DB3333'],
};

const PROJECT_STATUSES = {
  1: ['公開中', PRIMARY_COLOR],
  2: ['非公開', EXTRA_DARK_GRAY_COLOR],
  3: ['下書き', EXTRA_DARK_GRAY_COLOR],
  4: ['プレビュー', EXTRA_DARK_GRAY_COLOR],
  5: ['審査中', WARNING_COLOR],
  6: ['非公開(引継済)', EXTRA_DARK_GRAY_COLOR],
  7: ['公開保留', EXTRA_DARK_GRAY_COLOR],
};

const PROJECT_STATUS_CLASSES = {
  1: 'public',
  2: 'review',
  3: 'non-public',
  4: 'non-public',
};

const ADMIN_PROJECT_STATUSES = {
  1: ['公開', SUCCESS_COLOR],
  2: ['審査待ち', WARNING_COLOR],
  3: ['非公開', DARK_GRAY_COLOR],
  // 4: ['非公開（引継済）', DARK_GRAY_COLOR],
};

const USER_STATUSES = {
  1: ['有効', SUCCESS_COLOR],
  2: ['無効', DARK_GRAY_COLOR],
};

const PROJECT_TARGETS = {
  1: '設定しない',
  2: '金額',
  3: 'サポーター数',
};

const RECEIPT_STATUSES = {
  1: ['未発行', WARNING_COLOR],
  2: ['発行済み', SUCCESS_COLOR],
  3: ['無効', DARK_GRAY_COLOR],
};

const PLANS = {
  0: '-',
  1: 'ゴールドサポーター',
  2: 'シルバーサポーター',
  3: '賛助会員（都度更新）',
  4: '正会員（自動更新）',
};

const REGISTER_ROUTES = {
  1: 'コングラント経由',
  2: '手動入力',
  3: 'インポート',
};

// 審査ステータス
const INSPECT_STATUES = {
  1: [
    '審査情報未入力',
    ORANGE_COLOR,
    EXTRA_LIGHT_ORANGE_COLOR,
    <>
      必要事項を登録して
      <br />
      審査を開始してください
    </>,
    '審査情報の登録へ進む',
    '/app/verification',
  ],
  2: [
    '審査中',
    BLUE_COLOR,
    EXTRA_LIGHT_BLUE_COLOR,
    <>
      審査完了を待つ間に
      <br />
      プロジェクトページを作成しましょう
    </>,
    'プロジェクトの作成',
    '/app/projects',
  ],
  3: [
    '審査保留',
    BLUE_COLOR,
    EXTRA_LIGHT_BLUE_COLOR,
    <></>,
    '審査情報の登録へ進む',
    '/app/verification',
  ],
  5: [
    '審査完了',
    PRIMARY_COLOR,
    EXTRA_LIGHT_PRIMARY_COLOR,
    <>
      審査が完了しました
      <br />
      プロジェクトページを公開しましょう
    </>,
    'プロジェクト',
    '/app/projects',
  ],
};

// 現在のプラン
const CONTRACT_PLANS = {
  1: ['お試し中', PINK_COLOR, EXTRA_LIGHT_PINK_COLOR],
  2: ['フリープラン', PRIMARY_COLOR, EXTRA_LIGHT_PRIMARY_COLOR],
  3: ['ライトプラン', BLUE_COLOR, EXTRA_LIGHT_BLUE_COLOR],
  4: ['スタンダードプラン', ORANGE_COLOR, EXTRA_LIGHT_ORANGE_COLOR],
};

// 契約ステータス
const CONTRACT_STATUES = {
  1: [
    <>
      <span style={{ color: DANGER_COLOR }}>プラン未選択</span>
    </>,
  ],
  2: ['契約中'],
  3: [
    <>
      <span style={{ color: DANGER_COLOR }}>更新が必要です</span>
    </>,
  ],
  4: ['更新済み'],
  5: ['自動更新予定'],
  6: ['フリープランへの変更を受け付けました'],
};

const CONTRACT_PLAN_STATUSES = {
  1: ['利用中', SUCCESS_COLOR],
  2: ['開始前', WARNING_COLOR],
  3: ['終了', DARK_GRAY_COLOR],
};

// CG審査
const VERIFICATIONS = {
  0: ['未入力', DARK_GRAY_COLOR],
  1: ['OK', SUCCESS_COLOR],
  2: ['NG', DANGER_COLOR],
  3: ['審査中', PRIMARY_BLUE_COLOR],
  4: ['保留', WARNING_COLOR],
  5: ['利用可能', SUCCESS_COLOR],
  6: ['対象外', ''],
};

// St審査
const ST_VERIFICATION = {
  1: ['OK', SUCCESS_COLOR],
  2: ['保留', WARNING_COLOR],
  3: ['対象外', ''],
};

// 再審査
const RE_VERIFICATION_STATUS = {
  1: ['St審査中', PRIMARY_ADMIN_COLOR],
  2: ['CG審査中', PRIMARY_ADMIN_COLOR],
  3: ['利用制限中', DANGER_COLOR],
  4: ['St保留', WARNING_COLOR],
  5: ['CG保留', WARNING_COLOR],
};

// 審査状況
const VERIFICATION_STATUS = {
  1: ['StOK', SUCCESS_COLOR],
  2: ['審査中', '#1890FF'],
  3: ['NG', DANGER_COLOR],
  4: ['TelOK', SUCCESS_COLOR],
};

// お知らせステータス
const NEWS_STATUSES = {
  1: ['公開', SUCCESS_COLOR],
  2: ['非公開', DARK_GRAY_COLOR],
};

// お知らせステータス
const AMOUNT_STATUSES = {
  1: ['変更完了', SUCCESS_COLOR],
  2: ['保留', WARNING_COLOR],
  3: ['未完了', DARK_GRAY_COLOR],
};

// お知らせステータス
const MAIL_STATUSES = {
  1: ['送信済み', SUCCESS_COLOR],
  2: ['550エラー', DANGER_COLOR],
};

// 利用中の決済
const USING_PAYMENT = {
  1: ['Stripe', '#635BFF'],
  2: ['テレコム', '#DB3333'],
};

// お知らせタッグ
const NEWS_TAGS = {
  1: ['アップデート'],
  2: ['お知らせ'],
};

const 法人格タイプ = [
  {
    value: '1',
    label: '特定非営利活動法人',
  },
  {
    value: '9',
    label: '認定特定非営利活動法人',
  },
  {
    value: '17',
    label: '一般社団法人',
  },
  {
    value: '15',
    label: '一般財団法人',
  },
  {
    value: '18',
    label: '公益社団法人',
  },
  {
    value: '16',
    label: '公益財団法人',
  },
  {
    value: '3',
    label: '医療法人社団',
  },
  {
    value: '4',
    label: '医療法人財団',
  },
  {
    value: '5',
    label: '独立行政法人',
  },
  {
    value: '6',
    label: '社会医療法人',
  },
  {
    value: '7',
    label: '社会福祉法人',
  },
  {
    value: '8',
    label: '政治団体',
  },
  {
    value: '10',
    label: '株式会社',
  },
  {
    value: '11',
    label: '有限会社',
  },
  {
    value: '12',
    label: '合名会社',
  },
  {
    value: '13',
    label: '合資会社',
  },
  {
    value: '14',
    label: '合同会社',
  },
  {
    value: '19',
    label: '宗教法人',
  },
  {
    value: '20',
    label: '学校法人',
  },
  {
    value: '21',
    label: '相互会社',
  },
  {
    value: '22',
    label: '更生保護法人',
  },
  {
    value: '23',
    label: '地方独立行政法人',
  },
  {
    value: '24',
    label: '弁護士法人',
  },
  {
    value: '25',
    label: '行政書士法人',
  },
  {
    value: '26',
    label: '司法書士法人',
  },
  {
    value: '27',
    label: '税理士法人',
  },
  {
    value: '28',
    label: '国立大学法人',
  },
  {
    value: '29',
    label: '公立大学法人',
  },
  {
    value: '30',
    label: '農業組合法人',
  },
  {
    value: '31',
    label: '管理組合法人',
  },
  {
    value: '33',
    label: '社会保険労務士法人',
  },
  {
    value: '34',
    label: '労働組合法人',
  },
  {
    value: '35',
    label: '地方自治体',
  },
  {
    value: '36',
    label: 'その他の法人',
  },
];

const 活動カテゴリタイプ = {
  1: 'こども支援',
  2: '動物・ペット支援',
  3: '災害・復興支援',
  4: '医療・福祉',
  5: '国際協力',
  6: '地域活性化',
  7: '文化・スポーツ振興',
  8: '教育支援',
  9: '人権・平和活動',
  10: '環境問題',
  11: '中間支援',
  12: '従業員寄付',
  13: '政治活動',
  14: 'その他',
};

const 都道府県タイプ = {
  1: '北海道',
  2: '青森県',
  3: '岩手県',
  4: '宮城県',
  5: '秋田県',
  6: '山形県',
  7: '福島県',
  8: '茨城県',
  9: '栃木県',
  10: '群馬県',
  11: '埼玉県',
  12: '千葉県',
  13: '東京都',
  14: '神奈川県',
  15: '新潟県',
  16: '富山県',
  17: '石川県',
  18: '福井県',
  19: '山梨県',
  20: '長野県',
  21: '岐阜県',
  22: '静岡県',
  23: '愛知県',
  24: '三重県',
  25: '滋賀県',
  26: '京都府',
  27: '大阪府',
  28: '兵庫県',
  29: '奈良県',
  30: '和歌山県',
  31: '鳥取県',
  32: '島根県',
  33: '岡山県',
  34: '広島県',
  35: '山口県',
  36: '徳島県',
  37: '香川県',
  38: '愛媛県',
  39: '高知県',
  40: '福岡県',
  41: '佐賀県',
  42: '長崎県',
  43: '熊本県',
  44: '大分県',
  45: '宮崎県',
  46: '鹿児島県',
  47: '沖縄県',
};

const 都道府県タイプ_カタカナ = {
  1: 'ホッカイドウ',
  2: 'アオモリケン',
  3: 'イワテケン',
  4: 'ミヤギケン',
  5: 'アキタケン',
  6: 'ヤマガタケン',
  7: 'フクシマケン',
  8: 'イバラキケン',
  9: 'トチギケン',
  10: 'グンマケン',
  11: 'サイタマケン',
  12: 'チバケン',
  13: 'トウキョウト',
  14: 'カナガワケン',
  15: 'ニイガタケン',
  16: 'トヤマケン',
  17: 'イシカワケン',
  18: 'フクイケン',
  19: 'ヤマナシケン',
  20: 'ナガノケン',
  21: 'ギフケン',
  22: 'シズオカケン',
  23: 'アイチケン',
  24: 'ミエケン',
  25: 'シガケン',
  26: 'キョウトフ',
  27: 'オオサカフ',
  28: 'ヒョウゴケン',
  29: 'ナラケン',
  30: 'ワカヤマケン',
  31: 'トットリケン',
  32: 'シマネケン',
  33: 'オカヤマケン',
  34: 'ヒロシマケン',
  35: 'ヤマグチケン',
  36: 'トクシマケン',
  37: 'カガワケン',
  38: 'エヒメケン',
  39: 'コウチケン',
  40: 'フクオカケン',
  41: 'サガケン',
  42: 'ナガサキケン',
  43: 'クマモトケン',
  44: 'オオイタケン',
  45: 'ミヤザキケン',
  46: 'カゴシマケン',
  47: 'オキナワケン',
};

const 法人格の有無タイプ = {
  2: '法人格あり',
  1: '法人格なし（任意団体）',
};

const 身分証明書タイプ = {
  1: '運転免許証（オモテ面・ウラ面）',
  2: '在留カード・特別永住者証明書',
  3: '住民票',
  4: '日本旅券（日本国パスポート）',
  5: 'マイナンバーカード (顔写真付き）',
};

// GENDER
const 性別タイプ = {
  1: '男性',
  2: '女性',
  3: 'その他',
  4: '無回答',
};

// 領収書タイプ
const RECEIPT_TYPES = {
  1: '都度領収書',
  2: '合計領収書',
  3: '合計領収書の明細',
};

const BANK_TYPES = {
  1: '普通',
  2: '当座',
};

const COUNTRY_OPTIONS = [
  {
    value: 'IS',
    label: 'アイスランド',
  },
  {
    value: 'IE',
    label: 'アイルランド',
  },
  {
    value: 'AZ',
    label: 'アゼルバイジャン',
  },
  {
    value: 'AF',
    label: 'アフガニスタン',
  },
  {
    value: 'US',
    label: 'アメリカ合衆国',
  },
  {
    value: 'AE',
    label: 'アラブ首長国連邦',
  },
  {
    value: 'DZ',
    label: 'アルジェリア',
  },
  {
    value: 'AR',
    label: 'アルゼンチン',
  },
  {
    value: 'AW',
    label: 'アルバ',
  },
  {
    value: 'AL',
    label: 'アルバニア',
  },
  {
    value: 'AM',
    label: 'アルメニア',
  },
  {
    value: 'AI',
    label: 'アンギラ',
  },
  {
    value: 'AO',
    label: 'アンゴラ',
  },
  {
    value: 'AG',
    label: 'アンティグア・バーブーダ',
  },
  {
    value: 'AD',
    label: 'アンドラ',
  },
  {
    value: 'YE',
    label: 'イエメン',
  },
  {
    value: 'GB',
    label: 'イギリス',
  },
  {
    value: 'IL',
    label: 'イスラエル',
  },
  {
    value: 'IT',
    label: 'イタリア',
  },
  {
    value: 'IQ',
    label: 'イラク',
  },
  {
    value: 'IR',
    label: 'イラン',
  },
  {
    value: 'IN',
    label: 'インド',
  },
  {
    value: 'ID',
    label: 'インドネシア',
  },
  {
    value: 'WF',
    label: 'ウォリス・フツナ',
  },
  {
    value: 'UG',
    label: 'ウガンダ',
  },
  {
    value: 'UA',
    label: 'ウクライナ',
  },
  {
    value: 'UZ',
    label: 'ウズベキスタン',
  },
  {
    value: 'UY',
    label: 'ウルグアイ',
  },
  {
    value: 'EC',
    label: 'エクアドル',
  },
  {
    value: 'EG',
    label: 'エジプト',
  },
  {
    value: 'EE',
    label: 'エストニア',
  },
  {
    value: 'SZ',
    label: 'エスワティニ',
  },
  {
    value: 'ET',
    label: 'エチオピア',
  },
  {
    value: 'ER',
    label: 'エリトリア',
  },
  {
    value: 'SV',
    label: 'エルサルバドル',
  },
  {
    value: 'AU',
    label: 'オーストラリア',
  },
  {
    value: 'AT',
    label: 'オーストリア',
  },
  {
    value: 'AX',
    label: 'オーランド諸島',
  },
  {
    value: 'OM',
    label: 'オマーン',
  },
  {
    value: 'NL',
    label: 'オランダ',
  },
  {
    value: 'BQ',
    label: 'オランダ領カリブ',
  },
  {
    value: 'GH',
    label: 'ガーナ',
  },
  {
    value: 'CV',
    label: 'カーボベルデ',
  },
  {
    value: 'GG',
    label: 'ガーンジー',
  },
  {
    value: 'GY',
    label: 'ガイアナ',
  },
  {
    value: 'KZ',
    label: 'カザフスタン',
  },
  {
    value: 'QA',
    label: 'カタール',
  },
  {
    value: 'CA',
    label: 'カナダ',
  },
  {
    value: 'GA',
    label: 'ガボン',
  },
  {
    value: 'CM',
    label: 'カメルーン',
  },
  {
    value: 'GM',
    label: 'ガンビア',
  },
  {
    value: 'KH',
    label: 'カンボジア',
  },
  {
    value: 'GN',
    label: 'ギニア',
  },
  {
    value: 'GW',
    label: 'ギニアビサウ',
  },
  {
    value: 'CY',
    label: 'キプロス',
  },
  {
    value: 'CU',
    label: 'キューバ',
  },
  {
    value: 'CW',
    label: 'キュラソー',
  },
  {
    value: 'GR',
    label: 'ギリシャ',
  },
  {
    value: 'KI',
    label: 'キリバス',
  },
  {
    value: 'KG',
    label: 'キルギス',
  },
  {
    value: 'GT',
    label: 'グアテマラ',
  },
  {
    value: 'GP',
    label: 'グアドループ',
  },
  {
    value: 'GU',
    label: 'グアム',
  },
  {
    value: 'KW',
    label: 'クウェート',
  },
  {
    value: 'CK',
    label: 'クック諸島',
  },
  {
    value: 'GL',
    label: 'グリーンランド',
  },
  {
    value: 'CX',
    label: 'クリスマス島',
  },
  {
    value: 'GD',
    label: 'グレナダ',
  },
  {
    value: 'HR',
    label: 'クロアチア',
  },
  {
    value: 'KY',
    label: 'ケイマン諸島',
  },
  {
    value: 'KE',
    label: 'ケニア',
  },
  {
    value: 'CI',
    label: 'コートジボワール',
  },
  {
    value: 'CC',
    label: 'ココス(キーリング)諸島',
  },
  {
    value: 'CR',
    label: 'コスタリカ',
  },
  {
    value: 'KM',
    label: 'コモロ',
  },
  {
    value: 'CO',
    label: 'コロンビア',
  },
  {
    value: 'CG',
    label: 'コンゴ共和国(ブラザビル)',
  },
  {
    value: 'CD',
    label: 'コンゴ民主共和国(キンシャサ)',
  },
  {
    value: 'SA',
    label: 'サウジアラビア',
  },
  {
    value: 'GS',
    label: 'サウスジョージア・サウスサンドウィッチ諸島',
  },
  {
    value: 'WS',
    label: 'サモア',
  },
  {
    value: 'BL',
    label: 'サン・バルテルミー',
  },
  {
    value: 'MF',
    label: 'サン・マルタン',
  },
  {
    value: 'ST',
    label: 'サントメ・プリンシペ',
  },
  {
    value: 'ZM',
    label: 'ザンビア',
  },
  {
    value: 'PM',
    label: 'サンピエール島・ミクロン島',
  },
  {
    value: 'SM',
    label: 'サンマリノ',
  },
  {
    value: 'SL',
    label: 'シエラレオネ',
  },
  {
    value: 'DJ',
    label: 'ジブチ',
  },
  {
    value: 'GI',
    label: 'ジブラルタル',
  },
  {
    value: 'JE',
    label: 'ジャージー',
  },
  {
    value: 'JM',
    label: 'ジャマイカ',
  },
  {
    value: 'GE',
    label: 'ジョージア',
  },
  {
    value: 'SY',
    label: 'シリア',
  },
  {
    value: 'SG',
    label: 'シンガポール',
  },
  {
    value: 'SX',
    label: 'シント・マールテン',
  },
  {
    value: 'ZW',
    label: 'ジンバブエ',
  },
  {
    value: 'CH',
    label: 'スイス',
  },
  {
    value: 'SE',
    label: 'スウェーデン',
  },
  {
    value: 'SD',
    label: 'スーダン',
  },
  {
    value: 'SJ',
    label: 'スバールバル諸島・ヤンマイエン島',
  },
  {
    value: 'ES',
    label: 'スペイン',
  },
  {
    value: 'SR',
    label: 'スリナム',
  },
  {
    value: 'LK',
    label: 'スリランカ',
  },
  {
    value: 'SK',
    label: 'スロバキア',
  },
  {
    value: 'SI',
    label: 'スロベニア',
  },
  {
    value: 'SC',
    label: 'セーシェル',
  },
  {
    value: 'SN',
    label: 'セネガル',
  },
  {
    value: 'RS',
    label: 'セルビア',
  },
  {
    value: 'KN',
    label: 'セントクリストファー・ネーヴィス',
  },
  {
    value: 'VC',
    label: 'セントビンセント及びグレナディーン諸島',
  },
  {
    value: 'SH',
    label: 'セントヘレナ',
  },
  {
    value: 'LC',
    label: 'セントルシア',
  },
  {
    value: 'SO',
    label: 'ソマリア',
  },
  {
    value: 'SB',
    label: 'ソロモン諸島',
  },
  {
    value: 'TC',
    label: 'タークス・カイコス諸島',
  },
  {
    value: 'TH',
    label: 'タイ',
  },
  {
    value: 'TJ',
    label: 'タジキスタン',
  },
  {
    value: 'TZ',
    label: 'タンザニア',
  },
  {
    value: 'CZ',
    label: 'チェコ',
  },
  {
    value: 'TD',
    label: 'チャド',
  },
  {
    value: 'TN',
    label: 'チュニジア',
  },
  {
    value: 'CL',
    label: 'チリ',
  },
  {
    value: 'TV',
    label: 'ツバル',
  },
  {
    value: 'DK',
    label: 'デンマーク',
  },
  {
    value: 'DE',
    label: 'ドイツ',
  },
  {
    value: 'TG',
    label: 'トーゴ',
  },
  {
    value: 'TK',
    label: 'トケラウ',
  },
  {
    value: 'DO',
    label: 'ドミニカ共和国',
  },
  {
    value: 'DM',
    label: 'ドミニカ国',
  },
  {
    value: 'TT',
    label: 'トリニダード・トバゴ',
  },
  {
    value: 'TM',
    label: 'トルクメニスタン',
  },
  {
    value: 'TR',
    label: 'トルコ',
  },
  {
    value: 'TO',
    label: 'トンガ',
  },
  {
    value: 'NG',
    label: 'ナイジェリア',
  },
  {
    value: 'NR',
    label: 'ナウル',
  },
  {
    value: 'NA',
    label: 'ナミビア',
  },
  {
    value: 'NU',
    label: 'ニウエ',
  },
  {
    value: 'NI',
    label: 'ニカラグア',
  },
  {
    value: 'NE',
    label: 'ニジェール',
  },
  {
    value: 'NC',
    label: 'ニューカレドニア',
  },
  {
    value: 'NZ',
    label: 'ニュージーランド',
  },
  {
    value: 'NP',
    label: 'ネパール',
  },
  {
    value: 'NF',
    label: 'ノーフォーク島',
  },
  {
    value: 'NO',
    label: 'ノルウェー',
  },
  {
    value: 'HM',
    label: 'ハード島・マクドナルド諸島',
  },
  {
    value: 'BH',
    label: 'バーレーン',
  },
  {
    value: 'HT',
    label: 'ハイチ',
  },
  {
    value: 'PK',
    label: 'パキスタン',
  },
  {
    value: 'VA',
    label: 'バチカン市国',
  },
  {
    value: 'PA',
    label: 'パナマ',
  },
  {
    value: 'VU',
    label: 'バヌアツ',
  },
  {
    value: 'BS',
    label: 'バハマ',
  },
  {
    value: 'PG',
    label: 'パプアニューギニア',
  },
  {
    value: 'BM',
    label: 'バミューダ',
  },
  {
    value: 'PW',
    label: 'パラオ',
  },
  {
    value: 'PY',
    label: 'パラグアイ',
  },
  {
    value: 'BB',
    label: 'バルバドス',
  },
  {
    value: 'PS',
    label: 'パレスチナ自治区',
  },
  {
    value: 'HU',
    label: 'ハンガリー',
  },
  {
    value: 'BD',
    label: 'バングラデシュ',
  },
  {
    value: 'PN',
    label: 'ピトケアン諸島',
  },
  {
    value: 'FJ',
    label: 'フィジー',
  },
  {
    value: 'PH',
    label: 'フィリピン',
  },
  {
    value: 'FI',
    label: 'フィンランド',
  },
  {
    value: 'BT',
    label: 'ブータン',
  },
  {
    value: 'BV',
    label: 'ブーベ島',
  },
  {
    value: 'PR',
    label: 'プエルトリコ',
  },
  {
    value: 'FO',
    label: 'フェロー諸島',
  },
  {
    value: 'FK',
    label: 'フォークランド諸島',
  },
  {
    value: 'BR',
    label: 'ブラジル',
  },
  {
    value: 'FR',
    label: 'フランス',
  },
  {
    value: 'BG',
    label: 'ブルガリア',
  },
  {
    value: 'BF',
    label: 'ブルキナファソ',
  },
  {
    value: 'BN',
    label: 'ブルネイ',
  },
  {
    value: 'BI',
    label: 'ブルンジ',
  },
  {
    value: 'VN',
    label: 'ベトナム',
  },
  {
    value: 'BJ',
    label: 'ベナン',
  },
  {
    value: 'VE',
    label: 'ベネズエラ',
  },
  {
    value: 'BY',
    label: 'ベラルーシ',
  },
  {
    value: 'BZ',
    label: 'ベリーズ',
  },
  {
    value: 'PE',
    label: 'ペルー',
  },
  {
    value: 'BE',
    label: 'ベルギー',
  },
  {
    value: 'PL',
    label: 'ポーランド',
  },
  {
    value: 'BA',
    label: 'ボスニア・ヘルツェゴビナ',
  },
  {
    value: 'BW',
    label: 'ボツワナ',
  },
  {
    value: 'BO',
    label: 'ボリビア',
  },
  {
    value: 'PT',
    label: 'ポルトガル',
  },
  {
    value: 'HN',
    label: 'ホンジュラス',
  },
  {
    value: 'MH',
    label: 'マーシャル諸島',
  },
  {
    value: 'MG',
    label: 'マダガスカル',
  },
  {
    value: 'YT',
    label: 'マヨット',
  },
  {
    value: 'MW',
    label: 'マラウイ',
  },
  {
    value: 'ML',
    label: 'マリ',
  },
  {
    value: 'MT',
    label: 'マルタ',
  },
  {
    value: 'MQ',
    label: 'マルティニーク',
  },
  {
    value: 'MY',
    label: 'マレーシア',
  },
  {
    value: 'IM',
    label: 'マン島',
  },
  {
    value: 'FM',
    label: 'ミクロネシア連邦',
  },
  {
    value: 'MM',
    label: 'ミャンマー (ビルマ)',
  },
  {
    value: 'MX',
    label: 'メキシコ',
  },
  {
    value: 'MU',
    label: 'モーリシャス',
  },
  {
    value: 'MR',
    label: 'モーリタニア',
  },
  {
    value: 'MZ',
    label: 'モザンビーク',
  },
  {
    value: 'MC',
    label: 'モナコ',
  },
  {
    value: 'MV',
    label: 'モルディブ',
  },
  {
    value: 'MD',
    label: 'モルドバ',
  },
  {
    value: 'MA',
    label: 'モロッコ',
  },
  {
    value: 'MN',
    label: 'モンゴル',
  },
  {
    value: 'ME',
    label: 'モンテネグロ',
  },
  {
    value: 'MS',
    label: 'モントセラト',
  },
  {
    value: 'JO',
    label: 'ヨルダン',
  },
  {
    value: 'LA',
    label: 'ラオス',
  },
  {
    value: 'LV',
    label: 'ラトビア',
  },
  {
    value: 'LT',
    label: 'リトアニア',
  },
  {
    value: 'LY',
    label: 'リビア',
  },
  {
    value: 'LI',
    label: 'リヒテンシュタイン',
  },
  {
    value: 'LR',
    label: 'リベリア',
  },
  {
    value: 'RO',
    label: 'ルーマニア',
  },
  {
    value: 'LU',
    label: 'ルクセンブルク',
  },
  {
    value: 'RW',
    label: 'ルワンダ',
  },
  {
    value: 'LS',
    label: 'レソト',
  },
  {
    value: 'LB',
    label: 'レバノン',
  },
  {
    value: 'RE',
    label: 'レユニオン',
  },
  {
    value: 'RU',
    label: 'ロシア',
  },
  {
    value: 'IO',
    label: '英領インド洋地域',
  },
  {
    value: 'VG',
    label: '英領ヴァージン諸島',
  },
  {
    value: 'KR',
    label: '韓国',
  },
  {
    value: 'UM',
    label: '合衆国領有小離島',
  },
  {
    value: 'EH',
    label: '西サハラ',
  },
  {
    value: 'GQ',
    label: '赤道ギニア',
  },
  {
    value: 'TW',
    label: '台湾',
  },
  {
    value: 'CF',
    label: '中央アフリカ共和国',
  },
  {
    value: 'MO',
    label: '中華人民共和国マカオ特別行政区',
  },
  {
    value: 'HK',
    label: '中華人民共和国香港特別行政区',
  },
  {
    value: 'CN',
    label: '中国',
  },
  {
    value: 'TL',
    label: '東ティモール',
  },
  {
    value: 'ZA',
    label: '南アフリカ',
  },
  {
    value: 'SS',
    label: '南スーダン',
  },
  {
    value: 'AQ',
    label: '南極',
  },
  {
    value: 'JP',
    label: '日本',
  },
  {
    value: 'GF',
    label: '仏領ギアナ',
  },
  {
    value: 'PF',
    label: '仏領ポリネシア',
  },
  {
    value: 'TF',
    label: '仏領極南諸島',
  },
  {
    value: 'VI',
    label: '米領ヴァージン諸島',
  },
  {
    value: 'AS',
    label: '米領サモア',
  },
  {
    value: 'MK',
    label: '北マケドニア',
  },
  {
    value: 'MP',
    label: '北マリアナ諸島',
  },
  {
    value: 'KP',
    label: '北朝鮮',
  },
];

const USER_VERIFICATION_STATUS = {
  1: ['審査情報未入力', EXTRA_LIGHT_ORANGE_COLOR, ORANGE_COLOR],
  2: ['審査中', EXTRA_LIGHT_BLUE_COLOR, BLUE_COLOR],
  5: ['審査完了', EXTRA_LIGHT_PRIMARY_COLOR, PRIMARY_COLOR],
};

const [INPUT_STATUS_REQUIRED, INPUT_STATUS_OPTIONAL, INPUT_STATUS_HIDDEN] = ['1', '2', '3'];

const INPUT_STATUS = {
  [INPUT_STATUS_REQUIRED]: {
    LABEL: '必須',
  },
  [INPUT_STATUS_OPTIONAL]: {
    LABEL: '任意',
  },
  [INPUT_STATUS_HIDDEN]: {
    LABEL: '非表示',
  },
};

export {
  PLANS,
  RECEIPT_METHODS,
  DONATION_TYPES,
  DONATION_TYPES_TEXT,
  DONATION_TYPE_CLASSES,
  DONATION_STATUSES,
  RECEIPT_STATUSES,
  PROJECT_TYPES,
  PROJECT_PAYMENT_TYPES,
  PROJECT_STATUSES,
  PROJECT_STATUS_CLASSES,
  PROJECT_TARGETS,
  REGISTER_ROUTES,
  INSPECT_STATUES,
  CONTRACT_PLANS,
  CONTRACT_STATUES,
  // CG_VERIFICATION,
  ST_VERIFICATION,
  VERIFICATION_STATUS,
  RE_VERIFICATION_STATUS,
  NEWS_STATUSES,
  MAIL_STATUSES,
  USING_PAYMENT,
  CONTRACT_PLAN_STATUSES,
  ADMIN_PROJECT_STATUSES,
  USER_STATUSES,
  AMOUNT_STATUSES,
  NEWS_TAGS,
  VERIFICATIONS,
  法人格タイプ,
  活動カテゴリタイプ,
  都道府県タイプ,
  都道府県タイプ_カタカナ,
  法人格の有無タイプ,
  身分証明書タイプ,
  性別タイプ,
  RECEIPT_TYPES,
  BANK_TYPES,
  COUNTRY_OPTIONS,
  USER_VERIFICATION_STATUS,
  INPUT_STATUS,
  INPUT_STATUS_REQUIRED,
  INPUT_STATUS_OPTIONAL,
  INPUT_STATUS_HIDDEN,
};
