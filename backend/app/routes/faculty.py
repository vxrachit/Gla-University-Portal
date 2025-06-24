# app/routers/faculty.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.models.faculty import Faculty
from app.models.user import User  # Assuming User is the student model
from app.schemas import LoginSchema, StudentOut  # Make sure StudentOut is defined in schemas
from app.models.leave import LeaveRequest
from app.schemas import LeaveCreateSchema, LeaveResponseSchema

router = APIRouter(
    prefix="/faculty",
    tags=["faculty"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.post("/login")
def faculty_login(data: LoginSchema, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.email == data.email).first()
    if not faculty or not pwd_context.verify(data.password, faculty.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "message": "Faculty login successful",
        "id": faculty.id,
        "email": faculty.email,
        "name": faculty.name,
        "role": "faculty"
    }

# ✅ Get all students
@router.get("/students", response_model=list[StudentOut])
def get_students(db: Session = Depends(get_db)):
    return db.query(User).all()

# ✅ Delete a student
@router.delete("/students/{student_id}")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    db.delete(student)
    db.commit()
    return {"message": "Student deleted successfully"}

@router.get("/{faculty_id}/leave", response_model=list[LeaveResponseSchema])
def get_faculty_leaves(faculty_id: int, db: Session = Depends(get_db)):
    leaves = db.query(LeaveRequest).filter(LeaveRequest.faculty_id == faculty_id).all()
    return leaves

