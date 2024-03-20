namespace MicroCode.models
{
    public class SubmissionModel {
        public int language_id {get ; set;}
        public string source_code {get ;set;}
        public string stdin {get ; set;}
        public string expected_output {get ; set;}

    }
    public class BigSubmissionModel {
        public string program_id { get; set;} 
        public SubmissionModel sModel { get; set;}
    }

}