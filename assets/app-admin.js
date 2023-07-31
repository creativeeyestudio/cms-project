/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/admin/app.scss';

// start the Stimulus application
import './bootstrap';
import Sortable from 'sortablejs';


/* TABS
--------------------------------------------*/
var tabs = require('tabs');
var container = document.querySelector('.tab-container');

if (container != null) {
    tabs(container);
}


/* SORTABLE JS
--------------------------------------------*/
const dragDropList = document.querySelector('#drag-drop-list');
if (dragDropList) {
    document.addEventListener('DOMContentLoaded', () => {
        const sortable = new Sortable(dragDropList, {
            animation: 150,
            onEnd: (event) => {
                // Mettre à jour l'ordre des éléments après le glisser-déposer
                const lines = dragDropList.querySelectorAll('.line');
                lines.forEach((line, index) => {
                    line.dataset.order = index + 1;
                });
                changeOrderLinks();
            },
        });
    });
}

function changeOrderLinks() {
    const url = dragDropList.dataset.url;
    const lines = dragDropList.querySelectorAll('.line');
    const orderData = Array.from(lines).map((line) => ({
        id: line.dataset.id,
        order: line.dataset.order,
    }));

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
    })
    .then((response) => {
        console.log('Enregistrement de l\'ordre terminé : ', response);
    })
    .catch((error) => {
        console.error('Erreur lors de l\'enregistrement de l\'ordre :', error);
    });
}

/* SECTION - NAVIGATION
--------------------------------------------*/

// Sélecteur de menu
const navSelect = document.querySelector('.nav-select');
if (navSelect) {
    navSelect.addEventListener('change', function() {
        const navSelected = navSelect.value; 
        window.location.href = '/admin/navigation/' + navSelected;
    })
}

// Menus
const menuRemove = document.querySelectorAll('.menu-remove');
if (menuRemove.length > 0) {
    menuRemove.forEach((menu) => {
        menu.addEventListener('click', () => {
            const menuId = menu.dataset.id;
            const urlDel = menu.dataset.removeurl;
            fetch(urlDel, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menuId),
            })
            .then((response) => {
                const navLinkRemoved = document.querySelector(`.menu-${menuId}`);
                navLinkRemoved.style.display = 'none';
                navLinkRemoved.style.visibility = 'hidden';
                console.log('Suppression effectuée : ', response);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression :', error);
            });
        });
    });
}

// Liens
const navLinksRemove = document.querySelectorAll('.nav-remove');
if (navLinksRemove.length > 0 && dragDropList) {
    const urlDel = dragDropList.dataset.urldel;
    navLinksRemove.forEach((link) => {
        link.addEventListener('click', () => {
            const linkId = link.dataset.id;
            fetch(urlDel, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(linkId),
            })
            .then((response) => {
                const navLinkRemoved = document.querySelector(`.nav-link-${linkId}`);
                navLinkRemoved.style.display = 'none';
                navLinkRemoved.style.visibility = 'hidden';
                console.log('Suppression effectuée : ', response);
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression :', error);
            });
        });
    });
}