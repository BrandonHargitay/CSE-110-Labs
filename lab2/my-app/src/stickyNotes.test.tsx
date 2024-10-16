import React from 'react';
import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./StickyNotes";
import { ThemeContext, themes } from './context/ThemeContext';

describe("StickyNotes", () => {
  const renderComponent = () => {
    render(
      <ThemeContext.Provider value={themes.light}>
        <StickyNotes />
      </ThemeContext.Provider>
    );
  };

  test("renders create note form", () => {
    renderComponent();
    const createNoteButton = screen.getByTestId("create-note-button");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    renderComponent();
    const titleInput = screen.getByTestId("note-title-input");
    const contentInput = screen.getByTestId("note-content-input");
    const createNoteButton = screen.getByTestId("create-note-button");

    fireEvent.change(titleInput, { target: { value: "New Note" } });
    fireEvent.change(contentInput, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("reads all created notes", () => {
    renderComponent();
    const createNote = (title: string, content: string) => {
      const titleInput = screen.getByTestId("note-title-input");
      const contentInput = screen.getByTestId("note-content-input");
      const createNoteButton = screen.getByTestId("create-note-button");

      fireEvent.change(titleInput, { target: { value: title } });
      fireEvent.change(contentInput, { target: { value: content } });
      fireEvent.click(createNoteButton);
    };

    createNote("Note 1", "Content 1");
    createNote("Note 2", "Content 2");
    createNote("Note 3", "Content 3");

    const noteItems = screen.getAllByTestId(/^note-item-/);
    expect(noteItems).toHaveLength(8); // 5 dummy notes + 3 new notes

    noteItems.forEach((noteItem) => {
      const title = within(noteItem).getByTestId(/^note-title-/);
      const content = within(noteItem).getByTestId(/^note-content-/);
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  test("updates a note", () => {
    renderComponent();
    const noteToUpdate = screen.getByTestId("note-item-1");
    fireEvent.click(noteToUpdate);

    const titleElement = screen.getByTestId("note-title-1");
    const contentElement = screen.getByTestId("note-content-1");
    const updateButton = screen.getByTestId("update-note-1");

    fireEvent.input(titleElement, { target: { textContent: "Updated Title" } });
    fireEvent.input(contentElement, { target: { textContent: "Updated Content" } });
    fireEvent.click(updateButton);

    expect(titleElement).toHaveTextContent("Updated Title");
    expect(contentElement).toHaveTextContent("Updated Content");
  });

  test("deletes a note", () => {
    renderComponent();
    const initialNoteCount = screen.getAllByTestId(/^note-item-/).length;
    const deleteButton = screen.getByTestId("delete-note-1");

    fireEvent.click(deleteButton);

    const updatedNoteCount = screen.getAllByTestId(/^note-item-/).length;
    expect(updatedNoteCount).toBe(initialNoteCount - 1);
    expect(screen.queryByTestId("note-item-1")).not.toBeInTheDocument();
  });
});
