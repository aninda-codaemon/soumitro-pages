const WizardManager = {
  init(sections) {
    this.currentSectionIndex = 0;
    this.sections = sections;
    // This is added because we might want to pass this function to the bvgo command.
    // & we need to keep reference to the WizardManager object.
    this.skipStep = this.skipStep.bind(this); 
    return this;
  },
  getCurrentSection() {
    return this.sections[this.currentSectionIndex];
  },
  getCurrentSectionIndex() {
    return this.currentSectionIndex;
  },
  start() {
    this.startNextSection();
  },
  startNextSection() {
    var currentSection = this.getCurrentSection();
    currentSection.start(this.onSectionCompleted.bind(this));
  },
  onSectionCompleted() {
    this.currentSectionIndex++;
    this.updateHeadlines();
    if (this.currentSectionIndex < this.sections.length) {
      this.startNextSection();
    }
  },
  updateHeadlines() {
    var stepsContainerSelector = $('.wizard-header');
    var currentSectionIndex = this.getCurrentSectionIndex();
    stepsContainerSelector.find('.wizard-steps-panel .step-' + currentSectionIndex)
      .toggleClass('doing')
      .toggleClass('done')
      .find('.number')
      .html('&nbsp;');
    stepsContainerSelector.find('.wizard-steps-panel .step-' + (currentSectionIndex + 1))
      .toggleClass('doing')
      .contents()
      .find('.number')
      .html('&nbsp;');
  },
  skipStep() {
    var currentSection = this.getCurrentSection();
    currentSection.skipStep();
  }
};

export default WizardManager;