import React, { useEffect, useState } from 'react';
import { isAfter } from 'date-fns';

import { firestore } from '@/lib/firebase';

import MessageList from '@/components/organisms/MessageList';
import { Message } from '@/components/organisms/MessageList';
import MarkDownEditor from '@/components/molecules/MarkDownEditor';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>('');
  useEffect(() => {
    const ref = firestore
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .limit(3);
    ref.onSnapshot((collection) => {
      const data = collection.docs.map<Message>((doc) => ({
        body: doc.data().body,
        createdAt: doc.data().createdAt.toDate(),
        userName: doc.data().userName,
      }));

      const sortedMessages = data.sort((a, b) =>
        isAfter(a.createdAt, b.createdAt) ? 1 : -1
      );

      setMessages(sortedMessages);
    });
  }, []);
  const postMessage = async (body: string) => {
    // 空だったら投稿しない
    if (body === '') {
      return;
    }
    await firestore.collection('chat').add({
      body: body,
      createdAt: new Date(),
      userName: userName === '' ? 'ななし' : userName,
    });
  };
  return (
    <>
      <h2>firebase-chat-web</h2>
      <MessageList messages={messages} />
      <Input placeholder="user name" prefix={<UserOutlined />} onChange={(e)=>{setUserName(e.target.value)}} />
      <MarkDownEditor postAction={postMessage} />
    </>
  );
};

export default Index;
