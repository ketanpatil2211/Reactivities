using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class UserController : BaseController
    {
        [AllowAnonymous] //overwrites the authorization in policy bcz of the lower level
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] Login.Query query)
        {

            return await Mediator.Send(query);
        }

        [AllowAnonymous] //overwrites the authorization in policy bcz of the lower level
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] Register.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }
    }
}