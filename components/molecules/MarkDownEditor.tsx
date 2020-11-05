import React, { useEffect, useRef, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { db } from '@/lib/firestore';

const MarkDownEditor = ({ onSave }: { onSave: (markdown: string) => void }) => {
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
  const handleDrop = (data: any, e: any) => {
    console.log('data: ', typeof data);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      alert('FileName : ' + file.name);
      // any action
    }
  };
  return (
    <>
      <SimpleMDE
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
