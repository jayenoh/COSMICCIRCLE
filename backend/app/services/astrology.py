from datetime import date

SIGN_DATES = [
    (1, 20, "aquarius"),
    (2, 19, "pisces"),
    (3, 21, "aries"),
    (4, 20, "taurus"),
    (5, 21, "gemini"),
    (6, 21, "cancer"),
    (7, 23, "leo"),
    (8, 23, "virgo"),
    (9, 23, "libra"),
    (10, 23, "scorpio"),
    (11, 22, "sagittarius"),
    (12, 22, "capricorn"),
]

ALL_SIGNS = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
]

SIGN_ELEMENTS = {
    "aries": "fire", "leo": "fire", "sagittarius": "fire",
    "taurus": "earth", "virgo": "earth", "capricorn": "earth",
    "gemini": "air", "libra": "air", "aquarius": "air",
    "cancer": "water", "scorpio": "water", "pisces": "water",
}

SIGN_MODALITIES = {
    "aries": "cardinal", "cancer": "cardinal", "libra": "cardinal", "capricorn": "cardinal",
    "taurus": "fixed", "leo": "fixed", "scorpio": "fixed", "aquarius": "fixed",
    "gemini": "mutable", "virgo": "mutable", "sagittarius": "mutable", "pisces": "mutable",
}

# Compatible elements
ELEMENT_COMPATIBILITY = {
    ("fire", "fire"): 85, ("fire", "air"): 80, ("fire", "earth"): 45, ("fire", "water"): 50,
    ("air", "fire"): 80, ("air", "air"): 75, ("air", "earth"): 50, ("air", "water"): 55,
    ("earth", "fire"): 45, ("earth", "air"): 50, ("earth", "earth"): 80, ("earth", "water"): 85,
    ("water", "fire"): 50, ("water", "air"): 55, ("water", "earth"): 85, ("water", "water"): 80,
}


def get_sun_sign(birthdate: date) -> str:
    month = birthdate.month
    day = birthdate.day
    for start_month, start_day, sign in reversed(SIGN_DATES):
        if month > start_month or (month == start_month and day >= start_day):
            return sign
    return "capricorn"


def get_sign_index(sign: str) -> int:
    return ALL_SIGNS.index(sign)


def get_aspect(sign1: str, sign2: str) -> str:
    diff = abs(get_sign_index(sign1) - get_sign_index(sign2))
    if diff > 6:
        diff = 12 - diff
    aspects = {0: "conjunction", 1: "semi-sextile", 2: "sextile", 3: "square",
               4: "trine", 5: "quincunx", 6: "opposition"}
    return aspects.get(diff, "none")


def get_element(sign: str) -> str:
    return SIGN_ELEMENTS.get(sign, "fire")


def get_modality(sign: str) -> str:
    return SIGN_MODALITIES.get(sign, "cardinal")
