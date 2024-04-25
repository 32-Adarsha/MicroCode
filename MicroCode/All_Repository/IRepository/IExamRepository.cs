using MicroCode.models;

public interface IExamRepository {
    Task<ExamModel> addExam(ExamModel Exam);
    Task<ExamModel> updateExam(Guid id, ExamModel Exam);
    
    
}