package biz.letsweb.erest.application;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.apache.log4j.Logger;

/**
 * This is initialisation of stuff application needs.
 * @author Tomasz
 */
public class ApplicationContextListener implements ServletContextListener {
    
    private static Logger LOG = Logger.getLogger(ApplicationContextListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        LOG.trace("Application context initialisation on start-up");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        LOG.trace("Application context initialisation on destroy.");
    }
    
}
