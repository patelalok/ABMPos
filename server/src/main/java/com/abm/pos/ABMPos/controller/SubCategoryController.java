package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CategoryDao;
import com.abm.pos.ABMPos.dao.SubCategoryDao;
import com.abm.pos.ABMPos.dto.Response;
import com.abm.pos.ABMPos.manager.CategoryManager;
import com.abm.pos.ABMPos.manager.SubCategoryManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class SubCategoryController {


    @Autowired
    private SubCategoryManager subCategoryManager;

    @RequestMapping(value = "/addSubCategory", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addSubCategory(@RequestBody SubCategoryDao subCategoryDao)
    {
        subCategoryManager.addSubCategory(subCategoryDao);
        System.out.println("SubCategory Added Successfully!!");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getSubCategory", method = RequestMethod.GET)
    public List<SubCategoryDao> getSubCategory()
    {
        return subCategoryManager.getSubCategoryForAddProductPage();
    }

    @RequestMapping(value = "/getSubCategoryByCategoryId", method = RequestMethod.GET)
    public List<SubCategoryDao> getSubCategoryByCategoryId(int categoryId)
    {
        return subCategoryManager.getSubCategoryByCategoryId(categoryId);
    }

    @RequestMapping(value = "/deleteSubCategory", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity deleteSubCategory(@RequestParam int subCategoryId)
    {
        Response response = new Response();

        String res = subCategoryManager.deleteSubCategory(subCategoryId);
        if(res.contains("Successfully"))
        {
            response.setMessage(res);
            System.out.println("SubCategory Deleted Successfully!!");
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        else
        {
            response.setMessage(res);
            return new ResponseEntity<>(response,HttpStatus.CONFLICT);
        }
    }


}
