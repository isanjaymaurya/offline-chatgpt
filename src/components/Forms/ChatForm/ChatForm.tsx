import { useState } from "react";
import Button from "../../UI/Button/Button";
import Textarea from "../../UI/Textarea/Textarea";

function ChatForm() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim()) return;
        setLoading(true);
        try {
            // await fetch("/api/chat", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({
            //         messages: [{ role: "user", content: text }],
            //         model: "deepseek-1b",
            //     })
            // });
            setText("");
        } catch (err) {
            console.error("Submit error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label htmlFor="prompt">Message</label>
            <Textarea
                id="prompt"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                style={{ resize: "vertical", padding: 8 }}
                placeholder="Type your message..."
            />
            <Button type="submit" disabled={loading || !text.trim()}>
                {loading ? "Sending..." : "Send"}
            </Button>
        </form>
    );
}

export default ChatForm;