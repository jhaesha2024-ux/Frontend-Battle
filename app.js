const PRICING_MATRIX = {
  tiers: {
    Starter: {
      base: { INR: 1290, USD: 19, EUR: 17 },
      features: ["5 Projects", "Basic Analytics", "Community Support", "5GB Storage"],
      accent: "#7c3aed",
      icon: "chart-pie.svg",
      gridClass: "bento-node--sm"
    },
    Pro: {
      base: { INR: 3490, USD: 49, EUR: 45 },
      features: ["25 Projects", "Advanced Analytics", "Priority Support", "50GB Storage", "Custom Domains"],
      featured: true,
      accent: "#06b6d4",
      icon: "cog-8-tooth.svg",
      gridClass: "bento-node--md"
    },
    Enterprise: {
      base: { INR: 7990, USD: 99, EUR: 89 },
      features: ["Unlimited Projects", "Enterprise Analytics", "24/7 Dedicated Support", "Unlimited Storage", "Custom Integrations", "SLA Guarantee"],
      accent: "#22c55e",
      icon: "arrow-trending-up.svg",
      gridClass: "bento-node--lg"
    }
  },
  annualDiscount: 0.8,
  tariffs: { INR: 1.0, USD: 1.0, EUR: 0.93 }
};

const state = {
  billing: "monthly",
  currency: "INR",
  activeBentoIndex: -1,
  isMobile: false
};

function computePrice(tier, billing, currency) {
  const base = PRICING_MATRIX.tiers[tier].base[currency];
  const tariff = PRICING_MATRIX.tariffs[currency];
  if (billing === "annual") {
    const annualTotal = base * tariff * 12 * PRICING_MATRIX.annualDiscount;
    const monthly = annualTotal / 12;
    return Math.round(monthly);
  }
  return Math.round(base * tariff);
}

function formatPrice(amount, currency) {
  switch (currency) {
    case "INR":
      return "\u20B9" + amount.toLocaleString("en-IN");
    case "USD":
      return "$" + amount.toLocaleString("en-US");
    case "EUR":
      return "\u20AC" + amount.toLocaleString("en-US");
    default:
      return amount.toString();
  }
}

// Isolated price update - ONLY touches price text nodes
function updatePrices() {
  requestAnimationFrame(() => {
    const priceEls = document.querySelectorAll(".price-value[data-billing][data-currency]");
    priceEls.forEach(el => {
      const tier = el.dataset.tier;
      const value = computePrice(tier, state.billing, state.currency);
      el.textContent = formatPrice(value, state.currency);
    });

    const billingBadges = document.querySelectorAll(".billing-badge");
    billingBadges.forEach(el => {
      el.textContent = state.billing === "annual" ? "Billed annually" : "Billed monthly";
    });

    const accordionPriceEls = document.querySelectorAll(".accordion-price[data-billing][data-currency]");
    accordionPriceEls.forEach(el => {
      const tier = el.dataset.tier;
      const value = computePrice(tier, state.billing, state.currency);
      el.textContent = formatPrice(value, state.currency);
    });
  });
}

function setActiveBento(index) {
  state.activeBentoIndex = index;
  document.querySelectorAll(".bento-node").forEach((node, i) => {
    node.dataset.active = i === index ? "true" : "false";
  });
}

function openAccordionItem(index) {
  document.querySelectorAll(".accordion-item").forEach((item, i) => {
    const isOpen = i === index && state.isMobile;
    item.dataset.open = isOpen ? "true" : "false";
    const btn = item.querySelector(".accordion-trigger");
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function buildBentoNodes() {
  const grid = document.getElementById("bento-grid");
  if (!grid) return;
  
  const entries = Object.entries(PRICING_MATRIX.tiers);
  grid.innerHTML = entries.map(([tier, data], index) => {
    const price = computePrice(tier, state.billing, state.currency);
    const badge = data.featured
      ? `<div class="node-badge">
           <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
           Most Popular
         </div>`
      : "";

    const featuresHtml = data.features.map(f => `
      <li class="feature-item">
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${f}</span>
      </li>`).join("");

    return `
      <article class="bento-node ${data.gridClass}" data-tier="${tier}" data-index="${index}" role="listitem" style="--accent:${data.accent}">
        <div class="bento-inner">
          <div class="node-top">
            <div class="node-title-wrap">
              <img class="tier-icon" alt="" src="./${data.icon}" />
              <h3 class="node-title">${tier}</h3>
            </div>
            ${badge}
          </div>
          <div class="node-price-wrap">
            <span class="price-value" data-tier="${tier}" data-billing="${state.billing}" data-currency="${state.currency}">${formatPrice(price, state.currency)}</span>
            <span class="price-period">/mo</span>
          </div>
          <div class="billing-badge">${state.billing === "annual" ? "Billed annually" : "Billed monthly"}</div>
          <ul class="feature-list">${featuresHtml}</ul>
          <button class="cta-btn ${data.featured ? "cta-primary" : ""}" type="button">
            ${data.featured ? "Get Started" : "Choose Plan"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function buildAccordionItems() {
  const acc = document.getElementById("accordion");
  if (!acc) return;
  
  const entries = Object.entries(PRICING_MATRIX.tiers);
  acc.innerHTML = entries.map(([tier, data], index) => {
    const price = computePrice(tier, state.billing, state.currency);
    const badge = data.featured
      ? `<span class="accordion-badge">Most Popular</span>`
      : "";

    const featuresHtml = data.features.map(f => `
      <li class="feature-item">
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>${f}</span>
      </li>`).join("");

    return `
      <div class="accordion-item" data-tier="${tier}" data-index="${index}" data-open="false" role="listitem" style="--accent:${data.accent}">
        <button class="accordion-trigger" type="button" aria-expanded="false">
          <div class="accordion-trigger-left">
            <h3 class="accordion-title">${tier}</h3>
            ${badge}
          </div>
          <div class="accordion-trigger-right">
            <div class="accordion-price-wrap">
              <span class="price-value accordion-price" data-tier="${tier}" data-billing="${state.billing}" data-currency="${state.currency}">${formatPrice(price, state.currency)}</span>
              <span class="price-period">/mo</span>
            </div>
            <svg class="accordion-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </button>
        <div class="accordion-body">
          <div class="accordion-body-inner">
            <div class="accordion-content">
              <div class="billing-badge">${state.billing === "annual" ? "Billed annually" : "Billed monthly"}</div>
              <ul class="feature-list">${featuresHtml}</ul>
              <button class="cta-btn ${data.featured ? "cta-primary" : ""}" type="button">
                ${data.featured ? "Get Started" : "Choose Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function initControls() {
  const billingMonthly = document.getElementById("billing-monthly");
  const billingAnnual = document.getElementById("billing-annual");
  const billingToggle = document.querySelector(".toggle");
  const currencySelect = document.getElementById("currency");

  if (billingMonthly && billingAnnual && billingToggle) {
    billingMonthly.addEventListener("click", () => {
      if (state.billing === "monthly") return;
      state.billing = "monthly";
      billingToggle.dataset.active = "monthly";
      billingMonthly.setAttribute("aria-pressed", "true");
      billingAnnual.setAttribute("aria-pressed", "false");
      updatePrices();
    });

    billingAnnual.addEventListener("click", () => {
      if (state.billing === "annual") return;
      state.billing = "annual";
      billingToggle.dataset.active = "annual";
      billingAnnual.setAttribute("aria-pressed", "true");
      billingMonthly.setAttribute("aria-pressed", "false");
      updatePrices();
    });
  }

  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      if (state.currency === e.target.value) return;
      state.currency = e.target.value;
      updatePrices();
    });
  }
}

function initBentoHover() {
  const nodes = document.querySelectorAll(".bento-node");
  nodes.forEach((node, i) => {
    node.addEventListener("mouseenter", () => {
      setActiveBento(i);
    });
    node.addEventListener("mouseleave", () => {
      setActiveBento(-1);
    });
    node.addEventListener("focus", () => {
      setActiveBento(i);
    });
    node.addEventListener("blur", () => {
      setActiveBento(-1);
    });
  });
}

function initAccordion() {
  const items = document.querySelectorAll(".accordion-item");
  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", () => {
      const isOpen = item.dataset.open === "true";
      const index = parseInt(item.dataset.index, 10);
      openAccordionItem(isOpen ? -1 : index);
      state.activeBentoIndex = isOpen ? -1 : index;
    });
  });
}

// Context lock: when resizing past mobile breakpoint, transfer active index
function initResizeObserver() {
  const mql = window.matchMedia("(max-width: 768px)");
  state.isMobile = mql.matches;

  function handleChange(e) {
    const wasNotMobile = !state.isMobile;
    state.isMobile = e.matches;
    if (wasNotMobile && e.matches && state.activeBentoIndex >= 0) {
      openAccordionItem(state.activeBentoIndex);
    } else if (!wasNotMobile && !e.matches) {
      openAccordionItem(-1);
    }
  }

  mql.addEventListener("change", handleChange);
}

// 3D particle background using native canvas
function initCanvas() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width, height, particles = [];
  let animationId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function initParticles() {
    const count = Math.min(60, Math.floor((width * height) / 25000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.alpha})`;
      ctx.fill();
    });

    ctx.strokeStyle = "rgba(6, 182, 212, 0.06)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    animationId = requestAnimationFrame(draw);
  }

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      initParticles();
    }, 200);
  });
  
  resize();
  initParticles();
  draw();
}

function init() {
  buildBentoNodes();
  buildAccordionItems();
  initControls();
  initBentoHover();
  initAccordion();
  initResizeObserver();
  initCanvas();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
