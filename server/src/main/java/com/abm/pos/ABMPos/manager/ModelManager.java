package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ModelDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.repository.ModelRepository;
import com.abm.pos.ABMPos.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by apatel2 on 5/16/17.
 */

@Component
public class ModelManager {

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private ProductRepository productRepository;


    public void addModel(ModelDao modelDao) {

        modelRepository.save(modelDao);
    }

    public String deleteModel(int modelId) {

        boolean isDeletableModel = true;
        String response = "";
        try
        {
            List<ProductDao> productDaoList = productRepository.findAllByModelId(String.valueOf(modelId));
            if(null != productDaoList && productDaoList.size() > 0)
            {
                isDeletableModel = false;
                System.out.println("Can Not Delete Model!!!");
                response = "Can Not Delete Model, Please Delete All Products From This Model First";
            }

            if(isDeletableModel){
                modelRepository.delete(modelId);
                System.out.println("Model Deleted Successfully!!!");
                response = "Model Delete Successfully";
            }
        }
        catch (Exception e){
            System.out.println("Opps Some Exception is coming!!!");
        }

        return response;
    }


    public List<ModelDao> getModel() {

        return modelRepository.findAllByOrderByNameAsc();
    }
}
