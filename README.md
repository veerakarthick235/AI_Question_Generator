# 🧠 AI Question Generator using Gemini 2.5 Flash

An **AI-powered Question Generator** built with **Python (Flask)**, **HTML**, **CSS**, and **JavaScript**, integrated with **AI**.  
It allows users to enter a **topic** and **number of questions**, then automatically generates **multiple-choice questions (MCQs)** with correct answers.

Users can:
- View the generated questions.
- Select answers interactively.
- Submit to check results and view scores.

## 🚀 Features
✅ AI-powered question generation using Gemini 2.5 Flash  
✅ Multiple-choice (MCQ) format with 4 options  
✅ Interactive quiz interface  
✅ Automatic scoring and answer checking  
✅ Flask backend + modern responsive frontend  
✅ JSON-based clean API structure  

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Flask (Python) |
| **AI Model** | Gemini 2.5 Flash (Google Generative AI) |
| **Environment** | Python 3.10+ |
| **Dependencies** | Flask, google-generativeai, python-dotenv |

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/ai-question-generator.git
cd ai-question-generator
```

### 2️⃣ Install Dependencies
```bash
pip install -r requirements.txt
```

### 3️⃣ Create `.env` File
```env
GOOGLE_API_KEY=your_google_api_key_here
```

### 4️⃣ Run the Flask Server
```bash
python app.py
```
Then open your browser and go to: [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 🧩 How It Works
1. Enter a topic (e.g., “Machine Learning”) and select number of questions.
2. Click Generate Questions.
3. The app sends your topic to Gemini 2.5 Flash model.
4. Gemini returns structured JSON with question, options, and correct answer.
5. Select answers and click Submit to view your score.

## 🧠 Example Response
```json
[
  {
    "question": "Which algorithm is used for classification tasks?",
    "options": ["A) K-Means", "B) Linear Regression", "C) Decision Tree", "D) PCA"],
    "answer": "C"
  }
]
```

## 💡 Future Enhancements
- Save quiz results to a database
- Add user login
- Export as PDF
- Add difficulty level selector

## 🧑‍💻 Author
**Veera Karthick**  
🎓 AI & Data Science Student  
💬 “Ready to solve real-world problems with AI.”  
🌱 *Goal: To become a Trillionaire Innovator.*

## 📜 License
MIT License

