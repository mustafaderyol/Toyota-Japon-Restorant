package com.toyota.jpnrest.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "r_upld_monthly")
public class UpldMonthly {
    
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "MONTHLY_ID")
    private int monthlyId;
    
    @Column(name = "UP_DATE",length = 10)
    private String upDate;
    
    @Column(name = "MONTHLY_URL",length = 100)
    private String monthlyUrl;
    
    @Column(name = "CREATE_USER",columnDefinition = "INT(11))")
    private int createUser;

    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    @Column(name = "UPDATE_USER",columnDefinition = "INT(11))")
    private int updateUser;

    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public UpldMonthly() {
    }

    public UpldMonthly(String upDate, String monthlyUrl) {
        this.upDate = upDate;
        this.monthlyUrl = monthlyUrl;
    }

    public int getMonthlyId() {
        return monthlyId;
    }

    public void setMonthlyId(int monthlyId) {
        this.monthlyId = monthlyId;
    }

    public String getUpDate() {
        return upDate;
    }

    public void setUpDate(String upDate) {
        this.upDate = upDate;
    }

    public String getMonthlyUrl() {
        return monthlyUrl;
    }

    public void setMonthlyUrl(String monthlyUrl) {
        this.monthlyUrl = monthlyUrl;
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
