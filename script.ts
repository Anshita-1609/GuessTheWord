let btn = document.querySelector('button') as HTMLButtonElement;

function getSelectedMode(): string | undefined {
    const radios = document.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].id;
        }
    }
    return undefined;
}

btn.addEventListener('click', () => {
    const selectedMode = getSelectedMode();
    if (selectedMode) {
        localStorage.setItem('selectedMode', selectedMode);
       // alert(`Selected mode: ${selectedMode}`);
    } else {
        alert('No mode selected');
    }
    window.location.href="play.html";
});
