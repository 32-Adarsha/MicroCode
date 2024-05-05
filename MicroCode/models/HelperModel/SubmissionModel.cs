using Microsoft.AspNetCore.SignalR.Protocol;

namespace MicroCode.models
{
    public class SubmissionModel {
        public string problem_id { get; set; }
        public string language {get ; set;}
        public string source_code {get ;set;}
        public bool solved {get; set;}

    }

    public class ExecuteModelHelper {
        public string language_id { get; set; }
        public string stdin {get; set; }
        public string expected_output {get; set; }
        public string source_code {get; set; }
    }

}