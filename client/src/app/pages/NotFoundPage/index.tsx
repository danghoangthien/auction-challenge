import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { translations } from 'locales/translations';

export const NotFoundPage = (): JSX.Element => {
  const { t } = useTranslation();
  const renderPageTitle = (): JSX.Element => {
    return (
      <>
        <Helmet>
          <title>{t(translations?.pageNotFound?.title)}</title>
          <meta name="description" content="Not found page" />
        </Helmet>
      </>
    );
  };

  return (
    <>
      {renderPageTitle()}
      <div className="notFound-div-1">{'Not found page'}</div>
    </>
  );
};
