"use-strict";

const cardEffect = () => {
    const cards = document.getElementsByClassName('pokemonCard');
    Array.prototype.forEach.call(cards, card => {
        const buttonFlip = card.children[0].children[2];
        const backCard = card.children[0].children[1];
        buttonFlip.addEventListener('click', flip => {
            card.style.transform = 'scale(1.1) rotateY(180deg)';
        });
        
        card.onmouseenter = cardupper = () => {
            card.style.transform = 'scale(1.1)';
        }

        card.onmouseleave = backflip = () => {
            card.style.transform = 'scale(1.0) rotateY(0deg)';
        }
    });
}