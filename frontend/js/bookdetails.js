const username = localStorage.getItem("username")

document.getElementById("username").innerText =
    "👤 " + localStorage.getItem("username")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

fetch("http://localhost:8000/books/" + id)
    .then(res => res.json())
    .then(data => {

        const book = data[0] || data

        document.getElementById("book_name").innerText = book.book_name
        document.getElementById("author").innerText = "ผู้เขียน: " + book.author
        document.getElementById("description").innerText = book.description

        document.getElementById("book_img").src =
            "http://localhost:8000/uploads/" + book.book_images

        // เช็คสถานะหนังสือ
        if (book.status !== "available") {

            const btn = document.getElementById("borrowBtn")

            btn.innerText = "หนังสือเล่มนี้ถูกยืมอยู่"
            btn.disabled = true
            btn.style.background = "#e74c3c"

        }

    })


function goBack() {
    window.history.back()
}

function openBooking() {
    document.getElementById("bookingModal").style.display = "flex"
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none"
}

function confirmBooking() {

    const days = document.getElementById("days").value
    const user_id = localStorage.getItem("user_id")

    fetch("http://localhost:8000/booking/borrow", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            user_id: user_id,
            book_id: id,
            days: days
        })

    })
        .then(res => res.json().then(data => ({ status: res.status, body: data })))
        .then(result => {

            if (result.status !== 200) {
                showAlert(result.body.message)
                return
            }

            showSuccess()

            const btn = document.getElementById("borrowBtn")

            btn.innerText = "หนังสือเล่มนี้ถูกยืมอยู่"
            btn.disabled = true
            btn.classList.add("borrowed-btn")

            // ล้างค่าช่องจำนวนวัน
            document.getElementById("days").value = ""

            setTimeout(() => {
                closeModal()
            }, 500)

        })

}
function showSuccess() {

    const alertBox = document.getElementById("successAlert")

    alertBox.style.display = "block"

    setTimeout(() => {
        alertBox.style.display = "none"
    }, 1500)

}


function showAlert(message, color = "red") {

    const box = document.getElementById("customAlert")
    const text = document.getElementById("alertMessage")

    text.innerText = message

    if (color === "green") {
        box.style.background = "#27ae60"
    } else {
        box.style.background = "#e74c3c"
    }

    box.style.display = "block"

    setTimeout(() => {
        box.style.display = "none"
    }, 2000)
}

// logout
function logout() {

    localStorage.removeItem("user_id")
    localStorage.removeItem("username")

    window.location.href = "../../login.html"

}