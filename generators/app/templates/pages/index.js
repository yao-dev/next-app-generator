import { Header, Image } from 'semantic-ui-react';
import Layout from 'components/Layout/Layout';
import Config from 'helpers/config';

const styles = {
  container: {
    height: '70vh',
    marginBottom: '20vh',
    paddingTop: '10vh',
    background: 'black'
  },
  header: {
    margin: '5vh 0vw',
    fontSize: '4em',
    color: 'white'
  }
};

export default () => (
  <Layout title={Config.get('app_name')}>
    <div style={styles.container}>
      <Header textAlign='center' style={styles.header}>
        <Header.Content>
          <div>
            <Image
              src='/static/images/react.png'
              size='medium'
              centered
              circular
            />
          </div>
          {Config.get('app_name')}
        </Header.Content>
      </Header>
    </div>
  </Layout>
);
