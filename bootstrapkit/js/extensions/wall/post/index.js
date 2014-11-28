require(['jquery', 'themes/bootstrapkit/js/helper/formAjax'], function(jQuery, formAjax) {

  /**
   * On Document Ready
   */
  jQuery(function() {

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

    formAjax.init('[data-bk-form-wall-post]', options);

  }); // end DOC READY

}); // end require


