package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.UsbltyDAO;
import com.toyota.jpnrest.entity.UsbilityEntity;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UsbltyService {
    @Autowired
    UsbltyDAO usbltyDAO;
   
    @Transactional
    public List<UsbilityEntity> getAll(){
        return usbltyDAO.findAll();
    }
    @Transactional
    public void persistUsblty(UsbilityEntity usb){
        usbltyDAO.save(usb);
    }

    @Transactional
    public void deleteUsblty(int id){
        usbltyDAO.delete(usbltyDAO.findByID(id));
    }

    @Transactional
    public void mergeUsblty(UsbilityEntity usb){
        usbltyDAO.merge(usb);
    }

    @Transactional
    public UsbilityEntity getByID(int id){
        return usbltyDAO.findByID(id);
    }
}
