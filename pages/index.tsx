import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { isBefore } from 'date-fns';
import firebase from 'firebase';

import { firestore } from '@/lib/firebase';
import * as constants from '@/constants';

import { Message } from '@/components/molecules/MessageItem';
import Loading from '@/components/molecules/Loading';
import MarkDownEditor from '@/components/organisms/MarkDownEditor';

import MessageList from '@/components/organisms/MessageList';

const initPostCount = 20;

const mapData = (
  doc: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
) => ({
  id: doc.id,
  body: doc.data().body,
  createdAt: doc.data().createdAt.toDate(),
  userName: doc.data().userName,
});

const Index = () => {
  const [oldMessages, setOldMessages] = useState<Message[]>([]);
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const collection = await firestore
      .collection('chat')
      .orderBy('createdAt', 'desc')
      .limit(initPostCount)
      .get();

    const data = collection.docs.map<Message>(mapData);

    // 昇順にソート
    const sortedData = data.sort((a, b) =>
      isBefore(a.createdAt, b.createdAt) ? -1 : 1
    );
    setOldMessages(sortedData);

    firestore
      .collection('chat')
      .orderBy('createdAt', 'asc')
      .where('createdAt', '>=', new Date())
      .onSnapshot((collection) => {
        const data = collection.docs.map<Message>(mapData);
        setNewMessages(data);
      });
  };

  const moreFetchData = async () => {
    const start = [...oldMessages, ...newMessages].find((_, i) => i === 0);
    if (start) {
      setLoading(true);
      const doc = await firestore.collection('chat').doc(start.id).get();
      const collection = await firestore
        .collection('chat')
        .orderBy('createdAt', 'desc')
        .startAfter(doc)
        .limit(5)
        .get();

      const data = collection.docs.map<Message>(mapData);

      // 昇順にソート
      const sortedData = data.sort((a, b) =>
        isBefore(a.createdAt, b.createdAt) ? -1 : 1
      );

      setOldMessages([...sortedData, ...oldMessages]);
      setLoading(false);
    }
  };

  const postMessage = async (body: string) => {
    // 空だったら投稿しない
    if (!body) return;
    await firestore.collection('chat').add({
      body: body,
      createdAt: new Date(),
      userName: userName || constants.NO_NAME,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>firebase-chat-web</h2>
      {loading && <Loading />}
      <MessageList
        oldMessages={oldMessages}
        newMessages={newMessages}
        onScrollTop={moreFetchData}
      />
      <Input
        placeholder="user name"
        prefix={<UserOutlined />}
        onChange={({ target }) => {
          setUserName(target.value);
        }}
      />
      <MarkDownEditor postAction={postMessage} />
    </>
  );
};

export default Index;
