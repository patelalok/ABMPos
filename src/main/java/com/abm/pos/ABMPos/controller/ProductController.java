package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductVariantDao;
import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import com.abm.pos.ABMPos.manager.ProductManager;
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
public class ProductController {

    @Autowired
    private ProductManager productManager;

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProduct(@RequestBody ProductDao productDao)
    {
        productManager.addProduct(productDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getProduct", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getProduct()
    {
        return productManager.getProduct();
    }

    @RequestMapping(value = "/deleteProduct", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteProduct(@RequestParam int productNo)
    {
        productManager.deleteProduct(productNo);
        return new ResponseEntity(HttpStatus.OK);
    }

//    ************************END OF PRODUCT*************************



    @RequestMapping(value = "/addProductVariant", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProductVariant(@RequestBody ProductVariantDao productVariantDao)
    {
        productManager.addProductVariant(productVariantDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getProductVariant", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDao> getProductVariant()
    {
        return productManager.getProductVariant();
    }

    @RequestMapping(value = "/deleteProductVariant", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteProductVariant(@RequestBody ProductVariantDao productVariantDao)
    {
        productManager.deleteProductVariant(productVariantDao);
        return new ResponseEntity(HttpStatus.OK);
    }

    //    ************************END OF PRODUCT VARIANT*************************




    @RequestMapping(value = "/addProductVariantDetails", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProductVariantDetails(@RequestBody ProductVariantDetailDao productVariantDetailDao)
    {
        productManager.addProductVariantDetails(productVariantDetailDao);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getProductVariantDetails", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDetailDao> getProductVariantDetails()
    {
        return productManager.getProductVariantDetails();
    }

    @RequestMapping(value = "/deleteProductVariantDetails", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteProductVariantDetails(@RequestBody ProductVariantDetailDao productVariantDetailDao)
    {
        productManager.deleteProductVariantDetails(productVariantDetailDao);
        return new ResponseEntity(HttpStatus.OK);
    }

    //    ************************END OF PRODUCT VARIANT DETAILS************************

}
