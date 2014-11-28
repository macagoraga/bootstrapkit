/**
 * Main Bootstrapkit: main.js
 * Version 0.2
 */
require.config({

  shim: {
    'bootstrap': { deps: ['jquery'] },
    'bootstrapkit': { deps: ['jquery'] }
  },

  paths: {
    'bootstrap': 'themes/bootstrapkit/js/vendor/bootstrap/bootstrap',
    'bootstrapkit': 'themes/bootstrapkit/js/bootstrapkit'
  }
});

require(['jquery', 'bootstrapkit', 'bootstrap'], function(jQuery, Bootstrapkit) {

  /**
   * On Document Ready
   */
  jQuery(function() {

    /**
     * Initialize bootstrapkit theme
     */
    Bootstrapkit.initialize();
  }); // end DOC READY
}); // end require