import React, { ChangeEventHandler } from "react";
import "./App.css";
import { useState } from "react";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";
import { useParams } from "react-router-dom";

export function ToDoList() {
 const [numRemainingItems, setNumRemainingItems] = useState(0);
 const { name } = useParams();

 let [items, setItems] = useState(dummyGroceryList);

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
   const checkbox: HTMLInputElement = e.target as HTMLInputElement;
   const itemName = checkbox.name;

   setItems(prevItems => {
     const updatedItems = prevItems.map(item =>
       item.name === itemName ? { ...item, isPurchased: checkbox.checked } : item
     );

     const uncheckedItems = updatedItems.filter(item => !item.isPurchased);
     const checkedItems = updatedItems.filter(item => item.isPurchased);

     return [...uncheckedItems, ...checkedItems];
   });

   setNumRemainingItems(prev => checkbox.checked ? prev + 1 : prev - 1);
 }

 return (
  <>
    <h1 data-testid="todo-list-title">{name}'s To Do List</h1>
    <div className="App">
      <div className="App-body">
        <p data-testid="items-bought-count">Items bought: {numRemainingItems}</p>
        <form action="." data-testid="todo-list-form">
          {items.map((item) => ListItem(item, handleCheckboxClick))}
        </form>
      </div>
    </div>
  </>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div key={item.name} data-testid={`todo-item-${item.name}`}>
     <input
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
       data-testid={`todo-checkbox-${item.name}`}
     />
     {item.name}
   </div>
 );
}
