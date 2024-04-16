using DataBaseLayer;
using Microsoft.EntityFrameworkCore;
using Services.DBServices;
using Services.DBServices.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DiplomaDBContext>(options => options.UseSqlServer(
        builder.Configuration.GetConnectionString("DiplomaDBConnection")));
builder.Services.AddScoped<IUsersDBService, UsersDBService>();
builder.Services.AddScoped<ITasksDBService, TasksDBService>();
builder.Services.AddScoped<ITasks_FilterNamesService, Tasks_FilterNamesService>();
builder.Services.AddScoped<IFilterNamesService, FilterNamesService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
