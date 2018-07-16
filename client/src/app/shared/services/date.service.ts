import { Injectable } from "@angular/core";
import * as moment from 'moment';

@Injectable()
export class DateService {

    dateDto = new DateDto();
    constructor() { }

    getDateByInput(inputName: string): DateDto {


        if (inputName === 'Today') {
            return this.getCurrentDay();
        }
        else if (inputName === 'Yesterday') {
            return this.getPreviousDay();
        }
        else if (inputName === 'This Week') {
            return this.getCurrentWeek();
        }
        else if (inputName === 'Last Week') {
            return this.getLastWeek();
        }
        else if (inputName === 'Last 2 Weeks') {
            return this.getLast2Weeks();
        }
        else if (inputName === 'Last 4 Weeks') {
            return this.getLast4Weeks();
        }
        else if (inputName === 'This Month') {
            return this.getCurrentMonth();
        }
        else if (inputName === 'Last Month') {
            return this.getLastMonth();
        }
        else if (inputName === 'Last 3 Months') {
            return this.getLast3Months();
        }
        else if (inputName === 'Last 6 Months') {
            return this.getLast6Months();
        }
        else if (inputName === 'This Year') {
            return this.getCurrentYear();
        }
        else if (inputName === 'Last Year') {
            return this.getLastYear();
        }
        else if (inputName === 'Last 5 Years') {
            return this.getLast5Years();
        }
        else if (inputName === 'Last 10 Years') {
            return this.getLast10Years();
        }

    }

    getCurrentDay(): DateDto {

        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).endOf('day').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getPreviousDay() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getCurrentWeek() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLastWeek() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast2Weeks() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(2, 'weeks').startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast4Weeks() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(4, 'weeks').startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getCurrentMonth() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).startOf('month').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).endOf('month').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLastMonth() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast3Months() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(3, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast6Months() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(6, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'month').endOf('month').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getCurrentYear() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).startOf('year').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).endOf('year').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLastYear() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(1, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast5Years() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(5, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }
    getLast10Years() {
        this.dateDto = new DateDto();

        this.dateDto.startDate = moment(Date.now()).subtract(10, 'year').startOf('year').format('YYYY-MM-DD HH:mm:ss');
        this.dateDto.endDate = moment(Date.now()).subtract(1, 'year').endOf('year').format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    }

    getMonthDate(monthName: string) {

        this.dateDto = new DateDto();
        var now = new Date();
        var year = now.getFullYear();


        if (monthName === 'January') {
            this.dateDto.startDate = year + '-' + '01' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '01' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'February') {
            this.dateDto.startDate = year + '-' + '02' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '02' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'March') {
            this.dateDto.startDate = year + '-' + '03' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '03' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'April') {
            this.dateDto.startDate = year + '-' + '04' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '04' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'May') {
            this.dateDto.startDate = year + '-' + '05' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '05' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'June') {
            this.dateDto.startDate = year + '-' + '06' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '06' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'August') {
            this.dateDto.startDate = year + '-' + '08' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '08' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'September') {
            this.dateDto.startDate = year + '-' + '09' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '09' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'October') {
            this.dateDto.startDate = year + '-' + '10' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '10' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'November') {
            this.dateDto.startDate = year + '-' + '11' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '11' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'December') {
            this.dateDto.startDate = year + '-' + '12' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        }

        return this.dateDto;

    }

}

export class DateDto {
    startDate: string;
    endDate: string;
}