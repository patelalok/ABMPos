package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.manager.CategoryManager;
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
public class CategoryController {

    @Autowired
    private CategoryManager categoryManager;

    @RequestMapping(value = "/addCategory", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addCategory(@RequestBody CategoryDao categoryDao)
    {
        categoryManager.addCategory(categoryDao);
        System.out.println("Category Added Successfully!!");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getCategory", method = RequestMethod.GET)
    public List<CategoryDao> getCategory()
    {
        return categoryManager.getCategory();
    }

    @RequestMapping(value = "/deleteCategory", method = RequestMethod.DELETE)
    public ResponseEntity deleteCategory(@RequestParam String name)
    {
        categoryManager.deleteCategory(name);
        System.out.println("Category Deleted Successfully!!");
        return new ResponseEntity(HttpStatus.OK);
    }
}
