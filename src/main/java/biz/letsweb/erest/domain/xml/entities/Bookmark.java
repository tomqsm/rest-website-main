package biz.letsweb.erest.domain.xml.entities;

import java.io.Serializable;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name="bookmark")
@XmlType(propOrder={"text","image","category"})
//@XmlAccessorOrder(XmlAccessOrder.ALPHABETICAL)
public class Bookmark implements Serializable {

    private int id;
    private String text;
    private String image;
    private String category;

    public Bookmark() {
    }

    public Bookmark(int id, String text, String image, String category) {
        this.id = id;
        this.text = text;
        this.image = image;
        this.category = category;
    }

    @XmlAttribute
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @XmlElement
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @XmlElement
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @XmlElement
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}