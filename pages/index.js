import Layout from 'components/Layout/Layout';
import Config from 'config';

export default () => (
  <Layout title='Accueil'>
    Welcome to {Config.get('app_name')}
  </Layout>
);
