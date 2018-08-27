package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.dto.VariantInventoryDto;
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
    public ProductDao addProduct(@RequestBody ProductDao productDao) {
        System.out.println("Product added or updated successfully ");
         return productManager.addProduct(productDao);
    }

    @RequestMapping(value = "/addProductInventory", method = RequestMethod.POST, consumes = "application/json")
    public ProductInventoryDao addProductInventory(@RequestBody ProductInventoryDao productInventoryDao) {
        return productManager.addProductInventory(productInventoryDao);
    }

    @RequestMapping(value = "/addProductInventoryFromPurchaseOrder", method = RequestMethod.POST, consumes = "application/json")
    public void addProductInventoryFromPurchaseOrder(@RequestBody List<ProductInventoryDao> productInventoryDaoList) {
         productManager.addProductInventoryFromPurchaseOrder(productInventoryDaoList);
    }

    @RequestMapping(value = "/getProductFormSearch", method = RequestMethod.GET, produces = "application/json")
    public List<ProductInventoryDao> getProductFormSearch(String searchInput) {
        return productManager.getProductFormSearch(searchInput);
    }

    @RequestMapping(value = "/getProductInventory", method = RequestMethod.GET, produces = "application/json")
    public List<ProductInventoryDao> getProductInventory(int productId, String productNo) {
        return productManager.getProductInventory(productId, productNo);
    }

    @RequestMapping(value = "/getProductForProductTable", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getProductForProductTable(String searchValue)
    {
        return productManager.getProductForProductTable(searchValue);
    }

    @RequestMapping(value = "/getProductForPurchaseOrderWithCost", method = RequestMethod.GET, produces = "application/json")
    public List<ProductDao> getProductForPurchaseOrderWithCost() {
        return productManager.getProductForPurchaseOrderWithCost();
    }

    @RequestMapping(value = "/getProductById", method = RequestMethod.GET, produces = "application/json")
    public ProductDao getProductById(@RequestParam Integer productId) {
        return productManager.getProductById(productId);
    }

    @RequestMapping(value = "/getProductPriceByCustomer", method = RequestMethod.GET, produces = "application/json")
    public List<CustomerProductPrice> getProductPriceByCustomer(@RequestParam String phoneNo){

        return productManager.getProductPriceByCustomer(phoneNo);
    }

    @RequestMapping(value = "/deleteProduct", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity<String> deleteProduct(@RequestBody ProductDao productDao) {
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
    public List<TransactionLineItemDao> getProductHistory(String productNo,String startDate, String endDate)
    {
        return transactionLineItemManager.getProductHistory(productNo,startDate, endDate);
    }





//    ************************END OF PRODUCT*************************



    @RequestMapping(value = "/addProductVariant", method = RequestMethod.POST, consumes = "application/json")
    public ProductVariantDao addProductVariant(@RequestBody ProductVariantDao productVariantDao)
    {
        return productManager.addProductVariant(productVariantDao);
    }

    @RequestMapping(value = "/getAllProductVariant", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDao> getAllProductVariant()
    {
        return productManager.getAllProductVariant();
    }

    @RequestMapping(value = "/getProductVariantById", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDao> getProductVariantById(@RequestParam Integer productId)
    {
        return productManager.getProductVariantById(productId);
    }

    @RequestMapping(value = "/getProductVariant", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDao> getProductVariant()
    {
        return productManager.getProductVariant();
    }

    @RequestMapping(value = "/deleteProductVariant", method = RequestMethod.PUT, consumes = "application/json")
    public ResponseEntity<String> deleteProductVariant(@RequestBody ProductVariantDao productVariantDao)
    {
        String status =  productManager.deleteProductVariant(productVariantDao);

        if(status.equalsIgnoreCase("Success"))
            return new ResponseEntity<>(status, HttpStatus.OK);
        else
            return new ResponseEntity<>(status, HttpStatus.CONFLICT);
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


    @RequestMapping(value = "/getAllProductVariantDetails", method = RequestMethod.GET, produces = "application/json")
    public List<ProductVariantDetailDao> getAllProductVariantDetails()
    {
        return productManager.getAllProductVariantDetails();
    }


    @RequestMapping(value = "/deleteProductVariantDetails", method = RequestMethod.DELETE, consumes = "application/json")
    public ResponseEntity deleteProductVariantDetails(@RequestBody ProductVariantDetailDao productVariantDetailDao)
    {
        productManager.deleteProductVariantDetails(productVariantDetailDao);
        return new ResponseEntity(HttpStatus.OK);
    }

    //    ************************END OF PRODUCT VARIANT DETAILS************************

}
