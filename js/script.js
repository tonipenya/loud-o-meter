var LOUDNESS_INCREMENT = 5;

$( document ).ready(function() {
    retrieveHowards(fillHowardView);
});

function fillHowardView(howards) {
    var ul = $('<ul/>');
    howards.forEach(function(howard, idx) {
        var howardColor = getColor(howards.length, idx);
        howard.id = idx;
        var li = $('<li/>')
            .attr('id', 'howard-' + idx)
            .appendTo(ul);
        $('<span/>')
            .addClass('avatar')
            .css("background-color", getColor(howards.length, idx))
            .appendTo(li)
            .click(howard, increaseLoudness);
        $('<span/>')
            .addClass('name')
            .text(howard.name)
            .attr('title', howard.name)
            .appendTo(li);
        var meter = $('<span/>')
            .addClass('meter')
            .appendTo(li);
        $('<span/>')
            .addClass('progress')
            .css("background-color", getColor(howards.length, idx))
            .animate({width: howard.loudness + '%'}, 1000)
            .appendTo(meter);
    });

    $('#loud-list').append(ul);
}

function increaseLoudness(event) {
    var howard = event.data;
    howard.loudness += 5;
    if (howard.loudness > 100) {
        howard.loudness = 100;
    };

    console.log(howard);

    $.ajax({
        method: 'PUT',
        url: 'https://loud-o-meter.firebaseio.com/howards/' + howard.id + '.json',
        data: JSON.stringify(howard),
        success: function(howard) {
            $('#howard-' + howard.id + ' .progress').animate({width: howard.loudness + '%'}, 1000);
        }
    });
}

function getColor(numberOfPartitions, index) {
    var hue = 360/numberOfPartitions*index;
    return 'hsl(' + hue + ', 72%, 56%)';
}

function retrieveHowards(callback) {
    $.ajax({
        url: 'https://loud-o-meter.firebaseio.com/howards.json',
        dataType: 'jsonp',
        success: callback
    });
}
