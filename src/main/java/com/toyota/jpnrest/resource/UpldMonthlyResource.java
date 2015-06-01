package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import com.toyota.jpnrest.entity.UpldMonthly;
import com.toyota.jpnrest.service.UpldMonthlyService;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Path("/upldMonthly")
public class UpldMonthlyResource {

    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void uploadFile(
            @FormDataParam("file") InputStream fileInputStream,
            @FormDataParam("file") FormDataContentDisposition contentDispositionHeader) {

        // save the file to the server
        saveFile(fileInputStream);

        String output = "File saved to ";
        System.out.println(Response.status(200).entity(output).build());

    }

    // dosyayı kopyalama
    private void saveFile(InputStream uploadedInputStream) {

        try {
            InputStream is = uploadedInputStream;

            OutputStream os = new FileOutputStream("src/main/webapp/static/upload/monthmenu.doc");

            byte[] buffer = new byte[1024];
            int bytesRead;
            //read from is to buffer
            while((bytesRead = is.read(buffer)) !=-1){
                os.write(buffer, 0, bytesRead);
            }
            is.close();
            //flush OutputStream to write any buffered data to file
            os.flush();
            os.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @Autowired
    private UpldMonthlyService upldMonthlyService;

    @GET
    @Produces("application/json")
    public List<UpldMonthly> getUpldMonthly() {
        return upldMonthlyService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public UpldMonthly getUpldMonthlyWithID(@PathParam("id") int id) {
        return upldMonthlyService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public UpldMonthly addAdminUsers(UpldMonthly aU) {
        upldMonthlyService.persistUpldMonthly(aU);
        return aU;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeUpldMonthly(@PathParam("id") int id) {
        upldMonthlyService.deleteUpldMonthly(id);
    }
    
}
