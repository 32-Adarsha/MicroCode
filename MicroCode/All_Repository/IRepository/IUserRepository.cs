using MicroCode.models;



public struct SolvedProblemInfo {
    public Guid id;
    public string title;
    public Diffulty diffulty;
    public List<String>? tag;

}
public struct SolvedResponse {
    public CodeSubmission x;
    public SolvedProblemInfo y;
}

public struct UserStat {
    public int totalSolved;
    public int totalEasy;
    public int totalMedium;
    public int totalHard;
}


public interface IUserRepository {
    Task<PaginatedList<SolvedResponse>> GetSolvedProblems(Guid id ,int pageIndex, int pageSize);
    // Task<UserStat> GetUserStat(Guid id);
}