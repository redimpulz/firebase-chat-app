import React from 'react';
import marked from 'marked';
import { message } from 'antd';

const Message = ({ date, body }: { date: string; body: string }) => {
  return (
    <div className={'message'}>
      <span className={'date'}>{date}</span>
      <br />
      <span dangerouslySetInnerHTML={{ __html: marked(body) }} />
      <style jsx>{`
        .date {
          color: gray;
        }
        .message {
          background: #94c2ed;
          border-radius: 5px;
          padding: 5px;
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default Message;
