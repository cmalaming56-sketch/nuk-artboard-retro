import fs from 'fs';

function runNukEngine(nukFile) {
    try {
        const rawCode = fs.readFileSync(nukFile, 'utf-8');
        let canvasSection = "";
        let twitterSection = "";

        if (rawCode.includes("CREATE_DRAWING_TOOLS")) {
            canvasSection = `
            <div style="text-align:center; padding:20px; background:#111; color:#00ffcc; font-family:sans-serif; border-bottom:2px solid #00ffcc;">
                <h1>🚀 Nuk-Artboard-Retro [Nuk Script V2.3 - Final Build]</h1>
                <p style="color:#aaa; margin:5px 0 0 0;">ปลดล็อกกล่องเครื่องมือครอบจักรวาล: ดินสอ ยางลบ ถังสี และตัวปรับขนาดเส้น</p>
            </div>
            
            <!-- 🛠️ แผงเครื่องมือดีไซเนอร์ (ทลายบั๊กแคชดักจอมืด) -->
            <div style="display:flex; justify-content:center; gap:12px; background:#222; padding:12px; border-bottom:1px solid #333; font-family:sans-serif; color:#fff; align-items:center; flex-wrap:wrap;">
                <button id="toolPencil" onclick="setTool('pencil')" style="padding:6px 15px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer; transition:0.2s;">✏️ ดินสอ</button>
                <button id="toolEraser" onclick="setTool('eraser')" style="padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; transition:0.2s;">🧼 ยางลบ</button>
                <button id="toolBucket" onclick="setTool('bucket')" style="padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; transition:0.2s;">🪣 ถังสี</button>
                
                🎨 สีหมึก: <input type="color" id="penColor" value="#1a1a1a" style="cursor:pointer; border:none; background:none;">
                
                📏 ขนาดเส้น: <input type="range" id="penSize" min="1" max="50" value="6" style="cursor:pointer;">
                <span id="sizeDisplay" style="background:#333; padding:2px 8px; border-radius:4px; color:#00ffcc; font-weight:bold; font-size:14px;">6px</span>
                
                <button id="saveImgBtn" style="padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold; margin-left:20px;">💾 เซฟรูปภาพลง SSD</button>
                <button onclick="clearCanvas()" style="padding:6px 15px; background:#522; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold;">🧹 ล้างกระดาน</button>
            </div>

            <div style="display:flex; justify-content:center; background:#1a1a1a; padding:15px;">
                <canvas id="canvas" width="800" height="400" style="background:#fff; border:3px dashed #00ffcc; cursor:crosshair; box-shadow:0 4px 15px rgba(0,0,0,0.5);"></canvas>
            </div>
            <script>
                const cvs = document.getElementById('canvas');
                const ctx = cvs.getContext('2d');
                let draw = false;
                let currentTool = 'pencil'; 

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

                // กลไกการสลับสิทธิ์เปลี่ยนสีปุ่มและโหมดแปรงวาด
                function setTool(tool) {
                    currentTool = tool;
                    document.getElementById('toolPencil').style.background = (tool === 'pencil') ? '#00ffcc' : '#333';
                    document.getElementById('toolPencil').style.color = (tool === 'pencil') ? '#000' : '#fff';
                    document.getElementById('toolEraser').style.background = (tool === 'eraser') ? '#00ffcc' : '#333';
                    document.getElementById('toolEraser').style.color = (tool === 'eraser') ? '#000' : '#fff';
                    document.getElementById('toolBucket').style.background = (tool === 'bucket') ? '#00ffcc' : '#333';
                    document.getElementById('toolBucket').style.color = (tool === 'bucket') ? '#000' : '#fff';
                }

                cvs.addEventListener('mousedown', () => {
                    if (currentTool === 'bucket') {
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
                    
                    // ถ้ายางลบทำงาน บังคับระบายสีขาวลบเส้น [A]
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
                    link.download = 'nuk-artwork.png';
                    link.href = cvs.toDataURL('image/png');
                    link.click();
                });
            </script>
            `;
        }

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
                    <!-- พื้นที่โหลดฟีดข้อมูลประวัติถาวร -->
                </div>
            </div>

            <script>
                const feed = document.getElementById('twitterFeed');
                
                function loadStorageData() {
                    const localDB = localStorage.getItem('nuk_tweets_db');
                    if (localDB && localDB.trim() !== "") {
                        feed.innerHTML = localDB;
                    } else {
                        feed.innerHTML = \`<div style="padding:15px; border-bottom:1px solid #222; font-size:14px; line-height:1.5;"><small style="color:#888;">[ระบบฐานข้อมูลวิจัย - 11 ตุลาคม 2569]</small><br>🤖 ยินดีต้อนรับสู่ระบบข้อมูลกลางวิจัยของ Nuk Script V2.3 ค่ะ! ข้อมูลประวัติการโพสต์แนบภาพจะถูกล็อกเก็บลงหน่วยความจำเครื่องของสหายแบบถาวรแล้วค่ะ!</div>\`;
                    }
                }

                function sendTweet() {
                    const txtInput = document.getElementById('tweetText');
                    const imgInput = document.getElementById('tweetImage');
                    if (!txtInput.value.trim() && imgInput.files.length === 0) return;

                    const tweetItem = document.createElement('div');
                    tweetItem.style.padding = '15px';
                    tweetItem.style.borderBottom = '1px solid #222';
                    tweetItem.style.fontSize = '14px';
                    tweetItem.style.lineHeight = '1.5';
                    const timeString = new Date().toLocaleString('th-TH');

                    if (imgInput.files && imgInput.files) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            let imgHtml = '<br><img src="' + e.target.result + '" style="max-width:100%; max-height:300px; margin-top:10px; border-radius:4px; border:1px solid #333;">';
                            tweetItem.innerHTML = '<small style="color:#888;">[' + timeString + ' - นิรนามสหาย]</small><br>' + txtInput.value + imgHtml;
                            feed.insertBefore(tweetItem, feed.firstChild);
                            localStorage.setItem('nuk_tweets_db', feed.innerHTML);
                        }
                        reader.readAsDataURL(imgInput.files);
                    } else {
