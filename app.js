/* Compressed Files — pure JavaScript UI
 * This file creates the complete DOM and injects all styles at runtime.
 * No handwritten HTML or CSS is required for the interface.
 */
(() => {
  "use strict";

  const state = {
    page: "home",
    filter: "all",
    files: [
      { name: "Mountain sunset.jpg", type: "Images", size: "4.2 MB", icon: "▧", color: "#5f8dff" },
      { name: "Lake video.mp4", type: "Videos", size: "68.4 MB", icon: "▶", color: "#ec50bd" },
      { name: "Flower photo.jpg", type: "Images", size: "5.8 MB", icon: "▧", color: "#32cbb2" },
      { name: "Study notes.pdf", type: "Documents", size: "2.4 MB", icon: "▤", color: "#a35bff" }
    ]
  };

  const css = `
    *{box-sizing:border-box}body{margin:0;background:#050e1a;color:#f4f7ff;font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}button{font:inherit;color:inherit;cursor:pointer;border:0}.cf-app{min-height:100vh;max-width:520px;margin:auto;padding:18px 20px 90px;background:radial-gradient(circle at 75% 10%,#182d48 0,#071221 33%,#050e1a 75%)}
    .cf-top{display:flex;align-items:center;gap:16px;margin:4px 0 24px}.cf-menu{font-size:30px;background:none}.cf-brand{display:flex;align-items:center;gap:10px;font-size:25px;font-weight:800;letter-spacing:-1px;flex:1}.cf-logo{width:40px;height:40px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#ff3a24,#ffd52f 35%,#39db58 57%,#347cff 77%,#d632f3);font-size:22px;font-weight:900;box-shadow:0 0 20px #446aff66}.cf-premium{padding:12px 17px;border:2px solid #f7b83d;border-radius:30px;background:#142033;color:#ffd36a;font-weight:800}.cf-card{border:1px solid #2c5a90;border-radius:25px;background:linear-gradient(140deg,#142745cc,#0e1934dd);box-shadow:0 18px 45px #0005;padding:20px}.cf-storage{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:center}.cf-ring{width:160px;height:160px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#d849e8 0 20%,#438dff 20% 43%,#38d8ff 43% 57%,#66ec9c 57% 68%,#263b69 68% 100%);position:relative}.cf-ring:after{content:"";position:absolute;inset:13px;border-radius:50%;background:#071323}.cf-ring-content{position:relative;z-index:1;text-align:center}.cf-ring-content b{font-size:35px}.cf-ring-content small{display:block;color:#cbd7ed}.cf-data{border-left:1px solid #416080;padding-left:18px}.cf-data div{padding:10px 0;border-bottom:1px solid #38506f;color:#afc1df}.cf-data b{display:block;color:#fff;font-size:25px;margin-top:3px}.cf-bottom-stat{grid-column:1/-1;display:grid;grid-template-columns:1fr 1fr;border:1px solid #267bc8;border-radius:25px;padding:14px 20px;background:#0c1b34}.cf-stat+.cf-stat{border-left:1px solid #365476;padding-left:24px}.cf-stat small{color:#b2c4e4}.cf-stat b{display:block;font-size:24px;margin-top:4px}.cf-heading{display:flex;align-items:center;justify-content:space-between;margin:28px 2px 14px}.cf-heading h2{margin:0;font-size:25px}.cf-link{background:none;color:#d0dafa;font-size:16px}.cf-recent{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.cf-thumb{height:100px;border-radius:14px;background:linear-gradient(145deg,#f5a56e,#243b83 50%,#09202c);position:relative;overflow:hidden;border:1px solid #426384}.cf-thumb:nth-child(2){background:linear-gradient(145deg,#f18c6e,#263f99 55%,#153d43)}.cf-thumb:nth-child(3){background:radial-gradient(circle,#fff 7%,#7dbb5c 9%,#1b593e 60%,#142335)}.cf-thumb:nth-child(4){background:linear-gradient(145deg,#ead7b5,#d4c3ab 48%,#6d5d55)}.cf-thumb span{position:absolute;right:7px;bottom:7px;background:#071224cc;border-radius:7px;padding:4px 6px}.cf-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.cf-tile{display:flex;align-items:center;gap:14px;padding:16px;border:1px solid #254a77;border-radius:20px;background:#10203acc;font-size:17px}.cf-tile:active{transform:scale(.98)}.cf-tile-icon{width:45px;height:45px;border-radius:50%;display:grid;place-items:center;font-size:23px;background:#223b78;color:#69d7ff}.cf-arrow{margin-left:auto;color:#b8c6e4;font-size:25px}.cf-nav{position:fixed;bottom:14px;left:50%;transform:translateX(-50%);width:min(94%,480px);display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:9px;background:#101d31ee;border:1px solid #29486c;border-radius:22px;backdrop-filter:blur(15px);z-index:5}.cf-nav button{background:none;color:#9fb1d2;padding:6px;font-size:12px}.cf-nav button.active{color:#ff68dc}.cf-nav i{display:block;font-style:normal;font-size:22px;margin-bottom:3px}.cf-list{display:flex;flex-direction:column;gap:10px}.cf-file{display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #25466d;border-radius:16px;background:#10203a}.cf-file-icon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-weight:800;background:#253e80}.cf-file-main{flex:1;min-width:0}.cf-file-main b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cf-file-main small{display:block;color:#9eb0ce;margin-top:4px}.cf-actions{display:flex;gap:6px}.cf-action{background:#1d3960;border-radius:9px;padding:8px;font-size:12px}.cf-primary{background:linear-gradient(90deg,#d946ef,#6877ff);padding:13px 18px;border-radius:14px;font-weight:800}.cf-input{width:100%;padding:13px;border-radius:13px;border:1px solid #34587c;background:#0d1d32;color:white;margin-bottom:12px}.cf-empty{color:#9eafc9;text-align:center;padding:30px}.cf-toast{position:fixed;left:50%;bottom:85px;transform:translateX(-50%);padding:12px 18px;border-radius:12px;background:#eef3ff;color:#101a2d;opacity:0;pointer-events:none;transition:.2s;z-index:10}.cf-toast.show{opacity:1}
    @media(max-width:380px){.cf-app{padding-left:14px;padding-right:14px}.cf-ring{width:130px;height:130px}.cf-ring-content b{font-size:28px}.cf-data b{font-size:20px}.cf-premium{padding:10px;font-size:12px}.cf-brand{font-size:20px}}
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const el = (tag, props = {}, children = []) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2).toLowerCase(), value);
      else node.setAttribute(key, value);
    });
    children.forEach(child => node.append(child instanceof Node ? child : document.createTextNode(child)));
    return node;
  };

  const toast = message => {
    const node = document.querySelector(".cf-toast");
    node.textContent = message;
    node.classList.add("show");
    setTimeout(() => node.classList.remove("show"), 1800);
  };

  const iconTile = (icon, label, action) => el("button", { class: "cf-tile", onclick: () => { state.filter = label; state.page = "files"; render(); } }, [
    el("span", { class: "cf-tile-icon", text: icon }), el("span", { text: label }), el("span", { class: "cf-arrow", text: "›" })
  ]);

  function header() {
    return el("header", { class: "cf-top" }, [
      el("button", { class: "cf-menu", text: "☰", onclick: () => toast("Menu is ready") }),
      el("div", { class: "cf-brand" }, [el("span", { class: "cf-logo", text: "CF" }), "Compressed Files"]),
      el("button", { class: "cf-premium", onclick: () => toast("Premium plans coming soon") }, ["♛ Premium"])
    ]);
  }

  function storageCard() {
    const card = el("section", { class: "cf-card cf-storage" });
    card.append(
      el("div", { class: "cf-ring" }, [el("div", { class: "cf-ring-content" }, [el("b", { text: "68%" }), el("small", { text: "Storage Used" })])]),
      el("div", { class: "cf-data" }, [
        el("div", {}, ["All Storage", el("b", { text: "255 GB" })]),
        el("div", {}, ["In Use", el("b", { text: "182 GB" })])
      ]),
      el("div", { class: "cf-bottom-stat" }, [
        el("div", { class: "cf-stat" }, [el("small", { text: "Real Storage" }), el("b", { text: "142 GB" })]),
        el("div", { class: "cf-stat" }, [el("small", { text: "Compression" }), el("b", { text: "500 GB" })])
      ])
    );
    return card;
  }

  function home() {
    const main = el("main");
    main.append(storageCard());
    main.append(el("div", { class: "cf-heading" }, [el("h2", { text: "Recent" }), el("button", { class: "cf-link", text: "See all ›", onclick: () => { state.page = "files"; render(); } })]));
    main.append(el("section", { class: "cf-recent" }, state.files.map(file => el("button", { class: "cf-thumb", onclick: () => toast(`${file.name} preview`) }, [el("span", { text: file.type === "Videos" ? "▶ 0:42" : "▧" })]))));
    main.append(el("div", { class: "cf-heading" }, [el("h2", { text: "Categories" })]));
    main.append(el("section", { class: "cf-grid" }, [iconTile("⇩", "Downloads"), iconTile("▧", "Images"), iconTile("▶", "Videos"), iconTile("♫", "Audio"), iconTile("▤", "Documents"), iconTile("▦", "Apps")]));
    main.append(el("div", { class: "cf-heading" }, [el("h2", { text: "Collections" })]));
    main.append(el("section", { class: "cf-grid" }, [iconTile("☆", "Starred"), iconTile("♙", "Safe Folder")]));
    main.append(el("div", { class: "cf-heading" }, [el("h2", { text: "All Storage" })]));
    main.append(el("section", { class: "cf-grid" }, [iconTile("▣", "Internal Storage"), iconTile("☁", "Other Storage")]));
    return main;
  }

  function filesPage() {
    const main = el("main");
    main.append(el("div", { class: "cf-heading" }, [el("h2", { text: state.filter === "all" ? "All Files" : state.filter }), el("button", { class: "cf-primary", text: "+ Add", onclick: () => toast("File picker will open in the native app") })]));
    const input = el("input", { class: "cf-input", placeholder: "Search files..." });
    input.addEventListener("input", () => drawList(list.filter(f => f.name.toLowerCase().includes(input.value.toLowerCase()))));
    main.append(input);
    const list = state.filter === "all" ? state.files : state.files.filter(f => f.type === state.filter || (state.filter === "Starred" && f.favorite));
    const container = el("section", { class: "cf-list" });
    const drawList = files => { container.replaceChildren(...(files.length ? files.map(fileRow) : [el("div", { class: "cf-empty", text: "No files found" })])); };
    const fileRow = file => el("article", { class: "cf-file" }, [
      el("span", { class: "cf-file-icon", text: file.icon }),
      el("div", { class: "cf-file-main" }, [el("b", { text: file.name }), el("small", { text: `${file.type} • ${file.size}` })]),
      el("div", { class: "cf-actions" }, [
        el("button", { class: "cf-action", text: "Open", onclick: () => toast(`Opening ${file.name}`) }),
        el("button", { class: "cf-action", text: "Compress", onclick: () => toast(`Compression queued: ${file.name}`) })
      ])
    ]);
    drawList(list); main.append(container); return main;
  }

  function otherPage(title, message, buttonText) {
    return el("main", {}, [el("div", { class: "cf-heading" }, [el("h2", { text: title })]), el("section", { class: "cf-card" }, [el("div", { class: "cf-empty", text: message }), el("button", { class: "cf-primary", text: buttonText, onclick: () => toast(`${title} action started`) })])]);
  }

  function navigation() {
    const items = [["home", "⌂", "Home"], ["files", "▣", "Files"], ["storage", "◔", "Storage"], ["settings", "⚙", "Settings"]];
    return el("nav", { class: "cf-nav" }, items.map(([page, icon, label]) => el("button", { class: state.page === page ? "active" : "", onclick: () => { state.page = page; render(); } }, [el("i", { text: icon }), label])));
  }

  function render() {
    const root = document.getElementById("compressed-files-root") || document.body;
    root.replaceChildren();
    const app = el("div", { class: "cf-app" });
    app.append(header());
    if (state.page === "home") app.append(home());
    if (state.page === "files") app.append(filesPage());
    if (state.page === "storage") app.append(otherPage("Storage Analyzer", "Real device storage APIs can be connected here for Android/iOS.", "Scan Storage"));
    if (state.page === "settings") app.append(otherPage("Settings", "Appearance, privacy, security, recovery and compression settings.", "Open Settings"));
    app.append(navigation());
    root.append(app, el("div", { class: "cf-toast" }));
  }

  const root = document.createElement("div");
  root.id = "compressed-files-root";
  document.body.replaceChildren(root);
  render();
})();
