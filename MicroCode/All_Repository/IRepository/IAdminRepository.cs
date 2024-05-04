using MicroCode.models;

public interface IAdminRepository
{
    Task<PaginatedList<UserModel>> GetUsers(int pageIndex, int pageSize);
    Task<PaginatedList<ProgramModel>> GetProblems(int pageIndex, int pageSize);

    Task<UserModel> AddUser(UserModel user);

    Task<ProgramModel> AddProblem(ProgramModel problem);

    Task<UserModel> DeleteUser(UserModel user);
    Task<ProgramModel> DeleteProblem(ProgramModel model);

    Task<Boolean> MakePublic(Guid Id);
    Task<Boolean> MakePrivate(Guid Id);
    
   
}