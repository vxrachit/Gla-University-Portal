from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

class UserBase(BaseModel):
    name: str
    email: str
    role: str
    department: Optional[str] = None 

class LoginSchema(BaseModel):
    email: str
    password: str

class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    department: str 
    photo: Optional[str]  

class FacultyCreateSchema(BaseModel):
    name: str
    email: str
    password: str
    department : str

class StudentOut(BaseModel):
    id: int
    name: str
    email: str
    department: str | None = None
    photo: str | None = None

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True


class LeaveCreateSchema(BaseModel):
    start_date: date
    end_date: date
    reason: str

class LeaveResponseSchema(BaseModel):
    id: int
    start_date: date
    end_date: date
    reason: str
    status: str
    faculty_id: int

    class Config:
        from_attributes = True


class LeaveRequest(BaseModel):
    id: int
    reason: Optional[str] = None

    class Config:
        from_attributes = True
