import { useState } from "react";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  function handleSubmit(e) {
    e.preventDefault();

    if (editIndex !== -1) {
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = { amount: amount, desc: desc };
      setExpenses(updatedExpenses);
      setEditIndex(-1);
    } else {
      const newExpense = { amount: amount, desc: desc };
      setExpenses((currExpenses) => [...currExpenses, newExpense]);
    }
    setAmount(0);
    setDesc("");
  }

  function handleEdit(index) {
    const expenseToEdit = expenses[index];
    setAmount(expenseToEdit.amount);
    setDesc(expenseToEdit.desc);
    setEditIndex(index);
  }

  function deleteExpense(index) {
    console.log("madarchod");
    setExpenses((currExpenses) => {
      const updatedExpenses = [...currExpenses];
      updatedExpenses.splice(index, 1);
      return updatedExpenses;
    });
  }
  const totalAmount = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return (
    <div className="container">
      <h1 className="font-mono font-bold text-3xl p-8">Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Expense :</label>
        <input
          type="text"
          id="amount"
          placeholder="Enter amount description"
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <label htmlFor="amount">Amount :</label>
        <input
          type="number"
          id="amount"
          placeholder="Enter amount amount"
          required
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button>{editIndex !== -1 ? "Update" : "Add Expense"}</button>
      </form>
      <h2>Expense List</h2>
      <ul id="expenseList"></ul>
      <p id="total"></p>
      {expenses.map((item, index) => (
        <div className="pb-3" key={index}>
          <div className="expenses flex">
            <div className="output_div flex items-center min-w-full justify-between">
              <span className="text-left">
                {item.desc}: ₨ {item.amount}
              </span>
              <div className="flex">
                <button className="ml-2" onClick={() => deleteExpense(index)}>
                  Delete
                </button>
                <button className="ml-2" onClick={() => handleEdit(index)}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <p id="total">Total: ₨ {totalAmount}</p>
    </div>
  );
}
