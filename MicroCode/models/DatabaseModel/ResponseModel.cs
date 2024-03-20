using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;

namespace MicroCode.models
{
    
    public class ResponseModel {


        [Key]
        [Required]
        public string JudgeId { get; set; }
        
        public Nullable<Boolean> completed { get; set; }
        public Nullable<Guid> user_id {get ;set;}
        public DateTime CompletedDate {get; set;}
        public string language { get; set; }
        
        [ForeignKey(nameof(user_id))]
        public virtual UserModel UserModel {get ; set;}

        public Nullable<Guid> Program_id { get; set; }
        [ForeignKey(nameof(Program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
    }

}