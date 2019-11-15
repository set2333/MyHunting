function getPage(namePage) {
    $('.content').load(namePage, function(data) {
        $('.formAuth').submit(submitAuthForm);
    });
}

function submitAuthForm(event) {
    event.preventDefault();
    $.post('/auth', $(this).serialize(), function(data) {
        $('.content').html(data);
    });
}

$(function() {
    $('#btnMain').click(getPage.bind(this, 'mainajax'));
    $('#btnFowl').click(getPage.bind(this, 'fowlajax'));
    $('#btnRoute').click(getPage.bind(this, 'routeajax'));
    $('#btnJournal').click(getPage.bind(this, 'journalajax'));
    $('.formAuth').submit(submitAuthForm);
})