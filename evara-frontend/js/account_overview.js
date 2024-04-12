function logout() {
    localStorage.removeItem('accessToken');
    window.location.href = 'page-login.html';
}
$(document).ready(function () {
    var originalEmail, originalFirstName, originalLastName, originalAddress, originalZipcode, originalPhone, originalDOB = '';
    var accessToken = localStorage.getItem('accessToken');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3004/api/account/account_overview',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            if(data.status === 401){
                alert("Unauthorized");
                window.location.href = 'page-login.html';
            }else if(data.status !== 200){
                alert("Something went wrong");
            }else{
                console.log('Account overview:', data);
                console.log(data);
                console.log(data.payload);
                console.log("firstname : ",data.payload.FIRSTNAME, "lastname : ",data.payload.LASTNAME);

                $('#fName').val(data.payload.FIRSTNAME);
                $('#DropdownName').text(data.payload.FIRSTNAME);
                $('#WelcomeName').text(data.payload.FIRSTNAME);
                $('#lastName').val(data.payload.LASTNAME);
                $('#email').val(data.payload.EMAILID);
                $('#Address').val(data.payload.ADDRESS);
                $('#ZipCode').val(data.payload.ZIPCODE);
                $('#phno').val(data.payload.PHONENUMBER);

                dateOfBirthString = data.payload.DOB;
                dobDate = new Date(dateOfBirthString.split("T")[0]);
                dobInput = document.getElementById("dob");
                dobInput.value = dobDate.toISOString().split("T")[0];

                originalFirstName = data.payload.FIRSTNAME;
                originalLastName = data.payload.LASTNAME;
                originalEmail = data.payload.EMAILID;
                originalAddress = data.payload.ADDRESS;
                originalZipcode = data.payload.ZIPCODE;
                originalPhone = data.payload.PHONENUMBER;
                originalDOB = dobDate.toISOString().split("T")[0];
            }

        },
        error: function (error) {
            console.error('Account overview error:', error);
            console.log("error : ",error);
            alert("Something went wrong");
        }
    });

    function isFieldChanged(originalValue, newValue) {
        return originalValue !== newValue;
    }

    $('#accountUpdate').submit(function (e) {
        console.log("inside accountUpdate");

        e.preventDefault();
        var formData = {
            user : {},
            customer : {},
            Phone : {}
        };

        if (isFieldChanged(originalEmail, $('#email').val())) {
            formData['user'].emailId = $('#email').val();
        }
        // if (isFieldChanged(originalPassword, $('#password').val())) {
        //     formData['user'].password = $('#password').val();
        // }
        if (isFieldChanged(originalFirstName, $('#firstName').val())) {
            formData['customer'].firstName = $('#firstName').val();
        }
        if (isFieldChanged(originalLastName, $('#lastName').val())) {
            formData['customer'].lastName = $('#lastName').val();
        }
        if (isFieldChanged(originalDOB, $('#dob').val())) {
            formData['customer'].dob = $('#dob').val();
        }
        if (isFieldChanged(originalAddress, $('#Address').val())) {
            formData['customer'].address = $('#Address').val();
        }
        if (isFieldChanged(originalZipcode, parseInt($('#ZipCode').val(), 10))) {
            formData['customer'].zipcode = parseInt($('#ZipCode').val(), 10);
        }
        if (isFieldChanged(originalPhone, parseInt($('#phno').val(), 10))) {
            formData['Phone'].phoneNumber = parseInt($('#phno').val(), 10);
            formData['Phone'].phoneType = 'mobile';
        }

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3004/api/account/update_details',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                if(response.status === 401){
                    alert("Unauthorized");
                    window.location.href = 'page-login.html';
                }else if(response.status !== 200){
                    console.error('Error:', response);
                    alert(response.errorMessage);
                }else{
                    alert("Account details updated successfully");
                    $("#saveButton").toggle(false);
                    $("#saveButton1").toggle(false);
                    $("#saveButton2").toggle(false);
                }
            },
            error: function (error) {
                console.error('Error:', error);
                alert(error.responseText);
            }
        });
    });
});
