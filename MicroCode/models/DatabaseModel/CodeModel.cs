using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        public Guid program_id {get; set;}
        public string mainCode {get ; set;}
        public string hidden_testcase {get; set;}
        public string public_testcase { get; set; }
        
        public int max_time{get;set;}
        public int max_memory{get; set;}

        [ForeignKey(nameof(program_id))]
        public virtual ProgramModel ProgramModel { get; set; }
        
    }

}