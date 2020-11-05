import React, { useEffect, useRef, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { storage } from '@/lib/firestore';
import { v4 } from 'uuid';

const MarkDownEditor = ({ onSave }: { onSave: (markdown: string) => void }) => {
  const ref = useRef<SimpleMDE>(null);
  const toolbar = [
    {
      name: 'save',
      action: (editor: EasyMDE) => {
        onSave(editor.value());
        editor.value('');
      },
      className: 'fa fa-save',
      title: 'Save',
    },
  ];
  const handleDrop = async (data: any, e: any) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const m = file.name.match(/.+\.([a-z]+)$/);
      const filename = v4();
      const storageRef = storage.ref().child(`images/${filename}.${m[1]}`);
      await storageRef.put(file);
      const filePath = await storageRef.getDownloadURL();
      const currentText = ref.current?.simpleMde?.value();
      ref.current?.simpleMde?.value(`${currentText}  \n![](${filePath})`);
    }
  };
  return (
    <>
      <SimpleMDE
        ref={ref}
        value={''}
        options={{ toolbar: toolbar }}
        events={{
          drop: (data: any, e: any) => {
            handleDrop(data, e);
          },
        }}
      />
    </>
  );
};
export default MarkDownEditor;
