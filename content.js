//single email analysis
async function analyzeEmail(title, body) {
    try {
        console.log(`Analyzing email: Title="${title}", Body="${body}"`);
        const response = await fetch('https://127.0.0.1:5000/analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Analysis result:", data.result);
        return data.result; 
    } catch (error) {
        console.error("Error during analyzeEmail:", error);
        return false; 
    }
}

//iterate baby
async function analyzeEmails() {
    const emailRows = document.querySelectorAll(".zA");
    console.log(`Found ${emailRows.length} email rows.`);

    for (const emailRow of emailRows) {
        try {
            const emailSubject = emailRow.querySelector(".bog")?.innerText || "No subject";
            const bodyPreview = emailRow.querySelector(".y2")?.innerText || "No preview";
            console.log(`Processing: Subject="${emailSubject}", Preview="${bodyPreview}"`);

            const result = await analyzeEmail(emailSubject, bodyPreview);
            if (result) {
                console.log("Adding reply button for potential scam email...");
                addReplyButtons(emailRow);
            }
        } catch (error) {
            console.error("Error analyzing email row:", error);
        }
    }
}

//scam label and reply button
function addReplyButtons(emailRow) {
    if (emailRow.querySelector('.custom-reply-button')) return;

    const scamLabel = document.createElement('p');
    scamLabel.innerText = 'SCAM';
    scamLabel.style.color = 'red';

    const replyButton = document.createElement('button');
    replyButton.innerText = 'Reply';
    replyButton.className = 'custom-reply-button';
    replyButton.style.marginLeft = '10px';
    replyButton.style.backgroundColor = '#4CAF50';
    replyButton.style.color = 'white';

    replyButton.addEventListener('click', async () => {
        console.log("Reply button clicked!");
        await openEmailAndReply(emailRow);
    });

    const actionContainer = emailRow.querySelector('.yX');
    if (actionContainer) {
        actionContainer.appendChild(scamLabel);
        scamLabel.insertAdjacentElement('afterend', replyButton);
    }
}

//opens and replies
async function openEmailAndReply(emailRow) {
    try {
        emailRow.click();
        console.log("Email opened.");

        await waitForElement('div[aria-label="Reply"]', 5000);

        const replyButton = document.querySelector('div[aria-label="Reply"]');
        if (replyButton) {
            replyButton.click();
            console.log("Reply button clicked.");

            await waitForElement('.Am.Al.editable', 5000);

            const replyBox = document.querySelector('.Am.Al.editable');
            if (replyBox) {
                // Generate the reply content using the Flask API
                const emailSubject = document.querySelector('.hP')?.innerText || "No subject";
                const emailBody = document.querySelector('.a3s .gmail_default')?.innerText || "No body";
                const personality = "High, drunk, and slow"; 

                const replyContent = await generateEmail(personality, emailSubject, emailBody);
                replyBox.innerHTML = replyContent;
                replyBox.dispatchEvent(new Event('input', { bubbles: true }));
                console.log("Reply content populated.");
            }
        }
    } catch (error) {
        console.error("Error opening email and replying:", error);
    }
}


async function generateEmail(personality, title, body) {
    try {
        console.log(`Generating email: Personality="${personality}", Title="${title}", Body="${body}"`);
        const response = await fetch('https://127.0.0.1:5000/generation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personality, title, body }),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Generation result:", data.result);
        return data.result; 
    } catch (error) {
        console.error("Error during generateEmail:", error);
        return "Could not generate email content."; 
    }
}

//  wait for a DOM element to appear
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const interval = 100;
        let elapsedTime = 0;

        const timer = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(timer);
                resolve(element);
            } else if (elapsedTime >= timeout) {
                clearInterval(timer);
                reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms.`));
            }
            elapsedTime += interval;
        }, interval);
    });
}


window.addEventListener("load", analyzeEmails);


