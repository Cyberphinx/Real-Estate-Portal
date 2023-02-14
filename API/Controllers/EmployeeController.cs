using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.EmployeeApplication;
using Domain.EmployeeAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace API.Controllers
{
    public class EmployeeController : BaseApiController
    {
        private readonly DataContext _db;

        public EmployeeController(DataContext db)
        {
            _db = db;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployee(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [Authorize(Roles = "Admin, Agency, Company")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Employee = employee}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditEmployee(Guid id, Employee employee)
        {
            employee.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Employee = employee}));
        }
        
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}