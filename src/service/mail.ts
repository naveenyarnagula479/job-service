import { sendEmail } from "@helpers/email";
import logger from "@logger";


export async function pendingJobNotification(payload: any, user: any) {
    try {
        payload.html = `
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>
<style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #000;
        }
        .container {
            margin: 20px;
        }
        .status {
            font-weight: bold;
        }
        .subject {
            font-weight: bold;
            margin-top: 20px;
        }
        .content {
            margin-top: 20px;
        }
        .signature {
            margin-top: 40px;
        }
</style>
</head>
<body>
<div class="container">
<p class="status">Status: ${payload.status}</p>
 
        <p class="subject">Subject: ${payload.subject}</p>
 
        <div class="content">
        <p> Dear recruiter </p> 
        <p> I hope this email finds you well </p> 
<p>${payload.description}</p>
 
            <p>Please fill required details<br>
<a href="https://careerpedia.edu.in">https://careerpedia.edu.in</a></p>
</div>
 
        <div class="signature">
<p>Thank you for your understanding.<br>
            Y. Naveen<br>
            Developer <br>
            Careerpedia Edutech Private Limited</p>
</div>
</div>
</body>
</html>`
        const response = await sendEmail(user.email, payload.subject, payload.html);
        logger.info(JSON.stringify(response));
        return;
    } catch (error) {
        logger.error(`ERROR occurred in sendRecruiterNotification() `, error);
        throw error;
    }
}


export async function activeJobNotification(payload: any, user: any, jobDetails: any) {
    try {
        payload.status = 'Active';
        payload.subject = 'Your Job Posting on CareerPedia Has Been Approved!'
        payload.html = `
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>
<style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #000;
        }
        .container {
            margin: 20px;
        }
        .status {
            font-weight: bold;
        }
        .subject {
            font-weight: bold;
            margin-top: 20px;
        }
        .content {
            margin-top: 20px;
        }
        .signature {
            margin-top: 40px;
        }
</style>
</head>
<body>
<div class="container">
<p class="status">Status: </p>
 
        <p class="subject">Subject: ${payload.subject}</p>
 
        <div class="content">
        <p> Dear recruiter </p> 
        <p> I hope this email finds you well </p> 
<p>We are glad to inform you that your job posting on our CareerPedia platform has been approved.

<p>Thank you for providing all the necessary information and meeting our criteria. Your job posting is now live and accessible to potential candidates.</p>

<p>Here are the details of your approved job posting:<br>
- **Job Title:** ${jobDetails.jobTitle}<br>
- **Company:** ${user.companyName}<br>
- **Location:** ${jobDetails.location}<br>
- **Category:** ${jobDetails.categoryName}<br></p>

<p>You can view and manage your job posting through your account on our platform. We encourage you to monitor the responses and engage with the candidates who apply.</p>

<p>If you have any questions or need further assistance, please do not hesitate to contact us</p>
 
            <p>Please go through your job<br>
<a href="https://careerpedia.edu.in">https://careerpedia.edu.in</a></p>
</div>
 
        <div class="signature">
<p>Thank you for choosing CareerPedia to find the best talent for your team..<br>
            Y. Naveen<br>
            Developer <br>
            Careerpedia Edutech Private Limited</p>
</div>
</div>
</body>
</html>`
        const response = await sendEmail(user.email, payload.subject, payload.html);
        logger.info(JSON.stringify(response));
        return;
    } catch (error) {
        logger.error(`ERROR occurred in activeJobNotification() `, error);
        throw error;
    }
}

export async function inActiveJobNotification(payload: any, user: any, jobDetails: any) {
    try {
        payload.status = 'inActive';
        payload.subject = 'Notification of Job Application Deactivation'
        payload.html = `
        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Template</title>
<style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #000;
        }
        .container {
            margin: 20px;
        }
        .status {
            font-weight: bold;
        }
        .subject {
            font-weight: bold;
            margin-top: 20px;
        }
        .content {
            margin-top: 20px;
        }
        .signature {
            margin-top: 40px;
        }
</style>
</head>
<body>
<div class="container">
<p class="status">Status: </p>
 
        <p class="subject">Subject: ${payload.subject}</p>
 
        <div class="content">
        <p> Dear recruiter </p> 
        <p> I hope this email finds you well </p> 
<p>We regret to inform you that your job application on our CareerPedia platform has been deactivated.</p>

<p>This decision was made due to violation of guidelines. We understand that this may be disappointing news, and we apologize for any inconvenience this may cause.</p>

<p> If you realy want this job posting please repost the job with correct information</p>

<p>If you have any questions or need further assistance, please do not hesitate to contact us</p>
 
            <p>Please use below link to post new job<br>
<a href="https://careerpedia.edu.in">https://careerpedia.edu.in</a></p>
</div>
 
        <div class="signature">
<p>Thank you for choosing CareerPedia to find the best talent for your team..<br>
            Y. Naveen<br>
            Developer <br>
            Careerpedia Edutech Private Limited</p>
</div>
</div>
</body>
</html>`
        const response = await sendEmail(user.email, payload.subject, payload.html);
        logger.info(JSON.stringify(response));
        return;
    } catch (error) {
        logger.error(`ERROR occurred in inActiveJobNotification() `, error);
        throw error;
    }
}

