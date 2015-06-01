package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor-

import com.toyota.jpnrest.entity.UsbilityEntity;
import org.springframework.stereotype.Component;

@Component
//BaseDAO'dan kalıtım alındı
public class UsbltyDAO extends BaseDAO<UsbilityEntity>{
    public UsbltyDAO() {
        super(UsbilityEntity.class);
    }
}
