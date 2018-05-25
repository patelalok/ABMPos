package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.ProductVariantDao;
import com.abm.pos.ABMPos.dao.ProductVariantDetailDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface ProductVariantRepository extends JpaRepository<ProductVariantDao, Integer>{

    List<ProductVariantDao> findAll();

    List<ProductVariantDao> findAllByProductId(Integer productId);

    @Query(value = "SELECT distinct " +
            "v.product_no," +
            "v.product_id,\n" +
            "v.variant1,\n" +
            "v.value1,\n" +
            "v.variant2,\n" +
            "v.value2,\n" +
            "v.variant3,\n" +
            "v.value3,\n" +
            "i.tier1,\n" +
            "i.tier2,\n" +
            "i.tier3\n" +
            "from product_variant v \n" +
            "inner join product_inventory i \n" +
            "on i.product_no = v.product_no", nativeQuery = true)
    List<Object[]> getProductVariantInventoryDetails();
}
