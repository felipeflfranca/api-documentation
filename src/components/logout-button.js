const observer = new MutationObserver(() => {
  const topbar = document.querySelector(".topbar-wrapper");
  if (topbar && !document.getElementById("logout-button")) {
    const btn = document.createElement("a");
    btn.id = "logout-button";
    btn.href = "/logout";
    btn.innerText = "Sair";
    btn.style.cssText = `
      margin-left: auto;
      background: #fff;
      color: rgb(0, 170, 255);
      border-radius: 4px;
      padding: 6px 12px;
      font-weight: bold;
      text-decoration: none;
      font-family: sans-serif;
      cursor: pointer;
      font-size: 14px;
      border: 1px solid rgb(0, 170, 255);
      transition: all 0.2s ease-in-out;
      &:hover {
        background: rgb(0, 170, 255);
        color: #fff;
      };
      max-width: 55px;
    `;
    topbar.appendChild(btn);
    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
