// ==========================================
//  api.js — ตั้งค่า axios ครั้งเดียว
//  โหลดไฟล์นี้ก่อนทุก JS ไฟล์ใน HTML
// ==========================================

const api = axios.create({
    baseURL: "http://localhost:8000"
})

// แนบ token อัตโนมัติทุก request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// จัดการ error อัตโนมัติ
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.clear()
            window.location.href = "/login.html"
        }
        return Promise.reject(error)
    }
)
