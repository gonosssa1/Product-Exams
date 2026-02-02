#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

// ============================================================================
// EXAM DATA - WSJF (Weighted Shortest Job First) from Scaled Agile Framework
// ============================================================================

const EXAMS = {
    "EXAM-WSJF-001": {
        exam_id: "EXAM-WSJF-001",
        topic: "WSJF (Weighted Shortest Job First) - Scaled Agile Framework",
        questions: [
            {
                q_id: 1,
                question: "What does WSJF stand for?",
                options: {
                    A: "Work Sequencing Job Framework",
                    B: "Weighted Shortest Job First",
                    C: "Workflow Scheduling Job Function",
                    D: "Work Stream Job Flow"
                }
            },
            {
                q_id: 2,
                question: "What is WSJF used for in SAFe?",
                options: {
                    A: "Estimating project budgets",
                    B: "Measuring team velocity",
                    C: "A prioritization model to sequence work for maximum economic benefit",
                    D: "Tracking defect rates"
                }
            },
            {
                q_id: 3,
                question: "How is WSJF calculated in SAFe?",
                options: {
                    A: "User Value multiplied by Time Criticality",
                    B: "Cost of Delay divided by Job Duration (or Job Size)",
                    C: "Risk Reduction plus Opportunity Enablement",
                    D: "Business Value minus Development Cost"
                }
            },
            {
                q_id: 4,
                question: "What are the three components that make up Cost of Delay in SAFe's WSJF model?",
                options: {
                    A: "Scope, Schedule, Budget",
                    B: "User/Business Value, Time Criticality, Risk Reduction and/or Opportunity Enablement",
                    C: "Technical Debt, Feature Size, Team Capacity",
                    D: "Revenue, Cost, Profit Margin"
                }
            },
            {
                q_id: 5,
                question: "According to Don Reinertsen's quote highlighted in WSJF guidance, what should you quantify if you only quantify one thing?",
                options: {
                    A: "The job size",
                    B: "The team velocity",
                    C: "The Cost of Delay",
                    D: "The business value"
                }
            },
            {
                q_id: 6,
                question: "What sequence is used for relative estimation in WSJF?",
                options: {
                    A: "Linear scale (1, 2, 3, 4, 5)",
                    B: "Powers of two (1, 2, 4, 8, 16)",
                    C: "Modified Fibonacci sequence (1, 2, 3, 5, 8, 13, 20)",
                    D: "Exponential scale (1, 10, 100, 1000)"
                }
            },
            {
                q_id: 7,
                question: "What is used as a proxy for job duration in the simplified WSJF calculation?",
                options: {
                    A: "Story points",
                    B: "Calendar days",
                    C: "Job size",
                    D: "Team capacity"
                }
            },
            {
                q_id: 8,
                question: "When calculating WSJF, which job should be done next?",
                options: {
                    A: "The job with the lowest WSJF score",
                    B: "The job with the highest WSJF score",
                    C: "The job requested by the most important stakeholder",
                    D: "The smallest job available"
                }
            },
            {
                q_id: 9,
                question: "What does WSJF automatically ignore due to frequent reprioritization with remaining job size estimates?",
                options: {
                    A: "Technical dependencies",
                    B: "Team preferences",
                    C: "Sunk costs",
                    D: "Stakeholder input"
                }
            },
            {
                q_id: 10,
                question: "What economic principle does WSJF embody according to the SAFe guidance?",
                options: {
                    A: "Maximize utilization of resources",
                    B: "Job sequencing produces the best results rather than prioritization based on theoretical ROI",
                    C: "Always complete the largest jobs first",
                    D: "Minimize team size for efficiency"
                }
            },
            {
                q_id: 11,
                question: "What does 'Time Criticality' measure in the Cost of Delay calculation?",
                options: {
                    A: "How fast the team can deliver",
                    B: "How much the user/business value decays over time or if there are fixed deadlines",
                    C: "The total calendar time for the project",
                    D: "The sprint length"
                }
            },
            {
                q_id: 12,
                question: "What does 'Risk Reduction and/or Opportunity Enablement' (RR/OE) measure?",
                options: {
                    A: "The likelihood of project failure",
                    B: "The additional business value from reducing risk or enabling future opportunities",
                    C: "The team's risk tolerance",
                    D: "The cost of insurance for the project"
                }
            },
            {
                q_id: 13,
                question: "At which SAFe level is WSJF most commonly and effectively used for prioritization?",
                options: {
                    A: "Team backlog (Stories)",
                    B: "Portfolio backlog (Epics only)",
                    C: "ART backlog (Features)",
                    D: "Individual task level"
                }
            },
            {
                q_id: 14,
                question: "Why is WSJF not typically recommended as the sole prioritization method for team backlogs?",
                options: {
                    A: "Teams don't understand WSJF",
                    B: "Stories are smaller, and the overhead of WSJF estimation may not be justified",
                    C: "WSJF doesn't work for stories",
                    D: "Teams should only use velocity"
                }
            },
            {
                q_id: 15,
                question: "In WSJF estimation, what approach is used to avoid analysis paralysis and false precision?",
                options: {
                    A: "Using exact dollar values",
                    B: "Relative estimation comparing jobs to each other",
                    C: "Complex mathematical formulas",
                    D: "Individual expert judgment only"
                }
            },
            {
                q_id: 16,
                question: "What is a key advantage of using relative estimation in WSJF?",
                options: {
                    A: "It provides exact monetary values",
                    B: "It's faster and avoids false precision while producing reliable comparisons",
                    C: "It eliminates the need for stakeholder input",
                    D: "It guarantees accurate predictions"
                }
            },
            {
                q_id: 17,
                question: "According to SAFe WSJF guidance, what happens to features that are too large (e.g., size 20)?",
                options: {
                    A: "They are automatically prioritized first",
                    B: "They should likely be split into smaller features before WSJF prioritization",
                    C: "They are removed from the backlog",
                    D: "They receive a WSJF bonus"
                }
            },
            {
                q_id: 18,
                question: "What is the recommended starting point when estimating Cost of Delay components?",
                options: {
                    A: "Start with the most expensive item",
                    B: "Give the smallest/lowest item a value of 1 and estimate others relative to it",
                    C: "Use historical data from previous projects",
                    D: "Let management assign values"
                }
            },
            {
                q_id: 19,
                question: "Which SAFe principle is directly supported by using WSJF?",
                options: {
                    A: "Build incrementally with fast, integrated learning cycles",
                    B: "Take an economic view",
                    C: "Apply systems thinking",
                    D: "Unlock the intrinsic motivation of knowledge workers"
                }
            },
            {
                q_id: 20,
                question: "When job size is not a good proxy for duration (e.g., waiting for external dependencies), what should be used instead?",
                options: {
                    A: "Always use job size regardless",
                    B: "Skip WSJF entirely",
                    C: "Use relative estimated duration directly",
                    D: "Double the job size estimate"
                }
            }
        ]
    }
};

// Answer keys (hidden from students during exam)
const ANSWER_KEYS = {
    "EXAM-WSJF-001": ["B", "C", "B", "B", "C", "C", "C", "B", "C", "B", "B", "B", "C", "B", "B", "B", "B", "B", "B", "C"]
};

// ============================================================================
// EXAM APPLICATION
// ============================================================================

class ExamSystem {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.studentName = '';
        this.studentResponses = {};
        this.currentExamId = null;
    }

    async prompt(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }

    clearScreen() {
        console.clear();
    }

    printHeader(text) {
        console.log('\n' + '='.repeat(70));
        console.log(text);
        console.log('='.repeat(70) + '\n');
    }

    printSubheader(text) {
        console.log('\n' + '-'.repeat(50));
        console.log(text);
        console.log('-'.repeat(50) + '\n');
    }

    async getStudentName() {
        this.clearScreen();
        this.printHeader('WSJF EXAM SYSTEM - Scaled Agile Framework');
        console.log('Welcome to the WSJF (Weighted Shortest Job First) Exam System!');
        console.log('This exam covers the SAFe prioritization model including:');
        console.log('  • WSJF Formula and Calculation');
        console.log('  • Cost of Delay Components');
        console.log('  • Relative Estimation with Modified Fibonacci');
        console.log('  • Applicability and Best Practices\n');
        
        while (!this.studentName) {
            this.studentName = await this.prompt('Please enter your full name: ');
            if (!this.studentName) {
                console.log('Name is required. Please try again.');
            }
        }
        console.log(`\nWelcome, ${this.studentName}! Let's begin.\n`);
    }

    async selectExam() {
        this.printSubheader('SELECT AN OPTION');
        console.log('Available Options:');
        console.log('  1. WSJF (Weighted Shortest Job First) Exam (20 Questions)');
        console.log('  2. Grade Previously Submitted Answers');
        console.log('  3. Exit\n');

        const choice = await this.prompt('Enter your choice (1-3): ');
        return choice;
    }

    async administerExam(examId) {
        const exam = EXAMS[examId];
        if (!exam) {
            console.log('Error: Invalid Exam ID');
            return null;
        }

        this.currentExamId = examId;
        const responses = [];

        this.clearScreen();
        this.printHeader(`EXAM: ${exam.topic}`);
        console.log(`Student: ${this.studentName}`);
        console.log(`Exam ID: ${exam.exam_id}`);
        console.log(`Total Questions: ${exam.questions.length}`);
        console.log(`Passing Score: 70% (14 out of 20 correct)`);
        console.log('\nInstructions:');
        console.log('- Answer each question by entering A, B, C, or D');
        console.log('- Press Enter to submit each answer');
        console.log('- You cannot go back to previous questions\n');

        await this.prompt('Press Enter to begin the exam...');

        for (let i = 0; i < exam.questions.length; i++) {
            const q = exam.questions[i];
            this.clearScreen();
            console.log(`\n${exam.topic}`);
            console.log(`Question ${q.q_id} of ${exam.questions.length}`);
            console.log('-'.repeat(50));
            console.log(`\n${q.question}\n`);
            console.log(`  A) ${q.options.A}`);
            console.log(`  B) ${q.options.B}`);
            console.log(`  C) ${q.options.C}`);
            console.log(`  D) ${q.options.D}\n`);

            let answer = '';
            while (!['A', 'B', 'C', 'D'].includes(answer.toUpperCase())) {
                answer = await this.prompt('Your answer (A/B/C/D): ');
                if (!['A', 'B', 'C', 'D'].includes(answer.toUpperCase())) {
                    console.log('Invalid answer. Please enter A, B, C, or D.');
                }
            }
            responses.push(answer.toUpperCase());
        }

        return {
            exam_id: examId,
            student_name: this.studentName,
            responses: responses,
            timestamp: new Date().toISOString()
        };
    }

    gradeExam(submission) {
        const examId = submission.exam_id;
        if (!ANSWER_KEYS[examId]) {
            return { error: 'Error: Invalid Exam ID' };
        }

        const answers = ANSWER_KEYS[examId];
        const studentResponses = submission.responses;
        let correct = 0;
        const breakdown = [];

        for (let i = 0; i < answers.length; i++) {
            const isCorrect = studentResponses[i] === answers[i];
            if (isCorrect) {
                correct++;
            } else {
                breakdown.push({
                    question: i + 1,
                    student_answer: studentResponses[i],
                    correct_answer: answers[i]
                });
            }
        }

        const score = (correct / answers.length) * 100;

        return {
            exam_id: examId,
            student_name: submission.student_name,
            timestamp: submission.timestamp,
            graded_at: new Date().toISOString(),
            total_questions: answers.length,
            correct_answers: correct,
            score_percentage: score,
            passed: score >= 70,
            missed_questions: breakdown
        };
    }

    displayGradeReport(result) {
        this.printHeader('GRADE REPORT');
        
        if (result.error) {
            console.log(result.error);
            return;
        }

        console.log(`Student Name: ${result.student_name}`);
        console.log(`Exam ID: ${result.exam_id}`);
        console.log(`Submitted: ${result.timestamp}`);
        console.log(`Graded: ${result.graded_at}`);
        console.log('-'.repeat(40));
        console.log(`Score: ${result.correct_answers}/${result.total_questions} (${result.score_percentage.toFixed(1)}%)`);
        console.log(`Status: ${result.passed ? 'PASSED ✓' : 'NEEDS IMPROVEMENT'}`);
        
        if (result.missed_questions.length > 0) {
            console.log('\nMissed Questions:');
            result.missed_questions.forEach(m => {
                console.log(`  Question ${m.question}: You answered ${m.student_answer}, correct answer was ${m.correct_answer}`);
            });
        } else {
            console.log('\nPerfect Score! All questions answered correctly!');
        }
    }

    async saveResults(submission, gradeResult) {
        const filename = `exam_result_${submission.student_name.replace(/\s+/g, '_')}_${submission.exam_id}_${Date.now()}.json`;
        const filepath = `./results/${filename}`;
        
        const fullResult = {
            submission: submission,
            grade_result: gradeResult
        };

        // Ensure results directory exists
        if (!fs.existsSync('./results')) {
            fs.mkdirSync('./results', { recursive: true });
        }

        fs.writeFileSync(filepath, JSON.stringify(fullResult, null, 2));
        console.log(`\nResults saved to: ${filename}`);
        return filepath;
    }

    async run() {
        await this.getStudentName();

        let running = true;
        const allResults = [];

        while (running) {
            const choice = await this.selectExam();

            switch (choice) {
                case '1':
                    const submission = await this.administerExam('EXAM-WSJF-001');
                    if (submission) {
                        const result = this.gradeExam(submission);
                        this.displayGradeReport(result);
                        await this.saveResults(submission, result);
                        allResults.push({ submission, result });
                    }
                    break;

                case '2':
                    // Grade from file
                    console.log('\nTo grade a previously submitted exam, provide the submission JSON.');
                    const jsonInput = await this.prompt('Enter submission JSON (or file path): ');
                    try {
                        let submission;
                        if (fs.existsSync(jsonInput)) {
                            submission = JSON.parse(fs.readFileSync(jsonInput, 'utf8'));
                            if (submission.submission) submission = submission.submission;
                        } else {
                            submission = JSON.parse(jsonInput);
                        }
                        const result = this.gradeExam(submission);
                        this.displayGradeReport(result);
                    } catch (e) {
                        console.log('Error parsing submission: ' + e.message);
                    }
                    break;

                case '3':
                    running = false;
                    console.log(`\nThank you for using the WSJF Exam System, ${this.studentName}!`);
                    console.log('Goodbye!\n');
                    break;

                default:
                    console.log('\nInvalid choice. Please enter 1-3.');
            }

            if (running) {
                await this.prompt('\nPress Enter to continue...');
            }
        }

        this.rl.close();
    }
}

// ============================================================================
// MAIN ENTRY POINT
// ============================================================================

async function main() {
    const examSystem = new ExamSystem();
    await examSystem.run();
}

main().catch(console.error);
