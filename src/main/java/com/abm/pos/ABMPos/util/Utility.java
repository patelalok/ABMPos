package com.abm.pos.ABMPos.util;

import com.abm.pos.ABMPos.AbmPosApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by apatel2 on 10/2/17.
 */

@Component
public class Utility {

    private static final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");



// DO NOT DELETE ::: Not using this but can keep it for future if i need to do anything like this

    public TimeIntervalDto getDateByInputString(String inputString)
    {
        Date currentDate = new Date();

        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);

        if(inputString.equalsIgnoreCase("Today"))
        {
            String today = dateFormat.format(c.getTime());
            return setStartAndEndDate(today, today);
        }
        else if(inputString.equalsIgnoreCase("Yesterday"))
        {
            c.add(Calendar.DATE, -1);
            Date currentDateMinusOne = c.getTime();
            String yesterday = dateFormat.format(currentDateMinusOne);

            return setStartAndEndDate(yesterday,yesterday);
        }

        else if(inputString.equalsIgnoreCase("This Week"))
        {
            // Here i must set end date first cause i want it as current date other wise it wil messed up
            String endDate =  dateFormat.format(c.getTime());

            int i = c.get(Calendar.DAY_OF_WEEK) - c.getFirstDayOfWeek();
            c.add(Calendar.DATE, -i);
            String startDate =  dateFormat.format(c.getTime());


            return setStartAndEndDate(startDate, endDate);
        }
        else if(inputString.equalsIgnoreCase("Last Week"))
        {
            int i = c.get(Calendar.DAY_OF_WEEK) - c.getFirstDayOfWeek();
            c.add(Calendar.DATE, -i - 7);
            String startDate =  dateFormat.format(c.getTime());

            c.add(Calendar.DATE, 6);
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }
        else if(inputString.equalsIgnoreCase("This Month"))
        {
            c.set(Calendar.DAY_OF_MONTH, 1);
            String startDate  = dateFormat.format(c.getTime());

            c.set(Calendar.DAY_OF_MONTH, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }



        else if(inputString.equalsIgnoreCase("Last Month"))
        {
            // add -1 month to current month
            c.add(Calendar.MONTH, -1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate  = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }
        else if(inputString.equalsIgnoreCase("Last 3 Months"))
        {
            c.add(Calendar.MONTH, -3);
            c.set(Calendar.DATE, 1);
            String startDate  = dateFormat.format(c.getTime());



            // Please always use 2 here cause you want to show only 3 month before current month,
            // Trust me i know 2 is valid here.
            c.add(Calendar.MONTH, 2);
            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);

        }
        else if(inputString.equalsIgnoreCase("Last 6 Months"))
        {
            c.add(Calendar.MONTH, -6);
            c.set(Calendar.DATE, 1);
            String startDate  = dateFormat.format(c.getTime());



            // Please always use 5 here cause you want to show only 3 month before current month,
            // Trust me i know 5 is valid here.
            c.add(Calendar.MONTH, 5);
            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }
        else if(inputString.equalsIgnoreCase("This Year"))
        {
            c.set(Calendar.DAY_OF_YEAR,1);
            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.MONTH, 11); // 11 = december
            c.set(Calendar.DAY_OF_MONTH, 31);
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);

        }
        else if(inputString.equalsIgnoreCase("Last Year"))
        {
            c.add(Calendar.YEAR, -1);
            c.set(Calendar.DAY_OF_YEAR,1);
            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.MONTH, 11); // 11 = december
            c.set(Calendar.DAY_OF_MONTH, 31);
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        return null;



    }

    public TimeIntervalDto getDateByMonthName(String monthName)
    {
        Date currentDate = new Date();

        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);

        if(monthName.equalsIgnoreCase("January")) {
            // add -1 month to current month
            c.add(Calendar.JANUARY, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.add(Calendar.JANUARY, 1);
            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }
        else if(monthName.equalsIgnoreCase("February"))
        {
            c.add(Calendar.FEBRUARY, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("March"))
        {
            c.add(Calendar.MARCH, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("April"))
        {
            c.add(Calendar.APRIL, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("May"))
        {
            c.add(Calendar.MAY, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("June"))
        {
            c.add(Calendar.JUNE, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("July"))
        {
            c.add(Calendar.JULY, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("August"))
        {
            c.add(Calendar.AUGUST, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("September"))
        {
            c.add(Calendar.SEPTEMBER, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("October"))
        {
            c.add(Calendar.OCTOBER, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("November"))
        {
            c.add(Calendar.NOVEMBER, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        else if(monthName.equalsIgnoreCase("December"))
        {
            c.add(Calendar.DECEMBER, 1);
            // set DATE to 1, so first date of previous month
            c.set(Calendar.DATE, 1);


            String startDate = dateFormat.format(c.getTime());

            c.set(Calendar.DATE, c.getActualMaximum(Calendar.DAY_OF_MONTH));
            String endDate = dateFormat.format(c.getTime());

            return setStartAndEndDate(startDate, endDate);
        }

        return null;

    }
    // This method add the constant after calculating current date and time.
    private TimeIntervalDto setStartAndEndDate(String startDate, String endDate)
    {
        TimeIntervalDto timeIntervalDto = new TimeIntervalDto();

        timeIntervalDto.setStartDate(startDate + " 00:00:00");
        timeIntervalDto.setEndDate(endDate + " 23:59:59");

        return timeIntervalDto;

    }
}
