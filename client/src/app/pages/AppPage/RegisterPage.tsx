import { Helmet } from 'react-helmet-async';

import PageContainer from 'app/components/Layout/PageContainer';
import RegistrationForm from 'app/modules/Register/RegisterForm';

const RegisterPage = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>{'Registration Page'}</title>
      </Helmet>
      <PageContainer>
        <RegistrationForm />
      </PageContainer>
    </>
  );
};

export default RegisterPage;
