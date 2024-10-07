import React from 'react';

const NoteForm: React.FC = () => {
  return (
    <form className="note-form">
      <div><input placeholder="Note Title" /></div>
      <div><textarea placeholder="Note Content" /></div>
      <div><button type="submit">Create Note</button></div>
    </form>
  );
};

export default NoteForm;