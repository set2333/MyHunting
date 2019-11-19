function getPage(namePage) {
    $('.content').load(namePage, function (data) {
        $('.formAuth').submit(submitAuthForm);
        $('.btnAddFowl').click(function () {
            $('body').append(`<div class="modalWindows">
                              <p>Введите название дичи</p>
                              <input type="text" size="50">
                              <div class="buttonsPanel">
                              <button id="btnAdd">Добавить</button>
                              <button id="btnClose">Отмена</button></div>
                              </div>`);
            $('#btnClose').click(function() {
                $('.modalWindows').remove();
            });
        });
    });
}

function submitAuthForm(event) {
    event.preventDefault();
    $.post('/auth', $(this).serialize(), function (data) {
        $('.content').html(data);
        refresh();
    });
}

$(function () {
    $('#btnMain').click(getPage.bind(this, 'mainajax'));
    $('#btnFowl').click(getPage.bind(this, 'fowlajax'));
    $('#btnRoute').click(getPage.bind(this, 'routeajax'));
    $('#btnJournal').click(getPage.bind(this, 'journalajax'));
    $('#btnExit').click(function () {
        $.post('/exit', function (data) {
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
    } else {
        $('#btnExit').addClass('buttonHide');
    }
    $('.formAuth').submit(submitAuthForm);
}
