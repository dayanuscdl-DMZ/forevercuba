/* ForeverCuba: datos y funciones que comparten todas las páginas */
(function () {
  var FC = {};

  /* ---------- Configuración ----------
     url y key: los da Supabase (Project Settings > API). La "anon key" es pública, se puede poner aquí.
     whatsapp: número de ForeverCuba, solo dígitos con código de país. Ej: "5219991234567" */
  FC.CONFIG = { url: "https://lqomoocnhunwreljczhd.supabase.co", key: "sb_publishable_WxclDke7-EPNZxl3PL2Qmw_uf5p3lGq", whatsapp: "",
    /* Redes sociales: pega aquí el enlace de cada perfil */
    redes: { facebook: "", instagram: "", youtube: "" },
    /* Correo donde llegan las solicitudes enviadas por email */
    email: "180dayan@gmail.com" };

  function U(id) { return "https://images.unsplash.com/" + id + "?w=1400&q=70&auto=format&fit=crop"; }
  FC.FALLBACK = "img/fachadas.jpg";

  /* ---------- Comodidades ---------- */
  FC.AMEN = {
    wifi: { es: "Wifi", en: "Wi-Fi", fr: "Wi-Fi", i: '<path d="M2 9a15 15 0 0 1 20 0"/><path d="M5.5 12.5a10 10 0 0 1 13 0"/><path d="M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1"/>' },
    ac: { es: "Aire acondicionado", en: "Air conditioning", fr: "Climatisation", i: '<path d="M12 2v20M4.9 6l14.2 12M4.9 18L19.1 6"/>' },
    cocina: { es: "Cocina equipada", en: "Equipped kitchen", fr: "Cuisine équipée", i: '<path d="M7 3v7a2 2 0 0 0 4 0V3"/><path d="M9 10v11"/><path d="M17 3c-1.7 1.2-2.5 3.4-2.5 6.5h2.5V21"/>' },
    agua: { es: "Agua caliente", en: "Hot water", fr: "Eau chaude", i: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>' },
    piscina: { es: "Piscina", en: "Pool", fr: "Piscine", i: '<path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M8 15V5a2 2 0 0 1 4 0M14 15V5a2 2 0 0 1 4 0M8 9h6"/>' },
    parqueo: { es: "Parqueo", en: "Parking", fr: "Parking", i: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M10 17V8h3a2.5 2.5 0 0 1 0 5h-3"/>' },
    desayuno: { es: "Desayuno disponible", en: "Breakfast available", fr: "Petit-déjeuner disponible", i: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3M12 3v3"/>' },
    terraza: { es: "Terraza o balcón", en: "Terrace or balcony", fr: "Terrasse ou balcon", i: '<path d="M3 21h18M5 21v-8h14v8M9 13v8M15 13v8"/><path d="M12 3l7 6H5z"/>' },
    mar: { es: "Vista al mar", en: "Sea view", fr: "Vue sur la mer", i: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><circle cx="12" cy="7" r="3"/>' },
    lavadora: { es: "Lavadora", en: "Washer", fr: "Lave-linge", i: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><circle cx="12" cy="13" r="4.5"/><path d="M8 6h.01M11 6h.01"/>' },
    tv: { es: "Televisión", en: "TV", fr: "Télévision", i: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>' }
  };

  /* ---------- Propiedades de ejemplo (se usan mientras no haya propiedades reales en el panel) ---------- */
  FC.EJEMPLOS = [
    { id: "ej1", vip: true, tipo: "Casa", ciudad: "Habana Vieja", habitaciones: 3, banos: 2, personas: 6, precio: 55,
      titulo_es: "Casa colonial con patio interior", titulo_en: "Colonial house with inner courtyard", titulo_fr: "Maison coloniale avec patio intérieur",
      desc_es: "Casa del siglo XIX restaurada, con techos altos, arcos y un patio interior lleno de plantas. Está a pocos pasos de la Plaza Vieja y la Catedral, ideal para recorrer La Habana a pie.",
      desc_en: "A restored 19th-century house with high ceilings, arches and a leafy inner courtyard. A few steps from Plaza Vieja and the Cathedral, perfect for exploring Havana on foot.",
      desc_fr: "Maison du XIXe siècle restaurée, avec hauts plafonds, arcades et un patio intérieur plein de plantes. À quelques pas de la Plaza Vieja et de la cathédrale, idéale pour découvrir La Havane à pied.",
      comodidades: ["wifi", "ac", "cocina", "agua", "desayuno", "terraza"],
      fotos: [U("photo-1692197116258-128882f1182b"), U("photo-1781010080404-91041231a6ca"), U("photo-1599202937077-3f7cdc53f2e1"), U("photo-1628797285815-453c1d0d21e3"), U("photo-1658288435034-dadaad151fcd")] },
    { id: "ej2", tipo: "Apartamento", ciudad: "Centro Habana", habitaciones: 2, banos: 1, personas: 4, precio: 40,
      titulo_es: "Apartamento frente al Malecón", titulo_en: "Apartment facing the Malecón", titulo_fr: "Appartement face au Malecón",
      desc_es: "Apartamento luminoso con ventanales al mar. Desde la sala se ve el atardecer sobre el Malecón. Cerca de restaurantes, música en vivo y del Paseo del Prado.",
      desc_en: "A bright apartment with big windows facing the sea. Watch the sunset over the Malecón from the living room. Close to restaurants, live music and Paseo del Prado.",
      desc_fr: "Appartement lumineux avec de grandes baies vitrées sur la mer. Depuis le salon, on voit le coucher du soleil sur le Malecón. Proche des restaurants, de la musique live et du Paseo del Prado.",
      comodidades: ["wifi", "ac", "cocina", "agua", "mar", "tv"],
      fotos: [U("photo-1758448511320-05d7d28f4298"), U("photo-1721738861237-3e804f0c9bcc"), U("photo-1725905507743-30f903ebbf2c"), U("photo-1629079447777-1e605162dc8d"), U("photo-1583847268964-b28dc8f51f92")] },
    { id: "ej3", vip: true, tipo: "Casa", ciudad: "Vedado", habitaciones: 4, banos: 3, personas: 8, precio: 95,
      titulo_es: "Casa con piscina y terraza", titulo_en: "House with pool and terrace", titulo_fr: "Maison avec piscine et terrasse",
      desc_es: "Casa amplia en una calle tranquila del Vedado, con piscina rodeada de jardín tropical y terraza para comer al aire libre. Perfecta para familias o grupos de amigos.",
      desc_en: "A spacious house on a quiet Vedado street, with a pool surrounded by a tropical garden and a terrace for outdoor meals. Perfect for families or groups of friends.",
      desc_fr: "Grande maison dans une rue calme du Vedado, avec piscine entourée d'un jardin tropical et terrasse pour manger dehors. Parfaite pour les familles ou les groupes d'amis.",
      comodidades: ["wifi", "ac", "cocina", "agua", "piscina", "parqueo", "terraza", "lavadora"],
      fotos: [U("photo-1626571115951-15371ba9354b"), U("photo-1600493505873-cddd69453072"), U("photo-1615874959474-d609969a20ed"), U("photo-1768486143865-342d8cc12c90"), U("photo-1620626011761-996317b8d101")] },
    { id: "ej4", vip: true, tipo: "Apartamento", ciudad: "Varadero", habitaciones: 2, banos: 1, personas: 4, precio: 50,
      titulo_es: "Apartamento a cinco minutos de la playa", titulo_en: "Apartment five minutes from the beach", titulo_fr: "Appartement à cinq minutes de la plage",
      desc_es: "Apartamento fresco y cómodo a cinco minutos caminando de la playa de Varadero. Tiene todo lo necesario para unas vacaciones de sol y mar.",
      desc_en: "A cool, comfortable apartment a five-minute walk from Varadero beach. Everything you need for a sun-and-sea holiday.",
      desc_fr: "Appartement frais et confortable à cinq minutes à pied de la plage de Varadero. Tout le nécessaire pour des vacances au soleil.",
      comodidades: ["wifi", "ac", "cocina", "agua", "tv"],
      fotos: [U("photo-1583847268964-b28dc8f51f92"), U("photo-1585128833421-cb27e4911276"), U("photo-1725905507743-30f903ebbf2c"), U("photo-1629079447777-1e605162dc8d"), U("photo-1758448511320-05d7d28f4298")] },
    { id: "ej5", tipo: "Casa", ciudad: "Trinidad", habitaciones: 2, banos: 2, personas: 4, precio: 35,
      titulo_es: "Casa particular en el centro histórico", titulo_en: "Casa particular in the historic center", titulo_fr: "Casa particular dans le centre historique",
      desc_es: "Casa familiar con portal y patio, en las calles empedradas de Trinidad. Los dueños preparan un desayuno cubano casero cada mañana.",
      desc_en: "A family home with a porch and courtyard on Trinidad's cobblestone streets. The owners make a homemade Cuban breakfast every morning.",
      desc_fr: "Maison familiale avec porche et patio, dans les rues pavées de Trinidad. Les propriétaires préparent un petit-déjeuner cubain maison chaque matin.",
      comodidades: ["wifi", "ac", "agua", "desayuno", "terraza"],
      fotos: [U("photo-1532323544230-7191fd51bc1b"), U("photo-1599202937077-3f7cdc53f2e1"), U("photo-1628797285815-453c1d0d21e3"), U("photo-1781010080404-91041231a6ca"), U("photo-1658288435034-dadaad151fcd")] },
    { id: "ej6", tipo: "Casa", ciudad: "Viñales", habitaciones: 2, banos: 1, personas: 4, precio: 30,
      titulo_es: "Casa rural con vista al valle", titulo_en: "Country house with valley views", titulo_fr: "Maison de campagne avec vue sur la vallée",
      desc_es: "Casa de campo con portal y mecedoras frente a los mogotes del Valle de Viñales. Ideal para descansar, caminar y conocer las fincas de tabaco.",
      desc_en: "A country house with a porch and rocking chairs facing the mogotes of the Viñales Valley. Ideal for resting, hiking and visiting tobacco farms.",
      desc_fr: "Maison de campagne avec porche et rocking-chairs face aux mogotes de la vallée de Viñales. Idéale pour se reposer, randonner et visiter les plantations de tabac.",
      comodidades: ["ac", "agua", "desayuno", "terraza", "parqueo"],
      fotos: [U("photo-1560184897-ae75f418493e"), U("photo-1615874959474-d609969a20ed"), U("photo-1768486143865-342d8cc12c90"), U("photo-1658288435034-dadaad151fcd"), U("photo-1620626011761-996317b8d101")] },
    { id: "ej7", tipo: "Apartamento", ciudad: "Vedado", habitaciones: 1, banos: 1, personas: 2, precio: 32,
      titulo_es: "Apartamento con balcón", titulo_en: "Apartment with balcony", titulo_fr: "Appartement avec balcon",
      desc_es: "Apartamento acogedor para parejas, con balcón a la calle y mucha luz natural. Cerca de la Rampa, el Hotel Nacional y los mejores paladares del Vedado.",
      desc_en: "A cozy apartment for couples, with a street-facing balcony and lots of natural light. Close to La Rampa, Hotel Nacional and Vedado's best paladares.",
      desc_fr: "Appartement chaleureux pour les couples, avec balcon sur rue et beaucoup de lumière. Proche de La Rampa, de l'Hôtel Nacional et des meilleurs paladares du Vedado.",
      comodidades: ["wifi", "ac", "cocina", "agua", "terraza", "tv"],
      fotos: [U("photo-1600493505873-cddd69453072"), U("photo-1721738861237-3e804f0c9bcc"), U("photo-1725905507743-30f903ebbf2c"), U("photo-1629079447777-1e605162dc8d"), U("photo-1583847268964-b28dc8f51f92")] },
    { id: "ej8", tipo: "Casa", ciudad: "Cienfuegos", habitaciones: 3, banos: 2, personas: 6, precio: 45,
      titulo_es: "Casa familiar cerca de la bahía", titulo_en: "Family house near the bay", titulo_fr: "Maison familiale près de la baie",
      desc_es: "Casa elegante de estilo colonial francés, a pocas cuadras de la bahía de Cienfuegos y del Parque Martí. Espaciosa y tranquila.",
      desc_en: "An elegant French-colonial style house a few blocks from Cienfuegos Bay and Parque Martí. Spacious and quiet.",
      desc_fr: "Élégante maison de style colonial français, à quelques rues de la baie de Cienfuegos et du parc Martí. Spacieuse et calme.",
      comodidades: ["wifi", "ac", "cocina", "agua", "desayuno", "parqueo"],
      fotos: [U("photo-1775146089517-79a8ac943a7b"), U("photo-1585128833421-cb27e4911276"), U("photo-1628797285815-453c1d0d21e3"), U("photo-1620626011761-996317b8d101"), U("photo-1692197116258-128882f1182b")] }
  ];

  /* ---------- Textos de una propiedad según el idioma ---------- */
  FC.titulo = function (p, l) { return p["titulo_" + l] || p.titulo_es || ""; };
  FC.desc = function (p, l) { return p["desc_" + l] || p.desc_es || ""; };
  FC.foto = function (p, i) { return (p.fotos && p.fotos[i || 0]) || FC.FALLBACK; };

  /* ---------- Cargar propiedades (del panel si está conectado; si no, los ejemplos) ---------- */
  var cache = null;
  FC.conectado = function () { return !!(FC.CONFIG.url && FC.CONFIG.key); };
  FC.cargar = function () {
    if (cache) return cache;
    if (!FC.conectado()) { cache = Promise.resolve(FC.EJEMPLOS); return cache; }
    var q = FC.CONFIG.url.replace(/\/$/, "") + "/rest/v1/propiedades?select=*&publicado=eq.true&order=orden.asc,creado.desc";
    cache = fetch(q, { headers: { apikey: FC.CONFIG.key } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (rows) { return rows && rows.length ? rows : FC.EJEMPLOS; })
      .catch(function () { return FC.EJEMPLOS; });
    return cache;
  };
  FC.buscar = function (id) {
    return FC.cargar().then(function (list) {
      for (var i = 0; i < list.length; i++) if (String(list[i].id) === String(id)) return list[i];
      return null;
    });
  };

  /* ---------- Idioma guardado ---------- */
  FC.idioma = function () {
    try {
      var s = localStorage.getItem("fc-lang");
      if (s === "es" || s === "en" || s === "fr") return s;
      var n = (navigator.language || "es").slice(0, 2);
      if (n === "en" || n === "fr") return n;
    } catch (e) {}
    return "es";
  };
  FC.guardarIdioma = function (l) { try { localStorage.setItem("fc-lang", l); } catch (e) {} };

  FC.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- Nuestros Lugares Forever ---------- */
  FC.LUG_CATS = {
    restaurante: { es: "Restaurantes", en: "Restaurants", fr: "Restaurants", c: "#E31C5F", i: '<path d="M7 3v7a2 2 0 0 0 4 0V3"/><path d="M9 10v11"/><path d="M17 3c-1.7 1.2-2.5 3.4-2.5 6.5h2.5V21"/>' },
    bar: { es: "Bares", en: "Bars", fr: "Bars", c: "#C9A227", i: '<path d="M5 4h14l-7 8z"/><path d="M12 12v8M8 20h8"/>' },
    cafe: { es: "Cafés", en: "Cafés", fr: "Cafés", c: "#8A5A3C", i: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3M12 3v3"/>' },
    musica: { es: "Música y noche", en: "Music & nightlife", fr: "Musique et soirées", c: "#6B4FBB", i: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>' },
    experiencia: { es: "Experiencias", en: "Experiences", fr: "Expériences", c: "#0B7A75", i: '<path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/>' }
  };
  var cacheLug = null;
  FC.cargarLugares = function (ejemplos) {
    if (cacheLug) return cacheLug;
    if (!FC.conectado()) { cacheLug = Promise.resolve(ejemplos); return cacheLug; }
    var q = FC.CONFIG.url.replace(/\/$/, "") + "/rest/v1/lugares?select=*&publicado=eq.true&order=orden.asc,creado.desc";
    cacheLug = fetch(q, { headers: { apikey: FC.CONFIG.key } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (rows) { return rows && rows.length ? rows : ejemplos; })
      .catch(function () { return ejemplos; });
    return cacheLug;
  };

  /* Enlaces de redes sociales (arriba, antes de las banderas) */
  document.querySelectorAll("a.red[data-red]").forEach(function (a) {
    var u = FC.CONFIG.redes && FC.CONFIG.redes[a.getAttribute("data-red")];
    if (u) a.href = u;
  });

  /* ---------- Enviar por email (para quien no tiene WhatsApp en la computadora) ---------- */
  var MAILTX = {
    es: { btn: "Enviar por email", pick: "¿Con qué correo lo envías?", gmail: "Gmail", outlook: "Outlook / Hotmail", app: "Mi app de correo", copy: "Copiar el mensaje", copied: "Mensaje copiado. Pégalo en un correo y envíalo a {e}", subj: "Solicitud de viaje · ForeverCuba" },
    en: { btn: "Send by email", pick: "Which email do you use?", gmail: "Gmail", outlook: "Outlook / Hotmail", app: "My email app", copy: "Copy the message", copied: "Message copied. Paste it into an email and send it to {e}", subj: "Trip request · ForeverCuba" },
    fr: { btn: "Envoyer par e-mail", pick: "Avec quelle messagerie ?", gmail: "Gmail", outlook: "Outlook / Hotmail", app: "Mon application e-mail", copy: "Copier le message", copied: "Message copié. Collez-le dans un e-mail et envoyez-le à {e}", subj: "Demande de voyage · ForeverCuba" }
  };
  function mt(k) { var l = document.documentElement.lang; return (MAILTX[l] || MAILTX.es)[k]; }
  var MAIL_ICO = '<svg viewBox="0 0 24 24" aria-hidden="true" style="width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/></svg>';
  /* Crea el botón "Enviar por email". cuerpo(): texto del mensaje. antes(): si devuelve false, no se abre. */
  FC.correoBtn = function (cuerpo, asunto, antes) {
    var wrap = document.createElement("span"); wrap.className = "mail-wrap";
    wrap.innerHTML = '<button type="button" class="btn mail-btn" aria-haspopup="true" aria-expanded="false">' + MAIL_ICO + '<span class="mail-t"></span></button><div class="mail-pop" hidden></div>';
    var btn = wrap.querySelector(".mail-btn"), pop = wrap.querySelector(".mail-pop");
    wrap.querySelector(".mail-t").textContent = mt("btn");
    btn.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      if (!pop.hidden) { pop.hidden = true; btn.setAttribute("aria-expanded", "false"); return; }
      if (antes && antes() === false) return;
      var to = FC.CONFIG.email, s = encodeURIComponent((asunto && asunto()) || mt("subj")), b = encodeURIComponent(cuerpo() || "");
      pop.innerHTML = '<p>' + FC.esc(mt("pick")) + '</p>' +
        '<a href="https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) + '&su=' + s + '&body=' + b + '" target="_blank" rel="noopener">' + FC.esc(mt("gmail")) + '</a>' +
        '<a href="https://outlook.live.com/mail/0/deeplink/compose?to=' + encodeURIComponent(to) + '&subject=' + s + '&body=' + b + '" target="_blank" rel="noopener">' + FC.esc(mt("outlook")) + '</a>' +
        '<a href="mailto:' + to + '?subject=' + s + '&body=' + b + '">' + FC.esc(mt("app")) + '</a>' +
        '<button type="button" class="mail-copy">' + FC.esc(mt("copy")) + '</button><p class="mail-ok" role="status"></p>';
      pop.querySelector(".mail-copy").addEventListener("click", function (ev) {
        ev.stopPropagation();
        var txt = cuerpo() || "", ok = pop.querySelector(".mail-ok");
        var done = function () { ok.textContent = mt("copied").replace("{e}", to); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, done); else done();
      });
      pop.hidden = false; btn.setAttribute("aria-expanded", "true");
    });
    return wrap;
  };
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".mail-pop:not([hidden])").forEach(function (p) {
      if (!p.parentNode.contains(e.target)) { p.hidden = true; p.parentNode.querySelector(".mail-btn").setAttribute("aria-expanded", "false"); }
    });
    if (e.target.closest && e.target.closest(".lang")) setTimeout(function () {
      document.querySelectorAll(".mail-t").forEach(function (t) { t.textContent = mt("btn"); });
    }, 0);
  });

  /* ---------- Enviar solicitud automáticamente: se guarda en el panel y llega por correo ---------- */
  FC.SOLTX = {
    es: { phone: "Tu teléfono (WhatsApp)", phone_ph: "Ej. +52 999 123 4567", mail: "Tu correo", mail_ph: "tucorreo@ejemplo.com", send: "Enviar solicitud", sending: "Enviando…",
      ok: "¡Listo! Recibimos tu solicitud. Te contactaremos muy pronto por correo o por teléfono.", err: "No se pudo enviar. Revisa tu internet e inténtalo otra vez, o escríbenos por WhatsApp.",
      need: "Para enviar, escribe tu nombre, tu teléfono y tu correo.", wa_alt: "Prefiero WhatsApp", m_phone: "Teléfono", m_mail: "Correo" },
    en: { phone: "Your phone (WhatsApp)", phone_ph: "E.g. +1 305 123 4567", mail: "Your email", mail_ph: "you@example.com", send: "Send request", sending: "Sending…",
      ok: "Done! We received your request. We'll contact you very soon by email or phone.", err: "It couldn't be sent. Check your internet and try again, or message us on WhatsApp.",
      need: "To send, please enter your name, phone and email.", wa_alt: "I prefer WhatsApp", m_phone: "Phone", m_mail: "Email" },
    fr: { phone: "Votre téléphone (WhatsApp)", phone_ph: "Ex. +33 6 12 34 56 78", mail: "Votre e-mail", mail_ph: "vous@exemple.com", send: "Envoyer la demande", sending: "Envoi…",
      ok: "C'est fait ! Nous avons reçu votre demande. Nous vous contacterons très vite par e-mail ou par téléphone.", err: "L'envoi a échoué. Vérifiez votre connexion et réessayez, ou écrivez-nous sur WhatsApp.",
      need: "Pour envoyer, indiquez votre nom, votre téléphone et votre e-mail.", wa_alt: "Je préfère WhatsApp", m_phone: "Téléphone", m_mail: "E-mail" }
  };
  FC.st = function (k) { var l = document.documentElement.lang; return (FC.SOLTX[l] || FC.SOLTX.es)[k]; };
  /* d = { origen, asunto, nombre, telefono, email, mensaje } */
  FC.enviarSolicitud = function (d) {
    var guardar = FC.conectado() ? fetch(FC.CONFIG.url.replace(/\/$/, "") + "/rest/v1/solicitudes", {
      method: "POST", headers: { apikey: FC.CONFIG.key, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({ origen: d.origen, nombre: d.nombre || null, telefono: d.telefono || null, email: d.email || null, mensaje: d.mensaje })
    }).then(function (r) { if (!r.ok) throw new Error("db " + r.status); return true; }) : Promise.reject(new Error("sin base"));
    var correo = fetch("https://formsubmit.co/ajax/" + encodeURIComponent(FC.CONFIG.email), {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: d.asunto || "Nueva solicitud · ForeverCuba", _template: "box", _captcha: "false",
        Nombre: d.nombre || "", "Teléfono": d.telefono || "", email: d.email || "", Solicitud: d.mensaje, Origen: d.origen + " · " + location.href.split("#")[0] })
    }).then(function (r) { if (!r.ok) throw new Error("mail " + r.status); return r.json(); });
    /* Basta con que una de las dos funcione para que la solicitud no se pierda */
    return Promise.allSettled([guardar, correo]).then(function (res) {
      if (res[0].status === "fulfilled" || res[1].status === "fulfilled") return true;
      throw res[0].reason || res[1].reason;
    });
  };

  /* ---------- Autos (del panel; si no hay, la página usa su lista de ejemplo) ---------- */
  var cacheAutos = null;
  FC.cargarAutos = function () {
    if (cacheAutos) return cacheAutos;
    if (!FC.conectado()) { cacheAutos = Promise.resolve([]); return cacheAutos; }
    var q = FC.CONFIG.url.replace(/\/$/, "") + "/rest/v1/autos?select=*&publicado=eq.true&order=orden.asc,precio.asc";
    cacheAutos = fetch(q, { headers: { apikey: FC.CONFIG.key } })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .catch(function () { return []; });
    return cacheAutos;
  };

  /* Modo VIP: lo que se abre desde Servicio VIP se ve en negro y dorado. El logo lo apaga. */
  FC.vipActivo = function () { try { return sessionStorage.getItem("fc-vip") === "1"; } catch (e) { return false; } };
  FC.vip = function (on) {
    try { if (on) sessionStorage.setItem("fc-vip", "1"); else sessionStorage.removeItem("fc-vip"); } catch (e) {}
    document.documentElement.classList.toggle("modo-vip", !!on);
  };
  if (FC.vipActivo()) document.documentElement.classList.add("modo-vip");
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a.brand");
    if (a) { try { sessionStorage.removeItem("fc-vip"); } catch (err) {} }
  }, true);
  window.FC = FC;
})();
