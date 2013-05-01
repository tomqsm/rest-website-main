<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="pl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
        <title>JSP Page</title>
        <!-- Bootstrap -->
        <!--<link href="static/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">-->
        <link rel="stylesheet" type="text/css" href="static/css/reset.css" />
        <link rel="stylesheet" type="text/css" href="static/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="static/css/top_banner.css" />
        <link rel="stylesheet" type="text/css" href="static/css/fontSizer.css" />
        <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />

    </head>
</head>
<body>
    <div>
        <h1 id="qunit-header">QUnit Test Suite</h1>
        <h2 id="qunit-banner"></h2>
        <div id="qunit-testrunner-toolbar"></div>
        <h2 id="qunit-userAgent"></h2>
        <ol id="qunit-tests"></ol>
    </div>
    <div id="header" class="center" style="z-index: 0;">

        <img src="static/images/room1.jpg" class="floatLeft">

        <div class="floatRight">
            <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="690" height="250" id="slogans" align="middle">
                <param name="movie" value="static/flash/slogans.swf" />
                <param name="quality" value="best" />
                <param name="bgcolor" value="#999999" />
                <param name="play" value="true" />
                <param name="loop" value="true" />
                <param name="wmode" value="transparent" />
                <param name="scale" value="showall" />
                <param name="menu" value="true" />
                <param name="devicefont" value="false" />
                <param name="salign" value="" />
                <param name="allowScriptAccess" value="sameDomain" />
                <!--[if !IE]>-->
                <object type="application/x-shockwave-flash" data="static/flash/slogans.swf" width="690" height="250">
                    <param name="movie" value="static/flash/slogans.swf" />
                    <param name="quality" value="best" />
                    <param name="bgcolor" value="#999999" />
                    <param name="play" value="true" />
                    <param name="loop" value="true" />
                    <param name="wmode" value="transparent" />
                    <param name="scale" value="showall" />
                    <param name="menu" value="true" />
                    <param name="devicefont" value="false" />
                    <param name="salign" value="" />
                    <param name="allowScriptAccess" value="sameDomain" />
                    <!--<![endif]-->
                    <a href="http://www.adobe.com/go/getflash">
                        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
                    </a>
                    <!--[if !IE]>-->
                </object>
                <!--<![endif]-->
            </object>
        </div>

        <div id="address" class="">
            <div id="firm">
                <h2>lukasfloor.com<br/>
                    662 555 102</h2>
                <p>ul. Macierzanki 19</p>
                <p>43-340 Kozy</p>
                <p>Bielsko-Biała</p>
            </div>
        </div>
        <div id="jestestu"><h2>Jesteś tutaj: "Strona startowa"</h2></div>
        <img id="dynamicSquare" src="http://<%= request.getServerName()%>:<%= request.getServerPort()%>/lukasfloorcom-1.0/image" alt="my sreamed image"/>
    </div>
    <div class="center bordered">
        <div id="nav" class="bordered">
            <ul>
                <li>Podłoga</li>
                <li><a href="cyklinowanie">Ondnowa podłogi - cyklinowanie</a></li>
                <li>Instalacja nowej podłogi</li>
            </ul>
            <ul>
                <li>Schody</li>
                <li>Odnowa schodów</li>
                <li>Instalacja nowych schodów</li>
            </ul>
            <ul>
                <li>Obsługa klienta</li>
                <li>Prezentacja</li>
                <li>Cennik</li>
                <li>Kontakt</li>
            </ul>
            <ul>
                <li>Strona startowa</li>
                <li>Informacje ogólne</li>
                <li>O nas</li>
            </ul>

        </div>
        <div id="contentContainer" class="bordered">
            <h1>Informacje na początek</h1>
        </div>
    </div>

    <!-- page dependencies-->
    <script src="static/js/libs/jquery-1.8.1.min.js"></script>
    <script src="static/js/libs/underscore.js"></script>
    <script src="static/js/libs/backbone.js"></script>
    <script src="static/js/menuApp.js"></script>

    <!--Tests dependencies.-->
    <link rel="stylesheet" href="static/js/libs/qunit/qunit-1.9.0.css">
    <script src="static/js/libs/qunit/qunit-1.9.0.js"></script>

    <script src="static/js/menuAppTests.js"></script>

</body>
</html>
