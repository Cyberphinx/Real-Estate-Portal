using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var repsonse = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error");
                
                // temp modification for showing Stack Trace in production
                // var repsonse = _env.IsDevelopment()
                //     ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                //     : new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString());
                
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(repsonse, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}