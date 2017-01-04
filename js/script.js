$( document ).ready(function() {
    retrieveHowards(fillHowardView);
});

function fillHowardView(howards) {
    console.log(howards);
    var ul = $('<ul/>');
    howards.forEach(function(howard, idx) {
        var li = $('<li/>')
            .attr('id', 'howard-' + idx)
            .appendTo(ul);
        $('<span/>')
            .addClass('avatar')
            .appendTo(li);
        $('<span/>')
            .addClass('name')
            .text(howard.name)
            .appendTo(li);
        var meter = $('<span/>')
            .addClass('meter')
            .appendTo(li);
        $('<span/>')
            .addClass('progress')
            .width(howard.loudness + '%')
            .appendTo(meter);
    });

    $('#loud-list').append(ul);
}

function retrieveHowards(callback) {
    $.ajax({
        url: "https://loud-o-meter.firebaseio.com/howards.json",
        jsonp: "callback",
        dataType: "jsonp",
        success: callback
    });
}
