var btn = document.querySelector('button');
function getSelectedMode() {
    var radios = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].id;
        }
    }
    return undefined;
}
btn.addEventListener('click', function () {
    var selectedMode = getSelectedMode();
    if (selectedMode) {
        localStorage.setItem('selectedMode', selectedMode);
        // alert(`Selected mode: ${selectedMode}`);
    }
    else {
        alert('No mode selected');
    }
    window.location.href = "play.html";
});
