// Hàm tải tất cả sản phẩm khi trang được tải
async function loadAllProducts() {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<p>⏳ Đang tải sản phẩm...</p>";

    try {
        const res = await fetch(`http://localhost:1880/timkiem?q=`); // Gửi yêu cầu không có từ khóa
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.innerHTML = "<p>❌ Không có sản phẩm nào để hiển thị.</p>";
            return;
        }

        resultDiv.innerHTML = "";
        data.forEach(sp => {
            const spDiv = document.createElement("div");
            spDiv.className = "product";

            // Lấy tên file từ đường dẫn đầy đủ trong DB
            const imgFile = sp.HinhanhSP ? sp.HinhanhSP.split(/[/\\]/).pop() : "noimage.jpg";

            spDiv.innerHTML = `
                <img src="http://localhost/imageQA/${imgFile}" alt="${sp.Tensp}" 
                     onerror="this.src='http://localhost/imageQA/noimage.jpg'">
                <h3>${sp.Tensp}</h3>
                <p><b>Giá:</b> ${sp["Gia VNĐ"].toLocaleString()} VND</p>
                <p><b>Số lượng:</b> ${sp.SoLuong}</p>
                <p><b>Mô tả:</b> ${sp.MotaSP}</p>
            `;

            resultDiv.appendChild(spDiv);
        });
    } catch (err) {
        resultDiv.innerHTML = "<p style='color:red;'>⚠️ Lỗi khi kết nối đến API Node-RED.</p>";
        console.error(err);
    }
}

// Gọi hàm tải sản phẩm khi trang được tải
document.addEventListener("DOMContentLoaded", loadAllProducts);

// Xử lý tìm kiếm
document.getElementById("searchForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const keyword = document.getElementById("keyword").value.trim();
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<p>⏳ Đang tìm kiếm...</p>";

    try {
        const res = await fetch(`http://localhost:1880/timkiem?q=${encodeURIComponent(keyword)}`);
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            resultDiv.innerHTML = "<p>❌ Không tìm thấy sản phẩm nào phù hợp.</p>";
            return;
        }

        resultDiv.innerHTML = "";
        data.forEach(sp => {
            const spDiv = document.createElement("div");
            spDiv.className = "product";

            // Lấy tên file từ đường dẫn đầy đủ trong DB
            const imgFile = sp.HinhanhSP ? sp.HinhanhSP.split(/[/\\]/).pop() : "noimage.jpg";

            spDiv.innerHTML = `
                <img src="http://localhost/imageQA/${imgFile}" alt="${sp.Tensp}" 
                     onerror="this.src='http://localhost/imageQA/noimage.jpg'">
                <h3>${sp.Tensp}</h3>
                <p><b>Giá:</b> ${sp["Gia VNĐ"].toLocaleString()} VND</p>
                <p><b>Số lượng:</b> ${sp.SoLuong}</p>
                <p><b>Mô tả:</b> ${sp.MotaSP}</p>
            `;

            resultDiv.appendChild(spDiv);
        });
    } catch (err) {
        resultDiv.innerHTML = "<p style='color:red;'>⚠️ Lỗi khi kết nối đến API Node-RED.</p>";
        console.error(err);
    }
});