# -*- coding: utf-8 -*-
"""
Full Curriculum Generator for MPSC & RRB NTPC Learning Platform.
Generates comprehensive 14-section pedagogical modules for every topic in the syllabus.
"""
import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.abspath('.'))

def build_curriculum():
    with open('modules/topics_manifest.json', 'r', encoding='utf-8') as f:
        manifest = json.load(f)

    with open('data/lessons.js', 'r', encoding='utf-8') as f:
        raw = f.read()
    raw_json = raw.replace('window.LESSON_STORE = ', '', 1).rstrip(';\n')
    lessons = json.loads(raw_json)

    print(f"Loaded {len(lessons)} existing master anchor lessons.")

    # Domain Knowledge Repository for all specific topics
    from modules.curriculum_data import get_specialized_content

    added = 0
    for item in manifest:
        tid = item['topicId']
        if tid in lessons:
            continue

        spec = get_specialized_content(tid, item)
        lesson_obj = {
            "id": tid,
            "exam": item['examName'],
            "subjectId": item['subjectId'],
            "subjectName": item['subjectName'],
            "chapterId": item['chapterId'],
            "chapterName": item['chapterName'],
            "topicId": tid,
            "title": spec.get("title", item['topicName']),
            "titleEn": spec.get("titleEn", item['topicName']),
            "estimatedTime": spec.get("estimatedTime", "४० मिनिटे"),
            "difficulty": spec.get("difficulty", "मध्यम"),
            "introduction": spec.get("introduction", {}),
            "background": spec.get("background", {}),
            "coreAnalysis": spec.get("coreAnalysis", []),
            "importantFacts": spec.get("importantFacts", []),
            "comparisons": spec.get("comparisons", []),
            "examTraps": spec.get("examTraps", []),
            "flashcards": spec.get("flashcards", []),
            "verifiedPYQs": spec.get("verifiedPYQs", []),
            "practiceMCQs": spec.get("practiceMCQs", {"easy": [], "medium": [], "hard": []}),
            "quickRevision": spec.get("quickRevision", []),
            "topicTest": spec.get("topicTest", {"timeMinutes": 10, "totalQuestions": 3, "questions": []})
        }

        # Any extra specialized fields (like sites, articles, formulas)
        for extra_key in ["sites", "articles", "writs", "solvedExamples", "causes", "leaders", "events", "aftermath"]:
            if extra_key in spec:
                lesson_obj[extra_key] = spec[extra_key]

        lessons[tid] = lesson_obj
        added += 1

    print(f"Total topics generated and packaged: {len(lessons)} (Added: {added})")

    # Write out to data/lessons.js
    out_js = "window.LESSON_STORE = " + json.dumps(lessons, ensure_ascii=False, indent=2) + ";\n"
    with open('data/lessons.js', 'w', encoding='utf-8') as f:
        f.write(out_js)
    print("Successfully written data/lessons.js")

    # Update taxonomy so every topic has hasLesson: true
    with open('data/taxonomy.js', 'r', encoding='utf-8') as f:
        tax_raw = f.read()
    tax_json_str = tax_raw.replace('window.PLATFORM_TAXONOMY = ', '', 1).rstrip(';\n')
    tax = json.loads(tax_json_str)

    for ex in tax['exams']:
        for sub in ex['subjects']:
            for chap in sub['chapters']:
                for top in chap['topics']:
                    top['hasLesson'] = True

    out_tax_js = "window.PLATFORM_TAXONOMY = " + json.dumps(tax, ensure_ascii=False, indent=2) + ";\n"
    with open('data/taxonomy.js', 'w', encoding='utf-8') as f:
        f.write(out_tax_js)
    print("Successfully updated data/taxonomy.js with hasLesson = True for all topics.")

if __name__ == '__main__':
    build_curriculum()
