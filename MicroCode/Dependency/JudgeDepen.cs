using System;
using RestSharp;
using MicroCode.models;
using Microsoft.Net.Http.Headers;
namespace MicroCode.Dependency
{

    public interface ISubmission {
        public string SendPostRequest(SubmissionModel data);
        public string SendGetRequest(string token);
    }

    public class Submission:ISubmission
    {
        private string _token;
        public Submission(string token){
            _token = token;
        }
        public string SendPostRequest(SubmissionModel data)
        {
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*");
            var request = new RestRequest(Method.Post.ToString());
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

            request.AddJsonBody(data);

            RestResponse response = client.Execute(request);

            if (response.IsSuccessful)
            {
                return response.Content;
            }
            else
            {
                return null;
            }
        }
         public string SendGetRequest(string token)
        {
            string url = "https://judge0-ce.p.rapidapi.com/submissions/" + token + "?base64_encoded=true&fields=*";
            var client = new RestClient(url);
            var request = new RestRequest(Method.Get.ToString());
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

          

            RestResponse response = client.Execute(request);

            if (response.IsSuccessful)
            {
                return response.Content;
            }
            else
            {
                return null;
            }
        }
    }
}
 
