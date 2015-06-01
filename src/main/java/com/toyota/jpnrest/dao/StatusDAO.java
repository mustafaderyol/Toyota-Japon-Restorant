package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor

import com.toyota.jpnrest.entity.Status;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component

//BaseDAO'dan kalıtım alındı
public class StatusDAO extends BaseDAO<Status>{


    @PersistenceContext
    protected EntityManager entityManager;
    public StatusDAO() {
        super(Status.class);
    }

    //Service'den gelen date ve meal'e göre Entity'de arama yapılıyor
    public List<Status> findDateMealStatus(String date, String meal){
        return entityManager.createQuery("SELECT sh FROM Status sh where sh.date='"+date+"' and sh.meal='"+meal+"'")
                .getResultList();
    }

    //Service'den gelen tarihlere göre Entity'de arama yapılıyor
    public List<Status> findBetweenDateStatus(String date1, String date2){
        return entityManager.createQuery("SELECT sh  FROM Status sh where sh.date>='"+date1+"' and sh.date<='"+date2+"'")
                .getResultList();
    }
}
