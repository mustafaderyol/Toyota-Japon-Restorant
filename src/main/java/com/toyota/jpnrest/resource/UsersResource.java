package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.toyota.jpnrest.entity.Users;
import com.toyota.jpnrest.service.UsersService;
import java.util.List;
import javax.ws.rs.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/users")
public class UsersResource {
    @Autowired
    private UsersService usersService;
    
    @GET
    @Produces("application/json")
    public List<Users> getUsers() {
        return usersService.getAll();
    }

    //userId'ye göre arama yapmak için parametreler alınıyor
    @GET
    @Path("{id}")
    @Produces("application/json")
    public Users getUserWithID(@PathParam("id") int id) {
        return usersService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public Users addAdminUsers(Users u) {
        usersService.persistUsers(u);
        return u;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeUsers(@PathParam("id") int id) {
        usersService.deleteUsers(id);
    }

    //userId'ye göre arama yapmak için parametreler alınıyor
    @GET
    @Path("/getUser")
    @Produces("application/json")
    public List<Users> findUser(@QueryParam("id") int id){
        return usersService.getUsers(id);
    }
}
