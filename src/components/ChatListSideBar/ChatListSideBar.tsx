import { Link } from "react-router";
import type { ChatRecordType } from "../../global";

interface ChatListSideBarProps {
    chatList: ChatRecordType[];
    handleOnAddChat: () => void;
    handleOnDeleteChat: (id: number) => void;
}

const ChatListSideBar = (
    { chatList, handleOnAddChat, handleOnDeleteChat }: ChatListSideBarProps
) => {
    return (
        <aside className="chat-list-sidebar">
            <div>
                <button
                    aria-label='New Chat'
                    onClick={handleOnAddChat}
                >
                    +
                </button>
            </div>
            <ul className="chat-sidebar">
                {chatList.map((chat) => (
                    <li key={chat.id}>
                        <div>
                            <Link to={`/chat/${chat.id}`}>
                                {chat.chatTitle}
                            </Link>
                            <button
                                aria-label={`Delete chat ${chat.id}`}
                                onClick={() => chat.id !== undefined && handleOnDeleteChat(chat.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ChatListSideBar;