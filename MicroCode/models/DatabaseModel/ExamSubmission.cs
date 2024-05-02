using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public struct SubmissionProblem {
        public string problemId;
        public string judgeId;
        public float score;
    }

namespace MicroCode.models
{

    
    public class ExamSubmissionModel {
        [Key]
        [Required]
        public Guid eSubmissionId { get; set; }
        public Nullable<Guid> user_id {get ;set;}
        public Guid examId{get; set;}
        public int totalScore { get; set; }
        public List<SubmissionProblem>? trackProblem{ get; set; }
        public DateTime CompletedDate {get; set;}
        
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}

        [ForeignKey(nameof(examId))]
        public virtual ExamModel ExamModel{ get; set; }

    }



    public class submitExamFromUser {
        public Guid examId{get; set;}
        public int totalScore { get; set; }
        public List<SubmissionProblem>? trackProblem{ get; set; }
    }

}