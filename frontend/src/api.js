const API_BASE_URL = "http://127.0.0.1:8000/expenses";

export async function getExpenses(category = "") {
  const url = category
    ? `${API_BASE_URL}?category=${encodeURIComponent(category)}`
    : API_BASE_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching expenses");
  }

  const data = await response.json();
  return data;
}

export async function createExpense(expenseData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("Error creating expense");
  }

  const data = await response.json();
  return data;
}

export async function updateExpense(expenseId, expenseData) {
  const response = await fetch(`${API_BASE_URL}/${expenseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error("Error updating expense");
  }

  const data = await response.json();
  return data;
}

export async function deleteExpense(expenseId) {
  const response = await fetch(`${API_BASE_URL}/${expenseId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting expense");
  }

  return true;
}