package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.UploadHelpDAO;
import com.toyota.jpnrest.entity.UploadHelp;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UploadHelpService {
    @Autowired
    UploadHelpDAO uploadHelpDAO;

    @Transactional
    public List<UploadHelp> getAll(){
        return uploadHelpDAO.findAll();
    }
    @Transactional
    public void persistUploadHelp(UploadHelp upload){
        uploadHelpDAO.save(upload);
    }

    @Transactional
    public void deleteUploadHelp(int id){
        uploadHelpDAO.delete(uploadHelpDAO.findByID(id));
    }

    @Transactional
    public void mergeUploadHelp(UploadHelp upload){
        uploadHelpDAO.merge(upload);
    }

    @Transactional
    public UploadHelp getByID(int id){
        return uploadHelpDAO.findByID(id);
    }
}
