```jsx static
// src/components/Layout/Layout

import PropTypes from 'prop-types';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Config from 'helpers/config';

/**
 * Layout component that wrap meta tag of pages
 */
const Layout = ({ children, title }) => {
  return (
    <div>
      <Head>
        <title>{ title }</title>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
        />
      </Head>

      <Container fluid textAlign="center">
        { children }
      </Container>

    </div>
  );
};

Layout.propTypes = {
  /**
   * Children component
   */
  children: PropTypes.node.isRequired,
  /**
   * Current page title
   */
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: Config.get('app_name'),
};

export default Layout;

// src/components/AnotherComponent/AnotherComponent

import Layout from 'components/Layout/Layout';

export default const AnotherComponent = () => {
  return (
    <Layout title='homepage'>
      <h1>I'm in homepage</h1>
    </Layout>
  );
};
```

Render :

```js { "props": { "title": "homepage" } }
<Layout title="homepage">
  <h1>I'm in home page</h1>
</Layout>
```
