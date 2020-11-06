import React, { useEffect, useState } from 'react';
import { isAfter } from 'date-fns';

import { db } from '@/lib/firestore';

import MessageList from '@/components/organisms/MessageList';
import { Message } from '@/components/organisms/MessageList';
import MarkDownEditor from '@/components/molecules/MarkDownEditor';

const collection = 'chat';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const postMessage = async (body: string) => {
    await db.collection(collection).add({
      body: body,
      createdAt: new Date(),
    });
  };

  useEffect(() => {
    db.collection(collection).onSnapshot((collection) => {
      const data = collection.docs.map<Message>((doc) => ({
        body: doc.data().body,
        createdAt: doc.data().createdAt.toDate(),
      }));

      const sortedMessages = data.sort((a, b) =>
        isAfter(a.createdAt, b.createdAt) ? 1 : -1
      );

      setMessages(sortedMessages);
    });
  }, []);

  return (
    <>
      <h2>{collection}</h2>
      <MessageList messages={messages} />
      <MarkDownEditor onSave={postMessage} />
    </>
  );
};

export default Index;
