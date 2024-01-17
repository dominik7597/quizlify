using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizDatabaseContext:DbContext
    {
        public QuizDatabaseContext(DbContextOptions<QuizDatabaseContext> options):base(options) { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
