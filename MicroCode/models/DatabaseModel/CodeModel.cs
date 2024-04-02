using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        public Guid program_id {get; set;}
        public string mainCode {get ; set;}
        public string hidden_input {get; set;}
        public string public_input { get; set; }
        public string hidden_output {get; set;}
        public string public_output { get; set; }

        [ForeignKey(nameof(program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
        
    }

}