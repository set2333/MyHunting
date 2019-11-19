function getPage(namePage) {
    $('.content').load(namePage, function(data) {
        $('.formAuth').submit(submitAuthForm);
    });
}

function submitAuthForm(event) {
    event.preventDefault();
    $.post('/auth', $(this).serialize(), function(data) {
        $('.content').html(data);
        refresh();
    });
}

$(function() {
    $('#btnMain').click(getPage.bind(this, 'mainajax'));
    $('#btnFowl').click(getPage.bind(this, 'fowlajax'));
    $('#btnRoute').click(getPage.bind(this, 'routeajax'));
    $('#btnJournal').click(getPage.bind(this, 'journalajax'));
    $('#btnExit').click(function() {
        $.post('/exit', function(data) {
            $('.content').html(data);
            refresh();
        })
    });
    $('.formAuth').submit(submitAuthForm);
})

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function refresh() {
    if (getCookie('authorized') == 'true') {
        $('#btnExit').removeClass('buttonHide');
    }
    else {
        $('#btnExit').addClass('buttonHide');
    }
    $('.formAuth').submit(submitAuthForm);
}