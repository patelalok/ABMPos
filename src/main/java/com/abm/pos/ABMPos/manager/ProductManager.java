package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.LastProductNo;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductVariantDao;
import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import com.abm.pos.ABMPos.repository.*;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

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
    private Utility utility;

    public void addProduct(ProductDao productDao)
    {
        productRepository.save(productDao);
    }

    public List<ProductDao> getProduct() {

        return productRepository.getAllActiveProduct();
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

    public void deleteProduct(ProductDao productDao) {

        // This will only INACTIVE THE PRODUCT
        productRepository.deleteProduct(productDao.getProductNo());
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



}
