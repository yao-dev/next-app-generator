const Generator = require('yeoman-generator');
const path = require('path');
const chalk = require('chalk');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.appName = 'next-app-generator';
    this.uiFrameworks = {
      'semantic-ui-react': {
        version: '^0.77.1',
        href:'//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css',
      },
      antd: {
        version: '^3.2.1',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.2.1/antd.min.css',
      },
      'react-bootstrap': {
        version: '^0.32.1',
        href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
      },
    };

    this.argument('appName', { type: String, required: false });
    this.option('skip');
  }

  prompting() {
    this.appName = this.options.appName || this.appName;

    if (this.options.skip) {
      this.appNameStartCase = _.startCase(this.appName);
      this.uiFramework = 'semantic-ui-react';
      return this;
    }

    const prompt = [];

    if (!this.options.appName) {
      prompt.push({
        type    : 'input',
        name    : 'appName',
        message : 'Project name',
        default : this.appName,
      });
    }

    prompt.push({
      type    : 'input',
      name    : 'description',
      message : 'Description',
      default : '',
    }, {
      type    : 'input',
      name    : 'email',
      message : 'Email',
      default : '',
    }, {
      type    : 'input',
      name    : 'userName',
      message : 'Github username',
      default : '',
    }, {
      type    : 'input',
      name    : 'author',
      message : 'Author',
      default : '',
    }, {
      type    : 'list',
      name    : 'uiFramework',
      message : 'Front end framework',
      choices : Object.keys(this.uiFrameworks),
      default : 'semantic-ui-react'
    });

    return this.prompt(prompt)
    .then((answers) => {
      this.appName = answers.appName || this.appName;
      this.appNameStartCase = _.startCase(this.appName);
      this.description = answers.description;
      this.email = answers.email;
      this.userName = answers.userName;
      this.author = answers.author;
      this.uiFramework = answers.uiFramework;
    });
  }

  configuring() {
    this.fs.copy(
      this.templatePath('**/**'),
      this.destinationPath(this.appName),
      { globOptions: { dot: true } }
    );
  }

  packageJson() {
    const gitPrefix = 'git+https://github.com/' + this.userName + '/' + this.appName;

    const packageJson = {
      name: this.appName,
      description: this.description,
      version: '1.0.0',
      main: 'configureStore.js',
      license: 'ISC',
      repository: {
        type: 'git',
        url: this.userName ? gitPrefix + '.git' : ''
      },
      bugs: {
        url: this.userName ? gitPrefix + '/issues' : ''
      },
      homepage: this.userName ? gitPrefix + '#readme' : '',
      scripts: {
        test: 'jest --coverage --watchAll',
        'test:coverage': 'jest --coverage',
        dev: 'concurrently \"styleguidist build && styleguidist server\" \"next\"',
        build: 'next build',
        start: 'next start',
        deploy: 'rm -rf ./.next/ && now --public',
        styleguide: 'styleguidist server',
        'styleguide:build': 'styleguidist build'
      },
      author: this.author,
      jest: {
        coverageDirectory: './coverage',
        collectCoverage: true,
        collectCoverageFrom: [
          './src/**/*.test.{js}'
        ]
      },
      dependencies: {
        concurrently: '^3.5.1',
        lodash: '^4.17.4',
        next: '^4.2.3',
        'next-connect-redux': '^0.1.5',
        'next-redux-wrapper': '^1.3.2',
        react: '^16.2.0',
        'react-dom': '^16.2.0',
        'react-redux': '^5.0.5',
        redux: '^3.7.2',
        'redux-thunk': '^2.2.0',
        'react-typography': '^0.16.5',
        'styled-components': '^2.4.0',
        typography: '^0.16.6'
      },
      devDependencies: {
        'babel-plugin-module-resolver': '^2.7.1',
        'babel-plugin-styled-components': '^1.5.0',
        'babel-preset-stage-0': '^6.24.1',
        jest: '^22.0.4',
        'react-styleguidist': '^6.2.5'
      }
    };

    packageJson.dependencies[this.uiFramework] = this.uiFrameworks[this.uiFramework].version;
    const destinationPath = this.destinationPath(path.join(this.appName, 'package.json'));
    return this.fs.writeJSON(destinationPath, packageJson);
  }

  readme() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(path.join(this.appName, 'README.md')), {
        appName: this.appName,
        userName: this.userName
      }
    );
  }

  srcFolder() {
    this.fs.copyTpl(
      this.templatePath('src/config/constants.json'),
      this.destinationPath(path.join(this.appName, 'src/config/constants.json')), {
        appNameStartCase: this.appNameStartCase,
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/components/Layout/Layout.js'),
      this.destinationPath(path.join(this.appName, 'src/components/Layout/Layout.js')), {
        styleSheetHref: this.uiFrameworks[this.uiFramework].href,
      }
    );
  }

  install() {
    if (!this.options['skip-install']) {
      process.chdir(path.join(process.cwd(), this.appName));
      this.installDependencies({
        npm: true,
        bower: false,
        skipMessage: this.options['skip-install-message'],
        skipInstall: this.options['skip-install']
      });
    }
  }

  end() {
    this.log(chalk.cyan`
      Help :

      Create component => yo next-app-generator:component name
      Create connected component => yo next-app-generator:connect-component name
      Create page => yo next-app-generator:page name
    `);
    this.log(chalk.white`
      For init, copy & paste following commands (and go to http://localhost:3000) :

      cd ` + this.appName + `
      git init
      git remote add origin git@github.com:` + this.userName + `/` + this.appName + `.git
      npm run dev
    `);
  }
};
