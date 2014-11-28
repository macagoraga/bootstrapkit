/**
 * Bootstrapkit Core: bootstrapkit.js
 * Version 0.2.3
 */
define([
  'jquery',
  'bootstrap',
  'themes/bootstrapkit/js/vendor/pwstrength-bootstrap',
  'themes/bootstrapkit/js/vendor/dropdown-enhancement',
  'themes/bootstrapkit/js/vendor/autohiding-navbar',
  'themes/bootstrapkit/js/vendor/show-password'
], function(jQuery) {

  /*************************************************************************
   * BOOTSTRAPKIT CORE FUNCTIONS
   *************************************************************************/

  /**
   * Add callback functions
   *
   */
  var addCallbackFunction = function (func) {

    callbackFunctions.push(func);
  };

  /**
   * Run callback functions
   *
   */
  var runCallbackFunctions = function () {

    for (var i in callbackFunctions) {
      var each = callbackFunctions[i];
      each.call();
    }
  };

  /**
   * Add new log
   *
   */
  var consoleLog = function(msg) {

    console.log(msg);
  };

  /**
   * blockUI handler
   *
   */
  var blockUI = function (el) {

    jQuery(el).block({
      message: '<img src="../img/ajax-loader/1.gif" alt="">',
      centerY: true,
      css: {
        top: '10%',
        border: 'none',
        padding: '2px',
        backgroundColor: 'none'
      },
      overlayCSS: {
        backgroundColor: '#000',
        opacity: 0.05,
        cursor: 'wait'
      }
    });
  };

  /**
   * unBlockUI handler
   *
   */
  var unBlockUI = function (el) {

    jQuery(el).unblock({

      onUnblock: function () {

        jQuery(el).removeAttr("style");
      }
    });
  };

  /**
   * Translate a phrase
   *
   */
  var translate = function (phrase) {

    return system.trans(phrase);
  };

  /*************************************************************************
   * BOOTSTRAPKIT INITIALIZE FUNCTIONS
   * All below functions its executed for initialize bootstrapkit theme
   *************************************************************************/

  /**
   * Init Navbar
   *
   */
  var initNavbar = function() {

    // auto hiding navbar
    jQuery("body > header.navbar").autoHidingNavbar();
  };

  /**
   * Init Tooltips
   *
   */
  var initTooltips = function () {

    var $el = jQuery('[data-bk-tooltip],[data-toggle="tooltip"]');

    if($el.length) {

      $el.tooltip({
        container: 'body'
      });
    }

    $el = jQuery('[data-bk-tooltip-html]');

    if($el.length) {

      $el.tooltip({
        container: 'body',
        html: true,
        delay: {
          show: 100,
          hide: 1000
        }
      });
    }

  };

  /**
   * Init Popovers
   *
   */
  var initPopovers = function () {

    var $el = jQuery('[data-bk-popover],[data-toggle="popover"]');

    if($el.length) {

      $el.popover();
    }


  };

  /**
   * Init Checkbox
   *
   */
  var initCheckbox = function() {

    var $el = jQuery('[data-bk-icheckbox]');

    if($el.length) {

      $el.iCheck({

        checkboxClass: 'icheckbox_flat',
        radioClass: 'iradio_flat'
      });
    }
  };

  /**
   * Init Panels
   */
  var initPanels = function() {

    // Toggle .panel-body on click on .panel-heading
    jQuery('.panel .panel-heading').on('click', function() {

      jQuery(this).next('.panel-body').toggle();
    });

  };

  /**
   * Init Password Meter
   */
  var initPasswordMeter = function() {

    var $el = jQuery('[data-bk-pwdmeter]');

    if($el.length) {

      $el.parent().parent().attr("id", "pwd-container").append('<div class="pwstrength_viewport_progress"></div>');

      var options = {};
      options.ui = {
        container: "#pwd-container",
        showStatus: true,
        showVerdictsInsideProgressBar: true,
        viewports: {
          progress: ".pwstrength_viewport_progress",
          errors: ".help-block"
        },
        showErrors: true,
        errorMessages:{
          wordLength: "Your password is too short.",
          wordNotEmail: "Do not use your email as your password.",
          wordSimilarToUsername: "Your password cannot contain your username.",
          wordTwoCharacterClasses: "Use different character classes.",
          wordRepetitions: "Too many repetitions.",
          wordSequences: "Your password contains sequences."
        }
      };
      options.common = {
        debug: true,
        userInputs: ['#email', '#username'],
        onKeyUp: function (evt, data) {
          $(".pwstrength_viewport_progress").show();
        }
      };

      $el.pwstrength(options);
    }
  };


  /**
   * What we return here will be used by other modules
   */
  return {

    initialize: function () {

      initNavbar();
      initTooltips();
      initPopovers();
      initCheckbox();
      initPanels();
      initPasswordMeter();
    },
    block: function (el) {

      blockUI(el);
    },
    unblock: function (el) {

      unBlockUI(el);
    },
    log: function (msg) {

      consoleLog(msg);
    },
    trans: function(phrase) {

      translate(phrase);
    }
  }

});



