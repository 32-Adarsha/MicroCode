using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Windows.Markup;
using MicroCode.Data;
using MicroCode.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


public class ExamRepository : IExamRepository
{
    private readonly MicroCodeContext _context;

    public ExamRepository(MicroCodeContext context)
    {
        _context = context;
    }

    public async Task<String> addExam(HelpModel sub, string user_id) {
        try
        {
            Guid id = Guid.NewGuid();

            var newExamModel = new ExamModel
            {
                examId = id,
                user_id = new Guid(user_id),
                name = sub.name,
                discription = sub.discription,
                allProblems = sub.allProblem,
                accessCode = sub.accessCode,
                timeLimit = sub.timeLimit,
                totaScore = sub.totalScore,
                UserModel = _context.UserModel.FirstOrDefault(u => u.user_id == new Guid(user_id))
            };
            await _context.ExamModel.AddAsync(newExamModel);
            await _context.SaveChangesAsync();
            return id.ToString();

        } catch (Exception e) {
            return "false";
        }
    }

    public examGetResponse getExam(string id, string accessCode)
    {

        var examModel = _context.ExamModel.FirstOrDefault(u => u.examId == new Guid(id));
        if (examModel == null) {
            var e = new examGetResponse
            {
                exam = null,
                successful = false,
                error = "Access code wrong"
            };
            return e;
        }
        if (examModel.accessCode == accessCode)
        {
            var examGetModel = new ExamGetModel
            {
                examId = examModel.examId,
                name = examModel.name,
                totaScore = examModel.totaScore,
                timeLimit = examModel.timeLimit,
                discription = examModel.discription,
                allProblems = examModel.allProblems

            };
            var e = new examGetResponse
            {
                exam = examGetModel,
                successful = true,
                error = ""
            };
            return e;
        }
        else {
            var e = new examGetResponse
            {
                exam = null,
                successful = false,
                error = "Access code wrong"
            };
            return e;
        }
    }

    public async Task<ExamModel> updateExam(Guid id, ExamModel exam) {
        _context.ExamModel.Update(exam);
        await _context.SaveChangesAsync();
        return exam;
    }


    public async Task<IEnumerable<examViewModel>> GetAllExamAsync()
{
    try 
    {
        var allExams = await _context.ExamModel.Select (x => new examViewModel {
            name = x.name,
            id = x.examId.ToString(),
            owner = x.UserModel.email,
        }).
        ToListAsync();
        return allExams;
    } 
    catch (Exception e) 
    {
        // Handle the exception appropriately, e.g., logging
        throw; // Re-throw the exception to propagate it up the call stack
    }
}

    public async Task<IEnumerable<examViewModel>> getCreatedExam(string userId)
    {
        try
        {
            var examModel = await _context.ExamModel.Where(u => u.user_id == new Guid(userId)).Select(x => new examViewModel
            {
                name = x.name,
                id = x.examId.ToString()
            }).ToListAsync();

            return examModel;
        } catch(Exception e) {
            throw;
        }
        
    }

    public async Task<rtnModel<string>> addStudentToExam(string email , Guid examId){
        var user = await _context.UserModel.FirstOrDefaultAsync(x => x.email == email);
        if (user != null) {
            var isAlreadyEnrolled = await _context.UserExamModels.AnyAsync(x => x.user_id == user.user_id && x.examId == examId);
            if (!isAlreadyEnrolled) {
                var addExam = new UserExamModel
                {
                    modelId = Guid.NewGuid(),
                    user_id = user.user_id,
                    examId = examId,
                    UserModel = user,
                    atmtCount = 0,
                    taken = false,
                    maxScore = 0,
                    examModle = await _context.ExamModel.FirstOrDefaultAsync(x => x.examId == examId)
                };

                await _context.UserExamModels.AddAsync(addExam);
                await _context.SaveChangesAsync();
                return new rtnModel<string> {
                    ok = true,
                    Obj = null
                };

                
            } else {
                return new rtnModel<string>
                {
                    ok = false,
                    Obj = "User is Already Enrolled in exam"
                };
            }
        } else {
            return new rtnModel<string>
            {
                ok = false,
                Obj = "User Doesn't exist",
            };
        }
    }

    public async Task<UExam> getUsersExam(Guid user_id){
        var takenExam = await _context.UserExamModels
                .Where(x => x.user_id == user_id && x.taken == true)
                .Select(y => new UserExamT {
                    examId = y.examId.ToString(),
                    taken = y.taken,
                    maxScore = y.maxScore,
                    name = y.examModle.name,
                    totaScore = y.examModle.totaScore,
                    timeLimit = y.examModle.timeLimit,
                    discription = y.examModle.discription,
                    owner = y.examModle.UserModel.email,
                }).ToListAsync();
        var notTakenExam = await _context.UserExamModels
                .Where(x => x.user_id == user_id && x.taken == false)
                .Select(y => new UserExamT {
                    examId = y.examId.ToString(),
                    taken = y.taken,
                    maxScore = y.maxScore,
                    name = y.examModle.name,
                    totaScore = y.examModle.totaScore,
                    timeLimit = y.examModle.timeLimit,
                    discription = y.examModle.discription,
                    owner = y.examModle.UserModel.email,
                }).ToListAsync();

        return new UExam
        {
            taken = takenExam,
            nTaken = notTakenExam,
        };


   }

    public async Task<List<seeUserExamReport>> getUserExamReport(Guid exam_id){
        var usersExam = await _context.UserExamModels.Where(x => x.examId == exam_id)
            .Select(y => new seeUserExamReport
            {
                taken = y.taken,
                user = y.UserModel.username,
                email = y.UserModel.email,
                totalScore = y.maxScore,
                atmCount = y.atmtCount,

            }).ToListAsync();
        
        return usersExam;
    }

    public async Task<List<seeUserExamReport>> getIndividualExamReport(Guid exam_id){
        var usersExam = await _context.UserExamModels.Where(x => x.examId == exam_id)
            .Select(y => new seeUserExamReport
            {
                taken = y.taken,
                user = y.UserModel.username,
                email = y.UserModel.email,
                totalScore = y.maxScore,
                atmCount = y.atmtCount,

            }).ToListAsync();
        
        return usersExam;
    }



    public async Task<ExamSubmissionModel> getUserExamQuestionDetail(Guid exam_id, Guid s_id){
        var usersExam = await _context.ExamSubmissionModel.FirstOrDefaultAsync(x => x.user_id == s_id && x.examId == exam_id);
        return usersExam;
    }

    
   

}


