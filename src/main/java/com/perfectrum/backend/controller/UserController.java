package com.perfectrum.backend.controller;

import com.perfectrum.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;
    @Autowired
    UserController(UserService userService){
        this.userService = userService;
    }

}