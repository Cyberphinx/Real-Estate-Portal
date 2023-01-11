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

namespace Infrastructure.Crm
{
    public class AttributesService
    {
        private readonly IConfiguration _config;

        public AttributesService(IConfiguration config)
        {
            _config = config;
        }

        public async System.Threading.Tasks.Task<string> GetAttributesAsync()
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendinBlue:Key"]);
            }

            // instantiate the API
            var contactsApiInstance = new ContactsApi();

            // api calls
            var result = await contactsApiInstance.GetAttributesAsync();

            return result.ToJson();
        }

        public async System.Threading.Tasks.Task CreateAttributeAsync(string attributeCategory, string attributeName)
        {
            if (!Configuration.Default.ApiKey.ContainsKey("api-key"))
            {
                Configuration.Default.ApiKey.Add("api-key", _config["SendinBlue:Key"]);
            }

            // instantiate the API
            var contactsApiInstance = new ContactsApi();

            string value = null;

            CreateAttribute.TypeEnum? type = CreateAttribute.TypeEnum.Text;

            var createAttribute = new CreateAttribute
            {
                Value = value,
                Type = type
            };

            // api calls
            await contactsApiInstance.CreateAttributeAsync(attributeCategory, attributeName, createAttribute);
        }
    }
}