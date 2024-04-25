
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace MicroCode.Controllers;

[ApiController]
public class ExamController : ControllerBase
{
    private readonly IExamSubmission _submission;
    public ExamController(IExamSubmission submission)
    {
        _submission = submission;
    }

    [Route("/submitExam")]
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> submitExam([FromBody] SubHelpModel sub)
    {
        
        return Ok();
    }


}
