import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => (
  <>
    <div className="container">
      <Spin size="large" />
    </div>
    <style jsx>{`
      .container {
        text-align: center;
      }
    `}</style>
  </>
);

export default Loading;
