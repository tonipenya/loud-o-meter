$( document ).ready(function() {
    retrieveHowards(fillHowardView);
});

function fillHowardView(howards) {
    var ul = $('<ul/>');
    howards.forEach(function(howard, idx) {
        var howardColor = getColor(howards.length, idx);
        var li = $('<li/>')
            .attr('id', 'howard-' + idx)
            .appendTo(ul);
        $('<span/>')
            .addClass('avatar')
            .css("background-color", getColor(howards.length, idx))
            .appendTo(li);
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

function getColor(numberOfPartitions, index) {
    var hue = 360/numberOfPartitions*index;
    return 'hsl(' + hue + ', 72%, 56%)';
}

function retrieveHowards(callback) {
    $.ajax({
        url: "https://loud-o-meter.firebaseio.com/howards.json",
        jsonp: "callback",
        dataType: "jsonp",
        success: callback
    });
}
