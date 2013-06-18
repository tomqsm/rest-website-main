package biz.letsweb.erest.resources;

import biz.letsweb.erest.application.FreemarkerTemplateProvider;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.IOException;
import java.text.ParseException;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.apache.log4j.Logger;

@Path("/")
public class IndexResource {

    private static Logger LOG = Logger.getLogger(IndexResource.class);

    @GET
    @Produces(MediaType.TEXT_HTML + "; charset=UTF-8")
    public void showIndex(@Context HttpServletResponse response, @Context HttpServletRequest request,
            @Context ServletContext servletContext) throws IOException, ParseException, ServletException, TemplateException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.TEXT_HTML);
        final FreemarkerTemplateProvider tempProvider = (FreemarkerTemplateProvider) servletContext.getAttribute("temp");
        Template temp = tempProvider.getTemplate("index.html");
        temp.process(tempProvider.getRootMap(), response.getWriter());
    }
}