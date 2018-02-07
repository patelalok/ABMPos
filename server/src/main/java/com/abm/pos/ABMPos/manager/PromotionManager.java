package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CustomerDao;
import com.abm.pos.ABMPos.dao.ProductDao;
import com.abm.pos.ABMPos.dao.SmsTemplateDao;
import com.abm.pos.ABMPos.repository.SmsTemplateRepository;
import com.abm.pos.ABMPos.util.ManageSMS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PromotionManager {

    @Autowired
    private ManageSMS manageSMS;

    @Autowired
    private SmsTemplateRepository smsTemplateRepository;

    public void sendPromotionBySms(List<CustomerDao> customerDaoList, String messageBody) {

        if(null != customerDaoList)
        {
            for(CustomerDao customerDao: customerDaoList)
            {
                manageSMS.sendSMS(customerDao.getPhoneNo(), messageBody);
            }
        }
    }

    public SmsTemplateDao addSmsPromotionTemplate(SmsTemplateDao smsTemplateDao) {

        return smsTemplateRepository.save(smsTemplateDao);
    }

    public List<SmsTemplateDao> getAllSmsPromotionTemplate() {

        return smsTemplateRepository.findAll();
    }

    public void deleteSmsTemplate(int templateId) {

        smsTemplateRepository.delete(templateId);
    }
}
