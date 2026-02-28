from app.services.astrology import get_element


STORY_TEMPLATES = {
    "twin_flame": {
        "title": "A Love Written in the Stars",
        "chapters": [
            {
                "title": "The Cosmic Connection",
                "body": (
                    "When {user_sign} meets {contact_sign}, the universe itself seems to pause "
                    "and take notice. There's an electric recognition here — the kind that bypasses "
                    "the mind and speaks directly to the soul. Your {user_element} energy meets their "
                    "{contact_element} nature, creating a bond that feels both ancient and entirely new."
                ),
            },
            {
                "title": "Where You Ignite",
                "body": (
                    "The magic between you lives in the spaces where your energies collide. "
                    "Your {user_sign} drive for {user_quality} finds its perfect mirror in their "
                    "{contact_sign} dedication to {contact_quality}. Together, you don't just complement "
                    "each other — you amplify. Conversations that start at dinner can stretch until dawn, "
                    "each exchange revealing new depths."
                ),
            },
            {
                "title": "The Shadow Dance",
                "body": (
                    "Twin flame connections aren't all light and ease — they're powerful precisely "
                    "because they illuminate your shadows too. Your {user_sign} tendency toward "
                    "{user_challenge} may clash with their {contact_sign} habit of {contact_challenge}. "
                    "But here's the cosmic truth: these friction points are where the deepest growth lives."
                ),
            },
            {
                "title": "Your Shared Destiny",
                "body": (
                    "This connection carries a purpose beyond the personal. Together, you have the "
                    "potential to create something that neither could build alone. The universe brought "
                    "your {user_element} fire together with their {contact_element} essence for a reason. "
                    "Trust in the cosmic timing of this bond — it was written in the stars long before "
                    "you first met."
                ),
            },
        ],
    },
    "romantic_soulmate": {
        "title": "Two Stars in Orbit",
        "chapters": [
            {
                "title": "The Pull of Gravity",
                "body": (
                    "There's something magnetic about the connection between {user_sign} and "
                    "{contact_sign}. Like two stars caught in each other's gravitational field, "
                    "you orbit around a shared center of warmth and understanding. Your {user_element} "
                    "heart recognizes something familiar in their {contact_element} spirit."
                ),
            },
            {
                "title": "The Language Between You",
                "body": (
                    "Communication between you has its own rhythm — a shared wavelength that "
                    "others might not fully understand. Your {user_sign} way of expressing "
                    "{user_quality} naturally harmonizes with their {contact_sign} approach to "
                    "{contact_quality}. It's not that you always agree, but that you always "
                    "understand where the other is coming from."
                ),
            },
            {
                "title": "Growing Together",
                "body": (
                    "The most beautiful aspect of this connection is how it encourages growth. "
                    "Your {user_sign} nature pushes them to explore new territory, while their "
                    "{contact_sign} perspective helps you see familiar things with fresh eyes. "
                    "Together, you're not just better — you're braver."
                ),
            },
            {
                "title": "The Road Ahead",
                "body": (
                    "The stars suggest a journey of deepening trust and shared discovery. "
                    "Like any great love story, yours will have its chapters of challenge, "
                    "but the cosmic blueprint is clear: this bond has the foundation to weather "
                    "any storm and emerge stronger on the other side."
                ),
            },
        ],
    },
    "platonic_soulmate": {
        "title": "Cosmic Companions",
        "chapters": [
            {
                "title": "Finding Your Person",
                "body": (
                    "Some connections transcend romance — they live in the realm of pure "
                    "understanding. When {user_sign} and {contact_sign} come together, "
                    "it's like finding a long-lost piece of yourself. Your {user_element} "
                    "energy complements their {contact_element} nature in ways that feel effortless."
                ),
            },
            {
                "title": "The Unspoken Bond",
                "body": (
                    "There's a shorthand between you that took no time to develop. Your "
                    "{user_sign} instinct for {user_quality} pairs beautifully with their "
                    "{contact_sign} gift for {contact_quality}. You can sit in silence and "
                    "it feels full, or talk for hours and it feels like minutes."
                ),
            },
            {
                "title": "Navigating the Waves",
                "body": (
                    "Even the deepest friendships face their tides. Your {user_sign} directness "
                    "might sometimes bump against their {contact_sign} sensitivity, but these "
                    "moments are opportunities, not obstacles. The trust between you turns potential "
                    "conflicts into deeper understanding."
                ),
            },
            {
                "title": "A Friendship for the Ages",
                "body": (
                    "The cosmos has woven your paths together for a reason. This is a "
                    "friendship that grows richer with time, deepening with every shared experience "
                    "and honest conversation. The universe rarely creates connections this natural — "
                    "treasure it."
                ),
            },
        ],
    },
    "karmic_teacher": {
        "title": "The Cosmic Classroom",
        "chapters": [
            {
                "title": "A Meeting with Purpose",
                "body": (
                    "Not every connection is meant to be easy — some are meant to be transformative. "
                    "The dynamic between {user_sign} and {contact_sign} carries the unmistakable "
                    "fingerprint of karmic energy. Your {user_element} nature meets their "
                    "{contact_element} energy with a friction that generates light."
                ),
            },
            {
                "title": "The Lesson Within",
                "body": (
                    "This connection is a mirror — sometimes showing you exactly what you need to see, "
                    "not what you want to see. Your {user_sign} approach to {user_quality} is "
                    "challenged by their {contact_sign} perspective on {contact_quality}. The tension "
                    "here isn't a flaw — it's the curriculum."
                ),
            },
            {
                "title": "Breaking Through",
                "body": (
                    "Growth rarely happens in comfort zones, and this connection won't let you "
                    "stay in yours. The key is recognizing that their {contact_sign} energy isn't "
                    "opposing you — it's completing a picture you couldn't see on your own. "
                    "Every challenge here holds a breakthrough."
                ),
            },
            {
                "title": "The Gift of Friction",
                "body": (
                    "When you look back on this connection, you'll recognize it as one of "
                    "the most important catalysts in your personal evolution. The universe sent "
                    "this {contact_sign} energy into your {user_sign} world not to break you, "
                    "but to remake you — stronger, wiser, and more whole."
                ),
            },
        ],
    },
    "cosmic_challenger": {
        "title": "Stars in Tension",
        "chapters": [
            {
                "title": "The Cosmic Friction",
                "body": (
                    "The connection between {user_sign} and {contact_sign} isn't the easiest "
                    "in the zodiac, but it might be one of the most interesting. Your {user_element} "
                    "energy meets their {contact_element} nature with a crackle of tension that "
                    "demands attention and intention."
                ),
            },
            {
                "title": "Different Frequencies",
                "body": (
                    "Where you lead with {user_quality}, they approach through {contact_quality}. "
                    "It's like two radio stations broadcasting on neighboring frequencies — sometimes "
                    "the signal is clear, sometimes there's static. The magic is in learning to tune in."
                ),
            },
            {
                "title": "Finding Common Ground",
                "body": (
                    "Despite the differences, there are surprising points of connection waiting "
                    "to be discovered. Both {user_sign} and {contact_sign} share a deep "
                    "capacity for {shared_quality}. Building from these commonalities can "
                    "transform friction into fuel."
                ),
            },
            {
                "title": "The Unexpected Gift",
                "body": (
                    "Challenging connections teach us more about ourselves than comfortable ones. "
                    "This {contact_sign} presence in your life is expanding your perspective in "
                    "ways you might not fully appreciate yet. Stay curious, stay open, and let "
                    "the cosmos surprise you."
                ),
            },
        ],
    },
}

SIGN_QUALITIES = {
    "aries": "bold action and fearless leadership",
    "taurus": "stability and sensual presence",
    "gemini": "curiosity and intellectual connection",
    "cancer": "emotional depth and nurturing care",
    "leo": "creative expression and generous warmth",
    "virgo": "thoughtful service and attention to detail",
    "libra": "harmony and meaningful partnership",
    "scorpio": "transformative depth and fierce loyalty",
    "sagittarius": "adventure and expansive truth-seeking",
    "capricorn": "ambitious vision and grounded determination",
    "aquarius": "innovation and humanitarian ideals",
    "pisces": "intuitive wisdom and boundless compassion",
}

SIGN_CHALLENGES = {
    "aries": "impatience",
    "taurus": "stubbornness",
    "gemini": "restlessness",
    "cancer": "emotional guardedness",
    "leo": "needing recognition",
    "virgo": "over-analyzing",
    "libra": "indecision",
    "scorpio": "intensity",
    "sagittarius": "over-commitment",
    "capricorn": "emotional distance",
    "aquarius": "detachment",
    "pisces": "escapism",
}

SHARED_QUALITIES = {
    "fire": "passionate determination",
    "earth": "steadfast loyalty",
    "air": "intellectual curiosity",
    "water": "emotional intuition",
}


def generate_mock_story(
    user_chart: dict,
    contact_chart: dict,
    compatibility_data: dict,
    contact_name: str,
) -> dict:
    category = compatibility_data["category"]
    user_sun = compatibility_data["user_sun"]
    contact_sun = compatibility_data["contact_sun"]
    user_element = get_element(user_sun)
    contact_element = get_element(contact_sun)

    template = STORY_TEMPLATES.get(category, STORY_TEMPLATES["platonic_soulmate"])

    context = {
        "user_sign": user_sun.title(),
        "contact_sign": contact_sun.title(),
        "user_element": user_element,
        "contact_element": contact_element,
        "user_quality": SIGN_QUALITIES.get(user_sun, "inner strength"),
        "contact_quality": SIGN_QUALITIES.get(contact_sun, "inner strength"),
        "user_challenge": SIGN_CHALLENGES.get(user_sun, "overthinking"),
        "contact_challenge": SIGN_CHALLENGES.get(contact_sun, "overthinking"),
        "shared_quality": SHARED_QUALITIES.get(user_element, "resilience"),
        "contact_name": contact_name,
    }

    chapters = []
    for ch in template["chapters"]:
        chapters.append({
            "title": ch["title"],
            "body": ch["body"].format(**context),
        })

    return {
        "title": template["title"],
        "chapters": chapters,
        "contact_name": contact_name,
        "user_sign": user_sun,
        "contact_sign": contact_sun,
    }
