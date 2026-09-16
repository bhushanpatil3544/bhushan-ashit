import json

with open('modules/topics_manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

print(f"Total topics: {len(manifest)}")
for i, t in enumerate(manifest, 1):
    print(f"{i}. [{t['topicId']}] -> {t['topicName']} ({t['subjectName']})")
