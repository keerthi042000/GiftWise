$(document).ready(function () {
    $('#emailId').on('blur', function () {
        var emailId = $(this).val();
        $('#passwordError').text('');
        if (!isValidEmail(emailId)) {
            $('#emailError').text('Please enter a valid email address.');
        } else {
            $('#emailError').text('');
        }
    });

    $('#emailId').on('input', function () {
        $('#emailError').text('');
        $('#passwordError').text('');
    });

    $('#password').on('input', function () {
        $('#passwordError').text('');
    });

    $('#loginForm').submit(function (e) {
        e.preventDefault();

        var formData = {
            emailId: $('#emailId').val(),
            password: $('#password').val()
        };
        if (!isValidEmail(formData.emailId)) {
            $('#emailError').text('Please enter a valid email address.');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: accountDomain + '/login/',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                console.log('Login successful:', response);
                if(response.status !== 200){
                    $('#passwordError').text(response.errorMessage);
                }else{
                    if(response.payload.isSuperAdmin){
                        localStorage.setItem('accessToken', response.payload.accessToken);
                        window.location.href = './../../evara-backend/page-brands.html';
                    }else{
                    localStorage.setItem('accessToken', response.payload.accessToken);
                    window.location.href = 'page-account.html';
                    }
                }
            },
            error: function (error) {
                console.error('Login error:', error);
                $('#passwordError').text(error.responseText);
            }
        });
    });
});

function isValidEmail(emailId) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailId);
}