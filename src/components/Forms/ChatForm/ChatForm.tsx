import { useState } from "react";
import Button from "../../UI/Button/Button";
import Textarea from "../../UI/Textarea/Textarea";

export type ChatFormProps = {
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: (text: string) => void | Promise<void>;
  onAdd?: () => void | Promise<void>;
};

const ChatForm: React.FC<ChatFormProps> = ({
  disabled = false,
  onSubmit,
  onAdd,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    setLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(text);
      } else {
      }

      setText("");

      if (onAdd) {
        await onAdd();
      }
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Textarea
        id="prompt"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{ resize: "vertical", padding: 8 }}
        placeholder={"Type your query..."}
      />
      <Button
        type="submit"
        disabled={loading || !text.trim() || disabled}
        loading={loading}
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ChatForm;