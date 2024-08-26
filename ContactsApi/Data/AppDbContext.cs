using Microsoft.EntityFrameworkCore;
using ContactsApi.Models;

namespace ContactsApi.Data
{
    /// <summary>
    /// Represents the session with the database, allowing for querying and saving instances of entities.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Represents the Users table in the database.
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Represents the Contacts table in the database.
        /// </summary>
        public DbSet<Contact> Contacts { get; set; }

        /// <summary>
        /// Configures the context to use the provided options.
        /// </summary>
        /// <param name="options">The options to be used by the context.</param>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// Configures the entity relationships and constraints.
        /// </summary>
        /// <param name="modelBuilder">The builder used to construct the model for the database.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configures a one-to-many relationship between User and Contacts
            modelBuilder.Entity<User>()
                .HasMany(u => u.Contacts)
                .WithOne()
                .HasForeignKey(c => c.UserId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
