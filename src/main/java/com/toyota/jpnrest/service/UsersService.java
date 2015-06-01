package com.toyota.jpnrest.service;
//Resource'dan gelen verileri DAO'ya aktarıyor

import com.toyota.jpnrest.dao.UsersDAO;
import com.toyota.jpnrest.entity.Users;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UsersService {
    @Autowired
    UsersDAO usersDAO;
   
    @Transactional
    public List<Users> getAll(){
        return usersDAO.findAll();
    }
    @Transactional
    public void persistUsers(Users cse){
        usersDAO.save(cse);
    }

    @Transactional
    public void deleteUsers(int id){
        usersDAO.delete(usersDAO.findByID(id));
    }

    @Transactional
    public void mergeUsers(Users cse){
        usersDAO.merge(cse);
    }

    @Transactional
    public Users getByID(int id){
        return usersDAO.findByID(id);
    }

    @Transactional
    public List<Users> getUsers(int username){
        return usersDAO.findUsername(username);
    }
}
