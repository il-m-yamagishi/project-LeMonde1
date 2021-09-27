
let clickCount = 0;
const countDom = document.querySelector('#count');
countDom.innerHTML = clickCount.toLocaleString();
const catDom = document.querySelector('#cat');
catDom.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    countDom.innerHTML = clickCount.toLocaleString();
});
catDom.addEventListener('dragstart', (e) => {
    e.preventDefault();
});
