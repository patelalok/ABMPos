package com.abm.pos.ABMPos.controller;


import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.SmsTemplateDao;
import com.abm.pos.ABMPos.manager.PromotionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("*")
@CrossOrigin(origins = {"*"})
public class PromotionController {

    @Autowired
    private PromotionManager promotionManager;

    @RequestMapping(value = "/addSmsPromotionTemplate", method = RequestMethod.POST, consumes = "application/json")
    public SmsTemplateDao addSmsPromotionTemplate(@RequestBody SmsTemplateDao smsTemplateDao)
    {
        return promotionManager.addSmsPromotionTemplate(smsTemplateDao);
    }
    @RequestMapping(value = "/getAllSmsPromotionTemplate", method = RequestMethod.GET, produces = "application/json")
    public List<SmsTemplateDao> getAllSmsPromotionTemplate()
    {
        return promotionManager.getAllSmsPromotionTemplate();
    }
    @RequestMapping(value = "/deleteSmsTemplate", method = RequestMethod.DELETE, produces = "application/json")
    public void deleteSmsTemplate(@RequestParam int templateId)
    {
        promotionManager.deleteSmsTemplate(templateId);
    }


    @RequestMapping(value = "/sendPromotionBySms", method = RequestMethod.POST, consumes = "application/json")
    public void sendPromotionBySms(@RequestBody List<CustomerDao> customerDaoList, @RequestParam String messageBody)
    {
        promotionManager.sendPromotionBySms(customerDaoList,messageBody);
    }
}
