using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public enum Diffulty {
        Easy,
        Medium,
        Hard
    };

    public class ProgramModel {

        public ProgramModel () {
            this.ResponseModels = new HashSet<ResponseModel>();
        }
        [Key]
        [Required]
        public Guid program_id {get ; set;}
        [MaxLength(50)]
        public string title {get ; set;}
        [Column(TypeName="text")]
        public string discription {get ;set;}
        public Diffulty diffulty { get; set; }
        public Nullable<Guid> judgeId{ get; set; }
        public bool verified {get ;set;}
        public bool isPublic {get;set;}
        public bool flagged { get; set; }
        public DateTime registration_data {get; set;}
        public Nullable<Guid> user_id {get ;set;}
        public virtual CodeModel CodeModel { get; set; }
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}
        public virtual ICollection<ResponseModel> ResponseModels { get; set; }

        public string hasError { get; set;}
        public string errorMessage { get; set; }

         
    }

}