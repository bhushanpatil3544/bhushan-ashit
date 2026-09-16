# -*- coding: utf-8 -*-
def get_mindmaps():
    return {
        "math": {
            "title": "गणित (Mathematics) माइंड मॅप",
            "root": "गणित (Mathematics)",
            "children": [
                {
                    "name": "१. अंकगणित (Arithmetic)",
                    "children": [
                        {"name": "संख्या पद्धती (नैसर्गिक, पूर्ण, मूळ, परिमेय)", "target": "math-num-sys"},
                        {"name": "BODMAS नियम व पदावली सरलीकरण", "target": "math-bodmas"},
                        {"name": "दशांश व अपूर्णांक (शांत, आवर्ती)", "target": "math-fractions"},
                        {"name": "लसावि (LCM) व मसावि (HCF)", "target": "math-lcm-hcf"},
                        {"name": "सरासरी व वय समस्या (Shortcuts)", "target": "math-avg-age"}
                    ]
                },
                {
                    "name": "२. व्यावसायिक गणित (Commercial Maths)",
                    "children": [
                        {"name": "टक्केवारी (Percentages & Base 100)", "target": "math-percentage"},
                        {"name": "नफा व तोटा (Profit & Loss, सूट)", "target": "math-profit-loss"},
                        {"name": "गुणोत्तर व प्रमाण (Ratio & Proportion)", "target": "math-ratio"},
                        {"name": "सरळव्याज (Simple Interest - SI)", "target": "math-si"},
                        {"name": "चक्रवाढ व्याज (Compound Interest Tricks)", "target": "math-ci"}
                    ]
                },
                {
                    "name": "३. गती, कार्य व वेळ (Speed, Time & Work)",
                    "children": [
                        {"name": "वेळ व काम (Time & Work - LCM Method)", "target": "math-time-work"},
                        {"name": "नळ आणि टाक्या (Pipes & Cisterns)", "target": "math-pipes"},
                        {"name": "वेळ, वेग व अंतर (रेल्वे, बोट व प्रवाह)", "target": "math-speed-dist"}
                    ]
                },
                {
                    "name": "४. प्रगत गणित (Advanced Maths)",
                    "children": [
                        {"name": "बीजगणित (Algebraic Formulae & Polynomials)", "target": "math-algebra"},
                        {"name": "भूमिती व त्रिकोणमिती (Geometry & Trigonometry)", "target": "math-geom-trig"},
                        {"name": "क्षेत्रमिती (2D परिमिती-क्षेत्रफळ, 3D घनफळ)", "target": "math-mensuration"},
                        {"name": "सांख्यिकी, DI व संभाव्यता (Mean, Median, Probability)", "target": "math-stats-prob"}
                    ]
                }
            ]
        },
        "reasoning": {
            "title": "सामान्य बुद्धिमत्ता व तर्कशक्ती Mind Map",
            "root": "तर्कशक्ती (Reasoning)",
            "children": [
                {
                    "name": "१. शाब्दिक तर्क (Verbal Reasoning)",
                    "children": [
                        {"name": "समानता व वर्गीकरण (Analogy & Classification)", "target": "reas-analogy"},
                        {"name": "संख्या व अक्षर मालिका (Series Patterns)", "target": "reas-series"},
                        {"name": "संकेतन व संकेतभेदन (Coding-Decoding Tricks)", "target": "reas-coding"},
                        {"name": "रक्तसंबंध (Family Tree Diagrams)", "target": "reas-blood"},
                        {"name": "दिशा निर्देश व पायथागोरस सिद्धांत", "target": "reas-direction"}
                    ]
                },
                {
                    "name": "२. विश्लेषणात्मक तर्क (Analytical Reasoning)",
                    "children": [
                        {"name": "वेन आकृती व सिलॉजिझम (Syllogism Rules)", "target": "reas-syllogism"},
                        {"name": "बैठक व्यवस्था (Linear & Circular Arrangements)", "target": "reas-seating"},
                        {"name": "विधान व निष्कर्ष, विधाने व गृहीतके", "target": "reas-statements"},
                        {"name": "माहितीची पर्याप्तता (Data Sufficiency)", "target": "reas-data-suff"}
                    ]
                },
                {
                    "name": "३. कालगणना व अशाब्दिक (Time & Non-Verbal)",
                    "children": [
                        {"name": "दिनदर्शिका (Calendar - Odd Days Trick)", "target": "reas-calendar"},
                        {"name": "घड्याळ (Clock Angles & Coincidence)", "target": "reas-clock"},
                        {"name": "आरसा व पाण्यातील प्रतिमा (Mirror & Water Images)", "target": "reas-mirror"},
                        {"name": "कागद घडी, कापणे व आकृत्या पूर्ण करणे", "target": "reas-paper"}
                    ]
                }
            ]
        },
        "history": {
            "title": "इतिहास (History) माइंड मॅप",
            "root": "इतिहास (History)",
            "children": [
                {
                    "name": "१. प्राचीन व मध्ययुगीन भारत",
                    "children": [
                        {"name": "सिंधू संस्कृती (हडप्पा, मोहेंजोदडो, लोथल)", "target": "hist-ancient"},
                        {"name": "वैदिक काळ, बौद्ध धर्म व जैन धर्म", "target": "hist-vedic"},
                        {"name": "मौर्य साम्राज्य (चंद्रगुप्त, सम्राट अशोक)", "target": "hist-maurya"},
                        {"name": "दिल्ली सल्तनत, मुघल साम्राज्य व भक्ती चळवळ", "target": "hist-medieval"}
                    ]
                },
                {
                    "name": "२. मराठा साम्राज्य व स्वराज्य",
                    "children": [
                        {"name": "छत्रपती शिवाजी महाराज (स्वराज्य, अष्टप्रधान मंडळ)", "target": "hist-shivaji"},
                        {"name": "छत्रपती संभाजी महाराज व मराठा स्वातंत्र्य लढा", "target": "hist-sambhajiraje"},
                        {"name": "पेशवे काळ व अटकेपार साम्राज्य विस्तार", "target": "hist-peshwe"}
                    ]
                },
                {
                    "name": "३. आधुनिक भारत व स्वातंत्र्य लढा",
                    "children": [
                        {"name": "ब्रिटिश राजवट व १८५७ चा राष्ट्रीय उठाव", "target": "hist-1857"},
                        {"name": "भारतीय राष्ट्रीय काँग्रेस (स्थापना १८८५, मवाळ-जहाल)", "target": "hist-inc"},
                        {"name": "गांधी युग (असहकार, सविनय कायदेभंग, चले जाव)", "target": "hist-gandhi"},
                        {"name": "क्रांतिकारी चळवळ व सुभाषचंद्र बोस", "target": "hist-revolutionaries"}
                    ]
                },
                {
                    "name": "४. महाराष्ट्रातील समाजसुधारक",
                    "children": [
                        {"name": "महात्मा जोतीराव फुले व सावित्रीबाई फुले (सत्यशोधक समाज)", "target": "hist-phule"},
                        {"name": "राजर्षी छत्रपती शाहू महाराज (आरक्षण, प्राथमिक शिक्षण)", "target": "hist-shahu"},
                        {"name": "डॉ. बाबासाहेब आंबेडकर (दलित मुक्ती लढा, महाड)", "target": "hist-ambedkar"},
                        {"name": "लोकमान्य टिळक, गोपाळ गणेश आगरकर, महर्षी कर्वे", "target": "hist-reformers"},
                        {"name": "संयुक्त महाराष्ट्र चळवळ (१०६ हुतात्मे, १ मे १९६०)", "target": "hist-sanyukta-mh"}
                    ]
                }
            ]
        },
        "polity": {
            "title": "भारतीय राज्यघटना व राज्यव्यवस्था Mind Map",
            "root": "राज्यघटना (Constitution)",
            "children": [
                {
                    "name": "१. मूलभूत चौकट",
                    "children": [
                        {"name": "घटना निर्मिती, घटना परिषद व मसुदा समिती", "target": "pol-making"},
                        {"name": "सरनामा (Preamble - ४२ वी घटनादुरुस्ती)", "target": "pol-preamble"},
                        {"name": "मूलभूत अधिकार (कलम १२ ते ३५ - ६ मूलभूत हक्क)", "target": "pol-fr"},
                        {"name": "मार्गदर्शक तत्त्वे (DPSP कलम ३६-५१) व कर्तव्ये (५१A)", "target": "pol-dpsp"}
                    ]
                },
                {
                    "name": "२. केंद्रीय शासन",
                    "children": [
                        {"name": "राष्ट्रपती व उपराष्ट्रपती (कलम ५२-७३, महाभियोग)", "target": "pol-president"},
                        {"name": "पंतप्रधान व केंद्रीय मंत्रिमंडळ (कलम ७४-७५)", "target": "pol-pm"},
                        {"name": "संसद (लोकसभा, राज्यसभा, विधेयक मंजुरी प्रक्रिया)", "target": "pol-parliament"},
                        {"name": "सर्वोच्च न्यायालय (कलम १२४-१४७, मूलभूत चौकटीचे रक्षक)", "target": "pol-judiciary"}
                    ]
                },
                {
                    "name": "३. राज्य शासन व स्थानिक स्वराज्य",
                    "children": [
                        {"name": "राज्यपाल, मुख्यमंत्री व राज्य विधिमंडळ", "target": "pol-state-gov"},
                        {"name": "उच्च न्यायालय व दुय्यम न्यायालये", "target": "pol-high-court"},
                        {"name": "७३ वी घटनादुरुस्ती (ग्रामपंचायत, पं. समिती, जि. परिषद)", "target": "pol-panchayat"},
                        {"name": "७४ वी घटनादुरुस्ती (नगरपालिका, मनपा व नागरी संस्था)", "target": "pol-municipality"}
                    ]
                },
                {
                    "name": "४. घटनात्मक आयोग व दुरुस्त्या",
                    "children": [
                        {"name": "निवडणूक आयोग (३२४), UPSC/MPSC (३१५), CAG (१४८)", "target": "pol-commissions"},
                        {"name": "आणीबाणी तरतुदी (राष्ट्रीय ३५२, राज्य ३५६, आर्थिक ३६०)", "target": "pol-emergency"},
                        {"name": "महत्त्वाच्या घटनादुरुस्त्या (४२ वी, ४४ वी, ७३ वी, ८६ वी, १०१ वी)", "target": "pol-amendments"}
                    ]
                }
            ]
        },
        "geography": {
            "title": "भूगोल (Geography) माइंड मॅप",
            "root": "भूगोल (Geography)",
            "children": [
                {
                    "name": "१. प्राकृतिक भूगोल (Physical)",
                    "children": [
                        {"name": "पृथ्वीची रचना, अक्षवृत्त व रेखावृत्त, गती", "target": "geo-physical"},
                        {"name": "खडक (अग्निज, गाळाचे, रूपांतरित) व भूरूपे", "target": "geo-landforms"},
                        {"name": "वातावरण, वारे, हवेचा दाब व पर्जन्य प्रकार", "target": "geo-climate"}
                    ]
                },
                {
                    "name": "२. भारताचा भूगोल",
                    "children": [
                        {"name": "प्राकृतिक विभाग (हिमालय, मैदान, द्वीपकल्प)", "target": "geo-india-phys"},
                        {"name": "नदीप्रणाली (सिंधू, गंगा, ब्रह्मपुत्रा, गोदावरी, नर्मदा)", "target": "geo-india-rivers"},
                        {"name": "हवामान, मान्सूनची निर्मिती, मृदा व शेती", "target": "geo-india-agri"},
                        {"name": "खनिजे, ऊर्जा साधने व प्रमुख उद्योग", "target": "geo-india-minerals"}
                    ]
                },
                {
                    "name": "३. महाराष्ट्राचा भूगोल",
                    "children": [
                        {"name": "स्थान, विस्तार (७२°६०' ते ८०°९' पू.), सीमा व जिल्हे", "target": "geo-mh-loc"},
                        {"name": "सह्याद्री (कळसुबाई १६४६ मी), कोकण व दख्खन पठार", "target": "geo-mh-phys"},
                        {"name": "महाराष्ट्रातील नद्या (गोदावरी, भीमा, कृष्णा, तापी)", "target": "geo-mh-rivers"},
                        {"name": "हवामान, काळी कापसाची मृदा (रेगूर), वने व अभयारण्ये", "target": "geo-mh-forests"}
                    ]
                }
            ]
        },
        "economy": {
            "title": "भारतीय अर्थव्यवस्था Mind Map",
            "root": "अर्थव्यवस्था (Economics)",
            "children": [
                {
                    "name": "१. पायाभूत संकल्पना व राष्ट्रीय उत्पन्न",
                    "children": [
                        {"name": "GDP, GNP, NNP, दरडोई उत्पन्न गणना", "target": "eco-gdp"},
                        {"name": "अर्थव्यवस्थेचे क्षेत्र (प्राथमिक, द्वितीयक, तृतीयक)", "target": "eco-sectors"},
                        {"name": "महागाई (Inflation - CPI, WPI, महागाई निर्देशांक)", "target": "eco-inflation"}
                    ]
                },
                {
                    "name": "२. बँकिंग व वित्त",
                    "children": [
                        {"name": "भारतीय रिझर्व्ह बँक (RBI - रेपो रेट, रिव्हर्स रेपो, CRR, SLR)", "target": "eco-rbi"},
                        {"name": "व्यापारी बँका, NPA व डिजिटल बँकिंग क्रांती", "target": "eco-banking"},
                        {"name": "भांडवली बाजार, शेअर बाजार व SEBI नियामक संस्था", "target": "eco-market"}
                    ]
                },
                {
                    "name": "३. सार्वजनिक वित्त व धोरणे",
                    "children": [
                        {"name": "केंद्रीय अर्थसंकल्प व वित्तीय तूट (Fiscal Deficit)", "target": "eco-budget"},
                        {"name": "कर प्रणाली (प्रत्यक्ष व अप्रत्यक्ष कर, GST १ जुलै २०१७)", "target": "eco-taxation"},
                        {"name": "१९९१ चे आर्थिक धोरण (LPG - उदारीकरण, खाजगीकरण, जागतिकीकरण)", "target": "eco-lpg"},
                        {"name": "सरकारी कल्याणकारी योजना व दारिद्र्य निर्मूलन", "target": "eco-schemes"}
                    ]
                }
            ]
        },
        "science": {
            "title": "सामान्य विज्ञान व पर्यावरण Mind Map",
            "root": "सामान्य विज्ञान व पर्यावरण",
            "children": [
                {
                    "name": "१. भौतिकशास्त्र (Physics)",
                    "children": [
                        {"name": "गती, न्यूटनचे ३ नियम व गुरुत्वाकर्षण (G व g)", "target": "sci-physics-motion"},
                        {"name": "कार्य, ऊर्जा (गतिज व स्थितिज) व शक्ती", "target": "sci-physics-energy"},
                        {"name": "प्रकाश (परावर्तन, अपवर्तन, भिंगे, दृष्टिदोष) व ध्वनी", "target": "sci-physics-light"},
                        {"name": "विद्युतधारा, ओहमचा नियम, रोध व चुंबकत्व", "target": "sci-physics-elec"}
                    ]
                },
                {
                    "name": "२. रसायनशास्त्र (Chemistry)",
                    "children": [
                        {"name": "द्रव्य, अणूची रचना (इलेक्ट्रॉन, प्रोटॉन, न्यूट्रॉन)", "target": "sci-chem-atoms"},
                        {"name": "आधुनिक आवर्तसारणी (हेन्री मोस्ले, १८ गण, ७ आवर्त)", "target": "sci-chem-periodic"},
                        {"name": "आम्ल, आम्लारी व pH पट्टी (Acids, Bases & Salts)", "target": "sci-chem-acid"},
                        {"name": "धातू, अधातू व दैनंदिन जीवनातील संयुगे", "target": "sci-chem-metals"}
                    ]
                },
                {
                    "name": "३. जीवशास्त्र व आरोग्य (Biology & Health)",
                    "children": [
                        {"name": "पेशी रचना (प्राणी व वनस्पती पेशी, अंगके)", "target": "sci-bio-cell"},
                        {"name": "मानवी संस्था (पचनसंस्था, रक्ताभिसरण, मेंदू)", "target": "sci-bio-systems"},
                        {"name": "अन्न, पोषण, जीवनसत्त्वे (A, B-Complex, C, D, E, K)", "target": "sci-bio-nutrition"},
                        {"name": "रोगशास्त्र (जिवाणू, विषाणू, कवकजन्य रोग व लसीकरण)", "target": "sci-bio-diseases"}
                    ]
                },
                {
                    "name": "४. पर्यावरण व परिसंस्था (Environment)",
                    "children": [
                        {"name": "परिसंस्था (Ecosystem), अन्नसाखळी व ऊर्जा मनोरा", "target": "env-ecosystem"},
                        {"name": "जैवविविधता, हॉटस्पॉट्स व IUCN रेड डाटा बुक", "target": "env-biodiv"},
                        {"name": "प्रदूषण, जागतिक तापमानवाढ (Global Warming) व ओझोन स्तर", "target": "env-pollution"},
                        {"name": "पर्यावरण संरक्षण कायदे (१९८६), राष्ट्रीय उद्याने व प्रकल्प", "target": "env-acts"}
                    ]
                }
            ]
        },
        "marathi_lang": {
            "title": "मराठी व्याकरण Mind Map",
            "root": "मराठी भाषा व व्याकरण",
            "children": [
                {
                    "name": "१. वर्णविचार व शब्दविचार",
                    "children": [
                        {"name": "वर्णमाला (स्वर, स्वरादी, व्यंजने) व उच्चारस्थाने", "target": "mar-alphabets"},
                        {"name": "संधीचे प्रकार (स्वरसंधी, व्यंजनसंधी, विसर्गसंधी)", "target": "mar-sandhi"},
                        {"name": "शब्दांच्या ८ जाती (विकारी व अविकारी शब्द)", "target": "mar-parts-speech"}
                    ]
                },
                {
                    "name": "२. वाक्यरचना, विभक्ती व समास",
                    "children": [
                        {"name": "विभक्ती व सामान्यरूप (प्रथमा ते संबोधन, कारकार्थ)", "target": "mar-cases"},
                        {"name": "काळ व काळांचे उपप्रकार (वर्तमान, भूत, भविष्य)", "target": "mar-tenses"},
                        {"name": "प्रयोग (कर्तरी, कर्मणी व भावे प्रयोग - ओळखण्याची ट्रिक)", "target": "mar-prayog"},
                        {"name": "समास (अव्ययीभाव, तत्पुरुष, द्वंद्व, बहुव्रीही समास)", "target": "mar-samas"}
                    ]
                },
                {
                    "name": "३. शब्दसंग्रह व साहित्य",
                    "children": [
                        {"name": "अलंकार (शब्दालंकार व अर्थालंकार)", "target": "mar-alankar"},
                        {"name": "समानार्थी, विरुद्धार्थी शब्द, म्हणी व वाक्प्रचार", "target": "mar-vocab"},
                        {"name": "शुद्धलेखन नियम, वाक्यशुद्धी व उतारा आकलन", "target": "mar-comprehension"}
                    ]
                }
            ]
        }
    }
