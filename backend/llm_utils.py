from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import os
from dotenv import load_dotenv


load_dotenv()

llm = ChatGoogleGenerativeAI(
    model='gemini-flash-latest',
    api_key=os.getenv('GOOGLE_API_KEY')
)


email_generation_prompt = ChatPromptTemplate.from_template("""
You are a helpful email writing assistant.

Please write an email to the following recipient: {toEmail}

The email must cover the following details:
{detail}

The tone of the email should be: {tone}

Please provide the content as a json output in the following format
    subject : 
    content : 
                                                           
    NO PREAMBLE  """)


llm_chain = email_generation_prompt | llm | JsonOutputParser()

# result = llm_chain.invoke({"toEmail":"ronithdhanesh@gmail.com","detail":"asking when is he free for a coffee", "tone":"informal"})

# print(result)