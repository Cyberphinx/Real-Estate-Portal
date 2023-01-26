using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.MediaApplication;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IMediaAccessor
    {
        // these method are purely for uploading and deleting media from Cloudinary, they have nothing to do with the database
        Task<MediaUploadResult> AddMedia(IFormFile file);
        Task<string> DeleteMedia(string publicId);
    }
}