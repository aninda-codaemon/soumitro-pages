import _assignIn from 'lodash/assignIn';

const noop = () => { };
const defaultOptions = {
  startCount: 0,
  slope: 1.0,
  interval: 1000,
  afterUpdateCallback: noop
};

const Counter = {
  init(newOptions) {
    const options = _assignIn(defaultOptions, newOptions);
    let currentCount = options.startCount;
    let currentIteration = 0.0;
    return {
      start() {
        currentCount = Math.ceil((options.slope * currentIteration) + options.startCount);
        currentIteration = currentIteration + 1.0;
        options.afterUpdateCallback(currentCount);
        setTimeout(this.start, options.interval);
      }
    };
  }
};

export { Counter };
