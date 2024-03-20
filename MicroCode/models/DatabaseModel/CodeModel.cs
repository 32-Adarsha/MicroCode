using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        public Guid program_id {get; set;}
        public string mainCode {get ; set;}
        public string callerFunction {get ; set;}
        public string input {get; set;}
        public string output {get; set;}

        [ForeignKey(nameof(program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
        
    }

}