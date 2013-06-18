<%@page session="false" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="rooturl" value="http://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.servletContext.contextPath}" scope="page" /> 
<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--<meta name="viewport" content="width=device-width, initial-scale=1.0">-->
        <meta name="description" content="Parkieciarstwo, odnowa podłóg. Z nami stara podłoga będzie jak nowa, a nowa będzie trwać i cieszyć."/>
        <meta name="keywords" content="podłoga,podłogi,cyklinowanie,podłoga Bielsko-Biała,podłoga Bielsko,cyklinowanie Bielsko Biała,cyklinowanie Bielsko,odnowienie podłogi,podlogi,cyklinowanie podlogi Bielsko,cyklinowanie Bielsko Biala"/>
        <meta name="author" content="Łukasz Dożak"/>
        <title>Cyklinowanie, parkiety, drzwi, schody.</title>
        <link rel="stylesheet" type="text/css" href="${rooturl}/static/css/reset.css" />
        <link rel="stylesheet" type="text/css" href="${rooturl}/static/css/layout.css"/>
        <!--<link rel="stylesheet" type="text/css" href="static/css/layoutPrint.css" media="print"/>-->
        <link rel="stylesheet" type="text/css" href="${rooturl}/static/css/fontSizer.css" />
        <!--<link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css" />-->

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
                <div class="layer zero"><img src="${rooturl}/static/images/room1.jpg" class="" style=""></div>
                <div class="layer one"><span id="categoryText" class="" style="position: relative; top: 220px; font-size: 24px; color: whitesmoke">Podłoga</span></div>
            </div>

        </div>
        <!--<div class="clearLeft"></div>-->

        <div class="floatRight">
            <jsp:include page="static/flash/flash.jsp">
                <jsp:param name="rooturl" value="${rooturl}/"/>
            </jsp:include>
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
        <!--<img id="dynamicSquare" src="${rooturl}/image" alt="my sreamed image"/>-->
        <a href="${rooturl}"><img id="logo" src="${rooturl}/static/images/logo.png" alt="logo" height="120" width="120"/></a>
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
                <li>Witamy
                    <div id="menuPointer">
                        <div class="heap">
                            <div class="layer zero"></div>
                            <div class="layer one arrow"></div>
                        </div>
                    </div>
                </li>
                <li>Informacje ogólne</li>
                <li>O nas</li>
            </ul>
        </div>
        <div id="contentContainer" class="">
            <div id="growl"></div>
            <h1>Schody</h1>
            <div id="ajaxUpdate" class="ajaxSpinner">
                <jsp:include page="includes/schody.jsp">
                    <jsp:param name="rooturl" value="${rooturl}/"/>
                </jsp:include>
            </div>
            <!--<span id="menuPointer" style="position: relative; top: 130px;">»</span><h1>Witamy</h1>-->
        </div>
    </div>
    <div class="clearLeft"></div>
    <div id="footer" class="center">
        <div>Lukasfloor 2013, ostatnia aktualizacja <c:out value="${requestScope.time}"></c:out>, wersja <c:out value="${requestScope.version}"></c:out></div>
        </div>

        <!-- page dependencies-->
            <script>var rooturl = '${rooturl}'</script>
    <script src="${rooturl}/static/js/libs/jquery-1.8.1.min.js"></script>
    <script src="${rooturl}/static/js/libs/underscore.js"></script>
    <script src="${rooturl}/static/js/libs/backbone.js"></script>
    <script src="${rooturl}/static/js/app.js"></script>
    <jsp:include page="includes/prezentacjaScriptTag.jsp">
        <jsp:param name="rooturl" value="${rooturl}/"/>
    </jsp:include>
    <!--Tests dependencies.-->
    <c:if test="${not empty requestScope.testJS and requestScope.testJS eq true}">
        <jsp:include page="includes/qunitScriptTag.jsp">
            <jsp:param name="rooturl" value="${rooturl}/"/>
        </jsp:include>
    </c:if>
</body>
</html>
