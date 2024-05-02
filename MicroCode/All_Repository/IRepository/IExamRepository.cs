using MicroCode.models;

public interface IExamRepository {
    Task<String> addExam(HelpModel Exam , String user_id);
    Task<ExamModel> updateExam(Guid id, ExamModel Exam);
    examGetResponse getExam(string name, string accessCode);
    Task<IEnumerable<examViewModel>> GetAllExamAsync();
    Task<IEnumerable<examViewModel>> getCreatedExam(string userId);
    Task<rtnModel<string>> addStudentToExam(string email, Guid examId);
    
    
}