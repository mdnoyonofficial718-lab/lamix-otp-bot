// Professional OTP Bot - Ultimate Workers Handler
export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const payload = await request.json();
        if (payload.message && payload.message.text) {
          const chatId = payload.message.chat.id;
          const text = payload.message.text;
          const adminId = env.ADMIN_ID;
          const botToken = env.BOT_TOKEN;
          const lamixKey = env.LAMIX_API_KEY;

          let replyText = "✨ Welcome to SMS Namber Professional OTP Bot!\n\n👉 Use /admin to open the custom admin panel controls.";
          
          if (text === "/admin") {
            if (String(chatId) === String(adminId)) {
              replyText = "⚙️ Welcome to the In-Bot Admin Panel Control Room!\n\n🔹 [Import Custom Files]\n🔹 [Manage Virtual Numbers]\n🔹 [Setup OTP Receive Group]";
            } else {
              replyText = "⚠️ Access Denied! You are not authorized to view the Admin Control Panel.";
            }
          }

          // Sending reply message back to Telegram
          const url = `https://telegram.org{botToken}/sendMessage`;
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: replyText })
          });
        }
      } catch (err) {
        console.error("Error processing telegram update:", err);
      }
    }
    return new Response("OK", { status: 200 });
  }
};
