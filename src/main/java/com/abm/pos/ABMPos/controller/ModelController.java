package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ModelDao;
import com.abm.pos.ABMPos.manager.ModelManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
@RestController
@RequestMapping("*")
public class ModelController {

    @Autowired
    private ModelManager modelManager;

    @RequestMapping(value = "/addModel", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addModel(@RequestBody ModelDao modelDao)
    {
        modelManager.addModel(modelDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getModel", method = RequestMethod.GET, produces = "application/json")
    public List<ModelDao> getModel()
    {
        return modelManager.getModel();
    }

    @RequestMapping(value = "/deleteModel", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteModel(@RequestParam String name)
    {
        modelManager.deleteModel(name);
        return new ResponseEntity(HttpStatus.OK);
    }
}
