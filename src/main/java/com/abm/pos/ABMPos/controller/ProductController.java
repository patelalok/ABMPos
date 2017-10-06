package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductVariantDao;
import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.manager.ProductManager;
import com.abm.pos.ABMPos.manager.TransactionLineItemManager;
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
public class ProductController {

    @Autowired
    private ProductManager productManager;

    @Autowired
    private TransactionLineItemManager transactionLineItemManager;

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST, consumes = "application/json")
    public ResponseEntity addProduct(@RequestBody ProductDao productDao)
    {
        productManager.addProduct(productDao);
        System.out.println("Product added successfully ");
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getProduct", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getProduct()
    {
        return productManager.getProduct();
    }

    @RequestMapping(value = "/getProductById", method = RequestMethod.GET, produces = "application/json")
    public ProductDao getProductById(@RequestParam String productNo)
    {
        return productManager.getProductById(productNo);
    }

    @RequestMapping(value = "/deleteProduct", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity deleteProduct(@RequestBody ProductDao productDao)
    {
        productManager.deleteProduct(productDao);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/getAutoGeneratedProductNo", method = RequestMethod.GET)
    public String getAutoGeneratedProductNo()
    {
        return productManager.getAutoGeneratedProductNo();
    }

    // Here i need to call lineitem table to get the history thats why from product i am calling lineItem manager class.
    @RequestMapping(value = "/getProductHistory", method = RequestMethod.GET, produces = "application/json")
    public List<TransactionLineItemDao> getProductHistory(@RequestParam String productNo, @RequestParam String timeDuration)
    {
        return transactionLineItemManager.getProductHistory(productNo, timeDuration);
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


    @RequestMapping(value = "/getProductVariantDetailsByName", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDetailDao> getProductVariantDetailsByVariantName(@RequestParam String variantName)
    {
        return productManager.getProductVariantDetailsByVariantName(variantName);
    }


    @RequestMapping(value = "/deleteProductVariantDetails", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteProductVariantDetails(@RequestBody ProductVariantDetailDao productVariantDetailDao)
    {
        productManager.deleteProductVariantDetails(productVariantDetailDao);
        return new ResponseEntity(HttpStatus.OK);
    }

    //    ************************END OF PRODUCT VARIANT DETAILS************************

}
