package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.Phone;
import com.abm.pos.ABMPos.manager.PhoneManager;
import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.*;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = "*")
public class PhoneController {

    @Autowired
    private PhoneManager phoneManager;

    @RequestMapping(value = "/phone", method = RequestMethod.POST, consumes = "application/json")
    public Phone addPhone(@RequestParam Phone phone){

       return phoneManager.addPhone(phone);

    }

}
