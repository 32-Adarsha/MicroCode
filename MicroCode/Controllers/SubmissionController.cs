
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;



namespace MicroCode.Controllers;

[ApiController]
public class SubmissionController : ControllerBase
{
    
    private readonly MicroCodeContext dbContext;
    private  ISubmission _submission;
    public SubmissionController(MicroCodeContext dbContext , ISubmission submission)
    {
        this.dbContext = dbContext;
        this._submission = submission;
    }

    [Route("/pushSubmission")]
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> pushSubmission([FromBody] SubmissionModel sModel)
    {
        string value = _submission.SendPostRequest(sModel);
        return Ok(value);

    }
    [Route("/getSubmission")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> getSubmission([FromHeader] string Token)
    {
        string getValue = _submission.SendGetRequest(Token);
        return Ok(getValue);
    }
}



