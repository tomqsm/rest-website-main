package biz.letsweb.erest;

import junit.framework.Assert;
import org.jboss.resteasy.client.ClientResponse;
import org.jboss.resteasy.client.ClientRequest;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;

public class MessageRestServiceTest {

    static final String ROOT_URL = "http://localhost:8080/erest-1.0/rest/";

    public MessageRestServiceTest() {
    }

    @BeforeClass
    public static void setUpClass() throws Exception {
    }

    @AfterClass
    public static void tearDownClass() throws Exception {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() { 
        
    }

    /**
     *
     * @throws Exception
     */
//    @Test
    public void testPrintMessage() throws Exception {
        ClientRequest request = new ClientRequest(ROOT_URL + "message/werr");
        ClientResponse response = request.get(String.class);
        String s = (String) response.getEntity();
        Assert.assertNotNull(s);
        Assert.assertEquals(true, s.contains("werr"));
    }
}
