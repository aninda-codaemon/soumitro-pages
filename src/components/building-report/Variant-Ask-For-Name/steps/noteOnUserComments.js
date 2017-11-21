import { noteOnUserComments } from '../../Control/steps/noteOnUserComments';

noteOnUserComments.onBeforeStart = function onBeforeStartNoteOnUserComments() {
  $('.headline').text('Important: Real Records Given');
};

export { noteOnUserComments };
