export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message kosong" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vercel.app",
        "X-Title": "icallAI"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "Kamu adalah icallAI, AI yang ramah." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "AI tidak merespon"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
      } 
      
