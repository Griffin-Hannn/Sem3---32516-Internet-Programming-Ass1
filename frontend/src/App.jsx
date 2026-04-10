import { useEffect, useMemo, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./api";
import "./styles.css";

const initialFormData = {
  id: "",
  title: "",
  category: "Food",
  amount: "",
  date: "",
  description: "",
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const categories = ["Food", "Transport", "Study", "Entertainment", "Other"];

  const fetchAllExpenses = async (category = "") => {
    setLoading(true);
    setErrorMessage("");

    try {
      const data = await getExpenses(category);
      setExpenses(data);
    } catch (error) {
      setErrorMessage("Failed to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllExpenses(filterCategory);
  }, [filterCategory]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setErrorMessage("Amount must be greater than 0.");
      return;
    }

    if (!formData.date) {
      setErrorMessage("Date is required.");
      return;
    }

    const expensePayload = {
      ...formData,
      amount: Number(formData.amount),
    };

    setLoading(true);

    try {
      if (editingId) {
        await updateExpense(editingId, expensePayload);
      } else {
        const newId = new Date().toISOString();
        await createExpense({
          ...expensePayload,
          id: newId,
        });
      }

      await fetchAllExpenses(filterCategory);
      resetForm();
    } catch (error) {
      setErrorMessage("Failed to save expense.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      id: expense.id,
      title: expense.title,
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description || "",
    });
    setErrorMessage("");
  };

  const handleDelete = async (expenseId, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await deleteExpense(expenseId);
      await fetchAllExpenses(filterCategory);

      if (editingId === expenseId) {
        resetForm();
      }
    } catch (error) {
      setErrorMessage("Failed to delete expense.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  const totalsByCategory = useMemo(() => {
    const result = {};

    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = Number(expense.amount);

      if (!result[category]) {
        result[category] = 0;
      }

      result[category] += amount;
    });

    return result;
  }, [expenses]);

  const monthlyTrend = useMemo(() => {
    const result = {};

    expenses.forEach((expense) => {
      const monthKey = expense.date.slice(0, 7);
      const amount = Number(expense.amount);

      if (!result[monthKey]) {
        result[monthKey] = 0;
      }

      result[monthKey] += amount;
    });

    return result;
  }, [expenses]);

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>Expense Tracker</h1>
          <p>Track your spending with clear categories and simple insights.</p>
        </header>

        <section className="card">
          <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>

          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Lunch, Train ticket"
              />
            </div>

            <div className="form-row">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. 12.50"
                step="0.01"
                min="0"
              />
            </div>

            <div className="form-row">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Optional note"
                rows="3"
              />
            </div>

            <div className="button-row">
              <button type="submit" disabled={loading}>
                {editingId ? "Save Changes" : "Add Expense"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card">
          <div className="filter-row">
            <div>
              <h2>Expenses</h2>
              <p className="subtle-text">
                Showing latest expenses first.
              </p>
            </div>

            <div className="filter-control">
              <label>Filter by Category</label>
              <select
                value={filterCategory}
                onChange={(event) => setFilterCategory(event.target.value)}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {loading && <p className="status-message">Loading...</p>}

          {!loading && expenses.length === 0 && (
            <p className="status-message">No expense items found.</p>
          )}

          {!loading && expenses.length > 0 && (
            <div className="expense-list">
              {expenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-main">
                    <div className="expense-top-line">
                      <h3>{expense.title}</h3>
                      <span className="amount">${Number(expense.amount).toFixed(2)}</span>
                    </div>

                    <div className="expense-meta">
                      <span className="badge">{expense.category}</span>
                      <span>{expense.date}</span>
                    </div>

                    {expense.description && (
                      <p className="description">{expense.description}</p>
                    )}
                  </div>

                  <div className="expense-actions">
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => handleEdit(expense)}
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDelete(expense.id, expense.title)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card">
          <h2>Summary</h2>
          <p className="summary-total">
            Total Spending: <strong>${totalAmount.toFixed(2)}</strong>
          </p>

          <div className="summary-grid">
            <div>
              <h3>By Category</h3>
              {Object.keys(totalsByCategory).length === 0 ? (
                <p className="subtle-text">No category data yet.</p>
              ) : (
                <ul className="summary-list">
                  {Object.entries(totalsByCategory).map(([category, total]) => (
                    <li key={category}>
                      <span>{category}</span>
                      <strong>${total.toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3>Monthly Trend</h3>
              {Object.keys(monthlyTrend).length === 0 ? (
                <p className="subtle-text">No monthly data yet.</p>
              ) : (
                <ul className="summary-list">
                  {Object.entries(monthlyTrend).map(([month, total]) => (
                    <li key={month}>
                      <span>{month}</span>
                      <strong>${total.toFixed(2)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;