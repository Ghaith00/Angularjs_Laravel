<body ng-controller="navController">
    <nav class="navbar navbar-default" >
        <div class="container-fluid">
        <ul class="nav navbar-nav">
            <li ng-hide="isLoggedIn()" >
                <a  ng-click="goToAboutUs()" href="" >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                    &nbsp;AboutUs
                </a>
            </li>
            <li ng-hide="!isLoggedIn()">
                <a ui-sref='home'>
                    <i class="fa fa-home fa-lg" aria-hidden="true"></i>
                </a>
            </li>

            <li class="centertitle">
                <a >
                    <img src="data/logo.png" alt="Jungle">
                </a>
            </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <li ng-hide="isLoggedIn()">
                <a ng-click="goToContact()" href=''><i class="fa fa-envelope" ></i>&nbsp;Contact</a>
            </li>
            <li ng-hide="isLoggedIn()">
                <a ui-sref="signup"  ><i class="fa fa-sign-in" ></i> &nbsp;Sign Up</a>
            </li>
            <li><a ui-sref="login" ng-hide="isLoggedIn()"><i class="fa fa-unlock-alt" ></i>&nbsp; Login</a></li>
            <li ng-hide="!isLoggedIn()">
                <a ui-sref="home.notifications">
                    <i class="fa fa-bullhorn fa-lg" aria-hidden="true"></i>
                    <span class="badge red">5</span>
                </a>
            </li>
            <li class="dropdown"  ng-show="isLoggedIn()">
                <a class="dropdown-toggle" data-toggle="dropdown" href="">
                    <i class="fa fa-user fa-lg"></i>
                    &nbsp;<span class="caret "></span>
                </a>
                <ul class="dropdown-menu ">
                    <li class="dropdown-header">
                        <strong>{{mainUser.username}}</strong>
                    </li>
                    <li >
                        <a ui-sref="profile">
                            <i class="fa fa-user"></i>
                            &nbsp;Profile
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i class="fa fa-cog"></i>
                            &nbsp;Settings
                        </a>
                    </li>
                    <li >
                        <a ng-click="logOut()" href="">
                            <i class="fa fa-power-off"></i>
                            &nbsp;Log out
                        </a>
                    </li>
                </ul>
            </li>

        </ul>
        </div>
    </nav>
    <div growl></div> <!-- adding the grow directive to html -->

    <div ui-view class="fade" ></div>


</body>
