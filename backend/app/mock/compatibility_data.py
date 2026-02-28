import hashlib
from app.services.astrology import (
    get_element, get_aspect, ELEMENT_COMPATIBILITY, ALL_SIGNS,
)
from app.mock.interpretations import (
    SIGN_PAIR_STRENGTHS, SIGN_PAIR_CHALLENGES, ASPECT_DESCRIPTIONS,
)


def _pair_seed(sign1: str, sign2: str) -> int:
    pair = "-".join(sorted([sign1, sign2]))
    return int(hashlib.md5(pair.encode()).hexdigest(), 16)


def _get_pair_key(sign1: str, sign2: str) -> tuple:
    """Look up a sign pair in either order."""
    if (sign1, sign2) in SIGN_PAIR_STRENGTHS:
        return (sign1, sign2)
    if (sign2, sign1) in SIGN_PAIR_STRENGTHS:
        return (sign2, sign1)
    return None


def generate_mock_compatibility(
    user_chart: dict,
    contact_chart: dict,
    depth_preference: str = "sun_only",
) -> dict:
    user_sun = user_chart["sun"]["sign"]
    contact_sun = contact_chart["sun"]["sign"]

    # Base score from element compatibility
    el1 = get_element(user_sun)
    el2 = get_element(contact_sun)
    base_score = ELEMENT_COMPATIBILITY.get((el1, el2), 60)

    # Aspect modifier
    aspect = get_aspect(user_sun, contact_sun)
    aspect_modifiers = {
        "conjunction": 10, "trine": 12, "sextile": 8,
        "square": -5, "opposition": -3, "semi-sextile": 3, "quincunx": -2,
    }
    base_score += aspect_modifiers.get(aspect, 0)

    # Sub-scores with variance from pair seed
    seed = _pair_seed(user_sun, contact_sun)
    sub_scores = {}
    categories = ["emotional", "intellectual", "physical", "spiritual", "communication"]
    for i, cat in enumerate(categories):
        variance = ((seed >> (i * 4)) % 21) - 10  # -10 to +10
        sub_scores[cat] = max(20, min(100, base_score + variance))

    # Depth modifiers
    if depth_preference in ("sun_moon_rising", "full_chart"):
        user_moon = user_chart.get("moon", {}).get("sign", user_sun)
        contact_moon = contact_chart.get("moon", {}).get("sign", contact_sun)
        moon_el1 = get_element(user_moon)
        moon_el2 = get_element(contact_moon)
        moon_compat = ELEMENT_COMPATIBILITY.get((moon_el1, moon_el2), 60)
        base_score = int(base_score * 0.6 + moon_compat * 0.4)
        sub_scores["emotional"] = int(sub_scores["emotional"] * 0.5 + moon_compat * 0.5)

    if depth_preference == "full_chart":
        user_venus = user_chart.get("venus", {}).get("sign", user_sun)
        contact_mars = contact_chart.get("mars", {}).get("sign", contact_sun)
        venus_mars_aspect = get_aspect(user_venus, contact_mars)
        if venus_mars_aspect in ("conjunction", "trine", "sextile"):
            base_score += 5
            sub_scores["physical"] = min(100, sub_scores["physical"] + 10)

    overall = max(25, min(98, base_score))

    # Determine category
    if overall >= 85:
        category = "twin_flame"
    elif overall >= 75:
        category = "romantic_soulmate"
    elif overall >= 60:
        category = "platonic_soulmate"
    elif overall >= 45:
        category = "karmic_teacher"
    else:
        category = "cosmic_challenger"

    # Generate sign-pair specific data
    key_aspects = _generate_key_aspects(user_chart, contact_chart, depth_preference)
    strengths = _generate_strengths(user_sun, contact_sun, category)
    challenges = _generate_challenges(user_sun, contact_sun, category)

    return {
        "overall_score": overall,
        "category": category,
        "sub_scores": sub_scores,
        "key_aspects": key_aspects,
        "strengths": strengths,
        "challenges": challenges,
        "sun_aspect": aspect,
        "user_sun": user_sun,
        "contact_sun": contact_sun,
    }


def _generate_key_aspects(user_chart: dict, contact_chart: dict, depth: str) -> list[dict]:
    aspects = []
    pairs = [("sun", "sun"), ("moon", "moon"), ("venus", "mars")]
    if depth == "sun_only":
        pairs = pairs[:1]
    elif depth == "sun_moon_rising":
        pairs = pairs[:2]

    for p1, p2 in pairs:
        s1 = user_chart.get(p1, {}).get("sign", "aries")
        s2 = contact_chart.get(p2, {}).get("sign", "aries")
        asp = get_aspect(s1, s2)

        # Get rich aspect description
        aspect_data = ASPECT_DESCRIPTIONS.get((p1, p2), {})
        description = aspect_data.get(asp, "")
        if not description:
            # Fallback to a generated description
            description = f"Your {p1.title()} in {s1.title()} forms a {asp} with their {p2.title()} in {s2.title()}"

        aspects.append({
            "planet1": p1,
            "planet2": p2,
            "sign1": s1,
            "sign2": s2,
            "aspect": asp,
            "description": description,
        })
    return aspects


# ──────────────────────────────────────────────────────────────────
# Generic fallback templates (used when no sign-pair data exists)
# ──────────────────────────────────────────────────────────────────

GENERIC_STRENGTH_TEMPLATES = {
    "twin_flame": [
        "An almost telepathic understanding of each other's needs",
        "Shared passion that fuels both personal and mutual growth",
        "A deep recognition that transcends ordinary connections",
        "Natural ability to inspire the best in each other",
    ],
    "romantic_soulmate": [
        "Strong emotional resonance and natural chemistry",
        "Complementary strengths that create a balanced dynamic",
        "Shared values that form a solid foundation",
        "An intuitive understanding of each other's love language",
    ],
    "platonic_soulmate": [
        "Easy, flowing communication that never feels forced",
        "Mutual respect that deepens with every interaction",
        "Shared interests that spark joy and discovery",
        "A loyal bond built on genuine understanding",
    ],
    "karmic_teacher": [
        "Opportunities for profound personal transformation",
        "Lessons that push you beyond your comfort zone",
        "A mirror that reflects your hidden strengths",
        "Catalytic energy that accelerates your growth",
    ],
    "cosmic_challenger": [
        "Friction that builds resilience and self-awareness",
        "Different perspectives that expand your worldview",
        "A dynamic that sharpens your communication skills",
        "Opportunities to practice patience and empathy",
    ],
}

GENERIC_CHALLENGE_TEMPLATES = {
    "twin_flame": [
        "Intensity can sometimes feel overwhelming",
        "Mirroring each other's shadows may surface old wounds",
        "Maintaining individuality within a powerful bond",
    ],
    "romantic_soulmate": [
        "Different communication styles may need bridging",
        "Balancing togetherness with personal space",
        "Navigating differing approaches to conflict",
    ],
    "platonic_soulmate": [
        "Taking the relationship for granted during busy periods",
        "Navigating life changes that shift the dynamic",
        "Balancing emotional support without overstepping",
    ],
    "karmic_teacher": [
        "Lessons can feel uncomfortable before they click",
        "Power dynamics may need conscious balancing",
        "Frustration when growth feels one-sided",
    ],
    "cosmic_challenger": [
        "Fundamental differences in approach to life",
        "Communication requires extra patience and effort",
        "Finding common ground may need creative solutions",
    ],
}


def _generate_strengths(sign1: str, sign2: str, category: str) -> list[str]:
    # Try sign-pair specific data first
    pair_key = _get_pair_key(sign1, sign2)
    if pair_key:
        return SIGN_PAIR_STRENGTHS[pair_key]

    # Fall back to generic category templates
    templates = GENERIC_STRENGTH_TEMPLATES.get(category, GENERIC_STRENGTH_TEMPLATES["platonic_soulmate"])
    seed = _pair_seed(sign1, sign2)
    count = 3
    start = seed % max(1, len(templates) - count + 1)
    return templates[start:start + count]


def _generate_challenges(sign1: str, sign2: str, category: str) -> list[str]:
    # Try sign-pair specific data first
    pair_key = _get_pair_key(sign1, sign2)
    if pair_key:
        pair_challenges = SIGN_PAIR_CHALLENGES.get(pair_key, None)
        if pair_challenges:
            return pair_challenges

    # Fall back to generic category templates
    templates = GENERIC_CHALLENGE_TEMPLATES.get(category, GENERIC_CHALLENGE_TEMPLATES["platonic_soulmate"])
    seed = _pair_seed(sign1, sign2)
    count = min(2, len(templates))
    start = seed % max(1, len(templates) - count + 1)
    return templates[start:start + count]
