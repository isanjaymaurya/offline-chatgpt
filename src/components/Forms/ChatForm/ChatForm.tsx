import { useState } from "react";
import Button from "../../UI/Button/Button";
import Textarea from "../../UI/Textarea/Textarea";

export type ChatFormProps = {
    userQuery: string;
    setUserQuery: (text: string) => void;
    placeholder?: string;
    disabled?: boolean;
    onSubmit?: (text: string) => void;
};

const ChatForm: React.FC<ChatFormProps> = ({
    userQuery,
    setUserQuery,
    disabled = false,
    onSubmit
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || disabled) return;
    setLoading(true);
    try {
      setUserQuery("");

      await onSubmit(userQuery);
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
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        rows={6}
        style={{ resize: "vertical", padding: 8 }}
        placeholder={"Ask me anything..."}
      />
      <Button
        type="submit"
        disabled={loading || !userQuery.trim() || disabled}
        loading={loading}
      >
        {loading ? "Sending..." : "send"}
      </Button>
    </form>
  );
};

export default ChatForm;