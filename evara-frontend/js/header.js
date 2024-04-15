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
                    <li>
                        <a href="page-contact.html">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div class="header-action-right">
            <div class="header-action-2">
                <div class="header-action-icon-2" id="favouritesButton">
                    <a href="page-favourites.html">
                        <img class="svgInject" alt="GiftWise." src="assets/imgs/theme/icons/icon-heart.svg">
                    </a>
                </div>
                <div class="header-action-icon-2">
                    <div class="header-info header-info-right">
                        <ul id="loginSignupMenu">
                            <li><i class="fi-rs-user"></i><a href="page-login.html">Log In</a></li>
                            <li><i class="fi-rs-user"></i><a href="page-register.html">Sign Up</a></li>
                        </ul>
                        <div id="loggedInMenu" style="display: none;">
                        <div class="main-menu main-menu-grow main-menu-padding-1 main-menu-lh-1 main-menu-mrg-1 hm3-menu-padding d-none d-lg-block hover-boder" >
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
    </div>
</div>`);
var accessToken = localStorage.getItem('accessToken');
if (accessToken) {
    $('#favouritesButton').show();
    $('#loggedInMenu').show();
    $('#loginSignupMenu').hide();
    let firstName = localStorage.getItem('firstName');
    $('#DropdownName').text(firstName);
} else {
    $('#loggedInMenu').hide();
    $('#favouritesButton').hide();
    $('#loginSignupMenu').show();
}
});
function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('firstName');
    window.location.href = 'page-login.html';
}