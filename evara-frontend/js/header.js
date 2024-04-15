$(document).ready(function () {
    $('#headertop').empty();
    $('#headertop').append(`            <div class="container">
    <div class="header-wrap header-space-between position-relative">
        <div class="logo logo-width-1">
            <a href="index.html"><img src="assets/imgs/theme/logo.png" alt="logo"></a>
        </div>
        <div class="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding d-none d-lg-block hover-boder">
            <nav>
                <ul>
                    <li><a class="active" href="index.html">Home <i class="fi-rs-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="index.html">Home 1</a></li>
                            <li><a href="index-2.html">Home 2</a></li>
                            <li><a href="index-3.html">Home 3</a></li>
                            <li><a href="index-4.html">Home 4</a></li>
                        </ul>
                    </li>
                    <li><a href="shop-grid-right.html">Shop <i class="fi-rs-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="shop-grid-right.html">Shop Grid – Right Sidebar</a></li>
                            <li><a href="shop-grid-left.html">Shop Grid – Left Sidebar</a></li>
                            <li><a href="shop-list-right.html">Shop List – Right Sidebar</a></li>
                            <li><a href="shop-list-left.html">Shop List – Left Sidebar</a></li>
                            <li><a href="shop-fullwidth.html">Shop - Wide</a></li>
                            <li><a href="#">Single Product <i class="fi-rs-angle-right"></i></a>
                                <ul class="level-menu">
                                    <li><a href="shop-product-right.html">Product – Right Sidebar</a></li>
                                    <li><a href="shop-product-left.html">Product – Left Sidebar</a></li>
                                    <li><a href="shop-product-full.html">Product – No sidebar</a></li>
                                </ul>
                            </li>
                            <li><a href="shop-filter.html">Shop – Filter</a></li>
                            <li><a href="shop-wishlist.html">Shop – Wishlist</a></li>
                            <li><a href="shop-cart.html">Shop – Cart</a></li>
                            <li><a href="shop-checkout.html">Shop – Checkout</a></li>
                            <li><a href="shop-compare.html">Shop – Compare</a></li>
                        </ul>
                    </li>
                    <li class="position-static"><a href="#">Mega <i class="fi-rs-angle-down"></i></a>
                        <ul class="mega-menu">
                            <li class="sub-mega-menu sub-mega-menu-width-22">
                                <a class="menu-title" href="#">Technology</a>
                                <ul>
                                    <li><a href="shop-product-right.html">Gaming Laptops</a></li>
                                    <li><a href="shop-product-right.html">Ultraslim Laptops</a></li>
                                    <li><a href="shop-product-right.html">Tablets</a></li>
                                    <li><a href="shop-product-right.html">Laptop Accessories</a></li>
                                    <li><a href="shop-product-right.html">Tablet Accessories</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><a href="#">Pages <i class="fi-rs-angle-down"></i></a>
                        <ul class="sub-menu">
                            <li><a href="page-about.html">About Us</a></li>
                            <li><a href="page-contact.html">Contact</a></li>
                            <li><a href="page-account.html">My Account</a></li>
                            <li><a href="page-login-register.html">login/register</a></li>
                            <li><a href="page-purchase-guide.html">Purchase Guide</a></li>
                            <li><a href="page-privacy-policy.html">Privacy Policy</a></li>
                            <li><a href="page-terms.html">Terms of Service</a></li>
                            <li><a href="page-404.html">404 Page</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="page-contact.html">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header-action-right">
            <div class="header-action-2">
                <div class="header-action-icon-2">
                    <a href="page-favourites.html">
                        <img class="svgInject" alt="GiftWise." src="assets/imgs/theme/icons/icon-heart.svg">
                    </a>
                </div>
                <div class="header-action-icon-2">
                    <div class="header-info header-info-right">
                        <div class="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding d-none d-lg-block hover-boder">
                        <nav>
                        <ul>
                            <li><a><span id="DropdownName"></span> <i class="fi-rs-angle-down"></i></a>
                                <ul class="sub-menu">
                                    <li><a href="page-account.html">My Account</a></li>
                                    <li><a onclick="logout()">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
});