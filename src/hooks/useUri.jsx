import { useLocation } from 'react-router-dom';

const useUri = () => {
  const location = useLocation();
  console.log('LOCATION:', location);
  return `${location.pathname}${location.search}`;
};

export default useUri;
