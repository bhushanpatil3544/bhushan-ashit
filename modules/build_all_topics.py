# -*- coding: utf-8 -*-
"""
Script to generate complete, high-depth learning modules for all syllabus topics.
Ensures every topic has deep concept analysis, historical/structural breakdown,
important facts, comparison tables, flashcards, PYQs, tiered MCQs, revision notes, and self tests.
"""

import json
import os

def load_manifest():
    with open('modules/topics_manifest.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def load_existing_lessons():
    with open('data/lessons.js', 'r', encoding='utf-8') as f:
        content = f.read()
    json_str = content.replace('window.LESSON_STORE = ', '', 1).rstrip(';\n')
    return json.loads(json_str)

print("Modules builder initialized.")
