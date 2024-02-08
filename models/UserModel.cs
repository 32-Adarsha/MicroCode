using System.ComponentModel.DataAnnotations;

namespace MicroCode.models
{
    public class UserModel {
        [Key]
        [Required]
        public Guid user_id {get ; set;}
        [MaxLength(50)]
        public string first_name {get ; set;}
        [MaxLength(50)]
        public string last_name {get ;set;}
        public Nullable<int> phone_no {get ; set;}
        [MaxLength(50)]
        [Required]
        public string username {get ; set;}
        [MaxLength(50)]
        [Required]
        public string eamil  {get ; set;}
        [Required]
        public string password_hash {get ;set;}
        public DateTime registration_data {get; set;}
    }

}