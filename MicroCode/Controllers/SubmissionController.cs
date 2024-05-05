
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

    [Route("/submitProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> pushSubmission([FromBody] SubmissionModel mdl)
    {
        var id =  HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid).Value;
        var value = Guid.NewGuid();
        var rst = new CodeSubmission{
            codeSubmissionId = value,
            solved = mdl.solved,
            code = mdl.source_code,
            user_id = new Guid(id),
            CompletedDate  = DateTime.UtcNow,
            language = mdl.language,
            Program_id = new Guid(mdl.problem_id),
            UserModel = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id)),
            ProgramModel =dbContext.ProgramModel.FirstOrDefault(u => u.program_id == new Guid(mdl.problem_id)),
        };
        
        await dbContext.CodeSubmissions.AddAsync(rst);
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



