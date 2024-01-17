using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizDatabaseContext _context;

        public QuestionsController(QuizDatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }

            var randomFiveQuestions = await (_context.Questions.Select(q => new
            {
                QuestionId = q.QuestionId,
                QuestionInWords = q.QuestionInWords,
                ImageName = q.ImageName,
                Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
            })
            // Guid losowo sortuje pytania
            .OrderBy(q => Guid.NewGuid())
            .Take(5)).ToListAsync();

            return Ok(randomFiveQuestions);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Questions/result
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("result")]
        public async Task<ActionResult<Question>> PostResult(int[] questionIds)
        {
            var result = await _context.Questions.Where(q => questionIds.Contains(q.QuestionId)).Select(q => new
            {
                QuestionId = q.QuestionId,
                QuestionInWords = q.QuestionInWords,
                ImageName = q.ImageName,
                Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                Answer = q.Answer,
            }).ToListAsync();
            return Ok(result);
        }

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            if (_context.Questions == null)
            {
                return Problem("Entity set 'QuizDatabaseContext.Questions'  is null.");
            }
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.QuestionId }, question);
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.QuestionId == id)).GetValueOrDefault();
        }
    }
}
