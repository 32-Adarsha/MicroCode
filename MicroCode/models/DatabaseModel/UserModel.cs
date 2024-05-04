using System.ComponentModel.DataAnnotations;

namespace MicroCode.models
{
    public class UserModel {

        public UserModel () {
            this.ProgramModels = new HashSet<ProgramModel>();
            this.CodeSubmissions = new HashSet<CodeSubmission>();
            this.ExamSubmissionsModel = new HashSet<ExamSubmissionModel>();
            this.ExamModels = new HashSet<ExamModel>();
        }
        [Key]
        [Required]
        public Guid user_id {get ; set;}
        public List<String>? roles { get; set; }
        [MaxLength(50)]
        public string first_name {get ; set;}
        [MaxLength(50)]
        public string last_name {get ;set;}
        public string phone_no {get ; set;}
        [MaxLength(50)]
        [Required]
        public string username {get ; set;}
        [MaxLength(50)]
        [Required]
        public string email  {get ; set;}
        [Required]
        public string password_hash {get ;set;}
        public DateTime registration_data {get; set;}
        public virtual ICollection<ProgramModel> ProgramModels { get; set; }
        public virtual ICollection<CodeSubmission> CodeSubmissions { get; set; }
        public virtual ICollection<ExamSubmissionModel> ExamSubmissionsModel { get; set; }
        public virtual ICollection<ExamModel> ExamModels {get; set;}
    }

}