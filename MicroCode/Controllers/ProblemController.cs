
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Net.Http;
using Microsoft.AspNetCore.Identity;
using System.Text;


namespace MicroCode.Controllers;

[ApiController]
public class ProblemController : ControllerBase
{
    private readonly MicroCodeContext dbContext;
    private readonly ISubmission _submission;
    public ProblemController(MicroCodeContext dbContext, ISubmission submission)
    {
        this.dbContext = dbContext;
        this._submission = submission;
    }

    [Route("/saveProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> saveProblem([FromBody] ProgramGetModel qst)
    {
        try
        {
            var thisProblem = dbContext.ProgramModel.FirstOrDefault(p => p.program_id == new Guid(qst.pID));
            var thisCode = dbContext.CodeModels.FirstOrDefault(p => p.program_id == new Guid(qst.pID));
            if (thisProblem != null)
            {
                thisProblem.title = qst.title;
                thisProblem.discription = qst.discription;
                thisCode.input = qst.input;
                thisCode.output = qst.output;
                thisCode.memoryLimit = qst.memoryLimit;
                thisCode.timeLimit = qst.timeLimit;
                thisCode.mainCode = qst.mainCode;
                await dbContext.SaveChangesAsync();
            }
           


            return Ok();
        }
        catch (Exception e)
        {
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
                    errorMessage = "",
                    flagged = false,

                };

                var newCode = new CodeModel
                {
                    program_id = pID,
                    mainCode = "",
                    input = [],
                    output = [],

                    timeLimit = 10,
                    memoryLimit = 2,
                };

                newProgram.UserModel = dbContext.UserModel.FirstOrDefault(u => u.user_id == new Guid(id));
                newProgram.CodeModel = newCode;
                newCode.ProgramModel = newProgram;
                await dbContext.ProgramModel.AddAsync(newProgram);
                await dbContext.CodeModels.AddAsync(newCode);
                await dbContext.SaveChangesAsync();



                return Ok(new
                {
                    program_id = pID,
                    title = title,
                    discription = "",
                    verified = false,
                    isPublic = false,
                });
            }

            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }

    }


    //Helper Function
    private async Task<string> waitOutput(string token)
    {
        bool isProcessing = true;
        int attempt = 0;
        while (isProcessing && (attempt <= 5))
        {
            await Task.Delay(3000);
            isProcessing = exe(token);
            attempt++;
        }
        string fields = "status,language,time,memory,stdin,expected_output,stdout,created_at,finished_at,source_code,message";
        string getValue = _submission.SendGetRequest(token);
        return getValue;
    }
    private bool exe(string token)
    {
        string fields = "status";
        string getValue = _submission.SendCustomGetRequest(token, fields);
        checkModel obj = JsonSerializer.Deserialize<checkModel>(getValue);
        if (obj.status.description == "Processing")
        {
            return true;
        }
        else
        {
            return false;
        }
    }



    [Route("/executeProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> executeProblem([FromBody] SubmissionModel mdl)
    {
        string value = _submission.SendPostRequest(mdl);
        string fields = "status,language,time,memory,stdin,expected_output,stdout,created_at,finished_at,source_code";
        return Ok(await waitOutput(value));
    }


    [Route("/checkProblem")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getSubmission([FromHeader] string Token)
    {
        string fields = "status,language,time,memory,stdin,expected_output,stdout,created_at,finished_at,source_code";
        string getValue = _submission.SendCustomGetRequest(Token, fields);
        return Ok(getValue);
    }


    [Route("/getAllProblem")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> getAllProblem()
    {
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        if (userIdClaim != null)
        {
            var allProgram = dbContext.ProgramModel.Where(p => p.user_id == new Guid(userIdClaim.Value)).Select(u => new { u.program_id, u.title, u.isPublic }).ToList();
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
    public async Task<IActionResult> getCode([FromHeader] string Token)
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

    [Route("/getCodetoSolve")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> getCodetoSolve([FromHeader] string Token)
    {

        if (Token != null)
        {
            var code = dbContext.ProgramModel.Where(p => p.program_id == new Guid(Token)).Select(p => new
            {
                p.discription,
                p.diffulty,
                p.registration_data,
                p.title,
                p.user_id,
                p.CodeModel.input,
                p.CodeModel.output
            });
            return Ok(code);
        }
        else
        {
            return BadRequest();
        }

    }



    [Route("/verified")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> pushVerified([FromHeader] string Token)
    {

        if (Token != null)
        {
            ProgramModel program = dbContext.ProgramModel.FirstOrDefault<ProgramModel>(p => p.program_id == new Guid(Token));
            program.verified = true;
            await dbContext.SaveChangesAsync();
            return Ok("verified");

        }
        else
        {
            return BadRequest();
        }

    }


    [Route("/makePublic")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> makePublic([FromHeader] string Token)
    {

        if (Token != null)
        {
            ProgramModel program = dbContext.ProgramModel.FirstOrDefault<ProgramModel>(p => p.program_id == new Guid(Token));
            program.isPublic = true;
            await dbContext.SaveChangesAsync();
            return Ok("made public available");

        }
        else
        {
            return BadRequest();
        }

    }

}
