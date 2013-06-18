/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package biz.letsweb.erest.application;

import biz.letsweb.erest.resources.IndexResource;
import java.lang.reflect.Type;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import org.apache.log4j.Logger;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;

/**
 *
 * @author Tomasz
 */
public class ApplicationVelocityEngineFactory {

    private static VelocityEngine ve;
    private ServletContext servletContext;
    private static Logger LOG = Logger.getLogger(ApplicationVelocityEngineFactory.class);

    public ApplicationVelocityEngineFactory(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public static VelocityEngine getVelocityEngine(ServletContext servletContext) {

//   				 BasicConfigurator.configure();
//   				 Logger log = Logger.getLogger(LOGGER_NAME);
        if (ve == null) {
            LOG.info("Ready to start velocity");
            ve = new VelocityEngine();
            ve.setProperty(RuntimeConstants.RUNTIME_LOG_LOGSYSTEM_CLASS, "org.apache.velocity.runtime.log.Log4JLogChute");
            ve.setProperty("runtime.log.logsystem.log4j.logger", ApplicationVelocityEngineFactory.class.getName());
            ve.setProperty(RuntimeConstants.RESOURCE_LOADER, "webapp");
            ve.setProperty("webapp.resource.loader.class", "org.apache.velocity.tools.view.servlet.WebappLoader");
            ve.setProperty("webapp.resource.loader.path", "/WEB-INF/templates/");
        }
        LOG.info("Reusing Velocity Engine.");
        ve.setApplicationAttribute("javax.servlet.ServletContext", servletContext);
        try {
            ve.init();
            LOG.info("Velocity is loaded");
        } catch (Exception e) {
            LOG.error("Error when initializing Velocity", e);
        }
        return ve;
    }
}
