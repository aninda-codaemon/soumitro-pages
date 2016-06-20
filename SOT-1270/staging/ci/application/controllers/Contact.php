<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {


	// settings
	protected 	$sendEmailTo 		= 	'ckaiser@beenverified.com'; //change this!
	protected	$subjectLine 		= 	""; // actually set on line 58.

	// views
	protected 	$formView			= 	'contact';
	protected	$successView		= 	'contact_success';
	protected	$errorView			= 	'contact_error'; //used when the mail failed.

	protected  	$displayEmailWhenError = FALSE; // if $errorView is shown, should we reveal $sendEmailTo?

	// spam protection
	protected	$spam_protection	= 	TRUE; // true or false
	protected 	$spam_question		=	'What color is a green frog?';
	protected	$spam_answer		= 	'green';

	// other
	public 		$data 				= 	array(); // used for the views


	public function __construct() {
		parent::__construct();

		$this->load->library('form_validation');
		$this->load->helper('url');
		$this->load->library('email');

	}


	public function index() {


		$this->subjectLine = "public-records.net Support - " . $_SERVER['HTTP_HOST'];

		$this->set_validation_rules();
		$this->set_view_captcha_data();


		if($this->form_validation->run() == FALSE) {
			// show the form
			$this->show_view($this->formView);

		} else {
			// success! email it, assume it sent, then show contact success view.
			if ($this->send_mail()) {
				$this->show_view($this->successView);
			}
			else {
				log_message("error","Contact form - Error sending email. Debug message: " . $this->email->print_debugger() . " from: {$this->input->post('email')}. Message: {$this->input->post('message')}");
				$this->show_view($this->errorView);

			}

			// load the view
			// if $this->headerView/footerView is set it will load their views

		}
	}


	/* HELPER FUNCTIONS */


	// load the form view
	protected function show_view($view) {

			$this->load->view($view,$this->data);

	}

	protected function send_mail() {
			$this->email->from($this->input->post('email'), $this->input->post('name'));
			$this->email->to($this->sendEmailTo);
			$this->email->subject($this->subjectLine);
			$this->email->message($this->input->post('message'));
			return $this->email->send();


	}

	// set the $this->data variables (which is sent to the view)
	// for the question/answer for spam protection.
	protected function set_view_captcha_data() {
		$this->data['show_spam_protection'] = $this->spam_protection; // used in the view
		$this->data['spam_question'] = $this->spam_question; // used in the view

		if ($this->displayEmailWhenError == TRUE) {
			$this->data['displayEmailWhenError'] = TRUE;
			$this->data['sendEmailTo'] = $this->sendEmailTo;
		}
		else {
			$this->data['displayEmailWhenError'] = FALSE;
		}
	}

	protected function set_validation_rules() {
		$this->form_validation->set_rules('name', 'Your name', 'trim|required');
		$this->form_validation->set_rules('email', 'Your Email', 'trim|required|valid_email');
		$this->form_validation->set_rules('message', 'Message', 'trim|required|xss_clean');

		if ($this->spam_protection) {
			$this->form_validation->set_rules('spam_protection', 'Spam Protection', 'callback__spam_protection');
		}
	}

	// the callback for checking the spam protection. Only one question/one answer, very basic.
	public function _spam_protection($str)
	{
		// we will assume the user is lazy with their caps lock
		if (strtolower(trim($str)) == strtolower(trim($this->spam_answer))) {
			return true;
		}
		else {
			$this->form_validation->set_message('_spam_protection', 'The %s field did not match the correct answer');
			return false;
		}
	}




}
