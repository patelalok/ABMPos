package com.abm.pos.ABMPos.manager;

import com.abm.pos.ABMPos.dao.CloseRegisterDao;
import com.abm.pos.ABMPos.dao.PaymentDao;
import com.abm.pos.ABMPos.dao.StoreSetupDao;
import com.abm.pos.ABMPos.dao.TransactionDao;
import com.abm.pos.ABMPos.dto.PaymentSummaryDto;
import com.abm.pos.ABMPos.repository.*;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private TransactionLineItemRepository transactionLineItemRepository;

    @Autowired
    private Utility utility;

    @Autowired
    private StoreSetupRepository storeSetupRepository;

    @Autowired
    private ReportManager reportManager;

    public void addCloseRegisterDetails(CloseRegisterDao closeRegisterDao) {

        // Blindly deleting close register details for the current day then adding value by user,
        // So now i dont need to worried about adding values two time for close register.

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime now = LocalDateTime.now();
        System.out.println(dtf.format(now));

        String currentDate = dtf.format(now);

        String startDate = currentDate + " 00:00:00";
        String endDate = currentDate + " 23:59:59";

        closeRegisterRepository.deleteClosingDetailsForDate(startDate, endDate);

        this.closeRegisterRepository.save(closeRegisterDao);
    }

    public CloseRegisterDao getCloseRegisterDetailsByDate(String startDate, String endDate) throws NoSuchFieldException, IllegalAccessException {

        CloseRegisterDao closeRegisterDao = new CloseRegisterDao();

            // Getting the sum of all payment methods from payment table.
            PaymentSummaryDto paymentSummaryDto = getSumOfAllPayments(startDate, endDate);
            if(null != paymentSummaryDto)
            {
                closeRegisterDao.setReportCash(paymentSummaryDto.getCash());
                closeRegisterDao.setReportCredit(paymentSummaryDto.getCredit());
                closeRegisterDao.setReportCheck(paymentSummaryDto.getCheck());
                closeRegisterDao.setStoreCredit(paymentSummaryDto.getStoreCredit());
            }

            // Now need get transaction details from transaction table.
            TransactionDao transactionDao = getSumOfAllTransactionDetails(startDate, endDate);
            if(null != transactionDao)
            {
                closeRegisterDao.setReportTotalAmount(transactionDao.getTotalAmount());
                closeRegisterDao.setTax(transactionDao.getTax());
                closeRegisterDao.setTotalDiscount(transactionDao.getTotalDiscount());
                closeRegisterDao.setTotalReturn(transactionDao.getTotalReturn());
                closeRegisterDao.setShipping(transactionDao.getShipping());
            }



            // TODO : BIG ASSUMPTION Here that, i am assuming there will be only one row for one day, if not then this will break.
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
        // This is important to set here, so i can use it everywhere else.
        closeRegisterDao.setCloseTotalAmount(Double.parseDouble(new DecimalFormat("##.##").format(closeRegisterDao.getCloseCash() + closeRegisterDao.getCloseCredit() + closeRegisterDao.getCloseCheck())));

            // setting payment difference.
            closeRegisterDao.setDifferenceCash(Double.parseDouble(new DecimalFormat("##.##").format(closeRegisterDao.getReportCash() - closeRegisterDao.getCloseCash())));
            closeRegisterDao.setDifferenceCredit(Double.parseDouble(new DecimalFormat("##.##").format(closeRegisterDao.getReportCredit() - closeRegisterDao.getCloseCredit())));
            closeRegisterDao.setDifferenceCheck(Double.parseDouble(new DecimalFormat("##.##").format(closeRegisterDao.getReportCheck() - closeRegisterDao.getCloseCheck())));

            // setting final difference.
            closeRegisterDao.setDifferenceTotal(Double.parseDouble(new DecimalFormat("##.##").format(closeRegisterDao.getReportTotalAmount() - closeRegisterDao.getCloseTotalAmount())));


        // getting sum of payment made for previous invoice or pending invoice.
           getSumOfPendingTransaction(startDate, endDate, closeRegisterDao);

            // This logic will help to get only transaction balance for start and end date.
            List<Double> transactionDueAmount = transactionRepository.getTransactionDueAmount(startDate, endDate);
            if(null != transactionDueAmount && null != transactionDueAmount.get(0)){
                closeRegisterDao.setTotalDueBalance(transactionDueAmount.get(0));
            }

            // get Profit percentage:
        List<Object[]> costAndRetail = transactionLineItemRepository.getTotalRetailAndCostForProfitPercentage(startDate,endDate);
        if (null != costAndRetail) {
            for (Object[] j : costAndRetail) {

                double totalRetail = Double.parseDouble(j[0].toString());
                double totalCost = Double.parseDouble(j[1].toString());
                double profitPer = (totalRetail - totalCost)/totalRetail;

                closeRegisterDao.setProfitPercentage(Double.parseDouble(new DecimalFormat("##.##").format(profitPer)));
            }
        }

            return closeRegisterDao;
        }

    private void getSumOfPendingTransaction(String startDate, String endDate, CloseRegisterDao closeRegisterDao) {

        List<Object[]> result = paymentRepository.sumOfPendingPayments(startDate, endDate);
        List<PaymentSummaryDto> paymentSummaryDtoList = new ArrayList<>();

        double totalCash = 0;
        double totalCredit = 0;
        double totalCheck = 0;
        double totalStoreCredit = 0;


        // Here, I am getting all payment information by date, since its more then one row i have to add them together to show at one row.
        if (null != result) {
            for (Object[] j : result) {
                PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();

//              paymentSummaryDto.setName(j[0].toString());
                paymentSummaryDto.setCash(Double.parseDouble(j[1].toString()));
                paymentSummaryDto.setCredit(Double.parseDouble(j[2].toString()));
                paymentSummaryDto.setCheck(Double.parseDouble(j[3].toString()));
                paymentSummaryDto.setStoreCredit(Double.parseDouble(j[4].toString()));

                paymentSummaryDtoList.add(paymentSummaryDto);

            }
        }

        // After this i will get final sum of the payment amount which i am gonna show as close register pending amounts
            for (PaymentSummaryDto payment : paymentSummaryDtoList) {

                totalCash = +totalCash + payment.getCash();
                totalCredit = +totalCredit + payment.getCredit();
                totalCheck = +totalCheck + payment.getCheck();
                totalStoreCredit = +totalStoreCredit + payment.getStoreCredit();
            }

            // This is final amount where i am setting in main close register response.
            closeRegisterDao.setCashFromPendingInvoice((Double.parseDouble(new DecimalFormat("##.##").format(totalCash))));
            closeRegisterDao.setCreditFromPendingInvoice((Double.parseDouble(new DecimalFormat("##.##").format(totalCredit))));
            closeRegisterDao.setCheckFromPendingInvoice((Double.parseDouble(new DecimalFormat("##.##").format(totalCheck))));
            closeRegisterDao.setStoreCreditFromPendingInvoice((Double.parseDouble(new DecimalFormat("##.##").format(totalStoreCredit))));
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
                    transactionDao.setShipping((Double.parseDouble(j[3].toString())));

                    if(null != j[4]){
                        transactionDao.setTotalReturn(Double.parseDouble(j[4].toString()));
                    }
                }
            }
        }
        return transactionDao;
    }

    private PaymentSummaryDto getSumOfAllPayments(String startDate, String endDate) {

        PaymentSummaryDto paymentSummaryDto = new PaymentSummaryDto();

        paymentSummaryDto = reportManager.getDashboardReportByPaymentSummary("Sales By Year", startDate,endDate);

        return paymentSummaryDto;
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
            createHeadings(cb,140,635,"From User");
            createHeadings(cb,250,635,"From System");
            createHeadings(cb,370,635,"Difference");
            createHeadings(cb,490,635,"From Pending");


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
            if(null !=closeRegisterDao) {
                createHeadings(cb, 470, 685, "Profit Per:" + new DecimalFormat("##.##").format(closeRegisterDao.getProfitPercentage()) + "%");
            }
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
                createContent(cb, 30, 600, "Cash", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 570, "Credit", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 540, "Check", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 510, "Store Credit", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 30, 480, "TOTAL", PdfContentByte.ALIGN_LEFT);

                //For Cash
                createContent(cb, 140, 600, "$" + Double.toString(closeRegisterDao.getCloseCash()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 250, 600, "$" + Double.toString(closeRegisterDao.getReportCash()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 370, 600, "$" + Double.toString(closeRegisterDao.getDifferenceCash()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 490, 600, "$" + Double.toString(closeRegisterDao.getCashFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);


//            //For Credit
                createContent(cb, 140, 570, "$" + Double.toString(closeRegisterDao.getCloseCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 250, 570, "$" + Double.toString(closeRegisterDao.getReportCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 370, 570, "$" + Double.toString(closeRegisterDao.getDifferenceCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 490, 570, "$" + Double.toString(closeRegisterDao.getCreditFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);

//           // For Debit
//                createContent(cb, 140, 540, "$" + Double.toString(closeRegisterDao.getCloseDebit()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 250, 540, "$" + Double.toString(closeRegisterDao.getReportDebit()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 370, 540, "$" + Double.toString(closeRegisterDao.getDifferenceDebit()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 490, 540, "$" + Double.toString(closeRegisterDao.getDebitFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);


//            //For Check
                createContent(cb, 140, 540, "$" + Double.toString(closeRegisterDao.getCloseCheck()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 250, 540, "$" + Double.toString(closeRegisterDao.getReportCheck()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 370, 540, "$" + Double.toString(closeRegisterDao.getDifferenceCheck()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 490, 540, "$" + Double.toString(closeRegisterDao.getCheckFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);

                //For Store credit
                createContent(cb, 140, 510, "$ 0.0", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 250, 510, "$" + Double.toString(closeRegisterDao.getStoreCredit()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 370, 510, "$ 0.0", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 490, 510, "$" + Double.toString(closeRegisterDao.getStoreCreditFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);

                  // TOTAL
                createContent(cb, 140, 480, "$" + Double.toString(closeRegisterDao.getCloseTotalAmount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 250, 480, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 370, 480, "$" + Double.toString(closeRegisterDao.getDifferenceTotal()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 490, 480, "$" + Double.toString(closeRegisterDao.getCashFromPendingInvoice()
                        + closeRegisterDao.getCreditFromPendingInvoice()
                        + closeRegisterDao.getCheckFromPendingInvoice()
                        + closeRegisterDao.getStoreCreditFromPendingInvoice()), PdfContentByte.ALIGN_LEFT);



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


//                createHeadings(cb, 30, 400, "Total From User");
//                createHeadings(cb, 200, 400, "Total From System");
//                createHeadings(cb, 340, 400, "Total Difference");
//                createHeadings(cb, 480, 400, "Actual Daily Total");
//
////            //This just for now need to replace with the real values from service call.
//                createContent(cb, 30, 370, "$" + Double.toString(closeRegisterDao.getCloseTotalAmount()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 200, 370, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 340, 370, "$" + Double.toString(closeRegisterDao.getCloseTotalAmount()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 480, 370, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);

                createContent(cb, 30, 440, "Net Sales", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 440, "Tax", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 440, "Discount", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 440, "Gross Sales", PdfContentByte.ALIGN_LEFT);
//
                // Gross Sale = totalAmount - Tax
//            //Net Sales = gross sale - discount


                // - closeRegisterDao.getTotalTax() + paidOutDtos.get(0).getPaidOutAmount1() + paidOutDtos.get(0).getPaidOutAmount2() + paidOutDtos.get(0).getPaidOutAmount3())
//
                // This wil help to show only 2 digits after decimal
                DecimalFormat df2 = new DecimalFormat(".##");

                createContent(cb, 30, 405, "$" + Double.toString(Double.parseDouble(df2.format(closeRegisterDao.getReportTotalAmount() - closeRegisterDao.getTax()))), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 405, "$" + Double.toString(closeRegisterDao.getTax()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 405, "$" + Double.toString(closeRegisterDao.getTotalDiscount()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 480, 405, "$" + Double.toString(closeRegisterDao.getReportTotalAmount()), PdfContentByte.ALIGN_LEFT);

                createContent(cb, 30, 370, "Account Receivable", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 370, "Shipping", PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 370, "Return", PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 480, 260, "Cash In Hand", PdfContentByte.ALIGN_LEFT);

//            //This just for now need to replace with the real values from service call.
                createContent(cb, 30, 335, "$" + Double.toString(closeRegisterDao.getTotalDueBalance()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 200, 335, "$" + Double.toString(closeRegisterDao.getShipping()), PdfContentByte.ALIGN_LEFT);
                createContent(cb, 340, 335, "$" + Double.toString(closeRegisterDao.getTotalReturn()), PdfContentByte.ALIGN_LEFT);
//                createContent(cb, 480, 230, "$" + Double.toString(0.00), PdfContentByte.ALIGN_LEFT);
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
