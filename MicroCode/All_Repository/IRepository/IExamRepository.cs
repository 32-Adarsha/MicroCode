using MicroCode.models;

public interface IExamRepository {
    Task<String> addExam(HelpModel Exam , String user_id);
    Task<ExamModel> updateExam(Guid id, ExamModel Exam);
    examGetResponse getExam(string name);
    Task<IEnumerable<examViewModel>> GetAllExamAsync();
    Task<IEnumerable<examViewModel>> getCreatedExam(string userId);
    Task<rtnModel<string>> addStudentToExam(string email, Guid examId);
    Task<List<seeUserExamReport>> getUserExamReport(Guid exam_id);
    Task<UExam> getUsersExam(Guid user_id);
    Task<ExamSubmissionModel> getUserExamQuestionDetail(Guid exam_id, Guid s_id);
}