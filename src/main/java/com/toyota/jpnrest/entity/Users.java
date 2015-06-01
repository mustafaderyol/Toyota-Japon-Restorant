package com.toyota.jpnrest.entity;

import javax.persistence.*;

@Entity
@Table(name = "r_users")
public class Users {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "USER_ID")
    private int userId;
    
    @Column(name = "USERNAME",length = 60)
    private String userName;
    
    @Column(name = "FIRST_NAME",length = 20)
    private String firstName;
    
    @Column(name = "LAST_NAME",length = 20)
    private String lastName;
    
    @Column(name = "PASSWORD",length = 16)
    private String password;
    
    @Column(name = "CREATE_USER",columnDefinition = "INT(11)")
    private int createUser;

    @Column(name = "CREATE_DATE",length = 10)
    private String createDate;
    
    @Column(name = "UPDATE_USER",columnDefinition = "INT(11)")
    private int updateUser;

    @Column(name = "UPDATE_DATE",length = 10)
    private String updateDate;


    @Column(name = "AUTHORITY",columnDefinition = "INT(1)")
    private boolean authority;

    public Users() {
    }
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCreateUser() {
        return createUser;
    }

    public void setCreateUser(int createUser) {
        this.createUser = createUser;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public int getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(int updateUser) {
        this.updateUser = updateUser;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public boolean isAuthority() {
        return authority;
    }

    public void setAuthority(boolean authority) {
        this.authority = authority;
    }
}