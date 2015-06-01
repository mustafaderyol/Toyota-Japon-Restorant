package com.toyota.jpnrest.resource;
//Bu sınıf service tarafından gönderilen verilerin ulaşılma bilgilerini tutmaktadır.

import com.toyota.jpnrest.entity.UploadHelp;
import com.toyota.jpnrest.service.UploadHelpService;

import java.io.*;
import java.util.List;
import javax.activation.DataHandler;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.cxf.message.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;


@Component
@Path("/uploadHelp")
public class UploadHelpResource {

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

            OutputStream os = new FileOutputStream("src/main/webapp/static/upload/help.doc");

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
    private UploadHelpService uploadHelpService;

    @GET
    @Produces("application/json")
    public List<UploadHelp> getUploadHelp() {
        return uploadHelpService.getAll();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public UploadHelp getUploadHelpWithID(@PathParam("id") int id) {
        return uploadHelpService.getByID(id);
    }

    @POST
    @Consumes("application/json")
    @Produces("application/json")
    public UploadHelp addAdminUsers(UploadHelp upload) {
        uploadHelpService.persistUploadHelp(upload);
        return upload;
    }


    @DELETE
    @Path("{id}")
    @Produces("application/json")
    public void removeUploadHelp(@PathParam("id") int id) {
        uploadHelpService.deleteUploadHelp(id);
    }
}
