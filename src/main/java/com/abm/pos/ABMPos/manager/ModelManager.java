package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.ModelDao;
import com.abm.pos.ABMPos.repository.ModelRepository;
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


    public void addModel(ModelDao modelDao) {

        modelRepository.save(modelDao);
    }

    public void deleteModel(int modelId) {

        modelRepository.delete(modelId);
    }


    public List<ModelDao> getModel() {

        return modelRepository.findAll();
    }
}
