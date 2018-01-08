package com.abm.pos.ABMPos.controller;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import com.abm.pos.ABMPos.dao.ReportDao.InventoryDto;
import com.abm.pos.ABMPos.manager.PageSetUpManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by asp5045 on 7/14/16.
 */

@RestController
@RequestMapping("")
@CrossOrigin(origins = {"*"})
public class PageSetUpController {

    @Autowired
    PageSetUpManager pageSetUpManager;


//    @RequestMapping(value = "/readExcel", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public List<MultyAddProductDto> readExcelSheet() {
//
//        return pageSetUpManager.readExcelSheet();
//    }





    @RequestMapping(value = "/addMultipleProducts", method = RequestMethod.POST)
    public void addProduct(@RequestBody List<ProductDao> productDto) {

        pageSetUpManager.addProductToDB(productDto);
    }

    @RequestMapping(value = "/addMultyCustomer",method = RequestMethod.POST)
    public void addMultyCustomer(@RequestBody List<CustomerDao> customerDto)
    {
        pageSetUpManager.addMultyCustomer(customerDto);
    }

    @RequestMapping(value = "/addMultipleProductInventory",method = RequestMethod.POST)
    public void addMultipleProductInventory(@RequestBody List<ProductInventoryDao> inventoryDtoList)
    {
        pageSetUpManager.addMultipleProductInventory(inventoryDtoList);
    }

//    @RequestMapping(value = "/getLicenceKey", method = RequestMethod.GET)
//    public boolean getLicenceKey(@RequestParam String licenceKey) {
//
//        return pageSetUpManager.getLicenceKey(licenceKey);
//    }


}
