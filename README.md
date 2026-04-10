# Expense Tracker

## Overview

Expense Tracker is a single-page web application that helps users record and review their daily spending in a clear and structured way. The app allows users to add, edit, delete, and browse expense items, while also providing simple summaries by category and month.

This project was developed as part of Assignment 1 for 32516 Internet Programming. The goal was to design a dynamic database-driven web interface using HTML, CSS, JavaScript, and a backend connected to a database.

---

## Problem It Solves

Many people keep track of spending in scattered notes, screenshots, or memory, which makes it difficult to review where their money goes. This application solves that problem by providing a simple and interactive expense logbook.

Users can:

- record a new expense with a title, category, amount, date, and description
- update an expense when details change
- remove an expense that is no longer needed
- filter expenses by category
- review total spending by category
- review monthly spending trends in a simple way

---

## Tech Stack

### Frontend
- React
- JavaScript
- CSS

### Backend
- FastAPI
- SQLModel
- SQLAlchemy

### Database
- PostgreSQL (local)

### Development Tools
- pgAdmin
- Uvicorn
- Git / GitHub

---

## Features

- Single-page application with dynamic updates
- Create, read, update, and delete expense items
- Category-based filtering
- Latest expenses shown first
- Total spending summary
- Total spending by category
- Simple monthly trend summary
- Inline editing workflow
- Delete confirmation
- Loading and error feedback
- Responsive layout for smaller screens

---

## Folder Structure

```txt
assignment1/
│
├── backend/
│   ├── main.py
│   ├── crud.py
│   ├── models.py
│   ├── database.py
│   ├── requirements.txt
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   └── styles.css
│
├── database/
│   └── export.sql
│
├── README.md
└── .gitignore
```

### Structure Notes

- backend/main.py contains the FastAPI routes.
- backend/crud.py contains the database CRUD logic.
- backend/models.py defines the Expense model.
- backend/database.py handles the database connection and session.
- frontend/src/App.jsx contains the main UI and page logic.
- frontend/src/api.js contains all frontend API requests.
- frontend/src/styles.css contains the interface styling.
- database/export.sql contains the exported database structure and sample data for submission.

---

## How to Run the Project

### 1. Clone the repository

```bash
git clone <your-github-repo-url>  
cd assignment1
``` 

### 2. Set up the backend

Make sure PostgreSQL is running before starting the backend.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the backend folder based on `.env.example`.

Example:

```bash
DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/uts_32516_ass1_griffin
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The backend should run on:

http://127.0.0.1:8000  

### 3. Set up the frontend

cd frontend  
npm install  
npm run dev  

The frontend should run on:

http://127.0.0.1:5173  

---

## Database Setup

This project uses a local PostgreSQL database.

### Database name

uts_32516_ass1_griffin

### Option 1: Use the exported SQL file

After creating the database, import:

```bash
database/export.sql
```

This file contains the database structure and sample data used for the project.

### Option 2: Let the app create the table

If the database already exists and the backend is connected correctly, the app can create the table automatically when it starts.

---

## Business Logic Design

This project was designed as an expense tracker instead of a basic to-do list because it better matches the assignment requirement of a real-case application.

The workflow is:

1. The user adds an expense with a title, category, amount, date, and optional description.  
2. The app stores the expense in PostgreSQL through the FastAPI backend.  
3. The user can edit or delete an expense later if needed.  
4. The user can filter expenses by category to focus on one type of spending.  
5. The app calculates total spending, category totals, and monthly totals from the stored data.  

This makes the app more realistic than a very simple CRUD demo, while still keeping the logic manageable and clear.

---

## Challenges Encountered

One challenge was deciding how much complexity to include without overbuilding the assignment. I wanted the project to be more realistic than a simple to-do list, but still within the level expected for this subject. Choosing an expense tracker with category filtering and summary sections turned out to be a good balance.

Another challenge was understanding how the backend session works in SQLModel. During development, I had to carefully distinguish between session.add(), commit(), and refresh(), especially when updating and deleting records.

I also ran into issues with request flow and frontend timing. In some earlier experiments, state updates and user interactions did not always happen in the expected order, so I had to simplify the logic and keep the request handling more direct.

Finally, I had to be careful about keeping the project structure clean without overengineering it. I separated the backend into database, model, CRUD, and route files, but avoided adding unnecessary abstraction layers.

---

## Future Improvements

If I continued this project further, I would consider:

- adding a search function for expense titles  
- allowing users to sort by amount as well as date  
- adding a simple chart for monthly spending  
- supporting more categories or custom categories  
- improving validation messages and form guidance  

---

## Assignment Requirements Checklist

This project addresses the core assignment requirements by:

- behaving as a single-page application  
- implementing all CRUD operations on a database  
- providing a streamlined workflow for expense tracking  
- offering a project scope comparable to the examples in the brief  
- including source code, database export, and documentation  

---

## Author

Griffin Han  
32516 Internet Programming  
Autumn 2026