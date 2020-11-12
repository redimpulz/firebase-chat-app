import React from 'react';
import marked from 'marked';

import { formatISO9075 } from 'date-fns';

type Props = {
  date: Date;
  body: string;
};

const Message: React.FC<Props> = ({ date, body }) => {
  return (
    <>
      <div className="message">
        <span className="date">{formatISO9075(date)}</span>
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
