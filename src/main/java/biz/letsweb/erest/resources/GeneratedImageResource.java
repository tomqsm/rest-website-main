/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package biz.letsweb.erest.resources;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

/**
 *
 * @author toks
 */
@Path("/image")
public class GeneratedImageResource {

    @GET
    @Produces("image/png")
    public Response getFullImage() {
        BufferedImage image = new BufferedImage(40, 40, BufferedImage.TYPE_INT_RGB);
        Graphics2D g = image.createGraphics();
        g.setPaint(new Color(0, 102, 204));
        g.fillRect(0, 0, image.getWidth(), image.getHeight());

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(image, "png", baos);
        } catch (IOException ex) {
        }
        byte[] imageData = baos.toByteArray();

        // uncomment line below to send non-streamed
        return Response.ok(imageData).build();

//     uncomment line below to send streamed
//        return Response.ok(new ByteArrayInputStream(imageData)).build();
    }

    @GET
    @Path("/client")
    @Produces("text/html")
    public Response getASite() throws Exception {
        DefaultHttpClient httpClient = new DefaultHttpClient();
        HttpGet getRequest = new HttpGet("http://www.google.com");
        getRequest.addHeader("Accept", "application/json");

        HttpResponse response = httpClient.execute(getRequest);
        if (response.getStatusLine().getStatusCode() != 200) {
            //throw exception
        }
        return Response.ok(response.toString()).build();
    }

    @GET
    @Path("/pdf")
    @Produces("application/pdf")
    public Response getFile() {

        File file = new File("/home/tomasz/Downloads/M255_TMA02_11J.pdf");

        ResponseBuilder response = Response.ok((Object) file);
        response.header("Content-Disposition",
                "attachment; filename=new-android-book.pdf");
        return response.build();

    }
}
