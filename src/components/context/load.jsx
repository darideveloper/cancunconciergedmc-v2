import { createContext } from 'react';

const LoadContext = createContext({
  loading: false,
  setLoading: () => {},
});

export default LoadContext; 