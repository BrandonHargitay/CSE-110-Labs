import React, { useContext } from 'react';
import { Note } from '../types';
import { ThemeContext, Theme } from '../context/ThemeContext';

interface NoteItemProps {
  note: Note;
  onToggleFavorite: (id: number) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onToggleFavorite }) => {
  const theme = useContext<Theme>(ThemeContext);

  return (
    <div
      className="note-item"
      style={{ background: theme.background, color: theme.foreground }}
    >
      <div className="notes-header">
        <button>x</button>
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
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.label}</p>
    </div>
  );
};

export default NoteItem;