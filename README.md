# SVPG Book Exam System - Jekyll Edition

A web-based multiple choice exam system for Silicon Valley Product Group books, built with Jekyll and deployable in a Docker container.

## 📚 Covered Books

1. **LOVED** - How to Rethink Marketing for Tech Products (Martina Lauchengco)
2. **INSPIRED** - How to Create Tech Products Customers Love (Marty Cagan)
3. **TRANSFORMED** - Moving to the Product Operating Model (Marty Cagan & SVPG Partners)
4. **EMPOWERED** - Ordinary People, Extraordinary Products (Marty Cagan & Chris Jones)

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Build and run with Docker Compose
docker-compose up

# Or build and run with Docker directly
docker build -t svpg-exam-jekyll .
docker run -p 4000:4000 svpg-exam-jekyll
```

Access the exam system at: **http://localhost:4000**

### Local Development (Without Docker)

```bash
# Install Ruby and Bundler first, then:
bundle install
bundle exec jekyll serve
```

### Build Static Site Only

```bash
# Using Docker Compose
docker-compose --profile build run jekyll-build

# Or with Jekyll directly
bundle exec jekyll build
```

Static files will be in the `_site` directory.

## 📁 Project Structure

```
svpg-exam-jekyll/
├── _config.yml          # Jekyll configuration
├── _layouts/
│   ├── default.html     # Base layout
│   └── exam.html        # Exam page layout
├── _exams/              # Exam content files
│   ├── loved.md
│   ├── inspired.md
│   ├── transformed.md
│   └── empowered.md
├── assets/
│   ├── css/style.css    # Stylesheet
│   └── js/exam-system.js # Exam logic
├── exams/index.html     # Exam listing page
├── results/index.html   # Results page
├── index.html           # Home page
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose config
├── Gemfile              # Ruby dependencies
└── README.md            # This file
```

## 🎯 Features

- **Responsive Design**: Works on desktop and mobile
- **Progress Tracking**: Visual progress bar during exams
- **Instant Grading**: Results displayed immediately after submission
- **Local Storage**: Results saved in browser localStorage
- **JSON Export**: Download results for external grading
- **Multiple Exams**: Take individual exams or all four

## 📋 Exam Details

| Exam ID | Book | Questions | Passing Score |
|---------|------|-----------|---------------|
| EXAM-LOVED-001 | LOVED | 10 | 70% |
| EXAM-INSPIRED-001 | INSPIRED | 10 | 70% |
| EXAM-TRANSFORMED-001 | TRANSFORMED | 10 | 70% |
| EXAM-EMPOWERED-001 | EMPOWERED | 10 | 70% |

## 📄 Result Format

Downloaded results are in JSON format compatible with the Node.js grader:

```json
{
  "submission": {
    "exam_id": "EXAM-LOVED-001",
    "student_name": "John Doe",
    "responses": ["B", "C", "B", "C", "B", "B", "C", "A", "C", "B"],
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  "grade_result": {
    "score_percentage": 100,
    "passed": true,
    "correct_answers": 10,
    "missed_questions": []
  }
}
```

## 🔧 Customization

### Adding New Exams

Create a new file in `_exams/` with the following format:

```yaml
---
layout: exam
title: "Book Title"
exam_id: "EXAM-NEWBOOK-001"
author: "Author Name"
answer_key: ["A", "B", "C", ...]
questions:
  - text: "Question text?"
    difficulty: "Easy"
    options:
      - letter: "A"
        text: "Option A"
      - letter: "B"
        text: "Option B"
      - letter: "C"
        text: "Option C"
      - letter: "D"
        text: "Option D"
---
```

### Modifying Styles

Edit `assets/css/style.css` to customize colors, fonts, and layout.

## 🐳 Docker Commands

```bash
# Start development server with live reload
docker-compose up

# Build static site
docker-compose --profile build run jekyll-build

# Stop containers
docker-compose down

# Rebuild container after changes
docker-compose up --build
```

## 📞 Grading with Node.js Grader

The JSON files exported from this system are compatible with the Node.js grader:

```bash
node grader.js downloaded_result.json
```

## 🌐 Deployment Options

### GitHub Pages

1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select `main` branch and root folder

### Static Hosting (Netlify, Vercel, etc.)

1. Build the site: `bundle exec jekyll build`
2. Deploy the `_site` folder

### Docker Container

Use the included Dockerfile for container-based deployment.

## License

MIT License - Feel free to use and modify for your own training needs.
