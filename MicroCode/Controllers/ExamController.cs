
using System.IdentityModel.Tokens.Jwt;
using MicroCode.Data;
using MicroCode.Dependency;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
    public async Task<examGetResponse> getExam([FromHeader] string guid)
    {

        return _Exam.getExam(guid);
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
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> submitExam([FromBody] submitExamFromUser e){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        await _IexamSubmission.addExamSubmission(new Guid(userIdClaim.Value), e);
        return Ok(userIdClaim.Value.ToString());
    }

    [Route("/getAssignedExam")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> aExam(){
        var userIdClaim = HttpContext.User.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sid);
        var rst = await _Exam.getUsersExam(new Guid(userIdClaim.Value));
        return Ok(rst);
    }

    [Route("/getUserExamReport")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> aExamReport([FromHeader]string examId){
        var rst = await _Exam.getUserExamReport(new Guid(examId));
        return Ok(rst);
    }


    [Route("/getUserExamDetail")]
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> aExamUserDetail([FromHeader]string examId , [FromHeader] string studenID){
        var rst = await _Exam.getUserExamQuestionDetail(new Guid(examId) , new Guid(studenID));
        List<UserSolvedResponse> rsp = [];
        if (rst != null){
            if (rst.trackProblem != null)
            {
                foreach (var p in rst.trackProblem) {
                    var allSolvedProblem = await dbContext.CodeSubmissions
                        .Include(s => s.ProgramModel)
                        .Where(s => s.user_id == new Guid(studenID) && s.codeSubmissionId == new Guid(p.judgeId))
                        .Select(s => new UserSolvedResponse
                        {
                            CodeSubId = s.codeSubmissionId,
                            Solved = s.solved,
                            problemId = (Guid)s.Program_id,
                            code = s.code,
                            language = s.language,
                            Title = s.ProgramModel.title,
                            Tag = s.ProgramModel.tag,
                        }).FirstOrDefaultAsync();
                    if (allSolvedProblem != null){
                        rsp.Add(allSolvedProblem);
                    }
                }
            }
        }

        return Ok(new
        {
            examS = rst,
            probles = rsp,
        });
    }





}
