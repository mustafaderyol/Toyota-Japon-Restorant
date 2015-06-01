package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.toyota.jpnrest.entity.UsbilityEntity;
import com.toyota.jpnrest.service.UsbltyService;
import java.util.List;
import javax.ws.rs.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/usblty")
public class UsbltyResource {
    @Autowired
    private UsbltyService usbltyService;
    
    @GET
    @Produces("application/json")
    public List<UsbilityEntity> getUsblty() {
        return usbltyService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public UsbilityEntity getUsbltyWithID(@PathParam("id") int id) {
        return usbltyService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public UsbilityEntity addUsblty(UsbilityEntity usb) {
        usbltyService.persistUsblty(usb);
        return usb;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeUsblty(@PathParam("id") int id) {
        usbltyService.deleteUsblty(id);
    }
}
