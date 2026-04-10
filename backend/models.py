from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date


class Expense(SQLModel, table=True):
    id: str = Field(max_length=50, primary_key=True)
    title: str = Field(max_length=100)
    category: str = Field(max_length=50)
    amount: float
    date: date
    description: Optional[str] = Field(default=None, max_length=255)