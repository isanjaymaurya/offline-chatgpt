import { Link, useParams } from "react-router";
import type { ChatRecordType } from "../../global";
import IconButton from "../UI/IconButton/IconButton";
import DocumentAddIcon from "../Icons/DocumentAddIcon";
import Button from "../UI/Button/Button";
import './ChatListSideBar.Module.scss';
import EllipsisHorizontalIcon from "../Icons/EllipsisHorizontalIcon";
import { useState } from "react";

interface ChatListSideBarProps {
    chats: ChatRecordType[];
    onDelete: (id: string) => void;
    onNewChat: () => void;
}

const ChatListSideBar = (
    { chats, onDelete, onNewChat }: ChatListSideBarProps
) => {
    const { chatId: activeChatId } = useParams();
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

    return (
        <aside className="chat-sidebar">
            <div className="new-chat">
                <Link to="/chat">
                    <Button
                        aria-label='New Chat'
                        startIcon={<DocumentAddIcon />}
                        onClick={onNewChat}
                    >
                        New Chat
                    </Button>
                </Link>
            </div>
            <ul className="chat-list">
                {chats.sort((a, b) =>  b.updatedAt - a.updatedAt).map((chat: ChatRecordType) => (
                    <li
                        key={chat.id}
                        className={`chat-convo ${chat.id === activeChatId ? 'active' : ''}`}
                    >
                        <Link to={`/chat/${chat.id}`} className="convo-title">
                            {chat.chatTitle}
                        </Link>
                        <IconButton
                            onClick={() => setMenuOpenId(chat.id)}
                        >
                            <EllipsisHorizontalIcon className="chat-action-icon" height={26} width={26} />
                        </IconButton>
                        {menuOpenId === chat.id && (
                            <div className="chat-menu">
                                <button>Rename</button>
                                <button onClick={() => onDelete(chat.id)}>Delete</button>
                            </div>
                        )}

                        {/* 
                            Delete
                            </IconButton> */}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default ChatListSideBar;