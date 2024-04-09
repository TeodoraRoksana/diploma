using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataBaseLayer
{
    public class ContentCreatorDBContex : DbContext
    {
        public ContentCreatorDBContex(DbContextOptions<ContentCreatorDBContex> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<UsersPasswords> UsersPasswords { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<Tasks_FilterNames> Tasks_FilterNames { get; set; }
        public DbSet<FilterNames> FilterNames { get; set; }
        public DbSet<DailyNotes> DailyNotes { get; set; }
        public DbSet<WeeklyNotes> WeeklyNotes { get; set; }

    }
}
