const menuContainer = document.getElementById('menu-container');
const apiUrl = "https://dropdownapi-production.up.railway.app";

function addMenu() {
    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = `
        <input type="text" placeholder="Menu Title" class="menu-title">
        <button onclick="addOption(this)">Add Option</button>
        <div class="options"></div>
    `;
    menuContainer.appendChild(menuDiv);
}

function addOption(button) {
    const optionsDiv = button.nextElementSibling;
    const optionDiv = document.createElement('div');
    optionDiv.innerHTML = `
        <input type="text" placeholder="Option Name">
        <input type="text" placeholder="Option Link">
        <button onclick="this.parentElement.remove()">Remove</button>
    `;
    optionsDiv.appendChild(optionDiv);
}

async function saveData() {
    const menus = [];
    document.querySelectorAll('#menu-container > div').forEach(menuDiv => {
        const title = menuDiv.querySelector('.menu-title').value;
        const options = Array.from(menuDiv.querySelectorAll('.options > div')).map(optionDiv => ({
            name: optionDiv.children[0].value,
            link: optionDiv.children[1].value
        }));
        menus.push({ title, options });
    });

    const response = await fetch(`${apiUrl}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menus),
    });

    if (response.ok) {
        alert("Menu> збережено успішно!");
    } else {
        alert("Сталася помилка під час збереження.");
    }
}