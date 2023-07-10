import { useState } from 'react';

// utils
import './article-editor/css/article-editor.min.css';

import ArticleEditor from 'utils/article-editor/article-editor';

import './article-editor/plugins/inlineformat/inlineformat';
import './article-editor/plugins/reorder/reorder';
import './article-editor/ja';

import { message } from 'antd';

import { checkDimension, handleResize } from 'app/components/ImageUpload';
import { useMountEffect } from 'hook/useMountEffect';
import uploadService from 'services/app/upload';

const [IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT] = [1280, 1280];

ArticleEditor.settings = {
  code: false,
  layer: false,
  // grid: {
  //   gutter: '24px',
  // },
  // offset: {
  //   left: '12px',
  //   right: '12px',
  // },
  css: ['/article-editor/css/arx-frame.min.css'], // inside public folder
  custom: {
    css: [
      'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Roboto+Mono:wght@400;500;600;700&family=Roboto:wght@400;500;700;900&display=swap',
      '/mystyle/my-content.css', // inside public folder
    ],
  },
  topbar: {
    undoredo: true,
    mobile: true,
  },
  plugins: ['inlineformat', 'reorder'],
  editor: {
    lang: 'ja',
  },
  format: ['p', 'h2', 'h3', 'ul', 'ol'],
  toolbar: {
    hide: ['html'],
  },
  shortcutsRemove: [
    'ctrl+k, meta+k',
    'ctrl+alt+3, meta+alt+3',
    'ctrl+alt+4, meta+alt+4',
    'ctrl+alt+5, meta+alt+5',
    'ctrl+alt+6, meta+alt+6',
    'ctrl+shift+m, meta+shift+m',
    'ctrl+[, meta+[',
    'ctrl+], meta+]',
    'ctrl+h, meta+h',
    'ctrl+l, meta+l',
  ],
};

const beforeUpload = async (file, fkey, outputSize = [IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT]) => {
  console.log('file', file);
  console.log('beforeUpload fkey', fkey, file.type);
  let allowedFileTypes = [
    {
      mime: 'image/jpeg',
      name: 'JPG',
    },
    {
      mime: 'image/png',
      name: 'PNG',
    },
    {
      mime: 'image/gif',
      name: 'GIF',
    },
  ];
  if (fkey === '身分証明書等ファイル') {
    allowedFileTypes.splice(-1);
  }
  const allowFileExts = allowedFileTypes.map(fileType => fileType.name);
  if (!allowedFileTypes.map(fileType => fileType.mime).includes(file.type)) {
    const msg = `${fkey}には${allowFileExts.join('/')}形式の画像をアップロードしてください。`;
    message.error(msg);
    throw new Error(msg);
  }
  const MAX_MB = outputSize[0] >= 8000 ? 10 : 5;
  const maxSize = file.size / 1024 / 1024 < MAX_MB;
  if (!maxSize) {
    const msg = '5MB以下の画像をアップロードしてください';
    message.error(msg);
    throw new Error(msg);
  }
  const fileExtension = allowedFileTypes.find(fileType => fileType.mime === file.type).name;
  file = await handleResize(file, outputSize, fileExtension);
  return file;
};

export const imageCustomUpload = fkey => ({
  image: {
    upload: async function (upload, data) {
      let response = {};
      // loop files
      for (var key in data.files) {
        if (typeof data.files[key] === 'object') {
          console.log(data.files[key]);
          let file = data.files[key];
          try {
            const fileAfterCheck = await beforeUpload(file, fkey);
            const { data: responseData } = await uploadService.upload({
              fkey,
              file: fileAfterCheck,
            });
            response.file = {
              url: responseData?.url,
              id: responseData?.file,
            };
          } catch (error) {
            console.error(`There is a problem when uploading files:: ${error.message}`);
          }
        }
      }
      // call complete
      upload.complete(response, data.e);
    },
    multiple: false,
  },
});

export const useBindEditor = (content, fkey = 'プロジェクトトップファイル') => {
  const [, setEditor] = useState(null);
  useMountEffect(() => {
    // console.log(content);
    setEditor(
      ArticleEditor('#editor', {
        content,
        ...imageCustomUpload(fkey),
      }),
    );
  });
};
