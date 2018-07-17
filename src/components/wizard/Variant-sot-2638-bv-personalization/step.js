
import { track } from 'utils/track';

const second = 1000;
const noop = () => {};

const Step = {
  init(options) {
    this.title = options.title;
    this.trackMsg = options.trackMsg;
    this.duration = (options.duration && options.duration * second) || 0;
    this.transitionDelay = (options.transitionDelay && options.transitionDelay * second) || 0;
    this.openModal = options.openModal;
    this.onStart = options.onStart;
    this.closeModal = options.closeModal || noop;
    this.$elem = options.$elem;
    this.$modal = options.$modal;
    this.onBeforeStart = options.onBeforeStart || noop;
    this.isCompleted = false;
    this.complete = this.complete.bind(this);
    this.footerToDisplay = options.footerToDisplay || 0;
    this.headerToDisplay = options.headerToDisplay || 1;
  },
  start(onCompleted, isLastStep) {
    this.onBeforeStart();
    this.setTitle();
    this.track();
    this.onCompleted = onCompleted;
    this.isLastStep = isLastStep;
    this.$elem.addClass('active').parent().show();
    this.onStart(this.complete);
  },
  skip() {
    this.transitionDelay = 0;
    if (this.$modal && !this.isModalDispled) {
      this.isModalDispled = true;
      this.openModal(this.complete, this.duration);
    } else {
      this.closeModal();
      this.complete();
    }
  },
  setTitle() {
    $('.subHeadline').text(this.title);
  },
  track() {
    track(`Viewed ${(this.trackMsg || this.title)}`);
  },
  complete() {
    if (!this.isCompleted) {
      setTimeout(() => {
        if (!this.isLastStep) {
          this.$elem.removeClass('active').parent().hide();
        }
        this.onCompleted();
      }, this.transitionDelay);
    }
    this.isCompleted = true;
  },
};

export default Step;
