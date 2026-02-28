"""Rich astrological interpretations for planetary placements, aspects, and sign pairings."""

# ──────────────────────────────────────────────────────────────────────
#  PLANET-IN-SIGN INTERPRETATIONS
#  Each planet has a unique meaning in each of the 12 zodiac signs.
# ──────────────────────────────────────────────────────────────────────

PLANET_MEANINGS = {
    "sun": {
        "_role": "Your core identity and life force",
        "aries": "A born initiator with fierce independence. You lead with courage and thrive on challenge, bringing raw energy to everything you pursue.",
        "taurus": "Grounded and steadfast, you build security through patience. Your strength lies in unwavering determination and deep appreciation for life's pleasures.",
        "gemini": "Quick-witted and endlessly curious, you process the world through communication. Your adaptability is your superpower, though focus can be elusive.",
        "cancer": "Deeply intuitive and emotionally intelligent, you lead with your heart. Your nurturing instinct creates safe harbors for everyone in your orbit.",
        "leo": "Radiant and generous, you carry natural magnetism. Your creative spirit and warm heart draw others in, and you shine brightest when uplifting those around you.",
        "virgo": "Analytical and service-oriented, you find purpose in refinement. Your keen eye for detail and genuine desire to help make you indispensable.",
        "libra": "Diplomatic and aesthetically attuned, you seek harmony in all things. Your gift for seeing multiple perspectives makes you a natural bridge-builder.",
        "scorpio": "Intense and perceptive, you experience life at its deepest frequencies. Your transformative power comes from an unflinching willingness to face truth.",
        "sagittarius": "Adventurous and philosophically driven, you chase meaning across horizons. Your optimism and hunger for truth inspire everyone you encounter.",
        "capricorn": "Ambitious and disciplined, you play the long game. Your quiet authority and strategic mind build legacies that stand the test of time.",
        "aquarius": "Visionary and independent, you think in systems and futures. Your humanitarian instinct drives innovation that serves the collective.",
        "pisces": "Empathic and creatively boundless, you dissolve barriers between souls. Your intuitive wisdom connects you to currents most people can't perceive.",
    },
    "moon": {
        "_role": "Your emotional nature and inner world",
        "aries": "Your emotions are quick and fiery. You process feelings through action and need independence in your emotional life. You recover from setbacks remarkably fast.",
        "taurus": "Emotionally steady and comfort-seeking, you need stability to feel safe. Your feelings run deep and constant like an underground river.",
        "gemini": "You process emotions through words and ideas. Your mood shifts with your mental landscape, and you need intellectual stimulation to feel emotionally alive.",
        "cancer": "The moon is at home here, amplifying your emotional depth. You feel everything intensely and your instinct to nurture is profound and genuine.",
        "leo": "Warm-hearted and emotionally expressive, you need to feel seen and appreciated. Your generosity of spirit comes from genuine emotional abundance.",
        "virgo": "You process emotions through analysis and practical action. Helping others is how you show love, and you feel most secure when life is organized.",
        "libra": "Harmony is your emotional baseline. You feel unsettled by conflict and gravitate toward beauty and balanced relationships to restore your inner peace.",
        "scorpio": "Your emotional world is profound and complex. You feel with extraordinary intensity and have an uncanny ability to sense what lies beneath the surface.",
        "sagittarius": "Emotionally optimistic and freedom-loving, you process feelings through exploration and philosophy. You bounce back from emotional lows with remarkable resilience.",
        "capricorn": "Emotionally reserved but deeply loyal, you show love through commitment and reliability. Your feelings mature and deepen beautifully over time.",
        "aquarius": "Your emotional nature is unconventional and independent. You process feelings through the lens of the collective, and you need space to feel free.",
        "pisces": "Boundlessly empathic, you absorb the emotional atmosphere around you. Your compassion is oceanic, but you must learn to protect your sensitive inner world.",
    },
    "rising": {
        "_role": "Your outward persona and first impression",
        "aries": "You come across as bold, direct, and energizing. People see a natural leader with an unmistakable spark of vitality and competitive drive.",
        "taurus": "Your presence is calm, grounded, and reassuring. Others see someone reliable and aesthetically refined, with an earthy magnetism that puts people at ease.",
        "gemini": "You appear quick, communicative, and mentally alive. First impressions paint you as sociable and witty, always ready with an interesting observation.",
        "cancer": "You project warmth, sensitivity, and protective energy. Others sense your emotional intelligence immediately and feel safe in your presence.",
        "leo": "Your entrance commands attention without trying. People see confidence, warmth, and creative flair — a natural performer with genuine heart.",
        "virgo": "You come across as thoughtful, precise, and quietly competent. Others see someone who notices everything and cares about getting things right.",
        "libra": "Graceful and socially polished, you make elegant first impressions. People see charm, fairness, and an eye for beauty that's hard to miss.",
        "scorpio": "Your presence carries intensity and mystery. Others sense depth and power beneath a controlled exterior — you're magnetic without trying.",
        "sagittarius": "You radiate enthusiasm and openness. People see an adventurer, a philosopher, someone who makes the world feel bigger and more exciting.",
        "capricorn": "Your first impression is one of quiet authority and composure. Others see ambition, maturity, and a dry wit that reveals itself over time.",
        "aquarius": "You come across as unique, forward-thinking, and refreshingly honest. People sense an independent mind that doesn't follow the crowd.",
        "pisces": "Ethereal and gentle, your presence has a dreamy quality. Others see empathy, creativity, and a mysterious depth that draws them in.",
    },
    "mercury": {
        "_role": "How you think and communicate",
        "aries": "Your mind is fast, decisive, and direct. You think in bold strokes and communicate with a straightforwardness that cuts through noise.",
        "taurus": "Your thinking is methodical and practical. You take time to form opinions but once set, your ideas are rock-solid and well-reasoned.",
        "gemini": "Mercury is at home here, giving you a brilliantly agile mind. You juggle ideas effortlessly and communicate with infectious wit and versatility.",
        "cancer": "You think with your heart as much as your head. Your communication style is emotionally intelligent, intuitive, and protective of those you love.",
        "leo": "Your communication style is dramatic, creative, and warm. You express ideas with flair and have a gift for inspiring others with your vision.",
        "virgo": "Mercury thrives here, giving you a razor-sharp analytical mind. Your communication is precise, helpful, and grounded in practical reality.",
        "libra": "Your mind naturally weighs all sides of every question. You communicate diplomatically and have a gift for articulating nuance and fairness.",
        "scorpio": "Your mind penetrates beneath the surface. You think strategically, communicate with intention, and have an uncanny ability to detect deception.",
        "sagittarius": "Your mind roams freely across big ideas and distant horizons. You communicate with enthusiasm and have a gift for making complex concepts accessible.",
        "capricorn": "Your thinking is structured, strategic, and goal-oriented. You communicate with authority and your words carry the weight of careful consideration.",
        "aquarius": "Your mind operates on a different wavelength — innovative, systemic, and ahead of its time. You communicate ideas that challenge conventional thinking.",
        "pisces": "Your thinking is intuitive, imaginative, and nonlinear. You communicate through imagery and metaphor, often understanding things before you can explain them.",
    },
    "venus": {
        "_role": "How you love and what you value",
        "aries": "You love boldly and chase what you want. In romance, you're passionate and direct — you need excitement and someone who matches your fire.",
        "taurus": "You love deeply, sensually, and devotedly. You express affection through physical presence and need a partner who values loyalty and comfort.",
        "gemini": "You're attracted to minds first. Your love language is conversation, and you need intellectual stimulation and variety to keep your heart engaged.",
        "cancer": "You love with tender devotion and deep emotional investment. You need emotional security and express affection through nurturing care.",
        "leo": "You love grandly and generously. Romance should feel like a celebration, and you need a partner who appreciates your warm, dramatic heart.",
        "virgo": "You show love through acts of service and thoughtful attention. You're devoted but discerning, and you need a partner who values your quiet dedication.",
        "libra": "Venus is at home here, giving you a gift for love and beauty. You crave partnership and express affection through harmony, grace, and fairness.",
        "scorpio": "You love with consuming intensity and total commitment. Surface-level connections bore you — you need a bond that transforms both souls.",
        "sagittarius": "You love freedom within love. You're attracted to adventurous spirits and express affection through shared experiences and philosophical connection.",
        "capricorn": "You love with mature devotion and long-term vision. Your affection grows stronger over time, and you show love through loyalty and building together.",
        "aquarius": "You love unconventionally and need a partner who respects your independence. Your affection flows through friendship, shared ideals, and intellectual kinship.",
        "pisces": "Venus is exalted here, giving you a capacity for transcendent love. You love selflessly and see the divine in your partner, sometimes beyond what's really there.",
    },
    "mars": {
        "_role": "Your drive, passion, and how you take action",
        "aries": "Mars is at home here, giving you explosive drive and courage. You act decisively, compete fiercely, and tackle obstacles head-on.",
        "taurus": "Your drive is steady, persistent, and unstoppable once set in motion. You take action slowly but with the force of tectonic plates.",
        "gemini": "Your energy is versatile and mentally directed. You fight with words, juggle multiple pursuits, and use wit as your primary weapon.",
        "cancer": "Your drive is emotionally fueled and protective. You're fiercest when defending your loved ones and take action guided by deep instinct.",
        "leo": "Your drive is bold, creative, and commanding. You take action with dramatic flair and are motivated by recognition and the desire to create.",
        "virgo": "Your energy is precise, methodical, and service-oriented. You tackle problems systematically and your drive is channeled through productive improvement.",
        "libra": "Your drive is activated by injustice and the desire for balance. You take action diplomatically but can be surprisingly assertive when fairness demands it.",
        "scorpio": "Mars is powerful here, giving you intense willpower and strategic depth. Your determination is legendary, and you pursue goals with focused intensity.",
        "sagittarius": "Your drive is fueled by idealism and the hunger for expansion. You take bold action toward your visions and inspire others to follow.",
        "capricorn": "Mars is exalted here, giving you disciplined ambition. Your drive is strategic, patient, and relentless — you achieve through sheer endurance.",
        "aquarius": "Your drive is directed toward innovation and collective progress. You take action in unconventional ways and fight for causes bigger than yourself.",
        "pisces": "Your drive operates on intuition and compassion. You take action when inspired and your motivation flows from a deep desire to heal and create.",
    },
    "jupiter": {
        "_role": "Where you find growth and good fortune",
        "aries": "You grow through bold initiative and pioneering new paths. Fortune favors your courage, and you expand most when leading the charge.",
        "taurus": "You grow through patience and building material security. Fortune blesses your steady investments of time, energy, and resources.",
        "gemini": "You grow through learning, communication, and connecting ideas. Fortune comes through your social network and intellectual curiosity.",
        "cancer": "You grow through emotional wisdom and nurturing bonds. Fortune favors your home life and your capacity to create belonging.",
        "leo": "You grow through creative expression and generous leadership. Fortune shines when you share your gifts openly and authentically.",
        "virgo": "You grow through service, skill-building, and attention to detail. Fortune rewards your dedication to craft and helping others.",
        "libra": "You grow through partnerships and the pursuit of justice. Fortune favors your diplomatic approach and your eye for beauty.",
        "scorpio": "You grow through profound transformation and facing the depths. Fortune comes when you embrace change and trust your instincts.",
        "sagittarius": "Jupiter is at home here, amplifying your wisdom and wanderlust. Fortune favors your philosophical nature and love of adventure.",
        "capricorn": "You grow through discipline and long-term achievement. Fortune rewards your patience and your ability to build enduring structures.",
        "aquarius": "You grow through innovation and humanitarian vision. Fortune favors your progressive ideas and your commitment to collective progress.",
        "pisces": "Jupiter is exalted here, blessing you with spiritual depth and compassion. Fortune flows through your empathy and creative imagination.",
    },
    "saturn": {
        "_role": "Your lessons, discipline, and areas of mastery",
        "aries": "Your life lesson is learning patience with your impulses. Mastery comes through channeling your fire with strategic discipline.",
        "taurus": "Your lesson centers on flexibility within stability. Mastery comes through knowing when to hold firm and when to release attachment.",
        "gemini": "Your lesson is depth of focus amid mental abundance. Mastery comes through committing to ideas long enough to see them bear fruit.",
        "cancer": "Your lesson involves emotional boundaries and resilience. Mastery comes through learning that vulnerability and strength coexist beautifully.",
        "leo": "Your lesson is authentic confidence without external validation. Mastery comes through creating from your heart regardless of applause.",
        "virgo": "Your lesson is self-compassion amid high standards. Mastery comes through accepting imperfection as part of the human journey.",
        "libra": "Your lesson is decisive independence within partnership. Mastery comes through making choices that honor yourself as much as others.",
        "scorpio": "Your lesson is trust and releasing control. Mastery comes through surrendering to transformation rather than resisting it.",
        "sagittarius": "Your lesson is commitment and follow-through. Mastery comes through grounding your grand visions in practical, sustained effort.",
        "capricorn": "Saturn is at home here, intensifying ambition and discipline. Your mastery comes through building something meaningful, step by careful step.",
        "aquarius": "Your lesson is balancing individuality with belonging. Mastery comes through serving the collective without losing yourself.",
        "pisces": "Your lesson is grounding your sensitivity in practical reality. Mastery comes through translating your dreams into tangible form.",
    },
    "uranus": {
        "_role": "Where you break patterns and innovate",
        "aries": "You revolutionize through bold, independent action. Your innovations come in sudden bursts of pioneering energy.",
        "taurus": "You bring radical change to material systems and values. Your innovations reshape how people relate to resources and stability.",
        "gemini": "You revolutionize communication and information sharing. Your innovations reshape how people connect and exchange ideas.",
        "cancer": "You bring progressive change to home, family, and emotional life. Your innovations reshape how people define belonging.",
        "leo": "You revolutionize creative expression and leadership. Your innovations inspire new forms of authentic self-expression.",
        "virgo": "You bring radical improvement to health, work, and service. Your innovations reshape systems to better serve humanity.",
        "libra": "You revolutionize relationships and justice. Your innovations reshape how people partner and create equitable structures.",
        "scorpio": "You bring transformative upheaval to power structures. Your innovations come through fearless exploration of hidden truths.",
        "sagittarius": "You revolutionize philosophy, education, and expansion. Your innovations reshape how people find meaning and truth.",
        "capricorn": "You bring radical restructuring to institutions and traditions. Your innovations reshape governance and organizational systems.",
        "aquarius": "Uranus is at home here, amplifying your visionary genius. Your innovations reshape technology, society, and collective consciousness.",
        "pisces": "You revolutionize spirituality, healing, and creativity. Your innovations dissolve boundaries and expand compassion.",
    },
    "neptune": {
        "_role": "Your dreams, intuition, and spiritual connection",
        "aries": "Your spiritual path involves courageous faith and pioneering new forms of inspiration. You dream in bold, active strokes.",
        "taurus": "Your spirituality is grounded and sensory. You connect to the divine through nature, beauty, and the sacred quality of material life.",
        "gemini": "Your spiritual connection flows through ideas and communication. You channel inspiration through words and intellectual curiosity.",
        "cancer": "Your spiritual life is deeply emotional and intuitive. You connect to the divine through nurturing love and emotional communion.",
        "leo": "Your spiritual expression is creative and heart-centered. You channel inspiration through artistic creation and generous love.",
        "virgo": "Your spirituality is expressed through devoted service. You connect to the divine through healing, helping, and sacred attention to detail.",
        "libra": "Your spiritual path runs through beauty, harmony, and partnership. You experience the divine through balanced relationships and aesthetic truth.",
        "scorpio": "Your spiritual depth is profound and transformative. You connect to the divine through intense inner work and mystical experience.",
        "sagittarius": "Your spiritual quest is expansive and philosophical. You seek the divine through broad exploration of wisdom traditions and truth.",
        "capricorn": "Your spiritual life is structured and achievement-oriented. You connect to the divine through building something that transcends the personal.",
        "aquarius": "Your spiritual vision is collective and humanitarian. You experience the divine through serving the evolution of human consciousness.",
        "pisces": "Neptune is at home here, giving you extraordinary spiritual sensitivity. You are a natural mystic, connected to universal compassion and creative imagination.",
    },
    "pluto": {
        "_role": "Your power of transformation and rebirth",
        "aries": "Your transformative power is expressed through radical self-reinvention. You die and are reborn through acts of courageous assertion.",
        "taurus": "Your transformation comes through releasing attachment to security. Your deepest power emerges when you let go of what no longer serves you.",
        "gemini": "Your transformation operates through the power of information and ideas. Your deepest shifts come through changing how you think and communicate.",
        "cancer": "Your transformation is deeply emotional and familial. Your deepest power emerges through healing generational patterns and redefining home.",
        "leo": "Your transformation comes through creative self-expression. Your deepest power emerges when you step fully into your authentic light.",
        "virgo": "Your transformation operates through service and purification. Your deepest power emerges through healing yourself by healing others.",
        "libra": "Your transformation comes through relationships. Your deepest power emerges through rebalancing dynamics of fairness, beauty, and partnership.",
        "scorpio": "Pluto is at home here, amplifying your regenerative power. Your capacity for total transformation and rebirth is extraordinary.",
        "sagittarius": "Your transformation comes through expanding belief systems. Your deepest power emerges through philosophical evolution and truth-seeking.",
        "capricorn": "Your transformation reshapes structures and authority. Your deepest power emerges through rebuilding systems from the ground up.",
        "aquarius": "Your transformation operates on the collective level. Your deepest power emerges through revolutionary social change and innovation.",
        "pisces": "Your transformation is spiritual and transcendent. Your deepest power emerges through dissolving ego boundaries and embracing universal love.",
    },
}

# ──────────────────────────────────────────────────────────────────────
#  SIGN-PAIR COMPATIBILITY DESCRIPTIONS
#  Specific strengths and challenges for each element pairing.
# ──────────────────────────────────────────────────────────────────────

SIGN_PAIR_STRENGTHS = {
    # Fire + Fire
    ("aries", "leo"): [
        "A powerhouse duo that feeds off each other's ambition and confidence",
        "Natural admiration flows both ways — Aries respects Leo's warmth, Leo loves Aries' courage",
        "Together you create an unstoppable force of creative energy and bold vision",
    ],
    ("aries", "sagittarius"): [
        "Shared love of adventure makes every day feel like a new expedition",
        "You match each other's energy perfectly — honest, direct, and endlessly enthusiastic",
        "A rare bond where both partners feel completely free to be themselves",
    ],
    ("leo", "sagittarius"): [
        "Mutual generosity of spirit creates an atmosphere of warmth and abundance",
        "You inspire each other to dream bigger and reach higher without hesitation",
        "Natural playfulness keeps this connection vibrant and joyful through the years",
    ],
    # Fire + Water
    ("aries", "cancer"): [
        "Aries' boldness helps Cancer step out of their comfort zone",
        "Cancer's emotional depth teaches Aries the power of vulnerability and patience",
        "Together you balance action with intuition in a surprisingly complementary way",
    ],
    ("aries", "scorpio"): [
        "Two Mars-influenced signs creating an intensely passionate and magnetic bond",
        "Mutual respect for each other's strength and refusal to back down",
        "Together you can achieve the impossible when you align your formidable willpower",
    ],
    ("aries", "pisces"): [
        "Aries' decisiveness gives Pisces' dreams a concrete direction to flow toward",
        "Pisces' empathy softens Aries' edges and opens the door to deeper emotional connection",
        "A beautiful balance of fire and water that creates steam — transformation through contrast",
    ],
    ("leo", "cancer"): [
        "Leo's warmth makes Cancer feel secure enough to fully open up",
        "Cancer's nurturing devotion gives Leo the loyal appreciation they crave",
        "Both signs value family and loyalty, creating a foundation of genuine care",
    ],
    ("leo", "scorpio"): [
        "Two fixed signs with tremendous loyalty and commitment once bonded",
        "Scorpio's depth fascinates Leo; Leo's radiance draws Scorpio out of the shadows",
        "A powerful combination of heart and intensity that creates an unforgettable dynamic",
    ],
    ("leo", "pisces"): [
        "Leo's confidence inspires Pisces to trust their creative vision",
        "Pisces' compassion and sensitivity brings out Leo's most generous and tender side",
        "Together you create a magical blend of dramatic expression and spiritual depth",
    ],
    ("sagittarius", "cancer"): [
        "Sagittarius expands Cancer's world beyond the familiar and comfortable",
        "Cancer gives Sagittarius a warm home base to return to after adventures",
        "You teach each other the balance between roots and wings",
    ],
    ("sagittarius", "scorpio"): [
        "Both signs seek truth — Sagittarius through philosophy, Scorpio through psychology",
        "A shared intensity of purpose makes your conversations endlessly fascinating",
        "You push each other toward profound growth in complementary directions",
    ],
    ("sagittarius", "pisces"): [
        "Both ruled by Jupiter, sharing optimism and a hunger for meaning",
        "A mutual love of the spiritual and philosophical creates instant resonance",
        "Together you explore life's biggest questions with wonder and open hearts",
    ],
    # Fire + Earth
    ("aries", "taurus"): [
        "Aries' initiative combined with Taurus' follow-through creates real results",
        "You ground each other — Aries sparks action, Taurus sustains momentum",
        "A complementary dynamic that balances speed with staying power",
    ],
    ("aries", "virgo"): [
        "Aries' big-picture vision paired with Virgo's attention to detail is powerful",
        "You push each other to be better — Aries inspires action, Virgo refines the plan",
        "Mutual respect grows from recognizing what the other does that you can't",
    ],
    ("aries", "capricorn"): [
        "Two cardinal signs with tremendous drive and ambition — a power couple dynamic",
        "Capricorn's strategy gives Aries' energy a productive long-term direction",
        "Together you can build empires when you agree on the destination",
    ],
    ("leo", "taurus"): [
        "Both appreciate luxury, beauty, and the finer things in life",
        "Taurus' steady devotion gives Leo the reliable admiration they thrive on",
        "A shared love of comfort and quality creates a warm, abundant partnership",
    ],
    ("leo", "virgo"): [
        "Leo's creative vision paired with Virgo's practical expertise produces excellence",
        "Virgo's thoughtful service makes Leo feel genuinely cared for beyond the spotlight",
        "Together you balance inspiration with execution in a highly productive way",
    ],
    ("leo", "capricorn"): [
        "Both signs respect authority and achievement, creating mutual admiration",
        "Leo's heart-centered warmth balances Capricorn's strategic cool",
        "A power pairing that combines charisma with competence to impressive effect",
    ],
    ("sagittarius", "taurus"): [
        "Sagittarius' expansive vision is grounded by Taurus' practical wisdom",
        "Taurus benefits from Sagittarius' ability to shake up routines with fresh perspective",
        "When you find middle ground between adventure and stability, the bond is beautiful",
    ],
    ("sagittarius", "virgo"): [
        "Both mutable signs bringing adaptability and a shared love of learning",
        "Virgo's precision refines Sagittarius' broad ideas into actionable plans",
        "You share a genuine intellectual curiosity that keeps conversation flowing endlessly",
    ],
    ("sagittarius", "capricorn"): [
        "Sagittarius' optimism lifts Capricorn's sometimes heavy sense of responsibility",
        "Capricorn's structure gives Sagittarius' visions a realistic path to manifestation",
        "Together you balance dreaming with doing in a way neither can alone",
    ],
    # Fire + Air
    ("aries", "gemini"): [
        "Fast-moving mental chemistry that keeps both partners stimulated and engaged",
        "Gemini's wit sharpens Aries' ideas; Aries' courage inspires Gemini to act",
        "A dynamic, energizing bond that never gets boring",
    ],
    ("aries", "libra"): [
        "Opposite signs that complete each other — Aries' boldness meets Libra's grace",
        "Magnetic attraction from balancing independence with partnership",
        "You teach each other what you most need to learn: self vs. other",
    ],
    ("aries", "aquarius"): [
        "Shared love of independence and innovation creates instant kinship",
        "Aquarius' visionary thinking gives Aries' action a purpose beyond the personal",
        "A progressive, future-oriented bond built on mutual respect for freedom",
    ],
    ("leo", "gemini"): [
        "Gemini's playful intelligence delights Leo; Leo's warmth makes Gemini feel special",
        "Natural creative chemistry — you bring out each other's most vibrant, expressive side",
        "A socially magnetic pair that others are drawn to for your combined energy",
    ],
    ("leo", "libra"): [
        "Both appreciate beauty, romance, and social connection on a deep level",
        "Libra's charm complements Leo's charisma perfectly — together you light up any room",
        "A harmonious pairing with natural affection and mutual admiration",
    ],
    ("leo", "aquarius"): [
        "Opposite signs that fascinate each other — personal warmth meets collective vision",
        "Leo inspires Aquarius to embrace individuality; Aquarius expands Leo's sense of purpose",
        "A dynamic tension that generates creative breakthroughs and deep respect",
    ],
    ("sagittarius", "gemini"): [
        "Opposite signs united by insatiable curiosity and a love of ideas",
        "Gemini handles the details while Sagittarius provides the big-picture vision",
        "Together you're the most entertaining and intellectually stimulating duo in the zodiac",
    ],
    ("sagittarius", "libra"): [
        "Shared optimism and social grace make this an effortlessly pleasant connection",
        "Libra refines Sagittarius' rough edges; Sagittarius emboldens Libra's decisions",
        "A harmonious bond built on shared values of fairness, beauty, and growth",
    ],
    ("sagittarius", "aquarius"): [
        "Two progressive visionaries who speak the same idealistic language",
        "Shared love of freedom means neither feels caged in this connection",
        "Together you dream up futures that benefit not just yourselves but everyone",
    ],
    # Earth + Earth
    ("taurus", "virgo"): [
        "A deeply harmonious earth pairing built on practical devotion and shared values",
        "Virgo's attention to detail complements Taurus' appreciation for quality",
        "Together you build a life of genuine comfort, security, and quiet beauty",
    ],
    ("taurus", "capricorn"): [
        "Two earth signs that understand the value of patience, loyalty, and long-term building",
        "Capricorn's ambition paired with Taurus' steadfastness creates an unshakable foundation",
        "A power duo that turns shared dreams into material reality through persistent effort",
    ],
    ("virgo", "capricorn"): [
        "Both signs value competence, effort, and tangible results — instant mutual respect",
        "Virgo's analytical skills paired with Capricorn's strategic vision is formidable",
        "A grounded partnership where both feel truly understood and appreciated for who they are",
    ],
    # Earth + Water
    ("taurus", "cancer"): [
        "One of the most naturally nurturing pairings in the zodiac",
        "Shared love of home, security, and creating a beautiful domestic life",
        "Cancer's emotional depth finds perfect grounding in Taurus' steady presence",
    ],
    ("taurus", "scorpio"): [
        "Opposite signs with magnetic attraction and fierce mutual loyalty",
        "Scorpio's intensity matches Taurus' depth of feeling — nothing shallow here",
        "When bonded, this fixed-sign pair creates one of the most unbreakable connections",
    ],
    ("taurus", "pisces"): [
        "Taurus grounds Pisces' dreams in reality; Pisces adds magic to Taurus' world",
        "A beautifully complementary pairing of earthly sensuality and spiritual depth",
        "Together you create a relationship that is both practical and enchanting",
    ],
    ("virgo", "cancer"): [
        "Both signs express love through caring and service — a deeply devotional bond",
        "Cancer's emotional warmth softens Virgo's analytical edge beautifully",
        "A nurturing partnership where both feel genuinely supported and understood",
    ],
    ("virgo", "scorpio"): [
        "Shared love of depth, research, and getting to the truth of things",
        "Scorpio's intensity is met with Virgo's thoughtful, patient understanding",
        "A mentally stimulating bond with surprising emotional depth beneath the surface",
    ],
    ("virgo", "pisces"): [
        "Opposite signs that complete each other — earthly precision meets oceanic intuition",
        "Pisces' imagination inspires Virgo; Virgo gives Pisces' dreams practical form",
        "Together you serve something greater than yourselves with complementary gifts",
    ],
    ("capricorn", "cancer"): [
        "Opposite signs united by devotion to family, security, and legacy",
        "Cancer's emotional intelligence balances Capricorn's strategic mind perfectly",
        "Together you create a foundation so strong it can weather any storm",
    ],
    ("capricorn", "scorpio"): [
        "Two powerfully determined signs with incredible resilience and loyalty",
        "Scorpio's emotional depth gives Capricorn permission to feel; Capricorn gives Scorpio structure",
        "A formidable pairing that combines ambition with psychological insight",
    ],
    ("capricorn", "pisces"): [
        "Capricorn's structure gives Pisces' creativity a path to manifestation",
        "Pisces' compassion and vision keeps Capricorn connected to their heart",
        "A complementary bond that balances the practical with the transcendent",
    ],
    # Air + Air
    ("gemini", "libra"): [
        "Two air signs in effortless mental harmony — conversation flows like breathing",
        "Shared love of ideas, beauty, and social connection creates instant rapport",
        "A lighthearted, intellectually stimulating bond that keeps both partners engaged",
    ],
    ("gemini", "aquarius"): [
        "A meeting of brilliant, unconventional minds that sparks innovation",
        "Shared love of freedom and ideas creates a partnership without possessiveness",
        "Together you generate insights and possibilities that neither would find alone",
    ],
    ("libra", "aquarius"): [
        "Shared commitment to fairness and progressive ideals creates deep mutual respect",
        "Libra's social grace pairs beautifully with Aquarius' humanitarian vision",
        "A forward-thinking partnership that values both beauty and justice equally",
    ],
    # Air + Water
    ("gemini", "cancer"): [
        "Gemini's lightness helps Cancer not take everything so personally",
        "Cancer's emotional depth gives Gemini a safe place to slow down and feel",
        "Together you balance head and heart in conversations that are both deep and playful",
    ],
    ("gemini", "scorpio"): [
        "Both signs are investigators — Gemini of ideas, Scorpio of the psyche",
        "Scorpio's depth grounds Gemini's scattered energy in fascinating ways",
        "A mentally electric pairing that keeps both partners endlessly curious about each other",
    ],
    ("gemini", "pisces"): [
        "Both mutable signs bringing adaptability, creativity, and openness to change",
        "Pisces' imagination sparks Gemini's curiosity in unexpected, enchanting ways",
        "A creative pairing that communicates on both intellectual and intuitive levels",
    ],
    ("libra", "cancer"): [
        "Shared desire for harmony creates a peaceful and aesthetically beautiful connection",
        "Cancer's nurturing meets Libra's graciousness — both excel at making others feel valued",
        "A partnership where kindness and consideration are the natural language of love",
    ],
    ("libra", "scorpio"): [
        "Libra's charm meets Scorpio's magnetism — an irresistibly attractive combination",
        "Both value deep connection, though they approach it from different angles",
        "When trust is established, this bond has both beauty and profound depth",
    ],
    ("libra", "pisces"): [
        "Shared love of beauty, romance, and idealism creates a dreamy connection",
        "Both signs see the best in others and bring out each other's most gentle, loving nature",
        "A tender partnership that values kindness, creativity, and spiritual connection",
    ],
    ("aquarius", "cancer"): [
        "Aquarius expands Cancer's world beyond the personal into humanitarian vision",
        "Cancer teaches Aquarius the power of emotional connection and intimate bonds",
        "Together you balance individual freedom with family and community",
    ],
    ("aquarius", "scorpio"): [
        "Two fixed signs with incredible determination and loyalty once committed",
        "Scorpio's emotional depth fascinates Aquarius' analytical mind",
        "A provocative pairing that challenges both to integrate mind and heart",
    ],
    ("aquarius", "pisces"): [
        "Both signs carry humanitarian ideals and a vision for a better world",
        "Aquarius provides the framework; Pisces provides the compassion and inspiration",
        "Together you dream big enough to actually change things for the better",
    ],
    # Water + Water
    ("cancer", "scorpio"): [
        "Two water signs creating one of the deepest emotional bonds in the zodiac",
        "Scorpio's fearless depth matches Cancer's emotional courage — both dive where others won't",
        "An almost psychic connection where words become optional between you",
    ],
    ("cancer", "pisces"): [
        "A dreamy, deeply empathic connection where both feel instantly understood",
        "Shared emotional intelligence creates a bond that flows with intuitive grace",
        "Together you create a sanctuary of compassion that heals both of you from the inside out",
    ],
    ("scorpio", "pisces"): [
        "Two water signs at their most profound — Scorpio's intensity meets Pisces' boundless empathy",
        "A spiritual and emotional bond that transcends ordinary connection",
        "Together you explore the depths of human experience with courage and compassion",
    ],
    # Earth + Air
    ("taurus", "gemini"): [
        "Gemini brings fresh ideas that invigorate Taurus' world; Taurus grounds Gemini's scattered energy",
        "Both Venus and Mercury influenced — a bridge between sensory pleasure and intellectual delight",
        "When you find your rhythm, you create a life that's both stable and stimulating",
    ],
    ("taurus", "libra"): [
        "Both ruled by Venus — you share a deep love of beauty, art, and harmonious living",
        "Libra's social grace pairs with Taurus' sensual warmth to create effortless elegance together",
        "A Venusian bond where aesthetics, comfort, and genuine affection flow naturally",
    ],
    ("taurus", "aquarius"): [
        "Aquarius shakes up Taurus' routines in ways that ultimately spark growth",
        "Taurus brings Aquarius' innovations down to earth with practical wisdom",
        "Two fixed signs with incredible determination — when aligned, you're unstoppable",
    ],
    ("virgo", "gemini"): [
        "Both Mercury-ruled, sharing a love of language, learning, and mental agility",
        "Gemini's breadth of knowledge paired with Virgo's depth creates a complete picture",
        "Intellectually stimulating conversations that neither of you can find elsewhere",
    ],
    ("virgo", "libra"): [
        "Both appreciate refinement, quality, and getting things right",
        "Libra's aesthetic vision paired with Virgo's practical excellence produces beautiful results",
        "A partnership that values thoughtfulness, courtesy, and mutual improvement",
    ],
    ("virgo", "aquarius"): [
        "Both analytical minds driven by a genuine desire to improve the world",
        "Aquarius' big-picture innovation paired with Virgo's meticulous execution is powerful",
        "A meeting of the humanitarian and the healer — different methods, same heart",
    ],
    ("capricorn", "gemini"): [
        "Gemini's adaptability complements Capricorn's strategic long-term planning",
        "Capricorn's discipline gives structure to Gemini's brilliant ideas",
        "Together you balance youthful curiosity with mature wisdom in a productive way",
    ],
    ("capricorn", "libra"): [
        "Both cardinal signs with natural leadership and a drive to create something meaningful",
        "Libra's diplomatic charm paired with Capricorn's ambition opens doors neither could alone",
        "A sophisticated partnership that values achievement, beauty, and social contribution",
    ],
    ("capricorn", "aquarius"): [
        "Both Saturn-influenced signs with serious dedication to their visions",
        "Capricorn builds the structure; Aquarius revolutionizes it — complementary forces",
        "A pair that can reshape institutions when they combine tradition with innovation",
    ],
    # Same-sign pairs
    ("aries", "aries"): [
        "Double fire energy creates an unstoppable force of courage and initiative",
        "No one understands your drive and impatience like another Aries",
        "Together you dare each other to be bolder, braver, and more authentically yourselves",
    ],
    ("taurus", "taurus"): [
        "A deeply comfortable bond built on shared values of loyalty, beauty, and stability",
        "No one appreciates your sensual, grounded nature quite like another Taurus",
        "Together you create an oasis of comfort and reliability that nurtures both souls",
    ],
    ("gemini", "gemini"): [
        "Doubled mental agility creates the most intellectually electric pairing imaginable",
        "Conversations between you are endlessly stimulating, witty, and full of unexpected turns",
        "Together you never run out of things to explore, discuss, and discover",
    ],
    ("cancer", "cancer"): [
        "An emotional bond of extraordinary depth — you feel each other's feelings as your own",
        "Shared devotion to home and family creates an incredibly nurturing foundation",
        "Together you build a sanctuary of emotional safety that the world rarely offers",
    ],
    ("leo", "leo"): [
        "Two radiant hearts that amplify each other's warmth, creativity, and generosity",
        "Mutual admiration fuels a dynamic that feels like a perpetual celebration",
        "Together you create a relationship so vibrant and alive that it inspires everyone around you",
    ],
    ("virgo", "virgo"): [
        "A partnership of quiet devotion where both genuinely want to help the other thrive",
        "No one understands your need for order, quality, and meaningful service like another Virgo",
        "Together you create a life of thoughtful refinement and genuine mutual support",
    ],
    ("libra", "libra"): [
        "A harmonious, beautiful partnership where charm and grace flow effortlessly",
        "Shared love of balance, beauty, and fairness creates an atmosphere of peace and elegance",
        "Together you embody partnership at its most refined and mutually fulfilling",
    ],
    ("scorpio", "scorpio"): [
        "The deepest possible emotional bond — no one matches your intensity and commitment",
        "Fearless mutual honesty creates a trust that goes beyond anything surface-level",
        "Together you transform each other in ways that are profound and permanent",
    ],
    ("sagittarius", "sagittarius"): [
        "Doubled Jupiter energy creates the most adventurous and philosophically rich pairing",
        "Shared love of freedom, truth, and exploration makes life feel like an endless adventure",
        "Together you expand each other's worlds beyond what either imagined possible",
    ],
    ("capricorn", "capricorn"): [
        "A power partnership built on shared ambition, discipline, and long-term vision",
        "No one respects your dedication and work ethic quite like another Capricorn",
        "Together you build something truly enduring that reflects your highest shared values",
    ],
    ("aquarius", "aquarius"): [
        "A meeting of visionary minds united by humanitarian ideals and intellectual freedom",
        "No one respects your independence and unconventional thinking like another Aquarius",
        "Together you imagine and work toward futures that benefit far more than just yourselves",
    ],
    ("pisces", "pisces"): [
        "A transcendent emotional and spiritual bond that operates beyond ordinary connection",
        "Shared empathy creates a relationship where both feel truly seen and understood",
        "Together you create a world of creative magic, compassion, and spiritual depth",
    ],
}

SIGN_PAIR_CHALLENGES = {
    # Fire + Water
    ("aries", "cancer"): [
        "Aries' directness can feel harsh to Cancer's sensitive nature",
        "Cancer's need for emotional processing may frustrate Aries' desire for quick resolution",
    ],
    ("aries", "scorpio"): [
        "Two strong wills can create intense power struggles when neither backs down",
        "Scorpio's emotional complexity can feel like a maze to straightforward Aries",
    ],
    ("aries", "pisces"): [
        "Aries' bluntness can wound Pisces' gentle spirit without meaning to",
        "Pisces' indirectness can frustrate Aries who prefers everything upfront",
    ],
    ("leo", "cancer"): [
        "Leo's need for spotlight can sometimes overshadow Cancer's quieter emotional needs",
        "Cancer's mood shifts can dampen Leo's natural exuberance and confidence",
    ],
    ("leo", "scorpio"): [
        "Two fixed signs means neither yields easily — stubbornness can escalate conflicts",
        "Scorpio's need for control can clash with Leo's desire for freedom and recognition",
    ],
    ("leo", "pisces"): [
        "Leo's boldness can overwhelm Pisces' gentle sensibility at times",
        "Pisces' shifting moods can be confusing for Leo's straightforward emotional style",
    ],
    ("sagittarius", "cancer"): [
        "Sagittarius' wanderlust can trigger Cancer's fear of abandonment",
        "Cancer's need for emotional security may feel confining to freedom-loving Sagittarius",
    ],
    ("sagittarius", "scorpio"): [
        "Sagittarius' casual approach to emotion can feel dismissive to intense Scorpio",
        "Scorpio's need for control clashes with Sagittarius' need for total freedom",
    ],
    ("sagittarius", "pisces"): [
        "Both can struggle with follow-through, leaving shared plans unfinished",
        "Sagittarius' blunt honesty can inadvertently hurt Pisces' sensitive feelings",
    ],
    # Fire + Earth
    ("aries", "taurus"): [
        "Aries moves fast; Taurus moves slow — timing differences create friction",
        "Taurus' need for stability can feel like a leash to restless Aries",
    ],
    ("aries", "virgo"): [
        "Aries' impatience clashes with Virgo's methodical approach to everything",
        "Virgo's criticism, however well-intentioned, can feel crushing to Aries' confidence",
    ],
    ("aries", "capricorn"): [
        "Both want to lead, creating power dynamics that need conscious navigation",
        "Capricorn's cautious planning can frustrate Aries' desire for immediate action",
    ],
    ("leo", "taurus"): [
        "Two fixed signs with strong opinions — stubbornness can be a real obstacle",
        "Leo's need for excitement can clash with Taurus' preference for comfortable routine",
    ],
    ("leo", "virgo"): [
        "Virgo's analytical nature can feel like criticism to Leo's sensitive pride",
        "Leo's dramatic flair may seem excessive to practical, understated Virgo",
    ],
    ("leo", "capricorn"): [
        "Leo's expressiveness can seem frivolous to serious Capricorn",
        "Capricorn's emotional restraint may leave Leo feeling underappreciated",
    ],
    ("sagittarius", "taurus"): [
        "Sagittarius craves change while Taurus craves consistency — a fundamental tension",
        "Taurus may find Sagittarius unreliable; Sagittarius may find Taurus inflexible",
    ],
    ("sagittarius", "virgo"): [
        "Sagittarius' big-picture thinking clashes with Virgo's detail-oriented nature",
        "Virgo's need for order can feel restrictive to free-spirited Sagittarius",
    ],
    ("sagittarius", "capricorn"): [
        "Sagittarius' spontaneity clashes with Capricorn's need for planned structure",
        "Different attitudes toward responsibility can create misunderstandings",
    ],
    # Same sign
    ("aries", "aries"): [
        "Two leaders who both want to be first — competition can replace cooperation",
        "Combined impatience means conflicts can escalate quickly before either pauses to listen",
    ],
    ("taurus", "taurus"): [
        "Double stubbornness means disagreements can become long standoffs",
        "Risk of falling into comfortable routines that prevent growth and spontaneity",
    ],
    ("gemini", "gemini"): [
        "Two scattered energies can make it hard to ground plans into reality",
        "Neither may want to handle the emotional depth required for true intimacy",
    ],
    ("cancer", "cancer"): [
        "Emotional tides can amplify each other, turning small moods into storms",
        "Both retreating into shells during conflict can create painful standoffs",
    ],
    ("leo", "leo"): [
        "Competition for the spotlight can create ego clashes and rivalry",
        "Both need admiration — if supply runs low, resentment can build",
    ],
    ("virgo", "virgo"): [
        "Mutual perfectionism can create an atmosphere of constant critique",
        "Both may over-analyze feelings instead of simply experiencing them",
    ],
    ("libra", "libra"): [
        "Double indecision means important choices get endlessly postponed",
        "Both avoiding conflict can leave real issues unaddressed beneath politeness",
    ],
    ("scorpio", "scorpio"): [
        "Intensity squared — power struggles can become all-consuming if trust wavers",
        "Mutual secrecy can create an atmosphere of suspicion rather than openness",
    ],
    ("sagittarius", "sagittarius"): [
        "Shared restlessness means neither may want to commit to the hard work of staying",
        "Brutal mutual honesty without a filter can leave wounds",
    ],
    ("capricorn", "capricorn"): [
        "Work may overshadow emotional connection if neither prioritizes vulnerability",
        "Competitive ambition can turn partnership into a silent race",
    ],
    ("aquarius", "aquarius"): [
        "Both valuing independence can mean emotional intimacy never fully develops",
        "Intellectual agreement may mask unaddressed emotional needs",
    ],
    ("pisces", "pisces"): [
        "Shared escapist tendencies can make facing practical reality challenging",
        "Absorbing each other's moods can create emotional overwhelm without clear boundaries",
    ],
    # Air + Water
    ("gemini", "cancer"): [
        "Gemini's emotional lightness can feel dismissive to Cancer's deep feelings",
        "Cancer's need for emotional security may feel clingy to freedom-loving Gemini",
    ],
    ("gemini", "scorpio"): [
        "Gemini's surface-level approach can frustrate Scorpio's need for depth",
        "Scorpio's possessiveness can feel suffocating to Gemini's need for variety",
    ],
    ("gemini", "pisces"): [
        "Both mutable signs may struggle with commitment and following through on promises",
        "Pisces needs emotional depth that Gemini doesn't always know how to provide",
    ],
    ("libra", "cancer"): [
        "Libra's rational approach to feelings can frustrate emotional Cancer",
        "Cancer's mood swings can disrupt Libra's carefully maintained harmony",
    ],
    ("libra", "scorpio"): [
        "Libra's desire for lightness clashes with Scorpio's intensity and depth",
        "Scorpio's possessiveness can feel controlling to partnership-but-freedom-loving Libra",
    ],
    ("libra", "pisces"): [
        "Both dislike confrontation, so real problems may go unspoken for too long",
        "Shared idealism can lead to disappointment when reality doesn't match the dream",
    ],
    ("aquarius", "cancer"): [
        "Aquarius' emotional detachment can feel cold to warmth-seeking Cancer",
        "Cancer's focus on family and home can feel limiting to global-minded Aquarius",
    ],
    ("aquarius", "scorpio"): [
        "Aquarius' emotional distance can feel invalidating to intense Scorpio",
        "Scorpio's need for deep bonding may feel possessive to independent Aquarius",
    ],
    ("aquarius", "pisces"): [
        "Aquarius leads with logic; Pisces leads with emotion — different languages entirely",
        "Pisces' emotional needs may feel overwhelming to detached Aquarius",
    ],
    # Earth + Water
    ("taurus", "cancer"): [
        "Both can become overly protective, creating a bubble that resists change",
        "Shared stubbornness about comfort zones may prevent necessary growth",
    ],
    ("taurus", "scorpio"): [
        "Two of the most stubborn signs — conflicts can become entrenched standoffs",
        "Jealousy and possessiveness can be amplified when both signs feel insecure",
    ],
    ("taurus", "pisces"): [
        "Taurus' practicality may dismiss Pisces' dreamy nature as unrealistic",
        "Pisces' fluid boundaries can feel unreliable to security-seeking Taurus",
    ],
    ("virgo", "cancer"): [
        "Virgo's tendency to criticize can wound Cancer's sensitive heart",
        "Cancer's emotional reactions may seem irrational to logical Virgo",
    ],
    ("virgo", "scorpio"): [
        "Both can be controlling in different ways — Virgo through order, Scorpio through power",
        "Neither easily forgives, which can make resolving deep conflicts very difficult",
    ],
    ("virgo", "pisces"): [
        "Virgo's need for order clashes with Pisces' comfort in chaos and ambiguity",
        "Pisces may feel constantly judged by Virgo's analytical eye",
    ],
    ("capricorn", "cancer"): [
        "Capricorn's emotional restraint can make Cancer feel unloved",
        "Cancer's emotional needs may seem like a distraction from Capricorn's goals",
    ],
    ("capricorn", "scorpio"): [
        "Both signs can be controlling — power struggles may simmer beneath a composed surface",
        "Emotional vulnerability doesn't come naturally to either, which can stall intimacy",
    ],
    ("capricorn", "pisces"): [
        "Capricorn may dismiss Pisces' emotional and creative world as impractical",
        "Pisces may feel that Capricorn prioritizes achievement over emotional connection",
    ],
    # Earth + Air
    ("taurus", "gemini"): [
        "Taurus' need for routine bores restless Gemini; Gemini's inconsistency unsettles Taurus",
        "Fundamentally different paces of life can create ongoing friction",
    ],
    ("taurus", "libra"): [
        "Both Venus-ruled but express it differently — Taurus through comfort, Libra through social grace",
        "Taurus' possessiveness can clash with Libra's need for social freedom",
    ],
    ("taurus", "aquarius"): [
        "Taurus values tradition and stability; Aquarius values revolution and change",
        "Both are fixed signs — when they disagree, neither budges easily",
    ],
    ("virgo", "gemini"): [
        "Both Mercury-ruled but Virgo's precision clashes with Gemini's breadth",
        "Gemini's scattered energy can frustrate detail-oriented Virgo",
    ],
    ("virgo", "libra"): [
        "Virgo's blunt helpfulness can feel like criticism to harmony-seeking Libra",
        "Libra's indecision can exasperate practical, solution-oriented Virgo",
    ],
    ("virgo", "aquarius"): [
        "Virgo works within systems; Aquarius wants to reinvent them — different philosophies",
        "Aquarius' unconventional approach can seem chaotic to methodical Virgo",
    ],
    ("capricorn", "gemini"): [
        "Capricorn's seriousness can dampen Gemini's playful spirit",
        "Gemini's changeability can seem unreliable to commitment-focused Capricorn",
    ],
    ("capricorn", "libra"): [
        "Capricorn's stoicism can feel cold to relationship-oriented Libra",
        "Libra's social nature may seem frivolous to goal-driven Capricorn",
    ],
    ("capricorn", "aquarius"): [
        "Capricorn upholds tradition; Aquarius tears it down — fundamentally different approaches",
        "Both can be emotionally reserved, making it hard to create warmth",
    ],
    # Air + Air
    ("gemini", "libra"): [
        "Both may avoid emotional depth, keeping things perpetually light",
        "Shared indecision means important conversations get endlessly deferred",
    ],
    ("gemini", "aquarius"): [
        "Both highly cerebral — emotional intimacy may take a backseat to ideas",
        "Freedom-loving natures may prevent either from fully committing",
    ],
    ("libra", "aquarius"): [
        "Libra wants partnership closeness while Aquarius needs more space",
        "Both may intellectualize feelings rather than actually experiencing them",
    ],
    # Fire + Fire
    ("aries", "leo"): [
        "Two strong egos can create dramatic clashes when both demand to lead",
        "Aries' bluntness can wound Leo's pride; Leo's need for admiration can exhaust Aries",
    ],
    ("aries", "sagittarius"): [
        "Shared impulsiveness means neither brings the brakes — reckless decisions are possible",
        "Both can be brutally honest in ways that escalate conflicts rather than resolving them",
    ],
    ("leo", "sagittarius"): [
        "Leo's desire for loyalty can feel possessive to freedom-loving Sagittarius",
        "Sagittarius' blunt honesty can accidentally deflate Leo's sensitive pride",
    ],
    # Fire + Air
    ("aries", "gemini"): [
        "Both move so fast that important emotional conversations get skipped over",
        "Gemini's indecisiveness can frustrate action-oriented Aries",
    ],
    ("aries", "libra"): [
        "Aries' directness can feel aggressive to harmony-seeking Libra",
        "Libra's need to deliberate feels like stalling to impatient Aries",
    ],
    ("aries", "aquarius"): [
        "Aries' me-first energy can clash with Aquarius' collective-minded approach",
        "Both stubborn in different ways — Aries digs in emotionally, Aquarius intellectually",
    ],
    ("leo", "gemini"): [
        "Gemini's flirtatious nature can trigger Leo's jealousy and need for devotion",
        "Leo's desire for consistent attention can feel demanding to free-spirited Gemini",
    ],
    ("leo", "libra"): [
        "Both crave admiration and can compete for social attention",
        "Libra's people-pleasing can feel inauthentic to straightforward Leo",
    ],
    ("leo", "aquarius"): [
        "Leo's personal warmth can feel smothering to detached Aquarius",
        "Aquarius' emotional coolness can leave Leo feeling unappreciated",
    ],
    ("sagittarius", "gemini"): [
        "Both are so scattered that practical life management can fall apart",
        "Philosophical differences can turn from stimulating debates into genuine friction",
    ],
    ("sagittarius", "libra"): [
        "Sagittarius' brutal honesty can shatter Libra's carefully maintained harmony",
        "Libra's social diplomacy can feel fake to truth-obsessed Sagittarius",
    ],
    ("sagittarius", "aquarius"): [
        "Both so independent that building deep emotional intimacy requires conscious effort",
        "Shared idealism without grounding can mean plans never materialize into reality",
    ],
    # Earth + Earth
    ("taurus", "virgo"): [
        "Virgo's perfectionism can feel like constant criticism to comfort-loving Taurus",
        "Both can get stuck in practical concerns and forget to nurture the romantic spark",
    ],
    ("taurus", "capricorn"): [
        "Both so focused on security and achievement that spontaneity and fun get neglected",
        "Emotional expression doesn't come easily to either — feelings can go unspoken too long",
    ],
    ("virgo", "capricorn"): [
        "Both can become workaholics, leaving little energy for emotional connection",
        "Combined pessimism can create a heavy atmosphere when life gets challenging",
    ],
    # Water + Water
    ("cancer", "scorpio"): [
        "Combined emotional intensity can create storms where small hurts become deep wounds",
        "Both hold grudges — unresolved issues can fester in silence for far too long",
    ],
    ("cancer", "pisces"): [
        "Shared sensitivity means neither may want to deliver hard truths that need saying",
        "Both can enable each other's avoidance of practical responsibilities and difficult realities",
    ],
    ("scorpio", "pisces"): [
        "Scorpio's intensity can overwhelm Pisces' gentle nature during conflicts",
        "Shared tendency toward emotional extremes can make it hard to find stable ground",
    ],
}

# ──────────────────────────────────────────────────────────────────────
#  ASPECT INTERPRETATIONS
#  What each planetary aspect means between two people.
# ──────────────────────────────────────────────────────────────────────

ASPECT_DESCRIPTIONS = {
    ("sun", "sun"): {
        "conjunction": "Your core identities are fused — you understand each other at the deepest level, almost as if looking in a mirror.",
        "trine": "Your essential selves are in effortless harmony. Energy flows naturally between you, creating an atmosphere of mutual support and ease.",
        "sextile": "Your identities complement each other beautifully. There's natural cooperation and the potential for creative collaboration.",
        "square": "Your core identities create friction that demands growth. This tension is challenging but ultimately catalytic for both of you.",
        "opposition": "You are mirror opposites, each embodying what the other lacks. This polarity creates magnetic attraction and valuable lessons.",
        "semi-sextile": "Your identities sit in adjacent signs, creating subtle but persistent adjustments as you learn to appreciate your differences.",
        "quincunx": "Your essential natures don't obviously connect, requiring creative adaptation. The effort to understand each other builds rare depth.",
    },
    ("moon", "moon"): {
        "conjunction": "Your emotional rhythms are perfectly synchronized. You feel what the other feels, creating profound emotional intimacy.",
        "trine": "Your emotional natures flow together effortlessly. You instinctively know how to comfort and support each other.",
        "sextile": "Your emotional styles complement each other, creating opportunities for nurturing growth and mutual understanding.",
        "square": "Your emotional needs create tension — what soothes one may unsettle the other. Learning to honor both is the key.",
        "opposition": "Your emotional natures are complementary opposites. You fill each other's emotional gaps when you choose understanding over judgment.",
        "semi-sextile": "Your emotional styles are subtly different, requiring patience and willingness to learn each other's emotional language.",
        "quincunx": "Your emotional worlds feel foreign to each other. Building bridges requires deliberate effort but creates unique intimacy.",
    },
    ("venus", "mars"): {
        "conjunction": "Electric romantic and creative chemistry. The attraction between you is immediate, palpable, and deeply magnetic.",
        "trine": "Natural romantic flow between desire and affection. Your love styles complement each other with graceful ease.",
        "sextile": "Pleasant chemistry that builds over time. There's a sweet, cooperative quality to how your desires and values align.",
        "square": "Intense, friction-fueled attraction. The chemistry is undeniable but comes with passionate disagreements about values and desire.",
        "opposition": "Powerful magnetic attraction between what you value and what they pursue. This polarity creates irresistible but complex chemistry.",
        "semi-sextile": "Subtle but persistent romantic undertones. The attraction is quiet but grows steadily through small, meaningful exchanges.",
        "quincunx": "Unusual chemistry that doesn't fit conventional patterns. The attraction is real but requires creative expression to flourish.",
    },
}

# ──────────────────────────────────────────────────────────────────────
#  DAILY COSMIC INSIGHTS
#  Personalized daily messages by sign and element.
# ──────────────────────────────────────────────────────────────────────

DAILY_INSIGHTS = {
    "aries": [
        "Your pioneering spirit is activated today. Channel that fire into starting something new rather than fighting old battles.",
        "Mars energy flows strongly through you today. Physical activity will help you think more clearly and make better decisions.",
        "Your courage is needed today — not the battlefield kind, but the emotional kind. Say what needs to be said with compassion.",
        "An unexpected opportunity aligns with your natural boldness. Trust your instinct to act quickly, but check in with your heart first.",
        "Your competitive drive serves you well today, but remember: the real competition is with who you were yesterday.",
    ],
    "taurus": [
        "Venus blesses your connections today. Lean into comfort and share something beautiful with someone who matters.",
        "Your patience is your superpower today. Something you've been building is about to show tangible results.",
        "Ground yourself in nature or sensory pleasure — your body knows what your mind is still figuring out.",
        "A financial or material matter benefits from your steady attention today. Trust your practical instincts.",
        "Your loyalty is being noticed. Someone in your circle deeply appreciates your unwavering presence.",
    ],
    "gemini": [
        "Your words carry extra power today. A conversation you've been avoiding could unlock something important.",
        "Mercury amplifies your mental agility. Use it to connect two ideas that others haven't thought to pair.",
        "Social energy is high — but the most meaningful exchange today may come from listening rather than talking.",
        "Your curiosity leads you to exactly the right information at the right time. Follow the intellectual breadcrumbs.",
        "A dual perspective you hold — seeing both sides simultaneously — is exactly what someone needs today.",
    ],
    "cancer": [
        "The Moon illuminates your emotional wisdom today. Trust what you feel, even if you can't explain it logically.",
        "Your home or inner sanctuary needs attention. Creating comfort now will pay dividends in emotional resilience.",
        "A family connection or close bond deepens today. Your nurturing instinct knows exactly what to offer.",
        "Your intuition about someone's unspoken feelings is spot-on. Gently acknowledging it could transform the dynamic.",
        "Emotional courage is your theme today. Being vulnerable with the right person creates profound connection.",
    ],
    "leo": [
        "Your creative fire burns bright today. Express what's in your heart — art, words, gesture — the form matters less than the authenticity.",
        "The Sun empowers your natural magnetism. Use your influence to uplift someone who's been struggling quietly.",
        "Generosity circles back to you today. What you give freely returns in ways you won't expect.",
        "Your inner child wants to play. Making time for joy isn't frivolous — it's how you recharge your creative engine.",
        "A leadership moment presents itself. Lead with warmth rather than authority and watch others naturally follow.",
    ],
    "virgo": [
        "Your analytical gifts reveal a solution hidden in the details. Pay attention to the small things others overlook.",
        "Mercury sharpens your discernment today. Use it to improve a system or help someone who's overwhelmed.",
        "Self-care isn't selfish — your tendency to serve others needs balancing with tending to your own garden.",
        "A health or wellness insight clicks into place. Your body is communicating; take time to listen.",
        "Your practical wisdom is exactly what someone needs to hear. Offer it gently and watch it land perfectly.",
    ],
    "libra": [
        "Venus enhances your natural charm today. A relationship that's been neutral could deepen into something meaningful.",
        "Balance is your art form, and today the canvas is a situation others see as black-and-white. Show them the spectrum.",
        "Beauty feeds your soul today. Whether it's art, music, or a meaningful conversation — seek what elevates.",
        "A decision you've been weighing finds clarity. Trust that you've gathered enough perspective to choose wisely.",
        "Partnership energy is strong. Whether romantic or collaborative, today is for co-creating something beautiful.",
    ],
    "scorpio": [
        "Your penetrating insight reveals something beneath the surface today. Use this truth wisely and with compassion.",
        "Pluto's transformative energy is active. Something ending is making room for something more authentic to begin.",
        "Your emotional intensity is a gift today. Channel it into deep connection rather than control.",
        "Trust and vulnerability are your themes. Letting someone see the real you creates the bond you've been seeking.",
        "A power dynamic shifts in your favor today. Use your influence for healing rather than leverage.",
    ],
    "sagittarius": [
        "Jupiter expands your horizons today. A philosophical insight or unexpected adventure awaits if you say yes.",
        "Your optimism is contagious and needed. Share your expansive vision with someone who's thinking too small.",
        "The truth you've been sensing but avoiding is ready to be faced. Your honesty, tempered with kindness, sets you free.",
        "A learning opportunity disguised as a casual encounter holds more significance than it first appears.",
        "Your restless spirit finds purpose today. Channel wanderlust into exploring something meaningful right where you are.",
    ],
    "capricorn": [
        "Saturn rewards your discipline today. A long-term effort shows signs of real progress — acknowledge how far you've come.",
        "Your strategic mind sees three moves ahead. Use this clarity to advance a goal that matters deeply to you.",
        "Allow yourself to be proud of what you've built. You deserve the recognition you'd gladly give others.",
        "A mentoring opportunity presents itself. Your hard-won wisdom can genuinely change someone's trajectory today.",
        "Soften your edges today. The vulnerability you resist is the very thing that will deepen your most important connection.",
    ],
    "aquarius": [
        "Uranus sparks innovation today. An unconventional idea you've been sitting on is more viable than you think.",
        "Your humanitarian instinct is activated. A small act of service creates ripples far beyond what you can see.",
        "Community matters today. Connecting with like-minded people recharges your vision for what's possible.",
        "Your independence is a strength, but today, letting someone in creates an unexpected breakthrough.",
        "A future-oriented insight crystallizes. Your ability to see what's coming positions you ahead of the curve.",
    ],
    "pisces": [
        "Neptune enhances your intuition today. Pay attention to dreams, symbols, and the feelings that arrive without explanation.",
        "Your creativity flows without resistance. Whatever medium calls to you — follow it without judgment or planning.",
        "Compassion is your superpower today. Simply being present with someone who's struggling is more healing than any advice.",
        "A spiritual or creative insight arrives from an unexpected source. Stay open to messages in unusual packaging.",
        "Your sensitivity is picking up on something important. Trust it, even if the logical mind protests.",
    ],
}


# ──────────────────────────────────────────────────────────────────────
#  COSMIC WEATHER — Daily planetary transits by date period
#  Rotates based on day-of-year to give a sense of shifting cosmic energy.
# ──────────────────────────────────────────────────────────────────────

COSMIC_WEATHER = [
    {
        "title": "Mercury in Focus",
        "emoji": "☿️",
        "description": "Communication channels are wide open today. Conversations carry extra weight — choose your words with intention. Misunderstandings clear up more easily now.",
        "advice": "Reach out to someone you've been meaning to connect with.",
    },
    {
        "title": "Venus Harmonizes",
        "emoji": "♀️",
        "description": "Love and beauty are amplified across all connections today. Relationships feel softer, warmer, and more forgiving than usual.",
        "advice": "Express appreciation to someone who matters to you.",
    },
    {
        "title": "Mars Activates",
        "emoji": "♂️",
        "description": "Energy and motivation run high today. The drive to act is strong — channel this fire into your most important goals rather than letting it scatter.",
        "advice": "Take one bold step toward something you've been putting off.",
    },
    {
        "title": "Jupiter Expands",
        "emoji": "♃",
        "description": "Generosity and optimism fill the cosmic atmosphere. Opportunities feel larger than life, and good fortune favors those who take a leap of faith.",
        "advice": "Say yes to something that stretches your comfort zone.",
    },
    {
        "title": "Saturn Steadies",
        "emoji": "♄",
        "description": "Discipline and structure are rewarded today. It's a day for laying foundations, honoring commitments, and trusting the slow work of building something lasting.",
        "advice": "Focus on one long-term goal and take a concrete step forward.",
    },
    {
        "title": "Moon Illuminates",
        "emoji": "🌙",
        "description": "Emotions run deeper than usual today. Intuition is heightened and inner wisdom speaks loudly. Trust what you feel, even when logic can't explain it.",
        "advice": "Make space for quiet reflection before making decisions.",
    },
    {
        "title": "Neptune Dreams",
        "emoji": "♆",
        "description": "The veil between imagination and reality thins today. Creative inspiration flows freely, and spiritual connections feel unusually vivid.",
        "advice": "Follow a creative impulse without overthinking it.",
    },
    {
        "title": "Uranus Disrupts",
        "emoji": "♅",
        "description": "Expect the unexpected. Breakthroughs come through breaking patterns. The cosmic energy favors innovation, originality, and liberation from old routines.",
        "advice": "Embrace a change you've been resisting.",
    },
    {
        "title": "Pluto Transforms",
        "emoji": "♇",
        "description": "Deep transformation is in the air. What needs to end is ending, making room for rebirth. Lean into the process rather than resisting it.",
        "advice": "Release one thing that no longer serves your growth.",
    },
    {
        "title": "Sun Radiates",
        "emoji": "☀️",
        "description": "Vitality and self-expression are powerfully supported today. Your authentic self shines brightest when you stop performing and simply be.",
        "advice": "Do something today purely because it brings you joy.",
    },
]


# ──────────────────────────────────────────────────────────────────────
#  DAILY CONNECTION SPOTLIGHTS
#  Date-specific prompts about specific connections, by element pairing.
# ──────────────────────────────────────────────────────────────────────

DAILY_CONNECTION_PROMPTS = {
    ("fire", "fire"): [
        "Your shared fire energy is blazing today. This is the perfect day for a bold adventure or a passionate conversation with {name}.",
        "The cosmic spark between you and {name} is especially electric right now. Feed it with enthusiasm, not competition.",
        "Both of your fire signs are lit up today. Challenge each other to dream bigger — {name} is ready to match your energy.",
    ],
    ("fire", "water"): [
        "The steam rising between fire and water creates transformation today. A deeper conversation with {name} could surprise you both.",
        "Your fire warms {name}'s emotional waters today. They may need your boldness to feel safe enough to open up.",
        "{name}'s emotional intuition can help you navigate something your fire energy alone can't solve. Listen closely today.",
    ],
    ("fire", "earth"): [
        "Your fire can spark action in {name}'s steady earth energy today. Together you can turn ideas into tangible results.",
        "{name}'s grounding presence is exactly what your restless fire energy needs today. Lean into their stability.",
        "The contrast between your fire and {name}'s earth is productive today — passion meets patience for real progress.",
    ],
    ("fire", "air"): [
        "Your fire and {name}'s air create the most dynamic pairing today. Ideas flow fast and inspiration is contagious between you.",
        "Fan the flames of creativity with {name} today. Their intellectual spark feeds your passionate vision perfectly.",
        "{name} brings the ideas, you bring the courage to act on them. Today is for collaborative breakthroughs.",
    ],
    ("water", "water"): [
        "Emotional depths between you and {name} are accessible today. Vulnerability creates the deepest bonding right now.",
        "Your shared water energy creates an almost telepathic connection with {name} today. Trust what you sense without needing words.",
        "Today the emotional current between you and {name} is gentle and healing. Let it flow without trying to control it.",
    ],
    ("water", "earth"): [
        "Your emotional waters find a steady shore in {name}'s earth energy today. Together you build something nurturing and lasting.",
        "{name}'s practical support meets your emotional wisdom perfectly today. This is how you grow together.",
        "The combination of your feeling nature and {name}'s grounded approach creates beautiful results today.",
    ],
    ("water", "air"): [
        "Your emotional insight paired with {name}'s mental clarity creates a powerful balance today. Talk through what you're feeling.",
        "{name} helps you articulate feelings you've been carrying. Today is for bridging heart and mind together.",
        "The tension between depth and lightness with {name} is creative today, not stressful. Let it inspire both of you.",
    ],
    ("earth", "earth"): [
        "Shared earth energy means you and {name} are building on solid ground today. Focus on concrete plans together.",
        "Stability is your superpower as a duo today. Use it to lay foundations for something meaningful with {name}.",
        "You and {name} share a practical wisdom that's especially powerful today. Trust the slow, steady progress.",
    ],
    ("earth", "air"): [
        "{name}'s airy ideas land perfectly on your solid ground today. Together you make abstract concepts real.",
        "Your practical nature gives {name}'s brilliant ideas a home. Collaborate on something that blends vision with structure.",
        "The bridge between your earth and {name}'s air is strong today. Cross it to find common ground and fresh perspective.",
    ],
    ("air", "air"): [
        "Two air signs in conversation is magic today. Ideas flow freely between you and {name} — capture the best ones.",
        "Intellectual synergy with {name} is off the charts today. Use it for brainstorming, planning, or simply enjoying each other's wit.",
        "Your shared love of ideas is especially vibrant with {name} today. Every conversation leads somewhere unexpected and exciting.",
    ],
}
