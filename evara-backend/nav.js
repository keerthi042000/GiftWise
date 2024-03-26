$(document).ready(function () {
    $('#nav').empty()
    $('#nav').append(`<ul class="menu-aside">

        <li id="brand" class="menu-item ${localStorage.getItem("currentScreen") == "brands"? 'active': ''}">
            <a class="menu-link" href="page-brands.html"> <i class="icon material-icons md-add_box"></i>
                <span class="text">Brands</span> </a>
        </li>  
        <li id="category" class="menu-item ${localStorage.getItem("currentScreen") == "category"? 'active': ''}">
            <a class="menu-link" href="page-category.html"> <i class="icon material-icons md-add_box"></i>
                <span class="text">Category</span> </a>
        </li>
        <li id="promocode" class="menu-item" ${localStorage.getItem("currentScreen") == "promocode"? 'active': ''}>
            <a class="menu-link" href="page-promocode.html"> <i class="icon material-icons md-add_box"></i>
                <span class="text">Promocode</span>
            </a>
        </li>
        <li id="product" class="menu-item has-submenu">
            <a class="menu-link" href="page-form-product-1.html"> <i class="icon material-icons md-add_box"></i>
                <span class="text">Add product</span>
            </a>
            <div class="submenu">
                <a href="page-form-product-1.html">Add product 1</a>
                <a href="page-form-product-2.html">Add product 2</a>
                <a href="page-form-product-3.html">Add product 3</a>
                <a href="page-form-product-4.html">Add product 4</a>
            </div>
        </li>
        <li id="order" class="menu-item has-submenu">
            <a class="menu-link" href="page-orders-1.html"> <i class="icon material-icons md-shopping_cart"></i>
                <span class="text">Orders</span>
            </a>
            <div class="submenu">
                <a href="page-orders-1.html">Order list 1</a>
                <a href="page-orders-2.html">Order list 2</a>
                <a href="page-orders-detail.html">Order detail</a>
                <a href="page-orders-tracking.html">Order tracking</a>
                <a href="page-invoice.html">Invoice</a>
            </div>
        </li>
        <li class="menu-item has-submenu">
            <a class="menu-link" href="page-transactions-1.html"> <i class="icon material-icons md-monetization_on"></i>
                <span class="text">Transactions</span>
            </a>
            <div class="submenu">
                <a href="page-transactions-1.html">Transaction 1</a>
                <a href="page-transactions-2.html">Transaction 2</a>
                <a href="page-transactions-details.html">Transaction Details</a>
            </div>
        </li>
        <li class="menu-item">
            <a class="menu-link" href="page-reviews.html"> <i class="icon material-icons md-comment"></i>
                <span class="text">Reviews</span>
            </a>
        </li>
        </ul>
        <hr>
        <br>
        <br>`)
    $('#headertop').empty()
    $('#headertop').append(`<header class="main-header navbar">
    <div class="col-search">

    </div>
    <div class="col-nav">
        <button class="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside"> <i
                class="material-icons md-apps"></i> </button>
        <ul class="nav">
            <li class="dropdown nav-item">
                <a class="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownAccount"
                    aria-expanded="false"> <img class="img-xs rounded-circle"
                        src="assets/imgs/people/avatar2.jpg" alt="User"></a>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAccount">
                    <a class="dropdown-item" href="#"><i class="material-icons md-perm_identity"></i>Edit
                        Profile</a>
                    <a class="dropdown-item" href="#"><i class="material-icons md-settings"></i>Account
                        Settings</a>
                    <a class="dropdown-item" href="#"><i
                            class="material-icons md-account_balance_wallet"></i>Wallet</a>
                    <a class="dropdown-item" href="#"><i class="material-icons md-receipt"></i>Billing</a>
                    <a class="dropdown-item" href="#"><i class="material-icons md-help_outline"></i>Help
                        center</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-danger" href="#"><i
                            class="material-icons md-exit_to_app"></i>Logout</a>
                </div>
            </li>
        </ul>
    </div>
</header>`)    
});

