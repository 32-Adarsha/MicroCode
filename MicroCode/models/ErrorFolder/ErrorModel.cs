namespace MicroCode.models
{
    public class ErrCode {
        public bool HasError  {get;set;}
        public string ErrorMessage {get;set;}
    }
    
    
    public class ErrorModel {
        public ErrCode first_name {get ; set;}
        public ErrCode last_name {get ;set;}
        public ErrCode phone_no {get ; set;}
        public ErrCode username {get ; set;}
        public ErrCode email  {get ; set;}
        public ErrCode password {get ;set;}
    }

}