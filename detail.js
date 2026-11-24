
const params = new URLSearchParams(window.location.search);

const itemId = params.get("id");

const detailIcon = document.getElementById("detailIcon");
const detailName = document.getElementById("detailName");
const detailDescription = document.getElementById("detailDescription");
const detailExtra = document.getElementById("detailExtra");

async function loadDetail() {
  try {
    const response = await fetch("data/items.json");

    if (!response.ok) {
      throw new Error("ไม่สามารถโหลดข้อมูลได้");
    }

    const data = await response.json();

    const allItems = [
      ...data.games,
      ...data.platforms
    ];

    const item = allItems.find(entry => entry.id === itemId);

    if (!item) {
      detailIcon.textContent = "❓";
      detailName.textContent = "ไม่พบข้อมูล";
      detailDescription.textContent = "ไม่พบเกมหรือแพลตฟอร์มที่คุณกำลังค้นหา";
      detailExtra.textContent = "กรุณากลับไปเลือกใหม่";
      return;
    }

    detailIcon.textContent = item.icon;
    detailName.textContent = item.name;
    detailDescription.textContent = item.description;
    detailExtra.textContent = "ยังไม่มีข้อมูลเพิ่มเติม";

    document.title = item.name + " | My Profile";

  } catch (error) {
    detailName.textContent = "เกิดข้อผิดพลาด";
    detailDescription.textContent = "ไม่สามารถโหลดข้อมูลได้";
    console.error(error);
  }
}

loadDetail();
