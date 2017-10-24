const Section = {
  init(steps) {
    this.active = false;
    this.currentStepIndex = 0;
    this.steps = steps;
  },
  start(onSectionCompleted) {
    this.active = true;
    this.onSectionCompleted = onSectionCompleted;
    this.startNextStep();
  },
  getCurrentStep() {
    return this.steps[this.currentStepIndex];;
  },
  getPreviousStep() {
    var previousStepIndex = this.currentStepIndex === 0 ? 0 : this.currentStepIndex - 1;
    return this.steps[previousStepIndex];
  },
  startNextStep() {
    var currentStep = this.getCurrentStep();
    var prevStep = this.getPreviousStep();
    currentStep.start(this.onStepCompleted.bind(this));
  },
  onStepCompleted() {
    this.currentStepIndex++;
    if (this.currentStepIndex < this.steps.length) {
      this.startNextStep();
      return;
    }
    this.sectionCompleted();
  },
  sectionCompleted() {
    this.active = false;
    this.completed = true;
    this.onSectionCompleted();
  },
  skipStep() {
    var currentStep = this.getCurrentStep();
    currentStep.skip();
  }
};

export default Section;
