using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Repository.SqlQueries
{
        internal static class UserQueries
        {
            internal const string GetAllUsers = "SELECT * FROM Users";
            //internal const string GetByEmail = "SELECT * FROM tblUser WHERE email =@email";
        }
}
