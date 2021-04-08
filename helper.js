function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}
var globalTimer = setInterval(function () {
    $(arrayRandElement($('.avatar'))).toggleClass('speaking');
}, 800);
