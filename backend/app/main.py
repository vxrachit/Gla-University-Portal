from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from app.routes import student,admin,faculty,leave


Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://gla.vxrachit.dpdns.org","gla-vxrachit.pages.dev"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(student.router)
app.include_router(admin.router)
app.include_router(faculty.router)
app.include_router(leave.router)