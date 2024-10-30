using UserService.Repository.Implementation;
using Service.Implementation;
using Service.Interface;
using UserService.Repository.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<IUserProfileService, UserProfileService>(); ;
builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();
var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
