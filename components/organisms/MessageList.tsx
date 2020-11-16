import React, { useEffect } from 'react';
import Message from '@/components/molecules/Message';

export type Message = {
  body: string;
  createdAt: Date;
  userName: string;
};

type Props = {
  messages: Message[];
};

const MessageList: React.FC<Props> = ({ messages }) => {
  const scrollToEnd = () => {
    const messageList = document.getElementById('message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  return (
    <>
      <div id={'message-list'}>
        {messages.reverse().map(({ body, createdAt, userName }, i) => (
          <Message date={createdAt} body={body} userName={userName} key={i} />
        ))}
      </div>
      <style jsx>{`
        #message-list {
          height: 50vh;
          overflow: scroll;
        }
      `}</style>
    </>
  );
};

export default MessageList;
