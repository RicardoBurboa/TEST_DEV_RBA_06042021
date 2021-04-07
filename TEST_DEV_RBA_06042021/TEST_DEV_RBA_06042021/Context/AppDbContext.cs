using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TEST_DEV_RBA_06042021.Models;

namespace TEST_DEV_RBA_06042021.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }
        public DbSet<PersonasFisicas> Tb_PersonasFisicas { get; set; }
        public DbSet<Usuarios> usuarios { get; set; }
    }
}
