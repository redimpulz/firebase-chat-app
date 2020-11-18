import React, { useEffect } from 'react';

import MessageItem, { Message } from '@/components/molecules/MessageItem';

type Props = {
  oldMessages: Message[];
  newMessages: Message[];
  onScrollTop: () => void;
};

const MessageList: React.FC<Props> = ({
  oldMessages,
  newMessages,
  onScrollTop,
}) => {
  const handleScroll = ({
    currentTarget,
  }: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (currentTarget.scrollTop === 0) onScrollTop();
  };

  const scrollTo = (direction: 'top' | 'end') => {
    const messageList = document.getElementById('message-list');
    if (messageList) {
      messageList.scrollTop =
        direction === 'top' ? 50 : messageList.scrollHeight;
    }
  };

  useEffect(() => {
    scrollTo('top');
  }, [oldMessages]);

  useEffect(() => {
    scrollTo('end');
  }, [newMessages]);

  const messages = [...oldMessages, ...newMessages];

  return (
    <>
      <div id={'message-list'} onScroll={handleScroll}>
        {messages.map((x) => (
          <MessageItem key={x.id} {...x} />
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
