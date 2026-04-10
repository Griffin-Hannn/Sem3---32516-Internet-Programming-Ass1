from typing import List, Optional

from fastapi import FastAPI, HTTPException, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, SQLModel

from database import get_session, engine
import models
from models import Expense
from crud import (
    create_expense,
    get_expenses,
    update_expense,
    delete_expense,
)

SQLModel.metadata.create_all(engine)

app = FastAPI(title="Expense Tracker API")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/expenses", response_model=List[Expense])
async def get_all_expenses(
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_session)
):
    """Fetch all expense items, with optional category filtering."""
    return await get_expenses(db, category=category, skip=skip, limit=limit)


@app.post("/expenses", response_model=Expense)
async def add_expense(expense: Expense, db: Session = Depends(get_session)):
    """Create a new expense item."""
    db_expense = await create_expense(db, expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense


@app.put("/expenses/{expense_id}", response_model=Expense)
async def edit_expense(
    expense_id: str,
    updated_expense: Expense,
    db: Session = Depends(get_session)
):
    """Update an existing expense item."""
    db_expense = await update_expense(db, expense_id, updated_expense)

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense item not found")

    db.commit()
    db.refresh(db_expense)
    return db_expense


@app.delete("/expenses/{expense_id}")
async def remove_expense(expense_id: str, db: Session = Depends(get_session)):
    """Delete an expense item."""
    db_expense = await delete_expense(db, expense_id)

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense item not found")

    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)