package biz.letsweb.erest.application;

import biz.letsweb.erest.resources.BookmarkResource;
import biz.letsweb.erest.resources.CyklinowanieResource;
import biz.letsweb.erest.resources.GeneratedImageResource;
import biz.letsweb.erest.resources.IndexResource;
import biz.letsweb.erest.resources.StatusResource;
import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author toks
 */
//@javax.ws.rs.ApplicationPath("rest")
public class ApplicationConfiguration extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        return getRestResourceClasses();
    }

    private Set<Class<?>> getRestResourceClasses() {
        Set<Class<?>> resources = new java.util.HashSet<Class<?>>();
        resources.add(BookmarkResource.class);
        resources.add(GeneratedImageResource.class);
        resources.add(StatusResource.class);
        resources.add(IndexResource.class);
        resources.add(CyklinowanieResource.class);
        return resources;
    }
    
}
