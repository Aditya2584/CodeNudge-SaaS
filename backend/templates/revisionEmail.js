function generateRevisionEmail(user, questions) {
    let questionsHtml = questions.map((q, index) => {
        const leetcodeUrl = q.titleSlug 
            ? `https://leetcode.com/problems/${q.titleSlug}/` 
            : '#';

        return `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h3 style="margin: 0 0 10px 0; color: #333;">${index + 1}. ${q.titleSlug || 'Unknown Problem'}</h3>
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                    <strong>Difficulty:</strong> ${q.difficulty || 'Unknown'}
                </p>
                <a href="${leetcodeUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">Solve on LeetCode</a>
            </div>
        `;
    }).join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Daily Revision</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #282c34;
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 30px;
            }
            .footer {
                background-color: #f1f1f1;
                text-align: center;
                padding: 15px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>CodeNudge Daily Revision</h1>
            </div>
            <div class="content">
                <p style="font-size: 16px;">Hello <strong>${user.name || user.email}</strong>,</p>
                <p style="font-size: 16px;">It's time for your daily revision! Here are the problems you need to review today to keep your skills sharp:</p>
                
                <div style="margin-top: 30px;">
                    ${questionsHtml}
                </div>

                <p style="margin-top: 30px; font-size: 16px;">Happy Coding!</p>
            </div>
            <div class="footer">
                <p>You received this email because you are registered with CodeNudge.</p>
                <p>&copy; ${new Date().getFullYear()} CodeNudge. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

module.exports = {
    generateRevisionEmail
};
