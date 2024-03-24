$(document).ready(function () {
    // Fetch user data when the page loads
    $('#logoutBtn').click(function() {
        $.ajax({
            url: 'http://localhost:3004/api/account/logout',
            type: 'GET',
            success: function(response) {
                window.location.href = 'page-login.html';
            },
            error: function(xhr, status, error) {
                console.error('Error logging out:', error);
            }
        });
    });

    $.get('http://localhost:3004/api/account/account_overview', function (data, status) {
        if (status === 'success') {
            console.log(data)
            // Populate the update form with existing data
            $('#name').val(data.firstName);
            $('#email').val(data.email);
            $('#phone').val(data.phone);
            const customerDetails = {
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@example.com",
                // Add more properties as needed
            };
            
        } else {
            $('#userData').html('<p>User data not found</p>');
        }
    });

    // Handle form submission for updating account details
    $('#updateForm').submit(function (e) {
        e.preventDefault(); // Prevent the default form submission

        $.post('http://localhost:3004/account/update', $(this).serialize(), function (data, status) {
            if (status === 'success') {
                $('#updateMessage').text('Account details updated successfully');
            } else {
                $('#updateMessage').text('Error updating account details');
            }
        });
    });
});
