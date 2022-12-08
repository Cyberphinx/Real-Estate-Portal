using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LogController : BaseApiController
    {
        [HttpGet]
        public void Log()
        {
            ConsoleLog.LogText();
        }
    }
}