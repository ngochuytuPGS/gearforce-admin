import React, { useState } from 'react';
import RTEditor, { EditorValue, ToolbarConfig } from 'react-rte';

interface Props {
  className?: string;
  value: EditorValue;
  onChange: (value: EditorValue) => void;
}

//Docs: https://github.com/sstur/react-rte
const TOOLBAR_CONFIG: ToolbarConfig = {
  // Optionally specify the groups to display (displayed in the order listed).
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ],
  BLOCK_TYPE_DROPDOWN: [],
  BLOCK_TYPE_BUTTONS: [
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
  ],
};

const RichTextEditor = ({ value, onChange, className }: Props) => {
  return (
    <RTEditor
      toolbarConfig={TOOLBAR_CONFIG}
      value={value}
      onChange={onChange}
      className={className}
      placeholder="Enter text here"
    />
  );
};

export default RichTextEditor;
