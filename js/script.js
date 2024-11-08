const clickImage = document.getElementById("click-image");
const moneyDisplay = document.getElementById("money").querySelector("b");
const achievementDisplay = document.getElementById("grats").querySelector("b");
const shopBtn = document.getElementById("shop-btn");
const shop = document.getElementById("shop");
const buyTankBtn = document.getElementById("buy-tank-btn");
const gunUpgradeBtn = document.getElementById("gun-upgrade-btn");
const turretUpgradeBtn = document.getElementById("turret-upgrade-btn");
const radioUpgradeBtn = document.getElementById("radio-upgrade-btn");
const engineUpgradeBtn = document.getElementById("engine-upgrade-btn");
const tracksUpgradeBtn = document.getElementById("tracks-upgrade-btn");
const resetBtn = document.getElementById("reset-btn");

let points = 0;
let pointsPerClick = 100;
let upgradeCost = 1000;
let gunLevel = 0;
let turretLevel = 0;
let radioLevel = 0;
let engineLevel = 0;
let tracksLevel = 0;
let upgradeLevel = 1; // Додана змінна
let autoclickInterval = null;
let autoclickSpeed = 1000;
let autoclickerEnabled = false;
let autoclickerInterval;

const upgradeImages = [
    "./img/ms-1.png",
    "/img/bt-2.png",
    "./img/bt-5.png",
    "./img/t-28.png",
    "./img/kv-1.png",
    "./img/kv-1c.png",
    "./img/is-1.png",
    "./img/is-3.png",
    "./img/ob-257.png",
    "./img/is-7.png"
];

// Обновление отображения очков и улучшений
function updateDisplay() {
    moneyDisplay.textContent = points;
    document.getElementById("gun-level").textContent = gunLevel;
    document.getElementById("turret-level").textContent = turretLevel;
    document.getElementById("radio-level").textContent = radioLevel;
    document.getElementById("engine-level").textContent = engineLevel;
    document.getElementById("tracks-level").textContent = tracksLevel;
    document.getElementById("upgrade-cost").textContent = upgradeCost;
}

// Загрузка данных при загрузке страницы
function loadGame() {
    const savedPoints = localStorage.getItem("points");
    const savedPointsPerClick = localStorage.getItem("pointsPerClick");
    const savedUpgradeCost = localStorage.getItem("upgradeCost");

    if (savedPoints) points = parseInt(savedPoints);
    if (savedPointsPerClick) pointsPerClick = parseInt(savedPointsPerClick);
    if (savedUpgradeCost) upgradeCost = parseInt(savedUpgradeCost);

    updateDisplay();
}

// Сохранение данных в localStorage
function saveGame() {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("gunLevel", gunLevel);
    localStorage.setItem("turretLevel", turretLevel);
    localStorage.setItem("radioLevel", radioLevel);
    localStorage.setItem("engineLevel", engineLevel);
    localStorage.setItem("tracksLevel", tracksLevel);
}
// Функция для отображения сообщения с угасанием
function showMessage(element, message) {
    element.textContent = message;
    element.classList.add("fade-out");
    // Убираем текст после завершения анимации угасания
    setTimeout(() => {
        element.textContent = "";
        element.classList.remove("fade-out");
    }, 2000);
}
// Обновление изображения танка
function updateClickImage() {
    if (upgradeLevel - 1 < upgradeImages.length) {
        clickImage.src = upgradeImages[upgradeLevel - 1];
    }
}   
// Обработка клика на изображение (добавляет очки)
clickImage.addEventListener("click", () => {
    points += pointsPerClick;
    updateDisplay();
    saveGame();
});
// Функция для обработки автокликера
function startAutoclicker() {
    if (!autoclickInterval) {
        autoclickInterval = setInterval(() => {
            points += pointsPerClick;
            updateDisplay();
            saveGame();
        }, autoclickSpeed);
    }
} 

// Показ/скрытие магазина
shopBtn.addEventListener("click", () => {
    shop.style.display = shop.style.display === "none" ? "block" : "none";
});

// Обработка покупки нового танка
buyTankBtn.addEventListener("click", () => {
    if (points >= upgradeCost && gunLevel >= 3 && turretLevel >= 1 && radioLevel >= 1 && engineLevel >= 1 && tracksLevel >= 1) {
        points -= upgradeCost;
        upgradeCost = Math.floor(upgradeCost * 1.5);
        gunLevel = 0;
        turretLevel = 0;
        radioLevel = 0;
        engineLevel = 0;
        tracksLevel = 0;
        pointsPerClick += 1;
        upgradeLevel += 1; // Зміна рівня апгрейду
        updateDisplay();
        updateClickImage(); // Оновлення зображення після покупки танка
        saveGame();
        showMessage(achievementDisplay, "Congratulations! You bought a new tank!");
    } else {
        showMessage(achievementDisplay, "You need to upgrade all parts to the required level!");
    }
});

// Улучшение ствола (увеличивает поинты за клик)
gunUpgradeBtn.addEventListener("click", () => {
    const gunCost = parseInt(document.getElementById("gun-cost").textContent);
    if (points >= gunCost) {
        points -= gunCost;
        pointsPerClick += 1;
        gunLevel += 1;
        document.getElementById("gun-cost").textContent = Math.floor(gunCost * 1.5);
        updateDisplay();
        saveGame();
        showMessage(achievementDisplay, "Gun upgraded!");
    } else {
        showMessage(achievementDisplay, "Not enough points for gun upgrade!");
    }
});

// Улучшение башни (удваивает поинты за клик)
turretUpgradeBtn.addEventListener("click", () => {
    const turretCost = parseInt(document.getElementById("turret-cost").textContent);
    if (points >= turretCost) {
        points -= turretCost;
        pointsPerClick *= 2;
        turretLevel += 1;
        document.getElementById("turret-cost").textContent = Math.floor(turretCost * 1.5);
        updateDisplay();
        saveGame();
        showMessage(achievementDisplay, "Turret upgraded!");
    }else {
        showMessage(achievementDisplay, "Not enough points for turret upgrade!");
    }
});

// Улучшение радиостанции (включает автокликер)
radioUpgradeBtn.addEventListener("click", () => {
    const radioCost = parseInt(document.getElementById("radio-cost").textContent);
    if (points >= radioCost) {
        points -= radioCost;
        radioLevel += 1;
        document.getElementById("radio-cost").textContent = Math.floor(radioCost * 1.5);
        startAutoclicker();
        updateDisplay();
        saveGame();
        showMessage(achievementDisplay, "Radio upgraded!");
    }else {
        showMessage(achievementDisplay, "Not enough points for radio upgrade!");
    }
});

// Улучшение двигателя (ускоряет автокликер)
engineUpgradeBtn.addEventListener("click", () => {
    const engineCost = parseInt(document.getElementById("engine-cost").textContent);
    if (points >= engineCost) {
        points -= engineCost;
        engineLevel += 1;
        autoclickSpeed = Math.max(1000, autoclickSpeed - 500);
        clearInterval(autoclickInterval);
        startAutoclicker();
        document.getElementById("engine-cost").textContent = Math.floor(engineCost * 1.5);
        updateDisplay();
        saveGame();
        showMessage(achievementDisplay, "Engine upgraded!");
    }else {
        showMessage(achievementDisplay, "Not enough points for engine upgrade!");
    }
});

// Улучшение гусениц (разрешает дальнейшее улучшение)
tracksUpgradeBtn.addEventListener("click", () => {
    const tracksCost = parseInt(document.getElementById("tracks-cost").textContent);
    if (points >= tracksCost) {
        points -= tracksCost;
        tracksLevel += 1;
        document.getElementById("tracks-cost").textContent = Math.floor(tracksCost * 1.5);
        updateDisplay();
        saveGame();
        showMessage(achievementDisplay, "Tracks upgraded!");
    }else {
        showMessage(achievementDisplay, "Not enough points for tracks upgrade!");
    }
});

// Сброс игры
resetBtn.addEventListener("click", () => {
    points = 0;
    pointsPerClick = 1;
    upgradeCost = 1000;
    gunLevel = 0;
    turretLevel = 0;
    radioLevel = 0;
    engineLevel = 0;
    tracksLevel = 0;
    clearInterval(autoclickInterval);
    autoclickInterval = null;
    autoclickSpeed = 1000;
    localStorage.clear();
    updateDisplay();
    achievementDisplay.textContent = "Game reset!";
    setTimeout(() => achievementDisplay.textContent = "", 3000);
});

loadGame();
