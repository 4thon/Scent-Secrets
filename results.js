const perfumes = window.ScentSecretsDB ? window.ScentSecretsDB.getPerfumes() : [];

const $searchInput = $("#resultsSearch");
const $resultsGrid = $("#resultsGrid");
const $priceSlider = $("#priceSlider");
const $priceLabel = $("#priceLabel");
const $detailPanel = $("#detailPanel");
const $quickPicks = $("#quickPicks .quick-pick");
const $perfumeModal = $("#perfumeModal");
const $closePerfumeModal = $("#closePerfumeModal");
const $familyChecks = $("#filterModal .families input[type='checkbox']");
const $typeChecks = $("#filterModal .types input[type='checkbox']");
const $audienceChecks = $("#filterModal .audiences input[type='checkbox']");
const $filterModal = $("#filterModal");
const $searchBtn = $("#searchBtn");
const $openFilters = $("#openFilters");
const $closeFilters = $("#closeFilters");
const $applyFilters = $("#applyFilters");
const $resetFilters = $("#resetFilters");

let selectedPerfumeName = "";
let activeQuickPick = "";

function formatMaxPrice(value) {
  return `PHP ${Number(value).toLocaleString("en-PH")}`;
}

function formatAudienceLabel(value) {
  if (value === "men") return "For Men";
  if (value === "women") return "For Women";
  return "Unisex";
}

function renderList(list) {
  $resultsGrid.empty();

  if (!list.length) {
    selectedPerfumeName = "";
    $resultsGrid.html('<p class="placeholder">No perfumes match that search.</p>');
    return;
  }

  list.forEach((item, index) => {
    const $card = $(`
      <button class="perfume-card">
        <div class="perfume-image-frame">
          <img src="${item.img}" alt="${item.name}" loading="lazy" decoding="async">
        </div>
        <span class="audience-pill">${formatAudienceLabel(item.audience)}</span>
        <span class="name">${item.name}</span>
        <span class="family">${item.family}</span>
        <span class="price">${item.priceRange}</span>
      </button>
    `);

    if (selectedPerfumeName === item.name) {
      $card.addClass("selected");
    }

    $card.on("click", () => {
      selectedPerfumeName = item.name;
      $(".perfume-card").removeClass("selected");
      $card.addClass("selected");
      showDetail(item);
      $card.get(0).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    });

    if (index === 0) $card.attr("aria-live", "polite");
    $resultsGrid.append($card);

    $card.find("img").on("error", function () {
      $(this).attr("src", "sauvage.jpg");
    });
  });
}

function showDetail(item) {
  $detailPanel.html(`
    <h3>${item.name}</h3>
    <div class="detail-meta">
      <p class="pill">${item.family}</p>
      <p class="audience-pill detail-audience">${formatAudienceLabel(item.audience)}</p>
    </div>
    <img class="detail-img" src="${item.img}" alt="${item.name}">
    <p>${item.desc}</p>
    <p><strong>Audience:</strong> ${formatAudienceLabel(item.audience)}</p>
    <p><strong>Type:</strong> ${item.type}</p>
    <p><strong>Notes:</strong> ${item.notes}</p>
    <p><strong>Scent family:</strong> ${item.family}</p>
    <p><strong>Find at:</strong> ${item.store}</p>
    <p><strong>Price range:</strong> ${item.priceRange}</p>
  `);

  $detailPanel.find("img").on("error", function () {
    $(this).attr("src", "sauvage.jpg");
  });

  openPerfumeModal();
}

function getFilters() {
  const maxPrice = Number($priceSlider.val());
  const families = $familyChecks.filter(":checked").map((_, el) => el.value.toLowerCase()).get();
  const types = $typeChecks.filter(":checked").map((_, el) => el.value.toLowerCase()).get();
  const audiences = $audienceChecks.filter(":checked").map((_, el) => el.value.toLowerCase()).get();
  const term = $searchInput.val().trim().toLowerCase();
  return { maxPrice, families, types, audiences, term };
}

function quickPickMatch(item) {
  if (!activeQuickPick) return true;

  const family = item.family.toLowerCase();
  const notes = item.notes.toLowerCase();
  const type = item.type.toLowerCase();
  const name = item.name.toLowerCase();
  const text = `${family} ${notes} ${type} ${name}`;

  if (activeQuickPick === "office") {
    return text.includes("woody") || text.includes("aromatic") || text.includes("fougere") || text.includes("iris");
  }

  if (activeQuickPick === "date") {
    return (
      text.includes("oriental") ||
      text.includes("amber") ||
      text.includes("vanilla") ||
      text.includes("tonka") ||
      text.includes("tobacco")
    );
  }

  if (activeQuickPick === "summer") {
    return text.includes("aquatic") || text.includes("citrus") || text.includes("marine") || text.includes("fresh");
  }

  if (activeQuickPick === "party") {
    return (
      text.includes("spicy") ||
      text.includes("gourmand") ||
      text.includes("sweet") ||
      text.includes("elixir") ||
      text.includes("eros")
    );
  }

  if (activeQuickPick === "clean") {
    return (
      text.includes("musk") ||
      text.includes("clean") ||
      text.includes("green") ||
      text.includes("cologne") ||
      text.includes("floral fresh")
    );
  }

  return true;
}

function matchesSelectedType(typeText, selectedTypes) {
  if (!selectedTypes.length) return true;

  const type = typeText.toLowerCase();
  return selectedTypes.some((selected) => {
    if (selected === "edt") return type.includes("edt") || type.includes("eau de toilette");
    if (selected === "edp") return type.includes("edp") || type.includes("eau de parfum");
    if (selected === "parfum") return type.includes("parfum");
    if (selected === "cologne") return type.includes("cologne");
    return false;
  });
}

function applyFilters() {
  const { maxPrice, families, types, audiences, term } = getFilters();

  const filtered = perfumes.filter((perfume) => {
    const familyValue = perfume.family.toLowerCase();
    const audienceValue = (perfume.audience || "").toLowerCase();
    const matchPrice = perfume.price <= maxPrice;
    const matchFamily = !families.length || families.some((family) => familyValue.includes(family));
    const matchType = matchesSelectedType(perfume.type, types);
    const matchAudience = !audiences.length || audiences.includes(audienceValue);
    const matchTerm =
      !term ||
      perfume.name.toLowerCase().includes(term) ||
      perfume.store.toLowerCase().includes(term) ||
      familyValue.includes(term) ||
      perfume.notes.toLowerCase().includes(term) ||
      perfume.type.toLowerCase().includes(term) ||
      audienceValue.includes(term) ||
      formatAudienceLabel(perfume.audience).toLowerCase().includes(term);

    return matchPrice && matchFamily && matchType && matchAudience && matchTerm && quickPickMatch(perfume);
  });

  renderList(filtered);
}

function initFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("query");

  if (query) {
    $searchInput.val(query);
  }

  applyFilters();
}

function openFilterModal() {
  $filterModal.addClass("open").attr("aria-hidden", "false");
}

function closeFilterModal() {
  $filterModal.removeClass("open").attr("aria-hidden", "true");
}

function openPerfumeModal() {
  $perfumeModal.addClass("open").attr("aria-hidden", "false");
  $("body").addClass("modal-open");
}

function closePerfumeModal() {
  $perfumeModal.removeClass("open").attr("aria-hidden", "true");
  $("body").removeClass("modal-open");
}

$searchInput.on("input", applyFilters);
$searchBtn.on("click", applyFilters);

$searchInput.on("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyFilters();
  }
});

$priceSlider.on("input", () => {
  $priceLabel.text(formatMaxPrice($priceSlider.val()));
});

$applyFilters.on("click", () => {
  applyFilters();
  closeFilterModal();
});

$resetFilters.on("click", () => {
  $familyChecks.prop("checked", false);
  $typeChecks.prop("checked", false);
  $audienceChecks.prop("checked", false);
  $priceSlider.val(30000).trigger("input");
  $searchInput.val("");
  activeQuickPick = "";
  $quickPicks.removeClass("active");
  selectedPerfumeName = "";
  applyFilters();
});

$familyChecks.on("change", applyFilters);
$typeChecks.on("change", applyFilters);
$audienceChecks.on("change", applyFilters);

$quickPicks.on("click", function () {
  const pick = $(this).data("pick");

  if (activeQuickPick === pick) {
    activeQuickPick = "";
    $quickPicks.removeClass("active");
  } else {
    activeQuickPick = pick;
    $quickPicks.removeClass("active");
    $(this).addClass("active");
  }

  applyFilters();
});

$openFilters.on("click", openFilterModal);
$closeFilters.on("click", closeFilterModal);
$closePerfumeModal.on("click", closePerfumeModal);

$filterModal.on("click", (event) => {
  if ($(event.target).is("#filterModal")) closeFilterModal();
});

$perfumeModal.on("click", (event) => {
  if ($(event.target).is("#perfumeModal")) closePerfumeModal();
});

$(document).on("keydown", (event) => {
  if (event.key === "Escape" && $filterModal.hasClass("open")) closeFilterModal();
  if (event.key === "Escape" && $perfumeModal.hasClass("open")) closePerfumeModal();
});

$(document).ready(() => {
  $priceLabel.text(formatMaxPrice($priceSlider.val()));
  initFromQuery();
});
