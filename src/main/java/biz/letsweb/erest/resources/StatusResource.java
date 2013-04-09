/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package biz.letsweb.erest.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 *
 * @author Tomasz
 */
@Path("/status")
public class StatusResource {
    @GET
    public Response getStatus() {
        return Response.ok().entity(1).build();
    }
}
