package biz.letsweb.erest.resources;

import biz.letsweb.erest.application.ApplicationVelocityEngineFactory;
import biz.letsweb.erest.domain.xml.entities.Bookmark;
import java.io.IOException;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.ocpsoft.prettytime.PrettyTime;

@Path("/schody")
public class StairsResource {

    private static Logger LOG = Logger.getLogger(IndexResource.class);
///schody/instalacja-nowych-schodow
//        /schody/odnowa-schodow

    @GET
    @Produces(MediaType.TEXT_HTML + "; charset=UTF-8")
    public Response getMessageTextPlain(@Context ServletContext servletContext) throws IOException {
        VelocityEngine velocityEngine = ApplicationVelocityEngineFactory.getVelocityEngine(servletContext);
        VelocityContext velocityContext = new VelocityContext();
        StringWriter stringWriter = null;
        Template template = velocityEngine.getTemplate("index.html", "UTF-8");
        velocityContext.put("name", "Jólek ... from Velocity tęmplate ");
        velocityContext.put("datownik", new Date());
        velocityContext.put("binary", Long.toBinaryString(new Date().getTime()));
        stringWriter = new StringWriter();
        template.merge(velocityContext, stringWriter);
        String output = stringWriter.toString();
        stringWriter.close();
        LOG.info("from template: " + stringWriter.toString());
        return Response.ok(stringWriter.toString()).build();
    }

//    @GET
//    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//    public Bookmark find(@Context HttpServletResponse response, @Context HttpServletRequest request) throws ServletException, IOException, ParseException, InterruptedException {
//        LOG.info(request.getContextPath());
//        String header = request.getHeader("X-Requested-With");
////        Thread.sleep(5000);
//        PrettyTime prettyTime = new PrettyTime(new Locale("pl", "PL"));
//        Properties properties = new Properties();
//        properties.load(this.getClass().getClassLoader().getResourceAsStream("developer.properties"));
//        Date then = new SimpleDateFormat("d/M/yyyy H:m", new Locale("pl", "PL")).parse(properties.getProperty("lastupdate"));
//        String time = prettyTime.format(then);
//        LOG.info(String.format("Pretty time set to: %s.", URLEncoder.encode(time, "UTF-8")));
//        request.setAttribute("time", time);
//        request.setAttribute("version", properties.getProperty("version"));
//        if (header != null && header.equals("XMLHttpRequest")) {
//            return new Bookmark(0, "/schody " + header, "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Valued_image_seal.svg/64px-Valued_image_seal.svg.png", "");
//        } else {
//            request.getRequestDispatcher("/schody.jsp").forward(request, response);
//        }
//        return null;
//    }
    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Path("{robota}")
    public Bookmark findJob(@PathParam("robota") String param, @Context HttpServletResponse response, @Context HttpServletRequest request) throws ServletException, IOException, ParseException, InterruptedException {
        String header = request.getHeader("X-Requested-With");
        String url = param;
//        Thread.sleep(5000);
        LOG.info(request.getContextPath() + " with param");
        PrettyTime prettyTime = new PrettyTime(new Locale("pl", "PL"));
        Properties properties = new Properties();
        properties.load(this.getClass().getClassLoader().getResourceAsStream("developer.properties"));
        Date then = new SimpleDateFormat("d/M/yyyy H:m", new Locale("pl", "PL")).parse(properties.getProperty("lastupdate"));
        String time = prettyTime.format(then);
        LOG.info(String.format("Pretty time set to: %s.", URLEncoder.encode(time, "UTF-8")));
        request.setAttribute("time", time);
        request.setAttribute("version", properties.getProperty("version"));
        if (header != null && header.equals("XMLHttpRequest")) {
            return new Bookmark(0, param + " " + header, "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Valued_image_seal.svg/64px-Valued_image_seal.svg.png", "");
        } else {
            request.getRequestDispatcher("/schody.jsp").forward(request, response);
        }
        return null;
    }
}
