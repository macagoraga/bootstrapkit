/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * https://github.com/wenzhixin/bootstrap-show-password
 * version: 1.0.1
 *
 * Change by macagoraga
 * - Removed support for bootstrap v2
 * - Added support for font-awesome
 */

!function ($) {

  'use strict';

  // PASSWORD CLASS DEFINITION
  // ======================

  var Password = function(element, options) {
    this.options   = options;
    this.$element  = $(element);
    this.isShown = false;

    this.init();
  };

  Password.DEFAULTS = {
    placement: 'after', // 'before' or 'after'
    message: 'Click here to show/hide password',
    iconsize: ''
  };

  Password.prototype.init = function() {
    var placementFuc,iconSize = '';

    if (this.options.placement === 'before') {
      placementFuc = 'insertBefore';
    } else {
      this.options.placement = 'after'; // default to after
      placementFuc = 'insertAfter';
    }

    if (this.options.iconsize === 'large') {
      iconSize = ' fa-lg fa-fw';
    }

    // Create the text, icon and assign
    this.$element.wrap('<div class="input-group" />');

    this.$text = $('<input type="text" />')
      [placementFuc](this.$element)
      .attr('class', this.$element.attr('class'))
      .attr('placeholder', this.$element.attr('placeholder'))
      .css('display', this.$element.css('display'))
      .val(this.$element.val()).hide();

    this.$icon = $([
      '<span tabindex="100" title="' + this.options.message + '" class="input-group-addon">',
      '<i class="fa fa-eye'+iconSize+'"></i>',
      '</span>'
    ].join(''))[placementFuc](this.$text).css('cursor', 'pointer');

    // events
    this.$text.off('keyup').on('keyup', $.proxy(function() {
      this.$element.val(this.$text.val());
    }, this));

    this.$icon.off('click').on('click', $.proxy(function() {
      this.$text.val(this.$element.val());
      this.toggle();
    }, this));
  };

  Password.prototype.toggle = function(_relatedTarget) {
    this[!this.isShown ? 'show' : 'hide']();
  };

  Password.prototype.show = function(_relatedTarget) {
    var e = $.Event('show.bs.password', {relatedTarget: _relatedTarget});
    this.$element.trigger(e);

    this.isShown = true;
    this.$element.hide();
    this.$text.show();
    this.$icon.find('i')
      .removeClass('fa-eye')
      .addClass('fa-eye-slash');

    // v3 input-group
    this.$text[this.options.placement](this.$element);
  };

  Password.prototype.hide = function(_relatedTarget) {
    var e = $.Event('hide.bs.password', {relatedTarget: _relatedTarget});
    this.$element.trigger(e);

    this.isShown = false;
    this.$element.show();
    this.$text.hide();
    this.$icon.find('i')
      .removeClass('fa-eye-slash')
      .addClass('fa-eye');

    // v3 input-group
    this.$element[this.options.placement](this.$text);
  };


  // PASSWORD PLUGIN DEFINITION
  // =======================

  var old = $.fn.password;

  $.fn.password = function(option, _relatedTarget) {
    return this.each(function() {
      var $this = $(this),
          data = $this.data('bs.password'),
          options = $.extend({}, Password.DEFAULTS, $this.data(), typeof option === 'object' && option);

      if (!data) {
        $this.data('bs.password', (data = new Password(this, options)));
      }

      if (typeof option === 'string') {
        data[option](_relatedTarget);
      }
    });
  };

  $.fn.password.Constructor = Password;


  // PASSWORD NO CONFLICT
  // =================

  $.fn.password.noConflict = function() {
    $.fn.password = old;
    return this;
  };

  $(function () {
    $('[data-toggle="password"]').password();
  });

}(window.jQuery);
