/**
 * Template for CSS constructor
 * Set of replacement fields
 * @param ___DiscordUserID___ @required Discord UID
 * @param ___DiscordAvatarLinkPassive___ @required URL for passive avatar
 * @param ___DiscordAvatarLinkActive___ @required URL for active avatar
 * @param ___AvatarBrightness___ @required Brightness for passive state
 * @param ___AvatarJumpingHeight___ How much this avatar will jump (numbers only)
 * @param ___AvatarJumpingHeightUnits___ Unit selector
 */
let constructorTemplates = Array();
// Original template
constructorTemplates.push({
    'key':'jiinh',
    'title':'Jiinh (original)',
    'code':
`li.voice-state:not([data-reactid*="___DiscordUserID___"]) { display:none; }
.avatar {
    content: url(___DiscordAvatarLinkPassive___);
    height: auto !important;
    width: auto !important;
    border-radius: 0% !important;
    filter: brightness(___AvatarBrightness___%);
}
.speaking {
    border-color: rgba(0,0,0,0) !important;
    position: relative;
    animation-name: speak-now;
    animation-duration: 1s;
    animation-fill-mode:forwards;
    filter: brightness(100%);
    content:url(___DiscordAvatarLinkActive___);
}
@keyframes speak-now {
    0% { bottom: 0px; }
    15% { bottom: 10px; }
    30% { bottom: 0px; }
}
li.voice-state{ position: static; }
div.user{ position: absolute; left:40%; bottom:5%; }
body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }`});
// Paul von Lecter's Templates
constructorTemplates.push({
    'key':'paulvonlecter3x4',
    'title':'Paul von Lecter (3:4 avatars)',
    'code':
`body { overflow-y:hidden; display:block; position:absolute; bottom:0; left:0; right:0; height:100%; }
.voice-container .voice-states .voice-state .user { display:none!important; }
ul.voice-states { display:flex!important; width:100%!important; max-width:100%!important; padding:0!important; justify-content:flex-start; vertical-align:bottom; margin:0!important; height:100%!important; position:absolute; top:0; bottom:0; left:0; right:0; }
li.voice-state { display:block; position:relative; width:100%!important; height:100%!important; margin:0!important; }
img.avatar { position:absolute; bottom:0; height:100%!important; max-height:100%!important; width:auto!important; max-width:100%!important; border-radius:0!important; margin:0!important; border:none!important; transition: filter .1s linear; background-size:auto 100%; background-position:bottom center; background-repeat:no-repeat; filter: brightness(___AvatarBrightness___%); text-align:center; content:url(https://cdn.discordapp.com/attachments/767463273728835594/783857139109330994/Transparent-300x400.png); }
img.avatar.speaking { border-color:rgba(0,0,0,0)!important; animation-name: speak-now; animation-duration: 1s; animation-fill-mode:forwards; filter: brightness(100%); }
@keyframes speak-now { 0% { bottom:0px; } 15% { bottom:___AvatarJumpingHeight______AvatarJumpingHeightUnits___; } 30% { bottom:0px; } }
body { top: ___AvatarJumpingHeight______AvatarJumpingHeightUnits___; }`,
    'multiple':`
.avatar[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkPassive___); }
.avatar.speaking[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkActive___); }`,
    'single':`
.avatar[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkPassive___); }
.avatar.speaking[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkActive___); }
li.voice-state:not([data-reactid*="___DiscordUserID___"]) { display:none; }`,
});
constructorTemplates.push({
    'key':'paulvonlecter1x1',
    'title':'Paul von Lecter (1:1 avatars)',
    'code':
`body { overflow-y:hidden; display:block; position:absolute; bottom:0; left:0; right:0; height:100%; }
.voice-container .voice-states .voice-state .user { display:none!important; }
ul.voice-states { display:flex!important; width:100%!important; max-width:100%!important; padding:0!important; justify-content:flex-start; vertical-align:bottom; margin:0!important; height:100%!important; position:absolute; top:0; bottom:0; left:0; right:0; }
li.voice-state { display:block; position:relative; width:100%!important; height:100%!important; margin:0!important; }
img.avatar { position:absolute; bottom:0; height:100%!important; max-height:100%!important; width:auto!important; max-width:100%!important; border-radius:0!important; margin:0!important; border:none!important; transition: filter .1s linear; background-size:auto 100%; background-position:bottom center; background-repeat:no-repeat; filter: brightness(___AvatarBrightness___%); text-align:center; content:url(https://cdn.discordapp.com/attachments/767463273728835594/783857191706165248/Transparent-1024x1024.png); }
img.avatar.speaking { border-color:rgba(0,0,0,0)!important; animation-name: speak-now; animation-duration: 1s; animation-fill-mode:forwards; filter: brightness(100%); }
@keyframes speak-now { 0% { bottom:0px; } 15% { bottom:___AvatarJumpingHeight______AvatarJumpingHeightUnits___; } 30% { bottom:0px; } }
body { top: ___AvatarJumpingHeight______AvatarJumpingHeightUnits___; }`,
    'multiple':
`.avatar[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkPassive___); }
.avatar.speaking[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkActive___); }`,
    'single':
`.avatar[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkPassive___); }
.avatar.speaking[data-reactid*="___DiscordUserID___"] { background-image: url(___DiscordAvatarLinkActive___); }
li.voice-state:not([data-reactid*="___DiscordUserID___"]) { display:none; }`,
});
