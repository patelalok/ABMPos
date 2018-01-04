import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()
export class DateService {

    dateDto = new DateDto();
    constructor() { }

    getDateByInput(inputName: string): DateDto {

        if(inputName === 'Today') {
           return this.getCurrentDay();
        }
        else if(inputName === 'Yesterday') {
            return this.getPreviousDay();
        }
        else if(inputName === 'This Week') {
            return  this.getLast7Day();
        }
        else if(inputName === 'Last Week') {
            return this.getLast7Day();
        }
        else if(inputName === 'This Month') {
            return this.getCurrentMonth();
        }
        else if(inputName === 'Last Month') {
            return  this.getLastMonth();
        }
        else if(inputName === 'Last 3 Months') {
            return this.getLast3Months();
        }
        else if(inputName === 'Last 6 Months') {
            return this.getLast6Months();
        }
        else if(inputName === 'This Year') {
            return  this.getCurrentYear();
        }
        else if(inputName === 'Last Year') {
            return this.getLastYear();
        }

    }

    getCurrentDay(): DateDto {

        let now = new Date();
        let year = "" + now.getFullYear();
        let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

        this.dateDto.startDate = year + '-' + month + '-' + day + ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + day + ' 23:59:59';

        return this.dateDto;
    }
    getPreviousDay() {

        var now = new Date();
        now.setDate(now.getDate() - 1);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

        this.dateDto.startDate = year + '-' + month + '-' + day+ ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + day + ' 23:59:59';

        return this.dateDto;
    }

    getLast7Day() {
        var now = new Date();
        now.setDate(now.getDate() - 7);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

        this.dateDto.startDate = year + '-' + month + '-' + day+ ' 00:00:000';
        this.dateDto.endDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        return this.dateDto;

    }
    getCurrentMonth() {

        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

        this.dateDto.startDate = year + '-' + month + '-' + '01'+ ' 00:00:000';
        this.dateDto.endDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        return this.dateDto;
    }

    getLastMonth() {
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }

        this.dateDto.startDate = year + '-' + month + '-' + '01'+ ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    }

    getLast3Months() {
        var now = new Date();
        now.setMonth(now.getMonth() - 3);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
        // var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }

        this.dateDto.startDate = year + '-' + month + '-' + '01'+ ' 00:00:000';;

        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var currentMonth = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }

        this.dateDto.endDate = year + '-' + currentMonth + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    }

    getLast6Months() {
        var now = new Date();
        now.setMonth(now.getMonth() - 6);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }

        this.dateDto.startDate = year + '-' + month + '-' + '01'+ ' 00:00:000';

        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var currentMonth = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }

        this.dateDto.endDate = year + '-' + currentMonth + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    }

    getCurrentYear() {
        var now = new Date();
        var year = "" + now.getFullYear();

        this.dateDto.startDate = year + '-' + '01' + '-' + '01'+ ' 00:00:000';
        this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';

        return this.dateDto;
    }

    getLastYear() {
        var now = new Date();
        var year = now.getFullYear() - 1;

        this.dateDto.startDate = year + '-' + '01' + '-' + '01'+ ' 00:00:000';
        this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    }

    getMonthDate(monthName: string) {
        var now = new Date();
        var year = now.getFullYear();


        if (monthName === 'January') {
            this.dateDto.startDate = year + '-' + '01' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '01' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'February') {
            this.dateDto.startDate = year + '-' + '02' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '02' + '-' + '31'+ ' 23:59:59';
        }
        else if (monthName === 'March') {
            this.dateDto.startDate = year + '-' + '03' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '03' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'April') {
            this.dateDto.startDate = year + '-' + '04' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '04' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'May') {
            this.dateDto.startDate = year + '-' + '05' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '05' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'June') {
            this.dateDto.startDate = year + '-' + '06' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '06' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'August') {
            this.dateDto.startDate = year + '-' + '08' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '08' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'September') {
            this.dateDto.startDate = year + '-' + '09' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '09' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'October') {
            this.dateDto.startDate = year + '-' + '10' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '10' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'November') {
            this.dateDto.startDate = year + '-' + '11' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '11' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'December') {
            this.dateDto.startDate = year + '-' + '12' + '-' + '01'+ ' 00:00:000';
            this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        }

        return this.dateDto;

    }

}

export class DateDto {
    startDate: string;
    endDate: string;
}