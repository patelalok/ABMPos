package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.ProductInventoryDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dao.TransactionLineItemDao;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.ProductInventoryRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sun.dc.pr.PRError;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by apatel2 on 5/18/17.
 */
@Component
public class TransactionsManager {

    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private Utility utility;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductInventoryRepository productInventoryRepository;


    public void addTransaction(TransactionDao transactionDao) {

        List<TransactionLineItemDao> transactionLineItemDaoList = new ArrayList<>();
        List<TransactionLineItemDao> transactionLineItemDaoListNew = new ArrayList<>();


        transactionLineItemDaoList = transactionDao.getTransactionLineItemDaoList();


        for(TransactionLineItemDao lineItemDao: transactionLineItemDaoList)
        {
            // I need to set this up to keep track of the inventory, so with this i will know, whether i need to call Product inventory table again or not.
            // So with first call if parchedQuantity == 0 that mean we can full fill this sale we do not need to check for other inventory for this product but if not
            // Then we need to keep doing this process until parched Quantity == 0.
           int purchasedQuantity = lineItemDao.getQuantity();


           do {
               // step 1 : get the product from line item and then get the quantity for that product from inventory table on behalf of created time stamps.
               ProductInventoryDao productInventoryDao = new ProductInventoryDao();

               // This call will give product inventory details on behalf of FIFO.
               productInventoryDao = getProductInventoryDao();


               if(null != productInventoryDao)
               {
                   // This is best case.
                   if(productInventoryDao.getQuantity() > purchasedQuantity) {

                       // This is Important because i need to set cost price separately that's why i need to do this.
                       lineItemDao.setCost(productInventoryDao.getCost());
                       transactionLineItemDaoListNew.add(lineItemDao);

                       reduceQuantityFromProductInventoryTable(productInventoryDao, purchasedQuantity);

                       purchasedQuantity = 0;
                   }
                   // This means we do not have enough inventory to sale, so we can sale wt we have and then call inventory table again until purchase item == 0.
                   else if(productInventoryDao.getQuantity() > 0)
                   {
                       lineItemDao.setCost(productInventoryDao.getCost());
                       lineItemDao.setQuantity(productInventoryDao.getQuantity());

                       transactionLineItemDaoListNew.add(lineItemDao);

                       purchasedQuantity = purchasedQuantity - productInventoryDao.getQuantity();

                       reduceQuantityFromProductInventoryTable(productInventoryDao, 0);


                       // Also this means in Product Inventory table, inventory of this product is 0
                       // So now we need to delete this row from the table
                       // Here is the interesting this, we can delete this row only, IF IT IS NOT LAST ROW.
                       // IF IT IS LAST ROW THEN WE JUST REDUCE THE QUANTITY AND LET ELSE CONDITION HANDLE IT
                       // THIS CASE HAPPENS WHEN USER HAS NOT UPDATED THE PRODUCT INVENTORY TABLE BUT STILL HE IS TRYING TO SALE THE PRODUCT.

                       deleteProductInventoryRow(productInventoryDao);

                   }

                   // This means we have last entry in product inventory table and user has not updated the quantity.
                   else
                   {
                       // This is Important because i need to set cost price separately that's why i need to do this.
                       lineItemDao.setCost(productInventoryDao.getCost());
                       transactionLineItemDaoListNew.add(lineItemDao);


                       reduceQuantityFromProductInventoryTable(productInventoryDao, productInventoryDao.getQuantity() - purchasedQuantity);

                       purchasedQuantity = 0;
                   }




               }
               else {
                   System.out.println("OPPS Some problem need to handle this.");
               }
           }

           while (purchasedQuantity != 0);

           }

        transactionDao.setTransactionLineItemDaoList(transactionLineItemDaoListNew);

        transactionRepository.save(transactionDao);
    }

    private void deleteProductInventoryRow(ProductInventoryDao productInventoryDao)
    {
        // First we need to get the count of the row, we can delete row only and only if it is not last row,
        // if it is not last row then we need to keep it.

        int count = productInventoryRepository.getCountOfRowByProductNo(productInventoryDao.getProductNo());

        if(count > 1)
        {
            productInventoryRepository.delete(productInventoryDao.getId());
        }

    }

    private ProductInventoryDao getProductInventoryDao()
    {
        return productInventoryRepository.test();
    }


    private void reduceQuantityFromProductInventoryTable(ProductInventoryDao productInventoryDao, int purchasedQuantity)
    {
        // Here i am just subtracting purchasedQuantity from current inventory and updating into table.
        productInventoryRepository.updateProductQuantity(purchasedQuantity, productInventoryDao.getProductNo(), productInventoryDao.getCreatedTimestamp());
    }




    public List<TransactionDao> getTransaction() {

        return transactionRepository.findAll();
    }

    public TransactionDao getTransactionById(int transactionCompId) {

        return transactionRepository.findOne(transactionCompId);
    }

    public List<TransactionDao> getTransactionByDate(String date) {

        TimeIntervalDto timeIntervalDto;

       timeIntervalDto = utility.getDateByInputString(date);

       if(null != timeIntervalDto)
       {
          return transactionRepository.getTransactionByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
       }
       else {
           return null;
       }

    }
}
