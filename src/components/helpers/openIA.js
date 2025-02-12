import OpenAI from "openai";

const api = import.meta.env.VITE_KEY;

const openai = new OpenAI({
    apiKey: api,
    dangerouslyAllowBrowser: true,
});

export const openIA = async (messageSend) => {
    if (!messageSend.trim()) return null;
    try {
        //espera 8 segundos antes de responder para simular la escritura
        await new Promise((resolve) => setTimeout(resolve, 8000));

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: `Responde este mensaje: ${messageSend} hazlo como un cliente interesado en servicios de desarrollo de software. Sé breve, directo y pregunta lo esencial.`}
            ],
        });

        return {
            text: response.choices[0].message.content,
            sender: "client",
            time: new Date().toLocaleTimeString(),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};