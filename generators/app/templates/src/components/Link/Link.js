import PropTypes from 'prop-types';
import NextLink from 'next/link';

const Link = ({ children, href, ...otherProps }) => {
  return (
    <NextLink href={href}>
      <a {...otherProps}>{children}</a>
    </NextLink>
  );
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  // TODO add otherProps
};

export default Link;
