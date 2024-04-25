namespace MicroCode.models
{
    public class ProgramGetModel {
        public string pID { get; set; }
        public string title {get ; set;}
        public string discription {get ;set;}
        public string mainCode {get ; set;}
        public List<string>? input { get; set; }
        public List<string>? output { get; set; }
        public List<string>? tag {get; set; }
        public int memoryLimit {get;set;}
        public int timeLimit {get;set;}

    }

}