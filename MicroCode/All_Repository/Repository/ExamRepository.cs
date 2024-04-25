using MicroCode.Data;
using MicroCode.models;

public class ExamRepository : IExamRepository
{
    private readonly MicroCodeContext _context;
    public ExamRepository(MicroCodeContext context)
    {
        _context = context;
    }

    public async Task<ExamModel> addExam(ExamModel exam){
        await _context.ExamModel.AddAsync(exam);
        return exam;
    }

    public async Task<ExamModel> updateExam(Guid id ,ExamModel exam){
        _context.ExamModel.Update(exam);
        await _context.SaveChangesAsync();
        return exam;
    }


}