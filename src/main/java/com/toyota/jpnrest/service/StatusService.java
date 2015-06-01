package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.StatusDAO;
import com.toyota.jpnrest.entity.Status;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;

@Component
public class StatusService {
     @Autowired
    StatusDAO statusDAO;
   
    @Transactional
    public List<Status> getAll(){
        return statusDAO.findAll();
    }
    @Transactional
    public void persistStatus(Status status){
        statusDAO.save(status);
    }

    @Transactional
    public void deleteStatus(int id){
        statusDAO.delete(statusDAO.findByID(id));
    }

    @Transactional
    public void mergeStatus(Status status){
        statusDAO.merge(status);
    }

    @Transactional
    public Status getByID(int id){
        return statusDAO.findByID(id);
    }

    @Transactional
    public List<Status> getDateMeal(String date, String meal){
        return statusDAO.findDateMealStatus(date,meal);
    }

    @Transactional
    public List<Status> findBetweenDateStatus(String date1, String date2){
        return statusDAO.findBetweenDateStatus(date1,date2);
    }

}
