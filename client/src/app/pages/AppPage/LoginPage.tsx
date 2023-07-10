import { Helmet } from 'react-helmet-async';

import PageContainer from 'app/components/Layout/PageContainer';
import LoginForm from 'app/modules/Login/LoginForm';

const LoginPage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>{'Login'}</title>
      </Helmet>
      <PageContainer>
        <LoginForm />
      </PageContainer>
    </>
  );
};

export default LoginPage;
