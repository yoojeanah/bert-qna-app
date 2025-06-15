#backend/app.py
from flask import Flask, request, jsonify
from transformers import BertTokenizer, BertForQuestionAnswering
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model_path = "youjeanah/bert-qna"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForQuestionAnswering.from_pretrained(model_path)
model.eval()

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    context = data.get('context', '')
    question = data.get('question', '')

    inputs = tokenizer.encode_plus(question, context, return_tensors="pt", truncation=True, max_length=512)
    input_ids = inputs['input_ids'].tolist()[0]

    with torch.no_grad():
        outputs = model(**inputs)
        start = torch.argmax(outputs.start_logits)
        end = torch.argmax(outputs.end_logits) + 1
        pred_tokens = tokenizer.convert_ids_to_tokens(input_ids[start:end])
        answer = tokenizer.convert_tokens_to_string(pred_tokens)

    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True)