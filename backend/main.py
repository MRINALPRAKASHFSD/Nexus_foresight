from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, engine, Base
import models

app = FastAPI(title="Future Skills API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/skills")
def get_skills(geography: str = Query("All"), industry: str = Query("All"), db: Session = Depends(get_db)):
    skills = db.query(models.Skill).all()
    results = []
    for s in skills:
        if geography != "All" and geography.lower() not in s.geography.lower():
            continue
        if industry != "All" and industry.lower() not in s.industries.lower():
            continue
            
        trends = [{"year": t.year, "demand": t.demand} for t in s.trends]
        sources = {"jobMarket": s.sources.job_market, "patents": s.sources.patents, "research": s.sources.research, "startups": s.sources.startups}
        
        results.append({
            "id": s.id, "name": s.name, "category": s.category, "demandScore": s.demand_score,
            "confidence": s.confidence, "geography": s.geography.split(","), "industries": s.industries.split(","),
            "isEmerging": s.is_emerging, "trendData": trends, "sources": sources
        })
    return results

@app.get("/api/skills/emerging")
def get_emerging_skills(db: Session = Depends(get_db)):
    skills = db.query(models.Skill).filter(models.Skill.is_emerging == True).order_by(models.Skill.demand_score.desc()).all()
    return [{"id": s.id, "name": s.name, "category": s.category, "demandScore": s.demand_score} for s in skills]
    
@app.get("/api/skills/top")
def get_top_skills(limit: int = 3, db: Session = Depends(get_db)):
    skills = db.query(models.Skill).order_by(models.Skill.demand_score.desc()).limit(limit).all()
    return [{"id": s.id, "name": s.name, "demandScore": s.demand_score} for s in skills]
