using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Infrastructure.Crm;
using Infrastructure.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class CrmController : BaseApiController
    {
        private readonly DataContext _db;
        private readonly ContactsService _contactsService;
        private readonly EmailService _emailService;
        private readonly AttributesService _attributesService;

        public CrmController(DataContext db, ContactsService contactsService, EmailService emailService, AttributesService attributesService)
        {
            _attributesService = attributesService;
            _contactsService = contactsService;
            _emailService = emailService;
            _db = db;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("contacts")]
        public async Task<IActionResult> GetContacts()
        {
            string result = await _contactsService.GetContactsAsync();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("contact")]
        public async Task<IActionResult> GetContactInfo(string email)
        {
            string result = await _contactsService.GetContactInfoAsync(email);
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("attributes")]
        public async Task<IActionResult> GetAttributes()
        {
            string result = await _attributesService.GetAttributesAsync();
            return Ok(result);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("attribute")]
        public async Task<IActionResult> CreateAttribute(string category, string name)
        {
            await _attributesService.CreateAttributeAsync(category, name);
            return Ok("Attribute created successfully");
        }

        // method just to test if SendinBlue works
        [AllowAnonymous]
        [HttpPost("testSendinBlue")]
        public async Task<IActionResult> TestSendinBlue()
        {
            var newEmail = new EmailDto
            {
                RecipientName = "Test Recipient",
                RecipientEmail = "[INPUT TEST EMAIL]",
                Subject = "The Vampire Lestat",
                Body = "The story is told from the point of view of the vampire Lestat de Lioncourt as narrator, while Interview is narrated by Louis de Pointe du Lac"
            };

            await _emailService.SendEmailAsync(newEmail);
            return Ok();
        }
        
    }
}