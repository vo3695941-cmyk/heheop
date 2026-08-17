// Hàm hiển thị kết quả chạy thử code
function runCode() {
    const code = document.getElementById("code-input").value;
    const output = document.getElementById("code-output");
    output.contentWindow.document.open();
    output.contentWindow.document.write(code);
    output.contentWindow.document.close();
}

// HÀM TẠO ĐƯỜNG LINK CHIA SẺ TỰ CHẠY
function generateWebLink() {
    const codeData = document.getElementById("code-input").value;
    
    // Nén và mã hóa đoạn code thành chuỗi Base64 an toàn cho URL
    const encodedCode = btoa(unescape(encodeURIComponent(codeData)));
    
    // Tạo link: Lấy địa chỉ trang web hiện tại + chuỗi mã hóa phía sau dấu chấm hỏi
    const baseUrl = window.location.href.split('?')[0];
    const shareableUrl = `${baseUrl}?code=${encodedCode}`;
    
    // Hiển thị khung và đẩy link vào ô nhập cho người dùng lấy
    document.getElementById("link-output-area").style.display = "block";
    document.getElementById("shareable-link").value = shareableUrl;
}

// Hàm hỗ trợ copy nhanh link vào khay nhớ tạm
function copyToClipboard() {
    const linkInput = document.getElementById("shareable-link");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // Dành cho điện thoại
    navigator.clipboard.writeText(linkInput.value);
    alert("Đã copy đường link thành công nhé bro!");
}

// LOGIC KIỂM TRA LINK KHI VỪA TẢI TRANG
document.addEventListener("DOMContentLoaded", function() {
    // Tìm xem trên thanh địa chỉ có cụm "?code=" không
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');

    if (codeParam) {
        try {
            // Giải mã chuỗi ngược lại thành code HTML ban đầu
            const decodedCode = decodeURIComponent(escape(atob(codeParam)));
            
            // Đổ code giải mã được vào ô nhập văn bản để người dùng sửa tiếp nếu muốn
            document.getElementById("code-input").value = decodedCode;
        } catch (e) {
            console.error("Lỗi giải mã đường link web!");
        }
    }
    
    // Luôn chạy thử code lần đầu tiên
    runCode();
});
