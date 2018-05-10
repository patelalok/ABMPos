package com.abm.pos.ABMPos.util;

public class SQLQuery {

    private static final String GET_PAYMENT_DETAILS_REPORT = "select temp.NameOfMonth, max(cash) cash, max(credit) credit, max(check_amount) check_amount, max(store_credit) store_credit from \n" +
            "(select monthname(date) AS NameOfMonth,  \n" +
            "if(type = 'CASH', sum(amount),0) as cash, \n" +
            "if(type = 'CREDIT', sum(amount),0) as credit,\n" +
            "if(type = 'CHECK', sum(amount),0) as check_amount,\n" +
            "if(type = 'STORE CREDIT', sum(amount),0) as store_credit \n" +
            "from transaction_payment \n" +
            "where date between '2018-01-04 22:41:59' and '2018-12-04 22:41:59'\n" +
            "group by NameOfMonth,type) temp \n" +
            "group by temp.NameOfMonth\n" +
            "ORDER BY field(NameOfMonth,'January','February','March','April','May','June','July','August','September','October','November','December');\n";
}
