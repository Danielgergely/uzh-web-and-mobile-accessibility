/**
 * Set the form control element to valid
 * @param {object} element - The DOM element
 */
function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

/**
 * Set the form control element to invalid with the error message
 * @param {object} element - The DOM element
 */
function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

/**
 * Remove validation information from the element
 * @param {object} element - The DOM element
 */
function removeValidation(element) {
    element.classList.remove('is-valid');
    element.classList.remove('is-invalid');
}

/**
 * Validate the login form and try to log the user in
 * @param {object} event - The DOM event
 */
function login(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;

    var $errorList = $('#login-error-list');
    $errorList.empty();

    $('.invalid-feedback').empty();

    var email = document.getElementById('login-email-control');
    var $emailFeedback = $(email).siblings('.invalid-feedback');

    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        $emailFeedback.text('Email is required');
        $errorList.append('<li><a href="#login-email-control">Email is required</a></li>');
        hasError = true;
    } else {
        setInvalid(email);
        $emailFeedback.text('Please enter a valid email address');
        $errorList.append('<li><a href="#login-email-control">Please enter a valid email address</a></li>');
        hasError = true;
    }

    var password = document.getElementById('login-password-control');
    var $passwordFeedback = $(password).siblings('.invalid-feedback');
    if (password.value.trim().length == 0) {
        setInvalid(password);
        $passwordFeedback.text('Password is required');
        $errorList.append('<li><a href="#login-password-control">Password is required</a></li>');
        hasError = true;
    } else {
        setValid(password);
    }

    if (hasError) {
        $('#login-error').removeClass('d-none');
        $errorList.removeClass('sr-only');

        $('#login-error').attr('tabindex', '-1').focus();

        $('#login-login-button').find('.state-indicator').text('Form has errors');
    } else {
        $('#login-error').addClass('d-none');
        $errorList.addClass('sr-only');

        $('#login-login-button').find('.state-indicator').text('');
    }
}

/**
 * Validate the login form and try to retrieve the password
 * @param {object} event - The DOM event
 */
function forgot(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;

    var $errorList = $('#login-error-list');
    $errorList.empty();
    $('.invalid-feedback').empty();

    var email = document.getElementById('login-email-control');
    var $emailFeedback = $(email).siblings('.invalid-feedback');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        $emailFeedback.text('Email is required for password recovery');
        $errorList.append('<li><a href="#login-email-control">Email is required for password recovery</a></li>');
        hasError = true;
    } else {
        setInvalid(email);
        $emailFeedback.text('Please enter a valid email address');
        $errorList.append('<li><a href="#login-email-control">Please enter a valid email address</a></li>');
        hasError = true;
    }

    var password = document.getElementById('login-password-control');
    removeValidation(password);
    $(password).siblings('.invalid-feedback').empty();

    if (hasError) {
        $('#login-error').removeClass('d-none');
        $errorList.removeClass('sr-only');

        $('#login-error').attr('tabindex', '-1').focus();

        $('#login-forgot-button').find('.state-indicator').text('Form has errors');
    } else {
        $('#login-error').addClass('d-none');
        $errorList.addClass('sr-only');

        $('#login-forgot-button').find('.state-indicator').text('');
    }
}

/**
 * Validate the login form and try to register the new user
 * @param {object} event - The DOM event
 */
function register(event) {
    event.preventDefault();
    event.stopPropagation();

    var hasError = false;
    
    var $errorList = $('#register-error-list');
    $errorList.empty();
    $('.invalid-feedback').empty();

    // First name validation
    var firstName = document.getElementById('register-first-name-control');
    var $firstNameFeedback = $(firstName).siblings('.invalid-feedback');
    if (firstName.value.trim().length == 0) {
        setInvalid(firstName);
        $firstNameFeedback.text('First name is required');
        $errorList.append('<li><a href="#register-first-name-control">First name is required</a></li>');
        hasError = true;
    } else if (firstName.validity.valid) {
        setValid(firstName);
    }

    // Last name validation
    var lastName = document.getElementById('register-last-name-control');
    var $lastNameFeedback = $(lastName).siblings('.invalid-feedback');
    if (lastName.value.trim().length == 0) {
        setInvalid(lastName);
        $lastNameFeedback.text('Last name is required');
        $errorList.append('<li><a href="#register-last-name-control">Last name is required</a></li>');
        hasError = true;
    } else if (lastName.validity.valid) {
        setValid(lastName);
    }

    // Email validation
    var email = document.getElementById('register-email-control');
    var $emailFeedback = $(email).siblings('.invalid-feedback');
    if (email.validity.valid) {
        setValid(email);
    } else if (email.validity.valueMissing) {
        setInvalid(email);
        $emailFeedback.text('Email is required');
        $errorList.append('<li><a href="#register-email-control">Email is required</a></li>');
        hasError = true;
    } else {
        setInvalid(email);
        $emailFeedback.text('Please enter a valid email address');
        $errorList.append('<li><a href="#register-email-control">Please enter a valid email address</a></li>');
        hasError = true;
    }

    // Password validation
    var password = document.getElementById('register-password-control');
    var $passwordFeedback = $(password).siblings('.invalid-feedback');
    var passwordValue = password.value.trim();
    if (passwordValue.length == 0) {
        setInvalid(password);
        $passwordFeedback.text('Password is required');
        $errorList.append('<li><a href="#register-password-control">Password is required</a></li>');
        hasError = true;
    } else if (passwordValue.length < 8) {
        setInvalid(password);
        $passwordFeedback.text('Password must be at least 8 characters long');
        $errorList.append('<li><a href="#register-password-control">Password must be at least 8 characters long</a></li>');
        hasError = true;
    } else if (passwordValue.length > 16) {
        setInvalid(password);
        $passwordFeedback.text('Password must be at most 16 characters long');
        $errorList.append('<li><a href="#register-password-control">Password must be at most 16 characters long</a></li>');
        hasError = true;
    } else if (passwordValue.match(/[a-zA-Z]+/) == null) {
        setInvalid(password);
        $passwordFeedback.text('Password must contain at least one letter');
        $errorList.append('<li><a href="#register-password-control">Password must contain at least one letter</a></li>');
        hasError = true;
    } else if (passwordValue.match(/[0-9]+/) == null) {
        setInvalid(password);
        $passwordFeedback.text('Password must contain at least one number');
        $errorList.append('<li><a href="#register-password-control">Password must contain at least one number</a></li>');
        hasError = true;
    } else {
        setValid(password);
    }

    // Programme validation
    var programme = document.getElementById('register-programme-control');
    var $programmeFeedback = $(programme).siblings('.invalid-feedback');
    if (programme.validity.valueMissing) {
        setInvalid(programme);
        $programmeFeedback.text('Please select a programme');
        $errorList.append('<li><a href="#register-programme-control">Please select a programme</a></li>');
        hasError = true;
    } else if (!programme.validity.valid) {
        setInvalid(programme);
        $programmeFeedback.text('Please select a valid programme');
        $errorList.append('<li><a href="#register-programme-control">Please select a valid programme</a></li>');
        hasError = true;
    } else {
        setValid(programme);
    }

    // Show/hide error summary
    if (hasError) {
        $('#register-error').removeClass('d-none');
        $errorList.removeClass('sr-only');

        // Set focus to error container for screen readers
        $('#register-error').attr('tabindex', '-1').focus();

        // Update button state for screen readers
        $('#register-register-button').find('.state-indicator').text('Form has errors');
    } else {
        $('#register-error').addClass('d-none');
        $errorList.addClass('sr-only');

        // Update button state for screen readers
        $('#register-register-button').find('.state-indicator').text('Processing registration...');

        // Here you would handle the actual registration process
        // For demonstration, let's just clear it after a moment
        setTimeout(function() {
            $('#register-register-button').find('.state-indicator').text('');
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document
        .getElementById('login-login-button')
        .addEventListener('click', login, false);

    document
        .getElementById('login-forgot-button')
        .addEventListener('click', forgot, false);

    document
        .getElementById('register-register-button')
        .addEventListener('click', register, false);
}, false);
