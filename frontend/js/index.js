// show username
const username = localStorage.getItem("username")

document.getElementById("username").innerText =
    "👤 " + localStorage.getItem("username")

fetch("http://localhost:8000/books", {
    cache: "no-store"
})
    .then(res => res.json())
    .then(data => {

        const bookList = document.getElementById("book-list")

        data.forEach(books => {

            let statusButton = ""

            if (books.status === "available") {
                statusButton = `<span class="status available">พร้อมให้ยืม</span>`
            } else {
                statusButton = `<span class="status borrowed">ถูกยืมอยู่</span>`
            }
            const bookCard = `
    
                <div class="content-item">

                <img src="http://localhost:8000/uploads/${books.book_images}" alt="">

                <div class="card-content">

                <h4>${books.book_name}</h4>

                <p>ผู้เขียน: ${books.author}</p>

                <p>หมวด: ${books.category_name}</p>

                <div class="card-buttons">

                <a href="../bookdetails/bookdetails.html?id=${books.id}" 
                class="content-btn">
                เพิ่มเติม
                </a>

                ${statusButton}

                </div>

                </div>

                </div>
                `

            bookList.innerHTML += bookCard

        })

    })


// logout
function logout() {

    localStorage.removeItem("user_id")
    localStorage.removeItem("username")

    window.location.href = "../../login.html"
}