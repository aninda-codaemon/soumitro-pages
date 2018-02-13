import noteOnUserComments from '../../Control/steps/noteOnUserComments';

function createComponent(options = {}) {
  let noteOnUserCommentsInstance = noteOnUserComments(options.noteOnUserComments);
  noteOnUserCommentsInstance.onBeforeStart = function onBeforeStartNoteOnUserComments() {
    $('.headline').text('Important: Real Records Given');
  };

  return noteOnUserCommentsInstance;
}

export default createComponent;
