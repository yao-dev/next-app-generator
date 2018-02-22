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
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        />
        <link
          rel="stylesheet"
          href="<%= styleSheetHref %>"
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
