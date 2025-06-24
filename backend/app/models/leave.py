from sqlalchemy import Column, Integer, String, Date, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    reason = Column(String(255), nullable=False) 
    status = Column(String(50), default="pending")
    faculty_id = Column(Integer, ForeignKey("faculties.id"))
    is_read = Column(Boolean, default=False) 

    faculty = relationship("Faculty", back_populates="leaves")
