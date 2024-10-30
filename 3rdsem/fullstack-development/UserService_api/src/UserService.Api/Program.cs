using UserService.Repository.Implementation;
using Service.Implementation;
using Service.Interface;
using UserService.Repository.Interface;
using System;
using AutoMapper;
using Service.Mapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSingleton<SqlConnectionFactory>();
builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();

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


// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
