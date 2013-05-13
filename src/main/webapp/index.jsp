<%@page session="false" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <div class="relativePointer"></div>
    <div>
        <%
            if (request.getParameter("test") != null) {
                out.println("Should run JS tests.");
            }
        %>
        <c:if test="${not empty param.test and param.test eq true}" var="testJS" scope="request" >
            <%@ include file="test.html" %>
        </c:if>
    </div>
    <div id="header" class="center" style="z-index: 0;">
        <div id="categoryIllustrator" class="floatLeft" >

            <div class="heap">
                <div class="layer zero"><img src="static/images/room1.jpg" class="" style=""></div>
                <div class="layer one"><span id="categoryText" class="" style="position: relative; top: 220px; font-size: 24px; color: whitesmoke">Podłoga</span></div>
            </div>

        </div>
        <!--<div class="clearLeft"></div>-->

        <div class="floatRight">
            <%@ include file="static/flash/slogansInclude.html" %>
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
        <!--<img id="dynamicSquare" src="http://<%= request.getServerName()%>:<%= request.getServerPort()%>/lukasfloorcom-1.0/image" alt="my sreamed image"/>-->
        <a href="http://<%= request.getServerName()%>:<%= request.getServerPort()%>/lukasfloorcom-1.0"><img id="logo" src="static/images/logo.png" alt="logo" height="120" width="120"/></a>
    </div>
    <div id="jestestu" class="center"><span>Witamy</span></div>
    <div class="center">
        <div id="nav" class="">
            <ul>
                <li>Podłoga</li>
                <li><a href="cyklinowanie">Cyklinowanie</a></li>
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
                <li>
                    <div id="menuPointer">
                        <div class="heap">
                            <div class="layer zero"></div>
                            <div class="layer one arrow"></div>
                        </div>
                    </div>
                    Witamy
                </li>
                <li>Informacje ogólne</li>
                <li>O nas</li>
            </ul>

        </div>
        <div id="contentContainer" class="">
            <h1>Witamy</h1>
            <jsp:include page="includes/prezentacja.jsp">
                <jsp:param name="myParam" value=""/>
            </jsp:include>
            <!--<span id="menuPointer" style="position: relative; top: 130px;">»</span><h1>Witamy</h1>-->
        </div>
    </div>
    <div class="clearLeft"></div>
    <div id="footer" class="center">
        <div>Lukasfloor 2013</div>
    </div>

    <!-- page dependencies-->
    <script src="static/js/libs/jquery-1.8.1.min.js"></script>
    <script src="static/js/libs/underscore.js"></script>
    <script src="static/js/libs/backbone.js"></script>
    <script src="static/js/globals.js"></script>
    <script src="static/js/locatorApp.js"></script>
    <!--<script src="static/js/advertApp.js"></script>-->
    <script src="static/js/utilsApp.js"></script>
    <script src="static/js/textimageApp.js"></script>
    <script src="static/js/menuApp.js"></script>

    <%@ include file="includes/prezentacjaScriptTag.jsp" %>
    <!--Tests dependencies.-->
    <c:if test="${not empty requestScope.testJS and requestScope.testJS eq true}">
        <%@ include file="includes/qunitScriptTag.jsp" %>
    </c:if>
</body>
</html>
