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

    public async Task<PaginatedList<UserSolvedResponse>> GetSolvedProblems(Guid user_id, int pageNumber, int pageSize)
{
    var allSolvedProblem = await _context.CodeSubmissions
        .Include(s => s.ProgramModel)
        .Where(s => s.user_id == user_id)
        .Select(s => new UserSolvedResponse
        {
            CodeSubId = s.codeSubmissionId,
            Solved = s.solved,
            problemId = (Guid)s.Program_id,
            code = s.code,
            language = s.language,
            Title = s.ProgramModel.title,
            Tag = s.ProgramModel.tag,
        })
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    // You'll need to implement the PaginatedList class or use a library that provides it
    return new PaginatedList<UserSolvedResponse>(allSolvedProblem, pageNumber, pageSize);
}

    
}