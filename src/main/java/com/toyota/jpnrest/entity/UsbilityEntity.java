package com.toyota.jpnrest.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "r_usblty")
public class UsbilityEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "USBLTY_ID")
    private int usbltyId;
    
    @Column(name = "MOUNT",columnDefinition = "INT(2)")
    private int mount;
    
    @Column(name = "YEAR",columnDefinition = "INT(4)")
    private int year;
    
    @Column(name = "CREATE_USER",columnDefinition = "INT(11)")
    private int createUser;

    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    @Column(name = "UPDATE_USER",columnDefinition = "INT(11)")
    private int updateUser;

    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public UsbilityEntity() {
    }

    public int getCreateUser() {
        return createUser;
    }

    public void setCreateUser(int createUser) {
        this.createUser = createUser;
    }

    public int getUsbltyId() {
        return usbltyId;
    }

    public void setUsbltyId(int usbltyId) {
        this.usbltyId = usbltyId;
    }

    public int getMount() {
        return mount;
    }

    public void setMount(int mount) {
        this.mount = mount;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
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
