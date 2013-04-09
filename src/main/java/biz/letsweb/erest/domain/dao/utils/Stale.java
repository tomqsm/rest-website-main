package biz.letsweb.erest.domain.dao.utils;

import java.sql.Timestamp;

/**
 *
 * @author toks
 */
public class Stale {
    private Timestamp timeOn;
    private Timestamp timeOff;
    boolean stale;

    public Stale() {
    }

    public Timestamp getTimeOn() {
        return timeOn;
    }

    public void setTimeOn(Timestamp timeOn) {
        this.timeOn = timeOn;
    }

    public Timestamp getTimeOff() {
        return timeOff;
    }

    public void setTimeOff(Timestamp timeOff) {
        this.timeOff = timeOff;
    }

    public boolean isStale() {
        return stale;
    }

    public void setStale(boolean stale) {
        this.stale = stale;
    }
    
}
