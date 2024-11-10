# Kitboga.exe

This project is a Chrome extension integrated with a Flask backend to detect and troll scam emails. The extension analyzes Gmail emails, identifies suspicious content, and flags them for the user with a "SCAM" label and a "Reply" button, which allows the user to send an AI-generated email designed to waste the scammer's time

## Features

- **Email Analysis**: Detects potential scam emails based on content.
- **Integration with Flask Backend**: Uses a Flask API to handle email analysis and reply generation.
- **"SCAM" Labeling**: Flags suspicious emails directly in the Gmail UI.
- **Reply Button**: Allows users to generate and send customized AI generated replies to scammers.

## How It Works

1. **Chrome Extension**:
   - The extension scans Gmail emails for suspicious content.
   - Calls the Flask backend to analyze each email's title and content.
   - Flags suspicious emails with a red "SCAM" label and a "Reply" button which allows the user to waste the scammer's time with an AI generated email.

2. **Flask Backend**:
   - Serves as the API for email analysis and reply generation.
   - Integrates with OpenAI's API for advanced content analysis and reply generation.

---

## Requirements

### Chrome Extension
- Google Chrome browser (latest version).

### Backend
- Python 3.8 or higher.
- Dependencies listed in requirements.txt
- OpenSSL for HTTPS.

---

## Steps
1. **Clone the repositry**
```bash
git clone https://github.com/aerocollin/kitboga.exe.git
cd kitboga.exe
```

2. **Set the OpenAI API key**
```bash
   export OPENAI_API_KEY="your_openai_api_key"
```

3. **Run and fill out the certificates**
```bash
  openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365
```

4. **Open chrome://extensions/ and load the extension**

5. **Open Gmail**




