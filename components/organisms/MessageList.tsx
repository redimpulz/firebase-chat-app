import React, { useEffect } from 'react';
import { formatISO9075 } from 'date-fns';
import Message from '@/components/molecules/Message';

export type Message = {
  body: string;
  createdAt: Date;
};

const MessageList = ({ message }: { message: Message[] }) => {
  const scrollToEnd = () => {
    const messageList = document.getElementById('message-list');
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };
  useEffect(() => {
    console.log('add!!');
    scrollToEnd();
  }, [message]);
  return (
    <div id={'message-list'}>
      {message.map((message, index) => {
        return (
          <Message
            date={formatISO9075(message.createdAt)}
            body={message.body}
            key={index}
          />
        );
      })}
      <style jsx>{`
        #message-list {
          height: 50vh;
          overflow: scroll;
        }
      `}</style>
    </div>
  );
};

export default MessageList;
