// Hàm hiển thị kết quả tại chỗ ở khung iframe
function runCode() {
    const code = document.getElementById("code-input").value;
    const output = document.getElementById("code-output");
    output.contentWindow.document.open();
    output.contentWindow.document.write(code);
    output.contentWindow.document.close();
}

// HÀM BIÊN DỊCH VÀ TỰ ĐỘNG RÚT GỌN LINK (ĐÃ SỬA LỖI TIẾNG VIỆT & ĐƯỜNG DẪN)
async function publishLivePage() {
    const codeData = document.getElementById("code-input").value;
    const shareLinkInput = document.getElementById("shareable-link");
    const linkBox = document.getElementById("link-output-area");
    
    // 1. Mã hóa an toàn tuyệt đối cho cả Tiếng Việt và Emoji
    const utf8Bytes = new TextEncoder().encode(codeData);
    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
    }
    const encodedCode = btoa(binary);
    
    // 2. Tự động lấy chính xác đường dẫn thư mục hiện tại trên GitHub Pages
    const currentUrl = window.location.href.split('?')[0];
    const baseDir = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    const longUrl = `${baseDir}/preview.html?site=${encodedCode}`;
    
    // Hiển thị hộp thông báo trạng thái
    linkBox.style.display = "block";
    shareLinkInput.value = "⏳ Đang tạo link rút gọn mỳ ăn liền...";

    // 3. Gọi API rút gọn link thông qua Proxy của TinyURL
    try {
        const response = await fetch(`https://tinyurl.com{encodeURIComponent(longUrl)}`);
        
        if (response.ok) {
            const shortUrl = await response.text();
            shareLinkInput.value = shortUrl;
        } else {
            // Nếu API rút gọn lỗi, trả về link gốc dài để chữa cháy
            shareLinkInput.value = longUrl;
        }
    } catch (error) {
        console.error("Lỗi rút gọn link:", error);
        shareLinkInput.value = longUrl;
    }
}

// Hàm copy nhanh đường link vào bộ nhớ tạm của điện thoại
function copyToClipboard() {
    const linkInput = document.getElementById("shareable-link");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(linkInput.value);
    alert("Đã copy link trang web rút gọn thành công rồi nhé bro!");
}

// Tự động kích hoạt chạy thử lần đầu tiên khi vào ứng dụng
document.addEventListener("DOMContentLoaded", function() {
    runCode();
});
