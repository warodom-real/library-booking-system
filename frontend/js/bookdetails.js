document.getElementById("username").innerText =
    "👤 " + localStorage.getItem("username")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

async function loadBook() {
    try {

        const { data } = await api.get(`/books/${id}`)
        const book = data[0] || data

        document.getElementById("book_name").innerText = book.book_name
        document.getElementById("author").innerText = "ผู้เขียน: " + book.author
        document.getElementById("description").innerText = book.description
        document.getElementById("book_img").src = `http://localhost:8000/uploads/${book.book_images}`

        if (book.status !== "available") {
            const btn = document.getElementById("borrowBtn")
            btn.innerText = "หนังสือเล่มนี้ถูกยืมอยู่"
            btn.disabled = true
            btn.style.background = "#e74c3c"
        }

    } catch (err) {
        console.error("โหลดหนังสือไม่ได้", err)
    }
}

loadBook()

function goBack() {
    window.history.back()
}

function openBooking() {
    document.getElementById("bookingModal").style.display = "flex"
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none"
}

async function confirmBooking() {

    const days = document.getElementById("days").value
    const user_id = localStorage.getItem("user_id")

    try {

        await api.post("/booking/borrow", { user_id, book_id: id, days })

        showSuccess()

        const btn = document.getElementById("borrowBtn")
        btn.innerText = "หนังสือเล่มนี้ถูกยืมอยู่"
        btn.disabled = true
        btn.classList.add("borrowed-btn")

        document.getElementById("days").value = ""

        setTimeout(() => closeModal(), 500)

    } catch (err) {

        showAlert(err.response?.data?.message || "เกิดข้อผิดพลาด")

    }

}

function showSuccess() {
    const alertBox = document.getElementById("successAlert")
    alertBox.style.display = "block"
    setTimeout(() => { alertBox.style.display = "none" }, 1500)
}

function showAlert(message, color = "red") {
    const box = document.getElementById("customAlert")
    const text = document.getElementById("alertMessage")
    text.innerText = message
    box.style.background = color === "green" ? "#27ae60" : "#e74c3c"
    box.style.display = "block"
    setTimeout(() => { box.style.display = "none" }, 2000)
}

function logout() {
    localStorage.clear()
    window.location.href = "../../login.html"
}
