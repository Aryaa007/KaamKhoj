from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


workers = []
jobs = []


class Worker(BaseModel):
    name: str
    skills: str
    city: str
    contact: str
    info: Optional[str] = None

class Job(BaseModel):
    employer: str
    job_type: str
    city: str
    pay: str
    description: Optional[str] = None


@app.post("/register-worker")
def register_worker(worker: Worker):
    workers.append(worker.dict())
    return {"message": "Worker registered!", "id": len(workers)-1}

@app.post("/post-job")
def post_job(job: Job):
    jobs.append(job.dict())
    return {"message": "Job posted!", "id": len(jobs)-1}

@app.get("/workers")
def get_workers():
    return workers

@app.get("/jobs")
def get_jobs():
    return jobs

@app.get("/recommend-jobs/{worker_id}")
def recommend_jobs(worker_id: int):
    if worker_id >= len(workers):
        raise HTTPException(404, "Worker not found")
    
    worker = workers[worker_id]
    return [job for job in jobs 
            if job['city'] == worker['city'] 
            and any(skill in job['job_type'] for skill in worker['skills'].split(','))]

@app.get("/recommend-workers/{job_id}")
def recommend_workers(job_id: int):
    if job_id >= len(jobs):
        raise HTTPException(404, "Job not found")
    
    job = jobs[job_id]
    return [worker for worker in workers 
            if worker['city'] == job['city'] 
            and any(skill in worker['skills'] for skill in job['job_type'].split(','))]