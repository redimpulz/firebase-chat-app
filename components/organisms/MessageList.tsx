import React from 'react';
import firebase from 'firebase';
import { formatISO } from 'date-fns';

export type Message = {
  body: string;
  createdAt: Date;
};

const MessageList = ({ message }: { message: Message[] }) => {
  return (
    <ul>
      {message.map((message, index) => {
        return (
          <li key={index}>
            {formatISO(message.createdAt)}
            {message.body}
          </li>
        );
      })}
    </ul>
  );
};

export default MessageList;
