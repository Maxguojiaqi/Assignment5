
// Create the time object and update it every second
$('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
setInterval(function() {
    $('#currentDay').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
}, 1000); //Update every second


for (let i =9; i < 18; i++)
{   
    // create the DOM div for the entire row 
    let scheduleRowDiv = $('<div>');
    scheduleRowDiv.addClass("row border border-top-0 border-info text-center");
    scheduleRowDiv.attr('id', 'calendar-row'+i);
    // create the DOM div displays the time
    let scheduleColDiv1 = $('<div>');
    scheduleColDiv1.addClass('col-1 align-middle font-weight-bold');
    if(i<12)
    {
        scheduleColDiv1.text(i + " am");
    }
    else if(i===12)
    {
        scheduleColDiv1.text(i + " pm");
    }
    else
    {
        scheduleColDiv1.text(i - 12 + " pm");
    }
    // create the DOM div for the input text area
    let scheduleColDiv2 = $('<textarea>');
    scheduleColDiv2.addClass('col-10 align-middle text-dark font-italic');
    scheduleColDiv2.attr('placeholder', 'Enter your plan here...');

    let currentHour = moment().format('h a').substring(0,2);
    let currentAMPM = moment().format('h a').substring(2);

    if(currentAMPM == "pm")
    {
        currentHour= parseInt(currentHour)+12;
    }
    // depend on the hour relative to the current time, assign different background color.
    if ( i < parseInt(currentHour))
    {
        scheduleColDiv2.addClass("past");
    }
    else if(i == parseInt(currentHour))
    {
        scheduleColDiv2.addClass("present");
    }
    else
    {
        scheduleColDiv2.addClass("future");
    }

    // read out information stored in local storage
    let itemVal = localStorage.getItem('todo' + i);

    if( itemVal!=null)
    {
        scheduleColDiv2.text(itemVal);
    }
    // create the DOM div for the store button
    let scheduleColDiv3 = $('<button>');
    scheduleColDiv3.addClass('col-1 saveBtn fas fa-lock');
    scheduleColDiv3.on('click', function()
    {
        localStorage.setItem('todo'+i, scheduleColDiv2.val());
    });

    // add all the coloum to the row
    scheduleRowDiv.append(scheduleColDiv1);
    scheduleRowDiv.append(scheduleColDiv2);
    scheduleRowDiv.append(scheduleColDiv3);
    // add row to the schedule content
    $('.scheduleContent').append(scheduleRowDiv);
}