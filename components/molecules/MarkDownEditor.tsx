import React, { useRef } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { v4 } from 'uuid';

import { storage } from '@/lib/firestore';

type Props = {
  onSave: (markdown: string) => void;
};

const MarkDownEditor: React.FC<Props> = ({ onSave }) => {
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

  const handleDrop = async (
    _: unknown,
    e: React.DragEvent<HTMLInputElement>
  ) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const m = file.name.match(/.+\.([a-z]+)$/);
      if (m) {
        const filename = v4();
        const storageRef = storage.ref().child(`images/${filename}.${m[1]}`);
        await storageRef.put(file);
        const filePath = await storageRef.getDownloadURL();
        const currentText = ref.current?.simpleMde?.value();
        ref.current?.simpleMde?.value(`${currentText}  \n![](${filePath})`);
      }
    }
  };

  return (
    <SimpleMDE
      ref={ref}
      value={''}
      options={{ toolbar: toolbar }}
      events={{
        drop: (_: unknown, e: any) => {
          handleDrop(_, e);
        },
      }}
    />
  );
};

export default MarkDownEditor;
