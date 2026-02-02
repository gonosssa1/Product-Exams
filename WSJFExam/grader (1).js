#!/usr/bin/env node

/**
 * WSJF Exam Grader
 * 
 * This utility grades exam submissions for the WSJF (Weighted Shortest Job First) Exam.
 * 
 * Usage:
 *   node grader.js <submission_file.json>
 *   node grader.js --exam-id <EXAM_ID> --answers <A,B,C,D,...> --student <n>
 *   node grader.js --list-exams
 * 
 * Submission JSON format:
 * {
 *   "exam_id": "EXAM-WSJF-001",
 *   "student_name": "John Doe",
 *   "responses": ["B", "C", "B", ...],
 *   "timestamp": "2024-01-01T00:00:00.000Z"
 * }
 */

const fs = require('fs');

// Answer keys for all exams
const ANSWER_KEYS = {
    "EXAM-WSJF-001": {
        name: "WSJF (Weighted Shortest Job First) - Scaled Agile Framework",
        answers: ["B", "C", "B", "B", "C", "C", "C", "B", "C", "B", "B", "B", "C", "B", "B", "B", "B", "B", "B", "C"]
    }
};

function gradeExam(examId, studentResponses, studentName = "Unknown") {
    if (!ANSWER_KEYS[examId]) {
        return { 
            success: false,
            error: `Error: Invalid Exam ID '${examId}'`,
            valid_exam_ids: Object.keys(ANSWER_KEYS)
        };
    }

    const examData = ANSWER_KEYS[examId];
    const answers = examData.answers;
    
    if (studentResponses.length !== answers.length) {
        return {
            success: false,
            error: `Error: Expected ${answers.length} responses, got ${studentResponses.length}`
        };
    }

    let correct = 0;
    const breakdown = [];
    const questionResults = [];

    for (let i = 0; i < answers.length; i++) {
        const studentAnswer = studentResponses[i]?.toUpperCase();
        const correctAnswer = answers[i];
        const isCorrect = studentAnswer === correctAnswer;
        
        questionResults.push({
            question_number: i + 1,
            student_answer: studentAnswer,
            correct_answer: correctAnswer,
            is_correct: isCorrect
        });

        if (isCorrect) {
            correct++;
        } else {
            breakdown.push({
                question: i + 1,
                student_answer: studentAnswer || "(no answer)",
                correct_answer: correctAnswer
            });
        }
    }

    const score = (correct / answers.length) * 100;

    return {
        success: true,
        exam_id: examId,
        exam_name: examData.name,
        student_name: studentName,
        graded_at: new Date().toISOString(),
        total_questions: answers.length,
        correct_answers: correct,
        incorrect_answers: answers.length - correct,
        score_percentage: Math.round(score * 10) / 10,
        score_fraction: `${correct}/${answers.length}`,
        passed: score >= 70,
        passing_threshold: 70,
        question_results: questionResults,
        missed_questions: breakdown
    };
}

function printGradeReport(result) {
    if (!result.success) {
        console.log('\n' + '='.repeat(60));
        console.log('GRADING ERROR');
        console.log('='.repeat(60));
        console.log(result.error);
        if (result.valid_exam_ids) {
            console.log('\nValid Exam IDs:');
            result.valid_exam_ids.forEach(id => console.log(`  - ${id}`));
        }
        return;
    }

    console.log('\n' + '='.repeat(60));
    console.log('GRADE REPORT');
    console.log('='.repeat(60));
    console.log(`Student Name:    ${result.student_name}`);
    console.log(`Exam ID:         ${result.exam_id}`);
    console.log(`Exam:            ${result.exam_name}`);
    console.log(`Graded At:       ${result.graded_at}`);
    console.log('-'.repeat(60));
    console.log(`Score:           ${result.score_fraction} (${result.score_percentage}%)`);
    console.log(`Status:          ${result.passed ? 'PASSED ✓' : 'NOT PASSED'}`);
    console.log(`Passing Score:   ${result.passing_threshold}%`);
    console.log('-'.repeat(60));

    if (result.missed_questions.length > 0) {
        console.log('\nMissed Questions:');
        result.missed_questions.forEach(m => {
            console.log(`  Q${m.question}: Your answer: ${m.student_answer} | Correct: ${m.correct_answer}`);
        });
    } else {
        console.log('\n🎉 PERFECT SCORE! All questions answered correctly!');
    }

    console.log('='.repeat(60) + '\n');
}

function listExams() {
    console.log('\n' + '='.repeat(60));
    console.log('AVAILABLE EXAMS');
    console.log('='.repeat(60));
    
    Object.entries(ANSWER_KEYS).forEach(([id, data]) => {
        console.log(`\nExam ID: ${id}`);
        console.log(`  Name: ${data.name}`);
        console.log(`  Questions: ${data.answers.length}`);
    });
    
    console.log('\n' + '='.repeat(60) + '\n');
}

function printUsage() {
    console.log(`
WSJF Exam Grader - Usage
========================

Grade from submission file:
  node grader.js <submission_file.json>

Grade from command line:
  node grader.js --exam-id <EXAM_ID> --answers <A,B,C,...> --student <n>

List available exams:
  node grader.js --list-exams

Submission JSON format:
{
  "exam_id": "EXAM-WSJF-001",
  "student_name": "John Doe",
  "responses": ["B", "C", "B", "B", "C", "C", "C", "B", "C", "B", "B", "B", "C", "B", "B", "B", "B", "B", "B", "C"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}

Available Exam IDs:
  - EXAM-WSJF-001  (WSJF - Scaled Agile Framework - 20 questions)
`);
}

// Main execution
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        printUsage();
        process.exit(0);
    }

    // List exams
    if (args.includes('--list-exams')) {
        listExams();
        process.exit(0);
    }

    // Grade from command line arguments
    if (args.includes('--exam-id')) {
        const examIdIndex = args.indexOf('--exam-id');
        const answersIndex = args.indexOf('--answers');
        const studentIndex = args.indexOf('--student');

        if (examIdIndex === -1 || answersIndex === -1) {
            console.log('Error: Both --exam-id and --answers are required');
            printUsage();
            process.exit(1);
        }

        const examId = args[examIdIndex + 1];
        const answers = args[answersIndex + 1].split(',').map(a => a.trim().toUpperCase());
        const studentName = studentIndex !== -1 ? args[studentIndex + 1] : 'Command Line User';

        const result = gradeExam(examId, answers, studentName);
        printGradeReport(result);
        
        // Output JSON result
        console.log('JSON Result:');
        console.log(JSON.stringify(result, null, 2));
        process.exit(result.success ? 0 : 1);
    }

    // Grade from file
    const filePath = args[0];
    
    if (!fs.existsSync(filePath)) {
        console.log(`Error: File not found: ${filePath}`);
        process.exit(1);
    }

    try {
        let submission = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Handle nested structure from exam-app.js
        if (submission.submission) {
            submission = submission.submission;
        }

        const result = gradeExam(submission.exam_id, submission.responses, submission.student_name);
        printGradeReport(result);

        // Save result to file
        const resultPath = filePath.replace('.json', '_graded.json');
        fs.writeFileSync(resultPath, JSON.stringify({
            original_submission: submission,
            grade_result: result
        }, null, 2));
        console.log(`Graded result saved to: ${resultPath}`);

    } catch (e) {
        console.log(`Error parsing file: ${e.message}`);
        process.exit(1);
    }
}

// Export for use as module
module.exports = { gradeExam, ANSWER_KEYS };

// Run if executed directly
if (require.main === module) {
    main();
}
