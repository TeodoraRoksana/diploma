using DataBaseLayer.Models;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseLayer
{
    public class DiplomaDBContext : DbContext
    {
        public DiplomaDBContext(DbContextOptions<DiplomaDBContext> options) : base(options) { }

        public DbSet<Users> Users { get; set; }
        public DbSet<UsersPasswordSalt> UsersPasswordSalt { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<Tasks_FilterNames> Tasks_FilterNames { get; set; }
        public DbSet<FilterNames> FilterNames { get; set; }
        public DbSet<Notes> Notes { get; set; }
        public DbSet<TypeOfNotes> TypeOfNotes { get; set; }

    }
}
