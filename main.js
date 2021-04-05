/**
 * Variables
 */
var constructorTemplatesShorted = {};
let $textareaProto = $('#css-code-result').clone().removeAttr('id').addClass('css-code-result');
/**
 * Functions
 */
// Доступность хранилища
function storageAvailable(type) {
	try {
		var storage = window[type], x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) { console.log(e); return false; }
}
/**
 * Events
 */
// Загрузка шаблона
$(document).ready(function () {
    for (var constructorTemplatesItem in constructorTemplates) {
        if (constructorTemplates.hasOwnProperty(constructorTemplatesItem)) {
            constructorTemplatesShorted[constructorTemplates[constructorTemplatesItem]['key']] = {
                'code': constructorTemplates[constructorTemplatesItem]['code'],
                'multiple': constructorTemplates[constructorTemplatesItem]['multiple'],
                'single': constructorTemplates[constructorTemplatesItem]['single']
            };
            $('<option>')
                .attr('value', constructorTemplates[constructorTemplatesItem]['key'])
                .html(constructorTemplates[constructorTemplatesItem]['title'])
                .appendTo('#generationMethod');
        }
    }
    $('#prev-char-btn').attr('disabled', true);
    $('#next-char-btn').attr('disabled', true);
    //console.log(constructorTemplatesShorted);
    // Если не работает локальное хранилище, выключить кнопку сохранения
    if (!storageAvailable('localStorage'))
        $('#save-button')
            .prop('disabled', true)
            .attr('title', "Your browser doesn't support save operation on localStorage");
    // Если все же работает...
    else
        // Попробовать получить сохраненные данные
        if(localStorage.getItem('appConfig') !== null)
            // Отобразить кнопку загрузки
            $('#load-button').removeClass('d-none');
});

// Генерация кода
$('#mainform').bind('submit', function (evt) {
    let constructedCSS = '';
    let multipleFlag = ($('#character-list .carousel-inner').children().length>1?true:false);
    $('#result-area').empty();
    $('#previewFrame').empty();
    if(multipleFlag) {
        if (mainform.elements['generation-method'].value == 'jiinh') {
            alert("Original method doesn't support multiple characters!\nEnabling separated generation...");
            let $characterCollection = $('#character-list .carousel-inner').children();
            for (var i = 0; i < $('#character-list .carousel-inner').children().length; i++) {
                constructedCSS = constructorTemplatesShorted[$('#generationMethod').val()]['code'];
                constructedCSS = constructedCSS
                    .replace(/___DiscordUserID___/g, mainform.elements['discord-user-id'][i].value)
                    .replace(/___DiscordAvatarLinkPassive___/g, mainform.elements['discord-avatar-link-passive'][i].value)
                    .replace(/___DiscordAvatarLinkActive___/g, mainform.elements['discord-avatar-link-active'][i].value)
                    .replace(/___AvatarBrightness___/g, mainform.elements['avatar-brightness'][i].value)
                    .replace(/___AvatarJumpingHeight___/g, mainform.elements['avatar-jumping-height'][i].value)
                    .replace(/___AvatarJumpingHeightUnits___/g, mainform.elements['avatar-jumping-height-units'][i].value);
                $textareaProto.clone().val(constructedCSS).appendTo('#result-area');
            }
            // Превью пассивной картинки
            $('<img>')
                .attr('src', mainform.elements['discord-avatar-link-passive'][0].value)
                .attr('title', 'User ' + mainform.elements['discord-user-id'][0].value + ' passive avatar')
                .attr('style', `filter: brightness(${mainform.elements['avatar-brightness'][0].value}%)`)
                .addClass('h-100 avatar')
                .appendTo('#previewFrame');
            // Превью активной картинки
            $('<img>')
                .attr('src', mainform.elements['discord-avatar-link-active'][0].value)
                .attr('title', 'User ' + mainform.elements['discord-user-id'][0].value + ' active (speaking) avatar')
                .addClass('h-100')
                .appendTo('#previewFrame');
        } else {
            constructedCSS = constructorTemplatesShorted[$('#generationMethod').val()]['code'];
            let $characterCollection = $('#character-list .carousel-inner').children();
            for (var i = 0; i < $('#character-list .carousel-inner').children().length; i++) {
                constructedCSS += constructorTemplatesShorted[$('#generationMethod').val()]['multiple'];
                constructedCSS = constructedCSS
                    .replace(/___DiscordUserID___/g, mainform.elements['discord-user-id'][i].value)
                    .replace(/___DiscordAvatarLinkPassive___/g, mainform.elements['discord-avatar-link-passive'][i].value)
                    .replace(/___DiscordAvatarLinkActive___/g, mainform.elements['discord-avatar-link-active'][i].value)
                    .replace(/___AvatarBrightness___/g, mainform.elements['avatar-brightness'][i].value)
                    .replace(/___AvatarJumpingHeight___/g, mainform.elements['avatar-jumping-height'][i].value)
                    .replace(/___AvatarJumpingHeightUnits___/g, mainform.elements['avatar-jumping-height-units'][i].value);
                // Превью пассивной картинки
                $('<div>')
                    .attr('title', 'User ' + mainform.elements['discord-user-id'][i].value + ' passive avatar')
                    .attr('style', `filter: brightness(${mainform.elements['avatar-brightness'][i].value}%); background-image: url(${mainform.elements['discord-avatar-link-passive'][i].value})`)
                    .addClass('w-100 h-100 previewFrameItem')
                    .appendTo('#previewFrame');
                // Превью активной картинки
                $('<div>')
                    .attr('background', `url(${mainform.elements['discord-avatar-link-active'][i].value})`)
                    .attr('title', 'User ' + mainform.elements['discord-user-id'][i].value + ' active (speaking) avatar')
                    .attr('style', `background-image: url(${mainform.elements['discord-avatar-link-active'][i].value})`)
                    .addClass('w-100 h-100 previewFrameItem')
                    .appendTo('#previewFrame');
            }
            $textareaProto.clone().val(constructedCSS).appendTo('#result-area');
        }
    } else {
        constructedCSS = constructorTemplatesShorted[$('#generationMethod').val()]['code'] +  (constructorTemplatesShorted[$('#generationMethod').val()]['single']!=undefined?constructorTemplatesShorted[$('#generationMethod').val()]['single']:'');
        constructedCSS = constructedCSS
            .replace(/___DiscordUserID___/g, mainform.elements['discord-user-id'].value)
            .replace(/___DiscordAvatarLinkPassive___/g, mainform.elements['discord-avatar-link-passive'].value)
            .replace(/___DiscordAvatarLinkActive___/g, mainform.elements['discord-avatar-link-active'].value)
            .replace(/___AvatarBrightness___/g, mainform.elements['avatar-brightness'].value)
            .replace(/___AvatarJumpingHeight___/g, mainform.elements['avatar-jumping-height'].value)
            .replace(/___AvatarJumpingHeightUnits___/g, mainform.elements['avatar-jumping-height-units'].value);
        $textareaProto.clone().val(constructedCSS).appendTo('#result-area');
        // Превью пассивной картинки
        $('<img>')
            .attr('src', mainform.elements['discord-avatar-link-passive'].value)
            .attr('title', 'User ' + mainform.elements['discord-user-id'].value + ' passive avatar')
            .attr('style', `filter: brightness(${mainform.elements['avatar-brightness'].value}%)`)
            .addClass('h-100 avatar')
            .appendTo('#previewFrame');
        // Превью активной картинки
        $('<img>')
            .attr('src', mainform.elements['discord-avatar-link-active'].value)
            .attr('title', 'User ' + mainform.elements['discord-user-id'].value + ' active (speaking) avatar')
            .addClass('h-100')
            .appendTo('#previewFrame');
    }
    $('#previewCSS').val(constructedCSS);
    //console.log(constructedCSS);
    return false;
});

// Дублирование слота
function duplicateSlot(evt) {
    $('#character-list .carousel-inner .carousel-item:last-child')
        .clone()
        .removeClass('active')
        .appendTo('#character-list .carousel-inner');
    $('#character-list').carousel('next');
    $('#next-char-btn').prop('disabled', true);
    $('#remove-slot').prop('disabled', false);
}
$('#duplicate-slot').on('click', duplicateSlot);

// Удаление слота
$('#remove-slot').on('click', function (evt) {
    // Получить текущий элемент
    var tmp = $('#character-list .carousel-inner .carousel-item.active');
    // Переключить карусель
    $('#character-list').carousel('prev');
    // Удалить сохраненный элемент
    tmp.detach();
});

// Сброс формы
function resetForm(evt) {
    if($('#character-list .carousel-inner .carousel-item').length > 1) {
        do {
            $('#character-list .carousel-inner .carousel-item:last-child').detach();
        } while ($('#character-list .carousel-inner .carousel-item').length > 1);
        $('#character-list .carousel-inner .carousel-item:last-child').addClass('active');
    }
    $('#prev-char-btn').attr('disabled', 'disabled');
    $('#next-char-btn').attr('disabled', 'disabled');
    $('#result-area textarea').val('');
    $('#previewCSS').val('');
    $('#previewFrame').empty();
}
$('#mainform').on('reset', resetForm);

// Управление каруселью
$('#character-list').on('slide.bs.carousel', function (evt) {
    //console.log(evt);
    if(evt.to == $('#character-list .carousel-inner').children().length-1) {
        $('#prev-char-btn').removeAttr('disabled');
        $('#next-char-btn').attr('disabled', 'disabled');
    } else if (evt.to == 0 && evt.direction == 'right') {
        $('#prev-char-btn').attr('disabled', 'disabled');
        $('#next-char-btn').removeAttr('disabled');
    } else {
        $('#prev-char-btn').removeAttr('disabled');
        $('#next-char-btn').removeAttr('disabled');
    }
});
// Сохранение формы
$('#save-button').on('click', function (evt) {
    // Определить объект конфигурации
    let mainConfig = {
        "generation-method": mainform.elements['generation-method'].value,
        "elements": []
    };
    // Аватар один, или в комплекте
    let multipleFlag = ($('#character-list .carousel-inner').children().length>1?true:false);
    // Если один, то все просто...
    if(multipleFlag) {
        // Получение массива потомков карусели
        let $characterCollection = $('#character-list .carousel-inner').children();
        // Для каждого потомка
        for (var i = 0; i < $('#character-list .carousel-inner').children().length; i++) {
            mainConfig['elements'][i] = {
                "discord-user-id": mainform.elements['discord-user-id'][i].value,
                "discord-avatar-link-passive": mainform.elements['discord-avatar-link-passive'][i].value,
                "discord-avatar-link-active": mainform.elements['discord-avatar-link-active'][i].value,
                "avatar-brightness": mainform.elements['avatar-brightness'][i].value,
                "avatar-jumping-height": mainform.elements['avatar-jumping-height'][i].value,
                "avatar-jumping-height-units": mainform.elements['avatar-jumping-height-units'][i].value
            };
        }
    } else {
        mainConfig['elements'][0] = {
            "discord-user-id": mainform.elements['discord-user-id'].value,
            "discord-avatar-link-passive": mainform.elements['discord-avatar-link-passive'].value,
            "discord-avatar-link-active": mainform.elements['discord-avatar-link-active'].value,
            "avatar-brightness": mainform.elements['avatar-brightness'].value,
            "avatar-jumping-height": mainform.elements['avatar-jumping-height'].value,
            "avatar-jumping-height-units": mainform.elements['avatar-jumping-height-units'].value
        };
    }
    localStorage.setItem('appConfig', JSON.stringify(mainConfig));
});
// Загрузка конфигурации
$('#load-button').on('click', function (evt) {
    // Предварительный сброс формы
    resetForm(evt);
    // Получить конфигурацию
    let mainConfig = JSON.parse(localStorage.getItem('appConfig'));
    // Выбрать метод в списке
    $('#generationMethod').val(mainConfig['generation-method']);
    console.log(mainConfig);
    // Применить конфигурацию
    if(mainConfig.elements.length > 1) {
        for (var i = 0; i < mainConfig.elements.length; i++) {
            // Дублирование при последующих итерациях
            if(i < mainConfig.elements.length - 1) { duplicateSlot(evt) }
            // Задание параметров
            mainform.elements['discord-user-id'][i].value = mainConfig.elements[i]['discord-user-id'];
            mainform.elements['discord-avatar-link-passive'][i].value = mainConfig.elements[i]['discord-avatar-link-passive'];
            mainform.elements['discord-avatar-link-active'][i].value = mainConfig.elements[i]['discord-avatar-link-active'];
            mainform.elements['avatar-brightness'][i].value = mainConfig.elements[i]['avatar-brightness'];
            mainform.elements['avatar-jumping-height'][i].value = mainConfig.elements[i]['avatar-jumping-height'];
            mainform.elements['avatar-jumping-height-units'][i].value = mainConfig.elements[i]['avatar-jumping-height-units'];
        }
    } else {
        mainform.elements['discord-user-id'].value = mainConfig.elements[0]['discord-user-id'];
        mainform.elements['discord-avatar-link-passive'].value = mainConfig.elements[0]['discord-avatar-link-passive'];
        mainform.elements['discord-avatar-link-active'].value = mainConfig.elements[0]['discord-avatar-link-active'];
        mainform.elements['avatar-brightness'].value = mainConfig.elements[0]['avatar-brightness'];
        mainform.elements['avatar-jumping-height'].value = mainConfig.elements[0]['avatar-jumping-height'];
        mainform.elements['avatar-jumping-height-units'].value = mainConfig.elements[0]['avatar-jumping-height-units'];
    }
});
