using System.Net.Mail;
using System.Net;
using CallFlowUI.Interface;

namespace CallFlowUI.Service
{
    public class EmailSenderService : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject)
        {
            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("tinnguyen2682k1@gmail.com", "kdwivnjybwhtguqx")
            };

            string body = @"
            <html>
            <body>
                <h1>Your Project CallFlow is ready</h1>
                <p>
                    Dear User,
                    <br /><br />
                    We are pleased to inform you that your Project CallFlow is now ready for you to explore.
                    <br /><br />
                    Click the button below to check it out:
                </p>
                <p style=""text-align: center;"">
                    <a href=""https://localhost:44421/home/project"" style=""padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;"">Check it out</a>
                </p>
                <p>
                    Best regards,<br />
                    Your Project Team
                </p>
            </body>
            </html>
        ";

            MailMessage message = new MailMessage(from: "tinnguyen2682k1@gmail.com",
                                to: email,
                                subject,
                                body);

            message.IsBodyHtml = true;


            return client.SendMailAsync(message);
        }
    }
}
