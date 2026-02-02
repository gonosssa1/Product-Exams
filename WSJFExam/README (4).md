# WSJF (Weighted Shortest Job First) Exam System

A Node.js application for administering a multiple-choice exam covering WSJF from the Scaled Agile Framework (SAFe).

## 📚 Exam Coverage

**WSJF (Weighted Shortest Job First) - Scaled Agile Framework**

Based on the SAFe Extended Guidance for WSJF:
- WSJF Formula and Calculation
- Cost of Delay Components
- Relative Estimation
- Prioritization Best Practices

## 🚀 Quick Start

### Running the Exam Application

```bash
cd wsjf-exam
node exam-app.js
```

The application will:
1. Prompt for your name
2. Allow you to take the WSJF exam (20 questions)
3. Grade your responses immediately
4. Save results to JSON files

### Grading Submissions

You can grade submissions using the standalone grader:

```bash
# Grade from a submission file
node grader.js results/exam_result_John_Doe_EXAM-WSJF-001_1234567890.json

# Grade from command line
node grader.js --exam-id EXAM-WSJF-001 --answers B,C,B,B,C,C,C,B,C,B,B,B,C,B,B,B,B,B,B,C --student "John Doe"

# List available exams
node grader.js --list-exams
```

## 📋 Exam Details

| Exam ID | Topic | Questions | Passing Score |
|---------|-------|-----------|---------------|
| `EXAM-WSJF-001` | WSJF - Scaled Agile Framework | 20 | 70% (14/20) |

## 📄 Topics Covered

The exam covers these key areas from WSJF:

### 1. WSJF Fundamentals (Q1-Q3)
- Definition of WSJF (Weighted Shortest Job First)
- Purpose: Prioritization for maximum economic benefit
- Formula: Cost of Delay ÷ Job Duration (Size)

### 2. Cost of Delay Components (Q4-Q5, Q11-Q12)
- User/Business Value
- Time Criticality
- Risk Reduction and/or Opportunity Enablement (RR/OE)
- Don Reinertsen's guidance on quantifying Cost of Delay

### 3. Estimation Approach (Q6-Q7, Q15-Q16, Q18)
- Modified Fibonacci sequence (1, 2, 3, 5, 8, 13, 20)
- Relative estimation vs. absolute values
- Job Size as proxy for duration
- Starting with smallest item = 1

### 4. Applying WSJF (Q8-Q10, Q17)
- Highest WSJF = highest priority
- Automatic handling of sunk costs
- Job sequencing vs. theoretical ROI
- Splitting large features

### 5. Applicability (Q13-Q14, Q19-Q20)
- Best for ART backlog (Features)
- Less suited for Team backlog (Stories)
- SAFe Principle #1: Take an economic view
- When job size isn't a good proxy

## 📄 Submission Format

Submissions are saved in JSON format:

```json
{
  "exam_id": "EXAM-WSJF-001",
  "student_name": "John Doe",
  "responses": ["B", "C", "B", "B", "C", "C", "C", "B", "C", "B", "B", "B", "C", "B", "B", "B", "B", "B", "B", "C"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📊 Grade Report Format

Grade reports include:

```json
{
  "exam_id": "EXAM-WSJF-001",
  "student_name": "John Doe",
  "score_percentage": 85,
  "score_fraction": "17/20",
  "passed": true,
  "passing_threshold": 70,
  "missed_questions": [
    {
      "question": 5,
      "student_answer": "A",
      "correct_answer": "C"
    }
  ]
}
```

## 📁 Directory Structure

```
wsjf-exam/
├── exam-app.js      # Main interactive exam application
├── grader.js        # Standalone grading utility
├── package.json     # Project configuration
├── README.md        # This file
└── results/         # Saved exam results (created automatically)
```

## 🎯 Key WSJF Concepts to Remember

### The WSJF Formula
```
WSJF = Cost of Delay ÷ Job Size (Duration)
```

### Cost of Delay Components
```
Cost of Delay = User/Business Value + Time Criticality + RR/OE
```

### Modified Fibonacci Scale
```
1, 2, 3, 5, 8, 13, 20
```

### Key Principles
- **Highest WSJF = Do First** - Always prioritize the job with the highest WSJF score
- **Relative Estimation** - Compare jobs to each other, not absolute values
- **Ignore Sunk Costs** - WSJF automatically handles this with frequent reprioritization
- **Sequence Over ROI** - Job sequencing produces better economic outcomes

## 💡 Study Tips

1. Understand the WSJF formula: CoD ÷ Job Size
2. Know all three Cost of Delay components
3. Remember the modified Fibonacci sequence
4. Understand why relative estimation is preferred
5. Know where WSJF is most applicable (Features > Stories)
6. Remember the key quote: "If you only quantify one thing, quantify the Cost of Delay"

## 🔧 Requirements

- Node.js v14 or higher
- No external dependencies required (uses built-in Node.js modules)

## 📞 Support

For grading by the AI Exam Administrator, submit your responses in this format:

```
Exam ID: EXAM-WSJF-001
Student Name: Your Name
Answers: B, C, B, B, C, C, C, B, C, B, B, B, C, B, B, B, B, B, B, C
```

The administrator will validate your exam ID and calculate your score.

## 📚 Reference

Based on: [SAFe Extended Guidance - WSJF](https://framework.scaledagile.com/wsjf)
