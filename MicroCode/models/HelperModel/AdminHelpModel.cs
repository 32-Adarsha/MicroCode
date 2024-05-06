namespace MicroCode.models
{
    public class aUserModel {
        public string name { get; set; }
        public string email { get; set; }
        public string id { get; set; }
    }

    public class aExamModel {
        public string name { get; set; }
        public string owner { get; set; }
        public string id { get; set; }
        
    }
    public class aProblemModel {
        public string name { get; set; }
        public string owner { get; set; }
        public string id { get; set; }
    }


    public class aProblemDrawer {
        public CodeModel cModel { get; set; }
        public ProgramModel pModel { get; set; }
    }

    public class UserSolvedResponse
{
    public Guid CodeSubId { get; set; }
    public Guid problemId { get; set; }
    public string code { get; set; }
    public bool Solved { get; set; }
    public string Title { get; set; }
    public string language { get; set; }
    public List<String> Tag { get; set; }
}

 public class ExamProblemDetail
{
    public Guid problemId { get; set; }
    public string hidden_testcase { get; set; }
    public string public_testcase { get; set; }
    public string description { get; set; }
    public List<String> Tag { get; set; }
}


    public class UserExamT  {
        public string examId {get; set;}
        public bool taken {get; set;}
        public int maxScore { get; set;}

        public string name {get; set;}
        public int totaScore {get; set;}
        public int timeLimit {get; set;}
        public string discription {get; set;}
        public string owner {get ;set;}

    }

    public class UExam {
        public List<UserExamT> taken { get; set; }
        public List<UserExamT> nTaken { get; set; }
    }
    
    public class seeUserExamReport {
        public bool taken { get; set; }
        public string user {get; set;}
        public string email {get; set;}
        public int totalScore {get; set;}
        public int atmCount {get; set;}
        public string id {get; set;}
    }



}