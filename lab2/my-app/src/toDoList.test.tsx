import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { dummyGroceryList } from "./constants";

describe("ToDoList", () => {
  const renderComponent = (name: string = "Test") => {
    render(
      <MemoryRouter initialEntries={[`/todolist/${name}`]}>
        <Routes>
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test("renders the todo list title with the correct name", () => {
    renderComponent("John");
    const title = screen.getByTestId("todo-list-title");
    expect(title).toHaveTextContent("John's To Do List");
  });

  test("displays all items in the list", () => {
    renderComponent();
    const todoItems = screen.getAllByTestId(/^todo-item-/);
    expect(todoItems).toHaveLength(dummyGroceryList.length);

    dummyGroceryList.forEach((item) => {
      const todoItem = screen.getByTestId(`todo-item-${item.name}`);
      expect(todoItem).toBeInTheDocument();
      expect(todoItem).toHaveTextContent(item.name);
    });
  });

  test("updates the number of items checked correctly", () => {
    renderComponent();
    const itemsBoughtCount = screen.getByTestId("items-bought-count");
    expect(itemsBoughtCount).toHaveTextContent("Items bought: 0");

    const firstCheckbox = screen.getByTestId(`todo-checkbox-${dummyGroceryList[0].name}`);
    fireEvent.click(firstCheckbox);
    expect(itemsBoughtCount).toHaveTextContent("Items bought: 1");

    const secondCheckbox = screen.getByTestId(`todo-checkbox-${dummyGroceryList[1].name}`);
    fireEvent.click(secondCheckbox);
    expect(itemsBoughtCount).toHaveTextContent("Items bought: 2");

    fireEvent.click(firstCheckbox);
    expect(itemsBoughtCount).toHaveTextContent("Items bought: 1");
  });

  test("maintains the correct order of items after checking", () => {
    renderComponent();
    const firstCheckbox = screen.getByTestId(`todo-checkbox-${dummyGroceryList[0].name}`);
    fireEvent.click(firstCheckbox);

    const todoItems = screen.getAllByTestId(/^todo-item-/);
    expect(todoItems[todoItems.length - 1]).toHaveTextContent(dummyGroceryList[0].name);
  });
});
