using System;
using System.Net;

namespace Application.Errors
{

    public class RestExceptions : Exception
    {
        public readonly HttpStatusCode Code;
        public readonly object Errors;

        public RestExceptions(HttpStatusCode code, object errors = null)
        {
            Code = code;
            Errors = errors;
        }


    }
}
