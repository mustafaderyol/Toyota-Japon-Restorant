package com.toyota.jpnrest.dao;
//Service'den gelen isteğe göre Entity'de sorgu yapılıyor

import com.toyota.jpnrest.entity.UpldMonthly;
import org.springframework.stereotype.Component;

@Component
//BaseDAO'dan kalıtım alındı
public class UpldMonthlyDAO extends BaseDAO<UpldMonthly>{
    public UpldMonthlyDAO() {
        super(UpldMonthly.class);
    }
}