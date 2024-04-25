using MicroCode.models;

public interface IExamSubmission {
    Task<ExamSubmissionModel> addExamSubmission(SubHelpModel Exam , String id);

    Task<ExamSubmissionModel> getExamSubmission(Guid Id);
}