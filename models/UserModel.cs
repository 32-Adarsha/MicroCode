namespace MicroCode.models
{
    public class UserModel {
        public Guid user_id {get ;}
        public string first_name {get ; set;}
        public string last_name {get ;set;}
        public int    phone_no {get ; set;}
        public string username {get ; set;}
        public string eamil  {get ; set;}
        public string password_hash {get ;set;}
        public DateTime registration_data {get;}
    }

}