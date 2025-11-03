import os
import json
import re
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("Missing GOOGLE_API_KEY in .env file!")

genai.configure(api_key=GOOGLE_API_KEY)
MODEL_NAME = "models/gemini-2.5-flash"

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()
        topic = data.get("topic")
        num_questions = data.get("num_questions", 5)

        prompt = f"""
        Generate {num_questions} multiple choice questions on the topic "{topic}".
        Each question should have exactly 4 options (A, B, C, D) and one correct answer.
        Respond ONLY in JSON format as:
        [
            {{
                "question": "...",
                "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
                "answer": "A"
            }}
        ]
        """

        model = genai.GenerativeModel(model_name=MODEL_NAME)
        response = model.generate_content(prompt)
        text_response = response.text.strip()

        if text_response.startswith("```"):
            text_response = text_response.strip("```json").strip("```").strip()

        try:
            questions = json.loads(text_response)
        except json.JSONDecodeError:
            match = re.search(r"\[.*\]", text_response, re.DOTALL)
            if match:
                questions = json.loads(match.group(0))
            else:
                print("Raw Gemini Output:", text_response)
                return jsonify({"error": "Invalid Gemini output"}), 500

        return jsonify({"questions": questions})

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
