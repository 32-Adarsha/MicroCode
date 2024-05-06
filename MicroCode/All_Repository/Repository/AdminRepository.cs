using System.Runtime.CompilerServices;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class AdminRepository : IAdminRepository
{
    private readonly MicroCodeContext _context;

    public AdminRepository(MicroCodeContext context){
        _context = context;
    }

    public async Task<PaginatedList<aUserModel>> GetUsers(int pageIndex, int pageSize){
        var users = await _context.UserModel
                .OrderBy(b => b.username)
                .Select(b => new aUserModel { 
                    name = b.username,
                    email = b.email,
                    id = b.user_id.ToString(),
                })
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        var count = await _context.UserModel.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<aUserModel>(users,pageIndex,totalPages);

    }

    public async Task<PaginatedList<aProblemModel>> GetProblems(int pageIndex, int pageSize){
        var problems = await _context.ProgramModel
                .OrderBy(b => b.title)
                .Select( b => new aProblemModel {
                    name = b.title,
                    owner = _context.UserModel.Where(c => c.user_id == b.user_id).Select(d => d.email).FirstOrDefault(),
                    id = b.program_id.ToString(),
                })
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        var count = await _context.UserModel.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<aProblemModel>(problems,pageIndex,totalPages);
    }

    public async Task<aProblemModel> GetProblemsForSide(Guid id){
        var problem = await _context.ProgramModel
                .Where(b => b.program_id == id)
                .Select(b => new aProblemModel
                {
                    name = b.title,
                    owner = _context.UserModel.Where(c => c.user_id == b.user_id).Select(d => d.email).FirstOrDefault(),
                    id = b.program_id.ToString(),
                }).FirstOrDefaultAsync();

        return problem;
    }

    public async Task<ProgramModel> GetProblemById(Guid id)
{
    var problem = await _context.ProgramModel
        .Include(p => p.CodeModel)
        .FirstOrDefaultAsync(p => p.program_id == id);
    return problem;
   
}
    public async Task<UserModel> AddUser(UserModel user){
        _context.UserModel.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }
    public async Task<UserModel> getUser(Guid id){
       return  await _context.UserModel.FirstOrDefaultAsync(x => x.user_id == id);
    }
    public async Task<ProgramModel> AddProblem(ProgramModel problem){
        _context.ProgramModel.Add(problem);
        await _context.SaveChangesAsync();
        return problem;
    }

    public async Task<UserModel> DeleteUser(UserModel user){
        _context.UserModel.Remove(user);
        await _context.SaveChangesAsync();
        return user;
    }
    public async Task<ProgramModel> DeleteProblem(ProgramModel problem){
        _context.ProgramModel.Remove(problem);
        await _context.SaveChangesAsync();
        return problem;
    }

    public async Task<Boolean> MakePublic(Guid Id){
        var problem = _context.ProgramModel.FirstOrDefault(p => p.program_id == Id);
        problem.isPublic = true;
        return true;

    }
    public async Task<Boolean> MakePrivate(Guid Id){
        var problem = _context.ProgramModel.FirstOrDefault(p => p.program_id == Id);
        problem.isPublic = false;
        return true;
    }
     public async Task<ExamModel> GetExamById(Guid examId){
        var exam = await _context.ExamModel.FirstOrDefaultAsync(x => x.examId == examId);
        return exam;
    }
}