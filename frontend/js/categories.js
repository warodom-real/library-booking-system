document.getElementById("username").innerText =
    "👤 " + localStorage.getItem("username")

const BOOKS_PER_PAGE = 6
let currentPage = 1
let allBooks = []
let filteredBooks = []

async function loadCategory(id) {
    try {
        const { data } = await api.get(`/books/category/${id}`)
        allBooks = data
        filteredBooks = data
        currentPage = 1

        // reset search
        document.getElementById("searchInput").value = ""

        renderPage()
        renderPagination()
    } catch (err) {
        console.error("โหลดหมวดหมู่ไม่ได้", err)
    }
}

// search
document.getElementById("searchInput").addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase()

    filteredBooks = allBooks.filter(book =>
        book.book_name.toLowerCase().includes(keyword) ||
        book.author.toLowerCase().includes(keyword)
    )

    currentPage = 1
    renderPage()
    renderPagination()
})

function renderPage() {
    const start = (currentPage - 1) * BOOKS_PER_PAGE
    const end = start + BOOKS_PER_PAGE
    const books = filteredBooks.slice(start, end)

    const container = document.getElementById("book-list")
    container.innerHTML = ""

    if (books.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:#888; margin: 40px 0">ไม่พบหนังสือที่ค้นหา</p>`
        return
    }

    books.forEach(books => {
        const statusButton = books.status === "available"
            ? `<span class="status available">พร้อมให้ยืม</span>`
            : `<span class="status borrowed">ถูกยืมอยู่</span>`

        container.innerHTML += `
            <div class="content-item">
                <img src="http://localhost:8000/uploads/${books.book_images}" alt="">
                <div class="card-content">
                    <h4>${books.book_name}</h4>
                    <p>ผู้เขียน: ${books.author}</p>
                    <p>หมวด: ${books.category_name}</p>
                    <div class="card-buttons">
                        <a href="../bookdetails/bookdetails.html?id=${books.id}" class="content-btn">เพิ่มเติม</a>
                        ${statusButton}
                    </div>
                </div>
            </div>
        `
    })
}

function renderPagination() {
    const totalPages = Math.ceil(filteredBooks.length / BOOKS_PER_PAGE)
    const container = document.getElementById("pagination")
    if (!container) return

    container.innerHTML = ""
    if (totalPages <= 1) return

    const prevBtn = document.createElement("button")
    prevBtn.innerText = "←"
    prevBtn.disabled = currentPage === 1
    prevBtn.onclick = () => changePage(currentPage - 1)
    container.appendChild(prevBtn)

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button")
        btn.innerText = i
        btn.className = i === currentPage ? "active" : ""
        btn.onclick = () => changePage(i)
        container.appendChild(btn)
    }

    const nextBtn = document.createElement("button")
    nextBtn.innerText = "→"
    nextBtn.disabled = currentPage === totalPages
    nextBtn.onclick = () => changePage(currentPage + 1)
    container.appendChild(nextBtn)
}

function changePage(page) {
    currentPage = page
    renderPage(page)
    renderPagination()
    window.scrollTo({ top: 0, behavior: "smooth" })
}

function goDetail(id) {
    window.location.href = `../bookdetails/bookdetails.html?id=${id}`
}

function logout() {
    localStorage.clear()
    window.location.href = "../../login.html"
}