using Amazon.S3;
using Amazon.S3.Model;
using Amazon;
using Microsoft.Extensions.Options;
using GD.Common;

namespace GD.Services
{
    public interface IMinioService
    {
        Task<string> UploadFileAsync(IFormFile file);
        string GetPrivateUrl(string objectKey, int expirationMinutes = 60);
    }

    public class MinioService : IMinioService
    {

        private readonly IAmazonS3 _s3Client;
        private readonly MinioSettings _settings;

        public MinioService(IOptions<MinioSettings> options)
        {
            _settings = options.Value;

            var config = new AmazonS3Config
            {
                ServiceURL = _settings.Endpoint,
                ForcePathStyle = true
            };

            _s3Client = new AmazonS3Client(_settings.AccessKey, _settings.SecretKey, config);
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            await EnsureBucketExistsAsync();

            using var stream = file.OpenReadStream();

            string objectKey = $"{Guid.NewGuid()}/{file.FileName}"; 

            var putRequest = new PutObjectRequest
            {
                BucketName = _settings.BucketName,
                Key = objectKey,
                InputStream = stream,
                ContentType = file.ContentType
            };

            await _s3Client.PutObjectAsync(putRequest);

            return objectKey;
        }

        public string GetPrivateUrl(string objectKey, int expirationMinutes = 60)
        {
            return _s3Client.GetPreSignedURL(new GetPreSignedUrlRequest
            {
                BucketName = _settings.BucketName,
                Key = objectKey,
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
                Verb = HttpVerb.GET
            });
        }

        private async Task EnsureBucketExistsAsync()
        {
            var bucketExists = await _s3Client.DoesS3BucketExistAsync(_settings.BucketName);
            if (!bucketExists)
            {
                var putBucketRequest = new PutBucketRequest
                {
                    BucketName = _settings.BucketName,
                    UseClientRegion = true
                };

                await _s3Client.PutBucketAsync(putBucketRequest);
            }
        }

    }
}
