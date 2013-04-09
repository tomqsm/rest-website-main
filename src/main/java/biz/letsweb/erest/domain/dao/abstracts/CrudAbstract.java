/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package biz.letsweb.erest.domain.dao.abstracts;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

/**
 *
 * @author toks
 */
public abstract class CrudAbstract<T> implements ICrud<T> {

    private DataSource ds;

    public CrudAbstract() {
    }

    protected final DataSource getDataSource() {
        Context initialContext = null;
        Context envCtx = null;
        if (ds == null) {
            try {
                initialContext = new InitialContext();
                envCtx = (Context) initialContext.lookup("java:comp/env");
                ds = (DataSource) envCtx.lookup("jdbc/second_screen_ds");
                return ds;
            } catch (NamingException ex) {
                Logger.getLogger(CrudAbstract.class.getName()).log(Level.SEVERE,
                        "It could not get wrking in Message Resource class. OK?", ex);
            }
        } 
        return ds;
    }
}
