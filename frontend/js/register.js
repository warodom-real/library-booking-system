document.getElementById("registerForm").addEventListener("submit", async function (e) {

    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const message = document.getElementById("message")

    try {

        const res = await fetch("http://localhost:8000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await res.json()
        if (res.ok) {

            message.className = "success"
            message.innerText = "สมัครสำเร็จ กำลังไปหน้า Login..."

            setTimeout(() => {
                window.location.href = "../../login.html"
            }, 500)
        } else {

            message.className = "error"
            message.innerText = data.message

        }

    } catch (err) {

        message.style.color = "red"
        message.innerText = "ไม่สามารถเชื่อมต่อ server ได้"

    }

})