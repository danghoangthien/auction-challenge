import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useParseQueryParams = () => {
  const {
    location: { search, pathname },
  } = useSelector(state => state.router);
  const usp = new URLSearchParams(search);
  const queryObject = useMemo(() => {
    return Object.fromEntries(usp.entries());
  }, [search]);
  return { usp, queryObject, search, pathname };
};

export default useParseQueryParams;
