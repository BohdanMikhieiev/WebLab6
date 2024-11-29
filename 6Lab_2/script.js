const menuContainer = document.getElementById('menu-container');
const apiUrl = "https://dropdownapi-production.up.railway.app";

async function loadData() {
    const response = await fetch(`${apiUrl}/load`);
    const menus = await response.json();

    menuContainer.innerHTML = '';
    menus.forEach(menu => {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        const dropdownTitle = document.createElement('div');
        dropdownTitle.className = 'dropdown-title';
        dropdownTitle.textContent = menu.title;

        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';

        menu.options.forEach(option => {
            const link = document.createElement('a');
            link.href = option.link;
            link.textContent = option.name;
            dropdownContent.appendChild(link);
        });

        dropdown.appendChild(dropdownTitle);
        dropdown.appendChild(dropdownContent);
        menuContainer.appendChild(dropdown);
    });
}

setInterval(loadData, 5000);
loadData();