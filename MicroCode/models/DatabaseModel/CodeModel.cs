using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        public Guid Program_id {get; set;}
        public string mainCode {get ; set;}
        public string template {get ; set;}
        public string input {get; set;}
        public string output {get; set;}

        [ForeignKey(nameof(Program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
        public bool verified {get ;set;}
        
    }

}