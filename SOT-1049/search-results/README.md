# Search Results

## Javascripts

### teaserrecord.js

### downsell.js

### runner.js

### flow.js

This is the primary javascript file that has functions and methods pertaining to the modal flow in the search-results page.

#### Code Outline (notes/comments)

* checkMobile() - checks to see if viewing site from a mobile device - returns a boolean (true/false) named check
* trackNL(event, props) - a function used to track events - has two (2) methods to pass:
	* properties
	* event name
* getExtraTeaserData(ctx) - a function that gets teaser data, parses it, and stores it in local cache.
	* very large (has many functions inside it) - should be broken down a bit and refactored
	* doesn't work too well with safari private browsing
	* has some bugs with IE8/IE9 
* modals[] - an array with modal objects (modal flow). modal object schema:
	* element - selects the modal from the DOM
	* duration - how long the modal animates (optional)
	* transitionDelay - set how long to wait until next modal is shown (optional)
	* splits [] - an array to split duration time (replace duration with this if you want to have more than one progress bar - only the first modal uses this so far)
	* animate - binds the modal function (what the modal actually does programatically) to the modal object
* initializingSearchProgress() - function binded to the first (1st) modal {} in modals []
	* trackNL tracks when modal is viewed
	* variables are defined, an array of progress bars (jquery selectors), randomizes durations (lodash)
		* $progressBars[]
		* self (this)
		* splits (_.shuffle(self.splits))
		* animations[]
	* a condition checks if user has mobile device and speeds up the duration
	* a loop defines animations using each split duration and pushes them into animations []
		* this can be refactored into it's own function (splitDurationAnimations or something similar)
    * $.when.apply(self, animations) - applies the animations to the modal (triggers when modal is active) and then transitions to the next modal in the flow using showNextModal() - adds delay if transitionDelay exists. - this can also be made into a universal function
* scanningSocialMedia() - function binded to the second (2nd) modal {} in modals []
	* trackNL tracks when modal is viewed
	* variables are defined
		* self (this)
		* duration (defined in modal {} in modals [])
			* if mobile - duration is decreased
	   * socialPromise - animation on progress bar
	* waits for socialPromise animation to finish before showing element: .complete
	setInterval function - default loading state of icons changes to various social media icons
		* once all icons are displayed (not in their default loading state) - showNextModal() is called
* reportReadyForDownload() - function binded to the third (3rd) modal {} in modals []
	* trackNL tracks when modal is viewed
	* variables are defined (jquery selectors)
	* reset image animations
	* toggleAnimations() - shows image animation
	* item click event - shows next modal
	* define duration (lower duration if mobile)
	* setInterval function - icons loading animation, enables continue button after duration
* loggingIn() - function binded to the fouth (4th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* variables are defined (jquery selectors) 
	* duration speed updated got mobile
	* progress bar is animated if modal is active
	* list items in modal are looped once (using index of item and duration)
	* modal elements are reset and next modal is loaded when duration times out
* captchaModal() - function binded to the fifth (5th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* rest of functionality is handled inside runner.js (need to update this)
* generatingReport() - function binded to the sixth (6th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* checks if modalCtx is defined and  fetches extra teaser data:
		* getExtraTeaserData(modalCtx)
* whoopsAccountNeeded() - function binded to the seventh (7th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* validateLeadForm() - validates the lead form using jquery validate
		* form selector: #signup-modal-form
		* form fields: account[first_name], account[last_name], user[email]
* fcraConfirmation() - function binded to the eighth (8th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* fcraConfirm() - validates the fcra form using jquery validate
		* form selector: #fcra-confirm
		* form fields: fcraCheckbox2
		* showNextModal() on form submit
* foundDataModal() - function binded to the ninth (9th) modal {} in modals []
	* trackNL tracks when modal is viewed
	* click event binded to `.data-modal-confirm` redirects to the next page (subscribe) after a 300ms timeout
* scanningSocialMediaReset()
* resetModalFlow()
* event handlers (not functions - jquery events)
	* body on click close => resetModalFlow()
	* modal1Close on click => resetModalFlow()
	* modal-backdrop on click => resetModalFlow()
	* gen-report-confirm on click => showNextModal()
	* signup-modal-form on submit => showNextModal()
	* window on pageshow (event) => if event.originalEvent.persisted then window.loation.reload()
		* this forces cache refresh when visiting page by hitting back button
	* body on click close => modal remove classes animated and shake
* keyMap()
* window.startModalFlow(ctx)
	* binds passed method (ctx) to modalCtx var
	* resetModalFlow()
	* showNextModal()
* window.showNextModal = showNextModal
	* not too sure why but it sets global showNextModal to local showNextModal
* body on click a.btn-block => add class visitied to (this) selector
	* this is the code Alex added to update button style of previously clicked Access Report buttons

#### Modal Features (WIP - Work in Progress)

* Modal Types
	* Progress Bar Modals (modals that show progress bars)
	* Form/Event Modals (modals that show forms or events)
	* Data Modals (modals that show data)
* Modal Properties
	* Modal ID / Name / Order
	* Duration / Transition / Splits (progress bars)
	* Animation Binding (Binds Custom Functionality to Modal ID)
	* Data Binding (data modals)

#### Roadmap

## Stylesheets

### styles.css

One stylesheet for all the styles for the page

#### Notes

It's a very large file that hasn't been maintained very well. Contains a lot of redunancies and repeating styles. Many overwrites at the bottom of the file which leaves a lot of unused code (can be very slow to load). Not organized very well (doesn't seem to cascade). Not mobile first which makes it hard to scale.

#### Roadmap

* modularize into seperate stylesheets (see PL for an example/starting point)
* use modern css tools to better organize styles for dev and minify for prod (postCSS/libSASS/etc...)
* create a universal style guide that can be used across all future BV products
	* important to share assets across pages - easier to maintain when they're in the same place
	* create variables that define the style guide / branding / typography / elements / etc...

## Assets

Currently only assets are images and fonts

#### Notes

Need a better way to share assets ( images, logos, etc... ) across pages. Would be great if assets can be 
organized better (brands and logos together, icons together, modal assets, etc...).

#### Roadmap

* Convert to svg as much as you can and optimize images for faster loading
* Fallbacks for IE8/9 (png and svg don't work well in these browsers)
* 
