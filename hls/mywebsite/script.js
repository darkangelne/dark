var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth(),
    yearCounter = year,
    monthCounter = month,
    calendarThead = document.getElementById('CALENDAR__THEAD'),
    calendarTbody = document.getElementById('CALENDAR__TBODY'),
    calendarControls = document.getElementById('CALENDAR__CONTROLS'),
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    formatMonth;

var getDaysInMonth = function(month, year) {
    return new Date(year, month + 1, 0).getDate();
};

function monthStartDay(thisYear, thisMonth) {
    var date = new Date(thisYear, thisMonth, 1);
    var startDay = date.getDay();

    if (startDay == 0) {
        startDay = 7;
    }

    return startDay;
}

function renderControls(target, year, month) {
    var controlLi = document.createElement('li'),
        prevBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        prevIcn = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        nextLi = document.createElement('li'),
        nextBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        nextIcn = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        todayBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
        todayIcn = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        titleLi = document.createElement('li'),
        heading = document.createElement('header'),
        title = document.createElement('h3');

    prevIcn.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#arrow');
    nextIcn.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#arrow');
    todayIcn.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#dot');

    titleLi.setAttribute('class', 'flexy__child');

    prevBtn.setAttribute('id', 'CALENDAR__CONTROLS__PREV');
    nextBtn.setAttribute('id', 'CALENDAR__CONTROLS__NEXT');

    controlLi.setAttribute('class', 'flexy__item flexy--items-center');
    nextLi.setAttribute('class', 'flexy__item flexy--items-center');

    prevBtn.setAttribute('class', 'calendar__controls__button svg-icon fill--white');
    todayBtn.setAttribute('class', 'calendar__controls__button svg-icon stroke--white');
    nextBtn.setAttribute('class', 'calendar__controls__button svg-icon fill--white svg-icon--rotated-180');

    prevBtn.appendChild(prevIcn);
    nextBtn.appendChild(nextIcn);
    todayBtn.appendChild(todayIcn);
    controlLi.appendChild(prevBtn);
    controlLi.appendChild(todayBtn);
    controlLi.appendChild(nextBtn);

    // title.innerHTML = monthNames[month];
    title.innerHTML = '<span class="calendar__controls__button__year">' + year + ' .</span>' + monthNames[month];
    heading.appendChild(title);
    titleLi.appendChild(heading);

    target.appendChild(titleLi);
    target.appendChild(controlLi);

    prevBtn.addEventListener('click', changeMonth);
    nextBtn.addEventListener('click', changeMonth);
    todayBtn.addEventListener('click', goToday);
}

function renderDayNames(namesArray) {
    var namesRow = document.createElement('tr');

    namesRow.setAttribute('class', 'calendar__month__week flexy__item');

    for (var i = 0; i < namesArray.length; i++) {
        var thDay = document.createElement('th');
        thDay.setAttribute('class', 'calendar__month__day');
        thDay.innerHTML = namesArray[i];
        namesRow.appendChild(thDay);
    }

    calendarThead.appendChild(namesRow);
}

renderDayNames(dayNames);

function goToday() {
    calendarTbody.setAttribute('class', 'calendar__tbody calendar__tbody--animate');
    setTimeout(function(){
        newMonth(year, month);
    }, 450);
    setTimeout(function(){
        calendarTbody.setAttribute('class', 'calendar__tbody');
    }, 900);
    yearCounter = year;
    monthCounter = month;
}

function changeMonth() {
    if (this.id.split('NEXT').length > 1) {
        if (monthCounter < 11) {
            monthCounter++;
        } else {
            monthCounter = 0;
            yearCounter++;
        }
    } else if (this.id.split('PREV').length > 1) {
        if (monthCounter > 0) {
            monthCounter--;
        } else {
            monthCounter = 11;
            yearCounter--;
        }
    }
    calendarTbody.setAttribute('class', 'calendar__tbody calendar__tbody--animate');
    setTimeout(function(){
        newMonth(yearCounter, monthCounter);
    }, 450);
    setTimeout(function(){
        calendarTbody.setAttribute('class', 'calendar__tbody');
    }, 900);
}

function renderMonth(thisYear, thisMonth) {
    var days = getDaysInMonth(thisMonth, thisYear),
        startDay = monthStartDay(thisYear, thisMonth),
        monthRow = document.createElement('tr');
    monthRow.setAttribute('id', 'CALENDAR__ROW');
    monthRow.setAttribute('class', 'calendar__month__week flexy__item');
    for (var i = 1; i < (days + startDay); i++) {
        var cellDay = document.createElement('td'),
            timeTag = document.createElement('time');
        cellDay.setAttribute('class', 'calendar__month__day');
        if (i >= startDay) {
            if (thisMonth < 10) {
                formatMonth = '0' + thisMonth;
            }
            timeTag.setAttribute('datetime', thisYear + '-' + formatMonth + '-' + (i - startDay));
            cellDay.setAttribute('id', 'CALENDAR__DAY--' + (i - startDay + 1));
            timeTag.innerHTML = i - startDay + 1;
            cellDay.appendChild(timeTag);
        } else {
            cellDay.innerHTML = '-';
        }
        monthRow.appendChild(cellDay);
    }

    calendarTbody.appendChild(monthRow);
    renderControls(calendarControls, thisYear, thisMonth);

    var today = document.getElementById('CALENDAR__DAY--' + date.getDate());

    if (thisMonth === date.getMonth() && thisYear === date.getFullYear()) {
        setTimeout(function() {
            today.setAttribute('class', 'calendar__month__day today');
        }, 200);
    }
}

function newMonth(year, month) {
    var controls = document.getElementById('CALENDAR__CONTROLS'),
        row = document.getElementById('CALENDAR__ROW');

    while (controls.firstChild) {
        controls.removeChild(controls.firstChild);
    }

    calendarTbody.removeChild(row);
    renderMonth(year, month);
}
renderMonth(year, month);
