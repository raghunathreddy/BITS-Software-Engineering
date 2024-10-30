using Service.DtoModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUserProfileService
    {
        public DtoUserprofile GetAllUser(string emailid, string pwd);
        public List<DtoUserprofile> GetAllUsers();

        void AddUserdetails(DtoUserprofile userdetails);
    }
}
