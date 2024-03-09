using MicroCode.models;
using Microsoft.EntityFrameworkCore;

namespace MicroCode.Data {
public class MicroCodeContext : DbContext
{
    public MicroCodeContext(DbContextOptions<MicroCodeContext> options) : base(options) { }

    public DbSet<UserModel> UserModel { get; set; }
    public DbSet<ProgramModel> ProgramModel { get; set; }
    public DbSet<CodeModel> CodeModels { get; set; }
    public DbSet<ResponseModel> ResponseModels { get; set; }
    
    
}
}