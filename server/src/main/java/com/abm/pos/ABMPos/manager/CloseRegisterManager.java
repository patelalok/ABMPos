package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.repository.CloseRegisterRepository;
import com.abm.pos.ABMPos.repository.PaymentRepository;
import com.abm.pos.ABMPos.repository.StoreSetupRepository;
import com.abm.pos.ABMPos.repository.TransactionRepository;
import com.abm.pos.ABMPos.util.TimeIntervalDto;
import com.abm.pos.ABMPos.util.Utility;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class CloseRegisterManager {

    private BaseFont bfBold;
    private BaseFont bf;
    private int pageNumber = 0;

    @Autowired
    private CloseRegisterRepository closeRegisterRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private Utility utility;

    @Autowired
    private StoreSetupRepository storeSetupRepository;

    public void addCloseRegisterDetails(CloseRegisterDao closeRegisterDao) {

        this.closeRegisterRepository.save(closeRegisterDao);
    }

    public CloseRegisterDao getCloseRegisterDetailsByDate(String startDate, String endDate) throws NoSuchFieldException, IllegalAccessException {

        CloseRegisterDao closeRegisterDao = new CloseRegisterDao();

            // Getting the sum of all payment methods from payment table.
            PaymentDao paymentDao = getSumOfAllPayments(startDate, endDate);

            if(null != paymentDao)
            {
                closeRegisterDao.setReportCash(paymentDao.getCash());
                closeRegisterDao.setReportCredit(paymentDao.getCredit());
                closeRegisterDao.setReportDebit(paymentDao.getDebit());
                closeRegisterDao.setReportCheck(paymentDao.getCheckAmount());
                closeRegisterDao.setOnAccount(paymentDao.getOnAccount());
                closeRegisterDao.setStoreCredit(paymentDao.getStoreCredit());
                closeRegisterDao.setLoyalty(paymentDao.getLoyalty());
            }

            // Now need get transaction details from transaction table.
            TransactionDao transactionDao = getSumOfAllTransactionDetails(startDate, endDate);

            if(null != transactionDao)
            {
                closeRegisterDao.setReportTotalAmount(transactionDao.getTotalAmount());
                closeRegisterDao.setTax(transactionDao.getTax());
                closeRegisterDao.setTotalDiscount(transactionDao.getTotalDiscount());
                closeRegisterDao.setTotalReturn(transactionDao.getTotalReturn());
            }

            // Here i need to check if there is any data from user, this happens when user close the register more then 2 times or
            // User is trying to get details for previous days.

            List<Object[]> result = closeRegisterRepository.getCloseRegisterDetailsByDate(startDate,endDate);

            for(Object [] j : result)
            {
                if(j[0] != null) {
                    for (int i = 0; i <= result.size(); i++) {
                    closeRegisterDao.setCloseCash((Double.parseDouble(j[0].toString())));
                    closeRegisterDao.setCloseCredit((Double.parseDouble(j[1].toString())));
                    closeRegisterDao.setCloseDebit((Double.parseDouble(j[2].toString())));
                    closeRegisterDao.setCloseCheck(Double.parseDouble(j[3].toString()));
                }
            }
        }

//            if(null != closeRegisterDao1)
//            {
//                closeRegisterDao.setCloseCash(closeRegisterDao1.getCloseCash());
//                closeRegisterDao.setCloseCredit(closeRegisterDao1.getCloseCredit());
//                closeRegisterDao.setCloseDebit(closeRegisterDao1.getCloseDebit());
//                closeRegisterDao.setCloseCheck(closeRegisterDao1.getCloseCheck());
//                closeRegisterDao.setId(closeRegisterDao1.getId());
//
//            }

            return closeRegisterDao;
                    //closeRegisterRepository.getCloseRegisterDetailsByDate(timeIntervalDto.getStartDate(), timeIntervalDto.getEndDate());
        }

    private TransactionDao getSumOfAllTransactionDetails(String startDate, String endDate) {
        TransactionDao transactionDao = new TransactionDao();

        List<Object[]> result = transactionRepository.getSumOfTransactionDetailsForCloseRegister(startDate, endDate);

        for(Object [] j : result)
        {
            if(j[0] != null) {
                for (int i = 0; i <= result.size(); i++) {
                    transactionDao.setTotalAmount((Double.parseDouble(j[0].toString())));
                    transactionDao.setTax((Double.parseDouble(j[1].toString())));
                    transactionDao.setTotalDiscount((Double.parseDouble(j[2].toString())));

                    if(null != j[3]){
                        transactionDao.setTotalReturn(Double.parseDouble(j[3].toString()));
                    }

                }
            }
        }
        return transactionDao;
    }

    private PaymentDao getSumOfAllPayments(String startDate, String endDate) {

        PaymentDao paymentDao = new PaymentDao();
        List<Object[]> result =  paymentRepository.sumOfAllPayments(startDate, endDate);

        if(result != null) {

            for (Object [] j : result) {

                if(j[0] != null) {

                    for (int i = 0; i <= result.size(); i++) {

                        paymentDao.setCash(Double.parseDouble(j[0].toString()));
                        paymentDao.setCredit(Double.parseDouble(j[1].toString()));
                        paymentDao.setDebit(Double.parseDouble(j[2].toString()));
                        paymentDao.setCheckAmount(Double.parseDouble(j[3].toString()));
                        paymentDao.setStoreCredit(Double.parseDouble(j[4].toString()));
                        paymentDao.setOnAccount(Double.parseDouble(j[5].toString()));
                        paymentDao.setLoyalty(Double.parseDouble(j[6].toString()));

                    }
                }
            }
        }

        return paymentDao;
    }


    public byte[] printClosingDetails(String startDate, String endDate) throws DocumentException, NoSuchFieldException, IllegalAccessException {

        Document doc = new Document(PageSize.A4);
        initializeFonts();


        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(doc, byteArrayOutputStream);


        CloseRegisterDao closeRegisterDao = getCloseRegisterDetailsByDate(startDate,endDate);

        doc.open();

        PdfContentByte cb = writer.getDirectContent();
        boolean beginPage = true;
        int y = 0;
        for(int i=0; i < 100; i++ ){
            if(beginPage){
                beginPage = false;
                generateLayout(doc, cb);
                generateHeader(doc, cb,closeRegisterDao, startDate,endDate);
                y = 615;
            }
            generateClosingDetails(doc, cb, i, y,closeRegisterDao);
        }

        doc.close();

        byte[] pdfDataBytes = byteArrayOutputStream.toByteArray();


        return pdfDataBytes;

    }

    private void generateLayout(Document doc, PdfContentByte cb)  {
        try {
            cb.setLineWidth(1f);
            // cb.rectangle(20,60,560,660);
            cb.rectangle(20,60,560,600);

            cb.moveTo(20,620);
            cb.lineTo(580,620);

            //Credit
            cb.moveTo(20,590);
            cb.lineTo(580,590);

            //Debit
            cb.moveTo(20,560);
            cb.lineTo(580,560);

            //Cash
            cb.moveTo(20,530);
            cb.lineTo(580,530);

            //Check
            cb.moveTo(20,500);
            cb.lineTo(580,500);

            //Paid out
            cb.moveTo(20,460);
            cb.lineTo(580,460);

            cb.moveTo(20,430);
            cb.lineTo(580,430);

            //Actual total
            cb.moveTo(20,390);
            cb.lineTo(580,390);

            cb.moveTo(20,360);
            cb.lineTo(580,360);

            //Net Sales
            cb.moveTo(20,320);
            cb.lineTo(580,320);

            cb.moveTo(20,290);
            cb.lineTo(580,290);

            //Customer Balance
            cb.moveTo(20,250);
            cb.lineTo(580,250);

            cb.moveTo(20,220);
            cb.lineTo(580,220);

            cb.stroke();

            // Invoice Detail box Text Headings
            createHeadings(cb,30,635,"Payment Types");
            createHeadings(cb,200,635,"From User");
            createHeadings(cb,340,635,"From System");
            createHeadings(cb,480,635,"Difference");

            cb.stroke();
        }
        catch (Exception ex){
            ex.printStackTrace();
        }
    }
    private void generateHeader(Document doc, PdfContentByte cb, CloseRegisterDao closeRegisterDao, String startDate, String endDate)  {
        try {


            StoreSetupDao storeSetupDao = storeSetupRepository.findOne(1);

            if(null != storeSetupDao)
            {
                createHeadingsAlokTest(cb,205,780,storeSetupDao.getName());
            }

            createHeadingsAlokTest(cb,205,730,"Close Register Report");
            createHeadings(cb,20,685,"Date:");
            createHeadings(cb,470,685,"GP:");
            DateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date sd = null;
            Date ed = null;
            try {
                sd = f.parse(startDate);
                ed = f.parse(endDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            DateFormat date = new SimpleDateFormat("MM/dd/yyyy");

            String a = date.format(sd);
            String b = date.format(ed);

            if (a.equals(b)) {
                createHeadings(cb, 60, 685, date.format(sd));
            }
            else {
                createHeadings(cb, 60, 685,a + " " + "To" + " " + b);
            }


            // TODO NEED TO SHOW PROFIT
//            if((null != closeRegisterDao && null != Double.toString(closeRegisterDao.getTotalProfit()))) {
//                createHeadings(cb, 518, 685, "$" + Double.toString(closeRegisterDao.getTotalProfit()));
//            }

//            Image companyLogo = Image.getInstance("Excel.png");
//            companyLogo.setAbsolutePosition(235,760);
//            companyLogo.scalePercent(15);
//            doc.add(companyLogo);

        }
        catch (Exception ex){
            ex.printStackTrace();
        }
    }
    private void generateClosingDetails(Document doc, PdfContentByte cb, int index, int y, CloseRegisterDao closeRegisterDao)  {


        if(null != closeRegisterDao) {
            DecimalFormat df = new DecimalFormat("0.00");
            try {
                createContent(cb, 30, 600, "Credit", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 570, "Debit", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 540, "Cash", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 510, "Check", PdfContentByte.ALIGN_LEFT);
//            //For Credit
                createContent(cb, 200, 600, "$" + Double.toString(closeRegisterDao.getCloseCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 600, "$" + Double.toString(closeRegisterDao.getReportCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 600, "$" + Double.toString(closeRegisterDao.getDifferenceCredit()), PdfContentByte.ALIGN_LEFT);
//           // For Debit
                createContent(cb, 200, 570, "$" + Double.toString(closeRegisterDao.getCloseDebit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 570, "$" + Double.toString(closeRegisterDao.getReportDebit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 570, "$" + Double.toString(closeRegisterDao.getDifferenceDebit()), PdfContentByte.ALIGN_LEFT);
//            //For Cash
                createContent(cb, 200, 540, "$" + Double.toString(closeRegisterDao.getCloseCash()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 540, "$" + Double.toString(closeRegisterDao.getReportCash()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 540, "$" + Double.toString(closeRegisterDao.getDifferenceCash()), PdfContentByte.ALIGN_LEFT);
//            //For Check
                createContent(cb, 200, 510, "$" + Double.toString(closeRegisterDao.getCloseCheck()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 510, "$" + Double.toString(closeRegisterDao.getReportCheck()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 510, "$" + Double.toString(closeRegisterDao.getDifferenceCheck()), PdfContentByte.ALIGN_LEFT);


//            createContent(cb,30,470,"Paid Out (Sum)",PdfContentByte.ALIGN_LEFT);
//            createContent(cb,200,470,"Paid Out-1",PdfContentByte.ALIGN_LEFT);
//            createContent(cb,340,470,"Paid Out-2",PdfContentByte.ALIGN_LEFT);
//            createContent(cb,480,470,"Paid Out-3",PdfContentByte.ALIGN_LEFT);


//            //Adding paid out details from get paid out end point
                // TODO NEED TO MANAGE WITH EXPENSE
//            if(null != paidOutDtos && !paidOutDtos.isEmpty()) {
//                createContent(cb, 30, 440, "$" + Double.toString(paidOutDtos.get(0).getPaidOutAmount1() + paidOutDtos.get(0).getPaidOutAmount2() + paidOutDtos.get(0).getPaidOutAmount3()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 200, 440, "$" + Double.toString(paidOutDtos.get(0).getPaidOutAmount1()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 340, 440, "$" + Double.toString(paidOutDtos.get(0).getPaidOutAmount2()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 480, 440, "$" + Double.toString(paidOutDtos.get(0).getPaidOutAmount3()), PdfContentByte.ALIGN_LEFT);
//            }


                createHeadings(cb, 30, 400, "Actual Daily Total");
                createHeadings(cb, 200, 400, "Total From User");
                createHeadings(cb, 340, 400, "Total From System");
                createHeadings(cb, 480, 400, "Total Difference");

//            //This just for now need to replace with the real values from service call.
                createContent(cb, 30, 370, "$" + Double.toString(closeRegisterDao.getCloseTotalAmount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 370, "$" + Double.toString(closeRegisterDao.getCloseTotalAmount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 370, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 370, "$" + Double.toString(closeRegisterDao.getDifferenceTotal()), PdfContentByte.ALIGN_LEFT);

                createHeadings(cb, 30, 330, "Net Sales");
                createHeadings(cb, 200, 330, "Tax");
                createHeadings(cb, 340, 330, "Discount");
                createHeadings(cb, 480, 330, "Gross Sales");
//
//            //Net Sales = Total From System - Tax + Sum of all Paid outs because that is part of the sale

                // - closeRegisterDao.getTotalTax() + paidOutDtos.get(0).getPaidOutAmount1() + paidOutDtos.get(0).getPaidOutAmount2() + paidOutDtos.get(0).getPaidOutAmount3())
//
                // This wil help to show only 2 digits after decimal
                DecimalFormat df2 = new DecimalFormat(".##");

                createContent(cb, 30, 300, "$" + Double.toString(Double.parseDouble(df2.format(closeRegisterDao.getReportTotalAmount() - closeRegisterDao.getTax()))), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 300, "$" + Double.toString(closeRegisterDao.getTax()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 300, "$" + Double.toString(closeRegisterDao.getTotalDiscount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 300, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);

                createContent(cb, 30, 260, "Customer Balance", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 260, "Commission", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 260, "Bank Deposit", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 260, "Cash In Hand", PdfContentByte.ALIGN_LEFT);

//            //This just for now need to replace with the real values from service call.
                createContent(cb, 30, 230, "$" + Double.toString(closeRegisterDao.getOnAccount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 230, "$" + Double.toString(0.00), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 230, "$" + Double.toString(closeRegisterDao.getBankDeposit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 230, "$" + Double.toString(0.00), PdfContentByte.ALIGN_LEFT);
            }
            catch (Exception ex){
                ex.printStackTrace();
            }
        }

    }
    private void createHeadings(PdfContentByte cb, float x, float y, String text){
        cb.beginText();
        cb.setFontAndSize(bfBold, 14);
        cb.setTextMatrix(x,y);
        cb.showText(text.trim());
        cb.endText();
    }
    private void createHeadingsAlokTest(PdfContentByte cb, float x, float y, String text){
        cb.beginText();
        cb.setFontAndSize(bfBold, 20);
        cb.setTextMatrix(x,y);
        cb.showText(text.trim());
        cb.endText();
    }
    private void createContent(PdfContentByte cb, float x, float y, String text, int align){
        cb.beginText();
        cb.setFontAndSize(bf, 15);
        cb.showTextAligned(align, text.trim(), x , y, 0);
        cb.endText();
    }
    private void initializeFonts() {
        try {
            bfBold = BaseFont.createFont(BaseFont.TIMES_BOLD, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            bf = BaseFont.createFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
        } catch (DocumentException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
