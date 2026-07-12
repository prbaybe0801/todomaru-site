const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgqrwwb";

const toast = document.querySelector(".toast");
let timer;

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(timer);
  timer = setTimeout(() => {
    toast.hidden = true;
  }, 3500);
}

document.querySelectorAll("[data-signup]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    if (!input.checkValidity()) {
      input.reportValidity();
      return;
    }

    const button = form.querySelector("button");
    button.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        input.value = "";
        showToast("ウェイトリストに登録しました。リリース情報をお送りします。");
      } else {
        showToast("登録に失敗しました。時間をおいて再度お試しください。");
      }
    } catch {
      showToast("登録に失敗しました。通信環境をご確認ください。");
    } finally {
      button.disabled = false;
    }
  });
});
