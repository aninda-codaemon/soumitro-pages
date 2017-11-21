import { criminalScan } from '../../Control/steps/criminalScan';

criminalScan.onBeforeStart = function onBeforeStartCriminalScan() {
  $('.headline').text('Loading Public Records Service');
};

export { criminalScan };
