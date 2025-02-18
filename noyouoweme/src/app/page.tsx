'use client'

import Image from "next/image";
import PreviousMap_ from "postcss/lib/previous-map";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  
  const personInputRef = useRef<HTMLInputElement>(null);

  const [people, setPeople] = useState<{ id: number; name: string }[]>([]);
  const [expenses, setExpenses] = useState<{ id: number; payer: string; cost: number; item: string; splitBetween: number[] }[]>([]); //SPLITBETWEEN = ID'S OF PEOPLE

  const [showAddPersonForm, setShowAddPersonForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  const [newExpense, setNewExpense] = useState("");
  const [newPerson, setNewPerson] = useState("");

  const [newPayer, setNewPayer] = useState("");
  const [newCost, setNewCost] = useState("");
  const [newItem, setNewItem] = useState("");
  const [newSplitBetween, setNewSplitBetween] = useState<number[]>([]);

  useEffect(() => {
    if (showAddPersonForm && personInputRef.current) {
      personInputRef.current.focus();
    }
  }, [showAddPersonForm]);

  useEffect(() => {
    const savedPeople = localStorage.getItem("people");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedPeople) setPeople(JSON.parse(savedPeople));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  const addPerson = () => {
    setShowAddPersonForm(true);
    if (!newPerson.trim()) return;
  };

  const addExpense = () => {
    setShowAddExpenseForm(true);
    if (!newExpense.trim()) return;
  }

  const closeAddPersonForm = () => {
    setShowAddPersonForm(false);
  }

  const closeAddExpenseForm = () => {
    setShowAddExpenseForm(false);
  }

  const removeAllGroup = () => {
    setPeople([]);
    setExpenses([]);
  }

  const handleSubmitPerson = (e) => {
    e.preventDefault();
    if (!newPerson.trim()) return; 

    const newEntry = { id: people.length + 1, name: newPerson  };
    setPeople([...people, newEntry]); 

    setNewPerson(""); 
    console.log("Added Person:", newPerson); 
    closeAddPersonForm(); 
  };

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    console.log("Debugging Values:");
    console.log("newPayer:", newPayer);
    console.log("newCost:", newCost);
    console.log("newSplitBetween:", newSplitBetween);
    if (!newPayer || !newCost.trim() || newSplitBetween.length === 0) return;

    const newEntry = { 
      id: expenses.length + 1, 
      payer: newPayer, 
      cost: parseFloat(newCost), 
      item: newItem,
      splitBetween: newSplitBetween,
    };    
    setExpenses([...expenses, newEntry]); 

    setNewExpense(""); 
    setNewPayer(""); 
    setNewCost(""); 
    setNewItem("");
    setNewSplitBetween([]);
    console.log("Added Expense:", newPerson); 
    closeAddExpenseForm(); 
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <div className="float-left p-2 w-1/4">
          <h1><b> No, YOU OWE ME! </b></h1> <br></br>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2"> Add People to Group. </li>
            <li className="mb-2">Click on Person.</li>
            <li className="mb-2">Modify Expenses.</li>
          </ol>
        </div>

        <div className="float-right p-2 w-1/4">
          <h2 className="mb-2">Expenses Management </h2>
          <button onClick={addPerson} className="border p-1 hover:bg-gray-950 mb-2">Add Person</button>
          <br></br>
          <button onClick={addExpense} className="border p-1 hover:bg-gray-950 mb-2">Add Expense</button>
          <br></br>
          <button onClick={removeAllGroup} className="border p-1 hover:bg-gray-950 mb-2">Reset All</button>

        </div>

        <div className="float-right p-2 w-1/4">
          <h2><u>Group</u></h2>
          <ul>
            {people.map((person) => (
              <li key={person.id}>
                <h1>{person.name}</h1>
              </li>
            ))}
          </ul>
        </div>

        <div className="float-right p-2 w-1/4">
          <h2><u>Expenses</u></h2>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>
                <h1>{people.find((person) => person.id === Number(expense.payer))?.name || "Unknown"} paid {expense.cost} for {expense.item} split between (
                {expense.splitBetween.map((id) => {
                  const person = people.find((p) => p.id === id);
                  return person ? `${person.name} ` : "Unknown";
                })})
                </h1> 
              </li>
            ))} <br></br>
          </ul>
        </div>

      </main>

      {showAddPersonForm &&  (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-black p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Add a Person</h2>
                  <form onSubmit={handleSubmitPerson}>
                    <input
                      ref={personInputRef}
                      type="text"
                      value={newPerson}
                      onChange={(e) => setNewPerson(e.target.value)}
                      placeholder="Enter Name"
                      className="border p-2 w-full rounded mb-4 bg-black text-white placeholder-gray-400"
                    />
                    <div className="flex justify-between">
                      <button 
                        type="submit" 
                        className=" text-white px-4 py-2 rounded hover:bg-gray-950"
                      >
                        Submit
                      </button>
                      <button 
                        type="button" 
                        onClick={closeAddPersonForm} 
                        className="text-white px-4 py-2 rounded hover:bg-gray-950"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
      )}

      {showAddExpenseForm &&  (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add an Expense</h2>
            <form onSubmit={handleSubmitExpense}>
              <p className="mb-2">Payer</p>
              <select className="bg-black w-full mb-2" value={newPayer}  onChange={(e) => setNewPayer(e.target.value)}>
                <option value="" disabled>Select a Payer</option> {/* Placeholder option */}

                {people.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              <p className="mb-2">Purchase Name</p>
              <input placeholder="Food" className="bg-black mb-2 w-full" value={newItem} onChange={(e) => setNewItem(e.target.value)}></input>
              <p className="mb-2">Paid</p>
              <input placeholder="$100" className="bg-black mb-2 w-full" value={newCost} onChange={(e) => setNewCost(e.target.value)}></input>
              <p className="mb-2">Split Between</p>
              {people.map((person) => (
                <label className="mr-2" key={person.id} >
                  <input value={person.id} type="checkbox" checked={newSplitBetween.includes(person.id)} onChange={(e) => {
                    const id = Number(e.target.value);
                    setNewSplitBetween((prev) =>
                      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
                  }}></input>
                  {person.name}
                </label>
              ))}
              <div className="flex justify-between">
                <button 
                  type="submit" 
                  className=" text-white px-4 py-2 rounded hover:bg-gray-950"
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  onClick={closeAddExpenseForm} 
                  className="text-white px-4 py-2 rounded hover:bg-gray-950"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
