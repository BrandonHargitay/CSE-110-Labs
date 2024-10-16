# Unit Tests Documentation

This document outlines the unit tests implemented for the To Do List and Sticky Notes components.

## To Do List Tests

### ToDoList

1. **renders the todo list title with the correct name**
   - Ensures that the title of the To Do List is correctly rendered with the provided name.

2. **displays all items in the list**
   - Verifies that all items from the dummy grocery list are displayed on the screen.

3. **updates the number of items checked correctly**
   - Checks if the count of checked items is updated correctly when items are checked and unchecked.

4. **maintains the correct order of items after checking**
   - Ensures that checked items are moved to the end of the list while maintaining the order of unchecked items.

## Sticky Notes Tests

### StickyNotes

1. **renders create note form**
   - Verifies that the form for creating a new note is rendered correctly.

2. **creates a new note**
   - Tests the creation of a new note with a title and content.

3. **reads all created notes**
   - Ensures that all created notes, including dummy notes, are displayed on the screen.

4. **updates a note**
   - Verifies that a note can be updated with new title and content.

5. **deletes a note**
   - Tests the deletion of a note and ensures it's removed from the list.

6. **toggles favorite status of a note**
   - Checks if the favorite status of a note can be toggled.

7. **creates a note with empty content**
   - Tests the creation of a note with an empty content field.

8. **creates a note with very long title and content**
   - Verifies that notes with very long titles and content can be created and displayed correctly.

9. **deletes all notes**
   - Tests the scenario where all notes are deleted, resulting in an empty list.

10. **updates note label**
    - Ensures that the label of a note can be updated.

These unit tests cover various aspects of both components, including basic CRUD operations, edge cases, and specific UI interactions. They help ensure the reliability and correctness of the To Do List and Sticky Notes functionalities.
