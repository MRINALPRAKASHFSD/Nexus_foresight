from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    demand_score = Column(Float)
    confidence = Column(Float)
    geography = Column(String) # Comma separated
    industries = Column(String) # Comma separated
    is_emerging = Column(Boolean, default=False)
    
    trends = relationship("SkillTrend", back_populates="skill", cascade="all, delete-orphan")
    sources = relationship("SkillSource", back_populates="skill", uselist=False, cascade="all, delete-orphan")

class SkillTrend(Base):
    __tablename__ = "skill_trends"
    
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(String, ForeignKey("skills.id"))
    year = Column(Integer)
    demand = Column(Float)

    skill = relationship("Skill", back_populates="trends")

class SkillSource(Base):
    __tablename__ = "skill_sources"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(String, ForeignKey("skills.id"))
    job_market = Column(Float)
    patents = Column(Float)
    research = Column(Float)
    startups = Column(Float)

    skill = relationship("Skill", back_populates="sources")
