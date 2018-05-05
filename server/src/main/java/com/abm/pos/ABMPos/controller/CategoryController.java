package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dto.Response;
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
        return categoryManager.getCategoryForAddProductPage();
    }

    @RequestMapping(value = "/deleteCategory", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity deleteCategory(@RequestParam int categoryId)
    {
        Response response = new Response();

        String res = categoryManager.deleteCategory(categoryId);
        if(res.contains("Successfully"))
        {
            response.setMessage(res);
            System.out.println("Category Deleted Successfully!!");
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        else
        {
            response.setMessage(res);
            return new ResponseEntity<>(response,HttpStatus.CONFLICT);
        }

    }
}
