package com.kanban.kanbantool.service;

import com.kanban.kanbantool.dao.UserRepository;
import com.kanban.kanbantool.enums.UserType;
import com.kanban.kanbantool.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        List<User> usrList = new ArrayList<>();
        usrList = userRepository.findAll().stream().filter(a-> a.getEmail().compareToIgnoreCase(user.getEmail()) == 0).collect(Collectors.toList());
        System.out.println(usrList);
        if(usrList.isEmpty()) {
            return userRepository.save(user);
        }
        return null;
    }


    public User loginUser(User user){
        List<User> usrList  = userRepository.findAll().stream().filter(a-> a.getEmail().equalsIgnoreCase(user.getEmail())).collect(Collectors.toList());
        if(!usrList.isEmpty()){
            if(user.getPassword().compareTo(usrList.get(0).getPassword())==0){
                return usrList.get(0);
            }
        }
        return null;
    }

    public List<User> viewUsers(){
        //if no users
        List<User> usrList   = new ArrayList<>();
        usrList = userRepository.findAll();
        return usrList;
    }


    public List<User> viewDevs(){
        //if no users
        List<User> devList   = new ArrayList<>();
        devList = userRepository.findAll().stream().filter((a)->a.getUserType().toString().equalsIgnoreCase("DEV")).collect(Collectors.toList());
        return devList;
    }


    public User viewUserByEmail(String email){
        List<User> usrList = userRepository.findAll().stream().filter(a->a.getEmail().compareToIgnoreCase(email) == 0).collect(Collectors.toList());
        if(usrList.isEmpty()){
           return null;
        }
        return usrList.get(0);
    }



    public User deleteUser(String email){
        List<User> usrList = new ArrayList<>();
        usrList = userRepository.findAll().stream().filter(a-> a.getEmail().compareToIgnoreCase(email) == 0).collect(Collectors.toList());
        if(!usrList.isEmpty()) {
            userRepository.deleteById(usrList.get(0).getUserId());
            return usrList.get(0);
        }
        return null;
    }

    public User updateUser(User user) {
        User usr = userRepository.findById(user.getUserId()).get();
        if(usr.getEmail().compareToIgnoreCase(user.getEmail())==0)
            return userRepository.save(user);
        else
            return null;
    }


}
