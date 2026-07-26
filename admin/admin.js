(() => {
  "use strict";

  const STORAGE = {
    projects: "aslinAdmin.projects.v1",
    services: "aslinAdmin.services.v1",
    messages: "aslinAdmin.messages.v1",
    content: "aslinAdmin.content.v1",
    settings: "aslinAdmin.settings.v1"
  };

  const defaults = {
    projects: [
      { id: "project-aslin-ai", name: "ASLIN AI", category: "Yapay Zekâ · SaaS", description: "Yapay zekâ destekli modern çalışma alanı.", image: "../logo.png", url: "../projects/aslin-ai/dist/", status: "Aktif" },
      { id: "project-marisento", name: "Marisento", category: "Konaklama · Turizm", description: "Premium konaklama markası için keşif odaklı web deneyimi.", image: "../projects/marisento-hotel/assets/marisento-exterior.webp", url: "../projects/marisento-hotel/", status: "Aktif" },
      { id: "project-zeron", name: "ZERON Studio", category: "Mimarlık · Portfolyo", description: "Editoryal ve çağdaş mimarlık portfolyo deneyimi.", image: "../projects/zeron-studio/preview.png", url: "../projects/zeron-studio/dist/", status: "Aktif" }
    ],
    services: [
      { id: "service-web", title: "Kurumsal Web Tasarım", description: "Marka kimliğinizi doğru yansıtan, güven veren ve hedef odaklı web siteleri.", order: 1, active: true },
      { id: "service-commerce", title: "E-Ticaret Çözümleri", description: "Ürünlerinizi etkili biçimde sunan, güvenli ve dönüşüm odaklı mağazalar.", order: 2, active: true },
      { id: "service-responsive", title: "Mobil Uyumlu Arayüzler", description: "Telefon, tablet ve masaüstünde tutarlı çalışan hızlı arayüzler.", order: 3, active: true },
      { id: "service-ux", title: "UI / UX Tasarımı", description: "Kullanıcı ihtiyaçlarını iş hedefleriyle buluşturan deneyimler.", order: 4, active: true },
      { id: "service-refresh", title: "Web Sitesi Yenileme", description: "Mevcut siteniz için tasarım, performans ve kullanılabilirlik dönüşümü.", order: 5, active: true },
      { id: "service-support", title: "Teknik Destek ve Bakım", description: "Güncelleme, güvenlik ve performans ihtiyaçları için sürekli destek.", order: 6, active: true }
    ],
    messages: [
      { id: "message-1", name: "Deniz Karaca", email: "deniz@northco.com", subject: "Kurumsal web sitesi teklifi", date: "2026-07-25", read: false, body: "Merhaba,\n\nYeni kurduğumuz danışmanlık şirketi için kurumsal web sitesi teklifi almak istiyoruz. Süreç ve yaklaşık takvim hakkında bilgi paylaşabilir misiniz?\n\nTeşekkürler." },
      { id: "message-2", name: "Mert Aydın", email: "mert@atelierma.com", subject: "Portfolyo projesi", date: "2026-07-24", read: false, body: "Mimarlık stüdyomuzun portfolyosunu yenilemek istiyoruz. ZERON Studio benzeri editoryal bir yaklaşım için görüşebilir miyiz?" },
      { id: "message-3", name: "Selin Uçar", email: "selin@novaretail.com", subject: "E-ticaret danışmanlığı", date: "2026-07-22", read: true, body: "Mevcut e-ticaret sitemizin mobil dönüşüm oranını iyileştirmek için UI/UX desteğine ihtiyacımız var." },
      { id: "message-4", name: "Ege Demir", email: "ege@localworks.co", subject: "Bakım ve teknik destek", date: "2026-07-20", read: true, body: "Web sitemiz için aylık bakım, güvenlik güncellemesi ve performans takibi hizmetiniz hakkında bilgi rica ediyorum." }
    ],
    content: {
      heroTitle: "Dijital Dünyada Güçlü Bir Başlangıç Yapın",
      heroDescription: "Markanızı dijitalde büyüten modern, hızlı ve etkili web deneyimleri geliştiriyoruz.",
      servicesDescription: "İş hedeflerinize uygun, kullanıcı odaklı ve sürdürülebilir dijital çözümler.",
      projectsDescription: "ASLIN TECH’in farklı sektörler için geliştirdiği demo ve örnek çalışmaları inceleyin.",
      whyDescription: "Projelerinizi güvenli, hızlı ve modern teknolojilerle hayata geçiriyoruz.",
      contactTitle: "Projenizi Birlikte Hayata Geçirelim",
      contactDescription: "Yeni projenizi konuşmak ve size özel çözüm planı oluşturmak için bizimle iletişime geçin."
    },
    settings: {
      siteName: "ASLIN TECH",
      email: "info@aslintech.com",
      hours: "Pazartesi–Cuma, 09:00–18:00",
      location: "İstanbul, Türkiye",
      maintenance: false,
      emailNotifications: true,
      weeklySummary: true,
      projectUpdates: false
    }
  };

  const clone = value => JSON.parse(JSON.stringify(value));
  const load = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : clone(fallback);
    } catch {
      return clone(fallback);
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      toast("Değişiklik tarayıcıda saklanamadı.");
      return false;
    }
  };
  const uid = prefix => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const formatDate = value => new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T12:00:00`));

  let state = {
    projects: load(STORAGE.projects, defaults.projects),
    services: load(STORAGE.services, defaults.services),
    messages: load(STORAGE.messages, defaults.messages),
    content: load(STORAGE.content, defaults.content),
    settings: load(STORAGE.settings, defaults.settings)
  };
  let editorContext = null;
  let lastFocused = null;

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  function toast(message) {
    const item = document.createElement("div");
    item.className = "toast";
    item.textContent = message;
    $("#toast-region").append(item);
    window.setTimeout(() => item.remove(), 2800);
  }

  function statusClass(status) {
    return status === "Aktif" ? "active" : status === "Taslak" ? "draft" : "passive";
  }

  function renderOverview() {
    const unread = state.messages.filter(message => !message.read).length;
    const stats = [
      ["Toplam proje", state.projects.length, "◇", "Portfolyo kaydı"],
      ["Aktif demo", state.projects.filter(project => project.status === "Aktif").length, "●", "Yayındaki proje"],
      ["Hizmet sayısı", state.services.length, "▦", `${state.services.filter(service => service.active).length} aktif hizmet`],
      ["Yeni mesaj", unread, "✉", unread ? "Yanıt bekliyor" : "Yeni mesaj yok"]
    ];
    $("#stats-grid").innerHTML = stats.map(item => `
      <article class="stat-card">
        <div class="stat-head"><p>${escapeHTML(item[0])}</p><span class="stat-icon" aria-hidden="true">${item[2]}</span></div>
        <strong>${item[1]}</strong><small>${escapeHTML(item[3])}</small>
      </article>`).join("");

    $("#recent-projects").innerHTML = state.projects.slice(-3).reverse().map(project => `
      <div class="compact-project">
        <img class="thumb" src="${escapeHTML(project.image)}" alt="" loading="lazy">
        <span><strong>${escapeHTML(project.name)}</strong><small>${escapeHTML(project.category)}</small></span>
        <span class="status ${statusClass(project.status)}">${escapeHTML(project.status)}</span>
      </div>`).join("") || '<p class="empty-state">Henüz proje eklenmedi.</p>';

    $("#recent-messages").innerHTML = state.messages.slice(0, 3).map(message => `
      <button class="message-preview" type="button" data-view-message="${escapeHTML(message.id)}">
        <span class="message-preview-top"><strong>${escapeHTML(message.name)}</strong><time datetime="${escapeHTML(message.date)}">${formatDate(message.date)}</time></span>
        <p>${escapeHTML(message.subject)}</p>
      </button>`).join("") || '<p class="empty-state">Mesaj bulunmuyor.</p>';
  }

  function renderProjects(query = "") {
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    const items = state.projects.filter(project => `${project.name} ${project.category}`.toLocaleLowerCase("tr-TR").includes(needle));
    $("#project-count").textContent = `${state.projects.length} proje kayıtlı`;
    $("#projects-table").innerHTML = items.map(project => `
      <tr>
        <td data-label="Proje"><div class="project-cell"><img class="thumb" src="${escapeHTML(project.image)}" alt="" loading="lazy"><span><strong>${escapeHTML(project.name)}</strong><small>${escapeHTML(project.description)}</small></span></div></td>
        <td data-label="Kategori">${escapeHTML(project.category)}</td>
        <td data-label="Durum"><span class="status ${statusClass(project.status)}">${escapeHTML(project.status)}</span></td>
        <td data-label="İşlemler"><div class="row-actions">
          <a class="row-button" href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">Görüntüle</a>
          <button class="row-button" type="button" data-edit-project="${escapeHTML(project.id)}">Düzenle</button>
          <button class="row-button delete" type="button" data-delete-project="${escapeHTML(project.id)}">Sil</button>
        </div></td>
      </tr>`).join("") || '<tr><td class="empty-state" colspan="4">Aramanızla eşleşen proje bulunamadı.</td></tr>';
  }

  function renderServices() {
    const items = [...state.services].sort((a, b) => Number(a.order) - Number(b.order));
    $("#service-count").textContent = `${state.services.length} hizmet kayıtlı`;
    $("#services-table").innerHTML = items.map(service => `
      <tr>
        <td data-label="Sıra"><strong>${Number(service.order)}</strong></td>
        <td data-label="Hizmet"><div class="service-cell"><strong>${escapeHTML(service.title)}</strong><small>${escapeHTML(service.description)}</small></div></td>
        <td data-label="Durum"><span class="status ${service.active ? "active" : "passive"}">${service.active ? "Aktif" : "Pasif"}</span></td>
        <td data-label="İşlemler"><div class="row-actions">
          <button class="row-button" type="button" data-toggle-service="${escapeHTML(service.id)}">${service.active ? "Pasif yap" : "Aktif yap"}</button>
          <button class="row-button" type="button" data-edit-service="${escapeHTML(service.id)}">Düzenle</button>
          <button class="row-button delete" type="button" data-delete-service="${escapeHTML(service.id)}">Sil</button>
        </div></td>
      </tr>`).join("") || '<tr><td class="empty-state" colspan="4">Henüz hizmet eklenmedi.</td></tr>';
  }

  function renderMessages(filter = "all") {
    const items = state.messages.filter(message => filter === "all" || (filter === "read" ? message.read : !message.read));
    const unread = state.messages.filter(message => !message.read).length;
    $("#message-count").textContent = `${state.messages.length} mesaj · ${unread} okunmamış`;
    $("#message-badge").textContent = unread;
    $("#message-badge").hidden = unread === 0;
    $("#messages-table").innerHTML = items.map(message => `
      <tr class="${message.read ? "" : "unread-row"}">
        <td data-label="Gönderen"><div class="service-cell"><strong>${escapeHTML(message.name)}</strong><small>${escapeHTML(message.email)}</small></div></td>
        <td data-label="Konu">${escapeHTML(message.subject)}</td>
        <td data-label="Tarih"><time datetime="${escapeHTML(message.date)}">${formatDate(message.date)}</time></td>
        <td data-label="Durum"><span class="status ${message.read ? "read" : "unread"}">${message.read ? "Okundu" : "Okunmadı"}</span></td>
        <td data-label="İşlemler"><div class="row-actions">
          <button class="row-button" type="button" data-view-message="${escapeHTML(message.id)}">Görüntüle</button>
          <button class="row-button delete" type="button" data-delete-message="${escapeHTML(message.id)}">Sil</button>
        </div></td>
      </tr>`).join("") || '<tr><td class="empty-state" colspan="5">Bu filtrede mesaj bulunmuyor.</td></tr>';
  }

  function renderAll() {
    renderOverview();
    renderProjects($("#project-search")?.value || "");
    renderServices();
    renderMessages($("#message-filter")?.value || "all");
  }

  function navigate(pageName) {
    const target = $(`#page-${pageName}`);
    if (!target) return;
    $$(".page").forEach(page => { page.hidden = page !== target; page.classList.toggle("active", page === target); });
    $$(".nav-item").forEach(item => {
      const active = item.dataset.page === pageName;
      item.classList.toggle("active", active);
      if (active) item.setAttribute("aria-current", "page"); else item.removeAttribute("aria-current");
    });
    $("#page-title").textContent = target.dataset.title;
    document.title = `${target.dataset.title} · ASLIN TECH Yönetim Paneli`;
    closeMenu();
    window.scrollTo(0, 0);
    history.replaceState(null, "", `#${pageName}`);
  }

  function openMenu() {
    document.body.classList.add("menu-open");
    $("#menu-toggle").setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }

  const projectFields = project => `
    <label>Proje adı<input name="name" required maxlength="100" value="${escapeHTML(project?.name || "")}"></label>
    <label>Kategori<input name="category" required maxlength="100" value="${escapeHTML(project?.category || "")}"></label>
    <label class="full">Açıklama<textarea name="description" required rows="3" maxlength="320">${escapeHTML(project?.description || "")}</textarea></label>
    <label class="full">Görsel yolu<input name="image" required value="${escapeHTML(project?.image || "")}" placeholder="../projects/.../cover.webp"></label>
    <label class="full">Proje bağlantısı<input name="url" required value="${escapeHTML(project?.url || "")}" placeholder="../projects/.../"></label>
    <label>Durum<select name="status" required>${["Aktif", "Taslak", "Pasif"].map(status => `<option${project?.status === status ? " selected" : ""}>${status}</option>`).join("")}</select></label>`;

  const serviceFields = service => `
    <label class="full">Başlık<input name="title" required maxlength="100" value="${escapeHTML(service?.title || "")}"></label>
    <label class="full">Açıklama<textarea name="description" required rows="3" maxlength="320">${escapeHTML(service?.description || "")}</textarea></label>
    <label>Sıra<input name="order" type="number" min="1" max="99" required value="${escapeHTML(service?.order || state.services.length + 1)}"></label>
    <label>Durum<select name="active"><option value="true"${service?.active !== false ? " selected" : ""}>Aktif</option><option value="false"${service?.active === false ? " selected" : ""}>Pasif</option></select></label>`;

  function openEditor(type, id = null) {
    lastFocused = document.activeElement;
    editorContext = { type, id };
    const existing = id ? state[type === "project" ? "projects" : "services"].find(item => item.id === id) : null;
    $("#editor-kicker").textContent = type === "project" ? "Proje Yönetimi" : "Hizmet Yönetimi";
    $("#editor-title").textContent = `${existing ? "Kaydı Düzenle" : "Yeni"} ${type === "project" ? "Proje" : "Hizmet"}`;
    $("#editor-fields").innerHTML = type === "project" ? projectFields(existing) : serviceFields(existing);
    $("#editor-error").textContent = "";
    $("#editor-modal").hidden = false;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => $("#editor-fields input")?.focus(), 0);
  }

  function closeEditor() {
    $("#editor-modal").hidden = true;
    document.body.style.overflow = "";
    editorContext = null;
    lastFocused?.focus();
  }

  function submitEditor(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      $("#editor-error").textContent = "Lütfen zorunlu alanları doğru biçimde doldurun.";
      form.reportValidity();
      return;
    }
    const values = Object.fromEntries(new FormData(form).entries());
    if (editorContext.type === "project") {
      const record = { ...values, id: editorContext.id || uid("project") };
      const index = state.projects.findIndex(item => item.id === editorContext.id);
      if (index >= 0) state.projects[index] = record; else state.projects.push(record);
      save(STORAGE.projects, state.projects);
      toast(index >= 0 ? "Proje güncellendi." : "Yeni proje eklendi.");
    } else {
      const record = { ...values, id: editorContext.id || uid("service"), order: Number(values.order), active: values.active === "true" };
      const index = state.services.findIndex(item => item.id === editorContext.id);
      if (index >= 0) state.services[index] = record; else state.services.push(record);
      save(STORAGE.services, state.services);
      toast(index >= 0 ? "Hizmet güncellendi." : "Yeni hizmet eklendi.");
    }
    renderAll();
    closeEditor();
  }

  function openMessage(id) {
    const message = state.messages.find(item => item.id === id);
    if (!message) return;
    lastFocused = document.activeElement;
    message.read = true;
    save(STORAGE.messages, state.messages);
    $("#message-modal-title").textContent = message.subject;
    $("#message-detail-content").innerHTML = `
      <div class="message-meta">
        <div><span>Gönderen</span><strong>${escapeHTML(message.name)}</strong></div>
        <div><span>E-posta</span><strong>${escapeHTML(message.email)}</strong></div>
        <div><span>Tarih</span><strong>${formatDate(message.date)}</strong></div>
        <div><span>Durum</span><strong>Okundu</strong></div>
      </div>
      <p class="message-body">${escapeHTML(message.body)}</p>`;
    $("#message-reply").href = `mailto:${encodeURIComponent(message.email)}?subject=${encodeURIComponent(`Ynt: ${message.subject}`)}`;
    $("#message-modal").hidden = false;
    document.body.style.overflow = "hidden";
    renderAll();
    window.setTimeout(() => $("#message-modal [data-close-message]")?.focus(), 0);
  }

  function closeMessage() {
    $("#message-modal").hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  function removeRecord(type, id) {
    const collection = type === "project" ? state.projects : type === "service" ? state.services : state.messages;
    const item = collection.find(entry => entry.id === id);
    if (!item) return;
    const label = item.name || item.title || item.subject;
    if (!window.confirm(`“${label}” kaydını silmek istediğinizden emin misiniz?`)) return;
    const key = type === "project" ? STORAGE.projects : type === "service" ? STORAGE.services : STORAGE.messages;
    state[`${type}s`] = collection.filter(entry => entry.id !== id);
    save(key, state[`${type}s`]);
    renderAll();
    toast("Kayıt silindi.");
  }

  function populateForm(form, values) {
    Object.entries(values).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field.type === "checkbox") field.checked = Boolean(value);
      else field.value = value;
    });
  }

  function bindEvents() {
    $$(".nav-item").forEach(item => item.addEventListener("click", () => navigate(item.dataset.page)));
    $("#menu-toggle").addEventListener("click", openMenu);
    $("#sidebar-close").addEventListener("click", closeMenu);
    $("#sidebar-backdrop").addEventListener("click", closeMenu);
    $("#project-search").addEventListener("input", event => renderProjects(event.target.value));
    $("#message-filter").addEventListener("change", event => renderMessages(event.target.value));
    $("#editor-form").addEventListener("submit", submitEditor);
    $$("[data-close-modal]").forEach(item => item.addEventListener("click", closeEditor));
    $$("[data-close-message]").forEach(item => item.addEventListener("click", closeMessage));

    document.addEventListener("click", event => {
      const target = event.target.closest("button, a");
      if (!target) return;
      if (target.dataset.go) navigate(target.dataset.go);
      if (target.dataset.action === "new-project") { navigate("projects"); openEditor("project"); }
      if (target.dataset.action === "new-service") { navigate("services"); openEditor("service"); }
      if (target.dataset.editProject) openEditor("project", target.dataset.editProject);
      if (target.dataset.editService) openEditor("service", target.dataset.editService);
      if (target.dataset.deleteProject) removeRecord("project", target.dataset.deleteProject);
      if (target.dataset.deleteService) removeRecord("service", target.dataset.deleteService);
      if (target.dataset.deleteMessage) removeRecord("message", target.dataset.deleteMessage);
      if (target.dataset.viewMessage) openMessage(target.dataset.viewMessage);
      if (target.dataset.toggleService) {
        const service = state.services.find(item => item.id === target.dataset.toggleService);
        if (service) {
          service.active = !service.active;
          save(STORAGE.services, state.services);
          renderAll();
          toast(`Hizmet ${service.active ? "aktif" : "pasif"} yapıldı.`);
        }
      }
    });

    $("#content-form").addEventListener("submit", event => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      state.content = Object.fromEntries(new FormData(event.currentTarget).entries());
      save(STORAGE.content, state.content);
      toast("Site içeriği prototip olarak kaydedildi.");
    });

    $("#settings-form").addEventListener("submit", event => {
      event.preventDefault();
      if (!event.currentTarget.reportValidity()) return;
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      ["maintenance", "emailNotifications", "weeklySummary", "projectUpdates"].forEach(name => values[name] = event.currentTarget.elements[name].checked);
      state.settings = values;
      save(STORAGE.settings, state.settings);
      toast("Ayarlar kaydedildi.");
    });

    $("#global-search").addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      const query = event.currentTarget.value.trim();
      if (!query) return;
      navigate("projects");
      $("#project-search").value = query;
      renderProjects(query);
      $("#project-search").focus();
    });

    document.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (!$("#editor-modal").hidden) closeEditor();
      else if (!$("#message-modal").hidden) closeMessage();
      else closeMenu();
    });
  }

  function init() {
    populateForm($("#content-form"), state.content);
    populateForm($("#settings-form"), state.settings);
    bindEvents();
    renderAll();
    const initialPage = location.hash.slice(1);
    navigate($(`#page-${initialPage}`) ? initialPage : "overview");
  }

  init();
})();
