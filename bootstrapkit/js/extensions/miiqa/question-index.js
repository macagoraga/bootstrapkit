/**
 * Adapted for Bootstrapkit
 *
 */

require([
  'jquery',
  'domReady!'
], function($) {

  var section, table, filters, spinnerFilters, orders, /*spinnerOrders, buttonOrdersActive,*/ search, /*pagination,*/ page, baseUrl, currentUrl, data, reloadQuestionsTable, filtersLink;

  section               = $('#miiQA-index');
  table                 = $('#questions-table');
  filters               = $('#questions-filters');
  filtersLink           = $('a', filters);
  spinnerFilters        = $('.js-spinner', filters);
  orders                = $('#questions-orders');

  //spinnerOrders         = $('.js-spinner', orders);
  //buttonOrdersActive    = $('#questions-orders .active', orders);

  search                = $('[name="filter[search]"]', section);

  //pagination            = $('[data-bk-pagination]', section);

  page                  = $('[name="page"]', section);
  baseUrl               = '//' + window.location.host;
  currentUrl            = baseUrl + window.location.pathname;
  data                  = {
    filter: {
      search  : search.val(),
      status  : filters.find('.active[data-status]').data('status'),
      orderby : orders.find('.active[data-orderby]').data('orderby')
    },
    page  : page.val()
  };

/*
  autocomplete = uikit.autocomplete(search.parent(), {
    source: function(release) {
      $.getJSON(currentUrl, { filter: {autocomplete: search.val()} }, function(data) {
        data.filter.search = search.val();
        release(data.list);
      });
    },
    template: '<ul>{{~items}}<li data-value="{{$item.title}}" data-url="{{$item.url}}" data-id="{{$item.id}}"><a>{{$item.title}}</a></li>{{/items}}</ul>'
  });

  autocomplete.element.on('autocomplete-select', function(e, data){
    if(typeof data.url !== 'undefined' && data.url !== '')
      window.location.href = baseUrl + data.url;
  });
*/

/*
  search.typeahead(null, {
    name: 'questions',
    displayKey: 'value',
    source: function() {
      $.getJSON(currentUrl, { filter: {autocomplete: search.val()}}, function(data) {

        var matches = [];
        $.each(data, function(key, val) {

          if(val instanceof Object) {

            $.each(val, function(k, v) {

              //Bootstrapkit.addLog('k=' + k + ' v=' + v.title);
              matches.push({ value: v.title });
            });
          }

        });

        //data.filter.search = search.val();
        return matches;
      });
    },
    templates: {
      empty: 'Unable to find any questions that match the current query',
      //suggestion: Handlebars.compile('<ul>{{~items}}<li data-value="{{$item.title}}" data-url="{{$item.url}}" data-id="{{$item.id}}"><a>{{$item.title}}</a></li>{{/items}}</ul>')
    }
  });
*/

  reloadQuestionsTable = function() {
    $.get(currentUrl, data, function(data) {
      table.html(data.table);
      //pagination.toggleClass('hidden', data.total < 2).data('pagination').render(data.total);
    });
  };

  /*
  // pagination
  pagination.on('uk-select-page', function(e, index) {
    page.val(index);
    data.page = page.val();
    reloadQuestionsTable();
  });
  */

  // table order filters
  /*
  orders.on('click', 'a', function (e) {

    var button = $(this);

    e.preventDefault();
    e.stopImmediatePropagation();

    if(!button.is(buttonOrdersActive)) {

      data.filter.orderby = button.data('orderby');
      spinnerOrders.removeClass('hidden');
      reloadQuestionsTable();
      button.addClass('active').addClass('btn-primary');
      buttonOrdersActive.removeClass('active').removeClass('btn-primary');

      buttonOrdersActive = button;
    }
  });*/

  // fix double filter active
  if(filters.find('a.active').length > 1) {
    filters.find('a.active:first').removeClass('active');
  }

  // table status filters
  filters.on('click', 'a', function (e) {

    var button = $(this);

    e.preventDefault();
    e.stopImmediatePropagation();

    spinnerFilters.removeClass('hidden');

    if(!button.hasClass('active')) {

      data.filter.status = button.data('status');
      reloadQuestionsTable();

      filtersLink.removeClass('active');

      button.addClass('active');

      spinnerFilters.addClass('hidden');

    }
    else {

      spinnerFilters.addClass('hidden');
    }

  });

});