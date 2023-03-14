using System;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.MediaApplication;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Media
{
    public class MediaAccessor : IMediaAccessor
    {
        private readonly Cloudinary _cloudinary;
        public MediaAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<MediaUploadResult> AddMedia(IFormFile file)
        {
            if (file.Length > 0)
            {
                // store content of the file in memory, that's why we have "using" statement here
                // so once we finish this statement, the stream of data is going to be disposed automatically
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(1080).Width(1920).Crop("limit")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new Exception(uploadResult.Error.Message);
                }

                return new MediaUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        public async Task<string> DeleteMedia(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}