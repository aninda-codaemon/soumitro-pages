import { get } from 'utils/request';

const REPORT_COUNT_URL = 'https://www.beenverified.com/stats/report_count.json';

export const getReportCount = () => get(REPORT_COUNT_URL).then(response => response.data);
