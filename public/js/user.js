function getPage(namePage) {
    $('.content').load(namePage);
}

$(function() {
    $('#btnMain').click(getPage.bind(this, 'mainajax'));
    $('#btnFowl').click(getPage.bind(this, 'fowlajax'));
    $('#btnRoute').click(getPage.bind(this, 'routeajax'));
    $('#btnJournal').click(getPage.bind(this, 'journalajax'));
    $('.formAuth').submit(data, function() {
        alert(data);
        return false;
    });
})