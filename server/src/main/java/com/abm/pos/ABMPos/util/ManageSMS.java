package com.abm.pos.ABMPos.util;

//import com.twilio.Twilio;
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Component;

@Component
public class ManageSMS {

    public static final String ACCOUNT_SID = "AC31f279245cc849247cd68e356126a394";
    public static final String AUTH_TOKEN = "980d1522d85df9e1f7d5bf776a8d5237";
    public static final String PHONE_NO = "+17707030801";


    public void sendSMS(String customerPhoneNo, String messageBody){
        //Twilio.init(ACCOUNT_SID,AUTH_TOKEN);

       // Message message = Message.creator(new PhoneNumber("+1"+customerPhoneNo),new PhoneNumber(PHONE_NO),messageBody).create();
       // System.out.println("Send Message Successfully to"+ customerPhoneNo+ "Where Message Id = "+message.getSid());
        System.out.println("Send Message Successfully to"+ customerPhoneNo+ "Where Message Id = ");
    }
}
