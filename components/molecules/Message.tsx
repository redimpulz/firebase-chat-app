import React from 'react';
import marked from 'marked';
import Avatar from '@/components/atoms/Avatar';

import { formatISO9075 } from 'date-fns';

type Props = {
  date: Date;
  body: string;
  userName: string;
};

const Message: React.FC<Props> = ({ date, body, userName }) => {
  return (
    <>
      <div className="message">
        <span className="date">{formatISO9075(date)}</span>
        <span className="userName"> {userName}</span>
        <Avatar seed={userName} />
        <br />
        <span dangerouslySetInnerHTML={{ __html: marked(body) }} />
      </div>
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
    </>
  );
};

export default Message;
