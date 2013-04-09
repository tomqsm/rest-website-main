<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    <head>
        <title>$datownik</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="static/css/reset.css" />
        <link rel="stylesheet" type="text/css" href="static/css/layout.css" />
        <link rel="stylesheet" type="text/css" href="static/css/top_banner.css" />
        <link rel="stylesheet" type="text/css" href="static/css/fontSizer.css" />
        <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />

    </head>
</head>
<body>

    <div class="center">

        <div id="advert" class="bordered">
            <div id="leftPointers" class="floatLeft"></div>
            <div id="bannerContentExtra" class="bordered floatRight fillRed">Tomasz Kuśmierczyk</br>Łódź</div>
            <div id="bannerContent" class="bordered fillViolet">$binary Czy wiesz, że możesz ...</div>
        </div>

    </div>

    <h1>Hello World!</h1>
    <p>aktualizacja 1</p>
    <img src="static/images/conscious_animal.jpg" alt="" />
    <img src="http://<%= request.getServerName() %>:<%= request.getServerPort() %>/website-1.0/image" alt="my sreamed image"/>



    <script src="static/js/libs/jquery-1.8.1.min.js"></script>
    <script src="static/js/libs/underscore.js"></script>
    <script src="static/js/libs/backbone.js"></script>
    <script src="static/js/advertApp.js"></script>
</body>
</html>
