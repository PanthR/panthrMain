(function(define) {'use strict';
define(function(require) {

   var loader, mixin;

   mixin = require('./mixin');

   loader = {
      // Returns an existing module (or loads if not available)
      requireModule: function requireModule(name) { return this._modules[name]; },
      // Returns an existing type (or errors if not available)
      requireType: function requireType(name) { return this[name]; },
      addType: function addType(name, obj) {
         // Add new type
         // TODO: Enforce name starting with capital letter
         this[name] = obj;
         return this;
      },
      getClass: function getClass(name) { return this[name]; },
      // Adds a new method to a "module". Maybe allow multiple methods
      // Typical formats:
      // addModuleMethod('Stats', 'sum', f);
      // addModuleMethod('Stats.sum', f);
      // addModuleMethod('Stats', { sum: f, mean: g });
      addModuleMethod: function addModuleMethod(module, name, method) {
         var params;
         params = normalizeArguments(module, name, method);
         mixin(this.requireModule(params.module), params.methods);
         return this;
      },
      // Adds a new class method to a "type". Maybe allow multiple methods
      addClassMethod: function addClassMethod(type, name, method) {
         var params;
         params = normalizeArguments(type, name, method);
         mixin(this.getClass(params.module), params.methods);
         return this;
      },
      // Adds a new instance/prototype method to a "type". Maybe allow multiple methods
      addInstanceMethod: function addInstanceMethod(type, name, method) {
         var params;
         params = normalizeArguments(type, name, method);
         mixin(this.getClass(params.module).prototype, params.methods);
         return this;
      },
      loadModule: function loadModule(moduleFun) {
         moduleFun(this);
      }
   };

   // Converts all these formats to a "{ module: 'Stats', methods: { sum: f, ... }}" type
   // addModuleMethod('Stats', 'sum', f);
   // addModuleMethod('Stats.sum', f);
   // addModuleMethod('Stats', { sum: f, mean: g });
   function normalizeArguments(module, name, method) {
      if (typeof method !== 'undefined') { name = { name: method }; }
      if (typeof name === 'function') {
         module = module.split('.');
         if (module.length !== 2) {
            throw new Error('Invalid module method specification in addModuleMethod');
         }
         method = name;
         name = module[1];
         name = { name: method };
         module = module[0];
      }
      return { module: module, methods: name };
   }

   // TODO: How to unload a module
   // TODO: Think of the arguments
   // `this` is `Main`.
   // TODO: Implement all the cool stuff

   return loader;

});

}(typeof define === 'function' && define.amd ? define : function(factory) {
   'use strict';
   module.exports = factory(require);
}));
