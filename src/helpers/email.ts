
import { AWS_S3, SENDER_EMAIL_ID } from "@config";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Configure AWS credentials and SES region
const sesClient = new SESClient({
    region: AWS_S3.region,
    credentials: {
        accessKeyId: AWS_S3.accessKeyId,
        secretAccessKey: AWS_S3.secretAccessKey
    }
});

// Function to send email
export async function sendEmail(recipient, subject, body) {
    const params = {
        Destination: {
            ToAddresses: [recipient]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: SENDER_EMAIL_ID
    };

    try {
        const command = new SendEmailCommand(params);
        const data = await sesClient.send(command);
        console.log('Email sent successfully:', data.MessageId);
    } catch (err) {
        console.error('Error sending email:', err);
    }
}
