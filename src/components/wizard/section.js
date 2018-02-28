const Section = {
  init(steps) {
    this.currentStepIndex = 0;
    this.steps = steps;
  },
  start(onSectionCompleted, onLastStepStart, isLastSection) {
    this.onSectionCompleted = onSectionCompleted;
    this.isLastSection = isLastSection;
    this.onLastStepStart = onLastStepStart;
    this.startNextStep();
  },
  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  },
  getPreviousStep() {
    var previousStepIndex = this.currentStepIndex === 0 ? 0 : this.currentStepIndex - 1;
    return this.steps[previousStepIndex];
  },
  isLastStep() {
    return this.currentStepIndex === this.steps.length - 1;
  },
  startNextStep() {
    const currentStep = this.getCurrentStep();
    const isLastStep = this.isLastStep() && this.isLastSection;
    if (isLastStep) {
      this.onLastStepStart();
    }
    currentStep.start(this.onStepCompleted.bind(this), isLastStep);
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
    this.onSectionCompleted();
  },
  skipStep() {
    var currentStep = this.getCurrentStep();
    currentStep.skip();
  },
};

export default Section;
