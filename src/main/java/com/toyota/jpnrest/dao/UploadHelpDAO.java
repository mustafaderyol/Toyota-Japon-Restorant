package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor

import com.toyota.jpnrest.entity.UploadHelp;
import org.springframework.stereotype.Component;

@Component
//BaseDAO'dan kalıtım alındı
public class UploadHelpDAO extends BaseDAO<UploadHelp>{
    public UploadHelpDAO() {
        super(UploadHelp.class);
    }

}
