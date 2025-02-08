document.addEventListener("DOMContentLoaded", () => {

    // 🔐 ระบบสมัครสมาชิก
    document.getElementById("registerForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const newUser = document.getElementById("newUsername").value;
        const newPass = document.getElementById("newPassword").value;

        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        // ตรวจสอบว่ามีชื่อผู้ใช้นี้แล้วหรือไม่
        const userExists = users.some(user => user.username === newUser);
        if (userExists) {
            alert("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว! โปรดเลือกชื่อใหม่");
            return;
        }

        // บันทึกผู้ใช้ใหม่ลง Local Storage
        users.push({ username: newUser, password: newPass });
        localStorage.setItem("users", JSON.stringify(users));

        alert("✅ สมัครสมาชิกสำเร็จ! โปรดเข้าสู่ระบบ");
        window.location.href = "index.html";  // กลับไปหน้า Login
    });

    // 🔑 ระบบล็อกอิน
    document.getElementById("loginForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("remember").checked;

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // ตรวจสอบว่าชื่อผู้ใช้ + รหัสผ่านถูกต้องหรือไม่
        const userExists = users.find(user => user.username === username && user.password === password);
        
        if (userExists) {
            if (rememberMe) {
                localStorage.setItem("rememberUser", username);
            } else {
                localStorage.removeItem("rememberUser");
            }
            
            alert("✅ เข้าสู่ระบบสำเร็จ!");
            window.location.href = "home.html";  // ไปหน้า Home
        } else {
            alert("❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
        }
    });

    // 🔄 โหลดค่าที่เคยจำไว้ (Remember Me)
    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser && document.getElementById("username")) {
        document.getElementById("username").value = savedUser;
        document.getElementById("remember").checked = true;
    }

    // 🚪 ฟังก์ชันออกจากระบบ (Logout)
    window.logout = function() {
        alert("🔴 ออกจากระบบเรียบร้อย!");
        window.location.href = "index.html";  // กลับไปหน้า Login
    };

    // ✉️ ส่งข้อความจาก Contact Form
    document.getElementById("contactForm")?.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        alert(`📩 ขอบคุณ ${name}! เราจะติดต่อคุณที่ ${email} เร็วๆ นี้`);
        
        // รีเซ็ตแบบฟอร์ม
        document.getElementById("contactForm").reset();
    });

});
