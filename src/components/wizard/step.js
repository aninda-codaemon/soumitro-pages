
import { track } from 'utils/track';

const second = 1000;

const Step = {
  init(options) {
    this.title = options.title;
    this.trackMsg = options.trackMsg;
    this.duration = options.duration && options.duration * second || 0;
    this.transitionDelay = options.transitionDelay && options.transitionDelay * second || 0;
    this.onStart = options.onStart;
    this.$elem = options.$elem;
    this.isCompleted = false;
  },
  start(onCompleted) {
    this.setTitle();
    this.track();
    this.onCompleted = onCompleted;
    this.$elem.addClass('active').parent().show();
    this.onStart(this.complete.bind(this));
  },
  skip() {
    this.transitionDelay = 0;
    this.complete();
  },
  setTitle() {
    $('.subHeadline').text(this.title);
  },
  track() {
    track('Viewed ' + (this.trackMsg || this.title));
  },
  complete() {
    if (!this.isCompleted) {
      setTimeout(() => {
        this.$elem.removeClass('active').parent().hide();
        this.onCompleted();
      }, this.transitionDelay);
    }
    this.isCompleted = true;
  }
};

export default Step;
