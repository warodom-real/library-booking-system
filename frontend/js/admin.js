const role = localStorage.getItem("role")

if (role !== "admin") {
    alert("คุณไม่มีสิทธิ์เข้า")
    window.location.href = "../../login.html"
}

document.getElementById("adminName").innerText =
    localStorage.getItem("username")

loadBooks()
loadBorrow()



// โหลดหนังสือ
function loadBooks() {

    fetch("http://localhost:8000/books")
        .then(res => res.json())
        .then(data => {

            const table = document.getElementById("bookTable")

            table.innerHTML = ""
            
            data.sort((a, b) => a.id - b.id)
            
            data.forEach(books => {

                const row = `
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
                        <button class="delete" onclick="deleteBook(${books.id})">
                        Delete
                        </button>
                    </td>
                </tr>
                `

                table.innerHTML += row

            })

        })

}
// เพิ่มหนังสือ

document
    .getElementById("addBookForm")
    .addEventListener("submit", function (e) {

        e.preventDefault()

        const formData = new FormData(this)

        fetch("http://localhost:8000/books/add", {

            method: "POST",
            body: formData

        })
            .then(res => res.json())
            .then(data => {

                Swal.fire({
                    icon: 'success',
                    title: 'สำเร็จ',
                    text: data.message,
                    confirmButtonColor: '#28a745'
                })

                loadBooks()

            })

    })


// ลบหนังสือ

function deleteBook(id) {

    Swal.fire({
        title: 'ลบหนังสือ?',
        text: "คุณแน่ใจหรือไม่",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#e74c3c'
    }).then((result) => {

        if (result.isConfirmed) {

            fetch(`http://localhost:8000/books/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {

                    Swal.fire(
                        'ลบแล้ว!',
                        data.message,
                        'success'
                    )

                    loadBooks()

                })

        }

    })

}


// แก้ไขหนังสือ

function editBook(id) {

    Swal.fire({
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

        preConfirm: () => {

            return {
                book_name: document.getElementById('book_name').value,
                author: document.getElementById('author').value,
                description: document.getElementById('description').value,
                category_id: document.getElementById('category_id').value
            }

        }

    }).then((result) => {

        if (result.isConfirmed) {

            fetch(`http://localhost:8000/books/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(result.value)

            })
                .then(res => res.json())
                .then(data => {

                    Swal.fire(
                        'สำเร็จ',
                        'แก้ไขหนังสือแล้ว',
                        'success'
                    )

                    loadBooks()

                })

        }

    })

}


// โหลดข้อมูลยืม

function loadBorrow() {

    fetch("http://localhost:8000/booking")

        .then(res => res.json())

        .then(data => {

            const table = document.getElementById("borrowTable")

            table.innerHTML = ""

            data.forEach(item => {

                const row = `
                
                    <tr>
                    <td>${item.book_id}</td>
                    <td>${item.user_id}</td>
                    <td>${formatDate(item.start_date)}</td>
                    <td>${formatDate(item.end_date)}</td>
                    <td id="time-${item.id}">
                    ${countdown(item.end_date)}
                    </td>

                    `

                table.innerHTML += row

                startCountdown(item.id, item.end_date)

            })

        })

}

function returnBook(bookId) {

    Swal.fire({
        title: 'คืนหนังสือ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'คืน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (result.isConfirmed) {

            fetch(`http://localhost:8000/books/return/${bookId}`, {
                method: "PUT"
            })
                .then(res => res.json())
                .then(data => {

                    Swal.fire(
                        'สำเร็จ',
                        'คืนหนังสือแล้ว',
                        'success'
                    )

                    loadBooks()
                    loadBorrow()

                })

        }

    })

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

document
    .getElementById("searchBook")
    .addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase()

        const rows =
            document.querySelectorAll("#bookTable tr")

        rows.forEach(row => {

            row.style.display =
                row.innerText.toLowerCase()
                    .includes(keyword) ? "" : "none"

        })

    })


// logout

function logout() {

    localStorage.clear()

    window.location.href = "../../../login.html"

}