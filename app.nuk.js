import fs from 'fs';

function runNukEngineV3(nukFile) {
    try {
        const rawCode = fs.readFileSync(nukFile, 'utf-8');
        let canvasSection = "";
        let twitterSection = "";

        if (rawCode.includes("DEPLOY_MASTER_TOOLS")) {
            canvasSection = "<div style=\"text-align:center; padding:20px; background:#111; color:#00ffcc; font-family:sans-serif; border-bottom:2px solid #00ffcc;\">" +
                "<h1>🚀 Nuk-Artboard-Retro [Nuk Script V3.0 - Live Cloud]</h1>" +
                "<p style=\"color:#aaa; margin:5px 0 0 0;\">เวอร์ชันปลดล็อกบิ๊กดาต้า: ข้อมูลเชื่อมถึงกันทั่วโลกแบบเรียลไทม์ 24 ชม.</p>" +
                "</div>" +
                "<div style=\"display:flex; justify-content:center; gap:12px; background:#222; padding:12px; border-bottom:1px solid #333; font-family:sans-serif; color:#fff; align-items:center; flex-wrap:wrap; user-select:none;\">" +
                "<button id=\"toolPencil\" onclick=\"setTool('pencil')\" style=\"padding:6px 15px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer;\">✏️ ดินสอ</button>" +
                "<button id=\"toolEraser\" onclick=\"setTool('eraser')\" style=\"padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer;\">🧼 ยางลบ</button>" +
                "<button id=\"toolBucket\" onclick=\"setTool('bucket')\" style=\"padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer;\">🪣 ถังสี</button>" +
                " 🎨 เลือกสี: <input type=\"color\" id=\"penColor\" value=\"#1a1a1a\" style=\"cursor:pointer; border:none; background:none; vertical-align:middle;\">" +
                " 📏 ขนาดเส้น: <input type=\"range\" id=\"penSize\" min=\"1\" max=\"50\" value=\"6\" style=\"cursor:pointer; vertical-align:middle;\">" +
                "<span id=\"sizeDisplay\" style=\"background:#333; padding:2px 8px; border-radius:4px; color:#00ffcc; font-weight:bold; font-size:14px;\">6px</span>" +
                "<button id=\"saveImgBtn\" style=\"padding:6px 15px; background:#333; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold; margin-left:20px;\">💾 เซฟรูปภาพลง SSD</button>" +
                "<button onclick=\"clearCanvas()\" style=\"padding:6px 15px; background:#522; color:#fff; border:1px solid #555; border-radius:4px; cursor:pointer; font-weight:bold;\">🧹 ล้างกระดาน</button>" +
                "</div>" +
                "<div style=\"display:flex; justify-content:center; background:#1a1a1a; padding:15px;\">" +
                "<canvas id=\"canvas\" width=\"800\" height=\"400\" style=\"background:#fff; border:3px dashed #00ffcc; cursor:crosshair; box-shadow:0 4px 15px rgba(0,0,0,0.5);\"></canvas>" +
                "</div>" +
                "<script>" +
                "const cvs = document.getElementById('canvas');" +
                "const ctx = cvs.getContext('2d');" +
                "let draw = false; let currentTool = 'pencil';" +
                "function initCanvasBackground() { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cvs.width, cvs.height); }" +
                "initCanvasBackground();" +
                "const penSize = document.getElementById('penSize');" +
                "const sizeDisplay = document.getElementById('sizeDisplay');" +
                "penSize.addEventListener('input', (e) => { sizeDisplay.textContent = e.target.value + 'px'; });" +
                "function setTool(tool) {" +
                "currentTool = tool;" +
                "document.getElementById('toolPencil').style.background = (tool === 'pencil') ? '#00ffcc' : '#333';" +
                "document.getElementById('toolPencil').style.color = (tool === 'pencil') ? '#000' : '#fff';" +
                "document.getElementById('toolEraser').style.background = (tool === 'eraser') ? '#00ffcc' : '#333';" +
                "document.getElementById('toolEraser').style.color = (tool === 'eraser') ? '#000' : '#fff';" +
                "document.getElementById('toolBucket').style.background = (tool === 'bucket') ? '#00ffcc' : '#333';" +
                "document.getElementById('toolBucket').style.color = (tool === 'bucket') ? '#000' : '#fff';" +
                "}" +
                "cvs.addEventListener('mousedown', () => {" +
                "if (currentTool === 'bucket') {" +
                "ctx.fillStyle = document.getElementById('penColor').value;" +
                "ctx.fillRect(0, 0, cvs.width, cvs.height);" +
                "} else { draw = true; }" +
                "});" +
                "cvs.addEventListener('mouseup', () => { ctx.beginPath(); draw = false; });" +
                "cvs.addEventListener('mousemove', (e) => {" +
                "if(!draw || currentTool === 'bucket') return;" +
                "const r = cvs.getBoundingClientRect();" +
                "ctx.lineWidth = penSize.value;" +
                "ctx.lineCap = 'round';" +
                "ctx.strokeStyle = (currentTool === 'eraser') ? '#ffffff' : document.getElementById('penColor').value;" +
                "ctx.lineTo(e.clientX - r.left, e.clientY - r.top);" +
                "ctx.stroke(); ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);" +
                "});" +
                "function clearCanvas() { ctx.clearRect(0, 0, cvs.width, cvs.height); initCanvasBackground(); }" +
                "document.getElementById('saveImgBtn').addEventListener('click', () => {" +
                "const link = document.createElement('a');" +
                "link.download = 'nuk-masterpiece.png';" +
                "link.href = cvs.toDataURL('image/png');" +
                "link.click();" +
                "});" +
                "</script>";
        }

        if (rawCode.includes("OPEN_TWITTER_DATABASE")) {
            twitterSection = "<div style=\"max-width:800px; margin:20px auto; background:#222; padding:20px; border-radius:8px; border:1px solid #333; color:#fff; font-family:sans-serif;\">" +
                "<h3>💬 กระดานโพสต์ฟีดแชร์ข้อมูลออนไลน์ (Global Live Sync)</h3>" +
                "<textarea id=\"tweetText\" placeholder=\"สหายอยากแชร์ข้อความอะไรลงฟีดโลก...\" style=\"width:100%; height:70px; background:#333; color:#fff; border:1px solid #555; padding:10px; box-sizing:border-box; resize:none; border-radius:4px; font-size:14px;\"></textarea>" +
                "<div style=\"margin-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;\">" +
                "<div>🖼️ แนบไฟล์รูปภาพ: <input type=\"file\" id=\"tweetImage\" accept=\"image/*\" style=\"font-size:12px; color:#aaa; cursor:pointer;\"></div>" +
                "<button onclick=\"sendTweetToServer()\" style=\"padding:10px 25px; background:#00ffcc; color:#000; border:none; border-radius:4px; font-weight:bold; cursor:pointer;\">🚀 โพสต์ลงฟีดโลก</button>" +
                "</div>" +
                "<div style=\"margin-top:15px; text-align:right;\">" +
                "<button onclick=\"loadCloudTweets()\" style=\"padding:5px 15px; background:#444; color:#00ffcc; border:1px solid #00ffcc; border-radius:4px; font-size:12px; cursor:pointer; font-weight:bold;\">🔄 รีเฟรชดึงฟีดโลกสด</button>" +
                "</div>" +
                "<div id=\"twitterFeed\" style=\"margin-top:10px; max-height:400px; overflow-y:auto; background:#151515; padding:15px; border-radius:4px; border:1px solid #2a2a2a;\">" +
                "<div style=\"padding:10px; color:#888; text-align:center;\">กำลังเชื่อมต่อถังข้อมูลกลางไร้พรมแดน...</div>" +
                "</div>" +
                "</div>" +
                "<script>" +
                "const feed = document.getElementById('twitterFeed');" +
                "const BIN_URL = 'https://jsonbin.io';" +
                "const API_KEY = '$2a$10$U9X4fXfB.1zU0rR1G2GkkuH1b8vN3XqWvK2l6X2pD1E3W4Y5Z6X7W';" +
                "async function loadCloudTweets() {" +
                "try {" +
                "const res = await fetch(BIN_URL + '/latest', { headers: { 'X-Master-Key': API_KEY } });" +
                "const data = await res.json();" +
                "if (data.record && data.record.htmlData) { feed.innerHTML = data.record.htmlData; }" +
                "} catch (err) {" +
                "feed.innerHTML = '<div style=\"color:#ff3333; padding:10px;\">🔴 ระบบเชื่อมต่อคลาวด์สะดุด กรุณากดปุ่มรีเฟรชใหม่อีกครั้งค่ะ</div>';" +
                "}" +
                "}" +
                "async function sendTweetToServer() {" +
                "const txtInput = document.getElementById('tweetText');" +
                "const imgInput = document.getElementById('tweetImage');" +
                "if (!txtInput.value.trim() && imgInput.files.length === 0) return;" +
                "const timeString = new Date().toLocaleString('th-TH');" +
                "let imgHtml = '';" +
                "const processPost = async (finalImgHtml) => {" +
                "const newPostHtml = '<div style=\"padding:15px; border-bottom:1px solid #222; font-size:14px; line-height:1.5; background:#1e1e1e; margin-bottom:8px; border-radius:4px;\"><small style=\"color:#00ffcc;\">[' + timeString + ' - นิรนามสหาย]</small><br>' + txtInput.value + finalImgHtml + '</div>';" +
                "feed.insertAdjacentHTML('afterbegin', newPostHtml);" +
                "await fetch(BIN_URL, {" +
                "method: 'PUT'," +
                "headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY }," +
                "body: JSON.stringify({ htmlData: feed.innerHTML })" +
                "});" +
                "txtInput.value = ''; imgInput.value = '';" +
                "};" +
                "if (imgInput.files && imgInput.files[0]) {" +
                "const reader = new FileReader();" +
                "reader.onload = function(e) {" +
