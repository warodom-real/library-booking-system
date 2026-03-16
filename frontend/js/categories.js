const username = localStorage.getItem("username")

document.getElementById("username").innerText =
"👤 " + localStorage.getItem("username")

async function loadCategory(id) {

    const res = await fetch(`http://localhost:8000/books/category/${id}`, {
        cache: "no-store"
    })

    const data = await res.json()

    const container = document.getElementById("book-list")

    container.innerHTML = ""

    data.forEach((books) => {

        let statusButton = ""

        if (books.status === "available") {
            statusButton = `<span class="status available">พร้อมให้ยืม</span>`
        } else {
            statusButton = `<span class="status borrowed">ถูกยืมอยู่</span>`
        }

        container.innerHTML += `
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
    })
}

function goDetail(id) {

    window.location.href = `../bookdetails/bookdetails.html?id=${id}`

}

// logout
function logout() {

    localStorage.removeItem("user_id")
    localStorage.removeItem("username")

    window.location.href = "../../login.html"

}