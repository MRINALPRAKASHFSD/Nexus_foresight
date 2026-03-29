import sys
import random
from sqlalchemy.orm import Session
from database import engine, SessionLocal, Base
from models import Skill, SkillTrend, SkillSource

RAW_SKILLS = [
    {"id": "s1", "name": "Generative AI Engineering", "category": "AI", "geo": "North America,Europe,Asia", "ind": "Technology,Healthcare,Finance,Media", "is_emerging": False},
    {"id": "s2", "name": "Quantum Cryptography", "category": "Cybersecurity", "geo": "North America,Europe", "ind": "Defense,Finance,Technology", "is_emerging": True},
    {"id": "s3", "name": "Sustainable Energy Grid Ops", "category": "Green Tech", "geo": "Europe,North America,Asia", "ind": "Energy,Manufacturing,Logistics", "is_emerging": False},
    {"id": "s4", "name": "Neuromorphic Computing Design", "category": "Hardware", "geo": "North America,Asia", "ind": "Technology,Research,Defense", "is_emerging": True},
    {"id": "s5", "name": "Autonomous Systems Ops", "category": "Robotics", "geo": "North America,Europe,Asia", "ind": "Logistics,Agriculture,Healthcare,Automotive", "is_emerging": False},
    {"id": "s6", "name": "Synthetic Biology Synthesis", "category": "Biotech", "geo": "North America,Europe", "ind": "Healthcare,Agriculture,Research", "is_emerging": True},
    {"id": "s7", "name": "Prompt Engineering", "category": "AI", "geo": "North America,Europe,Asia", "ind": "Technology,Media,Education", "is_emerging": False},
    {"id": "s8", "name": "Swarm Robotics coordination", "category": "Robotics", "geo": "Asia,North America", "ind": "Logistics,Defense,Agriculture", "is_emerging": True},
    {"id": "s9", "name": "Brain-Computer Interface Dev", "category": "Cybernetics", "geo": "North America,Europe", "ind": "Healthcare,Technology", "is_emerging": True},
    {"id": "s10", "name": "Fusion Energy Containment", "category": "Green Tech", "geo": "Europe,North America", "ind": "Energy,Research", "is_emerging": True},
    {"id": "s11", "name": "Space Debris Management", "category": "Aerospace", "geo": "North America,Europe,Asia", "ind": "Aerospace,Defense", "is_emerging": True},
    {"id": "s12", "name": "Personalized Genomics", "category": "Biotech", "geo": "North America,Europe", "ind": "Healthcare,Research", "is_emerging": False},
    {"id": "s13", "name": "Holographic Interface Design", "category": "Design", "geo": "North America,Asia", "ind": "Media,Technology,Education", "is_emerging": True},
    {"id": "s14", "name": "Carbon Capture Optimization", "category": "Green Tech", "geo": "Europe,North America", "ind": "Energy,Manufacturing", "is_emerging": False},
    {"id": "s15", "name": "AI Ethics Auditing", "category": "AI", "geo": "Europe,North America", "ind": "Technology,Finance,Legal", "is_emerging": False},
    {"id": "s16", "name": "Micro-gravity Manufacturing", "category": "Aerospace", "geo": "North America,Europe", "ind": "Aerospace,Manufacturing", "is_emerging": True},
    {"id": "s17", "name": "Emotion AI Analysis", "category": "AI", "geo": "North America,Asia", "ind": "Healthcare,Media,Retail", "is_emerging": True},
    {"id": "s18", "name": "Blockchain Identity Verification", "category": "Cybersecurity", "geo": "North America,Europe,Asia", "ind": "Finance,Legal,Technology", "is_emerging": False},
    {"id": "s19", "name": "Vertical Farming Logistics", "category": "AgriTech", "geo": "Europe,Asia,North America", "ind": "Agriculture,Logistics", "is_emerging": False},
    {"id": "s20", "name": "Exoskeleton Engineering", "category": "Robotics", "geo": "North America,Asia", "ind": "Healthcare,Logistics,Defense", "is_emerging": True},
    {"id": "s21", "name": "Next-Gen Battery Chemistry", "category": "Green Tech", "geo": "Asia,North America,Europe", "ind": "Energy,Automotive", "is_emerging": False},
    {"id": "s22", "name": "Asteroid Mining Surveying", "category": "Aerospace", "geo": "North America", "ind": "Aerospace,Energy", "is_emerging": True},
    {"id": "s23", "name": "Neuro-marketing Strategy", "category": "Marketing", "geo": "North America,Europe", "ind": "Retail,Media", "is_emerging": True},
    {"id": "s24", "name": "Synthetic Organ Printing", "category": "Biotech", "geo": "North America,Europe", "ind": "Healthcare", "is_emerging": True},
    {"id": "s25", "name": "Quantum Machine Learning", "category": "AI", "geo": "North America,Europe", "ind": "Technology,Finance,Research", "is_emerging": True},
    {"id": "s26", "name": "Smart Dust Deployment", "category": "Hardware", "geo": "North America,Asia", "ind": "Defense,Agriculture,Research", "is_emerging": True},
    {"id": "s27", "name": "Hyperloop Network Routing", "category": "Logistics", "geo": "Europe,Asia,North America", "ind": "Logistics,Transportation", "is_emerging": True},
    {"id": "s28", "name": "Zero-Knowledge Proofs Dev", "category": "Cybersecurity", "geo": "North America,Europe", "ind": "Finance,Technology", "is_emerging": False},
    {"id": "s29", "name": "Tidal Energy Optimization", "category": "Green Tech", "geo": "Europe,Asia", "ind": "Energy", "is_emerging": False},
    {"id": "s30", "name": "Digital Twin Orchestration", "category": "System Design", "geo": "North America,Europe,Asia", "ind": "Manufacturing,Logistics,Technology", "is_emerging": False},
]

def ensemble_forecast(skill_name, category):
    base_demand_multiplier = 1.2 if category in ["AI", "Cybersecurity", "Biotech", "Green Tech"] else 1.0
    
    sources = {
        "job_market": random.uniform(5.0, 50.0),
        "patents": random.uniform(10.0, 45.0),
        "research": random.uniform(10.0, 40.0),
        "startups": random.uniform(5.0, 35.0),
    }
    
    total_val = sum(sources.values())
    for k in sources:
        sources[k] = round((sources[k] / total_val) * 100, 1)

    confidence = round(random.uniform(75.0, 98.0), 1)
    
    raw_demand = (sources["job_market"] * 1.5) + (sources["patents"] * 1.2) + (sources["startups"] * 1.8)
    demand_score = min(round((raw_demand * base_demand_multiplier), 1), 100.0)

    trend = []
    current_year = 2024
    current_val = demand_score * random.uniform(0.3, 0.6)
    
    for i in range(4):
        trend.append({"year": current_year + i, "demand": min(current_val, 100.0)})
        current_val += random.uniform((100 - current_val) * 0.2, (100 - current_val) * 0.5)
        current_val = round(current_val, 1)

    return demand_score, confidence, sources, trend

def run_etl():
    print("Starting ETL Pipeline Simulation & Ensemble Models...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        for raw in RAW_SKILLS:
            print(f"Ingesting & Forecasting: {raw['name']}")
            ds, conf, src, trnd = ensemble_forecast(raw['name'], raw['category'])
            
            skill = Skill(
                id=raw["id"], name=raw["name"], category=raw["category"],
                geography=raw["geo"], industries=raw["ind"],
                is_emerging=raw["is_emerging"], demand_score=ds, confidence=conf
            )
            db.add(skill)

            db.add(SkillSource(
                skill_id=skill.id, job_market=src["job_market"], patents=src["patents"],
                research=src["research"], startups=src["startups"]
            ))

            for t in trnd:
                db.add(SkillTrend(skill_id=skill.id, year=t["year"], demand=t["demand"]))
        
        db.commit()
        print("ETL complete. SQLite populated.")
    except Exception as e:
        print(f"ETL Failure: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    run_etl()
