package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.*;
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
//
//    @Autowired
//    ProductInventoryRepository productInventoryRepository;
//
//    @RequestMapping(value = "/getProductInventory", method = RequestMethod.GET, produces = "application/json")
//    public ProductInventoryDao getProductInventory()
//    {
//        return productInventoryRepository.test();
//    }

    @RequestMapping(value = "/addProduct", method = RequestMethod.POST, consumes = "application/json")
    public ProductDao addProduct(@RequestBody ProductDao productDao)
    {
        System.out.println("Product added or updated successfully ");
         return productManager.addProduct(productDao);
    }

    @RequestMapping(value = "/addProductInventory", method = RequestMethod.POST, consumes = "application/json")
    public List<ProductInventoryDao> addProductInventory(@RequestBody List<ProductInventoryDao> productInventoryDao)
    {
        return productManager.addProductInventory(productInventoryDao);
//        System.out.println("Product Inventory list added successfully ");
//        return new ResponseEntity(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getProductInventory", method = RequestMethod.GET, produces = "application/json")
    public List<ProductInventoryDao> getProductInventory(String productNo)
    {
        return productManager.getProductInventory(productNo);
    }

    @RequestMapping(value = "/getProductTableDetails", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getProductTableDetails()
    {
        return productManager.getProductForSellPage();
    }

//    @RequestMapping(value = "/getProductForProductTable", method = RequestMethod.GET, produces = "application/json")
//    public List<ProductDao> getProductForProductTable()
//    {
//        return productManager.getProductForProductTable();
//    }

//    @RequestMapping(value = "/getProduct", method = RequestMethod.GET, produces = "application/json")
//    public List<ProductDao> getProductForSellPage()
//    {
//        return productManager.getProductForSellPage();
//    }

    @RequestMapping(value = "/getProductById", method = RequestMethod.GET, produces = "application/json")
    public ProductDao getProductById(@RequestParam String productNo)
    {
        return productManager.getProductById(productNo);
    }

    @RequestMapping(value = "/getProductPriceByCustomer", method = RequestMethod.GET, produces = "application/json")
    public List<CustomerProductPrice> getProductPriceByCustomer(@RequestParam String phoneNo){

        return productManager.getProductPriceByCustomer(phoneNo);
    }

    @RequestMapping(value = "/deleteProduct", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity<String> deleteProduct(@RequestBody ProductDao productDao)
    {
        String status = productManager.deleteProduct(productDao);

        if(status.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(status, HttpStatus.OK);
        else
            return new ResponseEntity<>(status, HttpStatus.CONFLICT);

    }

    @RequestMapping(value = "/deleteProductInventory", method = RequestMethod.POST)
    public ResponseEntity<String> deleteProductInventory(@RequestBody ProductInventoryDao productInventoryDao)
    {
        String status = productManager.deleteProductInventory(productInventoryDao);

        if(status.equalsIgnoreCase("Product Inventory Details Deleted Successfully !!"))
            return new ResponseEntity<>(status, HttpStatus.OK);
        else
            return new ResponseEntity<>(status, HttpStatus.CONFLICT);

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
