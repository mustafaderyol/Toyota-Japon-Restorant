package com.toyota.jpnrest.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "r_upload_help")
public class UploadHelp {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "HELP_ID")
    private int helpId;

    @Column(name = "UP_DATE")
    private Date upDate;

    @Column(name = "HELP_URL",length = 100)
    private String helpUrl;

    @Column(name = "CREATE_USER",columnDefinition = "INT(11))")
    private int createUser;

    @Column(name = "CREATE_DATE",length = 10)
    private Date createDate;

    @Column(name = "UPDATE_USER",columnDefinition = "INT(11))")
    private int updateUser;

    @Type(type = "date")
    @Column(name = "UPDATE_DATE",length = 10)
    private Date updateDate;

    public UploadHelp() {
    }

    public int getHelpId() {
        return helpId;
    }

    public void setHelpId(int helpId) {
        this.helpId = helpId;
    }

    public Date getUpDate() {
        return upDate;
    }

    public void setUpDate(Date upDate) {
        this.upDate = upDate;
    }

    public String getHelpUrl() {
        return helpUrl;
    }

    public void setHelpUrl(String helpUrl) {
        this.helpUrl = helpUrl;
    }

    public int getCreateUser() {
        return createUser;
    }

    public void setCreateUser(int createUser) {
        this.createUser = createUser;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public int getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(int updateUser) {
        this.updateUser = updateUser;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }
}
