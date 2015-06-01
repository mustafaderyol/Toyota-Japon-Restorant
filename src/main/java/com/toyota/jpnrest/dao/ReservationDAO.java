package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor

import com.toyota.jpnrest.entity.Reservation;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
//BaseDAO'dan kalıtım alındı
public class ReservationDAO extends BaseDAO<Reservation>{
    public ReservationDAO() {
        super(Reservation.class);
    }

    //Service'den gelen userId ve statusId'ye göre Entity'de arama yapıyor
    public List<Reservation> findReservation(int userId, int statusId){
        return entityManager.createQuery("SELECT sh FROM Reservation sh where sh.userId='"+userId+"' and sh.statusId='"+statusId+"'")
                .getResultList();
    }

    //Service'den gelen statusId'ye göre Entity'de arama yapıyor
    public List findReserv(int statusId){
        return entityManager.createQuery("SELECT sh FROM Reservation sh where sh.statusId='"+statusId+"'")
                .getResultList();
    }
}
