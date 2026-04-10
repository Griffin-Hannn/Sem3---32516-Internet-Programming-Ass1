const API_BASE_URL = "http://127.0.0.1:8000/expenses";

export async function getExpenses(category = "") {
  const url = category
    ? `${API_BASE_URL}?category=${encodeURIComponent(category)}`
    : API_BASE_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses.");
  }

  return response.json();
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
    throw new Error("Failed to create expense.");
  }

  return response.json();
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
    throw new Error("Failed to update expense.");
  }

  return response.json();
}

export async function deleteExpense(expenseId) {
  const response = await fetch(`${API_BASE_URL}/${expenseId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense.");
  }

  return true;
}