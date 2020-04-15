const navbarTogglers = document.querySelectorAll('.navbar-toggler');
for (const navbarToggler of navbarTogglers) {
  navbarToggler.addEventListener('click', () => {
    navbarToggler.dataset.toggle = navbarToggler.dataset.toggle === "collapse" ? "expand" : "collapse";
    navbarToggler.dataset.expand = navbarToggler.dataset.expand === "true" ? "false" : "true";
    document.querySelector(navbarToggler.dataset.target).classList.toggle('collapse');
    
  });
};

const dropdowns = document.querySelectorAll('.dropdown-toggle');
for (const dropdown of dropdowns) {
   
  const scope = dropdown.parentElement;
  scope.addEventListener('click', () => {
    dropdown.dataset.expand = dropdown.dataset.expand === "true" ? "false" : "true";
    scope.querySelector(".dropdown-menu").classList.toggle('show');
  });
};
