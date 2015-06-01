package com.toyota.jpnrest.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "r_rsrv")
public class Reservation {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "RSRV_ID")
    private int reservationId;

    @Column(name = "USER_ID",columnDefinition = "INT(11)")
    private int userId;

    @Column(name = "STATUS_ID",columnDefinition = "INT(11)")
    private int statusId;
    
    @Column(name = "CREATE_USER",columnDefinition = "INT(11)")
    private int createUser;

    @Column(name = "CREATE_DATE")
    private Date createDate;
    
    @Column(name = "UPDATE_USER",columnDefinition = "INT(11)")
    private int updateUser;

    @Column(name = "UPDATE_DATE")
    private Date updateDate;

    public Reservation() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getStatusId() {
        return statusId;
    }

    public void setStatusId(int statusId) {
        this.statusId = statusId;
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
