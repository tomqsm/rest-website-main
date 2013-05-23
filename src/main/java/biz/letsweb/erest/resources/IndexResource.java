package biz.letsweb.erest.resources;

import biz.letsweb.erest.domain.dao.BookmarkDao;
import biz.letsweb.erest.domain.xml.entities.Bookmark;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Properties;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.CookieParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.log4j.Logger;
import org.ocpsoft.prettytime.PrettyTime;

@Path("/")
public class IndexResource {

    private static Logger LOG = Logger.getLogger(IndexResource.class);

//    @GET
//    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//    @Path("/{param}")
//    public Bookmark find(@PathParam("param") int param) {
//        return new BookmarkDao().findById(param);
//    }
//    @GET
//    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
//    @Path("/{schody : schody.*}")
//    public Bookmark schodyService(@PathParam("schody") String param) throws InterruptedException {
//        LOG.info(param);
////        Thread.sleep(7000);
//        if (param.toLowerCase().contains("odnowa")) {
//            return new Bookmark(0, "To jest tekst do pokazania o podłodze.", "http://www.naturalflooringsolutions.co.uk/images/floor-sanding.jpg", "");
//        } else if(param.toLowerCase().contains("instalacja")){
//            return new Bookmark(0,"Tekst o instalcji schodów", "http://lakehomedesignsels.com/wp-content/uploads/2013/01/island-home-designs-modern-glass-stairs-150x150.png","");//new BookmarkDao().findById(2);
//        }
//        return new Bookmark(0, "Najlepiej zrobić schody", "http://xaxor.com/wp-content/uploads/2012/05/Japanese-street-fashion-part2-35-150x150.jpg","");//new BookmarkDao().findById(3);
//    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Path("rest")
    public void showIndex(@Context HttpServletResponse response, @Context HttpServletRequest request) {
        try {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        } catch (Exception ex) {
        }
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Path("test")
    public void allowJSTests(@Context HttpServletResponse response,
            @Context HttpServletRequest request, @CookieParam("JSESSIONID") javax.ws.rs.core.Cookie cookieParam) {
        try {
            String params = "?test=true";
            if (cookieParam != null && cookieParam.getValue() != null && cookieParam.getValue().length() > 0) {
                LOG.info("Found cookie: " + cookieParam.getValue());
            }
            request.getRequestDispatcher("/index.jsp" + params).forward(request, response);
        } catch (Exception ex) {
        }
    }

    @POST
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Produces(MediaType.TEXT_HTML + "; charset=UTF-8")
    public Response create(Bookmark bookmark) {
        BookmarkDao bookmarkDao = new BookmarkDao();
        bookmarkDao.create(bookmark);
        return Response.ok("przyjęto " + bookmark.getText()).build();
    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    public void printMessage(@Context HttpServletResponse response, @Context HttpServletRequest request) {
        try {
            PrettyTime prettyTime = new PrettyTime(new Locale("pl", "PL"));
            Properties properties = new Properties();
            properties.load(this.getClass().getClassLoader().getResourceAsStream("developer.properties"));
            Date then = new SimpleDateFormat("d/M/yyyy H:m", new Locale("pl", "PL")).parse(properties.getProperty("lastupdate"));
            String time = prettyTime.format(then);
            LOG.info(String.format("Pretty time set to: %s.", URLEncoder.encode(time, "UTF-8")));
            request.setAttribute("time", time);
            request.setAttribute("version", properties.getProperty("version"));
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        } catch (Exception ex) {
            LOG.error("error " + ex.getLocalizedMessage());
        }
    }
}