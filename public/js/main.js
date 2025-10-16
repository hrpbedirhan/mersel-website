document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
  
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Gönderiliyor...";
  
    try {
      const res = await fetch("/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      resultDiv.innerHTML = result.success
        ? "Mesajınız başarıyla gönderildi 🎉"
        : "Bir hata oluştu 😕";
    } catch {
      resultDiv.innerHTML = "Sunucuya bağlanılamadı 😩";
    }
  });
  