package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.ProductVariantDao;
import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.ProductVariantDetailRepository;
import com.abm.pos.ABMPos.repository.ProductVariantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    public void addProduct(ProductDao productDao)
    {
        productRepository.save(productDao);
    }

    public List<ProductDao> getProduct() {

        return productRepository.findAll();
    }

    public void addProductVariant(ProductVariantDao productVariantDao) {

        productVariantRepository.save(productVariantDao);
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

    public void deleteProduct(int productNo) {

        productRepository.delete(productNo);
    }

    public void deleteProductVariant(ProductVariantDao productVariantDao) {

        productVariantRepository.delete(productVariantDao);
    }

    public void deleteProductVariantDetails(ProductVariantDetailDao productVariantDetailDao) {

        productVariantDetailsRepository.delete(productVariantDetailDao);
    }



}
