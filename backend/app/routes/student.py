from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.database import get_db
from app.models.user import User
from app.schemas import LoginSchema, RegisterSchema  # Ensure both are defined in schemas.py

router = APIRouter(
    prefix="/student",
    tags=["student"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login")
def student_login(data: LoginSchema, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.email == data.email, User.role == "student").first()
    if not student or not pwd_context.verify(data.password, student.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "message": "Login successful",
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "role": student.role,
        "department":student.department,
        "photo":student.photo
    }


@router.post("/register")
def student_register(data: RegisterSchema, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(data.password)
    new_student = User(
        name=data.name,
        email=data.email,
        password=hashed_password,
        role="student",
        department=data.department,
        photo = data.photo
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return {
        "message": "Student registered successfully",
        "id": new_student.id,
        "name": new_student.name,
        "email": new_student.email,
        "role": new_student.role,
        "department":new_student.department,
        "photo":new_student.photo
    }
