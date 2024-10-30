using AutoMapper;
using Service.DtoModels;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        public List<DtoUserprofile> GetAllUsers()
        {
            var result = _userReposiroty.GetAllUsers().Result;
            return _mapper.Map<List<DtoUserprofile>>(result);
        }
    }
}
