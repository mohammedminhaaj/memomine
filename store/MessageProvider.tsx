import { createContext, useContext, useState } from 'react';

export enum MessageType {
	SUCCESS,
	INFO,
	WARNING,
	ERROR,
}

export type MessageItem = {
	message: string;
	type: MessageType;
};

interface MessageContextProps {
	messages: MessageItem[];
	insertMessage: (message: string, type: MessageType) => void;
	shiftMessage: () => void;
	removeMessage: (index: number) => void;
}

const MessageContext = createContext<MessageContextProps>({
	messages: [],
	insertMessage: () => {},
	shiftMessage: () => {},
	removeMessage: () => {},
});

export const MessageProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const [messages, setMessages] = useState<MessageItem[]>([]);

	const insertMessage = (message: string, type: MessageType) => {
		setMessages((previous: MessageItem[]) => [
			...previous,
			{ message: message, type: type },
		]);
	};

	const shiftMessage = () => {
		setMessages((previous: MessageItem[]) =>
			previous.filter(
				(_: MessageItem, itemIndex: number) =>
					itemIndex !== previous.length - 1
			)
		);
	};

	const removeMessage = (index: number) => {
		setMessages((previous: MessageItem[]) =>
			previous.filter(
				(_: MessageItem, itemIndex: number) => itemIndex !== index
			)
		);
	};

	return (
		<MessageContext.Provider
			value={{ messages, insertMessage, shiftMessage, removeMessage }}>
			{children}
		</MessageContext.Provider>
	);
};

export const useMessageContext: () => MessageContextProps = () =>
	useContext(MessageContext);
