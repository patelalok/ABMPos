package com.abm.pos.ABMPos.manager;


import com.abm.pos.ABMPos.dao.PurchaseOrderDao;
import com.abm.pos.ABMPos.dao.PurchaseOrderDetailsDao;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.PurchaseOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PurchaseOrderManager {

    @Autowired
    private PurchaseOrderRepository purchaseOrderRepository;

    @Autowired
    private ProductRepository productRepository;

    public PurchaseOrderDao addPurchaseOrder(PurchaseOrderDao purchaseOrderDao) {
        return purchaseOrderRepository.save(purchaseOrderDao);
    }

    public List<PurchaseOrderDao> getPurchaseOrder(String startDate, String endDate) {

        return purchaseOrderRepository.findAllByDateBetweenOrderByDateDesc(startDate,endDate);
    }

    public PurchaseOrderDao getPurchaseOrderById(int purchaseOrderId) {

        PurchaseOrderDao purchaseOrderDao = new PurchaseOrderDao();

        purchaseOrderDao =  purchaseOrderRepository.findOne(purchaseOrderId);

        if(null != purchaseOrderDao)
        {
            for(PurchaseOrderDetailsDao orderItems: purchaseOrderDao.getPurchaseOrderDetailsDaoList()){

                String description = productRepository.findDescriptionByProductId(orderItems.getProductId());
                orderItems.setDescription(description);
            }
        }

        return purchaseOrderDao;
    }
}
