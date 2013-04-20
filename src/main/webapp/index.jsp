<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html lang="pl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JSP Page</title>
        <!-- Bootstrap -->
        <link href="static/css/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <!--<link rel="stylesheet" type="text/css" href="static/css/reset.css" />-->
        <link rel="stylesheet" type="text/css" href="static/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="static/css/top_banner.css" />
        <link rel="stylesheet" type="text/css" href="static/css/fontSizer.css" />
        <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />

    </head>
</head>
<body>
    <div class="container-fluid">

        <div id="advert" class="bordered">
            <div id="leftPointers" class="floatLeft"></div>
            <div id="bannerContentExtra" class="bordered floatRight fillRed">Tomasz Kuśmierczyk</br>Łódź</div>
            <div id="bannerContent" class="bordered fillViolet">zawartosc bannera</div>
        </div>

    </div>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="span2">
                <h3>Menu</h3>
            </div>
            <div class="span10">
                <h3>Content</h3>
            </div>
        </div>
    </div>
    <div class="center">



    </div>

    <h1>Hello World!</h1>
    <p>aktualizacja 1</p>
    <img class="img-circle" src="static/images/conscious_animal.jpg" alt="" />
    <img src="http://<%= request.getServerName()%>:<%= request.getServerPort()%>/website-1.0/image" alt="my sreamed image"/>

    <script src="static/js/libs/jquery-1.8.1.min.js"></script>
    <script src="static/js/libs/underscore.js"></script>
    <script src="static/js/libs/backbone.js"></script>
    <script src="static/js/advertApp.js"></script>
    <script src="static/css/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>
