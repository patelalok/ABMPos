package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.BrandDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */
public interface BrandRepository extends JpaRepository<BrandDao, Integer>{

    //@Query("SELECT  b.name, b.description FROM BrandDao b join ProductDao p where p.brandName = b.name")
    List<BrandDao> findAll();

    @Query(value = "SELECT distinct b.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail from product p Inner Join brand b on p.brand_id = b.brand_id\n" +
            " inner join product_inventory i on i.product_no = p.product_no group by b.name", nativeQuery = true)
    List<Object[]> getInventoryByBrand();
}
