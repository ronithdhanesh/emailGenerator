from llm_utils import llm, llm_chain
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://email-generator-teal.vercel.app/",
    "https://email-generator-teal.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class emailRequest(BaseModel):
    toEmail: str
    detail: str
    tone: str

class emailResponse(BaseModel):
    subject: str
    content: str





@app.post('/generate-email/', response_model=emailResponse)
async def generate_email(request:emailRequest):
    toEmail = request.toEmail
    detail = request.detail
    tone = request.tone
    response = llm_chain.invoke({
        "toEmail":toEmail,
        "detail":detail,
        "tone": tone
    })

    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)