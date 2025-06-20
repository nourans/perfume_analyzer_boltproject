from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Perfume model
class Perfume(BaseModel):
    id: int
    name: str
    brand: str
    concentration: str
    topNotes: List[str]
    middleNotes: List[str]
    baseNotes: List[str]
    fragranceFamily: str
    season: List[str]
    occasion: List[str]
    longevity: int
    sillage: int
    personalRating: int
    purchaseDate: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    image: Optional[str] = None
    # Add more fields as needed

# In-memory storage
perfumes = []
perfume_id_counter = 1

@app.get("/perfumes", response_model=List[Perfume])
def get_perfumes():
    return perfumes

@app.post("/perfumes", response_model=Perfume)
def add_perfume(perfume: Perfume):
    global perfume_id_counter
    perfume.id = perfume_id_counter
    perfume_id_counter += 1
    perfumes.append(perfume)
    return perfume

@app.delete("/perfumes/{perfume_id}")
def delete_perfume(perfume_id: int):
    global perfumes
    perfumes = [p for p in perfumes if p.id != perfume_id]
    return {"result": "deleted"}

@app.put("/perfumes/{perfume_id}", response_model=Perfume)
def update_perfume(perfume_id: int, perfume: Perfume):
    for idx, p in enumerate(perfumes):
        if p.id == perfume_id:
            perfumes[idx] = perfume
            return perfume
    raise HTTPException(status_code=404, detail="Perfume not found")

# Placeholder for analysis/recommendation endpoints
@app.get("/analysis")
def analysis():
    return {"message": "Analysis endpoint placeholder"}

@app.get("/recommendations")
def recommendations():
    return {"message": "Recommendations endpoint placeholder"} 