namespace MicroCode.models
{
  

    public class HelpModel {
    
        public string name{get; set;}
        public List<ExamProblem> allProblem{ get; set; }
        public int totalScore{get; set;}
        public string accessCode{get; set;}
        public string discription {get; set;}
        public int timeLimit{get; set;}
       

    }

}