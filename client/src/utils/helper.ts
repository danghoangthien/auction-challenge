import axios from 'axios';
import { push } from 'connected-react-router';
import Cookies from 'cookies-js';
import heic2any from 'heic2any';
import moment from 'moment';

import {
  errorMessageHandler,
  errorNotifyHandler,
  successMessageHandler,
} from 'utils/notifyHandler';

const { REACT_APP_POSTCODE_KEY: POSTCODE_KEY } = process.env;

const createCsvDownload = (header, data, fileName = 'data.csv') => {
  let csv_str = header.join(',');
  csv_str += `\n`;
  csv_str += data.join('\n');
  console.log(csv_str);
  var downloadLink = document.createElement('a');
  var blob = new Blob(['\uFEFF' + csv_str], {
    type: 'text/csv; charset=utf-8',
  });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

async function* gCountDown(counter, sleepMs = 1_000) {
  while (counter >= 0) {
    await sleep(sleepMs);
    yield counter--;
  }
}

async function* gInterval(sleepMs = 1_000) {
  let id = 1;
  while (true) {
    await sleep(sleepMs);
    yield id++;
  }
}

const randomOutput = arr => arr[Math.floor(Math.random() * arr.length)];

function hexToRgbA(hex: string, opactity = null) {
  var c: any;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opactity || 1})`;
  }
  return '';
}

function hexToRgbObj(hex: string, a = 1) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return {
    r,
    g,
    b,
    a,
  };
}

const getAccessToken = () => Cookies.get('access_token') || null;

const deleteAccessToken = () => getAccessToken() && Cookies.expire('access_token');

const getLocalUser = () => JSON.parse(`${localStorage.getItem('userInfo')}`);
const getLocalOrganizationInfo = () => JSON.parse(`${localStorage.getItem('organizationInfo')}`);

const getCongrantId = () =>
  JSON.parse(`${localStorage.getItem('userInfo')}`)?.団体情報?.コングラントID;

const getVerificationStatus = () =>
  JSON.parse(`${localStorage.getItem('userInfo')}`)?.団体情報?.editable.利用審査;

const removeFalsyElement = object => {
  const newObject = {};
  Object.keys(object).forEach(key => {
    if (object[key]) {
      newObject[key] = object[key];
    }
  });
  return newObject;
};

const checkMinValue = (_, value) => {
  if (value.number < value) {
    return Promise.resolve();
  }
  return Promise.reject(new Error(`${value}以上入力してください。`));
};

const removeHyphen = val => {
  const newVal = val.replace(/[-]/g, '');
  console.log(newVal);
  return newVal;
};

const checkAge = ({ value, name }) => {
  const age = moment().diff(value, 'years');
  if (age < 13) {
    return Promise.reject(new Error(`${name}は13歳以上である必要があります。`));
  } else {
    return Promise.resolve();
  }
};

export function isHeicFile(file: File) {
  return new Promise(resolve => {
    // Read the first 24 bytes of the file
    var blob = file.slice(0, 24);
    var reader = new FileReader();
    reader.readAsArrayBuffer(blob);

    // Define a callback function to check if the file is in the HEIC format
    reader.onloadend = function (event) {
      if (event.target?.readyState == FileReader.DONE) {
        var buffer = event.target.result as ArrayBuffer;
        var signature = new Uint8Array(buffer).subarray(4, 24);
        var heicSignature = new Uint8Array([
          0x66, 0x74, 0x79, 0x70, 0x6d, 0x69, 0x66, 0x31, 0x00, 0x00, 0x00, 0x00, 0x68, 0x65, 0x69,
          0x63, 0x63, 0x6f, 0x6d, 0x00,
        ]);

        // Compare the file signature with the HEIC signature
        var isHeic = true;
        for (var i = 0; i < heicSignature.length; i++) {
          if (signature[i] !== heicSignature[i]) {
            isHeic = false;
            break;
          }
        }

        // Invoke a callback function with the result of the check
        resolve(isHeic);
      }
    };
  });
}

// Define a function that takes a HEIC file and a callback function as arguments
// export function convertHeicToJpeg(file: File) {
//   return new Promise(resolve => {
//     // Create a new FileReader object
//     var reader = new FileReader();

//     // Set the onload function of the reader to convert the image to JPEG format
//     reader.onload = function (event) {
//       console.log()
//       // Create a new Image object
//       var image = new Image();

//       // Set the onload function of the image to create a canvas element and draw the image onto it
//       image.onload = function () {
//         console.log('image.onload', true);
//         // Create a new canvas element
//         var canvas = document.createElement('canvas');

//         // Set the width and height of the canvas to match the size of the image
//         canvas.width = image.width;
//         canvas.height = image.height;

//         // Get the context of the canvas
//         var ctx = canvas.getContext('2d');

//         // Draw the image onto the canvas
//         ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

//         // Convert the canvas element to a JPEG image data URL
//         var dataUrl = canvas.toDataURL('image/jpeg');

//         // Invoke the callback function with the JPEG image data URL as the argument
//         resolve(dataUrl);
//       };

//       // Set the source of the image to the HEIC image data URL
//       //image.src = event.target?.result;
//     };

//     // Read the contents of the HEIC file as a data URL
//     reader.readAsDataURL(file);
//   });
// }

export function convertHeicToJpeg(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function () {
      console.log('reader.result', reader.result);
      const blob = new Blob([reader.result as ArrayBuffer]);
      resolve(heic2any({ blob, toType: 'image/jpeg' }));
      // const img = document.createElement('img');
      // img.src = URL.createObjectURL(blob);
      // console.log('reader onload.....img.src', URL.createObjectURL(blob));
      // img.onerror = function (err) {
      //   reject(err);
      // };
      // img.onload = function () {
      //   try {
      //     console.log('onload.....');
      //     const canvas = document.createElement('canvas');
      //     canvas.width = img.width;
      //     canvas.height = img.height;
      //     const ctx = canvas.getContext('2d');
      //     ctx?.drawImage(img, 0, 0);
      //     canvas.toBlob(
      //       function (blob) {
      //         resolve(blob);
      //       },
      //       'image/jpeg',
      //       0.7,
      //     );
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      // };
    };
  });
}

export function hankana2Zenkana(str) {
  const kanaMap = {
    ｶﾞ: 'ガ',
    ｷﾞ: 'ギ',
    ｸﾞ: 'グ',
    ｹﾞ: 'ゲ',
    ｺﾞ: 'ゴ',
    ｻﾞ: 'ザ',
    ｼﾞ: 'ジ',
    ｽﾞ: 'ズ',
    ｾﾞ: 'ゼ',
    ｿﾞ: 'ゾ',
    ﾀﾞ: 'ダ',
    ﾁﾞ: 'ヂ',
    ﾂﾞ: 'ヅ',
    ﾃﾞ: 'デ',
    ﾄﾞ: 'ド',
    ﾊﾞ: 'バ',
    ﾋﾞ: 'ビ',
    ﾌﾞ: 'ブ',
    ﾍﾞ: 'ベ',
    ﾎﾞ: 'ボ',
    ﾊﾟ: 'パ',
    ﾋﾟ: 'ピ',
    ﾌﾟ: 'プ',
    ﾍﾟ: 'ペ',
    ﾎﾟ: 'ポ',
    ｳﾞ: 'ヴ',
    ﾜﾞ: 'ヷ',
    ｦﾞ: 'ヺ',
    ｱ: 'ア',
    ｲ: 'イ',
    ｳ: 'ウ',
    ｴ: 'エ',
    ｵ: 'オ',
    ｶ: 'カ',
    ｷ: 'キ',
    ｸ: 'ク',
    ｹ: 'ケ',
    ｺ: 'コ',
    ｻ: 'サ',
    ｼ: 'シ',
    ｽ: 'ス',
    ｾ: 'セ',
    ｿ: 'ソ',
    ﾀ: 'タ',
    ﾁ: 'チ',
    ﾂ: 'ツ',
    ﾃ: 'テ',
    ﾄ: 'ト',
    ﾅ: 'ナ',
    ﾆ: 'ニ',
    ﾇ: 'ヌ',
    ﾈ: 'ネ',
    ﾉ: 'ノ',
    ﾊ: 'ハ',
    ﾋ: 'ヒ',
    ﾌ: 'フ',
    ﾍ: 'ヘ',
    ﾎ: 'ホ',
    ﾏ: 'マ',
    ﾐ: 'ミ',
    ﾑ: 'ム',
    ﾒ: 'メ',
    ﾓ: 'モ',
    ﾔ: 'ヤ',
    ﾕ: 'ユ',
    ﾖ: 'ヨ',
    ﾗ: 'ラ',
    ﾘ: 'リ',
    ﾙ: 'ル',
    ﾚ: 'レ',
    ﾛ: 'ロ',
    ﾜ: 'ワ',
    ｦ: 'ヲ',
    ﾝ: 'ン',
    ｧ: 'ァ',
    ｨ: 'ィ',
    ｩ: 'ゥ',
    ｪ: 'ェ',
    ｫ: 'ォ',
    ｯ: 'ッ',
    ｬ: 'ャ',
    ｭ: 'ュ',
    ｮ: 'ョ',
    '｡': '。',
    '､': '、',
    ｰ: 'ー',
    '｢': '「',
    '｣': '」',
    '･': '・',
  };

  const reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
  return str
    .replace(reg, function (match) {
      return kanaMap[match];
    })
    .replace(/ﾞ/g, '゛')
    .replace(/ﾟ/g, '゜');
}

const resetPagination = ({ usp, pathname, dispatch }) => {
  usp.delete('page');
  dispatch(push(`${pathname}?${usp}`));
};

export const disabledFutureDate = (current, type) => {
  // Can not select days after tomorrow
  return current && current > moment();
};

const convertTextToHyperlinks = text => {
  const regex = /(https?:\/\/[^\s]+)/g;
  const replacedText = text.replace(regex, url => `<a href="${url}" target="_blank">${url}</a>`);
  return replacedText;
};

const isEmailAddress = str => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(str);
};

const isWebpageURL = str => {
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  return urlRegex.test(str);
};

const getPostCodeJpData = async ({ postcode }) => {
  console.log('DEBUG getPostCodeJpData');
  console.log('DEBUG getPostCodeJpData postcode', postcode);
  try {
    const response = await axios.get('https://apis.postcode-jp.com/api/v5/postcodes/' + postcode, {
      params: {
        apikey: POSTCODE_KEY,
      },
    });
    console.log('DEBUG getPostCodeJpData response', response);
    return response;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {
  createCsvDownload,
  sleep,
  gCountDown,
  gInterval,
  randomOutput,
  hexToRgbA,
  hexToRgbObj,
  getAccessToken,
  deleteAccessToken,
  getLocalUser,
  removeFalsyElement,
  checkMinValue,
  getCongrantId,
  getVerificationStatus,
  removeHyphen,
  checkAge,
  resetPagination,
  convertTextToHyperlinks,
  isEmailAddress,
  isWebpageURL,
  getLocalOrganizationInfo,
  getPostCodeJpData,
};
