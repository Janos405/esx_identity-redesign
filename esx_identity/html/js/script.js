// Sound functions
function playHoverSound() {
    const sound = document.getElementById("hoverSound");
    sound.volume = 0.1;  // Set volume to 10% of the original sound
    sound.play();
}

function onKeySound() {
    const keySound = document.getElementById("keySound");
    keySound.src = `assets/key${Math.floor(Math.random() * 3) + 1}.mp3`; // Random key sound
    keySound.volume = 0.1;  // Set volume to 10%
    keySound.play();
}

// Event listener for enabling UI
window.addEventListener("message", (event) => {
    if (event.data.type === "enableui") {
        document.body.classList[event.data.enable ? "remove" : "add"]("none");
    }
});

// Event listener for form submission
document.querySelector("#register").addEventListener("submit", (event) => {
    event.preventDefault();

    const dofVal = document.querySelector("#dateofbirth").value;
    if (!dofVal) return;

    const dateCheck = new Date(dofVal);
    const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(dateCheck);
    const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(dateCheck);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(dateCheck);

    const formattedDate = `${day}/${month}/${year}`;
    fetch("http://esx_identity/register", {
        method: "POST",
        body: JSON.stringify({
            firstname: document.querySelector("#firstname").value,
            lastname: document.querySelector("#lastname").value,
            dateofbirth: formattedDate,
            sex: document.querySelector("input[type='radio'][name='sex']:checked").value,
            height: document.querySelector("#height").value,
        }),
    });

    document.querySelector("#register").reset();
});

// Fetch request to notify readiness
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://esx_identity/ready", {
        method: "POST",
        body: JSON.stringify({}),
    });
});

// Input handling with shake animation
function handleInput(inputElement) {
    const bgImg = document.querySelector('.bgimg');
    bgImg.classList.add('shake-animation');
    setTimeout(() => {
        bgImg.classList.remove('shake-animation');
    }, 100);
}

// Add hover sound effect to buttons and inputs, excluding radio buttons
const hoverElements = document.querySelectorAll('button, input[type="text"], input[type="date"], input[type="number"], select');
hoverElements.forEach(element => {
    element.addEventListener('mouseover', playHoverSound);
});

// Add key sound effect to inputs, excluding radio buttons
const inputFields = document.querySelectorAll('input[type="text"], input[type="date"], input[type="number"]');
inputFields.forEach(input => {
    input.addEventListener('input', onKeySound);
});

document.addEventListener('DOMContentLoaded', function() {
    const firstnameInput = document.querySelector('#firstname');
    const lastnameInput = document.querySelector('#lastname');
    const dobInput = document.querySelector('#dateofbirth');
    const heightInput = document.querySelector('#height');
    const cardName = document.querySelector('#card-name');
    const cardDob = document.querySelector('#card-dob');
    const cardHeight = document.querySelector('#card-height');
    const cardGender = document.querySelector('#card-gender');
    const heightValueDisplay = document.querySelector('#heightValue');

    // Update height value on slider change
    heightInput.addEventListener('input', function() {
        heightValueDisplay.textContent = heightInput.value;
    });

    // Form submit event listener
    document.querySelector('#register').addEventListener('submit', function(e) {
        e.preventDefault();

        cardName.textContent = `${firstnameInput.value} ${lastnameInput.value}`;
        cardDob.textContent = dobInput.value;
        cardHeight.textContent = heightInput.value;
        cardGender.textContent = document.querySelector("input[type='radio'][name='sex']:checked").value === 'm' ? 'Male' : 'Female';

        // Clear the form fields
        this.reset();
        heightValueDisplay.textContent = '180'; // Reset slider display
    });
});



