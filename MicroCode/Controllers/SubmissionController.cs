
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;
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
    [AllowAnonymous]
    public async Task<IActionResult> pushSubmission([FromBody] BigSubmissionModel BModel)
    {
        var id = User.FindFirst(ClaimTypes.Sid)?.Value;
        string value = _submission.SendPostRequest(BModel.sModel);
        ResponseModel rsp = new ResponseModel
        {
            JudgeId = value,
            Program_id = new Guid(BModel.Program_id),
            user_id = new Guid(id),
            CompletedDate = DateTime.UtcNow,
        };
        rsp.UserModel = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id));
        rsp.ProgramModel = dbContext.ProgramModel.FirstOrDefault(u => u.Program_id == new Guid(BModel.Program_id));
        await dbContext.ResponseModels.AddAsync(rsp);
        await dbContext.SaveChangesAsync();
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



