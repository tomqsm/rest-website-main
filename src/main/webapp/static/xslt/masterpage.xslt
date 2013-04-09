<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:vi="urn:xmlns:letsweb.biz:view">
    <xsl:output method="html"
                doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN"
                doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>
                
<!--    <xsl:strip-space elements="*"/>-->

    <xsl:param name="param1" select="'default value (no param sent from transformer)'"/>
<!--    if parameter pointing to view is not set in a servlet - display default (none)-->
    <xsl:param name="view" select="'none'"/>
<!--    view document is loaded based on param view and assigned to a variable external_doc-->
    <xsl:variable name="path_external_doc" select="'../'"/>
    <xsl:variable name="external_doc" select="document(concat($path_external_doc,$view,'.xml'))"/>

    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>
                    <xsl:value-of select="page/@title"/>
                </title>
                <link rel="stylesheet" href="xslt/masterpage.css" type="text/css"/>
                <script src="js/lib/jquery-1.6.2.js"></script>
            </head>
            <body>
                <div id="superheader">superheader</div>
                <div id="advert">advert</div>
                <div id="leftcolumn">
                   <a href="contact">contact</a>
                    leftcolumn 
                    <br/>
                    <xsl:apply-templates select="page/menu"/>
                </div>
                <div id="centercolumn">
                    centercolumn [ main content placeholder ]
                    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
                    <br/>
<!--                    this is where changing part is placed-->
                    <xsl:apply-templates select="$external_doc/vi:content/vi:article"/>
                </div>
                <div id="rightcolumn">rightcolumn</div>
                <div id="footer">footer</div>
            </body>
        </html>
    </xsl:template>
    
<!-- ***** TEMPLATES ***** -->

<!-- **** LAYOUT **** -->
    <xsl:template match="menu">
        <ol>
            <xsl:apply-templates select="item"/>
        </ol>
    </xsl:template>
    <xsl:template match="item">
        <li>
            <xsl:value-of select="."/>
            <xsl:value-of select="$param1"/>
        </li>
    </xsl:template>

<!-- **** VIEWS **** -->
    <xsl:template match="vi:article">
        <xsl:value-of select="vi:image"/>
        <br/>
        <xsl:apply-templates select="vi:text/vi:par"/>
    </xsl:template>
    
    <xsl:template match="vi:text/vi:par">
        <i>
            <xsl:copy-of select="node()"/>
            <br/>
<!--            <xsl:apply-templates select="vi:par/vi:link"/>-->
        </i>
        
    </xsl:template>
</xsl:stylesheet>
