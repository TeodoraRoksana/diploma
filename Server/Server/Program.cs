using DataBaseLayer;
using DataBaseLayer.Models.DTO;
using DataBaseLayer.Models.Mapper;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Services.DBServices;
using Services.DBServices.Interfaces;
using Services.HashService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DiplomaDBContext>(options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("DiplomaDBConnection")));

builder.Services.AddCors(options => options.AddPolicy(name: "DiplomaOrigins",
    policy =>
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));

builder.Services.AddScoped<IUsersDBService, UsersDBService>();
builder.Services.AddScoped<ITasksDBService, TasksDBService>();
builder.Services.AddScoped<ITasks_FilterNamesService, Tasks_FilterNamesService>();
builder.Services.AddScoped<IFilterNamesService, FilterNamesService>();
builder.Services.AddScoped<IHashService, HashService>();
builder.Services.AddScoped<IMapper<Users, RegistrationDTO>, UserRegistrationMapper>();
builder.Services.AddScoped<IUsersPasswordSaltDBService, UsersPasswordSaltDBService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("DiplomaOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
