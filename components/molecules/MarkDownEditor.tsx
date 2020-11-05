import React, { useEffect, useRef, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const MarkDownEditor = ({ onSave }: { onSave: (e: string) => void }) => {
  const [markdown, setMarkdown] = useState<string>('');
  const onClickPost = () => {
    onSave(markdown);
    setMarkdown('');
  };
  return (
    <>
      <SimpleMDE
        onChange={setMarkdown}
        options={{ toolbar: [] }}
        value={markdown}
      />
      <button onClick={onClickPost}>post</button>
    </>
  );
};
export default MarkDownEditor;
