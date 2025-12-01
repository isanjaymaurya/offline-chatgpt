import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { CreateMLCEngine } from "@mlc-ai/web-llm";

import { useIndexDb } from '../../hooks/useIndexDB';
import { SITE_NAME } from '../../constants';
import './ChatPage.module.scss';
import BaseLayout from "../../components/Layout/BaseLayout/BaseLayout";
import ChatListSideBar from "../../components/ChatListSideBar/ChatListSideBar";
import ChatForm from '../../components/Forms/ChatForm/ChatForm';
import type { ChatConvoType, ChatRecordType } from '../../global';
import ChatSuggestions from '../../components/ChatSuggestions/ChatSuggestions';
import { getGreeting } from '../../utils/utils';

const initProgressCallback = (initProgress: any) => {
  console.log(initProgress);
}
const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";

const engine = await CreateMLCEngine(
  selectedModel,
  { initProgressCallback: initProgressCallback }, // engineConfig
);

function ChatPage() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const {
        addRecord,
        updateRecord,
        getChatRecord,
        getAllRecord,
        deleteRecord,
        isDBReady
    } = useIndexDb("ChatDB", "Chats");
    const [chatList, setChatList] = useState<ChatRecordType[]>([]);
    const [pageTitle, setPageTitle] = useState(`Chat Page | ${SITE_NAME}`);
    const [userQuery, setUserQuery] = useState<string>("");
    const [chatTitle, setChatTitle] = useState<string>("");
    const [chatConvo, setChatConvo] = useState<ChatConvoType[]>([]); 

    useEffect(() => {
        if (!isDBReady) return;
        let mounted = true;
        getAllRecord()
            .then(data => { if (mounted) setChatList(data); })
            .catch(console.error);
        return () => { mounted = false; };
    }, [isDBReady, getAllRecord]);

    useEffect(() => {
        if (!chatId || !isDBReady) return;

        getChatRecord(chatId)
            .then((record) => {
                if (record) {
                    setPageTitle(`${record.chatTitle} | ${SITE_NAME}`);
                    setChatTitle(record.chatTitle || "");
                    setChatConvo(record.convo || []);
                } else {
                    toast.error(`No chat record found for ID: ${chatId}`, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "dark",
                    });
                    navigate('/chat', { replace: true });
                };
            })
            .catch(e => console.error("Error fetching chat record:", e));
    }, [isDBReady, chatId]);

    const handleOnAddChat = async (newUserQuery: string) => {
        const newChatData = { 
            chatTitle: newUserQuery,
            convo: [
                {
                    query: newUserQuery,
                    reply: []
                }
            ],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        // webllm
        const messages = [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content: "Hello!" },
        ];

        // Chunks is an AsyncGenerator object
        const chunks = await engine.chat.completions.create({
        messages,
        temperature: 1,
        stream: true, // <-- Enable streaming
        stream_options: { include_usage: true },
        });

        let reply = "";
        for await (const chunk of chunks) {
        reply += chunk.choices[0]?.delta.content || "";
        console.log(reply);
        if (chunk.usage) {
            console.log(chunk.usage); // only last chunk has usage
        }
        }

        const fullReply = await engine.getMessage();
        console.log(fullReply);

        const newRecordId = await addRecord(newChatData);
        navigate(`/chat/${newRecordId}`, { replace: true });
        const updated = await getAllRecord();
        setChatList(updated);
    };

    const handleOnUpdateChat = async (newUserQuery: string) => {
        if (!chatId) return;
        const updatedConvo = [{
            query: newUserQuery,
            reply: [] 
        }];
        await updateRecord(chatId, updatedConvo);
        const updatedRecords = await getAllRecord();
        setChatList(updatedRecords);
        setChatConvo(prevConvo => [...prevConvo, ...updatedConvo]);
    }

    const handleOnDeleteChat = async (id: string) => {
        await deleteRecord(id);
        const updated = await getAllRecord();
        setChatList(updated);
        // if the deleted chat is currently open, navigate away
        if(chatId == id){
            navigate('/chat', { replace: true });
            handleOnChatReset();
        }
    };

    const onSelect = (suggestion: string) => {
        setUserQuery(suggestion);
    }

    const handleOnChatReset = () => {
        setChatTitle("");
        setChatConvo([]);
        setPageTitle(`Chat Page | ${SITE_NAME}`);
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content="Chat with our AI model." />
            </Helmet>
            <BaseLayout
                sidebar={
                    <ChatListSideBar
                        chats={chatList}
                        onDelete={handleOnDeleteChat}
                        onNewChat={handleOnChatReset}
                    />
                }
            >
                <div>
                    {chatTitle ? (
                        <div>
                            {chatTitle && <h2>{chatTitle}</h2>}
                            {chatConvo.length > 0 ? (
                                <div>
                                    {chatConvo.map((convo: ChatConvoType, index: number) => (
                                        <div key={index}>
                                            <h1>{convo.query}:</h1>
                                            <p>{convo.reply}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div>Good {getGreeting()}, Welcome to Offline GPT!</div>
                                <div>All the chats are stored locally on your device.</div>
                            </div>
                            <div>
                                <div>Here are some suggestions to get you started:</div>
                                <ChatSuggestions onSelect={onSelect} />
                            </div>
                        </div>
                    )}
                    <ChatForm
                        userQuery={userQuery}
                        setUserQuery={setUserQuery}
                        onSubmit={chatId ? handleOnUpdateChat : handleOnAddChat}
                    />
                </div>
            </BaseLayout>
        </>
    )
}

export default ChatPage
