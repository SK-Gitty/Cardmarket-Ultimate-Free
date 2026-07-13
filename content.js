function replaceCameraIcons() {
    document.querySelectorAll(".thumbnail-icon").forEach(icon => {

        if (icon.dataset.imageLoaded) {
            return;
        }

        const html = icon.getAttribute("data-bs-title");
        if (!html) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const sourceImg = doc.querySelector("img");

        if (!sourceImg) return;

        const imageUrl = sourceImg.src;

        icon.innerHTML = "";

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Card";

        img.style.width = "120px";
        img.style.height = "168px";
        img.style.objectFit = "contain";
        img.style.display = "block";
        img.style.borderRadius = "4px";

        icon.appendChild(img);

        // Moving the picture to the right of checkmark box
        icon.style.display = "flex";
        icon.style.alignItems = "center";
        icon.style.justifyContent = "flex-start";
        icon.style.marginLeft = "30px";

        // Making the row bigger
        const td = icon.closest("td");
        if (td) {
            td.style.width = "170px";
            td.style.minWidth = "170px";
            td.style.maxWidth = "170px";
            td.style.padding = "4px";
            td.style.verticalAlign = "middle";
            td.style.overflow = "visible";
        }

        // Making the rows taller
        const row = icon.closest("tr");
        if (row) {
            row.style.height = "190px";
            row.style.minHeight = "190px";

            row.querySelectorAll("td").forEach(cell => {
                cell.style.height = "190px";
                cell.style.verticalAlign = "middle";
            });
        }

        icon.dataset.imageLoaded = "true";
    });
}

function applyLayout() {

    document.querySelectorAll("table").forEach(table => {
        table.style.tableLayout = "auto";
    });

    // Making sure the checkbox is not pushed in to picture
    const rows = document.querySelectorAll("tr");

    rows.forEach(row => {

        const cells = row.querySelectorAll("td");

        if (cells.length > 1) {

            // Checkbox-kolonne
            cells[0].style.width = "40px";
            cells[0].style.minWidth = "40px";

            // Billede-kolonne
            cells[1].style.width = "170px";
            cells[1].style.minWidth = "170px";
        }
    });
}

function initialize() {
    applyLayout();
    replaceCameraIcons();
}

initialize();

new MutationObserver(() => {
    initialize();
}).observe(document.body, {
    childList: true,
    subtree: true
});