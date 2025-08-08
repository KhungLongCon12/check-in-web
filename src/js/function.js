let scannedUrl = null;
let scannedDataParam = "";
// let appsScriptBaseUrl = "https://script.google.com/macros/s/" + scannedDataParam + "/exec"; // <-- THAY THẾ BẰNG URL WEB APP CỦA BẠN

// Hàm này chạy khi QR code được quét thành công
function onScanSuccess(decodedText, decodedResult) {
  document.getElementById("qrInput").value = decodedText;

  try {
    // Kiểm tra xem decodedText có phải là URL hợp lệ không
    const tempUrl = new URL(decodedText);
    // console.log("decodedText:", decodedText);
    // alert("QR raw: " + decodedText);
    scannedUrl = tempUrl; // Gán vào biến toàn cục nếu hợp lệ
    scannedDataParam = scannedUrl.searchParams.get("data") || "";

    if (!scannedDataParam) throw new Error("Thiếu dữ liệu QR trong URL");

    const parts = scannedDataParam.split(" - ");
    document.getElementById("name").innerText = parts[0] || "Không có";
    document.getElementById("className").innerText = parts[1] || "Không có";

    document.getElementById("message").innerText =
      "✅ Đã nhận mã QR, vui lòng nhấn 'Điểm danh'";
    document.getElementById("message").className = "message success";
  } catch (err) {
    console.error("Lỗi xử lý QR:", err);
    document.getElementById("message").innerText =
      "❌ Mã QR không hợp lệ hoặc thiếu dữ liệu.";
    document.getElementById("message").className = "message error";

    // Reset biến nếu lỗi
    scannedUrl = null;
    scannedDataParam = "";
  }
}

// Khởi tạo QR scanner
const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
  fps: 10,
  qrbox: { width: 250, height: 250 },
});
html5QrcodeScanner.render(onScanSuccess);

// Hàm xử lý khi nhấn nút "Điểm danh"
async function checkIn() {
  const value = document.getElementById("qrInput").value.trim();
  // console.log("value", value);
  const resultDiv = document.getElementById("result");
  const messageDiv = document.getElementById("message");
  const nameSpan = document.getElementById("name");
  const classNameSpan = document.getElementById("className");

  resultDiv.innerHTML = "⏳ Đang kiểm tra...";
  resultDiv.className = "text-info mt-3"; // Đổi màu để báo hiệu đang chờ

  if (!value) {
    resultDiv.innerHTML = "⚠️ Vui lòng nhập hoặc quét mã QR.";
    resultDiv.className = "text-warning mt-3";
    return;
  }

  let dataToSend = value;
  let appsScriptBaseUrl = "";

  try {
    // Nếu giá trị nhập vào là URL, lấy tham số 'data' từ đó
    const inputUrl = new URL(value);
    const dataFromUrl = inputUrl.searchParams.get("data");
    if (dataFromUrl) {
      dataToSend = dataFromUrl;
    }
    // Lấy scriptId từ URL được quét/nhập
    // CHỈ LẤY scriptId NẾU scannedUrl (tức là QR code) LÀ MỘT URL
    if (scannedUrl) {
      // Đảm bảo scannedUrl đã được gán và là một URL hợp lệ từ onScanSuccess
      const scriptIdSplit = scannedUrl.pathname.split("/")[3];
      if (scriptIdSplit) {
        // Xây dựng URL cơ sở từ scriptId được lấy từ QR code
        // GIỮ NGUYÊN script.google.com VÀ /exec ĐỂ ĐẢM BẢO ĐÚNG ĐỊNH DẠNG WEB APP
        appsScriptBaseUrl =
          "https://script.google.com/macros/s/" + scriptIdSplit + "/exec";
        // console.log("appsScriptBaseUrl từ QR:", appsScriptBaseUrl);
      } else {
        throw new Error("Không thể trích xuất Script ID từ QR URL.");
      }
    } else {
      // Nếu scannedUrl không có (người dùng nhập tay hoặc QR không phải URL)
      // THÌ BẠN PHẢI CÓ MỘT URL APPS SCRIPT CỐ ĐỊNH HOẶC CÁCH KHÁC ĐỂ XÁC ĐỊNH NÓ
      // VÍ DỤ: LẤY TỪ MỘT BIẾN CẤU HÌNH GLOBAL
      console.warn(
        "Không có URL được quét, sẽ cần một baseUrl mặc định hoặc được cấu hình sẵn."
      );
      // Để test nhanh, bạn có thể tạm thời cố định một URL Dev ở đây:
      // appsScriptBaseUrl = "YOUR_KNOWN_APPS_SCRIPT_DEV_OR_EXEC_URL_HERE";
      // Hoặc báo lỗi nếu không có cách nào khác để xác định baseUrl
      throw new Error(
        "Không tìm thấy URL Apps Script để kết nối. Vui lòng quét QR hoặc cấu hình URL."
      );
    }
  } catch (e) {
    // Nếu không phải URL, coi như là dữ liệu trực tiếp
    console.log("Input value is not a URL, treating as direct data.");
  }

  if (!appsScriptBaseUrl) {
    resultDiv.innerHTML = "❌ Lỗi: Chưa cấu hình URL Apps Script.";
    resultDiv.className = "text-danger mt-3";
    console.error(
      "Lỗi: Vui lòng thay thế 'YOUR_APPS_SCRIPT_WEB_APP_URL' bằng URL Web App thực tế của bạn."
    );
    return;
  }

  // Xây dựng URL yêu cầu AJAX
  // Thêm param "ajax=true" để Apps Script biết đây là yêu cầu AJAX và trả về JSON
  // console.log("dataToSend", dataToSend);
  const fullUrl = `${appsScriptBaseUrl}?data=${encodeURIComponent(
    dataToSend
  )}&action=checkin&ajax=true`;
  if (appsScriptBaseUrl.includes("/dev")) {
    // Dùng /dev để biết là đang test
    fullUrl += "&test=true";
  }
  // console.log("Sending request to:", fullUrl);

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Nhận phản hồi JSON

    // Cập nhật giao diện người dùng dựa trên dữ liệu nhận được
    messageDiv.innerText = data.message;
    nameSpan.innerText = data.name || "Không có";
    classNameSpan.innerText = data.className || "Không có";

    if (data.status === "success") {
      messageDiv.className = "message success";
      resultDiv.innerHTML = "✅ Điểm danh thành công!";
      resultDiv.className = "text-success mt-3";
    } else if (data.status === "warning") {
      messageDiv.className = "message warning";
      resultDiv.innerHTML = "⚠️ " + data.message;
      resultDiv.className = "text-warning mt-3";
    } else if (data.status === "error") {
      messageDiv.className = "message error";
      resultDiv.innerHTML = "❌ " + data.message;
      resultDiv.className = "text-danger mt-3";
    } else {
      // Mặc định là info
      messageDiv.className = "message info";
      resultDiv.innerHTML = data.message;
      resultDiv.className = "text-info mt-3";
    }
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu điểm danh:", error);
    messageDiv.innerText = "❌ Lỗi kết nối hoặc xử lý.";
    messageDiv.className = "message error";
    resultDiv.innerHTML = "❌ Đã xảy ra lỗi trong quá trình điểm danh.";
    resultDiv.className = "text-danger mt-3";
  }
}
