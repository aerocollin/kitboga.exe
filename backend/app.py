from flask import Flask, request, jsonify
from flask_cors import CORS
from email_analysis import analyze_email
from email_generator import generate_email

app = Flask(__name__)

#Allow CORS for Gmail origin
CORS(app, origins=["https://mail.google.com"])


@app.route('/analysis', methods=['POST', 'OPTIONS'])
def analyze():
    if request.method == 'OPTIONS':
       
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Origin'] = 'https://mail.google.com'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    
    data = request.get_json()
    title = data.get('title', '')
    body = data.get('body', '')
    result = analyze_email(title, body)  
    response = jsonify({'result': result})
    response.headers['Access-Control-Allow-Origin'] = 'https://mail.google.com'
    return response, 200


@app.route('/generation', methods=['POST', 'OPTIONS'])
def generate():
    if request.method == 'OPTIONS':
        
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Origin'] = 'https://mail.google.com'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    
    data = request.get_json()
    personality = data.get('personality', '')
    title = data.get('title', '')
    body = data.get('body', '')
    result = generate_email(personality, title, body)  
    response = jsonify({'result': result})
    response.headers['Access-Control-Allow-Origin'] = 'https://mail.google.com'
    return response, 200

if __name__ == '__main__':
    
    app.run(host='0.0.0.0', port=5000, ssl_context=('cert.pem', 'key.pem'), debug=True)