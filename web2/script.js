// script.js
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spin-button');
    const resultDiv = document.getElementById('result');
    const segments = 10; // 可調整的格子數量
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFBD33', '#33FFF7', '#8D33FF', '#FF9133'];
    const segmentAngle = 2 * Math.PI / segments;
    let currentAngle = 0;

    // 繪製輪盤
    function drawWheel() {
        for (let i = 0; i < segments; i++) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, segmentAngle * i, segmentAngle * (i + 1));
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.stroke();

            // 繪製文字
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(segmentAngle * (i + 0.5));
            ctx.textAlign = "right";
            ctx.fillStyle = "white";
            ctx.font = "bold 20px Arial";
            ctx.fillText(i + 1, canvas.width / 2 - 10, 10);
            ctx.restore();
        }
    }

    drawWheel();

    // 旋轉輪盤功能
    spinButton.addEventListener('click', () => {
        const randomDegree = Math.floor(Math.random() * 360) + 3600; // 旋轉至少10圈
        const randomAngle = randomDegree * (Math.PI / 180);
        const spinTime = 4000; // 旋轉時間與CSS transition相同

        const startTime = performance.now();
        function animate(time) {
            const elapsed = time - startTime;
            if (elapsed < spinTime) {
                const angle = easeOut(elapsed, 0, randomAngle, spinTime);
                currentAngle = angle;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.save();
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(currentAngle);
                ctx.translate(-canvas.width / 2, -canvas.height / 2);
                drawWheel();
                ctx.restore();
                requestAnimationFrame(animate);
            } else {
                const normalizedAngle = currentAngle % (2 * Math.PI);
                const winningIndex = Math.floor(segments - (normalizedAngle / segmentAngle)) % segments;
                resultDiv.innerHTML = `中獎號碼: ${winningIndex + 1}`;
            }
        }

        requestAnimationFrame(animate);
    });

    // 緩動函數
    function easeOut(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }
});