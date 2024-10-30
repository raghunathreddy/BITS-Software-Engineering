using UserService.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Dapper;
using UserService.Model;
using System.Threading.Tasks;
using System.Runtime.InteropServices;


namespace UserService.Repository.Implementation
{
    public class UserReposiroty : IUserRepository
    {
        private readonly ISqlConnectionFactory _sqlConnectionFactory;
        public UserReposiroty(ISqlConnectionFactory sqlConnectionFactory)
        {
            _sqlConnectionFactory = sqlConnectionFactory;
        }

       

        public async Task<List<User>> GetAllUsers()
        {
            using (IDbConnection connection = _sqlConnectionFactory.GetConnection)
            {
                _sqlConnectionFactory.OpenConnection(connection);
                using (var transaction = _sqlConnectionFactory.BeginTransaction(connection))
                {
                    try
                    {
                        var results = await connection.QueryAsync<User>(SqlQueries.UserQueries.GetAllUsers, transaction: transaction);
                        return results?.AsList();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        throw new InvalidOperationException(ex.Message);
                    }
                }
            }
        }

        //public async Task<List<User>> GetUsersByEmail(string email)
        //{
        //    using (IDbConnection connection = _sqlConnectionFactory.GetConnection)
        //    {
        //        _sqlConnectionFactory.OpenConnection(connection);
        //        using (var transaction = _sqlConnectionFactory.BeginTransaction(connection))
        //        {
        //            try
        //            {
        //                var results = await connection.QueryAsync<User>(SqlQueries.UserQueries.GetByEmail, new { email = email }, transaction: transaction);
        //                return results?.AsList();
        //            }
        //            catch (Exception ex)
        //            {
        //                transaction.Rollback();
        //                throw new InvalidOperationException(ex.Message);
        //            }
        //        }
        //    }
        //}

        //public async void AddUserdetails(User usersdetails)
        //{
        //    using (IDbConnection connection = _sqlConnectionFactory.GetConnection)
        //    {
        //        string insertQuery = @"INSERT INTO tbluser ([Email], [Name], [Mobile], [password], [IsActive], [CreatedDate], [IsMailDelivered], [UserKey]) VALUES (@Email, @Name, @Mobile, @password, @IsActive, @CreatedDate, @IsMailDelivered, @UserKey)";
        //        _sqlConnectionFactory.OpenConnection(connection);
        //        try
        //        {
        //            var results = await connection.ExecuteAsync(insertQuery, new
        //            {
        //                Email = usersdetails.Email,
        //                Name = usersdetails.Name,
        //                Mobile = usersdetails.Mobile,
        //                password = usersdetails.Password,
        //                IsActive = usersdetails.IsActive,
        //                CreatedDate = DateTime.Now,
        //                IsMailDelivered = usersdetails.IsMailDelivered,
        //                UserKey = usersdetails.UserKey
        //            });
        //        }
        //        catch (Exception ex)
        //        {
        //            Console.WriteLine(ex.Message.ToString() + "\n" + ex.InnerException.ToString());
        //            throw new InvalidOperationException(ex.Message);
        //        }
        //    }
        //}

        //public int ActivateUser(User users)
        //{
        //    using (IDbConnection connection = _sqlConnectionFactory.GetConnection)
        //    {
        //        string updateQuery = @"UPDATE tbluser SET IsActive=1 WHERE UserKey=@UserKey AND Email=@Email";
        //        _sqlConnectionFactory.OpenConnection(connection);
        //        try
        //        {
        //            return connection.Execute(updateQuery, new
        //            {
        //                users.UserKey,
        //                users.Email
        //            });
        //        }
        //        catch (Exception ex)
        //        {

        //            throw new InvalidOperationException(ex.Message);
        //        }

        //    }
        //}
    }
}
