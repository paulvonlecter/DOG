// Variables
var $mainform = $('#mainform');
var $singleDiscordUserID = $('#single-discord-user-id');
var $singleDiscordAvatarLinkPassive = $('#single-discord-avatar-link-passive');
var $singleDiscordAvatarLinkActive = $('#single-discord-avatar-link-active');
var $singleAvatarBrightness = $('#single-avatar-brightness');
var $singleAvatarJumpingHeight = $('#single-avatar-jumping-height');
var $singleGenerationMethod = $('#single-generation-method');
var $CSSCodeResult = $('#css-code-result');
var $unitList = $('#unit-list');
// Events
$mainform.bind('submit', function (evt) {
    let constructedCSS = '';
    // Генерировать в зависимости от режима
    switch ($('#overlay-type-selector a.active').attr('data-mode')) {
        case 'single':
            // Выбрать метод генерации
            switch ($singleGenerationMethod.val()) {
                case 'jiihn':
                    constructedCSS = `li.voice-state:not([data-reactid*="${$singleDiscordUserID.val()}"]) { display:none; }
.avatar {
    content: url(${$singleDiscordAvatarLinkPassive.val()});
    height: auto !important;
    width: auto !important;
    border-radius: 0% !important;
    filter: brightness(${$singleAvatarBrightness.val()}%);
}
.speaking {
    border-color: rgba(0,0,0,0) !important;
    position: relative;
    animation-name: speak-now;
    animation-duration: 1s;
    animation-fill-mode:forwards;
    filter: brightness(100%);
    content:url(${$singleDiscordAvatarLinkActive.val()});
}
@keyframes speak-now {
    0% { bottom: 0px; }
    15% { bottom: 10px; }
    30% { bottom: 0px; }
}
li.voice-state{ position: static; }
div.user{ position: absolute; left:40%; bottom:5%; }
body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }`;
                    break;
                case 'paulvonlecter3x4':
                constructedCSS =
`body { overflow-y:hidden; display:block; position:absolute; bottom:0; left:0; right:0; height:100%; }
.voice-container .voice-states .voice-state .user { display:none!important; }
ul.voice-states { display:flex!important; width:100%!important; max-width:100%!important; padding:0!important; justify-content:flex-start; vertical-align:bottom; margin:0!important; height:100%!important; position:absolute; top:0; bottom:0; left:0; right:0; }
li.voice-state { width:100%!important; height:100%!important; margin:0!important; }
img.avatar { height:auto!important; max-height:100%!important; width:auto!important; max-width:100%!important; border-radius:0!important; margin:0!important; border:none!important; transition: filter .1s linear; background-size:auto 100%; background-repeat:no-repeat; filter: brightness(${$singleAvatarBrightness.val()}%); text-align:center; content:url(https://cdn.discordapp.com/attachments/746839046751256618/758985869683589140/Transparent-300x400.png); }
img.avatar.speaking { border-color:rgba(0,0,0,0)!important; position:relative!important; animation-name: speak-now; animation-duration: 1s; animation-fill-mode:forwards; filter: brightness(100%); }
@keyframes speak-now { 0% { bottom:0px; } 15% { bottom:${$singleAvatarJumpingHeight.val()}${$unitList.val()}; } 30% { bottom:0px; } }
body { top: ${$singleAvatarJumpingHeight.val()}${$unitList.val()}; }
li.voice-state:not([data-reactid*="${$singleDiscordUserID.val()}"]) { display:none; }
.avatar[data-reactid*="${$singleDiscordUserID.val()}"] { background-image: url(${$singleDiscordAvatarLinkPassive.val()}); }
.avatar.speaking[data-reactid*="${$singleDiscordUserID.val()}"] { background-image: url(${$singleDiscordAvatarLinkActive.val()}); }`;
                    break;
                case 'paulvonlecter1x1':
                    constructedCSS =
`body { overflow-y:hidden; display:block; position:absolute; bottom:0; left:0; right:0; height:100%; }
.voice-container .voice-states .voice-state .user { display:none!important; }
ul.voice-states { display:flex!important; width:100%!important; max-width:100%!important; padding:0!important; justify-content:flex-start; vertical-align:bottom; margin:0!important; height:100%!important; position:absolute; top:0; bottom:0; left:0; right:0; }
li.voice-state { width:100%!important; height:100%!important; margin:0!important; }
img.avatar { height:auto!important; max-height:100%!important; width:auto!important; max-width:100%!important; border-radius:0!important; margin:0!important; border:none!important; transition: filter .1s linear; background-size:auto 100%; background-repeat:no-repeat; filter: brightness(${$singleAvatarBrightness.val()}%); text-align:center; content:url(https://cdn.discordapp.com/attachments/754812012441239632/754817529674727515/Transparent-1024x1024.png); }
img.avatar.speaking { border-color:rgba(0,0,0,0)!important; position:relative!important; animation-name: speak-now; animation-duration: 1s; animation-fill-mode:forwards; filter: brightness(100%); }
@keyframes speak-now { 0% { bottom:0px; } 15% { bottom:${$singleAvatarJumpingHeight.val()}${$unitList.val()}; } 30% { bottom:0px; } }
body { top: ${$singleAvatarJumpingHeight.val()}${$unitList.val()}; }
li.voice-state:not([data-reactid*="${$singleDiscordUserID.val()}"]) { display:none; }
.avatar[data-reactid*="${$singleDiscordUserID.val()}"] { background-image: url(${$singleDiscordAvatarLinkPassive.val()}); }
.avatar.speaking[data-reactid*="${$singleDiscordUserID.val()}"] { background-image: url(${$singleDiscordAvatarLinkActive.val()}); }`;
                    break;
            }
            break;
        case 'multiple':

            break;
    }
    // Сброс в поле
    $CSSCodeResult.val(constructedCSS);
    // Выход из функции
    return false;
});
// Templates
