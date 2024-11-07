const button = document.getElementById("btn");
const moneyDisplay = document.getElementById("money").querySelector("b");
const achievementDisplay = document.getElementById("grats").querySelector("b"); 

let points = 0;
let achievement = 0;
let pointsPerClick = 1;

button.addEventListener("click", () => {
    points += pointsPerClick;
    moneyDisplay.textContent = points;
    
    achievement += pointsPerClick;

    if (achievement === 100) {
        $('#grats').empty().show().html("Congratulations, +50 extra points!").delay(3000).fadeOut(500);
        points += 50;
        moneyDisplay.textContent = points;
        achievement = 0;
    }

    if (points % 200 === 0) {
        $('#grats').empty().show().html(`Congratulations, now ${pointsPerClick + 1} points per click!`).delay(3000).fadeOut(500);
        pointsPerClick += 1;
    }
});
