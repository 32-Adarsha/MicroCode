using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


public struct ExamProblem
{
    public string problemId { get; set; }
    public float score { get; set; }
}

namespace MicroCode.models
{
    public class ExamModel {

        public ExamModel () {
            this.ExamSubmissionModel = new HashSet<ExamSubmissionModel>();
        }

        [Key]
        public Guid examId {get; set;}
        public string name {get; set;}
        public int totaScore {get; set;}
        public int timeLimit {get; set;}
        public string discription {get; set;}
        public List<ExamProblem> allProblems { get; set; }

        public string accessCode {get; set;}
        public Nullable<Guid> user_id {get ;set;}
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}
        public virtual ICollection<ExamSubmissionModel>? ExamSubmissionModel  { get;set; }

    }

}