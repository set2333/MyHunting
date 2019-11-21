function getPage(namePage) {
    $('.content').load(namePage, (data)=> {
        $('.formAuth').submit(submitAuthForm);
        $('.btnAddFowl').click(()=> {
            $('body').append(`<div class="modalWindows">
                              <p>Введите название дичи</p>
                              <input type="text" size="50" id="nameFowl">
                              <div class="buttonsPanel">
                              <button id="btnAdd">Добавить</button>
                              <button id="btnClose">Отмена</button>
                              </div>
                              </div>`);
            $('#btnClose').click(()=> {
                $('.modalWindows').remove();
            });
            $('#btnAdd').click(()=> {
                $.post('/addFowl', {nameFowl:  $('#nameFowl').val()}, (data)=> {
                    $('.modalWindows').remove();
                    $('.content').html(data);
                    refresh();
                });
            });
        });
    });
}

function submitAuthForm(event) {
    event.preventDefault();
    $.post('/auth', $(this).serialize(), (data)=> {
        $('.content').html(data);
        refresh();
    });
}

$(function () {
    $('#btnMain').click(getPage.bind(this, 'mainajax'));
    $('#btnFowl').click(getPage.bind(this, 'fowlajax'));
    $('#btnRoute').click(getPage.bind(this, 'routeajax'));
    $('#btnJournal').click(getPage.bind(this, 'journalajax'));
    $('#btnExit').click(()=> {
        $.post('/exit', (data)=> {
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
