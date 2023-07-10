import { useEffect, useState } from 'react';

import Space from 'antd/es/space';

import responseErrorState from 'app/states/ResponseError';

const Error: React.FC = () => {
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    responseErrorState.register(setError);
  }, []);
  return (
    <>
      {error && (
        <Space direction="vertical" size={0}>
          <div role="alert" className="ant-form-item-explain-error">
            {error.response?.data.error}
          </div>
        </Space>
      )}
    </>
  );
};

export default Error;
