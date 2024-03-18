
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;



namespace MicroCode.Controllers;

[ApiController]
public class ProblemController : ControllerBase
{
    private readonly MicroCodeContext dbContext;
    private readonly ISubmission _submission;
    public ProblemController(MicroCodeContext dbContext , ISubmission submission)
    {
        this.dbContext = dbContext;
        this._submission = submission;
    }

    [Route("/saveProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> saveProblem([FromBody] ProgramGetModel qst)
    {
        try {
            var id = User.FindFirst(ClaimTypes.Sid)?.Value;
            var thisProblem = dbContext.ProgramModel.FirstOrDefault(p => p.program_id == new Guid(qst.pID));
            var thisCode = dbContext.CodeModels.FirstOrDefault(p => p.Program_id == new Guid(qst.pID));
            if (thisProblem != null) {
                thisProblem.title = qst.title;
                thisProblem.discription = qst.discription;
                thisCode.input = qst.input;
                thisCode.output = qst.output;
                thisCode.callerFunction = qst.callerFunction;
                thisCode.mainCode = qst.mainCode;
                await dbContext.SaveChangesAsync();
            }
            
            return Ok();
        }
        catch (Exception e){
            return BadRequest(e);
        }
    }


    [Route("/createProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> createProblem([FromHeader] string title)
    {
        try {
            var pID = Guid.NewGuid();
            var id = User.FindFirst(ClaimTypes.Sid)?.Value;
            var newProgram = new ProgramModel
        {
            program_id = pID,
            title = title,
            discription = "",
            verified = false,
            isPublic = true,
            judgeId = null,
            registration_data = DateTime.UtcNow,
            user_id = new Guid(id),
        };
        var newCode = new CodeModel {
            Program_id = pID,
            mainCode = "",
            callerFunction = "",
            input = "",
            output = "",
        };

        newProgram.UserModel =  dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id));
        newProgram.CodeModel = newCode;
        newCode.ProgramModel = newProgram;
        await dbContext.ProgramModel.AddAsync(newProgram);
        await dbContext.CodeModels.AddAsync(newCode);
        await dbContext.SaveChangesAsync();
        return Ok();
        }
        catch (Exception e){
            return BadRequest(e);
        }
    }


    [Route("/verifyProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> testProblem([FromHeader] ProgramGetModel qst)
    {
        try {
            var id = User.FindFirst(ClaimTypes.Sid)?.Value;
            var thisProblem = dbContext.ProgramModel.FirstOrDefault(p => p.program_id == new Guid(qst.pID));

            return Ok();
        }
        catch (Exception e){
            return BadRequest(e);
        }
    }


    [Route("/watchSubmission")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> getSubmission([FromHeader] string Token)
    {
        string getValue = _submission.SendGetRequest(Token);
        return Ok(getValue);
    }


}
