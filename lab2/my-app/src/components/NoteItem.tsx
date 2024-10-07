import React, { useContext, useState, useEffect } from 'react';
import { Note, Label } from '../types';
import { ThemeContext, Theme } from '../context/ThemeContext';

interface NoteItemProps {
  note: Note;
  onToggleFavorite: (id: number) => void;
  onNoteSelect: (note: Note) => void;
  isSelected: boolean;
  onNoteUpdate: (note: Note) => void;
  onNoteDelete: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ 
  note, 
  onToggleFavorite, 
  onNoteSelect, 
  isSelected, 
  onNoteUpdate,
  onNoteDelete
}) => {
  const theme = useContext<Theme>(ThemeContext);
  const [editedNote, setEditedNote] = useState(note);

  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const handleContentEdit = (event: React.FormEvent<HTMLDivElement>, field: keyof Note) => {
    const target = event.target as HTMLDivElement;
    setEditedNote({ ...editedNote, [field]: target.textContent || '' });
  };

  const handleLabelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedNote({ ...editedNote, label: event.target.value as Label });
  };

  const handleUpdate = () => {
    onNoteUpdate(editedNote);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNoteDelete(note.id);
  };

  return (
    <div
      className={`note-item ${isSelected ? 'selected' : ''}`}
      style={{ background: theme.background, color: theme.foreground }}
      onClick={() => onNoteSelect(note)}
    >
      <div className="notes-header">
        <button onClick={handleDelete}>x</button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(note.id);
          }}
          className="favorite-button"
        >
          {note.isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <h2
        contentEditable={isSelected}
        onBlur={(e) => handleContentEdit(e, 'title')}
        suppressContentEditableWarning={true}
      >
        {note.title}
      </h2>
      <div
        contentEditable={isSelected}
        onBlur={(e) => handleContentEdit(e, 'content')}
        suppressContentEditableWarning={true}
      >
        {note.content}
      </div>
      {isSelected ? (
        <select value={editedNote.label} onChange={handleLabelChange}>
          <option value={Label.personal}>Personal</option>
          <option value={Label.study}>Study</option>
          <option value={Label.work}>Work</option>
          <option value={Label.other}>Other</option>
        </select>
      ) : (
        <p>{note.label}</p>
      )}
      {isSelected && <button onClick={handleUpdate}>Update</button>}
    </div>
  );
};

export default NoteItem;