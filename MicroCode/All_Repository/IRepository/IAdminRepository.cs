using MicroCode.models;

public interface IAdminRepository
{
    Task<PaginatedList<aUserModel>> GetUsers(int pageIndex, int pageSize);
    Task<PaginatedList<aProblemModel>> GetProblems(int pageIndex, int pageSize);

    Task<UserModel> AddUser(UserModel user);

    Task<ProgramModel> AddProblem(ProgramModel problem);

    Task<UserModel> DeleteUser(UserModel user);
    Task<ProgramModel> DeleteProblem(ProgramModel model);
    Task<ProgramModel> GetProblemById(Guid id);
    Task<Boolean> MakePublic(Guid Id);
    Task<Boolean> MakePrivate(Guid Id);
    Task<UserModel> getUser(Guid id);
    Task<ExamModel> GetExamById(Guid examId);
    Task<aProblemModel> GetProblemsForSide(Guid problemID);
    
   
}