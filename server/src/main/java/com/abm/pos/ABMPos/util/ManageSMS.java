package com.abm.pos.ABMPos.util;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class ManageSMS {

    public static final String ACCOUNT_SID = "AC31f279245cc849247cd68e356126a394";
    public static final String AUTH_TOKEN = "980d1522d85df9e1f7d5bf776a8d5237";


    public void sendSMS(){
        Twilio.init(ACCOUNT_SID,AUTH_TOKEN);

        Message message = Message.creator(new PhoneNumber("+17707030801"),new PhoneNumber("+14044918145"),"fromCode Alok").create();
        System.out.println(message.getSid());
    }
}
