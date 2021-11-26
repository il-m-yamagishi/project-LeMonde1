async function main() {
    let clickCount = 0;
    const countDom = document.querySelector('#count');
    const titleDom = document.querySelector('title');
    const ogTitleDom = document.querySelector('#og_title');

    updateCount();

    function updateCount() {
        countDom.innerText = clickCount.toLocaleString();
        titleDom.innerText = `${clickCount.toLocaleString()}回クリックされた猫`;
        ogTitleDom.innerText = `${clickCount.toLocaleString()}回クリックされた猫`;
    }

    function sendClick() {
        if (ws) {
            ws.send(JSON.stringify({action: 'click'}));
        }
    }

    function onClick(e) {
        e.preventDefault();
        clickCount++;
        sendClick();
        updateCount();
    };

    const catDom = document.querySelector('#cat');
    catDom.addEventListener('click', onClick);
    catDom.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    const host = location.origin.replace(/^http/, 'ws') + '/ws';
    const ws = new WebSocket(host);
    ws.onmessage = (ev) => {
        console.log('receive', ev);
        const payload = JSON.parse(ev.data);
        switch (payload.action) {
            case 'init':
                clickCount = payload.totalClicked;
                updateCount();
                break;
        }
    };
}

main();
