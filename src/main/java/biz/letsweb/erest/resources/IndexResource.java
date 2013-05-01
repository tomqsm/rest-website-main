package biz.letsweb.erest.resources;

import biz.letsweb.erest.domain.dao.BookmarkDao;
import biz.letsweb.erest.domain.xml.entities.Bookmark;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public class IndexResource {

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Path("/{param}")
    public Bookmark find(@PathParam("param") int param) {
        return new BookmarkDao().findById(param);
    }

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    @Path("rest")
    public void showIndex(@Context HttpServletResponse response, @Context HttpServletRequest request) {
        try {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
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
    @Produces(MediaType.TEXT_XML)
    public void printMessage(@Context HttpServletResponse response, @Context HttpServletRequest request) {
        try {
            request.getRequestDispatcher("/index.jsp").forward(request, response);
        } catch (Exception ex) {
        }
    }
}