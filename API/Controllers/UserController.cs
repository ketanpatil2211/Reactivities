using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{


    [AllowAnonymous] //overwrites the authorization in policy bcz of the lower level
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] Login.Query query)
        {

            return await Mediator.Send(query);
        }

    }
}