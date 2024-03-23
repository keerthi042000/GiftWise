$(document).ready(function () {
    // Email input field event listener for real-time validation
    $('#email').on('blur', function () {
        var email = $(this).val();
        $('#passwordError').text('');
        if (!isValidEmail(email)) {
            $('#emailError').text('Please enter a valid email address.');
        } else {
            $('#emailError').text('');
        }
    });

    $('#email').on('input', function () {
        $('#emailError').text('');
        $('#passwordError').text('');
    });

    // Password input field event listener for real-time validation
    $('#password').on('input', function () {
        $('#passwordError').text('');
    });

    $('#loginForm').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission

        var formData = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        console.log('Login successful:', formData);
        if (!isValidEmail(formData.email)) {
            $('#emailError').text('Please enter a valid email address.');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/api/stock/login/', // Update the URL with your backend API endpoint
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Login successful:', response);
                // Handle success response
                window.location.href = 'page-account.html';
            },
            error: function (error) {
                console.error('Login error:', error);
                var errorMessage = '';
                if (error.status === 400) {
                    $('#passwordError').text('Invalid username/password combination');
                } else {
                    errorMessage = 'Something went wrong. Please try again later.';
                    alert(errorMessage); // Show a window popup for other errors
                }
            }
        });
    });
});

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}