
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Template;



namespace MicroCode.Controllers;

[ApiController]
public class ProblemController : ControllerBase
{
    private readonly MicroCodeContext dbContext;
    public ProblemController(MicroCodeContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [Route("/cProblem")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> cProblem([FromBody] ProgramGetModel qst)
    {
        try {
        var thisUser = HttpContext.User;
        var pID = Guid.NewGuid();
        var id = thisUser.Claims.Where(claim => claim.Type == JwtRegisteredClaimNames.Sid).Select(claim => claim.Value).FirstOrDefault();
        var newProgram = new ProgramModel
        {
            Program_id = pID,
            title = qst.title,
            discription = qst.discription,
            verified = false,
            isPrivate = true,
            registration_data = DateTime.UtcNow,
            user_id = new Guid(id),
        };
        var newCode = new CodeModel {
            Program_id = pID,
            mainCode = qst.mainCode,
            template = qst.template,
            input = qst.input,
            output = qst.output,
            verified = false,
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


}
