import fs from 'fs';

function runNukEngineV3(nukFile) {
    try {
        const rawCode = fs.readFileSync(nukFile, 'utf-8');
        
        // เช็กคำสั่งสี่ชั้นสลับสิทธิ์จากไฟล์ core.nuk ของสหาย
        if (rawCode.includes("DEPLOY_MASTER_TOOLS") && rawCode.includes("OPEN_TWITTER_DATABASE")) {
            
            // อ่านพิมพ์เขียวหน้าต่างเว็บโดยตรงจากไฟล์ภายนอก ไม่ต้องฝังข้อความให้ติดบั๊กแดง
            const templateHtml = fs.readFileSync('./template.html', 'utf-8');
            
            // คายไฟล์ดนตรี/3D หน้าเว็บเดี่ยวตัวจริงออกมาใช้งานทันที
            fs.writeFileSync('./index.html', templateHtml, 'utf-8');
            console.log("[NUK SYSTEM] แปลงโครงสร้าง V3.0 ไร้แถบแดงเสร็จสมบูรณ์เรียบร้อย!");
        } else {
            console.log("[NUK SYSTEM] ตรวจสอบพบว่าคำสั่งใน core.nuk ไม่ตรงตามโครงสร้างระบบหลัก");
        }
    } catch (err) {
        console.log("[NUK ERROR] การโหลดสถาปัตยกรรมล้มเหลว:", err.message);
    }
}

// สั่งรันตามสัญญานคลาสสิกของสหาย
runNukEngineV3('./core.nuk');
