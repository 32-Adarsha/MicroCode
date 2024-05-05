using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace MicroCode.models
{
    public class CodeModel {
        [Key]
        [ForeignKey("ProgramModel")]
        public Guid program_id {get; set;}
        public string mainCode {get ; set;}
        public string hidden_testcase {get; set;}
        public string public_testcase { get; set;}
        public int timeLimit {get;set;}
        public int memoryLimit {get; set;}
        [JsonIgnore]
        public virtual ProgramModel ProgramModel { get; set; }
        
    }

}