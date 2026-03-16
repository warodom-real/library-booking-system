document.getElementById("loginForm").addEventListener("submit", function (e) {

    e.preventDefault()
    login()

})

function login() {

    const usernameInput = document.getElementById("username")
    const passwordInput = document.getElementById("password")

    const username = usernameInput.value.trim()
    const password = passwordInput.value.trim()

    fetch("http://localhost:8000/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username: username,
            password: password
        })

    })

        .then(res => res.json())

        .then(data => {

            console.log(data)

            if (data.user) {

                localStorage.setItem("user_id", data.user.id)
                localStorage.setItem("username", data.user.username)
                localStorage.setItem("role", data.user.role)

                Swal.fire({
                    icon: "success",
                    title: "Login สำเร็จ",
                    text: "กำลังเข้าสู่ระบบ...",
                    showConfirmButton: false,
                    timer: 1200
                }).then(() => {

                        if (data.user.role === "admin") {

                            window.location.href = "./pages/dashboard/admin_dashboard/admin.html"

                        } else {

                            window.location.href = "./pages/dashboard/index.html"

                        }

                    })
            }
            else {

                // ลบสี error ก่อน
                usernameInput.classList.remove("input-error")
                passwordInput.classList.remove("input-error")

                // ตรวจ message จาก backend
                if (data.message === "username ไม่ถูกต้อง") {

                    usernameInput.classList.add("input-error")

                    Swal.fire({
                        icon: "error",
                        title: "Username ไม่ถูกต้อง",
                        text: "ไม่พบ Username นี้ในระบบ"
                    })

                }
                else if (data.message === "password ไม่ถูกต้อง") {

                    passwordInput.classList.add("input-error")

                    Swal.fire({
                        icon: "error",
                        title: "Password ไม่ถูกต้อง",
                        text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง"
                    })

                }
                else {

                    Swal.fire({
                        icon: "error",
                        title: "เข้าสู่ระบบไม่สำเร็จ",
                        text: "Username หรือ Password ไม่ถูกต้อง"
                    })

                }

            }

        })

        .catch(err => {

            console.error(err)

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้"
            })

        })

}

function togglePassword() {

    const password = document.getElementById("password")

    if (password.type === "password") {
        password.type = "text"
    } else {
        password.type = "password"
    }

}