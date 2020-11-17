import React from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Button } from 'antd';
import { v4 } from 'uuid';
import marked from 'marked';

import { storage } from '@/lib/firebase';

type Props = {
  postAction: (body: string) => void;
};

const MarkDownEditor: React.FC<Props> = ({ postAction }) => {
  const [value, setValue] = React.useState('');
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  );

  const post = (body: string) => {
    postAction(body);
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
      <Button onClick={() => post(value)}>post</Button>
    </>
  );
};

export default MarkDownEditor;
