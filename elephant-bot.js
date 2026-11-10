
(function () {
  "use strict";

  var KB = window.LANKA_KB;

  var CFG = window.EBOT || {};
  var BOTTOM_OFFSET = CFG.bottomOffset || 0; // keeps elephant above a bottom nav bar
  var GRAVITY = 0.8;      // px per frame^2 (at 60fps)
  var FLOOR_GAP = 6;      // space kept under the elephant
  var DRAG_THRESHOLD = 6; // px before a press becomes a drag

  /* Elephant SVG  */
  var SVG =
    '<svg class="el" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<g class="el-all">' +
      // tail
      '<path class="tail" d="M84 98 q16 2 12 22" fill="none" stroke="#8fa6cb" stroke-width="5" stroke-linecap="round"/>' +
      // legs
      '<g class="leg leg-l"><rect x="40" y="104" width="17" height="28" rx="8.5" fill="#9db2d3"/><ellipse cx="48.5" cy="130" rx="8" ry="3.5" fill="#fff" opacity=".85"/></g>' +
      '<g class="leg leg-r"><rect x="63" y="104" width="17" height="28" rx="8.5" fill="#9db2d3"/><ellipse cx="71.5" cy="130" rx="8" ry="3.5" fill="#fff" opacity=".85"/></g>' +
      // body
      '<rect x="32" y="72" width="56" height="46" rx="23" fill="#a9bddb"/>' +
      // decorated cloth (like Perahera elephants)
      '<path d="M38 84 h44 v24 q-22 9 -44 0z" fill="#b3262f"/>' +
      '<path d="M38 84 h44" stroke="#f0b429" stroke-width="3"/>' +
      '<path d="M40 106 q20 8 40 0" fill="none" stroke="#f0b429" stroke-width="2.5" stroke-dasharray="3 3"/>' +
      '<circle cx="60" cy="95" r="4" fill="#f0b429"/>' +
      // ears
      '<g class="ear ear-l"><ellipse cx="24" cy="48" rx="21" ry="26" fill="#8fa6cb"/><ellipse cx="25.5" cy="49" rx="12.5" ry="18" fill="#f6bccb"/></g>' +
      '<g class="ear ear-r"><ellipse cx="96" cy="48" rx="21" ry="26" fill="#8fa6cb"/><ellipse cx="94.5" cy="49" rx="12.5" ry="18" fill="#f6bccb"/></g>' +
      // head
      '<circle cx="60" cy="50" r="32" fill="#a9bddb"/>' +
      // forehead cloth
      '<path d="M40 32 Q60 14 80 32 Q60 25 40 32z" fill="#f0b429"/>' +
      '<path d="M60 21 l4 6 h-8z" fill="#b3262f"/>' +
      // cheeks
      '<circle cx="41" cy="62" r="6" fill="#f6bccb" opacity=".85"/>' +
      '<circle cx="79" cy="62" r="6" fill="#f6bccb" opacity=".85"/>' +
      // eyes: open
      '<g class="eyes eyes-open">' +
        '<circle cx="48" cy="48" r="4.8" fill="#2b2d42"/><circle cx="72" cy="48" r="4.8" fill="#2b2d42"/>' +
        '<circle cx="49.6" cy="46.2" r="1.7" fill="#fff"/><circle cx="73.6" cy="46.2" r="1.7" fill="#fff"/>' +
      '</g>' +
      // eyes: worried (dragging / falling)
      '<g class="eyes eyes-worried">' +
        '<circle cx="48" cy="48" r="7" fill="#fff"/><circle cx="72" cy="48" r="7" fill="#fff"/>' +
        '<circle cx="48" cy="50" r="3.4" fill="#2b2d42"/><circle cx="72" cy="50" r="3.4" fill="#2b2d42"/>' +
        '<path d="M40 38 l14 4 M80 38 l-14 4" stroke="#2b2d42" stroke-width="2.2" stroke-linecap="round"/>' +
      '</g>' +
      // eyes: dizzy (landed)
      '<g class="eyes eyes-dizzy" stroke="#2b2d42" stroke-width="2.6" stroke-linecap="round" fill="none">' +
        '<path d="M43 43 l10 10 M53 43 l-10 10"/><path d="M67 43 l10 10 M77 43 l-10 10"/>' +
      '</g>' +
      // tusks
      '<path d="M50 72 q-6 6 -2 11 q2 -5 6 -7z" fill="#fffaf0"/>' +
      '<path d="M70 72 q6 6 2 11 q-2 -5 -6 -7z" fill="#fffaf0"/>' +
      // trunk
      '<g class="trunk"><path d="M60 58 C60 80 62 88 53 93" fill="none" stroke="#a9bddb" stroke-width="14" stroke-linecap="round"/>' +
      '<path d="M57 70 q3 1 6 0 M57 78 q3 1 6 0" stroke="#8fa6cb" stroke-width="1.6" stroke-linecap="round" fill="none"/></g>' +
    '</g></svg>';

  /*  Build DOM  */
  var root = document.createElement("div");
  root.className = "ebot air";
  root.setAttribute("role", "button");
  root.setAttribute("aria-label", "Open Sri Lanka chat with Ayu the elephant");
  root.tabIndex = 0;
  root.innerHTML =
    '<div class="ebot-bubble"></div>' +
    '<div class="ebot-stars"><span>★</span><span>★</span><span>★</span></div>' +
    '<div class="ebot-sprite is-fall">' + SVG + '</div>' +
    '<div class="ebot-shadow"></div>';

  var panel = document.createElement("section");
  panel.className = "ebot-panel";
  panel.setAttribute("aria-label", "Sri Lanka chat");
  panel.innerHTML =
    '<header class="ebot-head">' +
      '<div class="ebot-avatar">🐘</div>' +
      '<div class="ebot-title"><strong>' + KB.name + ' the Elephant</strong><small>Your Sri Lanka guide</small></div>' +
      '<button class="ebot-close" type="button" aria-label="Close chat">✕</button>' +
    '</header>' +
    '<div class="ebot-msgs" aria-live="polite"></div>' +
    '<div class="ebot-chips"></div>' +
    '<form class="ebot-form" autocomplete="off">' +
      '<input type="text" placeholder="Ask about Sri Lanka…" aria-label="Your message" maxlength="200">' +
      '<button type="submit" aria-label="Send">➤</button>' +
    '</form>';

  document.body.appendChild(root);
  document.body.appendChild(panel);

  var sprite = root.querySelector(".ebot-sprite");
  var bubble = root.querySelector(".ebot-bubble");
  var msgs = panel.querySelector(".ebot-msgs");
  var chips = panel.querySelector(".ebot-chips");
  var form = panel.querySelector(".ebot-form");
  var input = form.querySelector("input");

  /* Position + physics state */
  var W = root.offsetWidth, H = root.offsetHeight;
  var bx = 0, by = 0, bw = window.innerWidth, bh = window.innerHeight;
  function updateBounds() {
    var el = CFG.container ? document.querySelector(CFG.container) : null;
    if (el) {
      var r = el.getBoundingClientRect();
      bx = Math.max(0, r.left); by = Math.max(0, r.top);
      bw = Math.min(r.right, window.innerWidth) - bx;
      bh = Math.min(r.bottom, window.innerHeight) - by;
    } else {
      bx = 0; by = 0; bw = window.innerWidth; bh = window.innerHeight;
    }
  }
  updateBounds();
  var x = bx + bw - W - 16, y = by - H - 30;   // starts above the screen and drops in
  var vx = 0, vy = 0;
  var phys = "air";                   // 'air' | 'ground' | 'drag'
  var swing = 0, swingVel = 0;
  var lastX = x, lastY = y, smoothVX = 0, smoothVY = 0;
  var visTimer = null, bubbleTimer = null, talkTimer = null;
  var landedOnce = false;
  var last = performance.now();

  function floorY() { return by + bh - H - FLOOR_GAP - BOTTOM_OFFSET; }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function setVis(name) {
    sprite.className = "ebot-sprite is-" + name;
    root.classList.toggle("landed", name === "land");
  }
  function clearVisTimer() { if (visTimer) { clearTimeout(visTimer); visTimer = null; } }

  function showBubble(text, ms) {
    bubble.textContent = text;
    bubble.classList.add("show");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { bubble.classList.remove("show"); }, ms || 4000);
  }
  function hideBubble() { clearTimeout(bubbleTimer); bubble.classList.remove("show"); }

  /* ---------- Landing sequence: splat → dizzy → get up ---------- */
  function land() {
    clearVisTimer();
    setVis("land");
    visTimer = setTimeout(function () {
      setVis("getup");
      visTimer = setTimeout(function () {
        visTimer = null;
        setVis("idle");
        if (!landedOnce) {
          landedOnce = true;
          showBubble("Ayubowan! 🙏 Tap me to chat, or pick me up!", 5000);
        }
      }, 520);
    }, 1250);
  }

  /* Main loop */
  function frame(now) {
    var dt = Math.min((now - last) / 16.667, 2.5);
    last = now;
    updateBounds();

    if (phys === "drag") {
      var rvx = (x - lastX) / dt, rvy = (y - lastY) / dt;
      smoothVX = smoothVX * 0.6 + rvx * 0.4;
      smoothVY = smoothVY * 0.6 + rvy * 0.4;
    } else if (phys === "air") {
      vy += GRAVITY * dt;
      x += vx * dt;
      y += vy * dt;
      if (x < bx) { x = bx; vx = -vx * 0.5; }
      if (x > bx + bw - W) { x = bx + bw - W; vx = -vx * 0.5; }
      var fl = floorY();
      if (y >= fl) {
        y = fl;
        if (vy > 7) {
          var impact = vy;
          vy = -vy * 0.32;
          vx *= 0.7;
          if (impact > 8 && !visTimer) land();
        } else {
          vy = 0;
          phys = "ground";
          root.classList.remove("air");
          if (!visTimer) setVis("idle");
        }
      }
    } else if (phys === "ground") {
      x += vx * dt;
      vx *= Math.pow(0.82, dt);
      if (Math.abs(vx) < 0.1) vx = 0;
      x = clamp(x, bx, bx + bw - W);
      y = floorY();
    }

    // swing spring (pendulum around the head)
    var target = phys === "drag" ? clamp(smoothVX * 1.8, -40, 40) : 0;
    swingVel = swingVel * 0.84 + (target - swing) * 0.12;
    swing += swingVel * dt;
    if (phys !== "drag" && Math.abs(swing) < 0.05 && Math.abs(swingVel) < 0.05) swing = 0;
    sprite.style.setProperty("--swing", swing.toFixed(2) + "deg");

    lastX = x; lastY = y;
    root.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
    requestAnimationFrame(frame);
  }

  /* Pointer: drag vs click  */
  var pressing = false, dragging = false, startX = 0, startY = 0, pid = null;

  root.addEventListener("pointerdown", function (e) {
    if (e.button !== undefined && e.button > 0) return;
    pressing = true; dragging = false;
    startX = e.clientX; startY = e.clientY; pid = e.pointerId;
    try { root.setPointerCapture(pid); } catch (err) {}
  });

  root.addEventListener("pointermove", function (e) {
    if (!pressing) return;
    if (!dragging) {
      if (Math.hypot(e.clientX - startX, e.clientY - startY) < DRAG_THRESHOLD) return;
      dragging = true;
      phys = "drag";
      clearVisTimer();
      setVis("drag");
      root.classList.add("dragging", "air");
      hideBubble();
      closePanel();
      smoothVX = smoothVY = 0;
    }
    // hold the elephant by the top of its head
    x = clamp(e.clientX - W / 2, bx, bx + bw - W);
    y = clamp(e.clientY - 14, by, by + bh - H - BOTTOM_OFFSET);
  });

  function endPress(e) {
    if (!pressing) return;
    pressing = false;
    try { root.releasePointerCapture(pid); } catch (err) {}
    root.classList.remove("dragging");
    if (dragging) {
      dragging = false;
      vx = clamp(smoothVX, -30, 30);
      vy = clamp(smoothVY, -30, 30);
      phys = "air";
      setVis("fall");   // flails until it hits the ground
    } else if (e && e.type === "pointerup") {
      togglePanel();
    }
  }
  root.addEventListener("pointerup", endPress);
  root.addEventListener("pointercancel", endPress);
  root.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); togglePanel(); }
  });

  window.addEventListener("resize", function () {
    updateBounds();
    x = clamp(x, bx, bx + bw - W);
    if (phys === "ground" || phys === "air") { phys = "air"; if (!visTimer) setVis("fall"); root.classList.add("air"); }
    placePanel();
  });

  /* Chat panel */
  var isOpen = false, greeted = false;

  function placePanel() {
    if (window.matchMedia("(max-width: 480px)").matches) {
      panel.style.left = ""; panel.style.top = ""; return;
    }
    updateBounds();
    if (CFG.container) panel.style.width = Math.min(340, bw - 16) + "px";
    var pw = panel.offsetWidth, ph = panel.offsetHeight;
    var left = clamp(x + W - pw, bx + 8, bx + bw - pw - 8);
    var top = (y > by + bh / 2) ? y - ph - 8 : y + H + 8;
    top = clamp(top, by + 8, by + bh - ph - 8);
    panel.style.left = left + "px";
    panel.style.top = top + "px";
  }
  function openPanel() {
    if (isOpen) return;
    isOpen = true;
    hideBubble();
    placePanel();
    panel.classList.add("open");
    if (!greeted) {
      greeted = true;
      addMsg(KB.welcome, "bot", true);
      setChips(KB.startChips);
    }
    setTimeout(function () { input.focus({ preventScroll: true }); }, 220);
  }
  function closePanel() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove("open");
    input.blur();
  }
  function togglePanel() { isOpen ? closePanel() : openPanel(); }

  panel.querySelector(".ebot-close").addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanel(); });

  /* ---------- Messages ---------- */
  function addMsg(content, who, isHtml) {
    var el = document.createElement("div");
    el.className = "ebot-msg " + who;
    if (isHtml) el.innerHTML = content; else el.textContent = content;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }
  function setChips(list) {
    chips.innerHTML = "";
    (list || []).forEach(function (label) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.addEventListener("click", function () { send(label); });
      chips.appendChild(b);
    });
    chips.style.display = (list && list.length) ? "flex" : "none";
  }

  function findTopic(text) {
    var q = " " + text.toLowerCase().replace(/[^a-z0-9'\s-]/g, " ").replace(/\s+/g, " ") + " ";
    var best = null, bestScore = 0;
    KB.topics.forEach(function (t) {
      var score = 0;
      t.keys.forEach(function (k) {
        if (q.indexOf(k) !== -1) score += k.length; // longer keyword = more specific
      });
      if (score > bestScore) { bestScore = score; best = t; }
    });
    return best;
  }

  var busy = false;
  function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;
    addMsg(text, "user", false);
    input.value = "";
    setChips([]);

    var typing = addMsg('<span class="ebot-typing"><i></i><i></i><i></i></span>', "bot", true);
    var topic = findTopic(text);
    setTimeout(function () {
      typing.remove();
      addMsg(topic ? topic.answer : KB.fallback, "bot", true);
      setChips(topic ? topic.chips : KB.fallbackChips);
      busy = false;
      root.classList.add("talk");
      clearTimeout(talkTimer);
      talkTimer = setTimeout(function () { root.classList.remove("talk"); }, 520);
    }, 550 + Math.random() * 400);
  }

  form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });

  /*  Go  */
  setVis("fall");
  requestAnimationFrame(function (t) { last = t; requestAnimationFrame(frame); });
})();

/* nav bar */
function toggleMenu() {
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('drawerOverlay');
  
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

/* frequency ask questions */
function toggleFaq(button) {
  const item = button.parentElement;
  const isActive = item.classList.contains('active');
  

  if (!isActive) {
    item.classList.add('active');
  } else {
    item.classList.remove('active');
  }
}
