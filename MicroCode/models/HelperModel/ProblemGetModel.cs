namespace MicroCode.models
{
    public class ProgramGetModel {
        public string pID { get; set; }
        public string title {get ; set;}
        public string discription {get ;set;}
        public string mainCode {get ; set;}
        public string hidden_testcase { get; set; }
        public string public_testcase { get; set; }
        public int max_memory {get;set;}
        public int max_time {get;set;}

    }

}