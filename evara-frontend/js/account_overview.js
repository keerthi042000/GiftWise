$(document).ready(function () {
    // Fetch user data when the page loads
    $.get('http://localhost:3004/api/stock/account_overview', function (data, status) {
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
