using MicroCode.models;

public interface IExamSubmission {
    Task<ExamSubmissionModel> addExamSubmission(Guid userId , submitExamFromUser e);
   

    

    
}