using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.JobApplication.JobDtos;
using Domain.JobAggregate.Objects;

namespace Application.Extensions
{
    public static class JobMediaExtensions
    {
        public static JobMediaDto MapJobMediaToDto(this JobMedia jobMedia)
        {
            return new JobMediaDto
            {
                Id = jobMedia.Id,
                Index = jobMedia.Index,
                Url = jobMedia.Url,
                Type = jobMedia.Type,
                Caption = jobMedia.Caption,
                IsMain = jobMedia.IsMain,
                JobId = jobMedia.JobId,
            };
        }
    }
}