using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;

namespace MicroCode.models
{
    
    public class ResponseModel {


        [Key]
        [Required]
        public Guid ResponseID {get ; set;}
        public string UserCode {get ; set;}
        public string customInput { get; set; }
        public bool verified {get ;set;}
        public DateTime submission_data {get; set;}
        public Nullable<Guid> user_id {get ;set;}
        public string language { get; set; }
        
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}

        public Nullable<Guid> Program_id { get; set; }
        [ForeignKey(nameof(Program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
    }

}