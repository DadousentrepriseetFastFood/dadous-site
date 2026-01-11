document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     HELPERS
  ========================= */
  const PHONE_DADOUS = "50938348938";

  const cartModal = document.getElementById("cart-modal");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("btn-checkout");

  const form = document.getElementById("orderForm");
  const nomInput = document.getElementById("nom");
  const phoneInput = document.getElementById("phone");
  const adresseInput = document.getElementById("adresse");
  const paiementMode = document.getElementById("paiementMode");

  let cart = [];

  /* =========================
     PANIER (OPEN/CLOSE)
  ========================= */
  window.toggleCart = function () {
    if (!cartModal) return;
    cartModal.classList.toggle("show");
  };

  function setCheckoutState() {
    if (!checkoutBtn) return;
    checkoutBtn.disabled = cart.length === 0;
  }

  function renderCart() {
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
      total += item.price;

      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <span>${item.name}</span>
        <span>
          ${item.price} HTG
          <button class="rm-btn" type="button" aria-label="Supprimer">✕</button>
        </span>
      `;

      row.querySelector(".rm-btn").addEventListener("click", () => {
        cart.splice(i, 1);
        renderCart();
      });

      cartItems.appendChild(row);
    });

    cartTotal.textContent = String(total);
    setCheckoutState();
  }

  window.addToCart = function (name, price) {
    cart.push({ name, price: Number(price) });
    renderCart();
    if (cartModal) cartModal.classList.add("show");
  };

  // Boutons + du menu
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.addToCart(btn.dataset.name, parseInt(btn.dataset.price, 10));
    });
  });

  /* =========================
     FINALISER LA COMMANDE
     -> ferme panier + scroll vers #commander
  ========================= */
  function scrollToOrder() {
    if (cartModal) cartModal.classList.remove("show");
    const section = document.getElementById("commander");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return; // verrouillé
      scrollToOrder();
    });
  }

  // État initial bouton
  setCheckoutState();

  /* =========================
     COMMANDE WHATSAPP
  ========================= */
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (cart.length === 0) {
        alert("Votre panier est vide");
        return;
      }

      const nom = (nomInput?.value || "").trim();
      const phone = (phoneInput?.value || "").trim();
      const adresse = (adresseInput?.value || "").trim();
      const mode = (paiementMode?.value || "").trim();

      let liste = "";
      let total = 0;

      cart.forEach((i) => {
        liste += `- ${i.name} (${i.price} HTG)\n`;
        total += i.price;
      });

      const message =
        `🧾 *COMMANDE DADOU’S*\n\n` +
        `👤 Client : ${nom}\n` +
        `📞 WhatsApp : ${phone}\n` +
        `📍 Adresse : ${adresse}\n` +
        `💳 Paiement : ${mode}\n\n` +
        `*PANIER :*\n${liste}\n` +
        `💰 *TOTAL : ${total} HTG*\n\n` +
        `Merci ✅`;

      window.open(
        `https://wa.me/${PHONE_DADOUS}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    });
  }

  /* =========================
     LIGHTBOX (GALERIE + QR)
  ========================= */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Fermer">×</button>
    <img alt="Agrandissement">
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  function openLightbox(src) {
    lbImg.src = src;
    lightbox.classList.add("show");
  }
  function closeLightbox() {
    lightbox.classList.remove("show");
    lbImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // rendre TOUT zoomable (gimg + pay-qr)
  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src));
  });

  /* =========================
     SUPPRIMER IMAGES CASSÉES
     (si pas upload, elles disparaissent)
  ========================= */
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.remove();
    });
  });

  /* =========================
     MENU MOBILE (si tu veux l’activer plus tard)
     -> actuellement ton CSS cache nav en mobile
  ========================= */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.style.display === "flex";
      nav.style.display = open ? "none" : "flex";
    });
  }
});