import React, { useEffect } from 'react';

import Message, { MessageType } from '@/components/molecules/Message';

type Props = {
  oldMessages: MessageType[];
  newMessages: MessageType[];
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
          <Message key={x.id} {...x} />
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
