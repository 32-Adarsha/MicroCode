// using MicroCode.Data;
// using MicroCode.models;

// public class ExamSubmission : IExamSubmission
// {
//     private readonly MicroCodeContext _context;
  

//     public ExamSubmission(MicroCodeContext context)
//     {
//         _context = context;
//     }

//     public async Task<ExamSubmissionModel> addExamSubmission(SubHelpModel sub , String id){
        
        
//         await _context.ExamSubmissionModel.AddAsync();
//         await _context.SaveChangesAsync();
//         return sub;
//     }

//     public async Task<ExamSubmissionModel> getExamSubmission(Guid Id){
//         return _context.ExamSubmissionModel.FirstOrDefault(x => x.eSubmissionId == Id);
//     }


// }