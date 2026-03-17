document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault()
    login()
})

async function login() {

    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    try {

        const { data } = await api.post("/users/login", { username, password })

        localStorage.setItem("token", data.token)
        localStorage.setItem("user_id", data.user.id)
        localStorage.setItem("username", data.user.username)
        localStorage.setItem("role", data.user.role)

        await Swal.fire({
            icon: "success",
            title: "Login สำเร็จ",
            text: "กำลังเข้าสู่ระบบ...",
            showConfirmButton: false,
            timer: 1200
        })

        if (data.user.role === "admin") {
            window.location.href = "./pages/dashboard/admin_dashboard/admin.html"
        } else {
            window.location.href = "./pages/dashboard/index.html"
        }

    } catch (err) {

        const message = err.response?.data?.message || ""

        usernameInput.classList.remove("input-error")
        passwordInput.classList.remove("input-error")

        if (message === "username ไม่ถูกต้อง") {
            usernameInput.classList.add("input-error")
            Swal.fire({ icon: "error", title: "Username ไม่ถูกต้อง", text: "ไม่พบ Username นี้ในระบบ" })
        } else if (message === "password ไม่ถูกต้อง") {
            passwordInput.classList.add("input-error")
            Swal.fire({ icon: "error", title: "Password ไม่ถูกต้อง", text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง" })
        } else {
            Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้" })
        }

    }

}

function togglePassword() {
    const password = document.getElementById("password")
    password.type = password.type === "password" ? "text" : "password"
}
