package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor

import com.toyota.jpnrest.entity.Users;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
//BaseDAO'dan kalıtım alındı
public class UsersDAO extends BaseDAO<Users>{
    public UsersDAO() {
        super(Users.class);
    }

    //Service'den gelen userId'ye göre Entity'de arama yapıyor
    public List<Users> findUsername(int id){
        return entityManager.createQuery("SELECT sh FROM Users sh where sh.userId='"+id+"'")
                .getResultList();
    }
}
