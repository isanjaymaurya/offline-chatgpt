export interface NewChatRecordType {
    chatTitle: string;
    convo: ChatConvoType[];
    createdAt: date;
    updatedAt: date;
}

export interface ChatRecordType extends NewChatRecordType {
    id: string;
}

export interface ChatConvoType {
    query: userQuery;
    reply: any;
}
