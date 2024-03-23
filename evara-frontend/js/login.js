$(document).ready(function () {
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

    $('#password').on('input', function () {
        $('#passwordError').text('');
    });

    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var formData = {
            email: $('#email').val(),
            password: $('#password').val()
        };
        if (!isValidEmail(formData.email)) {
            $('#emailError').text('Please enter a valid email address.');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/api/account/login/',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Login successful:', response);
                window.location.href = 'page-account.html';
            },
            error: function (error) {
                console.error('Login error:', error);
                $('#passwordError').text(error.responseText);
            }
        });
    });
});

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}