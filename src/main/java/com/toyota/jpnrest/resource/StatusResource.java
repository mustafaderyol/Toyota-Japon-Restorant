package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.toyota.jpnrest.entity.Status;
import com.toyota.jpnrest.service.StatusService;
import java.util.List;
import java.util.Date;
import javax.ws.rs.*;
import java.text.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/status")
public class StatusResource {
    @Autowired
    private StatusService statusService;
    
    @GET
    @Produces("application/json")
    public List<Status> getStatus() {
        return statusService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Status getStatusWithID(@PathParam("id") int id) {
        return statusService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Status addStatus(Status status) {
        statusService.persistStatus(status);
        return status;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeStatus(@PathParam("id") int id) {
        statusService.deleteStatus(id);
    }

    //date ve meal'e göre arama yapmak için bu parametreleri alıyor
    @GET
    @Path("/dateMeal")
    @Produces("application/json")
    public List<Status> findDateMealStatus(@QueryParam("date") String date, @QueryParam("meal") String meal){

        return statusService.getDateMeal(date,meal);
    }

    //Gelen iki tarih verirsin arasında kalan Status'leri aramak için bu parametreleri alıyor
    @GET
    @Path("/dateMealBetween")
    @Produces("application/json")
    public List<Status> findBetweenDateStatus(@QueryParam("date1") String date1, @QueryParam("date2") String date2){

        return statusService.findBetweenDateStatus(date1,date2);
    }
}
