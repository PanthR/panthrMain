(function(define) {'use strict';
define(function(require) {

   /**
    * Main PanthR app
    * @module Main
    * @version 0.0.1
    * @author Haris Skiadas <skiadas@hanover.edu>
    * Barb Wahl <wahl@hanover.edu>
    */
   var Main, loader, key;

   /**
    * TODO: Make simpleLoader more "careful"
    */

   loader = require('./simpleLoader');

   Main = {};

   Object.defineProperty(Main, '_modules', { value: {} });
   for (key in loader) {
      if (loader.hasOwnProperty(key)) {
         Object.defineProperty(Main, key, { value: loader[key] });
      }
   }

   Main.loadModule(require('panthrBase'));

   return Main;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));
