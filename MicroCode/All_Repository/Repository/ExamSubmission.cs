using System.Collections.Immutable;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.EntityFrameworkCore;

public class ExamSubmission : IExamSubmission
{
    private readonly MicroCodeContext _context;
    private readonly ISubmission _submission;
  

    public ExamSubmission(MicroCodeContext context ,ISubmission submission )
    {
        _context = context;
    }


    public async Task<ExamSubmissionModel> addExamSubmission( Guid userId , submitExamFromUser e)
    {
        var newExamSubmission = new ExamSubmissionModel
        {
            eSubmissionId = Guid.NewGuid(),
            user_id = userId,
            examId = e.examId,
            totalScore = e.totalScore,
            trackProblem = e.trackProblem,
            CompletedDate = DateTime.UtcNow,
            UserModel = _context.UserModel.FirstOrDefault(u => u.user_id == userId),
            ExamModel = _context.ExamModel.FirstOrDefault(u => u.examId == e.examId)

        };
        var userEmodel = await _context.UserExamModels.FirstOrDefaultAsync(x => x.user_id == userId && x.examId == e.examId);
        if (userEmodel  != null) { userEmodel.taken = true; };

        await _context.ExamSubmissionModel.AddAsync(newExamSubmission);
        await _context.SaveChangesAsync();
        return newExamSubmission;


    }

    public async Task<ExamSubmissionModel> getExamSubmission(Guid Id){
        var e =  await _context.ExamSubmissionModel.FirstOrDefaultAsync(x => x.eSubmissionId == Id);
        return e;

    }

    public async Task<IEnumerable<ExamSubmissionModel>> getAllExamSubmission(Guid userId){
        var e = await _context.ExamSubmissionModel.Where(x => x.user_id == userId).ToListAsync();
        return e;

    }

    public async Task<IEnumerable<ExamSubmissionModel>> getALLSubmissionForExam(Guid examId){
        var e =  await _context.ExamSubmissionModel.Where(x => x.examId == examId).ToListAsync();
        return e;

    }

    
}