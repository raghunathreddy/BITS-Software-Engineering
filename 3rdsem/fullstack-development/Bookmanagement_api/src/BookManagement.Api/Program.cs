using BookManagement.Repository.Implementation;
using BookManagement.Service.Implementation;
using BookManagement.Service.Interface;
using BookManagement.Repository.Interface;
using System;
using AutoMapper;
using BookManagement.Service.Mapper;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add BookManagement.Services to the container.

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
builder.Services.AddScoped<IBookRepository, BookRepository>();
//BookManagement.Services
builder.Services.AddScoped<IBookService, BookService>();


var app = builder.Build();
if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(s => {
           s.SwaggerEndpoint("/swagger/v1/swagger.json", "UserBookManagement.Service");
            s.RoutePrefix = string.Empty;
        });
 }


app.UseAuthorization();

//app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();