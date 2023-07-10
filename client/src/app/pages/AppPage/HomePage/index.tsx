import { Helmet } from 'react-helmet-async';

import ContentContainer from 'app/components/Layout/ContentContainer';
import PrivatePageContainer from 'app/components/Layout/PrivatePageContainer';
import HorizontalNavHeader from 'app/components/Navigation';
import ListItem from 'app/modules/ListItem';

const renderPageTitle = () => {
  return (
    <>
      <Helmet>
        <title>{'Home'}</title>
      </Helmet>
    </>
  );
};

const HomePage = (): JSX.Element => {
  return (
    <PrivatePageContainer>
      <HorizontalNavHeader />
      <ContentContainer>
        <ListItem />
      </ContentContainer>
    </PrivatePageContainer>
  );
};

export { HomePage };
export default HomePage;
