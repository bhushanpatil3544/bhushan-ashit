# -*- coding: utf-8 -*-
"""
Master Builder that creates the standalone, complete 'rrb_ntpc_mpsc_academy.html'
with full syllabus navigation, deep Marathi lessons, interactive mind maps, and 540 MCQs.
"""
import json
import os
import sys

def run_build():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, "modules")
    
    # Load MCQs
    mcq_path = os.path.join(modules_dir, "mcq_data.json")
    with open(mcq_path, "r", encoding="utf-8") as f:
        mcqs = json.load(f)
    print(f"Loaded {len(mcqs)} MCQs.")

    # Load Lessons
    lessons_path = os.path.join(modules_dir, "lessons_data.json")
    with open(lessons_path, "r", encoding="utf-8") as f:
        lessons = json.load(f)
    print(f"Loaded {len(lessons)} detailed lessons.")

    # Load Mindmaps
    sys.path.insert(0, modules_dir)
    from mindmaps_data import get_mindmaps
    mindmaps = get_mindmaps()
    print(f"Loaded {len(mindmaps)} mindmaps.")

    # Complete Syllabus Data matching the user's poster image
    syllabus_tree = {
        "rrb": {
            "title": "RRB NTPC (सर्व विषय आणि संपूर्ण टॉपिक्स)",
            "badge": "रेल्वे भरती विशेष",
            "subjects": [
                {
                    "name": "१. गणित (Mathematics)",
                    "id": "rrb-math",
                    "topics": [
                        {"name": "संख्या पद्धती (Number System)", "target": "math-num-sys"},
                        {"name": "BODMAS नियम व पदावली", "target": "math-bodmas"},
                        {"name": "दशांश व अपूर्णांक (Fractions & Decimals)", "target": "math-bodmas"},
                        {"name": "ल.सा.वि. व म.सा.वि. (LCM & HCF)", "target": "math-lcm-hcf"},
                        {"name": "गुणोत्तर व प्रमाण (Ratio & Proportion)", "target": "math-percentage"},
                        {"name": "टक्केवारी (Percentage)", "target": "math-percentage"},
                        {"name": "नफा व तोटा (Profit & Loss)", "target": "math-percentage"},
                        {"name": "सरळव्याज (Simple Interest)", "target": "math-percentage"},
                        {"name": "चक्रवाढ व्याज (Compound Interest)", "target": "math-percentage"},
                        {"name": "वेळ व काम (Time & Work)", "target": "math-time-work"},
                        {"name": "नळ आणि टाक्या (Pipes & Cisterns)", "target": "math-time-work"},
                        {"name": "वेळ, वेग व अंतर (Speed, Time & Distance)", "target": "math-time-work"},
                        {"name": "सरासरी (Average)", "target": "math-num-sys"},
                        {"name": "वय समस्या (Problems on Ages)", "target": "math-num-sys"},
                        {"name": "बीजगणित (Algebra)", "target": "math-num-sys"},
                        {"name": "भूमिती (Geometry)", "target": "math-num-sys"},
                        {"name": "त्रिकोणमिती (Trigonometry)", "target": "math-num-sys"},
                        {"name": "क्षेत्रमिती (Mensuration 2D & 3D)", "target": "math-num-sys"},
                        {"name": "सांख्यिकी (Statistics - Mean, Median, Mode)", "target": "math-num-sys"},
                        {"name": "माहितीचे विश्लेषण (Data Interpretation - DI)", "target": "math-num-sys"},
                        {"name": "प्राथमिक संभाव्यता (Probability)", "target": "math-num-sys"}
                    ]
                },
                {
                    "name": "२. सामान्य बुद्धिमत्ता व तर्कशक्ती (Reasoning)",
                    "id": "rrb-reasoning",
                    "topics": [
                        {"name": "समानता (Analogy)", "target": "reas-series"},
                        {"name": "वर्गीकरण (Classification)", "target": "reas-series"},
                        {"name": "संख्या मालिका (Number Series)", "target": "reas-series"},
                        {"name": "अक्षर मालिका (Alphabet Series)", "target": "reas-series"},
                        {"name": "संकेतन व संकेतभेदन (Coding-Decoding)", "target": "reas-series"},
                        {"name": "गणितीय चिन्हे (Mathematical Operators)", "target": "reas-series"},
                        {"name": "रक्तसंबंध (Blood Relations)", "target": "reas-series"},
                        {"name": "दिशा निर्देश (Direction Sense)", "target": "reas-series"},
                        {"name": "वेन आकृती (Venn Diagrams)", "target": "reas-series"},
                        {"name": "न्यायनिगम (Syllogism)", "target": "reas-series"},
                        {"name": "विधान व निष्कर्ष (Statement & Conclusion)", "target": "reas-series"},
                        {"name": "विधान व गृहीतक (Statement & Assumptions)", "target": "reas-series"},
                        {"name": "कोडी (Puzzle)", "target": "reas-series"},
                        {"name": "बैठक व्यवस्था (Seating Arrangement)", "target": "reas-series"},
                        {"name": "माहितीची पर्याप्तता (Data Sufficiency)", "target": "reas-series"},
                        {"name": "निर्णय क्षमता (Decision Making)", "target": "reas-series"},
                        {"name": "क्रम व श्रेणी (Ranking & Ordering)", "target": "reas-series"},
                        {"name": "हरवलेली संख्या (Missing Number)", "target": "reas-series"},
                        {"name": "दिनदर्शिका (Calendar)", "target": "reas-clock-cal"},
                        {"name": "घड्याळ (Clock)", "target": "reas-clock-cal"},
                        {"name": "आकृतीजन्य तर्कशक्ती (Non-Verbal Reasoning)", "target": "reas-series"},
                        {"name": "आरसा प्रतिमा (Mirror Image)", "target": "reas-clock-cal"},
                        {"name": "पाण्यातील प्रतिमा (Water Image)", "target": "reas-clock-cal"},
                        {"name": "कागद घडी व कापणे (Paper Folding & Cutting)", "target": "reas-series"},
                        {"name": "आकृती पूर्ण करणे (Figure Completion)", "target": "reas-series"},
                        {"name": "अंतर्भूत आकृती (Embedded Figures)", "target": "reas-series"}
                    ]
                },
                {
                    "name": "३. सामान्य जागरूकता (General Awareness)",
                    "id": "rrb-ga",
                    "topics": [
                        {"name": "चालू घडामोडी (Current Affairs)", "target": "hist-shivaji"},
                        {"name": "भारतीय इतिहास (Indian History)", "target": "hist-shivaji"},
                        {"name": "भारतीय स्वातंत्र्य लढा (Freedom Struggle)", "target": "hist-reformers"},
                        {"name": "भारतीय भूगोल (Indian Geography)", "target": "geo-mh-phys"},
                        {"name": "जागतिक भूगोल (World Geography)", "target": "geo-mh-phys"},
                        {"name": "भारतीय राज्यघटना (Indian Constitution)", "target": "pol-fr"},
                        {"name": "भारतीय अर्थव्यवस्था (Indian Economy)", "target": "eco-rbi"},
                        {"name": "सामान्य विज्ञान (भौतिक, रसायन, जीवशास्त्र)", "target": "sci-physics-motion"},
                        {"name": "अंतराळ विज्ञान व तंत्रज्ञान (Space Tech - ISRO)", "target": "sci-physics-motion"},
                        {"name": "पर्यावरण व परिसंस्था (Environment)", "target": "geo-mh-phys"},
                        {"name": "संगणकाची मूलभूत माहिती (Computer Basics)", "target": "sci-physics-motion"},
                        {"name": "भारतीय रेल्वे विशेष ज्ञान (Railway Special)", "target": "hist-shivaji"},
                        {"name": "क्रीडा व ऑलिम्पिक (Sports)", "target": "hist-reformers"},
                        {"name": "पुरस्कार व सन्मान (Awards & Honours)", "target": "hist-reformers"},
                        {"name": "पुस्तके व लेखक (Books & Authors)", "target": "hist-reformers"},
                        {"name": "महत्त्वाचे दिवस व दिनविशेष (Important Days)", "target": "hist-reformers"},
                        {"name": "कला व संस्कृती (Art & Culture)", "target": "hist-shivaji"},
                        {"name": "सरकारी योजना व आंतरराष्ट्रीय संस्था (UN, WHO)", "target": "pol-fr"}
                    ]
                }
            ]
        },
        "mpsc": {
            "title": "MPSC (सर्व विषय आणि संपूर्ण टॉपिक्स)",
            "badge": "महाराष्ट्र लोकसेवा आयोग",
            "subjects": [
                {
                    "name": "१. इतिहास (History)",
                    "id": "mpsc-hist",
                    "topics": [
                        {"name": "प्राचीन भारत व सिंधू संस्कृती", "target": "hist-shivaji"},
                        {"name": "वैदिक काळ, बौद्ध धर्म व जैन धर्म", "target": "hist-shivaji"},
                        {"name": "मौर्य साम्राज्य व गुप्त कालखंड", "target": "hist-shivaji"},
                        {"name": "दक्षिण भारतातील राज्ये (चोल, चालुक्य, पल्लव)", "target": "hist-shivaji"},
                        {"name": "मध्ययुगीन भारत, दिल्ली सल्तनत व मुघल साम्राज्य", "target": "hist-shivaji"},
                        {"name": "मराठा साम्राज्य (छ. शिवाजी महाराज, स्वराज्य व प्रशासन)", "target": "hist-shivaji"},
                        {"name": "छ. संभाजी महाराज व मराठा स्वातंत्र्य लढा", "target": "hist-shivaji"},
                        {"name": "पेशवे काळ व अटकेपार साम्राज्य विस्तार", "target": "hist-shivaji"},
                        {"name": "भक्ती व सुफी चळवळ", "target": "hist-shivaji"},
                        {"name": "आधुनिक भारत, ब्रिटिश राजवट व १८५७ चा लढा", "target": "hist-reformers"},
                        {"name": "सामाजिक व धार्मिक सुधारणा चळवळी", "target": "hist-reformers"},
                        {"name": "भारतीय राष्ट्रीय काँग्रेस व स्वातंत्र्य आंदोलन (गांधी युग)", "target": "hist-reformers"},
                        {"name": "महाराष्ट्रातील समाजसुधारक (फुले, शाहू, आंबेडकर, टिळक, आगरकर)", "target": "hist-reformers"},
                        {"name": "संयुक्त महाराष्ट्र चळवळ व महाराष्ट्र निर्मिती (१ मे १९६०)", "target": "hist-reformers"}
                    ]
                },
                {
                    "name": "२. भूगोल (Geography)",
                    "id": "mpsc-geo",
                    "topics": [
                        {"name": "भौतिक भूगोल (पृथ्वीची रचना, अक्षवृत्त, रेखावृत्त, गती)", "target": "geo-mh-phys"},
                        {"name": "खडक, पर्वत, पठारे, मैदाने व भूरूपे", "target": "geo-mh-phys"},
                        {"name": "वातावरण, हवेचा दाब, वारे, पर्जन्य व हवामान", "target": "geo-mh-phys"},
                        {"name": "भारताचा भूगोल (प्राकृतिक विभाग, हिमालय, मैदाने, द्वीपकल्प)", "target": "geo-mh-phys"},
                        {"name": "भारतीय नदीप्रणाली, मान्सून, हवामान व शेती", "target": "geo-mh-phys"},
                        {"name": "खनिजे, ऊर्जा साधने, उद्योग व वाहतूक", "target": "geo-mh-phys"},
                        {"name": "महाराष्ट्राचा भूगोल (स्थान, विस्तार, सीमा व जिल्हे)", "target": "geo-mh-phys"},
                        {"name": "सह्याद्री, दख्खन पठार, कोकण व विदर्भ", "target": "geo-mh-phys"},
                        {"name": "महाराष्ट्रातील नद्या (गोदावरी, भीमा, कृष्णा, तापी)", "target": "geo-mh-phys"},
                        {"name": "हवामान, काळी कापसाची मृदा, जंगले व वन्यजीव अभयारण्ये", "target": "geo-mh-phys"},
                        {"name": "महाराष्ट्राची लोकसंख्या, साक्षरता व शहरीकरण", "target": "geo-mh-phys"}
                    ]
                },
                {
                    "name": "३. राज्यघटना व राज्यव्यवस्था (Polity)",
                    "id": "mpsc-pol",
                    "topics": [
                        {"name": "भारतीय राज्यघटना निर्मिती व मसुदा समिती", "target": "pol-fr"},
                        {"name": "प्रस्तावना (सरनामा - Preamble)", "target": "pol-fr"},
                        {"name": "मूलभूत अधिकार (कलम १२ ते ३५) व कर्तव्ये (५१A)", "target": "pol-fr"},
                        {"name": "राज्याची मार्गदर्शक तत्त्वे (DPSP कलम ३६ ते ५१)", "target": "pol-fr"},
                        {"name": "राष्ट्रपती, उपराष्ट्रपती व पंतप्रधान-मंत्रिमंडळ", "target": "pol-fr"},
                        {"name": "संसद (लोकसभा, राज्यसभा व कायदे प्रक्रिया)", "target": "pol-fr"},
                        {"name": "न्यायव्यवस्था (सर्वोच्च न्यायालय व उच्च न्यायालय)", "target": "pol-fr"},
                        {"name": "राज्यपाल, मुख्यमंत्री व राज्य विधिमंडळ", "target": "pol-fr"},
                        {"name": "केंद्र-राज्य संबंध व आणीबाणी तरतुदी (३५२, ३५६, ३६०)", "target": "pol-fr"},
                        {"name": "स्थानिक स्वराज्य संस्था (७३ वी व ७४ वी घटनादुरुस्ती - पंचायतराज)", "target": "pol-fr"},
                        {"name": "संवैधानिक व वैधानिक संस्था (UPSC, MPSC, निवडणूक आयोग, CAG)", "target": "pol-fr"}
                    ]
                },
                {
                    "name": "४. भारतीय अर्थव्यवस्था (Economy)",
                    "id": "mpsc-eco",
                    "topics": [
                        {"name": "मूलभूत आर्थिक संकल्पना (GDP, GNP, NNP, दरडोई उत्पन्न)", "target": "eco-rbi"},
                        {"name": "महागाई (Inflation), चलनवाढ व CPI-WPI", "target": "eco-rbi"},
                        {"name": "बँकिंग व भारतीय रिझर्व्ह बँक (RBI - रेपो रेट, मौद्रिक साधने)", "target": "eco-rbi"},
                        {"name": "भांडवली बाजार, शेअर बाजार व SEBI", "target": "eco-rbi"},
                        {"name": "केंद्रीय अर्थसंकल्प (Budget) व कर प्रणाली (GST)", "target": "eco-rbi"},
                        {"name": "१९९१ चे नवीन आर्थिक धोरण (LPG सुधारणा)", "target": "eco-rbi"},
                        {"name": "कृषी, उद्योग, दारिद्र्य निर्मूलन व सरकारी कल्याणकारी योजना", "target": "eco-rbi"},
                        {"name": "महाराष्ट्राची अर्थव्यवस्था व पायाभूत सुविधा", "target": "eco-rbi"}
                    ]
                },
                {
                    "name": "५. सामान्य विज्ञान (General Science)",
                    "id": "mpsc-sci",
                    "topics": [
                        {"name": "भौतिकशास्त्र (गती, बल, कार्य, ऊर्जा, प्रकाश, ध्वनी, विद्युत)", "target": "sci-physics-motion"},
                        {"name": "रसायनशास्त्र (अणू रचना, आवर्तसारणी, आम्ल-आम्लारी, धातू-अधातू)", "target": "sci-physics-motion"},
                        {"name": "जीवशास्त्र (पेशी रचना, मानवी शरीर संस्था - पचन, रक्त, मज्जासंस्था)", "target": "sci-physics-motion"},
                        {"name": "आरोग्य, रोगशास्त्र, पोषण, जीवनसत्त्वे व लसीकरण", "target": "sci-physics-motion"}
                    ]
                },
                {
                    "name": "६. पर्यावरण व परिसंस्था (Environment)",
                    "id": "mpsc-env",
                    "topics": [
                        {"name": "परिसंस्था (Ecosystem), अन्नसाखळी व ऊर्जा मनोरा", "target": "geo-mh-phys"},
                        {"name": "जैवविविधता, हॉटस्पॉट्स व धोक्यात आलेल्या प्रजाती (Red Data Book)", "target": "geo-mh-phys"},
                        {"name": "प्रदूषण, जागतिक तापमानवाढ (Global Warming) व ओझोन स्तर", "target": "geo-mh-phys"},
                        {"name": "पर्यावरण संरक्षण कायदे (१९८६), राष्ट्रीय उद्याने व व्याघ्र प्रकल्प", "target": "geo-mh-phys"}
                    ]
                },
                {
                    "name": "७. चालू घडामोडी (Current Affairs)",
                    "id": "mpsc-ca",
                    "topics": [
                        {"name": "महाराष्ट्रातील, राष्ट्रीय व आंतरराष्ट्रीय महत्त्वाच्या घडामोडी", "target": "hist-reformers"},
                        {"name": "सरकारी योजना, नियुक्त्या, पुरस्कार व महत्त्वाचे निर्देशांक", "target": "hist-reformers"}
                    ]
                },
                {
                    "name": "८. मराठी भाषा व व्याकरण (Marathi)",
                    "id": "mpsc-mar",
                    "topics": [
                        {"name": "वर्णमाला (स्वर, स्वरादी, व्यंजने) व उच्चार स्थाने", "target": "mar-samas"},
                        {"name": "संधीचे प्रकार (स्वर, व्यंजन, विसर्ग संधी)", "target": "mar-samas"},
                        {"name": "शब्दांच्या ८ जाती (नाम, सर्वनाम, विशेषण, क्रियापद...)", "target": "mar-samas"},
                        {"name": "विभक्ती, काळ, प्रयोग व समास", "target": "mar-samas"},
                        {"name": "अलंकार, समानार्थी-विरुद्धार्थी शब्द, म्हणी व वाक्प्रचार", "target": "mar-samas"}
                    ]
                },
                {
                    "name": "९. इंग्रजी भाषा (English Grammar)",
                    "id": "mpsc-eng",
                    "topics": [
                        {"name": "Parts of Speech, Nouns, Pronouns, Adjectives", "target": "mar-samas"},
                        {"name": "Tenses & Subject-Verb Agreement", "target": "mar-samas"},
                        {"name": "Active & Passive Voice, Direct & Indirect Speech", "target": "mar-samas"},
                        {"name": "Vocabulary, Synonyms, Antonyms, Idioms & Phrases", "target": "mar-samas"}
                    ]
                },
                {
                    "name": "१०. बुद्धिमत्ता चाचणी / मानसिक क्षमता",
                    "id": "mpsc-reasoning",
                    "topics": [
                        {"name": "संख्या व अक्षर मालिका, नातेसंबंध, दिशा ज्ञान", "target": "reas-series"},
                        {"name": "दिनदर्शिका, घड्याळ, वेन आकृती, न्यायनिगम", "target": "reas-clock-cal"},
                        {"name": "तार्किक व गणितीय तर्कशक्ती, कोडी, बैठक व्यवस्था", "target": "reas-series"}
                    ]
                }
            ]
        }
    }

    # Generate JSON strings to inject into HTML
    mcqs_json = json.dumps(mcqs, ensure_ascii=False)
    lessons_json = json.dumps(lessons, ensure_ascii=False)
    mindmaps_json = json.dumps(mindmaps, ensure_ascii=False)
    syllabus_json = json.dumps(syllabus_tree, ensure_ascii=False)

    html_template = f"""<!DOCTYPE html>
<html lang="mr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RRB NTPC आणि MPSC महा-अकादमी | संपूर्ण अभ्यासक्रम, शिक्षक मार्गदर्शन व ५०० MCQs</title>
<style>
:root {{
  --primary: #1e3a8a;
  --primary-light: #3b82f6;
  --secondary: #059669;
  --accent: #d97706;
  --danger: #dc2626;
  --bg-main: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #475569;
  --border: #e2e8f0;
  --sidebar-w: 320px;
  --header-h: 70px;
  --font-base: 16px;
}}

body.dark-mode {{
  --primary: #60a5fa;
  --primary-light: #93c5fd;
  --secondary: #10b981;
  --accent: #f59e0b;
  --danger: #ef4444;
  --bg-main: #0b0f19;
  --bg-card: #131b2e;
  --text-main: #f1f5f9;
  --text-muted: #94a3b8;
  --border: #23304a;
}}

* {{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}}

body {{
  font-family: 'Segoe UI', -apple-system, 'Noto Sans Devanagari', 'Mangal', 'Nirmala UI', sans-serif;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-size: var(--font-base);
  line-height: 1.6;
  overflow-x: hidden;
}}

/* Header */
header.top-bar {{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-h);
  background: var(--bg-card);
  border-bottom: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}}

.logo-group {{
  display: flex;
  align-items: center;
  gap: 12px;
}}

.logo-group h1 {{
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary);
  display: flex;
  flex-direction: column;
}}

.logo-group span.sub {{
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
}}

.nav-tabs {{
  display: flex;
  gap: 8px;
}}

.nav-btn {{
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}}

.nav-btn.active, .nav-btn:hover {{
  background: var(--primary);
  color: #fff;
  border-color: var(--primary);
}}

.header-controls {{
  display: flex;
  align-items: center;
  gap: 10px;
}}

.search-box {{
  position: relative;
}}

.search-box input {{
  padding: 7px 14px 7px 34px;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  outline: none;
  font-size: 0.9rem;
  width: 220px;
  transition: width 0.3s;
}}

.search-box input:focus {{
  width: 300px;
  border-color: var(--primary);
}}

.search-icon {{
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 0.9rem;
}}

.icon-btn {{
  background: var(--bg-main);
  border: 1px solid var(--border);
  color: var(--text-main);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}}

/* Main Layout */
.app-container {{
  display: flex;
  margin-top: var(--header-h);
  min-height: calc(100vh - var(--header-h));
}}

/* Sidebar */
aside.sidebar {{
  width: var(--sidebar-w);
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  height: calc(100vh - var(--header-h));
  position: sticky;
  top: var(--header-h);
  overflow-y: auto;
  padding: 16px;
  flex-shrink: 0;
}}

.sidebar-title {{
  font-size: 1rem;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 2px solid var(--primary);
  color: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
}}

.subject-accordion {{
  margin-bottom: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}}

.acc-header {{
  background: var(--bg-main);
  padding: 10px 14px;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}}

.acc-header:hover {{
  background: rgba(59, 130, 246, 0.1);
}}

.acc-body {{
  padding: 6px 0;
  display: none;
  background: var(--bg-card);
}}

.acc-body.open {{
  display: block;
}}

.topic-link {{
  display: block;
  padding: 7px 16px;
  font-size: 0.88rem;
  color: var(--text-muted);
  text-decoration: none;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}}

.topic-link:hover, .topic-link.active {{
  color: var(--primary);
  background: rgba(59, 130, 246, 0.08);
  border-left-color: var(--primary);
  font-weight: 600;
}}

/* Main Content Area */
main.main-viewport {{
  flex-grow: 1;
  padding: 30px 40px;
  max-width: 1300px;
}}

.view-section {{
  display: none;
}}

.view-section.active {{
  display: block;
  animation: fadeIn 0.3s ease;
}}

@keyframes fadeIn {{
  from {{ opacity: 0; transform: translateY(6px); }}
  to {{ opacity: 1; transform: translateY(0); }}
}}

/* Teacher Classroom / Lessons Cards */
.teacher-banner {{
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0369a1 100%);
  color: white;
  padding: 24px 30px;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 10px 15px -3px rgba(30, 58, 138, 0.2);
}}

.teacher-banner h2 {{
  font-size: 1.6rem;
  margin-bottom: 8px;
}}

.teacher-banner p {{
  font-size: 1.05rem;
  opacity: 0.95;
}}

.lesson-card {{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 36px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}}

.lesson-header {{
  border-bottom: 2px solid var(--border);
  padding-bottom: 16px;
  margin-bottom: 24px;
}}

.lesson-badge {{
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.12);
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 8px;
}}

.lesson-title {{
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--text-main);
  margin-bottom: 10px;
}}

.teacher-voice {{
  background: rgba(217, 119, 6, 0.08);
  border-left: 4px solid var(--accent);
  padding: 14px 18px;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  margin-bottom: 24px;
  font-size: 1.02rem;
}}

.lesson-subheading {{
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary);
  margin: 24px 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}}

.lesson-content {{
  font-size: 1.02rem;
  line-height: 1.8;
}}

.lesson-content ul, .lesson-content ol {{
  padding-left: 24px;
  margin-bottom: 16px;
}}

.lesson-content li {{
  margin-bottom: 8px;
}}

.lesson-content table {{
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.95rem;
}}

.lesson-content th, .lesson-content td {{
  border: 1px solid var(--border);
  padding: 10px 14px;
  text-align: left;
}}

.lesson-content th {{
  background: var(--bg-main);
  color: var(--primary);
  font-weight: 700;
}}

.tip-box {{
  background: rgba(5, 150, 105, 0.08);
  border: 1px solid rgba(5, 150, 105, 0.3);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 18px 0;
}}

.warning-box {{
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 18px 0;
}}

/* Mind Maps Section */
.mindmap-container {{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}}

.mm-controls {{
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}}

.mm-select {{
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-weight: 600;
}}

.tree-view {{
  background: var(--bg-main);
  border-radius: 12px;
  padding: 24px;
  min-height: 480px;
  overflow-x: auto;
}}

.tree-node {{
  margin: 10px 0;
}}

.tree-label {{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s;
}}

.tree-root {{
  background: var(--primary);
  color: white;
  font-size: 1.15rem;
}}

.tree-branch {{
  background: var(--bg-card);
  color: var(--primary);
  border: 1px solid var(--primary-light);
  font-size: 1rem;
}}

.tree-leaf {{
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border);
  font-size: 0.9rem;
}}

.tree-leaf:hover {{
  background: rgba(5, 150, 105, 0.1);
  border-color: var(--secondary);
  color: var(--secondary);
}}

.tree-children {{
  margin-left: 28px;
  border-left: 2px dashed var(--border);
  padding-left: 16px;
}}

/* 500 MCQs CBT Test Center */
.mcq-dashboard {{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}}

.filter-bar {{
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}}

.filter-bar select, .filter-bar input {{
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-size: 0.95rem;
}}

.mode-toggle-group {{
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}}

.mode-btn {{
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  border: 2px solid var(--primary);
  background: transparent;
  color: var(--primary);
}}

.mode-btn.active {{
  background: var(--primary);
  color: white;
}}

/* CBT Exam Arena */
.exam-arena {{
  display: none;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
}}

.exam-arena.open {{
  display: block;
}}

.exam-header-bar {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 2px solid var(--border);
  margin-bottom: 20px;
}}

.timer-badge {{
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--danger);
  background: rgba(220, 38, 38, 0.1);
  padding: 6px 16px;
  border-radius: 8px;
}}

.mcq-item {{
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 18px;
  transition: transform 0.15s;
}}

.mcq-item:hover {{
  box-shadow: 0 4px 8px rgba(0,0,0,0.04);
}}

.q-header {{
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}}

.q-tag {{
  font-size: 0.8rem;
  font-weight: 700;
  background: var(--bg-main);
  padding: 4px 10px;
  border-radius: 12px;
  color: var(--text-muted);
}}

.q-text {{
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-main);
}}

.options-grid {{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 14px;
}}

@media (max-width: 768px) {{
  .options-grid {{
    grid-template-columns: 1fr;
  }}
  aside.sidebar {{
    display: none;
  }}
  main.main-viewport {{
    padding: 16px;
  }}
}}

.opt-btn {{
  text-align: left;
  padding: 12px 16px;
  border: 1px solid var(--border);
  background: var(--bg-main);
  border-radius: 8px;
  font-size: 0.98rem;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 10px;
}}

.opt-btn:hover:not(:disabled) {{
  background: rgba(59, 130, 246, 0.08);
  border-color: var(--primary);
}}

.opt-btn.correct {{
  background: #10b981 !important;
  color: white !important;
  border-color: #059669 !important;
  font-weight: 700;
}}

.opt-btn.wrong {{
  background: #ef4444 !important;
  color: white !important;
  border-color: #dc2626 !important;
}}

.opt-btn.selected-exam {{
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}}

.explanation-card {{
  display: none;
  background: rgba(5, 150, 105, 0.06);
  border-left: 4px solid var(--secondary);
  border-radius: 0 8px 8px 0;
  padding: 14px 18px;
  margin-top: 14px;
  font-size: 0.96rem;
}}

.explanation-card.show {{
  display: block;
}}

/* Scorecard Modal */
.modal-overlay {{
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  z-index: 2000;
  align-items: center;
  justify-content: center;
}}

.modal-overlay.open {{
  display: flex;
}}

.modal-card {{
  background: var(--bg-card);
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
}}

.score-circle {{
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 8px solid var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  font-size: 2rem;
  font-weight: 800;
  color: var(--secondary);
}}

.stat-grid {{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 24px 0;
  text-align: center;
}}

.stat-item {{
  background: var(--bg-main);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
}}

.stat-value {{
  font-size: 1.4rem;
  font-weight: 800;
}}

.btn-primary {{
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}}

.btn-secondary {{
  background: var(--bg-main);
  color: var(--text-main);
  border: 1px solid var(--border);
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}}
</style>
</head>
<body>

<!-- Header -->
<header class="top-bar">
  <div class="logo-group">
    <button class="icon-btn" onclick="toggleSidebar()" title="अनुक्रमणिका चालू/बंद">☰</button>
    <div>
      <h1>RRB NTPC आणि MPSC महा-अकादमी</h1>
      <span class="sub">🎯 एकच लक्ष्य - सरकारी नोकरी | सतत अभ्यास, योग्य दिशा आणि स्वतःवर विश्वास</span>
    </div>
  </div>

  <nav class="nav-tabs">
    <button class="nav-btn active" onclick="switchView('lessons')">📚 अध्यापन कक्ष</button>
    <button class="nav-btn" onclick="switchView('mindmaps')">🧠 माइंड मॅप्स</button>
    <button class="nav-btn" onclick="switchView('mcqs')">📝 ५०० MCQs परीक्षा केंद्र</button>
  </nav>

  <div class="header-controls">
    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input type="text" id="globalSearch" placeholder="कोणताही घटक शोधा..." oninput="handleSearch(this.value)">
    </div>
    <button class="icon-btn" onclick="adjustFontSize(-1)" title="अक्षरे लहान करा">A-</button>
    <button class="icon-btn" onclick="adjustFontSize(1)" title="अक्षरे मोठी करा">A+</button>
    <button class="icon-btn" onclick="toggleTheme()" title="थीम बदला">🌓</button>
  </div>
</header>

<div class="app-container">
  <!-- Left Sidebar Navigation -->
  <aside class="sidebar" id="appSidebar">
    <div class="sidebar-title">
      <span>📖 अभ्यासक्रम अनुक्रमणिका</span>
      <small style="color:var(--accent); font-weight:normal;">त्वरित नेव्हिगेशन</small>
    </div>
    <div id="syllabusMenu"></div>
  </aside>

  <!-- Main Viewport -->
  <main class="main-viewport">
    
    <!-- View 1: Detailed Lessons (अध्यापन कक्ष) -->
    <section id="lessonsView" class="view-section active">
      <div class="teacher-banner">
        <h2>गुरुवर्य कक्ष: प्रिय स्पर्धा परीक्षार्थी मित्रांनो, नमस्कार!</h2>
        <p>स्पर्धा परीक्षेचा मार्ग हा केवळ घोकंपट्टीचा नसून संकल्पनांचे अचूक आकलन, शॉर्टकट तंत्र आणि भरपूर सरावाचा आहे. खाली प्रत्येक घटकाचे सखोल विश्लेषण, सूत्रे, नियम आणि सोडवलेली उदाहरणे दिली आहेत. डावीकडील अनुक्रमणिकेतून तुम्हाला हवा असलेला घटक निवडा किंवा खाली स्क्रोल करा!</p>
      </div>

      <div id="lessonsContainer"></div>
    </section>

    <!-- View 2: Interactive Mind Maps (माइंड मॅप्स) -->
    <section id="mindmapsView" class="view-section">
      <div class="mindmap-container">
        <div class="mm-controls">
          <h2>🧠 संवादी माइंड मॅप दालन (Visual Revision Tree)</h2>
          <label for="mindmapSelect" style="font-weight:700; margin-left:auto;">विषय निवडा:</label>
          <select id="mindmapSelect" class="mm-select" onchange="renderSelectedMindmap()">
            <option value="math">गणित (Mathematics)</option>
            <option value="reasoning">सामान्य बुद्धिमत्ता व तर्कशक्ती</option>
            <option value="history">इतिहास व समाजसुधारक</option>
            <option value="geography">भूगोल (भारत व महाराष्ट्र)</option>
            <option value="polity">भारतीय राज्यघटना व राज्यव्यवस्था</option>
            <option value="economy">भारतीय अर्थव्यवस्था</option>
            <option value="science">सामान्य विज्ञान व पर्यावरण</option>
            <option value="marathi_lang">मराठी व्याकरण व भाषा</option>
          </select>
        </div>
        <p style="margin-bottom:16px; color:var(--text-muted);">
          💡 **शिक्षकांचा सल्ला:** कोणत्याही शाखेवर (Branch) क्लिक करून तुम्ही थेट त्या प्रकरणाच्या तपशीलवार अध्यापन कक्षात जाऊ शकता!
        </p>
        <div class="tree-view" id="mindmapTree"></div>
      </div>
    </section>

    <!-- View 3: 500 MCQs Practice & CBT Exam Center -->
    <section id="mcqsView" class="view-section">
      <div class="mcq-dashboard">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:12px;">
          <div>
            <h2>📝 ५०० बहुपर्यायी प्रश्नसंच व CBT परीक्षा केंद्र</h2>
            <p style="color:var(--text-muted);">RRB NTPC आणि MPSC च्या धर्तीवर तयार केलेले सर्वसमावेशक प्रश्न सविस्तर मराठी स्पष्टीकरणासह!</p>
          </div>
          <div class="mode-toggle-group">
            <button class="mode-btn active" id="btnStudyMode" onclick="setMode('study')">📖 सराव पद्धती (Study Mode)</button>
            <button class="mode-btn" id="btnExamMode" onclick="setMode('exam')">⏱️ परीक्षा पद्धती (Mock CBT Exam)</button>
          </div>
        </div>

        <div class="filter-bar">
          <select id="mcqSubjectFilter" onchange="filterMCQs()">
            <option value="ALL">सर्व विषय (All Subjects - 540 प्रश्न)</option>
            <option value="गणित (Mathematics)">गणित (Mathematics)</option>
            <option value="सामान्य बुद्धिमत्ता व तर्कशक्ती (Reasoning)">सामान्य बुद्धिमत्ता व तर्कशक्ती</option>
            <option value="इतिहास (History)">इतिहास (History)</option>
            <option value="भूगोल (Geography)">भूगोल (Geography)</option>
            <option value="राज्यघटना व राज्यव्यवस्था (Polity)">राज्यघटना व राज्यव्यवस्था</option>
            <option value="भारतीय अर्थव्यवस्था (Economy)">भारतीय अर्थव्यवस्था</option>
            <option value="सामान्य विज्ञान (General Science)">सामान्य विज्ञान</option>
            <option value="पर्यावरण व परिसंस्था (Environment)">पर्यावरण व परिसंस्था</option>
            <option value="मराठी व्याकरण व भाषा (Marathi)">मराठी व्याकरण व भाषा</option>
            <option value="इंग्रजी भाषा (English Grammar)">इंग्रजी भाषा (English)</option>
            <option value="सामान्य जागरूकता व रेल्वे (General Awareness)">सामान्य जागरूकता व रेल्वे</option>
            <option value="चालू घडामोडी (Current Affairs)">चालू घडामोडी (Current Affairs)</option>
          </select>

          <input type="text" id="mcqSearchInput" placeholder="प्रश्नात शब्द शोधा..." oninput="filterMCQs()" style="width:240px;">
          <span id="questionCountBadge" style="margin-left:auto; font-weight:700; color:var(--primary);">५४० पैकी ५४० प्रश्न उपलब्ध</span>
        </div>

        <!-- CBT Exam Control Bar -->
        <div id="cbtExamBar" style="display:none; background:var(--bg-main); padding:16px; border-radius:12px; margin-bottom:20px; border:1px solid var(--border);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div>
              <span style="font-weight:700;">वेळ: </span>
              <span class="timer-badge" id="examTimer">30:00</span>
            </div>
            <div style="display:flex; gap:10px;">
              <button class="btn-primary" onclick="submitExam()">🏁 चाचणी सबमिट करा</button>
              <button class="btn-secondary" onclick="resetExam()">🔄 नव्याने सुरू करा</button>
            </div>
          </div>
        </div>

        <!-- MCQ List -->
        <div id="mcqListContainer"></div>
      </div>
    </section>

  </main>
</div>

<!-- Scorecard Modal -->
<div class="modal-overlay" id="scoreModal">
  <div class="modal-card">
    <h2 style="text-align:center; color:var(--primary); margin-bottom:8px;">🏆 CBT परीक्षा निकाल व स्कोअरकार्ड</h2>
    <p style="text-align:center; color:var(--text-muted);">तुमच्या कामगिरीचे सविस्तर विश्लेषण</p>

    <div class="score-circle">
      <span id="finalScoreVal">०</span>
      <small style="font-size:0.8rem; color:var(--text-muted);">गुण</small>
    </div>

    <div class="stat-grid">
      <div class="stat-item">
        <div class="stat-value" id="statCorrect" style="color:var(--secondary);">०</div>
        <small>अचूक उत्तरे</small>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statWrong" style="color:var(--danger);">०</div>
        <small>चुकीची उत्तरे</small>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="statAccuracy" style="color:var(--accent);">०%</div>
        <small>अचूकता (Accuracy)</small>
      </div>
    </div>

    <div style="background:var(--bg-main); padding:14px; border-radius:10px; margin-bottom:20px; font-size:0.95rem;" id="teacherFeedback">
      <!-- Teacher comment generated dynamically -->
    </div>

    <div style="display:flex; justify-content:center; gap:12px;">
      <button class="btn-primary" onclick="closeScoreModal()">समीक्षा करा (Review Answers)</button>
      <button class="btn-secondary" onclick="window.print()">🖨️ स्कोअरकार्ड प्रिंट करा</button>
    </div>
  </div>
</div>

<script>
// Master Data Injected by Builder
const ALL_MCQS = {mcqs_json};
const ALL_LESSONS = {lessons_json};
const ALL_MINDMAPS = {mindmaps_json};
const SYLLABUS_TREE = {syllabus_json};

let currentMode = 'study'; // 'study' or 'exam'
let examTimerInterval = null;
let examTimeSeconds = 1800; // 30 mins default
let userAnswers = {{}}; // qid -> selectedIndex

// Initialization
document.addEventListener('DOMContentLoaded', () => {{
  renderSyllabusMenu();
  renderLessons();
  renderSelectedMindmap();
  renderMCQs(ALL_MCQS);
}});

// 1. Render Sidebar Syllabus Tree
function renderSyllabusMenu() {{
  const menu = document.getElementById('syllabusMenu');
  let html = '';

  for (const [sectionKey, sectionData] of Object.entries(SYLLABUS_TREE)) {{
    html += `
      <div style="margin-top:14px; margin-bottom:6px; font-weight:800; font-size:0.85rem; color:var(--accent); text-transform:uppercase;">
        ${{sectionData.badge}}
      </div>
    `;

    sectionData.subjects.forEach((sub, subIdx) => {{
      html += `
        <div class="subject-accordion">
          <div class="acc-header" onclick="toggleAcc('${{sectionKey}}-${{subIdx}}')">
            <span>${{sub.name}}</span>
            <span id="acc-arrow-${{sectionKey}}-${{subIdx}}">▼</span>
          </div>
          <div class="acc-body" id="acc-body-${{sectionKey}}-${{subIdx}}">
            ${{sub.topics.map(t => `
              <a href="#${{t.target}}" class="topic-link" onclick="jumpToTopic('${{t.target}}')">
                • ${{t.name}}
              </a>
            `).join('')}}
          </div>
        </div>
      `;
    }});
  }}
  menu.innerHTML = html;
}}

function toggleAcc(id) {{
  const body = document.getElementById(`acc-body-${{id}}`);
  const arrow = document.getElementById(`acc-arrow-${{id}}`);
  if (body.classList.contains('open')) {{
    body.classList.remove('open');
    arrow.textContent = '▼';
  }} else {{
    body.classList.add('open');
    arrow.textContent = '▲';
  }}
}}

function jumpToTopic(targetId) {{
  switchView('lessons');
  setTimeout(() => {{
    const el = document.getElementById(targetId);
    if (el) {{
      el.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
      el.style.outline = '2px solid var(--accent)';
      setTimeout(() => el.style.outline = 'none', 2000);
    }}
  }}, 100);
}}

// 2. Render Lessons
function renderLessons() {{
  const container = document.getElementById('lessonsContainer');
  let html = '';

  ALL_LESSONS.forEach(lesson => {{
    html += `
      <article class="lesson-card" id="${{lesson.id}}">
        <div class="lesson-header">
          <span class="lesson-badge">${{lesson.tag}}</span>
          <h2 class="lesson-title">${{lesson.title}}</h2>
          <div class="teacher-voice">
            👨‍🏫 <strong>गुरुवर्य मार्गदर्शन:</strong> "${{lesson.intro}}"
          </div>
        </div>

        <div class="lesson-content">
          ${{lesson.sections.map(sec => `
            <div class="lesson-subheading">${{sec.heading}}</div>
            <div>${{formatMarkdown(sec.content)}}</div>
          `).join('')}}
        </div>
      </article>
    `;
  }});

  container.innerHTML = html;
}}

// Simple Markdown to HTML Formatter
function formatMarkdown(text) {{
  if (!text) return '';
  let formatted = text
    .replace(/^### (.*$)/gim, '<h4 style="color:var(--primary); margin:12px 0 6px;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="color:var(--primary); margin:16px 0 8px;">$1</h3>')
    .replace(/^\\*\\*(.*?)\\*\\*/gim, '<strong>$1</strong>')
    .replace(/^\\*(.*?)\\*/gim, '<em>$1</em>')
    .replace(/\\n/g, '<br>')
    .replace(/<br><br>/g, '<br>');
  return formatted;
}}

// 3. Render Mind Maps
function renderSelectedMindmap() {{
  const select = document.getElementById('mindmapSelect');
  const key = select.value;
  const data = ALL_MINDMAPS[key];
  if (!data) return;

  const container = document.getElementById('mindmapTree');
  let html = `
    <div class="tree-node">
      <div class="tree-label tree-root">🌟 ${{data.root}}</div>
      <div class="tree-children">
        ${{data.children.map(branch => `
          <div class="tree-node">
            <div class="tree-label tree-branch">📂 ${{branch.name}}</div>
            <div class="tree-children">
              ${{branch.children.map(leaf => `
                <div class="tree-node">
                  <div class="tree-label tree-leaf" onclick="jumpToTopic('${{leaf.target}}')">
                    📌 ${{leaf.name}} ➜
                  </div>
                </div>
              `).join('')}}
            </div>
          </div>
        `).join('')}}
      </div>
    </div>
  `;

  container.innerHTML = html;
}}

// 4. MCQ System (Study & Exam Mode)
function renderMCQs(list) {{
  const container = document.getElementById('mcqListContainer');
  document.getElementById('questionCountBadge').textContent = `${{list.length}} पैकी ${{list.length}} प्रश्न उपलब्ध`;

  if (list.length === 0) {{
    container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-muted);">कोणताही प्रश्न आढळला नाही. कृपया फिल्टर बदला.</div>';
    return;
  }}

  let html = '';
  list.forEach((mcq, idx) => {{
    const selected = userAnswers[mcq.id];
    html += `
      <div class="mcq-item" id="mcq-card-${{mcq.id}}">
        <div class="q-header">
          <span class="q-tag">${{mcq.subject}} • ${{mcq.subtopic}}</span>
          <span style="font-weight:700; color:var(--text-muted);">प्रश्न क्र. ${{mcq.id}}</span>
        </div>
        <div class="q-text">${{mcq.q}}</div>
        <div class="options-grid">
          ${{mcq.options.map((opt, optIdx) => `
            <button class="opt-btn" id="opt-${{mcq.id}}-${{optIdx}}" onclick="handleOptionClick(${{mcq.id}}, ${{optIdx}}, ${{mcq.ans}})">
              <span style="font-weight:700;">${{String.fromCharCode(65 + optIdx)}}.</span> ${{opt}}
            </button>
          `).join('')}}
        </div>
        <div class="explanation-card" id="exp-${{mcq.id}}">
          <strong>💡 स्पष्टीकरण:</strong> ${{mcq.exp}}
        </div>
      </div>
    `;
  }});

  container.innerHTML = html;

  // Restore previously selected options if any
  for (const [qid, optIdx] of Object.entries(userAnswers)) {{
    const mcq = ALL_MCQS.find(m => m.id === parseInt(qid));
    if (mcq) {{
      highlightOption(parseInt(qid), optIdx, mcq.ans);
    }}
  }}
}}

function handleOptionClick(qid, optIdx, correctIdx) {{
  userAnswers[qid] = optIdx;

  if (currentMode === 'study') {{
    highlightOption(qid, optIdx, correctIdx);
    const exp = document.getElementById(`exp-${{qid}}`);
    if (exp) exp.classList.add('show');
  }} else {{
    // In Exam Mode, just mark as selected
    for (let i = 0; i < 4; i++) {{
      const b = document.getElementById(`opt-${{qid}}-${{i}}`);
      if (b) b.classList.remove('selected-exam');
    }}
    const chosenBtn = document.getElementById(`opt-${{qid}}-${{optIdx}}`);
    if (chosenBtn) chosenBtn.classList.add('selected-exam');
  }}
}}

function highlightOption(qid, optIdx, correctIdx) {{
  for (let i = 0; i < 4; i++) {{
    const b = document.getElementById(`opt-${{qid}}-${{i}}`);
    if (!b) continue;
    b.disabled = true;
    if (i === correctIdx) {{
      b.classList.add('correct');
    }} else if (i === optIdx && optIdx !== correctIdx) {{
      b.classList.add('wrong');
    }}
  }}
}}

function setMode(mode) {{
  currentMode = mode;
  document.getElementById('btnStudyMode').classList.toggle('active', mode === 'study');
  document.getElementById('btnExamMode').classList.toggle('active', mode === 'exam');

  const examBar = document.getElementById('cbtExamBar');
  if (mode === 'exam') {{
    examBar.style.display = 'block';
    startTimer();
  }} else {{
    examBar.style.display = 'none';
    clearInterval(examTimerInterval);
  }}

  // Re-render MCQs with mode behavior
  filterMCQs();
}}

function startTimer() {{
  clearInterval(examTimerInterval);
  examTimeSeconds = 1800; // 30 mins
  examTimerInterval = setInterval(() => {{
    examTimeSeconds--;
    if (examTimeSeconds <= 0) {{
      clearInterval(examTimerInterval);
      submitExam();
    }}
    const mins = Math.floor(examTimeSeconds / 60);
    const secs = examTimeSeconds % 60;
    document.getElementById('examTimer').textContent = 
      `${{String(mins).padStart(2, '0')}}:${{String(secs).padStart(2, '0')}}`;
  }}, 1000);
}}

function submitExam() {{
  clearInterval(examTimerInterval);

  let correct = 0;
  let wrong = 0;
  let totalAttempted = Object.keys(userAnswers).length;

  for (const [qid, chosen] of Object.entries(userAnswers)) {{
    const mcq = ALL_MCQS.find(m => m.id === parseInt(qid));
    if (mcq) {{
      if (chosen === mcq.ans) correct++;
      else wrong++;
    }}
  }}

  // Negative marking (1/3rd penalty for RRB/MPSC)
  const penalty = (wrong * 0.33).toFixed(2);
  const netScore = Math.max(0, (correct - penalty)).toFixed(2);
  const accuracy = totalAttempted > 0 ? ((correct / totalAttempted) * 100).toFixed(1) : 0;

  document.getElementById('finalScoreVal').textContent = netScore;
  document.getElementById('statCorrect').textContent = correct;
  document.getElementById('statWrong').textContent = wrong;
  document.getElementById('statAccuracy').textContent = `${{accuracy}}%`;

  let feedback = '';
  if (accuracy >= 80) {{
    feedback = '🌟 <strong>उत्कृष्ट कामगिरी!</strong> तुमची तयारी उत्कृष्ट दिशेने चालू आहे. असाच सराव चालू ठेवा, तुमचे मेरिट लिस्टमध्ये स्थान नक्की आहे!';
  }} else if (accuracy >= 50) {{
    feedback = '👍 <strong>चांगली कामगिरी!</strong> काही घटकांमध्ये अधिक उजळणीची गरज आहे. चुकलेल्या प्रश्नांची स्पष्टीकरणे नक्की वाचून घ्या!';
  }} else {{
    feedback = '⚠️ <strong>अधिक सरावाची गरज:</strong> आधी संकल्पना व सूत्रे पुन्हा वाचा आणि नंतर सराव चाचणी सोडवा.';
  }}
  document.getElementById('teacherFeedback').innerHTML = feedback;

  document.getElementById('scoreModal').classList.add('open');

  // Turn on study mode feedback to review answers
  currentMode = 'study';
  filterMCQs();
}}

function closeScoreModal() {{
  document.getElementById('scoreModal').classList.remove('open');
}}

function resetExam() {{
  userAnswers = {{}};
  startTimer();
  filterMCQs();
}}

function filterMCQs() {{
  const subject = document.getElementById('mcqSubjectFilter').value;
  const search = document.getElementById('mcqSearchInput').value.toLowerCase().trim();

  let filtered = ALL_MCQS;
  if (subject !== 'ALL') {{
    filtered = filtered.filter(m => m.subject === subject);
  }}
  if (search) {{
    filtered = filtered.filter(m => 
      m.q.toLowerCase().includes(search) || 
      m.subtopic.toLowerCase().includes(search) ||
      m.exp.toLowerCase().includes(search)
    );
  }}

  renderMCQs(filtered);
}}

// 5. Global Search & View Navigation
function switchView(viewName) {{
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

  if (viewName === 'lessons') {{
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
    document.getElementById('lessonsView').classList.add('active');
  }} else if (viewName === 'mindmaps') {{
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
    document.getElementById('mindmapsView').classList.add('active');
  }} else if (viewName === 'mcqs') {{
    document.querySelectorAll('.nav-btn')[2].classList.add('active');
    document.getElementById('mcqsView').classList.add('active');
  }}
  window.scrollTo({{ top: 0, behavior: 'smooth' }});
}}

function handleSearch(query) {{
  if (!query) return;
  const q = query.toLowerCase();
  // Jump to first matching lesson or trigger MCQ search
  const foundLesson = ALL_LESSONS.find(l => 
    l.title.toLowerCase().includes(q) || 
    l.subject.toLowerCase().includes(q)
  );
  if (foundLesson) {{
    jumpToTopic(foundLesson.id);
  }}
}}

// 6. Theme and Accessibility
function toggleTheme() {{
  document.body.classList.toggle('dark-mode');
}}

let currentFontSize = 16;
function adjustFontSize(delta) {{
  currentFontSize = Math.min(22, Math.max(13, currentFontSize + delta));
  document.documentElement.style.setProperty('--font-base', `${{currentFontSize}}px`);
}}

function toggleSidebar() {{
  const sb = document.getElementById('appSidebar');
  if (sb.style.display === 'none') {{
    sb.style.display = 'block';
  }} else {{
    sb.style.display = 'none';
  }}
}}
</script>

</body>
</html>
"""

    output_file = os.path.join(base_dir, "rrb_ntpc_mpsc_academy.html")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(html_template)

    print(f"Successfully generated master application at: {output_file}")
    print(f"File size: {os.path.getsize(output_file) / 1024:.2f} KB")

if __name__ == "__main__":
    run_build()
