import React from 'react';
import { Layout as AntdLayout } from 'antd';

const Layout: React.FC = ({ children }) => (
  <>
    <AntdLayout style={{ minHeight: '100vh' }}>
      <div style={{ padding: '2.5rem' }}>
        <div className="container">{children}</div>
      </div>
    </AntdLayout>
    <style jsx>{`
      .container {
        margin: 2.5rem 10rem;
      }
    `}</style>
  </>
);

export default Layout;
