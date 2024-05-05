using System;
using RestSharp;
using MicroCode.models;
using Microsoft.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
namespace MicroCode.Dependency
{

    public interface ISubmission {
        public string SendPostRequest(ExecuteModelHelper data);
        public string SendGetRequest(string token);
        public string SendCustomGetRequest(string token, string fields);
        public string SendBatchRequest (List<SubmissionModel> data);
    }

    public class Submission:ISubmission
    {
        private string _token;
        public Submission(string token){
            _token = token;
        }
        public string SendPostRequest(ExecuteModelHelper data)
        {
            var client = new RestClient("http://172.17.0.1:2358");
            var request = new RestRequest("submissions?base64_encoded=false&fields=*");
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");

            request.AddJsonBody(data);

            var response = client.Post<TokenResponse>(request);

            return response.Token;
        }

        

         public string SendGetRequest(string token)
        {
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("http://172.17.0.1:2358/submissions/");
            var request = new RestRequest(url);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            

          

            RestResponse response = client.Get(request);

            return response.Content.ToString();
        }


        public string SendCustomGetRequest(string token , string fields){
            
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("http://172.17.0.1:2358/submissions/");
            var request = new RestRequest(url);
            request.AddQueryParameter("fields", fields);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            RestResponse response = client.Get(request);
            return response.Content.ToString();


        }


        public string SendBatchRequest(List<SubmissionModel> data){
            var client = new RestClient("http://172.17.0.1:2358");
            var request = new RestRequest("submissions/batch?base64_encoded=false&fields=*");
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            

            request.AddJsonBody(data);

            var response = client.Post<TokenResponse>(request);

            return response.Token;
        }

        public string GetBatchRequest(List<String> tokens , string fields){
            var token = string.Join(",", tokens);
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("http://172.17.0.1:2358/submissions/batch?tokens");
            var request = new RestRequest(url);
            request.AddQueryParameter("fields", fields);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");

            RestResponse response = client.Get(request);
            return response.Content.ToString();
        }

    }
}
 




 /* "id": 4,
    "description": "Wrong Answer"
  },
  {
    "id": 71,
    "name": "Python (3.8.1)"
  } */