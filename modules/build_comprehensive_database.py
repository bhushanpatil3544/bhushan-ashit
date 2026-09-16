# -*- coding: utf-8 -*-
"""
Build Comprehensive Database of all 113 Topics for MPSC and RRB NTPC.
Generates full 14-section pedagogical lessons for every topic.
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

print("Builder ready.")
