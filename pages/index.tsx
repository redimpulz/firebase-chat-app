import React, { useEffect, useState } from 'react';
import MessageList from '@/components/organisms/MessageList';
import { useRouter } from 'next/router';
import { db } from '@/lib/firestore';
import { Message } from '@/components/organisms/MessageList';
import { isAfter } from 'date-fns';
import MarkDownEditor from '@/components/molecules/MarkDownEditor';

const Index = () => {
  const [list, setList] = useState<Message[]>([]);
  const router = useRouter();
  const collection = 'chat';
  const postMessage = async (body: string) => {
    await db.collection(collection).add({
      body: body,
      createdAt: new Date(),
    });
  };
  useEffect(() => {
    db.collection(collection).onSnapshot((collection) => {
      const messages = collection.docs.map<Message>((doc) => ({
        body: doc.data().body,
        createdAt: doc.data().createdAt.toDate(),
      }));
      const sortedMessages = messages.sort((a, b) =>
        isAfter(a.createdAt, b.createdAt) ? 1 : -1
      );
      setList(sortedMessages);
    });
  }, []);

  return (
    <>
      <h2>{collection}</h2>
      <MessageList message={list} />
      <MarkDownEditor onSave={postMessage} />
    </>
  );
};

export default Index;
