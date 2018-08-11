package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.dto.VariantInventoryDto;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import javax.jws.Oneway;
import javax.validation.ConstraintViolationException;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * Created by apatel2 on 5/16/17.
 */

@Component
public class ProductManager{

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVariantRepository productVariantRepository;

    @Autowired
    private ProductVariantDetailRepository productVariantDetailsRepository;

    @Autowired
    private LastProductNoRepository lastProductNoRepository;

    @Autowired
    private ProductInventoryRepository productInventoryRepository;

    @Autowired
    private ProductInventoryLogRepository productInventoryLogRepository;

    @Autowired
    private CustomerProductPriceRepository customerProductPriceRepository;

    @Autowired
    private ProductImageRepository productImageRepository;


    public ProductDao addProduct(ProductDao productDao)
    {
        ProductDao productDao1 = new ProductDao();

        // I need to do this, cause that is the only way to add the inventory into inventory table, if i wont do it then user can not sale this product.
        if(null != productDao && productDao.getOperationType().equalsIgnoreCase("Add"))
        {
            try {
                // First I need to add the product then i need to inventory details
                productDao1 = productRepository.save(productDao);

                // Now i need to add inventory for this product, need to do this manually cause the JPA is gives problem in get so i need handle manually.
                ProductInventoryDao productInventoryDao = new ProductInventoryDao();

                productInventoryDao.setProductId(productDao.getProductId());
                productInventoryDao.setProductNo(productDao.getProductNo());
                productInventoryDao.setCreatedTimestamp(productDao.getCreatedTimestamp());
                productInventoryDao.setCost(productDao.getCost());
                //productInventoryDao.setRetail(productDao.getRetail());
                productInventoryDao.setTier1(productDao.getTier1());
                productInventoryDao.setTier2(productDao.getTier2());
                productInventoryDao.setTier3(productDao.getTier3());
                productInventoryDao.setQuantity(productDao.getQuantity());

                productInventoryRepository.save(productInventoryDao);

            }

            // This means product is in active, so i just need to active product.
            catch (Exception e){

                    productRepository.activeProduct(productDao.getProductNo());
                    // Now i need to add inventory for this product, need to do this manually cause the JPA is gives problem in get so i need handle manually.
                    ProductInventoryDao productInventoryDao = new ProductInventoryDao();

                    productInventoryDao.setProductId(productDao.getProductId());
                    productInventoryDao.setProductNo(productDao.getProductNo());
                    productInventoryDao.setCreatedTimestamp(productDao.getCreatedTimestamp());
                    productInventoryDao.setCost(productDao.getCost());
                    //productInventoryDao.setRetail(productDao.getRetail());
                    productInventoryDao.setTier1(productDao.getTier1());
                    productInventoryDao.setTier2(productDao.getTier2());
                    productInventoryDao.setTier3(productDao.getTier3());
                    productInventoryDao.setQuantity(productDao.getQuantity());

                    productInventoryRepository.save(productInventoryDao);
            }



            // Need to add mark up logic, for now let it be.
//            productInventoryDao.setMarkup(productDao);
        }

        else if((null != productDao && productDao.getOperationType().equalsIgnoreCase("Edit")))
        {
            // Here I have to use product id to update the product, cause this will handle scenario where product no is updating.
             productDao1 = productRepository.findOne(productDao.getProductId());

            //Here, I have to update the product No in Inventory table also, cause if user has update the the product no,
//            It must updated to inventory table otherwise it will create problem and product wont show up on ui.
            // I can not do at database level cause in case of variant, product no wont be in product table.so i have to do it here.
            // I MUST HAVE TO DO IT HERE CAUSE FOR SOME REASON IF I AM DOING AFTER PRODUCT UPDATE, PRODUCTDAO1 OBJECT IS CHNAGEING AND UPDATING WIHT NEW VALUE OF PRODUCT NO SO ITS HARD FORM ME TO UPDATE INVENTORY TABLE FOR THE PRODUCT NO
             if(null != productDao1 && !productDao.getProductNo().equalsIgnoreCase(productDao1.getProductNo())){
                 productInventoryRepository.updateProductNo(productDao.getProductNo(), productDao1.getProductNo(), productDao.getProductId());
             }

             if(productDao1 != null){
                 productDao1 = productRepository.save(productDao);

                 // Update retail price just in case if user has changes.
                 productInventoryRepository.updateProductRetailPrice(productDao.getTier1(), productDao.getTier2(), productDao.getTier3(),productDao.getProductNo());
             }
        }
        return productDao1;
    }

    public ProductInventoryDao addProductInventory(ProductInventoryDao productInventoryDao) {

        ProductInventoryDao productInventoryDao1 = new ProductInventoryDao();

        if (null != productInventoryDao && productInventoryDao.getQuantity() >= 0) {

            productInventoryDao1 = productInventoryRepository.save(productInventoryDao);
            List<ProductInventoryDao> productInventoryDaoList1 = new ArrayList<>();

            // I need to do this because, if there is any product with NEGATIVE or Zero Quantity, I need to delete that inventory,
            if (null != productInventoryDao1) {
                productInventoryDaoList1 = productInventoryRepository.findAllByProductIdAndProductNo(productInventoryDao1.getProductId(), productInventoryDao1.getProductNo());

                int totalQuantity = 0;

                for (ProductInventoryDao productInventoryToDelete : productInventoryDaoList1) {
                    // this will delete inventory details with negative quantity.
                    // Very Important. productInventoryDaoList1.size() > 1 condition., and also positive quantity.
                    // Also, delete all products only when, user is adding positive quantity, this will save deleting all inventory details.
                    if (productInventoryDaoList1.size() > 1 && productInventoryToDelete.getQuantity() <= 0 && productInventoryDao.getQuantity() > 0) {
                        productInventoryRepository.delete(productInventoryToDelete);
                    }
                    else {

                        totalQuantity = totalQuantity + productInventoryToDelete.getQuantity();
                    }
                }
                productInventoryDao1.setTotalQuantity(totalQuantity);
            }
        }
        return productInventoryDao1;
    }
    public List<ProductDao> getProductForSellPage() {

        return productRepository.getAllActiveProductForSellPage();
    }
        public ProductDao getProductById(Integer productId) {

        ProductDao productDao;
        productDao = productRepository.findOneByProductId(productId);

        if(null != productDao){

           List<ProductInventoryDao> productInventoryDaoList =  productInventoryRepository.findAllByProductId(productDao.getProductId());
           if(null != productInventoryDaoList && productInventoryDaoList.size() > 0){
               int totalQuantity = 0;

               for(ProductInventoryDao productInventoryDao: productInventoryDaoList){

                   if(productInventoryDao.getQuantity() > 0){
                       totalQuantity = totalQuantity + productInventoryDao.getQuantity();
                   }
               }
               productDao.setQuantity(totalQuantity);
               productDao.setTier1(productInventoryDaoList.get(0).getTier1());
               productDao.setTier2(productInventoryDaoList.get(0).getTier2());
               productDao.setTier3(productInventoryDaoList.get(0).getTier3());

           }
        }
        return productDao;
    }

    public ProductVariantDao addProductVariant(ProductVariantDao productVariantDao) {

        // This Logic to only update product tier retail price.
        if(null != productVariantDao && null != productVariantDao.getOperationType() && productVariantDao.getOperationType().equalsIgnoreCase("retailTierEdit"))
        {
            productInventoryRepository.updateProductRetailPrice(productVariantDao.getTier1(),productVariantDao.getTier2(),productVariantDao.getTier3(), productVariantDao.getProductNo());
        }
        else {

            ProductVariantDao p = productVariantRepository.save(productVariantDao);
            // Here I need to add inventory details as soon as product variant added.
            if (null != p) {

                ProductInventoryDao productInventoryDao = new ProductInventoryDao();

                assert productVariantDao != null;
                productInventoryDao.setProductId(productVariantDao.getProductId());
                productInventoryDao.setProductNo(productVariantDao.getProductNo());
                productInventoryDao.setCost(productVariantDao.getCost());
                productInventoryDao.setRetail(productVariantDao.getRetail());
                productInventoryDao.setTier1(productVariantDao.getTier1());
                productInventoryDao.setTier2(productVariantDao.getTier2());
                productInventoryDao.setTier3(productVariantDao.getTier3());

                productInventoryDao.setQuantity(productVariantDao.getQuantity());
                productInventoryDao.setCreatedTimestamp(productVariantDao.getCreatedTimestamp());

                productInventoryRepository.save(productInventoryDao);

                // Here I need to add Entry in Image Table as soon as product variant added.

                ProductImageDao productImageDao = new ProductImageDao();
                productImageDao.setProductNo(productVariantDao.getProductNo());
                productImageRepository.save(productImageDao);
            }
        }
        return productVariantDao;
    }

    public List<ProductVariantDao> getProductVariant() {

        return productVariantRepository.findAll();
    }

    public void addProductVariantDetails(ProductVariantDetailDao productVariantDetailDao) {
        productVariantDetailsRepository.save(productVariantDetailDao);
    }

    public List<ProductVariantDetailDao> getProductVariantDetails() {

        return productVariantDetailsRepository.findAll();
    }

    public String deleteProduct(ProductDao productDao) {

        boolean isDeletableProduct = true;

        // Before in active the product we need check if that product has any data or quantity more then 0 in inventory table,
        // If yes then need to show error that can not delete product cause it has data in inventory table,
        // If no then we can in active the product and delete the entry in product inventory table.

        List<ProductInventoryDao> productInventoryDaoList = new ArrayList<>();
        productInventoryDaoList = productInventoryRepository.findAllByProductId(productDao.getProductId());

        for(ProductInventoryDao productInventoryDao: productInventoryDaoList)
        {
            if(productInventoryDao.getQuantity() > 0)
            {
                isDeletableProduct = false;
                break;
            }
        }
        if(isDeletableProduct)
        {
            try{
                // First try to delete, if it is sold before then just inactive the product.
                productRepository.delete(productDao);
            }
            catch (Exception e){
                // This will only INACTIVE THE PRODUCT
                productRepository.deleteProduct(productDao.getProductId());
            }

            // I Need to do this otherwise this will show 2 product on the sale page and product page because my query to get products.
            productInventoryRepository.delete(productInventoryRepository.findAllByProductIdAndProductNo(productDao.getProductId(), productDao.getProductNo()));

            return "Success";
        }
        else
        {
            return "Can not Delete this product, cause it has data in Product Inventory Table.";
        }

    }

    public String  deleteProductVariant(ProductVariantDao productVariantDao) {
        boolean isDeletableVariant = true;

        List<ProductInventoryDao> productInventoryDaoList = new ArrayList<>();
        productInventoryDaoList = productInventoryRepository.findAllByProductIdAndProductNo(productVariantDao.getProductId(), productVariantDao.getProductNo());

        for(ProductInventoryDao productInventoryDao: productInventoryDaoList)
        {
            if(productInventoryDao.getQuantity() > 0)
            {
                isDeletableVariant = false;
                break;
            }
        }
        if(isDeletableVariant)
        {
            try{
                // First I need check this product variant is sold in past or not, if not then only delete this variant
                productVariantRepository.delete(productVariantDao);
            }
            catch (Exception e){
                // This will only INACTIVE THE PRODUCT
                productVariantRepository.deleteProductVariant(productVariantDao.getProductNo());
            }
            return "Success";
        }
        else
        {
            return "Can not Delete this product, cause it has data in Product Inventory Table.";
        }
    }

    public void deleteProductVariantDetails(ProductVariantDetailDao productVariantDetailDao) {

        productVariantDetailsRepository.delete(productVariantDetailDao);
    }


    public String getAutoGeneratedProductNo() {

       List<LastProductNo> test = lastProductNoRepository.findAll();
        Long c = null;
        Long UPCCheckSum = null;
        LastProductNo p = new LastProductNo();

        if(null!= test) {

            for (LastProductNo a : test) {
                c = a.getLastProductNo();
                c = c+1;
            }

            UPCCheckSum = getCheckSumDigitForUPCCode(c);
            p.setLastProductNo(c);
            p.setId(1);

            lastProductNoRepository.save(p);
        }


        String alok = UPCCheckSum.toString();
        String b = c.toString()+alok;
       return b;
    }

    Long getCheckSumDigitForUPCCode(Long beforeUPC)
{
    Long[] testData;

    String testString = beforeUPC.toString();

    String[] ary = testString.split("");

    testData = pseudoOneStepConversion(ary);

    long afterUPC = generateCheckSum(testData);

    System.out.println(afterUPC);

    return afterUPC;
}

    Long generateCheckSum(Long upc_code[])
    {
        long odd_total = 0;
        long even_total = 0;

        for(int i=0; i<11; i++)
        {
            if(((i+1)%2) == 0) {
            /* Sum even digits */
                even_total += upc_code[i];
            } else {
            /* Sum odd digits */
                odd_total += upc_code[i];
            }
        }

        Long sum = (3 * odd_total) + even_total;

    /* Get the remainder MOD 10*/
        Long check_digit = sum % 10;

    /* If the result is not zero, subtract the result from ten. */
        return (check_digit > 0) ? 10 - check_digit : check_digit;
    }

     Long[] pseudoOneStepConversion(String[] numbers) {
        Long[] result = new Long[numbers.length];
        for (int i = 0; i < numbers.length; i++)
            result[i] = Long.parseLong(numbers[i]);
        return result;
    }


    public List<ProductDao> getProductForProductTable() {

        List<ProductDao> productDaoList = new ArrayList<>();

        List<Object[]> withoutVariant = productRepository.getAllActiveProductWithoutVariant();
        List<Object[]> withVariant = productRepository.getAllActiveProductWithVariant();

        if (null != withoutVariant) {

            for (Object[] j : withoutVariant) {

                ProductDao productDao = new ProductDao();

                productDao.setProductId(Integer.parseInt(j[0].toString()));
                productDao.setProductNo(j[1].toString());
                productDao.setDescription(j[2].toString());
                productDao.setTax(Boolean.parseBoolean(j[3].toString()));
                productDao.setVendorId((j[4].toString()));
                productDao.setVariant(false);
                productDao.setTier1(Double.parseDouble(j[5].toString()));
                productDao.setTier2(Double.parseDouble(j[6].toString()));
                productDao.setTier3(Double.parseDouble(j[7].toString()));
                productDao.setQuantity(Integer.parseInt(j[8].toString()));

                productDaoList.add(productDao);
            }
        }
        if (null != withVariant) {

            for (Object[] j : withVariant) {

                ProductDao productDao = new ProductDao();

                productDao.setProductId(Integer.parseInt(j[0].toString()));
                productDao.setProductNo(j[1].toString());
                productDao.setDescription(j[2].toString());
                productDao.setTax(Boolean.parseBoolean(j[3].toString()));
                productDao.setVendorId((j[4].toString()));
                productDao.setVariant(true);
                productDao.setTier1(Double.parseDouble(j[5].toString()));
                productDao.setTier2(Double.parseDouble(j[6].toString()));
                productDao.setTier3(Double.parseDouble(j[7].toString()));
                productDao.setQuantity(Integer.parseInt(j[8].toString()));

                productDaoList.add(productDao);
            }
        }

        return productDaoList;
    }

    public String deleteProductInventory(ProductInventoryDao productInventoryDao) {

        String response;

        int count = productInventoryRepository.getCountOfRowByProductNo(productInventoryDao.getProductNo());

        if (count > 1) {
            productInventoryRepository.delete(productInventoryDao.getId());
            response = "Product Inventory Details Deleted Successfully !!";
        }
        else
        {
            response = "Can not  Delete Product Inventory Details, Because You Must Keep One Item In !!";
        }

        return response;

    }

    public List<ProductInventoryDao> getProductInventory(int productId, String productNo) {

        if(null != productNo && productNo.length() > 2)
        {
            return productInventoryRepository.findAllByProductIdAndProductNo(productId, productNo);
        }
        else {
            return productInventoryRepository.findAllByProductId(productId);
        }
    }

    public List<CustomerProductPrice> getProductPriceByCustomer(String phoneNo) {

        return customerProductPriceRepository.findAllByPhoneNo(phoneNo);
    }

    public List<ProductVariantDao> getProductVariantById(Integer productId) {

        List<ProductVariantDao> productVariantDaoList = new ArrayList<>();
        List<ProductVariantDao> newProductVariantDaoList = new ArrayList<>();

        productVariantDaoList =  productVariantRepository.findAllByProductIdAndActive(productId, true);

            for(ProductVariantDao productVariantDao: productVariantDaoList) {
                int totalQuantity = 0;

                List<ProductInventoryDao> productInventoryDao =  productInventoryRepository.findAllByProductIdAndProductNo(productVariantDao.getProductId(), productVariantDao.getProductNo());
                for(ProductInventoryDao p : productInventoryDao){

                   if(p.getQuantity() > 0){
                       totalQuantity = totalQuantity + p.getQuantity();
                   }
               }

               if(productInventoryDao.size() > 0)
               {
                   productVariantDao.setQuantity(totalQuantity);
                   productVariantDao.setCost(productInventoryDao.get(0).getCost());
                   productVariantDao.setTier1(productInventoryDao.get(0).getTier1());
                   productVariantDao.setTier2(productInventoryDao.get(0).getTier2());
                   productVariantDao.setTier3(productInventoryDao.get(0).getTier3());

                   newProductVariantDaoList.add(productVariantDao);

               }
            }

        return newProductVariantDaoList;

    }

    public List<ProductVariantDao> getAllProductVariant() {

        List<ProductVariantDao> productVariantDaoList = new ArrayList<>();

        List<Object[]> result = productVariantRepository.getProductVariantInventoryDetails();

        if (null != result) {
            for (Object[] j : result) {

                ProductVariantDao productVariantDao = new ProductVariantDao();

                productVariantDao.setProductNo(j[0].toString());
                productVariantDao.setProductId(Integer.parseInt(j[1].toString()));

                if(null != j[2] && null != j[3])
                {
                    productVariantDao.setVariant1(j[2].toString());
                    productVariantDao.setValue1(j[3].toString());

                }
                if(null != j[4] && null != j[5])
                {
                    productVariantDao.setVariant2(j[4].toString());
                    productVariantDao.setValue2(j[5].toString());

                }
                if(null != j[6] && null != j[7])
                {
                    productVariantDao.setVariant3(j[6].toString());
                    productVariantDao.setValue3(j[7].toString());
                }

                productVariantDao.setTier1(Double.parseDouble(j[8].toString()));
                productVariantDao.setTier2(Double.parseDouble(j[9].toString()));
                productVariantDao.setTier3(Double.parseDouble(j[10].toString()));
                productVariantDao.setDescription(j[11].toString());
                productVariantDao.setQuantity(Integer.parseInt(j[12].toString()));

                productVariantDaoList.add(productVariantDao);

            }
        }

        return productVariantDaoList;

    }

    public List<ProductVariantDetailDao> getAllProductVariantDetails() {
        return productVariantDetailsRepository.findAll();

    }

    public List<ProductDao> getProductForPurchaseOrderWithCost() {

        List<ProductDao> productDaoList = new ArrayList<>();

        List<Object[]> withoutVariant = productRepository.getAllActiveProductWithoutVariantForPurchaseOrder();
        List<Object[]> withVariant = productRepository.getAllActiveProductWithVariantForPurchaseOrder();

        if (null != withoutVariant) {

            for (Object[] j : withoutVariant) {

                ProductDao productDao = new ProductDao();

                productDao.setProductId(Integer.parseInt(j[0].toString()));
                productDao.setProductNo(j[1].toString());
                productDao.setDescription(j[2].toString());
                productDao.setTax(Boolean.parseBoolean(j[3].toString()));
                productDao.setVendorId((j[4].toString()));
                productDao.setVariant(false);
                productDao.setTier1(Double.parseDouble(j[5].toString()));
                productDao.setTier2(Double.parseDouble(j[6].toString()));
                productDao.setTier3(Double.parseDouble(j[7].toString()));
                productDao.setCost(Double.parseDouble(j[8].toString()));
                productDao.setQuantity(Integer.parseInt(j[9].toString()));

                productDaoList.add(productDao);
            }
        }
        if (null != withVariant) {

            for (Object[] j : withVariant) {

                ProductDao productDao = new ProductDao();

                productDao.setProductId(Integer.parseInt(j[0].toString()));
                productDao.setProductNo(j[1].toString());
                productDao.setDescription(j[2].toString());
                productDao.setTax(Boolean.parseBoolean(j[3].toString()));
                productDao.setVendorId((j[4].toString()));
                productDao.setVariant(false);
                productDao.setTier1(Double.parseDouble(j[5].toString()));
                productDao.setTier2(Double.parseDouble(j[6].toString()));
                productDao.setTier3(Double.parseDouble(j[7].toString()));
                productDao.setCost(Double.parseDouble(j[8].toString()));
                productDao.setQuantity(Integer.parseInt(j[9].toString()));

                productDaoList.add(productDao);
            }
        }

        return productDaoList;

    }

    public void addProductInventoryFromPurchaseOrder(List<ProductInventoryDao> productInventoryDaoList) {

        List<ProductInventoryLog> productInventoryLogList = new ArrayList<>();

        // This is to add Inventory.
        List<ProductInventoryDao> inventoryResponse = productInventoryRepository.save(productInventoryDaoList);

        // Now I need to log this details to inventory log table for future reporting and use.
        if(null !=inventoryResponse && inventoryResponse.size() > 0){

            for(ProductInventoryDao productInventoryDao: inventoryResponse){

                ProductInventoryLog productInventoryLog = new ProductInventoryLog();

                productInventoryLog.setProductId(productInventoryDao.getProductId());
                productInventoryLog.setProductNo(productInventoryDao.getProductNo());
                productInventoryLog.setUsername(productInventoryDao.getUsername());
                productInventoryLog.setCost(productInventoryDao.getCost());
                productInventoryLog.setQuantity(productInventoryDao.getQuantity());
                productInventoryLog.setCurrentStock(productInventoryDao.getCurrentStock());
                productInventoryLog.setVendorId(productInventoryDao.getVendorId());
                productInventoryLog.setCreatedTimestamp(productInventoryDao.getCreatedTimestamp());

                productInventoryLogList.add(productInventoryLog);
            }

            productInventoryLogRepository.save(productInventoryLogList);
        }
    }
}
