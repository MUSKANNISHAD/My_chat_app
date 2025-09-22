import "dotenv/config";
// If Node <18 → also add: import fetch from "node-fetch";

const getOpenAIAPIResponse = async (message) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }]
        })
    };

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options);
        const data = await response.json();

        if (data.error) {
            console.error("OpenAI API Error:", data.error.message);
            return null;
        }

        return data.choices[0].message.content; // reply
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
};

export default getOpenAIAPIResponse;
