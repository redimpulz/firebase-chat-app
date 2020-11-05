import React, { useEffect, useState, useRef } from 'react';
import MessageList from '@/components/organisms/MessageList';
import { useRouter } from 'next/router';
import { db } from '@/lib/firestore';
import { Input, Form, Button } from 'antd';
import { Message } from '@/components/organisms/MessageList';
import { isBefore } from 'date-fns';

const RoomName = () => {
  const [list, setList] = useState<Message[]>([]);
  const router = useRouter();
  const [form] = Form.useForm();
  const { roomName } = router.query;
  const postMessage = async (body: string) => {
    form.resetFields();
    if (typeof roomName === 'string') {
      await db.collection(roomName).add({
        body: body,
        createdAt: new Date(),
      });
    }
  };
  useEffect(() => {
    if (typeof roomName === 'string') {
      db.collection(roomName).onSnapshot((collection) => {
        const messages = collection.docs.map<Message>((doc) => ({
          body: doc.data().body,
          createdAt: doc.data().createdAt.toDate(),
        }));
        const sortedMessages = messages.sort((a, b) =>
          isBefore(a.createdAt, b.createdAt) ? 1 : -1
        );
        setList(sortedMessages);
      });
    }
  }, []);

  return (
    <>
      <h2>{roomName}</h2>
      <MessageList message={list} />
      <Form onFinish={({ body }) => postMessage(body)} form={form}>
        <Form.Item name={'body'}>
          <Input placeholder={'message'} type={'text'}></Input>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'}>
          enter
        </Button>
      </Form>
    </>
  );
};

export default RoomName;
