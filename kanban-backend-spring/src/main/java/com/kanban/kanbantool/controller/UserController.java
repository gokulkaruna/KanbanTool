package com.kanban.kanbantool.controller;

import com.kanban.kanbantool.models.User;
import com.kanban.kanbantool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    User usr;

    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        usr = userService.registerUser(user);
        if(usr != null)
            return "User Added Successfully "+user;
        else
            return "User with email already exists";
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user){
        usr = userService.loginUser(user);
        if(usr != null)
            return new ResponseEntity<User>(usr, HttpStatus.OK);
        else
            return new ResponseEntity<User>(user, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/view/devs")
    public List<User> viewDevs(){
        return  userService.viewDevs();
    }




    @GetMapping("/viewall")
    public List<User> viewUsers(){
        return  userService.viewUsers();
    }

    @GetMapping("/view/{email}")
    public String viewUserByEmail(@PathVariable("email") String email){
        usr =  userService.viewUserByEmail(email);
        if(usr != null)
            return "User Found Successfully "+ usr;
        else
            return "User with email not found";

    }

    @DeleteMapping("/delete/{email}")
    public String deleteUser(@PathVariable("email") String email){
        usr = userService.deleteUser(email);
        if(usr != null)
            return "User deleted Successfully "+ usr;
        else
            return "User with email not found";
    }

    @PutMapping("/update")
    public String updateUser(@RequestBody User user){
        usr = userService.updateUser(user);
        if(usr != null)
            return "User updated Successfully "+ usr;
        else
            return "User cant be updated - not found or don't change email";
    }


}
