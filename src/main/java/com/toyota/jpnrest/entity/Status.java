package com.toyota.jpnrest.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "r_status")
public class Status {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "STATUS_ID")
    private int statusId;

    @Type(type = "date")
    @Column(name = "DATE")
    private Date date;

    @Column(name = "MEAL",length = 1)
    private String meal;
    
    @Column(name = "CREATE_USER",columnDefinition = "INT(11)")
    private int createUser;


    @Type(type = "date")
    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    @Column(name = "UPDATE_USER",columnDefinition = "INT(11)")
    private int updateUser;


    @Type(type = "date")
    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public Status() {
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMeal() {
        return meal;
    }

    public void setMeal(String meal) {
        this.meal = meal;
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
