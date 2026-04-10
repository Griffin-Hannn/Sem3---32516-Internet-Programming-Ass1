# Expense Tracker


## Overview
Expense Tracker is a single-page web application designed to help users record and review their daily spending in a simple and structured way. The application allows users to create, update, delete, and browse expense items, all within a dynamic interface without reloading the page.

This project was developed as part of Assignment 1 for 32516 Internet Programming. The main objective was to build a database-driven web application that connects a React frontend with a FastAPI backend and a PostgreSQL database.


## Problem It Solves
Many people track their spending in an unstructured way, such as notes, screenshots, or memory. This makes it difficult to understand where money is being spent or to identify patterns over time.

This application provides a simple and interactive way to manage expenses in one place. Users can easily record their spending, organise it by category, and review both category-based and monthly summaries. This helps make personal spending more transparent and easier to analyse.


## Features
- Single-page application with dynamic updates (no page reload)
- Create, read, update, and delete expense items
- Category-based filtering
- Latest expenses displayed first
- Total spending summary
- Spending breakdown by category
- Simple monthly spending trends
- Inline editing workflow
- Delete confirmation for safer operations
- Basic error feedback for failed requests
- Responsive layout for smaller screens


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


## Project Structure
```text
assignment1/
│
├── backend/
│   ├── .env.example
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   └── requirements.txt
│
├── database/
│   └── export.sql
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── api.js
│       ├── main.jsx
│       └── styles.css
│
├── README.md
└── .gitignore
```

### Structure Notes
- `backend/main.py` defines the FastAPI routes and API endpoints.  
- `backend/crud.py` contains database operations for creating, reading, updating, and deleting expense records.  
- `backend/models.py` defines the Expense model using SQLModel.  
- `backend/database.py` handles the database connection and session management.  
- `frontend/src/App.jsx` contains the main user interface and application logic.  
- `frontend/src/api.js` handles API requests between the frontend and backend.  
- `frontend/src/styles.css` contains the main styling for the interface.  
- `database/export.sql` stores the database schema and sample data for submission.  


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

Create a `.env` file based on `.env.example`.

Example:

```txt
    DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/uts_32516_ass1_griffin
```

Start the backend server:

```txt
    uvicorn main:app --reload
```

The backend should run on:

    http://127.0.0.1:8000

### 3. Set up the frontend

```bash
    cd frontend
    npm install
    npm run dev
```

The frontend should run on:

    http://127.0.0.1:5173


## Database Setup

This project uses a local PostgreSQL database.

Database name:

```txt
    uts_32516_ass1_griffin
```

Option 1: Use the exported SQL file

After creating the database, import:

```txt
    database/export.sql
```

This file contains the database structure and sample data used for the project.

Option 2: Let the app create the table

If the database already exists and the backend is connected correctly, the application will create the required table automatically on startup.


## API and Data Flow

The application follows a simple client-server architecture.

1. The frontend sends HTTP requests to the FastAPI backend.
2. The backend receives the request and uses SQLModel to interact with the PostgreSQL database.
3. Database operations (create, read, update, delete) are handled in the `crud.py` file.
4. The backend returns JSON responses to the frontend.
5. The frontend updates the interface dynamically without reloading the page.

This design ensures a smooth user experience and keeps the frontend and backend responsibilities clearly separated.


## Challenges

One challenge was deciding how much functionality to include without overcomplicating the project. The goal was to build something more meaningful than a simple to-do list, while still keeping the implementation manageable.

Another challenge was understanding how database sessions work in SQLModel. During development, it was important to correctly use session.add(), commit(), and refresh() to ensure data consistency.

There were also some issues related to frontend state updates and API timing. In earlier versions, some updates did not immediately reflect in the UI, so the data fetching logic was simplified to make the behaviour more predictable.

Finally, maintaining a clean project structure without unnecessary complexity required careful planning, especially when separating backend logic into different files.


## Future Improvements

If this project were to be extended further, the following improvements could be considered:

- adding a search feature for expense titles
- allowing sorting by amount as well as date
- adding simple visual charts for spending trends
- supporting custom categories
- improving form validation and user feedback


## Conclusion

This project demonstrates a complete single-page application that performs all CRUD operations on a database. It integrates a React frontend with a FastAPI backend and a PostgreSQL database, providing a smooth and interactive user experience.

The application meets the assignment requirements by implementing dynamic page updates, structured data handling, and a realistic use case for managing personal expenses.


## Author

Griffin Han  
32516 Internet Programming  
Autumn 2026