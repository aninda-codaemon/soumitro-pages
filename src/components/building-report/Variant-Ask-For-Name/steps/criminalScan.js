import criminalScan from '../../Control/steps/criminalScan';

function createComponent(options = {}) {
  let criminalScanInstance = criminalScan(options.criminalScan);
  criminalScanInstance.onBeforeStart = function onBeforeStartCriminalScan() {
    $('.headline').text('Loading Public Records Service');
  };

  return criminalScanInstance;
}

export default createComponent;
