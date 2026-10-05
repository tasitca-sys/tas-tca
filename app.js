/* ============================================================
   Taşıtça — uygulama mantığı
   Ürün kartları, detay penceresi, sepet, ödeme adımı, intro.
   Normalde bu dosyaya dokunmanız gerekmez; metin ve ürünler js/data.js içinde.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- yardımcılar ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);

  const esc = (str) => String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const formatPrice = (n) => `${Number(n).toLocaleString("tr-TR")} ${CONFIG.currency}`;

  const whatsappLink = (message) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const ICONS = {
    placeholder: `<svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="21" y="8" width="22" height="38" rx="4"/><path d="M14 22h7M43 22h7M32 46v8M24 54h16"/></svg>`,
    shield: `<path d="M12 3l7 3v5.5c0 4.7-3.2 8.3-7 9.5-3.8-1.2-7-4.8-7-9.5V6l7-3z"/><path d="M9 12l2 2 4-4"/>`,
    card:   `<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 14.5h4"/>`,
    bolt:   `<path d="M13 3L5 13.5h6l-1 7.5 8-10.5h-6l1-7.5z"/>`,
    gem:    `<path d="M7 4h10l4 5-9 11L3 9l4-5z"/><path d="M3 9h18M9 4l3 5 3-5"/>`,
    list:   `<path d="M4 7h9M4 12h9M4 17h9"/><path d="M16 12l2 2 3.5-3.5"/>`,
    chat:   `<path d="M4 5h16v11H9l-5 4V5z"/>`,
    truck:  `<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/>`,
    badge:  `<path d="M12 3l2.2 1.6 2.7-.3.9 2.6 2.4 1.3-.7 2.6.7 2.6-2.4 1.3-.9 2.6-2.7-.3L12 19l-2.2-1.6-2.7.3-.9-2.6-2.4-1.3.7-2.6-.7-2.6 2.4-1.3.9-2.6 2.7.3z"/><path d="M9.5 11.5l1.8 1.8 3.4-3.6"/>`,
  };

  const iconSvg = (name) =>
    `<svg class="trust__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

  /* image: IMAGES içindeki anahtar ya da doğrudan dosya yolu / adres */
  const resolveImage = (key) =>
    key ? ((typeof IMAGES !== "undefined" && IMAGES[key]) || key) : "";

  /* Görsel varsa <img>, yoksa placeholder */
  const mediaHtml = (p) => p.image
    ? `<img src="${esc(resolveImage(p.image))}" alt="${esc(p.alt || p.name)}" loading="lazy">`
    : `<div class="placeholder">${ICONS.placeholder}<small>Ürün görseli</small></div>`;

  /* Fiyat: eski fiyat varsa üstü çizili, ardından güncel fiyat */
  const priceHtml = (p) => (p.oldPrice && p.oldPrice > p.price)
    ? `<s class="price__old">${formatPrice(p.oldPrice)}</s>${formatPrice(p.price)}`
    : formatPrice(p.price);

  /* WhatsApp mesajındaki ürün adı: "Nero Ring (Siyah)" */
  const orderName = (p) => p.color ? `${p.name} (${p.color})` : p.name;

  const isLight = (color) => /beyaz|white|krem|bej|gri/i.test(color || "");
  const swatchStyle = (p) => p.colorHex ? ` style="background:${esc(p.colorHex)};border-color:${esc(p.colorHex)}"` : "";
  const colorHtml = (p) => p.color
    ? `<span class="product__color"><span class="swatch${isLight(p.color) ? " swatch--light" : ""}"${swatchStyle(p)}></span>${esc(p.color)}</span>`
    : "";

  /* ---------- ürün kartı ---------- */
  const productCard = (p) => `
    <article class="product">
      <button class="product__media${p.image ? " has-image" : ""}" type="button" data-open="${esc(p.id)}" aria-label="${esc(p.name)} ürün detayını gör">
        ${mediaHtml(p)}
      </button>
      <div class="product__body">
        <div class="product__row">
          <h3 class="product__name">${esc(p.name)}</h3>
          <span class="product__price">${priceHtml(p)}</span>
        </div>
        <p class="product__sub">${esc(p.subtitle || CONFIG.subtitle)}</p>
        ${colorHtml(p)}
        <p class="product__ship"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.truck}</svg>${esc(CONFIG.deliveryLine)}</p>
        <div class="product__actions">
          <button class="btn btn--block" type="button" data-add="${esc(p.id)}">Sepete Ekle</button>
          <button class="product__more" type="button" data-open="${esc(p.id)}">Ürün detayı</button>
        </div>
      </div>
    </article>`;

  const trustItem = (t) => `
    <li class="trust__item">
      ${iconSvg(t.icon)}
      <div>
        <h3 class="trust__title">${esc(t.title)}</h3>
        <p class="trust__text">${esc(t.text)}</p>
      </div>
    </li>`;

  /* ---------- render ---------- */
  $("#product-grid").innerHTML = PRODUCTS.map(productCard).join("");
  $("#trust-list").innerHTML = TRUST.map(trustItem).join("");

  $("#footer-whatsapp").href = whatsappLink(CONFIG.generalMessage);

  /* ---------- ürün detay penceresi ---------- */
  const modal = $("#modal");
  let lastFocus = null;

  function openModal(id) {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;

    const media = $("#modal-media");
    media.innerHTML = mediaHtml(p) + `<span class="ship-badge">${esc(CONFIG.badgeText)}</span>`;
    media.classList.toggle("has-image", Boolean(p.image));
    $("#modal-sub").textContent = (p.subtitle || CONFIG.subtitle) + (p.color ? ` — ${p.color}` : "");
    $("#modal-title").textContent = p.name;
    $("#modal-price").innerHTML = priceHtml(p);
    $("#modal-desc").textContent = p.description || "";
    $("#modal-features").innerHTML = (p.features || []).map((f) => `<li>${esc(f)}</li>`).join("");
    $("#modal-delivery").textContent = CONFIG.deliveryLine;
    $("#modal-shipping").textContent = CONFIG.shippingLine;
    $("#modal-warranty").textContent = CONFIG.warrantyLine;
    $("#modal-payment").textContent = CONFIG.paymentLine;
    $("#modal-add").dataset.add = p.id;
    setWarranty(false);   // her ürün açılışında kapalı başlar

    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("is-locked");
    $(".modal__close", modal).focus();
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  /* ---------- sepet ---------- */
  const cartEl = $("#cart");
  const STORAGE_KEY = "tasitca-cart";
  let cart = [];            // [{ id, qty }]
  let cartLastFocus = null;

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      cart = saved.filter((item) => PRODUCTS.some((p) => p.id === item.id) && item.qty > 0);
    } catch (err) { cart = []; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (err) { /* depolama yoksa sorun değil */ }
  }

  const productOf = (id) => PRODUCTS.find((p) => p.id === id);
  const cartCount = () => cart.reduce((n, item) => n + item.qty, 0);
  const cartTotal = () => cart.reduce((sum, item) => sum + productOf(item.id).price * item.qty, 0);

  function addToCart(id, qty = 1) {
    if (!productOf(id)) return;
    const line = cart.find((item) => item.id === id);
    if (line) line.qty += qty; else cart.push({ id, qty });
    saveCart();
    renderCart();
  }
  function setQty(id, qty) {
    const line = cart.find((item) => item.id === id);
    if (!line) return;
    line.qty = qty;
    if (line.qty <= 0) cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
  }

  const cartItemHtml = (item) => {
    const p = productOf(item.id);
    return `
      <li class="cart-item" data-id="${esc(p.id)}">
        <div class="cart-item__media${p.image ? " has-image" : ""}">${mediaHtml(p)}</div>
        <div>
          <div class="cart-item__row">
            <span class="cart-item__name">${esc(p.name)}</span>
            <span class="cart-item__price">${formatPrice(p.price * item.qty)}</span>
          </div>
          <p class="cart-item__meta">${esc(p.color ? p.color + " · " : "")}${formatPrice(p.price)} / adet</p>
          <div class="cart-item__controls">
            <div class="qty" aria-label="Adet">
              <button type="button" data-qty="-1" aria-label="Azalt">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty="1" aria-label="Artır">+</button>
            </div>
            <button class="cart-item__remove" type="button" data-remove>Kaldır</button>
          </div>
        </div>
      </li>`;
  };

  const cartLines = () => cart.map((item) => {
    const p = productOf(item.id);
    return `• ${item.qty} × ${orderName(p)} — ${formatPrice(p.price * item.qty)}`;
  }).join("\n");

  function renderCart() {
    const count = cartCount();
    const countEl = $("#cart-count");
    countEl.textContent = count;
    countEl.hidden = count === 0;

    $("#cart-list").innerHTML = cart.map(cartItemHtml).join("");
    $("#cart-empty").hidden = cart.length > 0;
    $("#cart-foot").hidden = cart.length === 0 || !$("#checkout-view").hidden;
    $("#cart-total").textContent = formatPrice(cartTotal());
    $("#cart-note").textContent = `${CONFIG.deliveryLine} ${CONFIG.shippingLine}`;

    // ödeme adımı
    $("#checkout-summary").innerHTML = cart.map((item) => {
      const p = productOf(item.id);
      return `<li><span>${item.qty} × ${esc(orderName(p))}</span><span>${formatPrice(p.price * item.qty)}</span></li>`;
    }).join("");
    $("#checkout-total").textContent = formatPrice(cartTotal());
    $("#checkout-whatsapp").href = whatsappLink(CONFIG.cartMessage(cartLines(), formatPrice(cartTotal())));

    if (cart.length === 0) showCartView("cart");
  }

  function showCartView(view) {
    const checkout = view === "checkout";
    $("#cart-view").hidden = checkout;
    $("#checkout-view").hidden = !checkout;
    $("#cart-foot").hidden = checkout || cart.length === 0;
    $("#cart-title").textContent = checkout ? "Ödeme" : "Sepet";
    if (checkout) $("#checkout-view").scrollTop = 0;
  }

  function openCart(view = "cart") {
    closeModal();
    showCartView(view);
    cartLastFocus = document.activeElement;
    cartEl.hidden = false;
    document.body.classList.add("is-locked");
    $(".drawer__close", cartEl).focus();
  }
  function closeCart() {
    if (cartEl.hidden) return;
    cartEl.hidden = true;
    document.body.classList.remove("is-locked");
    if (cartLastFocus && typeof cartLastFocus.focus === "function") cartLastFocus.focus();
  }

  /* ---------- garanti kapsamları (açılır alan) ---------- */
  const warrantyToggle = $("#warranty-toggle");
  const warrantyPanel = $("#warranty-panel");
  $("#warranty-covered").innerHTML = (CONFIG.warranty.covered || []).map((t) => `<li>${esc(t)}</li>`).join("");
  $("#warranty-excluded").innerHTML = (CONFIG.warranty.excluded || []).map((t) => `<li>${esc(t)}</li>`).join("");
  $("#warranty-note").textContent = CONFIG.warranty.note || "";

  function setWarranty(open) {
    warrantyToggle.setAttribute("aria-expanded", String(open));
    warrantyPanel.classList.toggle("is-open", open);
  }

  /* ---------- kargom ne zaman ulaşır? (il / ilçe) ---------- */
  const etaToggle = $("#eta-toggle");
  const etaPanel = $("#eta-panel");
  const etaIl = $("#eta-il");
  const etaIlce = $("#eta-ilce");
  const etaResult = $("#eta-result");
  const etaHint = $("#eta-hint");

  etaIl.innerHTML = `<option value="">İl seçin</option>` +
    TR_IL_ILCE.map(([il]) => `<option value="${esc(il)}">${esc(il)}</option>`).join("");

  function setEta(open) {
    etaToggle.setAttribute("aria-expanded", String(open));
    etaPanel.classList.toggle("is-open", open);
  }

  function showEtaResult() {
    const il = etaIl.value;
    const ilce = etaIlce.value;
    const ready = Boolean(il && ilce);
    etaResult.hidden = !ready;
    etaHint.hidden = ready;
    if (ready) {
      etaResult.innerHTML =
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.truck}</svg>` +
        `<span>${esc(il)}, ${esc(ilce)}: ${esc(CONFIG.etaText)}.</span>`;
    }
  }

  etaIl.addEventListener("change", () => {
    const entry = TR_IL_ILCE.find(([il]) => il === etaIl.value);
    if (entry) {
      etaIlce.disabled = false;
      etaIlce.innerHTML = `<option value="">İlçe seçin</option>` +
        entry[1].map((ilce) => `<option value="${esc(ilce)}">${esc(ilce)}</option>`).join("");
    } else {
      etaIlce.disabled = true;
      etaIlce.innerHTML = `<option value="">Önce il seçin</option>`;
    }
    showEtaResult();
  });
  etaIlce.addEventListener("change", showEtaResult);

  $("#checkout-text").textContent = CONFIG.checkoutText;
  $("#checkout-delivery").textContent = CONFIG.deliveryLine;
  $("#checkout-shipping").textContent = CONFIG.shippingLine;
  $("#checkout-warranty").textContent = CONFIG.warrantyLine;
  $("#checkout-payment").textContent = CONFIG.paymentLine;

  loadCart();
  renderCart();

  /* ---------- olaylar ---------- */
  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) {
      addToCart(add.dataset.add);
      add.classList.add("is-added");
      const label = add.textContent;
      add.textContent = "Sepete eklendi";
      setTimeout(() => { add.classList.remove("is-added"); add.textContent = label; }, 1400);
      openCart("cart");
      return;
    }

    const opener = e.target.closest("[data-open]");
    if (opener) { openModal(opener.dataset.open); return; }
    if (e.target.closest("[data-close]")) { closeModal(); return; }

    if (e.target.closest("#warranty-toggle")) {
      setWarranty(warrantyToggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    if (e.target.closest("#eta-toggle")) {
      setEta(etaToggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    if (e.target.closest("[data-warranty-less]")) {
      setWarranty(false);
      warrantyToggle.focus({ preventScroll: true });
      warrantyToggle.scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }

    if (e.target.closest("#cart-open")) { openCart("cart"); return; }
    if (e.target.closest("[data-cart-close]")) { closeCart(); return; }
    if (e.target.closest("#go-checkout")) { showCartView("checkout"); return; }
    if (e.target.closest("#back-to-cart")) { showCartView("cart"); return; }

    const row = e.target.closest(".cart-item");
    if (row) {
      const qtyBtn = e.target.closest("[data-qty]");
      if (qtyBtn) {
        const line = cart.find((item) => item.id === row.dataset.id);
        if (line) setQty(row.dataset.id, line.qty + Number(qtyBtn.dataset.qty));
      } else if (e.target.closest("[data-remove]")) {
        setQty(row.dataset.id, 0);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!modal.hidden) closeModal();
    else closeCart();
  });

  /* ---------- intro: video oynar, 1.3 sn sonra sayfa belirir ---------- */
  const intro = $("#intro");
  const video = $("#intro-video");
  let introDone = false;
  let timerStarted = false;

  function endIntro() {
    if (introDone) return;
    introDone = true;
    intro.classList.add("is-out");
    document.body.classList.add("is-ready");
    document.body.classList.remove("is-locked");
    setTimeout(() => { video.pause(); intro.remove(); }, 500);
  }

  function startTimer() {
    if (timerStarted) return;
    timerStarted = true;
    setTimeout(endIntro, CONFIG.introDuration);
  }

  document.body.classList.add("is-locked");

  video.addEventListener("playing", startTimer);   // sayaç, görüntü akmaya başlayınca çalışır
  video.addEventListener("ended", endIntro);        // klip daha kısaysa bitince geç
  video.addEventListener("error", endIntro);        // video yüklenemezse bekletme

  const playAttempt = video.play();
  if (playAttempt && typeof playAttempt.catch === "function") {
    playAttempt.then(startTimer).catch(endIntro);   // otomatik oynatma engellenirse doğrudan sayfaya geç
  }

  setTimeout(endIntro, CONFIG.introDuration + 2500); // güvenlik: her durumda sayfa açılır
})();
