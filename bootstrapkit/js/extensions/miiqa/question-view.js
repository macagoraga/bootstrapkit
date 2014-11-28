require(['jquery', 'uikit!notify', 'gravatar', 'domReady!'], function($, uikit, gravatar) {

  var formAnswer = $('#js-answer'), filters = $('#js-answers-filter'), answers = $('#js-answers-table'),
      id = $('input[name="answer[question_id]"]', formAnswer),
      buttonFilterActive = $('.btn.active', filters),
      message = $('textarea[name="answer[content]"]', formAnswer),
      spinnerAnswer = $('.js-spinner', formAnswer),
      spinnerFilters = $('.js-spinner', filters),
      answerClass = '.miiqa-answer',
      questionClass = '.miiqa-question',
      answer = $(answerClass),
      question = $(questionClass),
      avatar = $('.js-avatar', answer),
      reloadAnswersTable,
      reloadGravatar,
      reloadVote,
      dirty = false;

  // table reload
  reloadAnswersTable = function (button) {

    var index, url, param;

    index = button.attr('href').indexOf('?');
    url = button.attr('href').substring(0, index);
    param = decodeURIComponent(button.attr('href').substring(index+1));

    buttonFilterActive.removeClass('active');
    button.addClass('active');

    spinnerFilters.removeClass('hidden');

    $.get(url, param, function(response) {

      dirty = false;

      if (response.table) {
        answers.html(response.table);
        buttonFilterActive.removeClass('uk-button-danger');
        button.addClass('uk-button-danger');
        buttonFilterActive = button;
      }

      spinnerFilters.addClass('hidden');

      // reloadGravatar();
    });
  }

  reloadGravatar = function () {
    $.each(avatar, function() {
      $(this).html('<img src="' + gravatar.url($(this).data('email'), {s: 25, d: 'mm', r: 'g'}) + '" class="uk-border-circle" height="25" width="25">');
    });
  }

  reloadVote = function (button, parent) {
    var index, url, param;

    index = button.attr('href').indexOf('?');
    url = button.attr('href').substring(0, index);
    param = decodeURIComponent(button.attr('href').substring(index+1));

    $.get(url, param, function(response) {

      dirty = false;
      uikit.notify(response.message, response.error ? 'danger' : 'success');

      if(typeof response.vote != 'undefined') {
        button.parents(parent).find('.vote').html(response.vote);
      }

    });
  }

  question.on('click', '.js-question-vote', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    reloadVote($(this), questionClass);
  });

  // form ajax saving
  formAnswer.on('submit', function(e) {

    e.preventDefault();
    e.stopImmediatePropagation();

    spinnerAnswer.removeClass('hidden');

    $.post(formAnswer.attr('action'), formAnswer.serialize(), function(response) {

      dirty = false;
      uikit.notify(response.message, response.error ? 'danger' : 'success');

      if (response.id) {
        message.val('');
        reloadAnswersTable(buttonFilterActive);
      }

      spinnerAnswer.addClass('hidden');
    });
  });

  // table filters
  filters.on('click', '.btn', function (e) {

    return;

    var button = $(this);

    e.preventDefault();
    e.stopImmediatePropagation();

    if(!button.is(buttonFilterActive)) {
      reloadAnswersTable(button);
    }
  });

  answers.on('click', '.js-answer-vote', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    reloadVote($(this), answerClass);
  });

});