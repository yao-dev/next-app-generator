import PropTypes                       from 'prop-types';
import Head                            from 'next/head';
import { TypographyStyle, GoogleFont } from 'react-typography';
import MadeWithLoveByMe                from 'components/MadeWithLoveByMe/MadeWithLoveByMe';
import Config                          from 'helpers/config';
import typography                      from 'helpers/typography';

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
        <TypographyStyle typography={typography} />
        <GoogleFont typography={typography} />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
        <link
          rel='stylesheet'
          href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
        />
      </Head>

      <div>
        { children }
        <MadeWithLoveByMe />
      </div>

    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title:    PropTypes.string,
};

Layout.defaultProps = {
  title: Config.get('app_name'),
};

export default Layout;
