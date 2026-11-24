/* =================================
   MY PROFILE - FURINAS(433)
   MAIN JAVASCRIPT
   ================================= */

// โหลดข้อมูลจาก items.json
async function loadItems() {

    try {

        const response = await fetch("data/items.json");

        if (!response.ok) {
            throw new Error("ไม่สามารถโหลดข้อมูลได้");
        }

        const data = await response.json();

        // แสดงรายการเกม
        renderItems("gameList", data.games);

        // แสดงรายการแพลตฟอร์ม
        renderItems("platformList", data.platforms);

    } catch (error) {

        console.error("เกิดข้อผิดพลาด:", error);

        document.getElementById("gameList").innerHTML =
            "<p>ไม่สามารถโหลดข้อมูลเกมได้</p>";

        document.getElementById("platformList").innerHTML =
            "<p>ไม่สามารถโหลดข้อมูลแพลตฟอร์มได้</p>";

    }

}


// สร้างการ์ดรายการต่าง ๆ
function renderItems(targetId, items) {

    const container = document.getElementById(targetId);

    if (!container || !Array.isArray(items)) {
        return;
    }

    container.innerHTML = items.map(item => {

        return `

            <a
                href="detail.html?id=${encodeURIComponent(item.id)}"
                class="item-card"
            >

                <div class="item-icon">

                    ${escapeHTML(item.icon)}

                </div>

                <div class="item-copy">

                    <h3>
                        ${escapeHTML(item.name)}
                    </h3>

                    <p>
                        ${item.kind === "game"
                            ? "ดูข้อมูลเกม"
                            : "ดูข้อมูลแพลตฟอร์ม"}
                    </p>

                </div>

                <div class="card-arrow">
                    ›
                </div>

            </a>

        `;

    }).join("");

}


// ป้องกันข้อความ HTML ที่ไม่ปลอดภัย
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        }[character];

    });

}


// เริ่มต้นระบบ
document.addEventListener("DOMContentLoaded", () => {

    loadItems();

});
