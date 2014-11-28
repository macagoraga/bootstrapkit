/**
 * helper/formAjax.js
 * Version 0.0.1
 * TO DO :: Move this to wall if used by wall
 */
define([
  'jquery',
  'themes/bootstrapkit/js/vendor/jquery-form/jquery.form'
], function(jQuery) {

  var initForm = function (el, options)
  {
    options = options || {};

    jQuery(el).ajaxForm(options);
  };

  var handleUpload = function(el)
  {
    var bar = $(el + ' .progress-bar');
    var percent = $(el + ' .progress-percent');
    var status = $(el + ' .upload-status');
    var progress = $(el + ' .progress');

    jQuery(el).ajaxForm({
      beforeSend: function() {

        progress.show();
        status.empty();

        var percentVal = '0';
        bar.width(percentVal+'%');
        bar.attr('aria-valuenow', percentVal);
        percent.html(percentVal+'%');
      },
      uploadProgress: function(event, position, total, percentComplete) {

        // only for testing
        console.log('percentComplete: '+percentComplete);
        console.log('total: '+total);
        console.log('position: '+position);
        console.log('event: '+event);
        // remove after

        var percentVal = percentComplete;
        bar.width(percentVal+'%');
        bar.attr('aria-valuenow', percentVal);
        percent.html(percentVal+'%');
      },
      success: function() {

        var percentVal = '80';
        bar.width(percentVal+'%');
        bar.attr('aria-valuenow', percentVal);
        percent.html(percentVal+'%');
      },
      complete: function(xhr) {

        var percentVal = '100';
        bar.width(percentVal+'%');
        bar.attr('aria-valuenow', percentVal);
        percent.html(percentVal+'%');
        status.html(xhr.responseText);
        setTimeout(function(){
          progress.hide();
        }, 1200);

      }
    });

  };

  return {

    init: function (el, options)
    {
      initForm(el, options); // ajax.form('#form', options)
    },
    addUpload: function (el)
    {
      handleUpload(el); // ajax.upload('#form');
    }

  };

});

/*
var options = {
 success: function(data) {
   alert(data['message']);
 },
 beforeSubmit: function(arr, $form, options) {
   // The array of form data takes the following form:
   // [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
   // return false to cancel submit
 },
 dataType: 'json'
};
 */