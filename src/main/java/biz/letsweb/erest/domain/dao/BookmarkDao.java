package biz.letsweb.erest.domain.dao;

import biz.letsweb.erest.domain.dao.utils.Stale;
import biz.letsweb.erest.domain.dao.abstracts.CrudAbstract;
import biz.letsweb.erest.exceptions.DetailedSqlExceptions;
import biz.letsweb.erest.domain.xml.entities.Bookmark;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.sql.DataSource;
import org.apache.log4j.Logger;

/**
 *
 * @author toks
 */
public class BookmarkDao extends CrudAbstract<Bookmark> {

    private static Logger LOG = Logger.getLogger(BookmarkDao.class);
    private DataSource ds;
    private Stale stale;
    private ArrayList<Bookmark> foundAll = null;

    public BookmarkDao() {
        ds = getDataSource();
        stale = new Stale();
    }

    private ArrayList<Bookmark> findAllBookmarks() {
        Connection con = null;
        PreparedStatement prepared = null;
        ResultSet rs = null;
        ArrayList<Bookmark> list = null;
        try {
            con = ds.getConnection();
            con.setAutoCommit(false);
            prepared = con.prepareStatement("select * from bookmark");
            rs = prepared.executeQuery();
            list = new ArrayList<Bookmark>();
            while (rs.next()) {
                int id = rs.getInt(1);
                String text = rs.getString(2);
                String image = rs.getString(3);
                String category = rs.getString(4);
                list.add(new Bookmark(id, text, image, category));
            }
            con.commit();
        } catch (SQLException ex) {
            DetailedSqlExceptions.printSQLException(ex);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (prepared != null) {
                    prepared.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                DetailedSqlExceptions.printSQLException(ex);
            }
        }
        return list;
    }

    @Override
    public Bookmark findById(int id) {
        Connection con = null;
        PreparedStatement prepared = null;
        ResultSet rs = null;
        Bookmark bookmark = null;
        try {
            con = ds.getConnection();
            con.setAutoCommit(false);
            prepared = con.prepareStatement("select * from bookmark where id = ?");
            prepared.setInt(1, id);
            rs = prepared.executeQuery();
            while (rs.next()) {
                int bId = rs.getInt(1);
                String text = rs.getString(2);
                String image = rs.getString(3);
                String category = rs.getString(4);
                bookmark = new Bookmark(bId, text, image, category);
            }
            con.commit();
        } catch (SQLException ex) {
            DetailedSqlExceptions.printSQLException(ex);
        } finally {
            try {
                if (prepared != null) {
                    prepared.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                DetailedSqlExceptions.printSQLException(ex);
            }

        }
        return bookmark;
    }

    @Override
    public ArrayList<Bookmark> findAll() {
        if (foundAll == null || stale.isStale()) {
            foundAll = findAllBookmarks();
        }
        return foundAll;
    }

    @Override
    public boolean create(Bookmark bookmark) {
        Connection con = null;
        PreparedStatement statement = null;
        try {
            con = ds.getConnection();
            statement = con.prepareStatement("insert into bookmark values (null,?,?,?)");
            statement.setString(1, bookmark.getText());
            statement.setString(2, bookmark.getImage());
            statement.setString(3, bookmark.getCategory());
            statement.executeUpdate();
        } catch (SQLException ex) {
            LOG.error(ex.getMessage());
        } finally {
            try {
                if (statement != null) {
                    statement.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                LOG.error(ex.getMessage());
            }
        }
        return true;
    }
}
