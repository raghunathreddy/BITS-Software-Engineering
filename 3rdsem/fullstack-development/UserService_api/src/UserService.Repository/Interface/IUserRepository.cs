using UserService.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UserService.Repository.Interface
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
       // Task<List<User>> GetUsersByEmail(string email);
       // void AddUserdetails(User usersdetails);
      //  int ActivateUser(User users);
    }
}
