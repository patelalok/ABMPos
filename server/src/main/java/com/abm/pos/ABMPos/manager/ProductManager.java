package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.*;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import javax.jws.Oneway;
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
    private CustomerProductPriceRepository customerProductPriceRepository;

    @Autowired
    private Utility utility;


    //public static final String KEY = "products";


    //@CachePut("products")
    public ProductDao addProduct(ProductDao productDao)
    {
        ProductDao productDao1 = new ProductDao();

        // I need to do this, cause that is the only way to add the inventory into inventory table, if i wont do it then user can not sale this product.
        if(null != productDao && productDao.getOperationType().equalsIgnoreCase("Add"))
        {

            // First I need to add the product then i need to inventory details

            productDao1 = productRepository.save(productDao);

            // Now i need to add inventory for this product, need to do this manually cause the JPA is gives problem in get so i need handle manually.
            ProductInventoryDao productInventoryDao = new ProductInventoryDao();

            productInventoryDao.setProductNo(productDao.getProductNo());
            productInventoryDao.setCreatedTimestamp(productDao.getCreatedTimestamp());
            productInventoryDao.setCost(productDao.getCost());
            productInventoryDao.setRetail(productDao.getRetail());
            productInventoryDao.setQuantity(productDao.getQuantity());

            productInventoryRepository.save(productInventoryDao);

            // Need to add mark up logic, for now let it be.
//            productInventoryDao.setMarkup(productDao);
        }

        else if((null != productDao && productDao.getOperationType().equalsIgnoreCase("Edit")))
        {
             productDao1 = productRepository.findOne(productDao.getProductNo());
            int totalProduct = 0;
            // I need to do this cause i need to maintain retail price of the product in both product and product inventory Table.
            // So this is really important.
            if(null != productDao1 && productDao.getRetail() != productDao1.getRetail()) {

                productInventoryRepository.updateProductRetailPrice(productDao.getRetail(), productDao.getProductNo());
            }
                    // This will sync the product quantity after every update.
            assert productDao1 != null;
            List<ProductInventoryDao> productInventoryDaoList = productInventoryRepository.findAllByProductNo(productDao1.getProductNo());

                    if (null != productInventoryDaoList && productInventoryDaoList.size() > 0) {
                        for (ProductInventoryDao productInventoryDao2 : productInventoryDaoList) {
                            totalProduct = totalProduct + productInventoryDao2.getQuantity();
                        }
                        // Now i need to update quantity in product table, so setting data here which will save after this.
                        productDao.setQuantity(totalProduct);
                        productDao.setCost(productInventoryDaoList.get(0).getCost());
                    }
            productDao1 = productRepository.save(productDao);
        }

        return productDao1;
    }
    //@CachePut(value = "products", key = "#productDao.productNo")
   // @CacheEvict(value = "products",  key = "#root.target.KEY")

    @CachePut("products")
    //@CacheEvict("products")
    public ProductDao addProductTest(ProductDao productDao) {

       return productRepository.save(productDao);
    }
    public ProductInventoryDao addProductInventory(ProductInventoryDao productInventoryDao) {

        ProductInventoryDao productInventoryDaoList = productInventoryRepository.save(productInventoryDao);
        List<ProductInventoryDao> productInventoryDaoList1 = new ArrayList<>();
        List<ProductInventoryDao> productInventoryDaoListForZeroQuantity = new ArrayList<>();


        // I need to do this because, if there is any product with NEGATIVE Quantity, I need to delete that inventory, cause if i dont delete, that will messed up current stock, cause negative minus the positive inventory make complete count wrong.
        if(null != productInventoryDaoList)
        {
            productInventoryDaoList1 = productInventoryRepository.findAllByProductNo(productInventoryDaoList.getProductNo());

            int totalProduct = 0;

            for(ProductInventoryDao productInventoryDao1:productInventoryDaoList1)
            {
                // this will delete inventory details with negative quantity.
                // Very Important. productInventoryDaoList1.size() > 0 condition.
                if(productInventoryDaoList1.size() > 0 && productInventoryDao1.getQuantity() < 0)
                {
                    productInventoryRepository.delete(productInventoryDao1);
                }
                else {
                    // Now I need to update product table here, I need to do this, JUST SHOW CORRECT STOCK ON THE PRODUCT PAGE, CAUSE I CAN NOT CALCULATE FROM THE INVENTORY,
                    // SO I NEED MAKE SURE WHEN EVER INVENTORY CHANGES I NEED TO CHANGE THE QUANTITY IN PRODUCT TABLE.

                    totalProduct = totalProduct + productInventoryDao1.getQuantity();
                }

            }
            // Now i need to update quantity in product table
            productRepository.updateQuantityAfterInventoryUpdate(totalProduct,productInventoryDaoList.getCost(),productInventoryDaoList.getProductNo());

            // Now I need to get the inventory again to delete the inventory with 0, I need to do here because i am deleting with <0 above;
            productInventoryDaoListForZeroQuantity = productInventoryRepository.findAllByProductNo(productInventoryDaoList.getProductNo());
            for(ProductInventoryDao productInventoryDaoForZeroQuantity:productInventoryDaoListForZeroQuantity)
            {
                // this will delete inventory details with negative quantity.
                // Very Important. productInventoryDaoList1.size() > 0 condition, this will work becuase customer has just added or updated inventory.So we have one positive value.
                if(productInventoryDaoListForZeroQuantity.size() > 0 && productInventoryDaoForZeroQuantity.getQuantity() <= 0)
                {
                    productInventoryRepository.delete(productInventoryDaoForZeroQuantity);
                }
            }


            // I am returing this object back so, i can use this count to display on product table.
            productInventoryDaoList.setQuantity(totalProduct);

        }

        return productInventoryDaoList;

    }

   // @Cacheable("products")
    public List<ProductDao> getProductTableDetails() {

            List<ProductDao> productDaoArrayList = new ArrayList<>();


            List<ProductDao> productDaoArrayListNew = new ArrayList<>();

            productDaoArrayList = productRepository.getAllActiveProduct();

            //return productDaoArrayList;

//            for(ProductDao p :productDaoArrayList)
//            {
//                int quantity = 0;
//                for(ProductInventoryDao i : p.getProductInventoryDaoList())
//                {
//                    quantity = quantity + i.getQuantity();
//                }
//
//                p.setQuantity(quantity);
//
//                productDaoArrayListNew.add(p);
//
//            }


            return productDaoArrayListNew;

          //  return productDaoArrayList;

        }

    public List<ProductDao> getProductForSellPage() {

        return productRepository.getAllActiveProductForSellPage();
    }
        public ProductDao getProductById(String productNo) {

        return productRepository.findOne(productNo);
    }

    public void addProductVariant(ProductVariantDao productVariantDao) {

        productVariantRepository.save(productVariantDao);
    }

    public List<ProductVariantDao> getProductVariant() {

        return productVariantRepository.findAll();
    }

    public void addProductVariantDetails(ProductVariantDetailDao productVariantDetailDao) {

       // productVariantDetailsRepository.save(productVariantDetailDao);
    }

    public List<ProductVariantDetailDao> getProductVariantDetails() {

        return productVariantDetailsRepository.findAll();
    }

    public List<ProductVariantDetailDao> getProductVariantDetailsByVariantName(String variantName) {

        return productVariantDetailsRepository.findDistinctByName(variantName);
    }

    public String deleteProduct(ProductDao productDao) {

        boolean isDeletableProduct = true;

        // Before in active the product we need check if that product has any data or quantity more then 0 in inventory table,
        // If yes then need to show error that can not delete product cause it has data in inventory table,
        // If no then we can in active the product and delete the entry in product inventory table.

        List<ProductInventoryDao> productInventoryDaoList = new ArrayList<>();
        productInventoryDaoList = productInventoryRepository.findAllByProductNo(productDao.getProductNo());

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
            // This will only INACTIVE THE PRODUCT
            productRepository.deleteProduct(productDao.getProductNo());
            return "Success";
        }
        else
        {
            return "Can not Delete this product, cause it has data in Product Inventory Table.";
        }

    }

    public void deleteProductVariant(ProductVariantDao productVariantDao) {

        productVariantRepository.delete(productVariantDao);
    }

    public void deleteProductVariantDetails(ProductVariantDetailDao productVariantDetailDao) {

        //productVariantDetailsRepository.delete(productVariantDetailDao);
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

//        List<Object[]> result = productRepository.getProductWithInventory();

        return null;
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

    public List<ProductInventoryDao> getProductInventory(String productNo) {

        return productInventoryRepository.findAllByProductNo(productNo);
    }

    public List<CustomerProductPrice> getProductPriceByCustomer(String phoneNo) {

        return customerProductPriceRepository.findAllByPhoneNo(phoneNo);
    }
}
