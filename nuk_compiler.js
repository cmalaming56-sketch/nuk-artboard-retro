import fs from 'fs';
import path from 'path';

// ฟังก์ชันแกนสมองของ Nuk Script ทำหน้าที่หั่นคำและแปลภาษา (Nuk Compiler)
function compileNukScript(nukFilePath) {
    try {
        const rawCode = fs.readFileSync(nukFilePath, 'utf-8');
        let htmlOutput = "";
        let canvasScript = "";

        // ไล่เช็กคำสั่งกวนๆ ใน Nuk Script ทีละบรรทัด
        if (rawCode.includes("🎨กางผ้าใบวาดรูป")) {
            htmlOutput += `
            <div style="text-align:center; padding:15px; background:#111; color:#00ffcc; font-family:sans-serif;">
                <h2>🚀 ยินดีต้อนรับสู่บอร์ดวาดรูปคลาสสิก ขับเคลื่อนด้วย [Nuk Script V1.0]</h2>
                <p>สหายลากเมาส์วาดรูป 2D ลงบอร์ดโบราณนี้ได้เลย แฮกเกอร์สาย Python เจาะระบบนี้ไม่ได้แน่นอน!</p>
            </div>
            <div style="display:flex; justify-content:center; background:#1a1a1a; padding:20px;">
                <canvas id="nukCanvas" width="800" height="500" style="border:3px dashed #00ffcc; background:#fff; cursor:crosshair;"></canvas>
            </div>
            `;

            canvasScript = `
            <script>
                const canvas = document.getElementById('nukCanvas');
                const ctx = canvas.getContext('2d');
                let isDrawing = false;

                canvas.addEventListener('mousedown', () => isDrawing = true);
                canvas.addEventListener('mouseup', () => { ctx.beginPath(); isDrawing = false; });
                canvas.addEventListener('mousemove', draw);

                function draw(e) {
                    if(!isDrawing) return;
                    const rect = canvas.getBoundingClientRect();
                    ctx.lineWidth = 6;
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = '#1a1a1a';
                    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                }
            </script>
            `;
        }

        if (rawCode.includes("💾ผูกฐานข้อมูลผี")) {
            htmlOutput += `
            <div style="max-width:800px; margin:20px auto; background:#222; padding:20px; border-radius:8px; color:#fff; font-family:sans-serif;">
                <h3>💬 กระดานแลกเปลี่ยนข้อมูลสไตล์อีเมลคลาสสิก (Anonymous Board)</h3>
                <textarea placeholder="พิมพ์ข้อความคอมเมนต์ส่งหาเพื่อน..." style="width:100%; height:80px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; padding:10px;"></textarea>
                <button style="margin-top:10px; padding:10px 20px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">ส่งข้อมูลเข้าบอร์ด</button>
            </div>
            `;
        }

        const fullWebPage = `
        <!DOCTYPE html>
        <html>
        <head><title>Nuk Script App</title></head>
        <body style="margin:0; background:#1a1a1a;">
            \${htmlOutput}
            \${canvasScript}
        </body>
        </html>
        `;

        fs.writeFileSync('./index.html', fullWebPage, 'utf-8');
        console.log("[NUK SUCCESS] ระเบิดกฎเกณฑ์สำเร็จ! เสกภาษา Nuk Script ออกมาเป็นหน้าเว็บ 2D แฟลตฟอร์มเรียบร้อยครับสหาย!");
    } catch (err) {
        console.log("[NUK_COMPILER_ERROR] ระบบตรวจพบข้อผิดพลาด:", err.message);
    }
}

// สั่งรันตัวคอมไพเลอร์ให้อ่านไฟล์งานของคุณ
compileNukScript('./project.nuk');
