using System;
using RestSharp;
using MicroCode.models;
using Microsoft.Net.Http.Headers;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
namespace MicroCode.Dependency
{

    public interface ISubmission {
        public string SendPostRequest(SubmissionModel data);
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
        public string SendPostRequest(SubmissionModel data)
        {
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/");
            var request = new RestRequest("submissions?base64_encoded=false&fields=*");
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

            request.AddJsonBody(data);

            var response = client.Post<TokenResponse>(request);

            return response.Token;
        }

        

         public string SendGetRequest(string token)
        {
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/submissions/");
            var request = new RestRequest(url);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

          

            RestResponse response = client.Get(request);

            return response.Content.ToString();
        }


        public string SendCustomGetRequest(string token , string fields){
            
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/submissions/");
            var request = new RestRequest(url);
            request.AddQueryParameter("fields", fields);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");
            RestResponse response = client.Get(request);
            return response.Content.ToString();


        }


        public string SendBatchRequest(List<SubmissionModel> data){
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/");
            var request = new RestRequest("submissions/batch?base64_encoded=false&fields=*");
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");

            request.AddJsonBody(data);

            var response = client.Post<TokenResponse>(request);

            return response.Token;
        }

        public string GetBatchRequest(List<String> tokens , string fields){
            var token = string.Join(",", tokens);
            string url = token + "?base64_encoded=false&fields=*";
            var client = new RestClient("https://judge0-ce.p.rapidapi.com/submissions/batch?tokens");
            var request = new RestRequest(url);
            request.AddQueryParameter("fields", fields);
            request.AddHeader("content-type", "application/json");
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("X-RapidAPI-Key", _token);
            request.AddHeader("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com");
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