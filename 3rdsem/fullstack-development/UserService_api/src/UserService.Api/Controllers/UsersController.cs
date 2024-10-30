using Microsoft.AspNetCore.Mvc;
using Service.DtoModels;
using Service.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UserService.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserProfileService _userService;
        public UsersController(IUserProfileService userService)
        {
            _userService = userService;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public List<DtoUserprofile> Get()
        {
            return _userService.GetAllUsers();
            //return new string[] { "value1", "value2" };
        }

        // GET api/<UsersController>/5
        [HttpPost]
        public DtoUserprofile Getuser(string emailid,string pwd)
        {
            return _userService.GetAllUser(emailid, pwd);
        }

        // POST api/<UsersController>
        [HttpPost]
        public void Adduser([FromBody] DtoUserprofile userdetails)
        {
            _userService.AddUserdetails(userdetails);
        }

       
    }
}
