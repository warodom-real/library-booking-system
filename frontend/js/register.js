document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const message = document.getElementById("message")

    if (password !== confirmPassword) {
        message.className = "error"
        message.innerText = "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่"
        return
    }

    try {

        await api.post("/users/register", { username, password })

        message.className = "success"
        message.innerText = "สมัครสำเร็จ กำลังไปหน้า Login..."

        setTimeout(() => {
            window.location.href = "../../login.html"
        }, 500)

    } catch (err) {

        message.className = "error"
        message.innerText = err.response?.data?.message || "ไม่สามารถเชื่อมต่อ server ได้"

    }

})