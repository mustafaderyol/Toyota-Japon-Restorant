package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.toyota.jpnrest.entity.Reservation;
import com.toyota.jpnrest.service.ReservationService;
import java.util.List;
import javax.ws.rs.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/rsvr")
public class ReservationResource {
    @Autowired
    private ReservationService reservationService;
    
    @GET
    @Produces("application/json")
    public List<Reservation> getReservation() {
        return reservationService.getAll();
    }

    @GET
    @Path("/getRsrvId")
    @Produces("application/json")
    public Reservation getReservationWithID(@QueryParam("id") int id) {
        return reservationService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Reservation addReservation(Reservation rsrv) {
        reservationService.persistReservation(rsrv);
        return rsrv;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeReservation(@PathParam("id") int id) {
        reservationService.deleteReservation(id);
    }

    //userId ve statusId'e göre arama yapmak için bu parametreleri alıyor
    @GET
    @Path("/reservation")
    @Produces("application/json")
    public List<Reservation> findReservation(@QueryParam("userId") int userId, @QueryParam("statusId") int statusId){

        return reservationService.getReservation(userId,statusId);
    }

    //statusId'ye göre arama yapmak için bu parametreleri alıyor
    @GET
    @Path("/reserv")
    @Produces("application/json")
    public List<Reservation> findReserv(@QueryParam("statusId") int statusId){

        return reservationService.getReserv(statusId);
    }
}
