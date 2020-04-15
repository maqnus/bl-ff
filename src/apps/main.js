const toggler = document.getElementById('navbarDropdownMenuLink');
const box = document.getElementById("heiii");
    toggler.addEventListener('click', () => {
        box.dataset.toggle = toggler.dataset.toggle === "collapse" ? "expand" : "collapse";
        box.dataset.expand = toggler.dataset.expand === "true" ? "false" : "true";
        box.classList.toggle('collapse');
    });

