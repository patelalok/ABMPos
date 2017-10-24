package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.BrandDao;
import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.manager.BrandManager;
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
@CrossOrigin(origins = {"*"})
public class BrandController {

    @Autowired
    private BrandManager brandManager;

    @RequestMapping(value = "/addBrand", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addBrand(@RequestBody BrandDao brandDao)
    {
        brandManager.addBrand(brandDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getBrand", method = RequestMethod.GET, produces = "application/json")
    public List<BrandDao> getBrand()
    {
        return brandManager.getBrand();
    }

    @RequestMapping(value = "/deleteBrand", method = RequestMethod.DELETE)
    public ResponseEntity deleteBrand(@RequestParam int brandId)
    {
        brandManager.deleteBrand(brandId);
        return new ResponseEntity(HttpStatus.OK);
    }
}
