function hideExternalLoading(indexModalToDisplay) {
  var loads = $('#loadingModal .progress');
  var modTitles = $('.emdTitle');
  $('#loadingModal').addClass('hidden');
  $(loads[indexModalToDisplay]).addClass('hidden');
  $(modTitles[indexModalToDisplay]).addClass('hidden');
  if (!$('.cont-loading-aditional').hasClass('hidden')) {
    $('.cont-loading-aditional').addClass('hidden');
  }
}

function onAnimationComplete(stepCompleted, indexModalToDisplay) {
  hideExternalLoading(indexModalToDisplay);
  stepCompleted();
}

function hideExternalModalTitle() {
  var $modTitles = $('#externalModal .emdlTitle');
  $modTitles.addClass('hidden');
}

function hideExternalModal(indexModal) {
  var extModals = $('#externalModal .ext-mod');
  $('#externalModal').addClass('hidden').modal('hide');
  $(extModals[indexModal]).addClass('hidden');
  hideExternalModalTitle();
}

function showExternalLoading(stepCompleted, duration, indexModalToDisplay) {
  var loads = $('#loadingModal .progress');
  var modTitles = $('.emdTitle');
  var $progBar = $(loads[indexModalToDisplay]).find('.progress-bar');
  $progBar.animate({ width: '100%' }, {
    duration,
    complete: () => onAnimationComplete(stepCompleted, indexModalToDisplay),
  });
  $('#loadingModal')
    .modal({
      show: true,
      keyboard: false,
    })
    .removeClass('hidden');
  if (loads[indexModalToDisplay]) {
    $(loads[indexModalToDisplay]).removeClass('hidden');
    $(modTitles[indexModalToDisplay]).removeClass('hidden');
  }

  $('.cont-loading-aditional').toggleClass('hidden', !indexModalToDisplay);
}

function showExternalModal(stepCompleted, duration, indexModal, skipModal) {
  var extModals = $('#externalModal .ext-mod');
  var modTitles = $('#externalModal .emdlTitle');

  $('#externalModal')
    .modal({
      show: true,
      keyboard: false,
    })
    .removeClass('hidden');
  if (extModals[indexModal]) {
    $(extModals[indexModal]).removeClass('hidden');
    $(modTitles[indexModal]).removeClass('hidden');
    if (indexModal === 1) {
      $('div#externalModal .modal-header').css({
        'background-color': '#DC0216',
      });
    }
    $(extModals[indexModal]).removeClass('hidden');
    if (skipModal) {
      return;
    }
    setTimeout(() => {
      if (indexModal < 1) {
        hideExternalModal(indexModal);
        stepCompleted();
      }
    }, duration);
  }
}

export {
  showExternalLoading,
  hideExternalLoading,
  showExternalModal,
  hideExternalModal,
  hideExternalModalTitle,
};
