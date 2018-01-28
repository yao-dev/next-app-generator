import constants from 'config/constants';
import Config    from '../config';

describe('Config', () => {
  describe('get', () => {
    it('should return undefined if unknow path', () => {
      expect(Config.get('unknow_path')).toEqual(undefined);
    });

    it('should return application name', () => {
      expect(Config.get('app_name')).toEqual(constants.APP_NAME);
    });
  });
});
