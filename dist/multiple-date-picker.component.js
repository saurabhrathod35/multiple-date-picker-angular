"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment/moment");
var MultipleDatePickerComponent = MultipleDatePickerComponent_1 = (function () {
    function MultipleDatePickerComponent() {
        this.cssDaysOfSurroundingMonths = this.cssDaysOfSurroundingMonths || 'picker-empty';
        // month = this.month || moment().startOf('day');  // can use this instead of placing in the contructor // ask about purpose of having potenial input for month
        this.projectScope = [];
        this.days = [];
        this._weekDaysOff = this._weekDaysOff || [];
        this.daysOff = this.daysOff || [];
        this.disableBackButton = false;
        this.disableNextButton = false;
        this.daysOfWeek = [];
        // _cssDaysOfSurroundingMonths: any = this._cssDaysOfSurroundingMonths || 'picker-empty';
        this.yearsForSelect = [];
        this.propagateChange = function (_) { };
        this._projectScope = 55; // notice the '_'
        this.month = this.month || moment().startOf('day');
    }
    MultipleDatePickerComponent.prototype.increment = function () {
        //this.something++;
    };
    MultipleDatePickerComponent.prototype.decrement = function () {
        //this.something--;
    };
    MultipleDatePickerComponent.prototype.ngOnInit = function () {
        this.generate();
        this.daysOfWeek = this.getDaysOfWeek();
        //console.log('this.sundayFirstDaydddd = ' + this.sundayFirstDay);
    };
    // writeValue(value: any) {
    //   if (value !== undefined) {
    //     this.counterValue = value;
    //   }
    // }
    MultipleDatePickerComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.projectScope = value;
        }
    };
    MultipleDatePickerComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MultipleDatePickerComponent.prototype.registerOnTouched = function () { };
    Object.defineProperty(MultipleDatePickerComponent.prototype, "projectScope2", {
        get: function () {
            return this._projectScope;
        },
        set: function (val) {
            this._projectScope = val;
            this.propagateChange(this._projectScope);
        },
        enumerable: true,
        configurable: true
    });
    MultipleDatePickerComponent.prototype.logMonthChanged = function (newMonth, oldMonth) {
        alert('new month : ' + moment(newMonth).format('YYYY-M-DD') + ' old month : ' + moment(oldMonth).format('YYYY-M-DD'));
    }; // future test case shelf for now. regarding change month
    MultipleDatePickerComponent.prototype.checkNavigationButtons = function () {
        var today = moment(), previousMonth = moment(this.month).subtract(1, 'month'), nextMonth = moment(this.month).add(1, 'month');
        this.disableBackButton = this.disableNavigation || (this.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
        this.disableNextButton = this.disableNavigation || (this.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
    };
    MultipleDatePickerComponent.prototype.getDaysOfWeek = function () {
        /*To display days of week names in moment.lang*/
        var momentDaysOfWeek = moment().localeData().weekdaysMin(), daysOfWeek = [];
        for (var i = 1; i < 7; i++) {
            daysOfWeek.push(momentDaysOfWeek[i]);
        }
        if (this.sundayFirstDay) {
            daysOfWeek.splice(0, 0, momentDaysOfWeek[0]);
        }
        else {
            daysOfWeek.push(momentDaysOfWeek[0]);
        }
        return daysOfWeek;
    };
    MultipleDatePickerComponent.prototype.getMonthYearToDisplay = function () {
        var month = this.month.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1);
    };
    MultipleDatePickerComponent.prototype.getYearsForSelect = function () {
        var now = moment(), changeYearPast = Math.max(0, parseInt(this.changeYearPast, 10) || 0), changeYearFuture = Math.max(0, parseInt(this.changeYearFuture, 10) || 0), min = moment(this.month).subtract(changeYearPast, 'year'), max = moment(this.month).add(changeYearFuture, 'year'), result = [];
        max.add(1, 'year');
        for (var m = moment(min); max.isAfter(m, 'year'); m.add(1, 'year')) {
            if ((!this.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!this.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
                result.push(m.format('YYYY'));
            }
        }
        return result;
    };
    ;
    MultipleDatePickerComponent.prototype.toggleDay = function (event, day) {
        event.preventDefault();
        // removed day ? day.mdp.otherMonth && 
        if (day.mdp.otherMonth && !this.fireEventsForDaysOfSurroundingMonths) {
            return;
        }
        var prevented = false;
        event.preventDefault = function () {
            prevented = true;
        };
        if (typeof this.dayClick == 'function') {
            this.dayClick(event, day);
        }
        if (day.selectable && !prevented) {
            day.mdp.selected = !day.mdp.selected;
            if (day.mdp.selected) {
                console.log('this project scope = ' + this.projectScope); // for testing
                this.projectScope.push(day.date);
            }
            else {
                var idx = -1;
                for (var i = 0; i < this.projectScope.length; ++i) {
                    if (moment.isMoment(this.projectScope[i])) {
                        if (this.projectScope[i].isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                    else {
                        if (this.projectScope[i].date.isSame(day.date, 'day')) {
                            idx = i;
                            break;
                        }
                    }
                }
                if (idx !== -1) {
                    this.projectScope.splice(idx, 1);
                }
            }
        }
        this.propagateChange(this.projectScope);
    };
    MultipleDatePickerComponent.prototype.clearDays = function () {
        this.projectScope = [];
        this.generate();
    };
    MultipleDatePickerComponent.prototype.logDays = function () {
        this.generate();
    }; // remove this and from html
    // hoverDay(event, day) {
    //     event.preventDefault();
    //     //console.log('what is thiz = ' + event.preventDefault() + ' 1 ' + prevented);
    //     var prevented = false;
    //     //console.log('what is thiz 22222 = ' + event.preventDefault() + ' 2 ' + prevented);
    //     event.preventDefault = function () {
    //         prevented = true;
    //     };
    //     // console.log('this was called');
    //     if (true) {
    //        // console.log('this was called inside of dayHover = ' + JSON.stringify(event) + ' --- ' + JSON.stringify(day) + ' ----- ');
    //         //this.dayHover(event, day);
    //     }
    //     if (!prevented) {
    //         day.mdp.hover = event.type === 'mouseover';
    //     }
    // }
    MultipleDatePickerComponent.prototype.rightClicked = function (event, day) {
        if (typeof this.rightClick === 'function') {
            event.preventDefault();
            this.rightClick(event, day);
        }
    };
    MultipleDatePickerComponent.prototype.getDayClasses = function (day) {
        // this.showDaysOfSurroundingMonths = true;
        var css = '';
        //console.log('this got here ' + day.css)
        if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
            // console.log('this got here ' + day.css)
            css += ' ' + day.css;
        }
        if (this.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
            css += ' ' + this.cssDaysOfSurroundingMonths;
        }
        if (day.mdp.selected) {
            css += ' picker-selected';
        }
        if (!day.selectable) {
            css += ' picker-off';
        }
        if (day.mdp.today) {
            css += ' today';
        }
        if (day.mdp.past) {
            css += ' past';
        }
        if (day.mdp.future) {
            css += ' future';
        }
        if (day.mdp.otherMonth) {
            css += ' picker-other-month';
        }
        return css;
    };
    /*Navigate to another month*/
    MultipleDatePickerComponent.prototype.changeMonth = function (event, disable, add) {
        if (disable) {
            return;
        }
        event.preventDefault();
        var prevented = false;
        event.preventDefault = function () {
            // console.log('entered into preventDefault *****');
            prevented = true;
        };
        var monthTo = moment(this.month).add(add, 'month');
        if (typeof this.monthClick == 'function') {
            this.monthClick(event, monthTo);
        }
        //this.logMonthChanged(newMonth, oldMonth);
        if (!prevented) {
            var oldMonth = moment(this.month);
            // console.log('oldMonth = ' + oldMonth + ' newMonth = ' + newMonth + ' this.monthChanged = ' + typeof this.monthChanged); // future test case with logMonthChanged
            this.month = monthTo;
            if (typeof this.monthChanged == 'function') {
                this.monthChanged(this.month, oldMonth);
            }
            this.generate();
        }
    };
    /*Change year*/
    MultipleDatePickerComponent.prototype.changeYear = function (year) {
        this.month = this.month.year(parseInt(year, 10));
    };
    ;
    /*Check if the date is off : unselectable*/
    MultipleDatePickerComponent.prototype.isDayOff = function (day) {
        return this.allDaysOff ||
            (this.disableDaysBefore && moment(day.date).isBefore(moment(), 'day')) ||
            (!!this.disableDaysAfter && moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
            ((this.weekDaysOff === Array) && this.weekDaysOff.some(function (dayOff) {
                return day.date.day() === dayOff;
            })) ||
            ((this.daysOff === Array) && this.daysOff.some(function (dayOff) {
                return day.date.isSame(dayOff, 'day');
            })) ||
            ((this.daysAllowed === Array) && !this.daysAllowed.some(function (dayAllowed) {
                return day.date.isSame(dayAllowed, 'day');
            })) ||
            ((this.highlightDays === Array) && this.highlightDays.some(function (highlightDay) {
                return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
            }));
    };
    /*Check if the date is selected*/
    MultipleDatePickerComponent.prototype.isSelected = function (day) {
        // let now = moment();
        // let d = day.mdp.today
        // console.log('DDDDDDDDDDDDd******** = ' + day.date.isSame(now, 'day'));
        // function isSameDay(arr, d) {
        //    // arr = this.projectScope;
        //    // val = day;
        //    return arr.some(dayVal => d === dayVal);
        // }
        // //console.log('this.projectScope = ' + isSameDay(d));
        // return isSameDay(this.projectScope, 'd');
        //return this.projectScope.some(isSameDay);
        // return this.projectScope.some(function (d) {
        //     return day.date.isSame(d, 'day');
        // });
    };
    /*Generate the calendar*/
    MultipleDatePickerComponent.prototype.generate = function () {
        var _this = this;
        var year = this.month.year().toString();
        this.yearsForSelect = this.getYearsForSelect();
        this.monthToDisplay = this.getMonthYearToDisplay();
        this.yearToDisplay = this.month.format('YYYY');
        var previousDay = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');
        if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
            previousDay = previousDay.add(1, 'week');
        }
        var firstDayOfMonth = moment(this.month).date(1), days = [], now = moment(), lastDay = moment(firstDayOfMonth).endOf('month'), createDate = function () {
            var day = {
                selectable: true,
                date: moment(previousDay.add(1, 'day')),
                css: '',
                title: '',
                mdp: {
                    selected: false,
                    today: false,
                    past: true,
                    future: true,
                    otherMonth: false
                },
            };
            if ((_this.highlightDays === Array)) {
                var hlDay = _this.highlightDays.filter(function (d) {
                    return day.date.isSame(d.date, 'day');
                });
                day.css = hlDay.length > 0 ? hlDay[0].css : '';
                day.title = hlDay.length > 0 ? hlDay[0].title : '';
            }
            day.selectable = !_this.isDayOff(day);
            console.log('this.sameDaySelect() = ' + _this.isSelected(day));
            //day.mdp.selected = this.isSelected(day);
            day.mdp.today = day.date.isSame(now, 'day');
            day.mdp.past = day.date.isBefore(now, 'day');
            day.mdp.future = day.date.isAfter(now, 'day');
            if (!day.date.isSame(_this.month, 'month')) {
                day.mdp.otherMonth = true;
            }
            // console.log(' and is selected333 ' + JSON.stringify(day));
            // console.log('this is day = ' + JSON.stringify(day));
            return day;
        };
        var maxDays = lastDay.diff(previousDay, 'days'), lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
        if (lastDay.day() !== lastDayOfWeek) {
            maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
        }
        for (var j = 0; j < maxDays; j++) {
            days.push(createDate());
        }
        this.days = days;
        this.checkNavigationButtons();
        this.propagateChange(this.projectScope);
        //console.log('this is this.days = ' + JSON.stringify(this.days, null, 4));
    };
    MultipleDatePickerComponent.prototype.findArray = function (day) {
        console.log('this.projectScope = ' + this.projectScope + ' and is selected ' + day);
    };
    return MultipleDatePickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "highlightDays", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "dayClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "dayHover", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "rightClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "month", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "monthChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "monthClick", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "weekDaysOff", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "allDaysOff", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "daysAllowed", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableNavigation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disallowBackPastMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "disallowGoFuturMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "showDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "cssDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "fireEventsForDaysOfSurroundingMonths", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableDaysBefore", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "disableDaysAfter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "changeYearPast", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MultipleDatePickerComponent.prototype, "changeYearFuture", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultipleDatePickerComponent.prototype, "projectScope", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultipleDatePickerComponent.prototype, "something", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MultipleDatePickerComponent.prototype, "sundayFirstDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultipleDatePickerComponent.prototype, "_projectScope", void 0);
MultipleDatePickerComponent = MultipleDatePickerComponent_1 = __decorate([
    core_1.Component({
        //moduleId: module.id,
        selector: 'multiple-date-picker',
        template: "\n        <div class=\"multiple-date-picker\">\n            <div class=\"picker-top-row\">\n                <div class=\"text-center picker-navigate picker-navigate-left-arrow\" [ngClass]=\"{'disabled':disableBackButton}\" (click)=\"changeMonth($event, disableBackButton, -1)\">&lt;</div>\n                <div class=\"text-center picker-month\">\n                    {{monthToDisplay}}\n                    <span *ngIf=\"yearsForSelect.length < 2\">{{yearToDisplay}}</span>\n                </div>\n                <div class=\"text-center picker-navigate picker-navigate-right-arrow\" [ngClass]=\"{'disabled':disableNextButton}\" (click)=\"changeMonth($event, disableNextButton, 1)\">&gt;</div>\n                <button (click)=\"clearDays()\">Clear Days</button>\n                <button (click)=\"logDays()\">Log Days</button>\n                <button (click)=\"findArray()\">Find Array</button>\n                <button (click)=\"decrement()\">\n                Decrement\n                </button>\n                <button (click)=\"increment()\">\n                Increment\n                </button>\n            </div>\n            <div class=\"picker-days-week-row\">\n                <div class=\"text-center\" *ngFor=\"let weekDays of daysOfWeek\">{{weekDays}}</div>\n            </div>\n            <div class=\"picker-days-row\">\n                <div class=\"text-center picker-day {{getDayClasses(day)}}\" title=\"{{day.title}}\" *ngFor=\"let day of days\" (click)=\"toggleDay($event, day)\" >\n                    {{day ? day.mdp.otherMonth && !showDaysOfSurroundingMonths ? '&nbsp;' : day.date.format('D') : ''}}\n                </div>\n            </div>\n        </div>\n    ",
        styles: ["\n        .text-center {\n            text-align: center\n        }\n        \n        .multiple-date-picker {\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none\n        }\n        \n        .multiple-date-picker,.picker-days-row,.picker-days-week-row,.picker-top-row {\n            width: 100%\n        }\n        \n        .picker-top-row>div {\n            display: inline-block\n        }\n        \n        .picker-navigate {\n            width: 16.66%\n        }\n        \n        .picker-navigate:hover {\n            cursor: pointer\n        }\n        \n        .picker-navigate.disabled,.picker-navigate.disabled:hover {\n            color: #ddd;\n            cursor: default\n        }\n        \n        .picker-month {\n            width: 66%\n        }\n        \n        .picker-days-row>div,.picker-days-week-row>div {\n            width: 14.28%;\n            display: inline-block\n        }\n        \n        .picker-day,.picker-top-row {\n            padding: 10px 0\n        }\n        \n        .picker-day {\n            background-color: #fff;\n            border: 1px solid #eee;\n            box-sizing: border-box;\n            color: #000\n        }\n        \n        .picker-day.today,.picker-day.today.picker-off,.picker-day.today.picker-off:hover,.picker-day.today.picker-selected,.picker-day.today:hover {\n            color: #00a3ff\n        }\n        \n        .picker-day:not(.picker-off):not(.picker-empty):hover {\n            background-color: #C6000B;\n            color: #fff;\n            cursor: pointer\n        }\n        \n        .picker-day.picker-selected {\n            background-color: #C6000B;\n            color: #fff\n        }\n        \n        .picker-day.picker-off,.picker-day.picker-off:hover {\n            background-color: #eee;\n            color: #bbb;\n            cursor: default\n        }\n        \n        .picker-day.picker-empty,.picker-day.picker-empty:hover {\n            background-color: #fafafa;\n            cursor: default\n        }\n        \n        input {\n              border: 0;\n              border-radius: 3px;\n              height: 30px;\n              max-width: 100px;\n              text-align: center;\n            }\n    "],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return MultipleDatePickerComponent_1; }),
                multi: true
            }
        ]
    }),
    __metadata("design:paramtypes", [])
], MultipleDatePickerComponent);
exports.MultipleDatePickerComponent = MultipleDatePickerComponent;
var MultipleDatePickerComponent_1;
// (function (angular) {
//     'use strict';
//     var multipleDatePicker = function () {
//             return {
//                 restrict: 'AE',
//                 scope: {
//                     /*
//                      * Type : Array of moment dates
//                      * Array will mutate when user select/unselect a date
//                      */
//                     ngModel: '=?',
//                     /*
//                      * Type: array of objects (see doc)
//                      * Days to highlights
//                      * */
//                     highlightDays: '=?',
//                     dayClick: '=?',
//                     dayHover: '=?',
//                     rightClick: '=?',
//                     month: '=?',
//                     monthChanged: '=?',
//                     monthClick: '=?',
//                     weekDaysOff: '=?',
//                     allDaysOff: '=?',
//                     daysAllowed: '=?',
//                     sundayFirstDay: '=?',
//                     disableNavigation: '=?',
//                     disallowBackPastMonths: '=?',
//                     disallowGoFuturMonths: '=?',
//                     showDaysOfSurroundingMonths: '=?',
//                     cssDaysOfSurroundingMonths: '=?',
//                     fireEventsForDaysOfSurroundingMonths: '=?',
//                     disableDaysBefore: '=?',
//                     disableDaysAfter: '=?',
//                     changeYearPast: '=?',
//                     changeYearFuture: '=?'
//                 },
//                 link: function (scope) {
//                     scope.ngModel = scope.ngModel || [];
//                     /*utility functions*/
//                     var checkNavigationButtons = function () {
//                             var today = moment(),
//                                 previousMonth = moment(scope.month).subtract(1, 'month'),
//                                 nextMonth = moment(scope.month).add(1, 'month');
//                             scope.disableBackButton = scope.disableNavigation || (scope.disallowBackPastMonths && today.isAfter(previousMonth, 'month'));
//                             scope.disableNextButton = scope.disableNavigation || (scope.disallowGoFuturMonths && today.isBefore(nextMonth, 'month'));
//                         },
//                         getDaysOfWeek = function () {
//                             /*To display days of week names in moment.lang*/
//                             var momentDaysOfWeek = moment().localeData()._weekdaysMin,
//                                 days = [];
//                             for (var i = 1; i < 7; i++) {
//                                 days.push(momentDaysOfWeek[i]);
//                             }
//                             if (scope.sundayFirstDay) {
//                                 days.splice(0, 0, momentDaysOfWeek[0]);
//                             } else {
//                                 days.push(momentDaysOfWeek[0]);
//                             }
//                             return days;
//                         },
//                         getMonthYearToDisplay = function () {
//                             var month = scope.month.format('MMMM');
//                             return month.charAt(0).toUpperCase() + month.slice(1);
//                         },
//                         getYearsForSelect = function () {
//                             var now = moment(),
//                                 changeYearPast = Math.max(0, parseInt(scope.changeYearPast, 10) || 0),
//                                 changeYearFuture = Math.max(0, parseInt(scope.changeYearFuture, 10) || 0),
//                                 min = moment(scope.month).subtract(changeYearPast, 'year'),
//                                 max = moment(scope.month).add(changeYearFuture, 'year'),
//                                 result = [];
//                             max.add(1, 'year');
//                             for (var m = moment(min); max.isAfter(m, 'YEAR'); m.add(1, 'year')) {
//                                 if ((!scope.disallowBackPastMonths || (m.isAfter(now, 'year') || m.isSame(now, 'year'))) && (!scope.disallowGoFuturMonths || (m.isBefore(now, 'year') || m.isSame(now, 'year')))) {
//                                     result.push(m.format('YYYY'));
//                                 }
//                             }
//                             return result;
//                         };
//                     /*scope functions*/
//                     var watches = [];
//                     watches.push(
//                         scope.$watch('ngModel', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('month', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('highlightDays', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('weekDaysOff', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('allDaysOff', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('daysAllowed', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('disableDaysBefore', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch('disableDaysAfter', function () {
//                             scope.generate();
//                         }, true)
//                     );
//                     watches.push(
//                         scope.$watch(function () {
//                             return moment.locale();
//                         }, function () {
//                             scope.daysOfWeek = getDaysOfWeek();
//                             scope.monthToDisplay = getMonthYearToDisplay();
//                         }, true)
//                     );
//                     scope.$on('destroy', function () {
//                         for (var i = 0; i < watches.length; i++) {
//                             watches[i]();
//                         }
//                     });
//                     //default values
//                     scope.month = scope.month || moment().startOf('day');
//                     scope.days = [];
//                     scope.weekDaysOff = scope.weekDaysOff || [];
//                     scope.daysOff = scope.daysOff || [];
//                     scope.disableBackButton = false;
//                     scope.disableNextButton = false;
//                     scope.daysOfWeek = getDaysOfWeek();
//                     scope.cssDaysOfSurroundingMonths = scope.cssDaysOfSurroundingMonths || 'picker-empty';
//                     scope.yearsForSelect = [];
//                     /**
//                      * Called when user clicks a date
//                      * @param event event the click event
//                      * @param day "complex" mdp object with all properties
//                      */
//                     scope.toggleDay = function (event, day) {
//                         event.preventDefault();
//                         if (day.mdp.otherMonth && !scope.fireEventsForDaysOfSurroundingMonths) {
//                             return;
//                         }
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         if (typeof scope.dayClick == 'function') {
//                             scope.dayClick(event, day);
//                         }
//                         if (day.selectable && !prevented) {
//                             day.mdp.selected = !day.mdp.selected;
//                             if (day.mdp.selected) {
//                                 scope.ngModel.push(day.date);
//                             } else {
//                                 var idx = -1;
//                                 for (var i = 0; i < scope.ngModel.length; ++i) {
//                                     if (moment.isMoment(scope.ngModel[i])) {
//                                         if (scope.ngModel[i].isSame(day.date, 'day')) {
//                                             idx = i;
//                                             break;
//                                         }
//                                     } else {
//                                         if (scope.ngModel[i].date.isSame(day.date, 'day')) {
//                                             idx = i;
//                                             break;
//                                         }
//                                     }
//                                 }
//                                 if (idx !== -1) scope.ngModel.splice(idx, 1);
//                             }
//                         }
//                     };
//                     /**
//                      * Hover day
//                      * @param event hover event
//                      * @param day "complex" mdp object with all properties
//                      */
//                     scope.hoverDay = function (event, day) {
//                         event.preventDefault();
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         if (typeof scope.dayHover == 'function') {
//                             scope.dayHover(event, day);
//                         }
//                         if (!prevented) {
//                             day.mdp.hover = event.type === 'mouseover';
//                         }
//                     };
//                     /**
//                      * Right clicked on day
//                      * @param event Click event
//                      * @param day Day clicked
//                      */
//                     scope.rightClicked = function (event, day) {
//                         if (typeof scope.rightClick === 'function') {
//                             event.preventDefault();
//                             scope.rightClick(event, day);
//                         }
//                     };
//                     scope.getDayClasses = function (day) {
//                         var css = '';
//                         if (day.css && (!day.mdp.otherMonth || scope.showDaysOfSurroundingMonths)) {
//                             css += ' ' + day.css;
//                         }
//                         if (scope.cssDaysOfSurroundingMonths && day.mdp.otherMonth) {
//                             css += ' ' + scope.cssDaysOfSurroundingMonths;
//                         }
//                         if (day.mdp.selected) {
//                             css += ' picker-selected';
//                         }
//                         if (!day.selectable) {
//                             css += ' picker-off';
//                         }
//                         if (day.mdp.today) {
//                             css += ' today';
//                         }
//                         if (day.mdp.past) {
//                             css += ' past';
//                         }
//                         if (day.mdp.future) {
//                             css += ' future';
//                         }
//                         if (day.mdp.otherMonth) {
//                             css += ' picker-other-month';
//                         }
//                         return css;
//                     };
//                     /*Navigate to another month*/
//                     scope.changeMonth = function (event, disable, add) {
//                         if (disable) {
//                             return;
//                         }
//                         event.preventDefault();
//                         var prevented = false;
//                         event.preventDefault = function () {
//                             prevented = true;
//                         };
//                         var monthTo = moment(scope.month).add(add, 'month');
//                         if (typeof scope.monthClick == 'function') {
//                             scope.monthClick(event, monthTo);
//                         }
//                         if (!prevented) {
//                             var oldMonth = moment(scope.month);
//                             scope.month = monthTo;
//                             if (typeof scope.monthChanged == 'function') {
//                                 scope.monthChanged(scope.month, oldMonth);
//                             }
//                         }
//                     };
//                     /*Change year*/
//                     scope.changeYear = function (year) {
//                         scope.month = scope.month.year(parseInt(year, 10));
//                     };
//                     /*Check if the date is off : unselectable*/
//                     scope.isDayOff = function (day) {
//                         return scope.allDaysOff ||
//                             (!!scope.disableDaysBefore && moment(day.date).isBefore(scope.disableDaysBefore, 'day')) ||
//                             (!!scope.disableDaysAfter && moment(day.date).isAfter(scope.disableDaysAfter, 'day')) ||
//                             (angular.isArray(scope.weekDaysOff) && scope.weekDaysOff.some(function (dayOff) {
//                                 return day.date.day() === dayOff;
//                             })) ||
//                             (angular.isArray(scope.daysOff) && scope.daysOff.some(function (dayOff) {
//                                 return day.date.isSame(dayOff, 'day');
//                             })) ||
//                             (angular.isArray(scope.daysAllowed) && !scope.daysAllowed.some(function (dayAllowed) {
//                                 return day.date.isSame(dayAllowed, 'day');
//                             })) ||
//                             (angular.isArray(scope.highlightDays) && scope.highlightDays.some(function (highlightDay) {
//                                 return day.date.isSame(highlightDay.date, 'day') && !highlightDay.selectable;
//                             }));
//                     };
//                     /*Check if the date is selected*/
//                     scope.isSelected = function (day) {
//                         return scope.ngModel.some(function (d) {
//                             return day.date.isSame(d, 'day');
//                         });
//                     };
//                     /*Generate the calendar*/
//                     scope.generate = function () {
//                         scope.year = scope.month.year().toString();
//                         scope.yearsForSelect = getYearsForSelect();
//                         scope.monthToDisplay = getMonthYearToDisplay();
//                         scope.yearToDisplay = scope.month.format('YYYY');
//                         var previousDay = moment(scope.month).date(0).day(scope.sundayFirstDay ? 0 : 1).subtract(1, 'day');
//                         if (moment(scope.month).date(0).diff(previousDay, 'day') > 6) {
//                             previousDay = previousDay.add(1, 'week');
//                         }
//                         var firstDayOfMonth = moment(scope.month).date(1),
//                             days = [],
//                             now = moment(),
//                             lastDay = moment(firstDayOfMonth).endOf('month'),
//                             createDate = function () {
//                                 var day = {
//                                     date: moment(previousDay.add(1, 'day')),
//                                     mdp: {
//                                         selected: false
//                                     }
//                                 };
//                                 if (angular.isArray(scope.highlightDays)) {
//                                     var hlDay = scope.highlightDays.filter(function (d) {
//                                         return day.date.isSame(d.date, 'day');
//                                     });
//                                     day.css = hlDay.length > 0 ? hlDay[0].css : '';
//                                     day.title = hlDay.length > 0 ? hlDay[0].title : '';
//                                 }
//                                 day.selectable = !scope.isDayOff(day);
//                                 day.mdp.selected = scope.isSelected(day);
//                                 day.mdp.today = day.date.isSame(now, 'day');
//                                 day.mdp.past = day.date.isBefore(now, 'day');
//                                 day.mdp.future = day.date.isAfter(now, 'day');
//                                 if (!day.date.isSame(scope.month, 'month')) {
//                                     day.mdp.otherMonth = true;
//                                 }
//                                 return day;
//                             },
//                             maxDays = lastDay.diff(previousDay, 'days'),
//                             lastDayOfWeek = scope.sundayFirstDay ? 6 : 0;
//                         if (lastDay.day() !== lastDayOfWeek) {
//                             maxDays += (scope.sundayFirstDay ? 6 : 7) - lastDay.day();
//                         }
//                         for (var j = 0; j < maxDays; j++) {
//                             days.push(createDate());
//                         }
//                         scope.days = days;
//                         checkNavigationButtons();
//                     };
//                     scope.generate();
//                 }
//             };
//         }
//         ;
//     angular.module('multipleDatePicker', [])
//         .directive('multipleDatePicker', multipleDatePicker)
//         .directive('mdpRightClick', ['$parse', function ($parse) {
//             return function (scope, element, attrs) {
//                 var fn = $parse(attrs.mdpRightClick);
//                 element.bind('contextmenu', function (event) {
//                     scope.$apply(function () {
//                         fn(scope, {$event: event});
//                     });
//                 });
//             };
//         }]);
// })
// (window.angular); 
//# sourceMappingURL=multiple-date-picker.component.js.map