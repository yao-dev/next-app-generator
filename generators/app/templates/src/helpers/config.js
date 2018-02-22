import _ from 'lodash';
import config from 'config';

export const get = (path) => _.get(config, path);

export default {
  get
};
