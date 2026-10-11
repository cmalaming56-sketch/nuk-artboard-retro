import fs from 'fs';

function runNukEngine(nukFile) {
    try {
        const rawCode = fs.readFileSync(nukFile, 'utf-8');
        let canvasSection = "";
        let twitterSection = "";

        // 🔒 เลเยอร์ที่ 1: แผงควบคุมกระดานวาดรูป 2D (พู่กัน ยางลบ ถังสี และระบบดึงไฟล์ในเครื่อง)
        if (rawCode.includes("CREATE_DRAWING_TOOLS")) {
            canvasSection = `
            <div style="text-align:center; padding:15px; background:#111; color:#00ffcc; font-family:sans-serif; border-bottom:2px solid #00ffcc;">
                <h2>🚀 Nuk-Artboard-Retro [Nuk Script V2.2 - Complete Edition]</h2>
                <p style="color:#aaa; margin:5px 0;">ระบบบอร์ดกระจายศูนย์ออฟไลน์ สมบูรณ์แบบด้วยกล่องเครื่องมือดีไซเนอร์และระบบจำฟีดถาวร</p>
            </div>
            
            <div style="display:flex; justify-content:center; gap:12px; background:#222; padding:10px; border-bottom:1px solid #333; font-family:sans-serif; color:#fff; align-items:center; flex-wrap:wrap;">
                <!-- ปุ่มสลับเครื่องมือวาด -->
                <button id="toolPencil" onclick="setTool('pencil')" style="padding:6px 12px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">✏️ ดินสอ</button>
                <button id="toolEraser" onclick="setTool('eraser')" style="padding:6px 12px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer;">🧼 ยางลบ</button>
                <button id="toolBucket" onclick="setTool('bucket')" style="padding:6px 12px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer;">🪣 ถังสี</button>
                
                🎨 สี: <input type="color" id="penColor" value="#1a1a1a" style="cursor:pointer; border:none; background:none;">
                
                📏 ขนาดเส้น: <input type="range" id="penSize" min="1" max="50" value="6" style="cursor:pointer;">
                <span id="sizeDisplay" style="background:#333; padding:2px 8px; border-radius:4px; color:#00ffcc; font-weight:bold; font-size:14px;">6px</span>
                
                <!-- 📂 ปุ่มเปิดไฟล์รูปภาพจากในเครื่องคอมพิวเตอร์ -->
                📂 เปิดไฟล์รูปภาพ: <input type="file" id="bgImageLoader" accept="image/*" style="font-size:12px; color:#aaa; cursor:pointer; width:150px;">

                <button id="saveImgBtn" style="padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold; margin-left:10px;">💾 เซฟรูปภาพลง SSD</button>
                <button onclick="clearCanvas()" style="padding:6px 15px; background:#522; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold;">🧹 ล้างกระดาน</button>
            </div>

            <div style="display:flex; justify-content:center; background:#1a1a1a; padding:15px;">
                <canvas id="canvas" width="800" height="400" style="background:#fff; border:3px dashed #00ffcc; cursor:crosshair; box-shadow:0 4px 15px rgba(0,0,0,0.5);"></canvas>
            </div>
            <script>
                const cvs = document.getElementById('canvas');
                const ctx = cvs.getContext('2d');
                let draw = false;
                let currentTool = 'pencil'; // ตัวแปรคุมสถานะเครื่องมือ

                function initCanvasBackground() {
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, cvs.width, cvs.height);
                }
                initCanvasBackground();

                const penSize = document.getElementById('penSize');
                const sizeDisplay = document.getElementById('sizeDisplay');
                penSize.addEventListener('input', (e) => {
                    sizeDisplay.textContent = e.target.value + "px";
                });

                // กลไกการสลับสิทธิ์ปุ่มเครื่องมือวาด
                function setTool(tool) {
                    currentTool = tool;
                    document.getElementById('toolPencil').style.background = (tool === 'pencil') ? '#00ffcc' : '#333';
                    document.getElementById('toolPencil').style.color = (tool === 'pencil') ? '#000' : '#fff';
                    document.getElementById('toolEraser').style.background = (tool === 'eraser') ? '#00ffcc' : '#333';
                    document.getElementById('toolEraser').style.color = (tool === 'eraser') ? '#000' : '#fff';
                    document.getElementById('toolBucket').style.background = (tool === 'bucket') ? '#00ffcc' : '#333';
                    document.getElementById('toolBucket').style.color = (tool === 'bucket') ? '#000' : '#fff';
                }

                // 📂 โค้ดกลไกการเปิดไฟล์รูปภาพจากในเครื่องขึ้นมาวาดทับ
                document.getElementById('bgImageLoader').addEventListener('change', function(e) {
                    if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            const img = new Image();
                            img.onload = function() {
                                // ปรับขนาดรูปภาพให้พอดีกับหน้าต่างกระดานผ้าใบ
                                ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
                            }
                            img.src = event.target.result;
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }
                });

                cvs.addEventListener('mousedown', () => {
                    if (currentTool === 'bucket') {
                        // ถ้าเลือกถังสี ให้เทสีที่เลือกราดเต็มพื้นหลังทันที
                        ctx.fillStyle = document.getElementById('penColor').value;
                        ctx.fillRect(0, 0, cvs.width, cvs.height);
                    } else {
                        draw = true;
                    }
                });
                
                cvs.addEventListener('mouseup', () => { ctx.beginPath(); draw = false; });
                cvs.addEventListener('mousemove', (e) => {
                    if(!draw || currentTool === 'bucket') return;
                    const r = cvs.getBoundingClientRect();
                    ctx.lineWidth = penSize.value;
                    ctx.lineCap = 'round';
                    
                    // ปรับสีหมึกตามเครื่องมือ (ยางลบสลัดสิทธิ์ใช้สีขาวลบเส้นออก)
                    ctx.strokeStyle = (currentTool === 'eraser') ? '#ffffff' : document.getElementById('penColor').value;
                    
                    ctx.lineTo(e.clientX - r.left, e.clientY - r.top);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
                });

                function clearCanvas() {
                    ctx.clearRect(0, 0, cvs.width, cvs.height);
                    initCanvasBackground();
                }

                document.getElementById('saveImgBtn').addEventListener('click', () => {
                    const link = document.createElement('a');
                    link.download = 'nuk-masterpiece.png';
                    link.href = cvs.toDataURL('image/png');
                    link.click();
                });
            </script>
            `;
        }

        // 💾 เลเยอร์ที่ 2: ฟีดทวิตเตอร์พร้อมระบบจำหน่วยความจำข้อมูลถาวรลง SSD (LocalStorage)
        if (rawCode.includes("ENABLE_TWITTER_FEED")) {
            twitterSection = `
            <div style="max-width:800px; margin:20px auto; background:#222; padding:20px; border-radius:8px; border:1px solid #333; color:#fff; font-family:sans-serif;">
                <h3>💬 กระดานโพสต์ข้อความพร้อมแนบรูปภาพ (X / Reddit Feed)</h3>
                <textarea id="tweetText" placeholder="สหายอยากแชร์ข้อความอะไรลงฟีด..." style="width:100%; height:70px; background:#333; color:#fff; border:1px solid #555; padding:10px; box-sizing:border-box; resize:none; border-radius:4px; font-size:14px;"></textarea>
                
                <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div>
                        🖼️ แนบไฟล์รูปภาพ: <input type="file" id="tweetImage" accept="image/*" style="font-size:12px; color:#aaa; cursor:pointer;">
                    </div>
                    <button onclick="sendTweet()" style="padding:10px 25px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">🚀 โพสต์ลงฟีด</button>
                </div>

                <div id="twitterFeed" style="margin-top:20px; max-height:400px; overflow-y:auto; background:#151515; padding:15px; border-radius:4px; border:1px solid #2a2a2a;">
                    <!-- โพสต์เริ่มต้นฐานวิจัย -->
                </div>
            </div>

            <script>
                const feed = document.getElementById('twitterFeed');

                // 💾 โดดดึงข้อมูลฟีดเก่าจากฮาร์ดดิสก์มาแสดงผลทุกครั้งที่เปิดหน้าแอป (Persistent Memory)
                function loadSavedTweets() {
                    const saved = localStorage.getItem('nuk_tweets_db');
                    if (saved) {
                        feed.innerHTML = saved;
                    } else {
                        feed.innerHTML = \`
                        <div style="padding:15px; border-bottom:1px solid #222; font-size:14px; line-height:1.5;">
                            <small style="color:#888;">[ระบบฐานข้อมูลผีถาวร - บ่ายวันที่ 11 ตุลาคม 2569]</small><br>
                            🤖 ยินดีต้อนรับเข้าสู่ระบบฐานข้อมูลวิจัยของ Nuk Script V2.2 ค่ะ! ตอนนี้ระบบมีหน่วยความจำถาวรในเครื่องแล้ว ลองเปิดไฟล์รูปภาพมาแต่ง หรือกดเทถังสี แล้วโพสต์ทดสอบความจำดูได้เลยค่ะ!
                        </div>\`;
                    }
                }

                function sendTweet() {
                    const txtInput = document.getElementById('tweetText');
