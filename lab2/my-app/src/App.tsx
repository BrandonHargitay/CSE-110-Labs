import React, { useState } from 'react';
import './App.css';
import { ThemeContext, themes, Theme } from "./context/ThemeContext";
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import FavoritesList from './components/FavoritesList';
import { useNotes } from './hooks/useNotes';

function App() {
  const [theme, setTheme] = useState<Theme>(themes.light);
  const { notes, favorites, toggleFavorite } = useNotes();

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => prevTheme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app-container' style={{ background: theme.background, color: theme.foreground }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <NoteForm />
        <NoteList notes={notes} onToggleFavorite={toggleFavorite} />
        <FavoritesList favorites={favorites} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;