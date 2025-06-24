from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.leave import LeaveRequest
from app.schemas import LeaveCreateSchema, LeaveResponseSchema

router = APIRouter(prefix="/leave", tags=["leave"])

@router.post("/request", response_model=LeaveResponseSchema)
def request_leave(leave: LeaveCreateSchema, faculty_id: int, db: Session = Depends(get_db)):
    new_leave = LeaveRequest(
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="pending",
        faculty_id=faculty_id
    )
    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)
    return new_leave

@router.get("/all", response_model=list[LeaveResponseSchema])
def get_all_leaves(db: Session = Depends(get_db)):
    return db.query(LeaveRequest).all()

@router.put("/approve/{leave_id}")
def approve_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    leave.status = "approved"
    db.commit()
    return {"message": "Leave approved"}

@router.put("/reject/{leave_id}")
def reject_leave(leave_id: int, db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    leave.status = "rejected"
    db.commit()
    return {"message": "Leave rejected"}



@router.put("/admin/mark-leave-read/{leave_id}")
def mark_leave_as_read(leave_id: int, db: Session = Depends(get_db)):
    leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    leave.is_read = True
    db.commit()
    return {"message": "Leave marked as read"}
