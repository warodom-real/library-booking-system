const role = localStorage.getItem("role")

if (role !== "admin") {
    alert("คุณไม่มีสิทธิ์เข้า")
    window.location.href = "../../login.html"
}

document.getElementById("adminName").innerText = localStorage.getItem("username")

loadBooks()
loadBorrow()

// โหลดหนังสือ
async function loadBooks() {
    try {

        const { data } = await api.get("/books")

        const table = document.getElementById("bookTable")
        table.innerHTML = ""

        data.sort((a, b) => a.id - b.id)

        data.forEach(books => {
            table.innerHTML += `
                <tr>
                    <td>${books.id}</td>
                    <td>${books.book_name}</td>
                    <td>${books.author}</td>
                    <td>${books.description}</td>
                    <td>${books.category_name}</td>
                    <td>
                        <span class="status ${books.status || 'available'}">
                            ${books.status || 'available'}
                        </span>
                    </td>
                    <td>
                        <button class="delete" onclick="deleteBook(${books.id})">Delete</button>
                    </td>
                </tr>
            `
        })

    } catch (err) {
        console.error("โหลดหนังสือไม่ได้", err)
    }
}

// เพิ่มหนังสือ
document.getElementById("addBookForm").addEventListener("submit", async function (e) {

    e.preventDefault()

    try {

        const formData = new FormData(this)
        const { data } = await api.post("/books/add", formData)

        Swal.fire({ icon: 'success', title: 'สำเร็จ', text: data.message, confirmButtonColor: '#28a745' })
        loadBooks()

    } catch (err) {

        Swal.fire({ icon: 'error', title: 'เกิดข้อผิดพลาด', text: err.response?.data?.message || 'เพิ่มหนังสือไม่ได้' })

    }

})

// ลบหนังสือ
async function deleteBook(id) {

    const result = await Swal.fire({
        title: 'ลบหนังสือ?',
        text: "คุณแน่ใจหรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#e74c3c'
    })

    if (!result.isConfirmed) return

    try {

        const { data } = await api.delete(`/books/${id}`)
        Swal.fire('ลบแล้ว!', data.message, 'success')
        loadBooks()

    } catch (err) {

        Swal.fire('เกิดข้อผิดพลาด', err.response?.data?.message || 'ลบไม่ได้', 'error')

    }

}

// แก้ไขหนังสือ
async function editBook(id) {

    const result = await Swal.fire({
        title: 'แก้ไขข้อมูลหนังสือ',
        html: `
            <input id="book_name" class="swal2-input" placeholder="ชื่อหนังสือ">
            <input id="author" class="swal2-input" placeholder="ผู้เขียน">
            <textarea id="description" class="swal2-textarea" placeholder="รายละเอียด"></textarea>
            <input id="category_id" class="swal2-input" placeholder="Category ID">
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
        preConfirm: () => ({
            book_name: document.getElementById('book_name').value,
            author: document.getElementById('author').value,
            description: document.getElementById('description').value,
            category_id: document.getElementById('category_id').value
        })
    })

    if (!result.isConfirmed) return

    try {

        const { data } = await api.put(`/books/${id}`, result.value)
        Swal.fire('สำเร็จ', 'แก้ไขหนังสือแล้ว', 'success')
        loadBooks()

    } catch (err) {

        Swal.fire('เกิดข้อผิดพลาด', err.response?.data?.message || 'แก้ไขไม่ได้', 'error')

    }

}

// โหลดข้อมูลยืม
async function loadBorrow() {
    try {

        const { data } = await api.get("/booking")

        const table = document.getElementById("borrowTable")
        table.innerHTML = ""

        data.forEach(item => {
            table.innerHTML += `
                <tr>
                    <td>${item.book_id}</td>
                    <td>${item.user_id}</td>
                    <td>${formatDate(item.start_date)}</td>
                    <td>${formatDate(item.end_date)}</td>
                    <td id="time-${item.id}">${countdown(item.end_date)}</td>
                </tr>
            `
            startCountdown(item.id, item.end_date)
        })

    } catch (err) {
        console.error("โหลดข้อมูลยืมไม่ได้", err)
    }
}

// คืนหนังสือ
async function returnBook(bookId) {

    const result = await Swal.fire({
        title: 'คืนหนังสือ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'คืน',
        cancelButtonText: 'ยกเลิก'
    })

    if (!result.isConfirmed) return

    try {

        const { data } = await api.post("/booking/return", { book_id: bookId })
        Swal.fire('สำเร็จ', 'คืนหนังสือแล้ว', 'success')
        loadBooks()
        loadBorrow()

    } catch (err) {

        Swal.fire('เกิดข้อผิดพลาด', err.response?.data?.message || 'คืนไม่ได้', 'error')

    }

}

function startCountdown(id, end) {
    setInterval(() => {
        const el = document.getElementById(`time-${id}`)
        if (!el) return
        el.innerText = countdown(end)
    }, 1000)
}

function countdown(end) {
    const diff = new Date(end) - new Date()
    if (diff <= 0) return "หมดเวลา"
    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor(diff / (1000 * 60 * 60) % 24)
    const m = Math.floor(diff / (1000 * 60) % 60)
    return `${d}วัน ${h}ชม ${m}นาที`
}

function formatDate(date) {
    return new Date(date).toLocaleDateString()
}

// search
document.getElementById("searchBook").addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase()
    document.querySelectorAll("#bookTable tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(keyword) ? "" : "none"
    })
})

function logout() {
    localStorage.clear()
    window.location.href = "../../../login.html"
}
