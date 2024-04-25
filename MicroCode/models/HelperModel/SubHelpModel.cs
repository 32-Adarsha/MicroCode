namespace MicroCode.models
{

    
    
    public class SubHelpModel {
    
        public Guid examId{get; set;}
        public List<SubmissionProblem>? trackProblem{ get; set; }
        public DateTime CompletedDate {get; set;}

    }

}