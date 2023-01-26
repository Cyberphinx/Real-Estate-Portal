using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppUserAggregate.Enums;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
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

        public async System.Threading.Tasks.Task SendEmailAsync(EmailDto email)
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendinBlue:Key"]);
            }

            var emailsApiInstance = new TransactionalEmailsApi();
            var contactsApiInstance = new ContactsApi();
            // var attributesApiInstance = new AttributesApi();

            // send email
            var sendSmtpEmail = new SendSmtpEmail
            {
                Sender = new SendSmtpEmailSender
                {
                    Name = _config["SendinBlue:User"],
                    Email = "info@sanctum.co.uk"
                },
                To = new List<SendSmtpEmailTo>()
                {
                    new SendSmtpEmailTo(email.RecipientEmail, email.RecipientName)
                },
                HtmlContent = email.Body,
                Subject = email.Subject,
                ReplyTo = new SendSmtpEmailReplyTo("info@sanctum.co.uk", _config["SendinBlue:User"]),
                Tags = new List<string>()
                {
                    "EmailVerification"
                }
            };

            JObject attributes = new JObject();
            attributes.Add("USERNAME", email.RecipientName);
            attributes.Add("SMS", email.RecipientPhone);

            List<long?> listIds = new List<long?>();
            switch (email.AccountType)
            {
                case AccountType.Customer:
                    listIds.Add(3);
                    break;
                case AccountType.Agent:
                    listIds.Add(4);
                    break;
                case AccountType.Company:
                    listIds.Add(5);
                    break;
                default:
                    listIds.Add(3);
                    break;
            }

            var createContact = new CreateContact
            {
                Email = email.RecipientEmail,
                Attributes = attributes,
                EmailBlacklisted = false,
                SmsBlacklisted = false,
                ListIds = listIds,
                UpdateEnabled = true
            };
            await contactsApiInstance.CreateContactAsync(createContact);


            // api calls
            await emailsApiInstance.SendTransacEmailAsync(sendSmtpEmail);
        }
    }
}