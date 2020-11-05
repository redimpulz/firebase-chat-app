import React from 'react';
import { Input, Button, Form } from 'antd';
import Router from 'next/router';

const Index = () => {
  const inputRef = React.createRef();
  const onEnterButtonClick = (roomName: string) => {
    Router.push(`/chatroom/${roomName}`);
  };
  return (
    <>
      <h2>Firebase Chat</h2>
      <Form onFinish={({ roomName }) => onEnterButtonClick(roomName)}>
        <Form.Item name={'roomName'}>
          <Input placeholder={'room name'}></Input>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'}>
          enter
        </Button>
      </Form>
    </>
  );
};

export default Index;
