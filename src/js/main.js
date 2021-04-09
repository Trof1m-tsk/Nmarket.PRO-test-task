const showPopupBtn = document.querySelector('.main__btn');
const main = document.querySelector('.main');
const popupTemplate = document.querySelector('#popup').content.querySelector('.popup');

function onClickClosePopup() {
    document.querySelector('.popup__close_btn')
        .removeEventListener('click', onClickClosePopup);
    document.removeEventListener('keydown', onEscClosePopup);
    unrenderPopup();
}
    
function onEscClosePopup(evt) {
    if (evt.key === 'Escape') {
        document.querySelector('.popup__close_btn')
            .removeEventListener('click', onClickClosePopup);
        document.removeEventListener('keydown', onEscClosePopup);
        unrenderPopup();
    }
}

function showPopup() {
    document.querySelector('.popup').classList.add('popup__shown');
}

function hidePopup() {
    document.querySelector('.popup').classList.remove('popup__shown');
}

function renderPopup() {
    main.appendChild(popupTemplate.cloneNode(true));
    document.querySelector('.popup__close_btn')
        .addEventListener('click', onClickClosePopup);
    document.addEventListener('keydown', onEscClosePopup);
    setTimeout(() => showPopup(), 200);
}

function unrenderPopup() {
    hidePopup();
    setTimeout(() => {
        main.removeChild(main.querySelector('.popup'));
    }, 200);
}

showPopupBtn.addEventListener('click', () => {
    if (!document.querySelector('.popup')) renderPopup();
});
