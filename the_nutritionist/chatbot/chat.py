from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from transformers import AutoTokenizer, pipeline
import os
import PyPDF2
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import  RecursiveCharacterTextSplitter
os.environ["HUGGINGFACEHUB_API_TOKEN"] ="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"
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Initialize an empty string to store the text
        text = ""
    
        # Loop through each page and extract text
        for page_num in range(3,len(pdf_reader.pages)-2):
            
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
        
    return text

def bot(text):
    #llm = HuggingFaceEndpoint(repo_id = "bigscience/bloom")
    content=""
    for i in range(1,7):
        content+=extract_text_from_pdf(f"nutri{i}.pdf")
    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 512,
    chunk_overlap  = 32,
    length_function = len,
    )

    modelPath = "sentence-transformers/all-MiniLM-l6-v2"

# Create a dictionary with model configuration options, specifying to use the CPU for computations
    model_kwargs = {'device':'cpu'}

# Create a dictionary with encoding options, specifically setting 'normalize_embeddings' to False
    encode_kwargs = {'normalize_embeddings': False}

# Initialize an instance of HuggingFaceEmbeddings with the specified parameters
    embeddings = HuggingFaceEmbeddings(
    model_name=modelPath,     # Provide the pre-trained model's path
    model_kwargs=model_kwargs, # Pass the model configuration options
    encode_kwargs=encode_kwargs # Pass the encoding options
)
    content=text_splitter.split_text(content)
    db = FAISS.from_texts(content, embeddings)
    model_name = "Intel/dynamic_tinybert"

# Load the tokenizer associated with the specified model
    tokenizer = AutoTokenizer.from_pretrained(model_name, padding=True, truncation=True, max_length=512)

# Define a question-answering pipeline using the model and tokenizer
    question_answerer = pipeline(
    "question-answering", 
    model=model_name, 
    tokenizer=tokenizer,
    return_tensors='pt'
    )

# Create an instance of the HuggingFacePipeline, which wraps the question-answering pipeline
# with additional model-specific arguments (temperature and max_length)
    llm = HuggingFacePipeline(
    pipeline=question_answerer,
    model_kwargs={"temperature": 0.7, "max_length": 512},
    )
    retriever = db.as_retriever(search_kwargs={"k": 4})
    qa = RetrievalQA.from_chain_type(llm=llm, chain_type="refine", retriever=retriever, return_source_documents=False)
    result = qa.run({"query": text})


print(bot("What should young children eat"))
