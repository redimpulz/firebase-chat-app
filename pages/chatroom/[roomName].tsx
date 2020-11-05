import React, { useEffect, useState} from 'react';
import MessageList from '@/components/organisms/MessageList';
import { useRouter } from 'next/router';
import { db } from '@/lib/firestore';
import { Message } from '@/components/organisms/MessageList';
import { isAfter } from 'date-fns';
import MarkDownEditor from '@/components/molecules/MarkDownEditor';

const RoomName = () => {
  const [list, setList] = useState<Message[]>([]);
  const router = useRouter();
  const postMessage = async (body: string) => {
    if (typeof roomName === 'string') {
      await db.collection(roomName).add({
        body: body,
        createdAt: new Date(),
      });
    }
  };
  const [roomName, setRoomName] = useState<string>();
  useEffect(() => {
    // idがqueryで利用可能になったら処理される
    if (router.asPath !== router.route) {
      setRoomName(String(router.query.roomName));
    }
  }, [router]);
  useEffect(() => {
    console.log('useEffect', roomName ?? undefined);
    if (roomName) {
      db.collection(roomName).onSnapshot((collection) => {
        const messages = collection.docs.map<Message>((doc) => ({
          body: doc.data().body,
          createdAt: doc.data().createdAt.toDate(),
        }));
        const sortedMessages = messages.sort((a, b) =>
          isAfter(a.createdAt, b.createdAt) ? 1 : -1
        );
        setList(sortedMessages);
      });
    }
  }, [roomName]);

  return (
    <>
      <h2>{roomName}</h2>
      <MessageList message={list} />
      <MarkDownEditor onSave={postMessage} />
    </>
  );
};

export default RoomName;
