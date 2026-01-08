/* =========================
   MENU MOBILE (BURGER)
========================= */
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const isHidden =
      nav.style.display === "none" ||
      getComputedStyle(nav).display === "none";

    nav.style.display = isHidden ? "flex" : "none";
    burger.setAttribute("aria-expanded", isHidden ? "true" : "false");
  });
}

/* =========================
   FILTRE GALERIE
========================= */
const chips = document.querySelectorAll(".chip");
const images = document.querySelectorAll(".gimg");

chips.forEach((btn) => {
  btn.addEventListener("click", () => {
    chips.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    images.forEach((img) => {
      if (filter === "all" || img.classList.contains(filter)) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  });
});

/* =========================
   LIGHTBOX (ZOOM IMAGE)
========================= */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");

function openLightbox(src, alt) {
  lbImg.src = src;
  lbImg.alt = alt || "Aperçu";
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

images.forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.src, img.alt);
  });
});

if (lbClose) {
  lbClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* =========================
   FORMULAIRE COMMANDE → WHATSAPP
========================= */
const orderForm = document.getElementById("orderForm");

if (orderForm) {
  orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const tel = document.getElementById("telephone").value.trim();
    const commande = document.getElementById("commandeText").value.trim();
    const adresse = document.getElementById("adresse").value.trim();
    const paiement = document.getElementById("paiementMode").value;

    if (!nom || !tel || !commande || !adresse || !paiement) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const message = `
🛒 NOUVELLE COMMANDE – DADOU’S

👤 Nom : ${nom}
📞 Téléphone : ${tel}

🍽️ Commande :
${commande}

📍 Adresse :
${adresse}

💳 Mode de paiement : ${paiement}
    `;

    const whatsappURL =
      "https://wa.me/50938348938?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
}
// ====== Preuve paiement -> WhatsApp ======
const sendProofBtn = document.getElementById("sendProofBtn");

if (sendProofBtn) {
  sendProofBtn.addEventListener("click", () => {
    const nom = (document.getElementById("c_name")?.value || "").trim();
    const wa = (document.getElementById("c_wa")?.value || "").trim();
    const produit = document.getElementById("c_product")?.value || "";
    const qty = document.getElementById("c_qty")?.value || "1";
    const paiement = document.getElementById("c_pay")?.value || "";
    const adresse = (document.getElementById("c_addr")?.value || "").trim();

    const msg =
`Bonjour Dadou’s 👋
✅ Je viens de faire le paiement.

Nom: ${nom || "-"}
WhatsApp: ${wa || "-"}
Produit: ${produit || "-"}
Quantité: ${qty || "-"}
Mode de paiement: ${paiement || "-"}
Adresse: ${adresse || "-"}

📸 Voici ma preuve de paiement :`;

    const phone = "50938348938";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  });
}
