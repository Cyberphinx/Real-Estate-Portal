using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.AppUserAggregate.Enums;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Client;
using sib_api_v3_sdk.Model;

namespace Infrastructure.Crm
{
    public class ContactsService
    {
        private readonly IConfiguration _config;

        public ContactsService(IConfiguration config)
        {
            _config = config;
        }

        public async System.Threading.Tasks.Task<string> GetContactsAsync()
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendinBlue:Key"]);
            }

            var contactsApiInstance = new ContactsApi();

            long? limit = 10;
            long? offset = 5;
            string modifiedSince = "2023-01-01T10:30:10.970+05:30";

            // await contactsApiInstance.GetContactsAsync(limit, offset, modifiedSince);

            var contacts = await contactsApiInstance.GetContactsAsync(limit, offset, modifiedSince);

            return contacts.ToJson();
        }

        public async System.Threading.Tasks.Task<string> GetContactInfoAsync(string email)
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendinBlue:Key"]);
            }

            var contactsApiInstance = new ContactsApi();

            var contacts = await contactsApiInstance.GetContactInfoAsync(email);

            return contacts.ToJson();
        }
    }
}