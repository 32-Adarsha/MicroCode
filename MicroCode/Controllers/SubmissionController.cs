
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


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
    [Authorize]
    public async Task<IActionResult> pushSubmission([FromBody] BigSubmissionModel BModel)
    {
        var id =  HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid).Value;
        string value = _submission.SendPostRequest(BModel.sModel);
        CodeSubmission rsp = new CodeSubmission
        {
            JudgeId = value,
            Program_id = new Guid(BModel.program_id),
            user_id = new Guid(id),
            codeStatus = false,
            CompletedDate = DateTime.UtcNow,
        };
        rsp.UserModel = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id));
        rsp.ProgramModel = dbContext.ProgramModel.FirstOrDefault(u => u.program_id == new Guid(BModel.program_id));
        await dbContext.CodeSubmissions.AddAsync(rsp);
        await dbContext.SaveChangesAsync();
        return Ok(value);
    }


    
    [Route("/getSubmission")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getSubmission([FromHeader] string Token)
    {
        string fields = "status,language,time";
        string getValue = _submission.SendCustomGetRequest(Token ,fields);
        return Ok(getValue);
    }
}



