using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.MessageApplication;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        public readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendMessage(Create.Command command)
        {
            // create and save the message into the database
            var message = await _mediator.Send(command);

            // and then send it to connected clients
            await Clients.Group(command.JobId.ToString())
                .SendAsync("ReceiveMessage", message.Value);
        }

        public override async Task OnConnectedAsync()
        {
            // whenever a user connects, we join them to the group based on the JobId
            var httpContext = Context.GetHttpContext();
            var jobId = httpContext.Request.Query["jobId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, jobId);

            // and then we send them a list of comments that we get from our database
            var result = await _mediator.Send(new List.Query{JobId = Guid.Parse(jobId)});
            await Clients.Caller.SendAsync("LoadMessages", result.Value);
        }
    }
}