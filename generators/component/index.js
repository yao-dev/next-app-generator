const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

const log = console.log;

module.exports = class extends Generator {
   constructor(args, opts) {
     super(args, opts);

     this.argument('component', { type: String, required: true });
   }

   prompting() {
     return this.prompt({
       type    : 'checkbox',
       name    : 'files',
       message : 'choose files you need',
       choices : [
         'helper',
         'style'
       ],
     })
     .then((answers) => {
       this.component = this.options.component;
       this.files = answers.files;

       return this;
     });
   }

   configuring() {
     const formattedComponentName = _.startCase(this.component).replace(new RegExp(' ', 'g'), '');
     const componentPath = path.join(process.cwd(), `src/components/${formattedComponentName}`);
     const componentJs = path.join(componentPath, `${formattedComponentName}.js`);
     const componentJsTest = path.join(componentPath, `__tests__/${formattedComponentName}.test.js`);

     this.fs.copyTpl(
       this.templatePath('ComponentName.js'),
       this.destinationPath(componentJs), {
         componentName: formattedComponentName
       }
     );

     this.fs.copyTpl(
       this.templatePath('__tests__/ComponentName.test.js'),
       this.destinationPath(componentJsTest), {
         componentName: formattedComponentName
       }
     );

     if (this.files.includes('helper')) {
       const helper = path.join(componentPath, `${formattedComponentName}Helper.js`);
       const helperTest = path.join(componentPath, `__tests__/${formattedComponentName}Helper.test.js`);

       this.fs.copyTpl(
         this.templatePath('ComponentNameHelper.js'),
         this.destinationPath(helper), {
           componentName: formattedComponentName
         }
       );

       this.fs.copyTpl(
         this.templatePath('__tests__/ComponentNameHelper.test.js'),
         this.destinationPath(helperTest), {
           componentName: formattedComponentName
         }
       );
     }

     if (this.files.includes('style')) {
       const style = path.join(componentPath, `${formattedComponentName}Style.js`);

       this.fs.copyTpl(
         this.templatePath('ComponentNameStyle.js'),
         this.destinationPath(style), {
           componentName: formattedComponentName
         }
       );
     }
   }
 };
