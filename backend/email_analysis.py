from openai import OpenAI
import os
def analyze_email(title, contents):
    
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("The OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.")
    client = OpenAI(api_key=api_key)
    

    response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "system",
            "content": (
                "You are an expert email reviewer. "
                "Your objective is to determine whether an email is a scam. "
                "Respond with only 'Yes' or 'No'."
            )
        },
        {
            "role": "user",
            "content": f"This is the email:\nTitle: {title}\nContents: {contents}"
        }
    ]
)
    #outputs the report
    if response.choices[0].message.content != 'No':
        return True
    return False


