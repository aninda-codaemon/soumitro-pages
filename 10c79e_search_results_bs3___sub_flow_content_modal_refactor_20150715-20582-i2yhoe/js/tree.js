/*
 Definitions 
 SFC = Subflow content. A self-contained content block within a sequence of other content blocks. There are three types:
  - NO DECISION = An SFC that progresses without input from a user.
    - e.g. Switching SFCs with an animation or timeout.
  - ONE DECISION = An SFC that expects user to provide input, but always goes in one direction.
    - e.g. User clicks a continue button or submits a form.
  - MULTIPLE DECISIONS = An SFC that expects user to provide input, but can go in multiple directions.
    - e.g. User is given multiple options that lead to different SFCs.
 trigger = element that triggers the SFC switch, i.e. element that has the data-goto attribute
 currentSFC = visible SFC, i.e. the section trigger element is inside
 nextSFC = id of next page, i.e. value of data-goto
*/

/*
 HTML
 - Use class="SFC" to designate content blocks.
 - The element that triggers the progression to the next SFC (e.g. a progress bar, button) should have the data attribute data-goto="#location". 
 - #location = id assigned to the container of next SFC.
 - Trigger does not need to be a button or link. Can be triggered by a callback.
 - id="root" is given to a content block that kicks off the SFC. #root is visible by default. 
 - Event triggers (e.g. tags, classes, etc.) can be passed into sfcEngine through an options hash. If nothing is passed, <button> is the default trigger.
 - There can be any number of trigger types.
 - An element with an event listener attached can be given class="override" to ignore listener.
*/

/*
 Bootstrap:
 - For Bootstrap modals, etc. use standard BS3 syntax: 
   - e.g. <button data-toggle="modal">
   - <section class="modal fade SFC" role="dialog" tabindex="-1" aria-hidden="true">
 - For popovers and collapse, use BS3 data-toggles and add appropriate trigger to change.
*/

/*
 If SFC is inline:
 - Give section class="hidden".
 - .hidden { display: none; visibility: hidden; }
*/

/*
 SFC:
 - window.SFC controls functionality of individual SFCs. Should be globally namespaced in order to be organized into different files.
 - SFCs should be named after the value of their data attribute.
 - SFCs should have the following three functions:
   - start: All functionality that occurs while the SFC is in view.
   - end: All functionality triggered when the SFC exits. Often a reset or change.
   - reset: Revert SFC to original state.
 - Optionally, SFCs can have onBeforeStart and onAfterStart functions if different SFCs need to share information.
*/

// sfcEngine controls traversal of SFC
window.sfcEngine = window.sfcEngine || {};

;(function (window) {

  $.fx.interval = 100;

  $(window).on("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload();
    }
  });

  //sfcEngine behavior
  window.sfcEngine.go = {
    // sfcEngine event listeners
    events: function(options) {

      if ( !options ) {
        var options = {
          triggers: '.trigger',
        };
      }

      for (var i = 0; i < options.triggers.length; i += 1) {
        $(options.triggers[i]).on('click', function() {
          if ( !$(this).hasClass('override') ) {
            var trigger = $(this),
                currentSFC = trigger.closest('.SFC'),
                nextSFC = trigger.data('goto');

            window.sfcEngine.go.change(currentSFC, nextSFC);
          } 
        });
      }

      //$('body').on('click', '.modal-backdrop', function() {
        //if ( $('.modal.in').hasClass('animated') == true ) {
          //$('.modal.in').removeClass('animated').removeClass('shake');
        //} 

        //var timeout = setTimeout(function() {
          //$('.modal.in').addClass('animated').addClass('shake');
        //}, 0);
      //})

      $('body').on('click', '.close', function (el) {
        for (var i = 0; i < options.SFCs.length; i +=1) {
          window['SFC'][options.SFCs[i]]['reset']();
        }

        $('.modal').removeClass('animated').removeClass('shake');
      });
    },
    // Controls the transitions between SFCs.
    change: function(currentSFC, nextSFC) {
      // Hide/close current SFC
      if ( $(currentSFC).hasClass('modal') ) { 
        $(currentSFC).modal('hide'); 
      } else if ( $(currentSFC).attr('id') != 'root' ) {
        $(currentSFC).addClass('hidden');
      }

      // Show/open next SFC
      if ( $(nextSFC).hasClass('modal') ) { 
        $(nextSFC).modal('show'); 
        $(nextSFC).removeClass('hidden');
      } else {
        $(nextSFC).removeClass('hidden');
      }
      // Begins all functionality of new SFC
      if (nextSFC) window['SFC'][nextSFC.slice(1)]['start']();
    }
  }

}(window));

window.SFC = window.SFC || {};