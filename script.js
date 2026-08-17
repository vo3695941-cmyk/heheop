// Hàm hiển thị kết quả tại chỗ ở khung iframe phía dưới để người dùng vừa gõ vừa xem
function runCode() {
    const code = document.getElementById("code-input").value;
    const output = document.getElementById("code-output");
    output.contentWindow.document.open();
    output.contentWindow.document.write(code);
    output.contentWindow.document.close();
}

// HÀM BIÊN DỊCH VÀ XUẤT BẢN SANG TRANG TRỰC TUYẾN ĐỘC LẬP
function publishLivePage() {
    const codeData = document.getElementById("code-input").value;
    
    // Nén dữ liệu code thành chuỗi mã hóa an toàn
    const encodedCode = btoa(unescape(encodeURIComponent(codeData)));
    
    // Tự động phân tích địa chỉ hiện tại để tìm đường dẫn thư mục gốc
    const currentUrl = window.location.href.split('?')[0];
    const baseDir = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    
    // Tạo link đích trỏ trực tiếp đến file preview.html sạch kèm theo mã giao diện của người dùng
    const finalPublishedUrl = `${baseDir}/preview.html?site=${encodedCode}`;
    
    // Hiện hộp thông báo và đưa link vào ô nhập cho người dùng lấy
    document.getElementById("link-output-area").style.display = "block";
    document.getElementById("shareable-link").value = finalPublishedUrl;
}

// Hàm copy nhanh đường link vào bộ nhớ tạm của điện thoại
function copyToClipboard() {
    const linkInput = document.getElementById("shareable-link");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); // Hỗ trợ tối ưu trên trình duyệt di động
    navigator.clipboard.writeText(linkInput.value);
    alert("Đã copy link trang web độc lập thành công! Gửi ngay cho bạn bè thôi bro ơi!");
}

// Tự động kích hoạt chạy thử lần đầu tiên khi vào ứng dụng
document.addEventListener("DOMContentLoaded", function() {
    runCode();
});
