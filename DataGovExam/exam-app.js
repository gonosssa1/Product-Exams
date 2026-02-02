#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');

// ============================================================================
// EXAM DATA - Data Governance Primer
// ============================================================================

const EXAMS = {
    "EXAM-DATAGOVERNANCE-001": {
        exam_id: "EXAM-DATAGOVERNANCE-001",
        topic: "Data Governance Primer: A Plain English Guide for Beginners",
        questions: [
            {
                q_id: 1,
                question: "According to the Data Governance Primer, what is data governance?",
                options: {
                    A: "A software application for managing databases",
                    B: "The system of rules, roles, and processes that ensure your organization's data is accurate, secure, and used properly",
                    C: "A type of data encryption technology",
                    D: "A method for backing up data to the cloud"
                }
            },
            {
                q_id: 2,
                question: "What analogy does the primer use to describe data governance?",
                options: {
                    A: "Like a library catalog system",
                    B: "Like a computer firewall",
                    C: "Like traffic laws for your data - keeping everything flowing safely and efficiently",
                    D: "Like a filing cabinet for documents"
                }
            },
            {
                q_id: 3,
                question: "According to the primer, how much does poor data quality cost organizations on average per year?",
                options: {
                    A: "$1.2 million",
                    B: "$5.5 million",
                    C: "$12.9 million",
                    D: "$25 million"
                }
            },
            {
                q_id: 4,
                question: "What role is described as the 'landlord' who is accountable for a specific set of data?",
                options: {
                    A: "Data Steward",
                    B: "Data Custodian",
                    C: "Data Owner",
                    D: "Data Consumer"
                }
            },
            {
                q_id: 5,
                question: "Which role is described as the 'property manager' who handles day-to-day care of data?",
                options: {
                    A: "Data Owner",
                    B: "Data Steward",
                    C: "Data Custodian",
                    D: "Governance Council"
                }
            },
            {
                q_id: 6,
                question: "What role is compared to the 'building maintenance crew' that manages technical infrastructure?",
                options: {
                    A: "Data Owner",
                    B: "Data Steward",
                    C: "Data Custodian",
                    D: "Data Consumer"
                }
            },
            {
                q_id: 7,
                question: "Which data classification level includes Social Security numbers, health records, and credit card data?",
                options: {
                    A: "Public",
                    B: "Internal",
                    C: "Confidential",
                    D: "Restricted"
                }
            },
            {
                q_id: 8,
                question: "According to the DAMA-DMBOK framework, how many dimensions of data quality are there?",
                options: {
                    A: "Four",
                    B: "Five",
                    C: "Six",
                    D: "Eight"
                }
            },
            {
                q_id: 9,
                question: "Which data quality dimension ensures 'the same data has the same value everywhere'?",
                options: {
                    A: "Accuracy",
                    B: "Completeness",
                    C: "Consistency",
                    D: "Validity"
                }
            },
            {
                q_id: 10,
                question: "What are the six stages of the data lifecycle in order?",
                options: {
                    A: "Create, Use, Store, Share, Archive, Destroy",
                    B: "Create, Store, Use, Share, Archive, Destroy",
                    C: "Store, Create, Use, Share, Destroy, Archive",
                    D: "Create, Share, Store, Use, Archive, Destroy"
                }
            },
            {
                q_id: 11,
                question: "What does 'Metadata' mean according to the glossary?",
                options: {
                    A: "Data that has been encrypted",
                    B: "Data about data - information that describes other data like creation date, author, or format",
                    C: "Data stored in the cloud",
                    D: "Data that has been archived"
                }
            },
            {
                q_id: 12,
                question: "What does 'Data Lineage' refer to?",
                options: {
                    A: "The age of the data",
                    B: "A map showing where data came from, how it moved, and how it was changed",
                    C: "The encryption level of data",
                    D: "The storage location of data"
                }
            },
            {
                q_id: 13,
                question: "What does 'SoR' or 'Source of Record' mean?",
                options: {
                    A: "A backup copy of data",
                    B: "The one official, trusted source for a particular piece of data",
                    C: "A data encryption standard",
                    D: "A type of database software"
                }
            },
            {
                q_id: 14,
                question: "What does 'RBAC' stand for in data governance?",
                options: {
                    A: "Remote Backup and Control",
                    B: "Role-Based Access Control",
                    C: "Regular Business Audit Compliance",
                    D: "Real-time Backup and Compression"
                }
            },
            {
                q_id: 15,
                question: "What is 'PII' according to the primer?",
                options: {
                    A: "Private Internal Information",
                    B: "Personally Identifiable Information - any data that could identify a specific person",
                    C: "Protected Infrastructure Index",
                    D: "Primary Information Indicator"
                }
            },
            {
                q_id: 16,
                question: "What is the first recommended step when getting started with data governance?",
                options: {
                    A: "Hire a data governance consultant",
                    B: "Purchase data governance software",
                    C: "Know what you have - make a list of your most important data",
                    D: "Create a governance council immediately"
                }
            },
            {
                q_id: 17,
                question: "According to the primer, what is a 'Business Glossary'?",
                options: {
                    A: "A list of company employees",
                    B: "A dictionary of business terms and their agreed-upon definitions",
                    C: "A catalog of software applications",
                    D: "A list of data vendors"
                }
            },
            {
                q_id: 18,
                question: "Which data classification level includes internal memos, org charts, and meeting notes?",
                options: {
                    A: "Public",
                    B: "Internal",
                    C: "Confidential",
                    D: "Restricted"
                }
            },
            {
                q_id: 19,
                question: "What data quality dimension addresses whether 'data follows the correct format and business rules'?",
                options: {
                    A: "Accuracy",
                    B: "Timeliness",
                    C: "Validity",
                    D: "Uniqueness"
                }
            },
            {
                q_id: 20,
                question: "What phrase does the primer use to emphasize the approach to data governance implementation?",
                options: {
                    A: "Go big or go home",
                    B: "Progress over perfection - start where you are, use what you have, do what you can",
                    C: "All or nothing",
                    D: "Move fast and break things"
                }
            }
        ]
    }
};

// Answer keys (hidden from students during exam)
const ANSWER_KEYS = {
    "EXAM-DATAGOVERNANCE-001": ["B", "C", "C", "C", "B", "C", "D", "C", "C", "B", "B", "B", "B", "B", "B", "C", "B", "B", "C", "B"]
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
        this.printHeader('DATA GOVERNANCE EXAM SYSTEM');
        console.log('Welcome to the Data Governance Primer Exam System!');
        console.log('This exam covers the fundamentals of Data Governance based on:');
        console.log('  • DAMA-DMBOK Framework');
        console.log('  • ISO 38505 Standards');
        console.log('  • Gartner 2025 Trends\n');
        
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
        console.log('  1. Data Governance Primer Exam (20 Questions)');
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
                    const submission = await this.administerExam('EXAM-DATAGOVERNANCE-001');
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
                    console.log(`\nThank you for using the Data Governance Exam System, ${this.studentName}!`);
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
