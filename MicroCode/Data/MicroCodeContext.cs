using System.Runtime.CompilerServices;
using MicroCode.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace MicroCode.Data {



public class MicroCodeContext : DbContext
{
    public MicroCodeContext(DbContextOptions<MicroCodeContext> options) : base(options) { }

    public DbSet<UserModel> UserModel { get; set; }
    public DbSet<ProgramModel> ProgramModel { get; set; }
    public DbSet<CodeModel> CodeModels { get; set; }
    public DbSet<CodeSubmission> CodeSubmissions { get; set; }
    public DbSet<ExamModel> ExamModel { get; set; }
    public DbSet<ExamSubmissionModel> ExamSubmissionModel { get; set; }
    public DbSet<UserExamModel> UserExamModels { get; set;}

    
    public List<ExamProblem> ConversionFunction (String x){
            List<ExamProblem> examProblems = new List<ExamProblem> ();
            string[] y = x.Split(',', StringSplitOptions.RemoveEmptyEntries);
            foreach (string y2 in y){
                string[] pair = y2.Split(':');
                examProblems.Add(new ExamProblem
                {
                    problemId = pair[0],
                    score = float.Parse(pair[1])
                });

            }
            return examProblems;
    }
    public List<SubmissionProblem> ConversionFunction2 (String x){
            List<SubmissionProblem> examProblems = new List<SubmissionProblem> ();
            string[] y = x.Split(',', StringSplitOptions.RemoveEmptyEntries);
            foreach (string y2 in y){
                string[] pair = y2.Split(':');
                examProblems.Add(new SubmissionProblem
                {
                    problemId = pair[0],
                    score = float.Parse(pair[1]),
                    judgeId = pair[2]
                });

            }
            return examProblems;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<UserModel>()
            .Property(x => x.roles)
            .HasConversion(
                x => string.Join(",", x),
                x => x.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
            );
            modelBuilder.Entity<ProgramModel>()
            .Property(x => x.tag)
            .HasConversion(
                x => string.Join(",", x),
                x => x.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()
            );

            modelBuilder.Entity<ExamModel>()
                .Property(x => x.allProblems)
                .HasConversion(
                    x => string.Join(",", x.Select(problem => $"{problem.problemId}:{problem.score}")),
                    x => ConversionFunction(x)
                );
            modelBuilder.Entity<ExamSubmissionModel>()
                .Property(x => x.trackProblem)
                .HasConversion(
                x => string.Join(",", x.Select(problem => $"{problem.problemId}:{problem.score}:{problem.judgeId}")),
                x => ConversionFunction2(x)
                );
                
        }
    
    
}
}