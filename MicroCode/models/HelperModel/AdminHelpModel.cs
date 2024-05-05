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


}