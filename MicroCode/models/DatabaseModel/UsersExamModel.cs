using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MicroCode.models
{
    public class UserExamModel {
        [Key]
        public Guid modelId {get; set;}
        public Guid examId {get; set;}
        public bool taken {get; set;}
        public int atmtCount {get; set;}
        public int maxScore { get; set;}
        public Nullable<Guid> user_id {get ;set;}
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}
        
        [ForeignKey(nameof(examId))]
        public virtual ExamModel examModle{get; set;}

    }

}