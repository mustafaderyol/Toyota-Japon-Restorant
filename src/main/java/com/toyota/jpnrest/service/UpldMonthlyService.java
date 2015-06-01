package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.UpldMonthlyDAO;
import com.toyota.jpnrest.entity.UpldMonthly;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UpldMonthlyService {
    @Autowired
    UpldMonthlyDAO upldMonthlyDAO;
   
    @Transactional
    public List<UpldMonthly> getAll(){
        return upldMonthlyDAO.findAll();
    }
    @Transactional
    public void persistUpldMonthly(UpldMonthly cse){
        upldMonthlyDAO.save(cse);
    }

    @Transactional
    public void deleteUpldMonthly(int id){
        upldMonthlyDAO.delete(upldMonthlyDAO.findByID(id));
    }

    @Transactional
    public void mergeUpldMonthly(UpldMonthly cse){
        upldMonthlyDAO.merge(cse);
    }

    @Transactional
    public UpldMonthly getByID(int id){
        return upldMonthlyDAO.findByID(id);
    }
}
