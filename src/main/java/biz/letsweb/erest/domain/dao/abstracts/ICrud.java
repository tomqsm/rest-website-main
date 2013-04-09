package biz.letsweb.erest.domain.dao.abstracts;

import java.util.ArrayList;

/**
 *
 * @author toks
 */
public interface ICrud <T> {
    public ArrayList <T> findAll ();
    public T findById (int id);
    public boolean create(T bookmark);
}
