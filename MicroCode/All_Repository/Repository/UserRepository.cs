using System.IO.Compression;
using System.Runtime.CompilerServices;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.EntityFrameworkCore;

public class UserRepository:IUserRepository {
    private  MicroCodeContext _context;
    public UserRepository(MicroCodeContext context) {
        _context = context;
    }

    public async Task<PaginatedList<SolvedResponse>> GetSolvedProblems(Guid id , int pageIndex , int pageSize) {
        var programs = await _context.CodeSubmissions
                .Where(p => p.user_id == id)
                .OrderBy(p => p.CompletedDate)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .Join(_context.ProgramModel,
                x => x.Program_id,
                y => y.program_id,
                (x,y) => new SolvedResponse {
                    x = x,
                    y = new SolvedProblemInfo{
                        id = y.program_id,
                        title = y.title,
                        diffulty = y.diffulty,
                        tag = y.tag,
                    }
                })
                .ToListAsync();
        var count = await _context.UserModel.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);
        return new PaginatedList<SolvedResponse>(programs,pageIndex,totalPages);
    }


    
    
}