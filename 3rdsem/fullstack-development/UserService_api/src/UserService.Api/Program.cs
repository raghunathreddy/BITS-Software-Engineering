using UserService.Repository.Implementation;
using Service.Implementation;
using Service.Interface;
using UserService.Repository.Interface;
using System;
using AutoMapper;
using Service.Mapper;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<SqlConnectionFactory>();
builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mapperconfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MappingProfile());
});
IMapper mapper = mapperconfig.CreateMapper();
builder.Services.AddSingleton(mapper);
//DIJ Repository
builder.Services.AddScoped<IUserRepository, UserReposiroty>();
//Services
builder.Services.AddScoped<IUserProfileService, UserProfileService>();


var app = builder.Build();
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(s => {
           s.SwaggerEndpoint("/swagger/v1/swagger.json", "UserService");
            s.RoutePrefix = string.Empty;
        });
 }


app.UseAuthorization();

//app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
