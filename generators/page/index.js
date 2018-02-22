const Generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');

const log = console.log;

module.exports = class extends Generator {
   constructor(args, opts) {
     super(args, opts);

     this.argument('title', { type: String, required: true });
   }

   configuring() {
     this.fs.copyTpl(
       this.templatePath('page.js'),
       this.destinationPath(path.join(process.cwd(), `pages/${this.options.title}.js`)), {
         title: this.options.title
       }
     );
   }
 };
