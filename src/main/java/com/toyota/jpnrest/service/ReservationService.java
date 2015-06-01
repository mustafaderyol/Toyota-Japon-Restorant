package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.ReservationDAO;
import com.toyota.jpnrest.entity.Reservation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class ReservationService {
     @Autowired
    ReservationDAO reservationDAO;
    
    @Transactional
    public List<Reservation> getAll(){
        return reservationDAO.findAll();
    }
    @Transactional
    public void persistReservation(Reservation rsrv){
        reservationDAO.save(rsrv);
    }

    @Transactional
    public void deleteReservation(int id){
        reservationDAO.delete(reservationDAO.findByID(id));
    }

    @Transactional
    public void mergeReservation(Reservation rsrv){
        reservationDAO.merge(rsrv);
    }

    @Transactional
    public Reservation getByID(int id){
        return reservationDAO.findByID(id);
    }

    @Transactional
    public List<Reservation> getReservation(int userId, int statusId){
        return reservationDAO.findReservation(userId,statusId);
    }

    @Transactional
    public List<Reservation> getReserv(int statusId){
        return reservationDAO.findReserv(statusId);
    }
}
