using System.Net;
namespace Application.Errors
{
using System;

    public class RestException : Exception
    {
        public RestException(HttpStatusCode code,object errors=null)
        {
            Errors = errors;
           Code=code;
        }

        public object Errors { get; }
        public HttpStatusCode Code { get; set; }
    }
}