# Content Familiarity Exam System

A web-based multiple choice exam platform for professional certification and content familiarity testing. Built with Jekyll and deployable via Docker or GitHub Pages.

**Live Site:** [https://gonosssa1.github.io/Product-Exams/](https://gonosssa1.github.io/Product-Exams/)

---

## Available Exams

### SVPG "Product is Hard" Book Exams
| Exam | Author | Questions | Passing Score |
|------|--------|-----------|---------------|
| **INSPIRED** | Marty Cagan | 10 | 70% (7/10) |
| **EMPOWERED** | Marty Cagan & Chris Jones | 10 | 70% (7/10) |
| **LOVED** | Martina Lauchengco | 10 | 70% (7/10) |
| **TRANSFORMED** | Marty Cagan & SVPG Partners | 10 | 70% (7/10) |

### Data Governance Exam
| Exam | Source | Questions | Passing Score |
|------|--------|-----------|---------------|
| **Data Governance Primer** | DAMA-DMBOK Framework | 20 | 70% (14/20) |

### Weighted Shortest Job First Exam
| Exam | Source | Questions | Passing Score |
|------|--------|-----------|---------------|
| **WSJF** | Scaled Agile Framework (SAFe) | 20 | 70% (14/20) |

---

## Quick Start

### Using Docker Compose (Recommended)
```bash
# Start development server with live reload
docker-compose up

# Access at http://localhost:4000/Product-Exams/
```

### Local Development (Without Docker)
```bash
# Install dependencies
bundle install

# Start Jekyll server
bundle exec jekyll serve

# Access at http://localhost:4000/Product-Exams/
```

### Static Build Only
```bash
# Build static files to _site/
docker-compose --profile build run jekyll-build

# Or without Docker
bundle exec jekyll build
```

---

## Project Structure

```
Product-Exams/
├── _config.yml              # Jekyll configuration
├── _exams/                  # Exam content files
│   ├── inspired.md          # SVPG: INSPIRED (10 questions)
│   ├── empowered.md         # SVPG: EMPOWERED (10 questions)
│   ├── loved.md             # SVPG: LOVED (10 questions)
│   ├── transformed.md       # SVPG: TRANSFORMED (10 questions)
│   ├── datagov.md           # Data Governance (20 questions)
│   └── wsjf.md              # WSJF/SAFe (20 questions)
├── _layouts/
│   ├── default.html         # Base template
│   └── exam.html            # Exam page template
├── assets/
│   ├── css/style.css        # Styles (Blue #003399 / Teal #0088A1)
│   └── js/exam-system.js    # Exam logic and grading
├── index.html               # Homepage with exam selection
├── Dockerfile               # Ruby 3.2 container
├── docker-compose.yml       # Dev and build services
├── Gemfile                  # Ruby dependencies
├── DataGovExam/             # CLI grading tool (Node.js)
│   ├── exam-app.js
│   └── grader.js
└── WSJFExam/                # CLI grading tool (Node.js)
    ├── exam-app (1).js
    └── grader (1).js
```

---

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Progress Tracking** - Visual progress bar during exam
- **Instant Grading** - Immediate results with score percentage
- **Detailed Feedback** - Shows missed questions with correct answers
- **localStorage Persistence** - Remembers student name across sessions
- **JSON Export** - Download results for record-keeping
- **Balanced Answer Distribution** - Equal distribution of A/B/C/D correct answers
- **Multiple Exam Categories** - Product management, data governance, and SAFe frameworks

---

## Exam Content Details

| Exam | Topics Covered |
|------|----------------|
| **INSPIRED** | Product discovery, empowered teams, product trio, four risks, feature factory problem |
| **EMPOWERED** | Product leadership, coaching, context vs command, empowerment litmus test |
| **LOVED** | Product marketing, PMM roles (Ambassador, Strategist, Storyteller, Evangelist) |
| **TRANSFORMED** | Product operating model, transformation dimensions, CEO role, Spotify principles |
| **Data Governance** | DAMA-DMBOK, data roles (Owner, Steward, Custodian), classification levels, data quality dimensions, lifecycle stages |
| **WSJF** | Cost of Delay, relative estimation, Fibonacci sequence, SAFe prioritization, job sequencing |

---

## Adding New Exams

Create a new markdown file in `_exams/` with this structure:

```yaml
---
title: "Exam Title"
author: "Author Name"
exam_id: "EXAM-ID-001"
description: "Brief description"
answers: ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B"]
questions:
  - text: "Question text here?"
    options:
      A: "Option A"
      B: "Option B"
      C: "Option C"
      D: "Option D"
  # ... more questions
---

Optional intro text displayed before the exam starts.

**Passing Score:** 70%
```

Then add the exam to `index.html` in the appropriate section.

---

## Result Format

Exam results can be downloaded as JSON:

```json
{
  "submission": {
    "exam_id": "EXAM-INSPIRED-001",
    "student_name": "John Doe",
    "responses": ["A", "C", "D", "B", "A", "C", "D", "B", "C", "D"],
    "timestamp": "2026-02-02T12:00:00.000Z"
  },
  "grade_result": {
    "exam_id": "EXAM-INSPIRED-001",
    "exam_title": "INSPIRED: How to Create Tech Products Customers Love",
    "student_name": "John Doe",
    "score_percentage": 80,
    "passed": true,
    "correct_answers": 8,
    "total_questions": 10,
    "missed_questions": [
      { "question": 3, "yours": "B", "correct": "D" },
      { "question": 7, "yours": "A", "correct": "D" }
    ]
  }
}
```

---

## CLI Grading Tools

For batch grading or integration, Node.js graders are available:

### Data Governance Grader
```bash
cd DataGovExam
node grader.js submission.json
# Or grade from command line
node grader.js --exam-id EXAM-DATAGOVERNANCE-001 --answers A,C,D,C,A,... --student "Name"
```

### WSJF Grader
```bash
cd WSJFExam
node "grader (1).js" submission.json
```

---

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" > `main` > `/ (root)`
4. Site available at `https://[username].github.io/Product-Exams/`

### Docker Production
```bash
docker build -t exam-system .
docker run -p 4000:4000 exam-system
```

### Static Hosting (Netlify, Vercel, etc.)
1. Build: `bundle exec jekyll build`
2. Deploy contents of `_site/` directory

---

## Docker Commands

```bash
# Start development server
docker-compose up

# Rebuild after Gemfile changes
docker-compose build

# Stop containers
docker-compose down

# Build static site only
docker-compose --profile build run jekyll-build
```

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Static Site Generator | Jekyll 4.x |
| Container | Docker (Ruby 3.2-slim) |
| Frontend | HTML5, CSS3 (custom properties), Vanilla JS |
| CLI Tools | Node.js |
| Hosting | GitHub Pages |
| SEO | jekyll-seo-tag |

---

## License

MIT License - Feel free to use and modify for your own training needs.
