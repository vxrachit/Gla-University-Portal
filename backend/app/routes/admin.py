from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.models.admin import Admin
from app.models.faculty import Faculty
from app.schemas import LoginSchema, FacultyCreateSchema
from app.models.leave import LeaveRequest
from app.schemas import LeaveCreateSchema, LeaveResponseSchema
from typing import List


router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Admin login route
@router.post("/login")
def admin_login(data: LoginSchema, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.email == data.email).first()
    if not admin or not pwd_context.verify(data.password, admin.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {
        "message":"Admin login Successful",
        "id": admin.id,
        "name": admin.name,
        "email": admin.email,
        "role": "admin"
    }

# Create faculty account (admin only)
@router.post("/create-faculty")
def create_faculty(data: FacultyCreateSchema, db: Session = Depends(get_db)):
    existing = db.query(Faculty).filter(Faculty.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Faculty already exists")

    hashed_password = pwd_context.hash(data.password)
    new_faculty = Faculty(
        name=data.name,
        email=data.email,
        password=hashed_password,
        department = data.department
    )
    db.add(new_faculty)
    db.commit()
    db.refresh(new_faculty)
    return {"message": "Faculty created successfully", "faculty_id": new_faculty.id}

# Get all faculties
@router.get("/faculties")
def get_all_faculties(db: Session = Depends(get_db)):
    faculties = db.query(Faculty).all()
    return {"count": len(faculties), "faculties": [{"id": f.id, "name": f.name, "email": f.email} for f in faculties]}

# Delete a faculty by ID
@router.delete("/faculty/{faculty_id}")
def delete_faculty(faculty_id: int, db: Session = Depends(get_db)):
    faculty = db.query(Faculty).filter(Faculty.id == faculty_id).first()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")

    db.delete(faculty)
    db.commit()
    return {"message": "Faculty deleted successfully"}

@router.get("/admin/unread-leaves", response_model=list[LeaveResponseSchema])
def get_unread_leaves(db: Session = Depends(get_db)):
    return db.query(LeaveRequest).filter(LeaveRequest.is_read == False).all()

@router.get("/admin/new-leaves", response_model=List[LeaveResponseSchema])  # 👈 use LeaveResponseSchema
def get_new_leaves(db: Session = Depends(get_db)):
    new_leaves = db.query(LeaveRequest).filter(LeaveRequest.is_read == False).all()
    if not new_leaves:
        raise HTTPException(status_code=404, detail="No new leaves found")
    return new_leaves


