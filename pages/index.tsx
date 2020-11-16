import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isBefore } from 'date-fns';

import { firestore } from '@/lib/firebase';

import MessageList from '@/components/organisms/MessageList';
import { Message } from '@/components/organisms/MessageList';
import MarkDownEditor from '@/components/molecules/MarkDownEditor';

const initPostCount = 3;

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [updateMessages, setUpdateMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState('');

  const fetchData = async () => {
    const collection = await firestore
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .limit(initPostCount)
      .get();
    const data = collection.docs.map<Message>((doc) => ({
      id: doc.id,
      body: doc.data().body,
      createdAt: doc.data().createdAt.toDate(),
      userName: doc.data().userName,
    }));
    // 昇順にソート
    const sortedData = data.sort((a, b) =>
      isBefore(a.createdAt, b.createdAt) ? -1 : 1
    );
    setMessages(sortedData);

    const latest = data.find((_, i) => i === 0)?.createdAt;
    firestore
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .where('createdAt', '>=', latest)
      .onSnapshot((collection) => {
        const data = collection.docs.map<Message>((doc) => ({
          id: doc.id,
          body: doc.data().body,
          createdAt: doc.data().createdAt.toDate(),
          userName: doc.data().userName,
        }));
        setUpdateMessages(data);
      });
  };

  const postMessage = async (body: string) => {
    // 空だったら投稿しない
    if (!body) return;
    await firestore.collection('chat').add({
      body: body,
      createdAt: new Date(),
      userName: userName === '' ? '名無し' : userName,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 重複メッセージを削除
    const data = [...messages, ...updateMessages].filter(
      (x, i, self) => self.findIndex((y) => y.id === x.id) === i
    );
    setMessages(data);
  }, [updateMessages]);

  return (
    <>
      <h2>firebase-chat-web</h2>
      <MessageList messages={messages} />
      <Input
        placeholder="user name"
        prefix={<UserOutlined />}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <MarkDownEditor postAction={postMessage} />
    </>
  );
};

export default Index;
