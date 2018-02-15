package com.abm.pos.ABMPos.repository;

import com.abm.pos.ABMPos.dao.CustomerProductPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerProductPriceRepository extends JpaRepository<CustomerProductPrice, String> {

    @Query("SELECT p.customerProductPricePK.productNo, p.retail FROM CustomerProductPrice p WHERE p.customerProductPricePK.phoneNo = ?1")
    List<CustomerProductPrice> findAllByPhoneNo(String phoneNo);
}
