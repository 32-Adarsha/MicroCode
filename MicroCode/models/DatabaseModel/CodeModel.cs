using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        public Guid program_id {get; set;}
        public string mainCode {get ; set;}
        public List<string>? input {get; set;}
        public List<string>? output { get; set;}
        public int timeLimit {get;set;}
        public int memoryLimit {get; set;}

        [ForeignKey(nameof(program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
        
    }

}