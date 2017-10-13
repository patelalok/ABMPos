package com.abm.pos.ABMPos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.print.*;
import javax.print.attribute.HashPrintRequestAttributeSet;
import javax.print.attribute.HashPrintServiceAttributeSet;
import javax.print.attribute.PrintRequestAttributeSet;
import javax.print.attribute.PrintServiceAttributeSet;


@SpringBootApplication
public class AbmPosApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(AbmPosApplication.class, args);
	}


}
//
//		final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//		Date currentDate = new Date();
//
//		Calendar c = Calendar.getInstance();
//		c.setTime(currentDate);
//
//		c.add(Calendar.DATE, -1);
//		Date currentDateMinusOne = c.getTime();
//
//		String yesterday = dateFormat.format(c.getTime());
//
//		System.out.println(dateFormat.format(currentDateMinusOne));
//
//		String startDate = yesterday + " 00:00:00";
//		String endDate = yesterday + " 23:59:59";
//
//		c.set(Calendar.DAY_OF_MONTH, 1);
//		System.out.println("test"+ dateFormat.format(c.getTime()));
//
//		System.out.println(startDate +"  "+  endDate);
//
//		YearMonth thisMonth    = YearMonth.now();
//
//		YearMonth lastThreeMonth = thisMonth.minusMonths(3);
//		DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
//		System.out.println(lastThreeMonth.format(monthYearFormatter));
