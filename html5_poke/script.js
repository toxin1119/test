const images = [
    'DATA/image1.png', // 替換為你的圖片路徑
    'DATA/image2.png',
    'DATA/image3.png',
    'DATA/image4.png'
];

const holeImage = 'DATA/break-hole.png'; // 破洞效果的圖片路徑

let gridSize = 9; // 設定格子數量
let prizeCount = 3; // 設定獎項數量
let prizes = [];

function startGame() {
    const container = document.getElementById('game-container');
    container.innerHTML = '';
    prizes = generatePrizes(gridSize, prizeCount);
    
    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;

        const img = document.createElement('img');
        img.src = images[Math.floor(Math.random() * images.length)]; // 隨機選擇圖片
        cell.appendChild(img);

        cell.addEventListener('click', () => {
            if (cell.dataset.clicked) return;
            const imgElement = cell.querySelector('img');
            imgElement.src = holeImage; // 更換為破洞效果的圖片
            cell.dataset.clicked = true;
            alert(prizes.includes(i) ? '恭喜你！你贏了！' : '沒有獎項，再試一次！');
        });

        container.appendChild(cell);
    }
}

function generatePrizes(gridSize, prizeCount) {
    const prizeIndices = new Set();
    while (prizeIndices.size < prizeCount) {
        prizeIndices.add(Math.floor(Math.random() * gridSize));
    }
    return Array.from(prizeIndices);
}

document.getElementById('start-button').addEventListener('click', startGame);
