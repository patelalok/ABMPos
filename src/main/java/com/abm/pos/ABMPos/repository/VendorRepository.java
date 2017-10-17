package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.VendorDao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Transactional
public interface VendorRepository extends JpaRepository<VendorDao, Integer>{

    List<VendorDao> findAll();

    @Query(value = "SELECT distinct v.name, sum(i.quantity) quantity, sum(i.cost * i.quantity) cost, sum(i.retail * i.quantity) retail from product p Inner Join vendor v on p.vendor_id = v.vendor_id\n" +
            "inner join product_inventory i on i.product_no = p.product_no group by v.name", nativeQuery = true)
    List<Object[]> getInventoryByVendor();
}
