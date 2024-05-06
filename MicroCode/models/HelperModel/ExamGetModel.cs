
using Microsoft.AspNetCore.Http.HttpResults;

namespace MicroCode.models
{
    
    public class examGetResponse {
        public ExamGetModel? exam { get; set; }
        public Boolean successful {get; set; }
        public string error {get; set; }
    }

    public class examViewModel {
        public string name {get; set; }
        public string id {get; set; }
        public string owner {get; set; }
    }

    
    public class ExamGetModel
    {
        public Guid examId { get; set; }
        public string name { get; set; }
        public int totaScore { get; set; }
        public int timeLimit { get; set; }
        public string discription { get; set; }
        public List<ExamProblem> allProblems { get; set; }

    }
}