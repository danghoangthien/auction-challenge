import { Button, message, notification, Space } from 'antd';

import ResponseError from 'app/components/ResponseError';
import { BLUE_COLOR, DANGER_COLOR, PRIMARY_COLOR, WARNING_COLOR } from 'styles/StyleConstants';

export const errorNotifyHandler = (
  error,
  key = Math.random(),
  title = 'エラーが発生しました。',
  options = {},
) => {
  if (error.response) {
    error.response.status && error.response?.data?.errors
      ? notification.error({
          key,
          message: title,
          duration: null,
          description: (
            <>
              <ResponseError err={error.response?.data?.errors} />
            </>
          ),
          btn: <Button type="primary">{'OK'}</Button>,
          onClick: () => {
            notification.close(key);
          },
        })
      : message.error('エラーが発生しました。');
  }
};

const ICONS = {
  error: ['cancel', DANGER_COLOR], // 確認ダイアログ
  info: ['info', BLUE_COLOR], // 完了ダイアログ
  success: ['check_circle', PRIMARY_COLOR], // 注意ダイアログ
  warning: ['error', WARNING_COLOR], // エラーダイアログ
  warn: ['error', DANGER_COLOR], // 削除ダイアログ
};

export const notificationHandler = ({
  status,
  description,
  key = Math.random(),
  message,
  duration = null,
  btn = (
    <Space>
      <Button
        type="primary"
        onClick={() => {
          notification.close(key);
        }}
      >
        {'OK'}
      </Button>
    </Space>
  ),
}) => {
  notification[`${status}`]({
    className: 'custom-nofitication',
    key,
    message,
    description,
    duration,
    icon: (
      <span
        className="material-symbols-outlined fill-icon"
        style={{ color: ICONS[status][1], fontSize: '20px' }}
      >
        {ICONS[status][0]}
      </span>
    ),
    btn,
    onClick: () => {
      notification.close(key);
    },
  });
};

export const successMessageHandler = (text = '更新ができました。') => message.success(text);
export const errorMessageHandler = (text = 'エラーが発生しました。') => message.error(text);
