import { addRelativesModal, createWizard } from 'components/building-report';
import amplify from 'utils/amplifyStore';
import { initialize } from '../Control/js/runner';
import './style.scss';

const buildingReportInstance = {
  addRelativesModal: () => addRelativesModal(),
  wizard: createWizard(),
};
const shouldIncludeRelatives = true;
initialize(buildingReportInstance, shouldIncludeRelatives);

// Default - Check emailbox
$('#emailCheckbox').prop('checked', true);

// Auto populate info form localStorage
const leadData = amplify.store('leadData') || {};

const firstName = leadData['account[first_name]'] || '';
const lastName = leadData['account[last_name]'] || '';
const email = leadData['user[email]'] || '';

$('#lead_first_name').val(firstName);
$('#lead_last_name').val(lastName);
$('#lead_email').val(email);
