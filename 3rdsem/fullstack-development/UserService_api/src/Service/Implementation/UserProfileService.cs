using AutoMapper;
using Service.DtoModels;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService.Model;
using UserService.Repository.Implementation;
using UserService.Repository.Interface;

namespace Service.Implementation
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IUserRepository _userReposiroty;
        private readonly IMapper _mapper;
        public UserProfileService(IUserRepository userReposiroty, IMapper mapper)
        {
            _userReposiroty = userReposiroty;
            _mapper = mapper;
            // _emailHelper = emailHelper;
        }

        public void AddUserdetails(DtoUserprofile userdetails)
        {
            var users = _mapper.Map<User>(userdetails);
            _userReposiroty.AddUserdetails(users);
        }

        public DtoUserprofile GetAllUser(string emailid, string pwd)
        {
            var result = _userReposiroty.GetAllUser(emailid, pwd);
            return _mapper.Map<DtoUserprofile>(result);
        }

        public List<DtoUserprofile> GetAllUsers()
        {
            var result = _userReposiroty.GetAllUsers().Result;
            return _mapper.Map<List<DtoUserprofile>>(result);
        }
    }
}
