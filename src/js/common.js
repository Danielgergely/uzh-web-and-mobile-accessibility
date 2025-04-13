/**
 * Toggle the current clicked menu and close the other menus
 * @param {object} toggle - The toggle element
 * @param {object} menu - The menu element
 */
function toggleMenu(toggle, menu) {
    const isOpen = menu.classList.contains('show');

    // Close all menus first
    const allMenus = document.querySelectorAll('#nav-bar-content .dropdown-menu');
    const allToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');
    allMenus.forEach(m => m.classList.remove('show'));
    allToggles.forEach(t => t.setAttribute('aria-expanded', 'false'));

    // Then toggle current
    if (!isOpen) {
        menu.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
    }
}

/**
 * Close the menu
 * @param toggle - The toggle element
 * @param menu - The menu element
 */
function closeMenu(toggle, menu) {
    menu.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
}

/**
 * Toggle the navigation content
 * @param {object} event - The DOM event
 */
function toggleNavigation(event) {
    event.stopPropagation();
    event.preventDefault();

    const content = document.getElementById('nav-bar-content');
    if (content.classList.contains('collapse')) {
        content.classList.remove('collapse');
    } else {
        content.classList.add('collapse');
    }
}

/**
 * This function is used to handle the showing/hiding of the submenus through click or keypress.
 */
document.addEventListener('DOMContentLoaded', function () {
    const dropDownToggles = document.querySelectorAll('#nav-bar-content .dropdown-toggle');

    dropDownToggles.forEach((toggle) => {
        const menu = toggle.parentNode.querySelector('.dropdown-menu');
        console.log(menu)

        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            toggleMenu(toggle, menu);
        });

        toggle.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                toggleMenu(toggle, menu);
            }
        });

        // Focusout: close when tabbing away
        toggle.parentNode.addEventListener('focusout', function () {
            setTimeout(() => {
                if (!toggle.parentNode.contains(document.activeElement)) {
                    closeMenu(toggle, menu);
                }
            }, 0);
        });
    });

    // Escape closes open menu
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            const openMenus = document.querySelectorAll('.dropdown-menu.show');
            openMenus.forEach(menu => {
                const toggle = menu.closest('.nav-item.dropdown').querySelector('.dropdown-toggle');
                closeMenu(toggle, menu);
                toggle.focus();
            });
        }
    });

    // Mobile nav toggle
    document.querySelector('.navbar-toggler')
        .addEventListener('click', toggleNavigation, false);
});
/**
 * This function is used to close the dropdown menu when the Escape key is pressed.
 */
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        const openMenus = document.querySelectorAll('.dropdown-menu.show');

        openMenus.forEach(menu => {
            const parentDropdown = menu.closest('.nav-item.dropdown');
            const toggle = parentDropdown.querySelector('.dropdown-toggle');

            menu.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');

            toggle.focus();
        });
    }
});


// this function is used to increase/decrease the font size
// if font size is changed on one page it should also be changed on other pages
(function () {
  const root = document.documentElement;
  const FONT_SIZE_KEY = 'fontSizePercentage';

  // Load font size from localStorage if available
  let currentSize = parseInt(localStorage.getItem(FONT_SIZE_KEY)) || 100;
  root.style.fontSize = currentSize + '%';

  function updateFontSize(change) {
    currentSize = Math.min(200, Math.max(50, currentSize + change));
    root.style.fontSize = currentSize + '%';
    localStorage.setItem(FONT_SIZE_KEY, currentSize);
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#font-increase-button, #font-increase-button-1').forEach(btn => {
      btn.addEventListener('click', () => updateFontSize(10));
    });

    document.querySelectorAll('#font-decrease-button, #font-decrease-button-1').forEach(btn => {
      btn.addEventListener('click', () => updateFontSize(-10));
    });
  });
})();

