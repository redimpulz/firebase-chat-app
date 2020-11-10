import React from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import { Button } from 'antd';

import { v4 } from 'uuid';
import marked from 'marked';

import { firestore, storage } from '@/lib/firebase';

const MarkDownEditor = () => {
  const [value, setValue] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );

  const postMessage = async (body: string) => {
    await firestore.collection('chat').add({
      body: body,
      createdAt: new Date(),
    });
    setValue('');
  };

  const saveImage = async function* (data: ArrayBuffer) {
    const filename = v4();
    const storageRef = storage.ref().child(`images/${filename}`);
    await storageRef.put(data);
    const filePath = await storageRef.getDownloadURL();
    yield filePath;
    return true;
  };

  return (
    <>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(marked(markdown))
        }
        paste={{
          saveImage,
        }}
      />
      <Button onClick={() => postMessage(value)}>post</Button>
    </>
  );
};

export default MarkDownEditor;
