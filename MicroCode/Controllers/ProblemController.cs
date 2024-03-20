
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.EntityFrameworkCore;



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
            var thisCode = dbContext.CodeModels.FirstOrDefault(p => p.program_id == new Guid(qst.pID));
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
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> createProblem([FromHeader] string title)
    {

        try
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
            if (userIdClaim?.Value != null)
            {
                var pID = Guid.NewGuid();
                var id = userIdClaim.Value;
                var newProgram = new ProgramModel
                {
                    program_id = pID,
                    title = title,
                    discription = "",
                    verified = false,
                    isPublic = false,
                    diffulty = Diffulty.Easy,
                    judgeId = null,
                    registration_data = DateTime.UtcNow,
                    user_id = new Guid(id),
                    hasError = "",
                    errorMessage ="",
                    flagged = false,

                };

                var newCode = new CodeModel
                {
                    program_id = pID,
                    mainCode = "",
                    callerFunction = "",
                    input = "",
                    output = "",
                };

                newProgram.UserModel = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id));
                newProgram.CodeModel = newCode;
                newCode.ProgramModel = newProgram;
                await dbContext.ProgramModel.AddAsync(newProgram);
                await dbContext.CodeModels.AddAsync(newCode);
                await dbContext.SaveChangesAsync();
                return Ok();
            }

            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex) {
            return Ok(ex);
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
    [Authorize]
    public async Task<IActionResult> getSubmission([FromHeader] string Token)
    {
        string getValue = _submission.SendGetRequest(Token);
        return Ok(getValue);
    }


    [Route("/getAllProblem")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getAllProblem([FromHeader] string Token)
    {
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        if (userIdClaim != null)
        {
            var allProgram = dbContext.ProgramModel.Where(p => p.user_id == new Guid(userIdClaim.Value)).Include(p=>p.CodeModel).ToList();
            return Ok(allProgram);
        }
        else
        {
            return BadRequest();
        }


    }



    [Route("/getCode")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getProblem([FromHeader] string Token)
    {
        
        if (Token != null)
        {
            var code = dbContext.CodeModels.Where(p => p.program_id == new Guid(Token));
            return Ok(code);
        }
        else
        {
            return BadRequest();
        }

    }


}
