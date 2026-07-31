const resend = require('../config/resend');
const { generateRevisionEmail } = require('../templates/revisionEmail');

class EmailService {
    async sendRevisionEmail(user, questions) {
        try {
            const htmlContent = generateRevisionEmail(user, questions);

            const { data, error } = await resend.emails.send({
                from: process.env.EMAIL_FROM || 'CodeNudge <onboarding@resend.dev>',
                to: user.email,
                subject: 'CodeNudge: Your Daily Revision is Here!',
                html: htmlContent
            });

            if (error) {
                console.error(`[Email Service] Failed to send email to ${user.email}:`, error);
                return { success: false, error };
            }

            return { success: true, data };
        } catch (error) {
            console.error(`[Email Service] Exception sending email to ${user.email}:`, error);
            return { success: false, error };
        }
    }
}

module.exports = new EmailService();
