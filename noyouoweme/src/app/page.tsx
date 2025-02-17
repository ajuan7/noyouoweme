'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  


  const [people, setPeople] = useState([]);

  const [showAddPersonForm, setShowAddPersonForm] = useState(false);
  const [newPerson, setNewPerson] = useState("");

  const addPerson = () => {
    setShowAddPersonForm(true);
    if (!newPerson.trim()) return;
  };

  const closeAddPersonForm = () => {
    setShowAddPersonForm(false);
  }

  const removeAllGroup = () => {
    setPeople([]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPerson.trim()) return; 

    const newEntry = { id: people.length + 1, name: newPerson, expenses: [] };
    setPeople([...people, newEntry]); 

    setNewPerson(""); 
    console.log("Added Person:", newPerson); 
    closeAddPersonForm(); 
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
        <div className="float-left p-2 w-1/3">
          <h1><b> No, YOU OWE ME! </b></h1> <br></br>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2"> Add People to Group. </li>
            <li className="mb-2">Click on Person.</li>
            <li className="mb-2">Modify Expenses.</li>
          </ol>
        </div>

        <div className="float-right p-2 w-1/3">
          <h2 className="mb-2">Expenses Management </h2>
          <button onClick={addPerson} className="border p-1 hover:bg-gray-950">Add Person</button>
          <button onClick={removeAllGroup} className="border p-1 hover:bg-gray-950">Reset All</button>

        </div>

        <div className="float-right p-2 w-1/3">
          <h2><u>Group</u></h2>
          <ul>
            {people.map((person) => (
              <li key={person.id}>
                <h1>{person.name}</h1>
              </li>
            ))}
          </ul>
        </div>

      </main>

      {showAddPersonForm &&  (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-black p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Add a Person</h2>
                  <form onSubmit={handleSubmit}>
                    <input
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
    </div>
  );
}
