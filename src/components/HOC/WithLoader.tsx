import { Loader } from 'components';

const WithLoader = (Component: any) => {
  return function WithLoaderComponent({ loading, ...props }: any) {
    if (!loading) return <Component {...props} />;
    return <Loader />;
  };
}

export default WithLoader;