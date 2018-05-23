package com.abm.pos.ABMPos.dto;

import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import com.abm.pos.ABMPos.dao.ProductVariantDao;

import java.util.List;

public class VariantInventoryDto {

    private ProductVariantDao productVariantDao;
    private List<ProductInventoryDao> productInventoryDao;
    private int totalQuantity;

    public ProductVariantDao getProductVariantDao() {
        return productVariantDao;
    }

    public void setProductVariantDao(ProductVariantDao productVariantDao) {
        this.productVariantDao = productVariantDao;
    }

    public List<ProductInventoryDao> getProductInventoryDao() {
        return productInventoryDao;
    }

    public void setProductInventoryDao(List<ProductInventoryDao> productInventoryDao) {
        this.productInventoryDao = productInventoryDao;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }
}
