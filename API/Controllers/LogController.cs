using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LogController : BaseApiController
    {
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public void Log() => ConsoleLog.LogText();
    }
}