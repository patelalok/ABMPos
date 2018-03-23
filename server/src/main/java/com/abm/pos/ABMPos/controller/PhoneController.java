package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.Phone;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.manager.PhoneManager;
import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("*")
@CrossOrigin(origins = "*")
public class PhoneController {

    @Autowired
    private PhoneManager phoneManager;

    @RequestMapping(value = "/imei", method = RequestMethod.POST, consumes = "application/json")
    public Phone addPhone(@RequestBody Phone phone){

       return phoneManager.addPhone(phone);
    }
    @RequestMapping(value = "/phone", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getPhones(){

        return phoneManager.getPhones();
    }
    @RequestMapping(value = "/imei", method = RequestMethod.GET, produces = "application/json")
    public List<Phone> getImeiByPhone(@RequestParam String productNo){

        return phoneManager.getImeiByPhone(productNo);
    }

}
