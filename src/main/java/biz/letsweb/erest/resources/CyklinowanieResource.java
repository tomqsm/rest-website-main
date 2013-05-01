package biz.letsweb.erest.resources;

import biz.letsweb.erest.domain.dao.BookmarkDao;
import biz.letsweb.erest.domain.xml.entities.Bookmark;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/cyklinowanie")
public class CyklinowanieResource {

    @GET
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public Bookmark find() {
        return new BookmarkDao().findById(1);
    }

}
