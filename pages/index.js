import Layout from 'components/Layout/Layout';
import Config from 'helpers/config';

export default () => (
  <Layout title='Accueil'>
    Welcome to {Config.get('app_name')}
  </Layout>
);
