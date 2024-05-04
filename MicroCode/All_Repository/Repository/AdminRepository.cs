using System.Runtime.CompilerServices;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.EntityFrameworkCore;

public class AdminRepository : IAdminRepository
{
    private readonly MicroCodeContext _context;

    public AdminRepository(MicroCodeContext context){
        _context = context;
    }

    public async Task<PaginatedList<UserModel>> GetUsers(int pageIndex, int pageSize){
        var users = await _context.UserModel
                .OrderBy(b => b.username)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        var count = await _context.UserModel.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<UserModel>(users,pageIndex,totalPages);

    }

    public async Task<PaginatedList<ProgramModel>> GetProblems(int pageIndex, int pageSize){
        var problems = await _context.ProgramModel
                .OrderBy(b => b.title)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        var count = await _context.UserModel.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<ProgramModel>(problems,pageIndex,totalPages);
    }

    public async Task<UserModel> AddUser(UserModel user){
        _context.UserModel.Add(user);
        await _context.SaveChangesAsync();
        return user;
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

}