# Data Governance Primer Exam System

A Node.js application for administering a multiple-choice exam covering the Data Governance Primer document.

## 📚 Exam Coverage

**Data Governance Primer: A Plain English Guide for Beginners**

Based on industry best practices from:
- DAMA-DMBOK (Data Management Body of Knowledge)
- ISO 38505 (International Standard for Data Governance)
- Gartner 2025 Trends

## 🚀 Quick Start

### Running the Exam Application

```bash
cd data-governance-exam
node exam-app.js
```

The application will:
1. Prompt for your name
2. Allow you to take the Data Governance exam (20 questions)
3. Grade your responses immediately
4. Save results to JSON files

### Grading Submissions

You can grade submissions using the standalone grader:

```bash
# Grade from a submission file
node grader.js results/exam_result_John_Doe_EXAM-DATAGOVERNANCE-001_1234567890.json

# Grade from command line
node grader.js --exam-id EXAM-DATAGOVERNANCE-001 --answers B,C,C,C,B,C,D,C,C,B,B,B,B,B,B,C,B,B,C,B --student "John Doe"

# List available exams
node grader.js --list-exams
```

## 📋 Exam Details

| Exam ID | Topic | Questions | Passing Score |
|---------|-------|-----------|---------------|
| `EXAM-DATAGOVERNANCE-001` | Data Governance Primer | 20 | 70% (14/20) |

## 📄 Topics Covered

The exam covers these key areas from the Data Governance Primer:

1. **What Is Data Governance?**
   - Definition and purpose
   - Business impact of poor data quality

2. **Key Players and Roles**
   - Data Owner
   - Data Steward
   - Data Custodian
   - Data Consumer
   - Governance Council

3. **Data Classification**
   - Public
   - Internal
   - Confidential
   - Restricted

4. **Data Quality Dimensions (DAMA-DMBOK)**
   - Accuracy
   - Completeness
   - Consistency
   - Timeliness
   - Validity
   - Uniqueness

5. **Data Lifecycle**
   - Create, Store, Use, Share, Archive, Destroy

6. **Key Terms**
   - Metadata
   - Data Lineage
   - Data Catalog
   - Source of Record (SoR)
   - Business Glossary
   - PII
   - RBAC
   - Data Domain

7. **Getting Started**
   - Implementation best practices

## 📄 Submission Format

Submissions are saved in JSON format:

```json
{
  "exam_id": "EXAM-DATAGOVERNANCE-001",
  "student_name": "John Doe",
  "responses": ["B", "C", "C", "C", "B", "C", "D", "C", "C", "B", "B", "B", "B", "B", "B", "C", "B", "B", "C", "B"],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📊 Grade Report Format

Grade reports include:

```json
{
  "exam_id": "EXAM-DATAGOVERNANCE-001",
  "student_name": "John Doe",
  "score_percentage": 85,
  "score_fraction": "17/20",
  "passed": true,
  "passing_threshold": 70,
  "missed_questions": [
    {
      "question": 5,
      "student_answer": "A",
      "correct_answer": "B"
    }
  ]
}
```

## 📁 Directory Structure

```
data-governance-exam/
├── exam-app.js      # Main interactive exam application
├── grader.js        # Standalone grading utility
├── package.json     # Project configuration
├── README.md        # This file
└── results/         # Saved exam results (created automatically)
```

## 🎯 Features

- **Interactive Exam Mode**: Take exams one question at a time
- **Immediate Grading**: Get your results right after completing the exam
- **Persistent Results**: All submissions and grades saved to JSON files
- **CLI Grading**: Grade submissions from the command line
- **70% Passing Threshold**: Need 14 out of 20 correct to pass

## 💡 Study Tips

1. Review the primer's key definitions carefully
2. Understand the differences between roles (Owner vs Steward vs Custodian)
3. Memorize the six data quality dimensions from DAMA-DMBOK
4. Know the data classification levels and examples
5. Understand the data lifecycle stages in order

## 🔧 Requirements

- Node.js v14 or higher
- No external dependencies required (uses built-in Node.js modules)

## 📞 Support

For grading by the AI Exam Administrator, submit your responses in this format:

```
Exam ID: EXAM-DATAGOVERNANCE-001
Student Name: Your Name
Answers: B, C, C, C, B, C, D, C, C, B, B, B, B, B, B, C, B, B, C, B
```

The administrator will validate your exam ID and calculate your score.
