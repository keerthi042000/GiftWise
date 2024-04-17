$(document).ready(function () {
    var originalEmail, originalFirstName, originalLastName, originalAddress, originalZipcode, originalPhone, originalDOB = '';
    var accessToken = localStorage.getItem('accessToken');
    var order_details = [];
    var currentPage = 1;
    var ordersPerPage = 5;

    function populateOrdersTable(page) {
        $('#ordersBody').empty();
        var startIndex = (page - 1) * ordersPerPage;
        var endIndex = startIndex + ordersPerPage;
        var displayedOrders = order_details.slice(startIndex, endIndex);

        displayedOrders.forEach(order => {
            console.log("order : ",order);
            const row = `<tr>
                <td style="border: none;"><a id="order-id" data-orderid="${order.orderId}">${order.orderId}</a></td>
                <td style="border: none;"><b><input type="text" name="Createddate${order.orderId}" value="${new Date(order.orderDatetime).toLocaleDateString()}"
                style="border-color: #f4f5f9; background-color: #f7f8f9;" id="Createddate${order.orderId}" required></b></td>
                <td style="border: none;"><b><input type="text" name="Status${order.orderId}" value="${order.status}"
                style="border-color: #f4f5f9; background-color: #f7f8f9;" id="Status${order.orderId}" required></b></td>
                <td style="border: none;"><b><input type="text" name="Amount${order.orderId}" value="${order.totalAmount}"
                style="border-color: #f4f5f9; background-color: #f7f8f9;" id="Amount${order.orderId}" required></b></td>
            </tr>`;
            $('#ordersBody').append(row);
        });
    }

    function updatePaginationButtons() {
        $('#pagination').empty();
        var totalPages = Math.ceil(order_details.length / ordersPerPage);
        const maxVisiblePages = 2;
        var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
        if (currentPage > 1) {
            const firstPageButton = `<button class="pageButton" id="prevButton">&lt;</button>`;
            $('#pagination').append(firstPageButton);
        }
    
        if (startPage > 2) {
            const prevEllipsis = `<span class="ellipsis">..</span>`;
            $('#pagination').append(prevEllipsis);
        }
    
        for (let i = startPage; i <= endPage; i++) {
            const button = `<button class="pageButton ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            $('#pagination').append(button);
        }
    
        if (endPage < totalPages - 1) {
            const nextEllipsis = `<span class="ellipsis">..</span>`;
            $('#pagination').append(nextEllipsis);
        }
    
        if (currentPage < totalPages) {
            const lastPageButton = `<button class="pageButton" id="nextButton">&gt;</button>`;
            $('#pagination').append(lastPageButton);
        }
    
        $('#prevButton').on('click', () => {
            if (currentPage > 1) {
                currentPage--;
                populateOrdersTable(currentPage);
                updatePaginationButtons();
            }
        });
    
        $('#nextButton').on('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                populateOrdersTable(currentPage);
                updatePaginationButtons();
            }
        });
    }

    function updateOriginalValues(formData) {
        if (formData.user.emailId) originalEmail = formData.user.emailId;
        if (formData.customer.firstName) originalFirstName = formData.customer.firstName;
        if (formData.customer.lastName) originalLastName = formData.customer.lastName;
        if (formData.customer.address) originalAddress = formData.customer.address;
        if (formData.customer.zipcode) originalZipcode = formData.customer.zipcode;
        if (formData.Phone.phoneNumber) originalPhone = formData.Phone.phoneNumber;
        if (formData.customer.dob) originalDOB = formData.customer.dob;
    }

    function isFieldChanged(originalValue, newValue) {
        return originalValue !== newValue;
    }

    $.ajax({
        type: 'GET',
        url: accountDomain + '/account_overview/',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            if(data.status === 401){
                alert("Unauthorized");
                logout();
                window.location.href = 'page-login.html';
            }else if(data.status !== 200){
                alert("Something went wrong");
            }else{
                $('#fName').val(data.payload.FIRSTNAME);
                $('#DropdownName, #WelcomeName').text(data.payload.FIRSTNAME);
                $('#lastName').val(data.payload.LASTNAME);
                $('#email').val(data.payload.EMAILID);
                $('#Address').val(data.payload.ADDRESS);
                $('#ZipCode').val(data.payload.ZIPCODE);
                $('#phno').val(data.payload.PHONENUMBER);
                const dobDate = new Date(data.payload.DOB.split("T")[0]);
                $('#dob').val(dobDate.toISOString().split("T")[0]);
                $('#rewardPointsCircle').text(data.payload.POINTS);

                originalFirstName = data.payload.FIRSTNAME;
                originalLastName = data.payload.LASTNAME;
                originalEmail = data.payload.EMAILID;
                originalAddress = data.payload.ADDRESS;
                originalZipcode = data.payload.ZIPCODE;
                originalPhone = data.payload.PHONENUMBER;
                originalDOB = dobDate.toISOString().split("T")[0];
                order_details = data.payload.order_details;

                populateOrdersTable(currentPage);
                updatePaginationButtons();
            
                $('#pagination').on('click', '.pageButton', function () {
                    const page = parseInt($(this).data('page'));
                    if (page !== currentPage) {
                        currentPage = page;
                        populateOrdersTable(currentPage);
                        updatePaginationButtons();
                    }
                });
                localStorage.setItem('firstName', data.payload.FIRSTNAME);
                localStorage.setItem('rewardPoints', data.payload.POINTS);

            }

        },
        error: function (error) {
            console.log("error : ",error);
            alert("Something went wrong");
        }
    });

    $('#accountUpdate').submit(function (e) {
        e.preventDefault();
        var formData = {
            user : {},
            customer : {},
            Phone : {}
        };

        if (isFieldChanged(originalEmail, $('#email').val())) {
            formData['user'].emailId = $('#email').val();
        }
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
            url: accountDomain + '/update_details',
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
                    updateOriginalValues(formData);
                }
            },
            error: function (error) {
                console.error('Error:', error);
                alert(error.responseText);
            }
        });
    });

    $('#accountUpdatepwd').submit(function (e) {
        e.preventDefault();
        let formData = {
            user: {}
        };


        if ($('#npassword').val() !== $('#cpassword').val()) {
            alert("Passwords do not match");
            return false;
        } 

        formData['user'].password = $('#password').val();
        formData['user'].newpassword = $('#npassword').val();
        
        console.log(formData);
        $.ajax({
            type: 'PUT',
            url: accountDomain + '/update_details',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                if (response.status === 401) {
                    alert("Unauthorized");
                    window.location.href = 'page-login.html';
                } else if (response.status !== 200) {
                    console.error('Error:', response);
                    alert(response.errorMessage);
                } else {
                    alert("Password changed successfully");
                    $('#password').val('');
                    $('#npassword').val('');
                    $('#cpassword').val('');
                    $("#saveButton2").toggle(false);
                }
            },
            error: function (error) {
                console.error('Error:', error);
                alert(error.responseText);
            }
        });
    });



    $(document).on('click', '#order-id', function () {
        console.log("inside function");

        const orderId = $(this).data('orderid');
        $.ajax({
            type: 'GET',
            url: orderAPI+`?orderID=${orderId}`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (data) {
                console.log(data.payload[0]);
                const OrderDate = new Date(data.payload[0].orderDatetime).toLocaleDateString('en-US');
                const endDate = new Date(data.payload[0].endDate).toLocaleDateString('en-US');
                $('#orderDetailsModalTitle').text(`Order Details`);
                $('#orderDetailsModalTitle').addClass('modal-title');
                $('#orderDetailsModalTitle').append(`<p class="modal-subtitle">${data.payload[0].productName}</p>`);
                $('#orderDetailsModalBody').empty();
                $('#orderDetailsModalBody').addClass('modal-body');
                $('#orderDetailsModalBody').append(`<div class="order-details-item"><strong> Order ID : </strong> ${data.payload[0].orderId}</div>
                <div class="order-details-item"><strong> Product Name : </strong> ${data.payload[0].productName}</div>
                <div class="order-details-item"><strong> Brand Name : </strong> ${data.payload[0].brandName}</div>
                <div class="order-details-item"><strong> Category Name : </strong> ${data.payload[0].categoryName}</div>
                <div class="order-details-item"><strong> Total Amount : </strong> ${data.payload[0].totalAmount}</div>
                <div class="order-details-item"><strong> Discount Applied : </strong> ${data.payload[0].discount}</div>
                <div class="order-details-item"><strong> Gift card number : </strong> ${data.payload[0].giftCardNumber}</div>
                <div class="order-details-item"><strong> Gift card pin : </strong> ${data.payload[0].giftCardPin}</div>
                <div class="order-details-item"><strong> Gift card status : </strong> ${data.payload[0].giftCardStatus}</div>
                <div class="order-details-item"><strong> Valid till : </strong> ${endDate}</div>
                <div class="order-details-item"><strong> Order Date : </strong> ${OrderDate}</div>`);
                $('#orderDetailsModal').modal('show');
            },
            error: function (error) {
                console.error('Error:', error);
                alert('Failed to fetch order details.');
            }
        });
    });


    $('#feedbackForm').submit(function (e) {
        e.preventDefault();
        console.log("inside submit ");
        const feedbackText = document.getElementById('feedbackText').value;
        const ratingValue = document.querySelector('.star-rating input:checked').value;
        const data = {
            feedback: feedbackText,
            rating: ratingValue
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3004/api/account/feedback',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                if (response.status === 401) {
                    alert("Unauthorized");
                    window.location.href = 'page-login.html';
                } else if (response.status !== 200) {
                    console.error('Error:', response);
                    alert(response.errorMessage);
                } else {
                    alert("Thank you for your response");
                    $('#feedbackText').val('');
                    $('.star-rating input:checked').prop('checked', false);
                }
            },
            error: function (error) {
                console.error('Error:', error);
                alert(error.responseText);
            }
        });
    });
    
});