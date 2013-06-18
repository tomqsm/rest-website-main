package biz.letsweb.erest.application;

import biz.letsweb.erest.resources.IndexResource;
import freemarker.template.Configuration;
import freemarker.template.ObjectWrapper;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;

public class FreemarkerTemplateProvider implements ServletContextListener {

    private File propertiesFile;
    private Configuration cfg;
    private Map<String, Object> root;
    private static Logger LOG = Logger.getLogger(IndexResource.class);

    public FreemarkerTemplateProvider() {
    }

//    public void showIndex(Writer writer) throws IOException, TemplateException {
//        Properties props = new Properties();
//        props.load(FileUtils.openInputStream(propertiesFile));
//        Configuration cfg = new Configuration();
////        cfg.setDirectoryForTemplateLoading(templatesLocation);
//        cfg.setServletContextForTemplateLoading(cfg, null);
//
//
//        cfg.setOutputEncoding("UTF-8");
//        Template temp = cfg.getTemplate("index.html");
//        temp.setEncoding("UTF-8");
//        Map root = new HashMap();
//        root.put("time", "my time");
//        root.put("version", "123");
//        temp.process(root, writer);
//    }
    public Template getTemplate(String name) {
        Template template = null;
        try {
            template = cfg.getTemplate(name);
        } catch (IOException ex) {
            LOG.error("Could not construct a template for name: " + name);
        }
        return template;
    }

    public Map<String, Object> getRootMap() {
        return root;
    }

    public void putProperty(String key, Object value) {
        root.put(key, value);
    }

    private void loadDefaultProperties() {
        root.put("time", "my time");
        root.put("version", "123");
    }

    private void configure(final ServletContext context) {
        LOG.info("Configuring freemarker.");
        cfg.setServletContextForTemplateLoading(context, "static/ftl");
        cfg.setEncoding(new Locale("pl", "PL"), "UTF-8");
        cfg.setObjectWrapper(ObjectWrapper.DEFAULT_WRAPPER);
        cfg.setOutputEncoding("UTF-8");
        cfg.setDefaultEncoding("UTF-8");
    }

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        final ServletContext servletContext = sce.getServletContext();
//        propertiesFile = new File("src/main/resources/freemarker.properties");
        cfg = new Configuration();
        root = new HashMap<String, Object>();
        loadDefaultProperties();
        configure(servletContext);
        servletContext.setAttribute("temp", this);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}