
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MicroCode.Controllers;

[ApiController]
[Authorize]
public class ExamController : ControllerBase
{
    private readonly IExamRepository _Exam;
    private readonly MicroCodeContext dbContext;
    private readonly ISubmission _Submission;
    private readonly IExamSubmission _IexamSubmission;
    public ExamController(MicroCodeContext dbContext ,IExamRepository Exam , ISubmission Submission , IExamSubmission IexamSubmission)
    {
        _Exam = Exam;
        _Submission = Submission;
        _IexamSubmission = IexamSubmission;
        this.dbContext = dbContext;
    }

    [Route("/postExam")]
    [HttpPost]
    [Authorize]
    
    public async Task<IActionResult> postExam([FromBody] HelpModel sub)
    {
        try
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
            var res = await _Exam.addExam(sub, userIdClaim.Value);

            return Ok(res);
        } catch(Exception e) {
            return BadRequest(e.Message);
        }
    
    }


    [Route("/getExam")]
    [HttpPost]
    [Authorize]
    public async Task<examGetResponse> getExam([FromHeader] string guid, [FromHeader] string accessCode)
    {

        return _Exam.getExam(guid, accessCode);
    }
    
    [Route("/getCreated")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> createdExam(){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        var allExam = await _Exam.getCreatedExam(userIdClaim.Value);
        return Ok(allExam);
    }


    [Route("/addStudent")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> createdExam([FromHeader] string email , [FromHeader] string examId ){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        await _Exam.addStudentToExam(email , new Guid(examId));
        return Ok("Successful");
    }


    [Route("/submitExam")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> submitExam([FromBody] submitExamFromUser e){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        await _IexamSubmission.addExamSubmission(new Guid(userIdClaim.Value), e);
        return Ok("Successful");
    }

    [Route("/getAssignedExam")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> aExam(){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        var rst = await _Exam.getUsersExam(new Guid(userIdClaim.Value));
        return Ok(rst);
    }


}
