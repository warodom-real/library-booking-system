const username = localStorage.getItem("username")

document.getElementById("username").innerText =
    "👤 " + localStorage.getItem("username")


const user_id = localStorage.getItem("user_id")

fetch("http://localhost:8000/booking/history/" + user_id)
    .then(res => res.json())
    .then(data => {

        const container = document.getElementById("history-list")

        container.innerHTML = ""

        data.forEach((books, index) => {

            container.innerHTML += `

<div class="history-card" style="animation-delay:${index * 0.15}s">

    <img src="http://localhost:8000/uploads/${books.book_images}">

    <div class="history-info">

        <h3>${books.book_name}</h3>

        <p>ผู้เขียน: ${books.author}</p>

        <p>วันที่จอง: ${formatDate(books.start_date)}</p>
        
        <p>วันหมดเวลา: ${formatDate(books.end_date)}</p>

                ${books.status === "borrowed"
                    ? `<p id="time-${books.id}" class="countdown"></p>`
                    : ""
                }

                <p>สถานะ: ${books.status}</p>

                ${books.status === "borrowed"
                    ? `<button class="return-btn" onclick="returnBook(${books.book_id})">📚 คืนหนังสือ</button>`
                    : `<span style="color:green;">คืนแล้ว</span>`
                }

    </div>

</div>
`
            if (books.status === "borrowed") {
                startCountdown(books.end_date, books.id)
            }

        })

    })



function formatDate(dateString) {

    const date = new Date(dateString)

    return date.toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    })

}

function startCountdown(endDate, bookingId) {

    const end = new Date(endDate)

    function updateCountdown() {

        const now = new Date().getTime()
        const distance = end - now

        const element = document.getElementById("time-" + bookingId)

        if (!element) return

        if (distance <= 0) {
            element.innerText = "หมดเวลาแล้ว"
            return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

        element.innerText =
            `เวลาที่เหลือ: ${days} วัน ${hours} ชม ${minutes} นาที`
    }

    updateCountdown()
    setInterval(updateCountdown, 60000)

}

function returnBook(book_id) {

    Swal.fire({
        title: 'คืนหนังสือ?',
        text: "ต้องการคืนหนังสือเล่มนี้ใช่ไหม",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'คืนหนังสือ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {

        if (!result.isConfirmed) return

        fetch("http://localhost:8000/booking/return", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                book_id: book_id
            })
        })
            .then(res => res.json())
            .then(data => {

                Swal.fire({
                    icon: 'success',
                    title: 'คืนหนังสือสำเร็จ',
                    text: data.message,
                    confirmButtonText: 'ตกลง'
                }).then(() => {
                    location.reload()
                })

            })

    })

}

// logout
function logout() {

    localStorage.removeItem("user_id")
    localStorage.removeItem("username")

    window.location.href = "../../login.html"

}