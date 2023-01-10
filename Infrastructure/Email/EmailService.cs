using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.Extensions.Configuration;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;

namespace Infrastructure.Email
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmailAsync(EmailDto email)
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendInBlue:Key"]);
            }

            var emailsApiInstance = new TransactionalEmailsApi();
            // var contactsApiInstance = new ContactsApi();

            var sendSmtpEmail = new SendSmtpEmail
            {
                Sender = new SendSmtpEmailSender
                {
                    Name = _config["SendInBlue:User"],
                    Email = "info@sanctum.co.uk"
                },
                To = new List<SendSmtpEmailTo>()
                {
                    new SendSmtpEmailTo(email.RecipientEmail, email.RecipientName)
                },
                HtmlContent = email.Body,
                Subject = email.Subject,
                ReplyTo = new SendSmtpEmailReplyTo("info@sanctum.co.uk", _config["SendInBlue:User"]),
                Tags = new List<string>()
                {
                    "EmailVerification"
                }
            };

            // var createContact = new CreateContact();

            // var contact = new Contact
            // {
            //     Email = appUserEmail,
            // };


            emailsApiInstance.SendTransacEmail(sendSmtpEmail);
        }
    }
}