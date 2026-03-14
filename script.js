// ===========================
// DỮ LIỆU MẪU NHÂN VẬT
// ===========================
const characters = [
  {
    name: "Alok",
    role: "Hỗ trợ",
    description:
      "DJ nổi tiếng với kỹ năng tạo vùng hồi máu và tăng tốc độ di chuyển cho đồng đội.",
    image:
      "images/alok.jpg" // TODO: đặt file ảnh thật trong thư mục /images hoặc thay bằng link online
  },
  {
    name: "Chrono",
    role: "Tấn công",
    description:
      "Chiến binh tương lai tạo lá chắn bảo vệ, tăng tốc độ di chuyển và chống sát thương.",
    image: "images/chrono.jpg"
  },
  {
    name: "Kelly",
    role: "Tốc độ",
    description:
      "Vận động viên điền kinh với khả năng tăng tốc chạy và gây thêm sát thương cho phát bắn đầu.",
    image: "images/kelly.jpg"
  },
  {
    name: "Hayato",
    role: "Đấu sĩ",
    description:
      "Samurai trẻ tuổi, càng ít máu càng tăng xuyên giáp, phù hợp chơi hổ báo.",
    image: "images/hayato.jpg"
  }
  // TODO: Bạn tự bổ sung đầy đủ danh sách nhân vật của Free Fire tại đây
];

// ===========================
// DỮ LIỆU MẪU SỰ KIỆN
// ===========================
const events = [
  {
    title: "Sự kiện Hợp Tác Đặc Biệt",
    date: "Tháng 3 / 2026",
    description:
      "Tham gia chuỗi nhiệm vụ nhận skin giới hạn, hành động đặc biệt và nhiều quà tặng hấp dẫn."
  },
  {
    title: "Đại chiến Booyah",
    date: "Hàng tuần",
    description:
      "Tích lũy số lần Booyah để nhận quà siêu hiếm, nâng cấp nhân vật và vũ khí."
  },
  {
    title: "Vòng quay may mắn",
    date: "Đang diễn ra",
    description:
      "Dùng kim cương quay trúng bộ sưu tập trang phục hiếm, dù, skin vũ khí và thú cưng."
  }
  // TODO: Cập nhật theo sự kiện mới nhất của Free Fire
];

// ===========================
// HẰNG SỐ LOCAL STORAGE
// ===========================
const LS_CURRENT_USER = "ff_current_user";
const LS_USER_LOGS = "ff_user_logs";
const LS_CHAT_MESSAGES = "ff_chat_messages";

// ===========================
// TIỆN ÍCH
// ===========================
function formatDateTime(date = new Date()) {
  return date.toLocaleString("vi-VN", {
    hour12: false
  });
}

function loadFromLocalStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.error("Lỗi đọc localStorage", key, e);
    return defaultValue;
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Lỗi ghi localStorage", key, e);
  }
}

// ===========================
// RENDER NHÂN VẬT
// ===========================
function renderCharacters() {
  const container = document.getElementById("character-grid");
  if (!container) return;

  container.innerHTML = "";

  characters.forEach((ch) => {
    const card = document.createElement("article");
    card.className = "card character-card";

    const img = document.createElement("img");
    img.src =
      ch.image ||
      "https://via.placeholder.com/400x220.png?text=Free+Fire+Character";
    img.alt = ch.name;

    const meta = document.createElement("div");
    meta.className = "character-meta";

    const nameEl = document.createElement("div");
    nameEl.className = "character-name";
    nameEl.textContent = ch.name;

    const roleEl = document.createElement("span");
    roleEl.className = "character-role";
    roleEl.textContent = ch.role;

    meta.appendChild(nameEl);
    meta.appendChild(roleEl);

    const desc = document.createElement("p");
    desc.className = "character-desc";
    desc.textContent = ch.description;

    card.appendChild(img);
    card.appendChild(meta);
    card.appendChild(desc);

    container.appendChild(card);
  });
}

// ===========================
// RENDER SỰ KIỆN
// ===========================
function renderEvents() {
  const container = document.getElementById("event-list");
  if (!container) return;
  container.innerHTML = "";

  events.forEach((ev) => {
    const card = document.createElement("article");
    card.className = "card event-card";

    const title = document.createElement("div");
    title.className = "event-title";
    title.textContent = ev.title;

    const date = document.createElement("div");
    date.className = "event-date";
    date.textContent = ev.date;

    const desc = document.createElement("p");
    desc.className = "event-desc";
    desc.textContent = ev.description;

    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(desc);

    container.appendChild(card);
  });
}

// ===========================
// QUẢN LÝ ĐĂNG NHẬP
// ===========================
function getCurrentUser() {
  return loadFromLocalStorage(LS_CURRENT_USER, null);
}

function setCurrentUser(user) {
  saveToLocalStorage(LS_CURRENT_USER, user);
}

function addUserLog(user) {
  const logs = loadFromLocalStorage(LS_USER_LOGS, []);
  logs.unshift({
    username: user.username,
    role: user.role,
    time: formatDateTime()
  });
  saveToLocalStorage(LS_USER_LOGS, logs);
}

function renderCurrentUser() {
  const user = getCurrentUser();
  const nameEl = document.getElementById("current-username");
  const roleEl = document.getElementById("current-role");
  if (!nameEl || !roleEl) return;

  if (user) {
    nameEl.textContent = user.username;
    roleEl.textContent = user.role === "admin" ? "Admin" : "Người chơi";
  } else {
    nameEl.textContent = "Chưa đăng nhập";
    roleEl.textContent = "-";
  }
}

function renderUserTable() {
  const tbody = document.querySelector("#user-table tbody");
  if (!tbody) return;

  const logs = loadFromLocalStorage(LS_USER_LOGS, []);
  tbody.innerHTML = "";

  logs.forEach((log) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdRole = document.createElement("td");
    const tdTime = document.createElement("td");

    tdName.textContent = log.username;
    tdRole.textContent = log.role === "admin" ? "Admin" : "Người chơi";
    tdTime.textContent = log.time;

    tr.appendChild(tdName);
    tr.appendChild(tdRole);
    tr.appendChild(tdTime);
    tbody.appendChild(tr);
  });
}

// ===========================
// CHAT / TIN NHẮN
// ===========================
function getMessages() {
  return loadFromLocalStorage(LS_CHAT_MESSAGES, []);
}

function addMessage(fromUser, content) {
  const messages = getMessages();
  messages.unshift({
    username: fromUser?.username || "Khách",
    role: fromUser?.role || "guest",
    content,
    time: formatDateTime()
  });
  saveToLocalStorage(LS_CHAT_MESSAGES, messages);
}

function renderMessages() {
  const adminList = document.getElementById("admin-message-list");
  const userList = document.getElementById("user-message-list");
  if (!adminList || !userList) return;

  const messages = getMessages();
  adminList.innerHTML = "";
  userList.innerHTML = "";

  messages.forEach((msg) => {
    const li1 = document.createElement("li");
    li1.className = "message-item";

    const meta1 = document.createElement("div");
    meta1.className = "message-meta";
    meta1.innerHTML = `<span>${msg.username} (${msg.role})</span><span>${msg.time}</span>`;

    const content1 = document.createElement("div");
    content1.textContent = msg.content;

    li1.appendChild(meta1);
    li1.appendChild(content1);

    const li2 = li1.cloneNode(true);

    adminList.appendChild(li1);
    userList.appendChild(li2);
  });
}

// ===========================
// GẮN SỰ KIỆN FORM
// ===========================
function setupLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById("username");
    const roleSelect = document.getElementById("role");
    const username = usernameInput.value.trim();
    const role = roleSelect.value;

    if (!username) {
      alert("Vui lòng nhập tên người dùng.");
      return;
    }

    const user = { username, role };
    setCurrentUser(user);
    addUserLog(user);
    renderCurrentUser();
    renderUserTable();

    alert(`Đăng nhập thành công với tên: ${username} (${role})`);
    form.reset();
  });
}

function setupChatForm() {
  const form = document.getElementById("chat-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const textarea = document.getElementById("chat-message");
    const content = textarea.value.trim();
    if (!content) {
      alert("Vui lòng nhập nội dung tin nhắn.");
      return;
    }

    const currentUser = getCurrentUser();
    addMessage(currentUser, content);
    renderMessages();
    textarea.value = "";
    alert("Đã gửi tin nhắn cho Admin (mô phỏng).");
  });
}

// ===========================
// KHỞI TẠO
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  renderCharacters();
  renderEvents();
  renderCurrentUser();
  renderUserTable();
  renderMessages();
  setupLoginForm();
  setupChatForm();
});