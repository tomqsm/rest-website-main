package biz.letsweb.erest.domain.access;

import biz.letsweb.erest.domain.dao.BookmarkDao;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import static org.junit.Assert.*;

/**
 *
 * @author Tomasz
 */
public class BookmarkAccessTest {
    
    public BookmarkAccessTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of findById method, of class BookmarkDao.
     */
//    @Test
    public void bookmarkDaoIsInstatiated() {
        int id = 0;
        BookmarkDao instance = new BookmarkDao();
        assertNotNull(instance);
    }
    
//    @Test
    public void bookmarkDaoOffersMethodWhichDoesntBreakIt(){
        BookmarkDao instance = new BookmarkDao();
        assertNotNull(instance.findAll());
    }

}