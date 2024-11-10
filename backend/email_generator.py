from openai import OpenAI
import os
def generate_email(personality, title, contents):
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("The OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.")
    client = OpenAI(api_key=api_key)
    response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
    {"role": "system", "content": "You are trolling a scammer, and you are pretending to be " + personality + ". You go along with scammer, and your objective is to waste as much of the scammer's time as possible. Create an email in response to theirs. Do not include any greeting, and do not include the subject"},
    {"role": "user", "content": "This is the email: " + contents}
]
    )
    
    return response.choices[0].message.content


