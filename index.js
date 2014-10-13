(function(define) {'use strict';
define(function(require) {

   /**
    * Main PanthR app
    * @module Main
    * @version 0.0.1
    * @author Haris Skiadas <skiadas@hanover.edu>
    * Barb Wahl <wahl@hanover.edu>
    */
   var Main, loader;

   Main = {};

   loader = new (require('panthrLoader'))(Main);

   loader.loadModule(require('panthrbase'));

   return Main;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));
