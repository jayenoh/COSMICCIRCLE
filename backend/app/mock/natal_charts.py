import hashlib
from datetime import date
from app.services.astrology import get_sun_sign, ALL_SIGNS, SIGN_ELEMENTS, SIGN_MODALITIES
from app.mock.interpretations import PLANET_MEANINGS


def _hash_seed(birthdate: date, offset: int = 0) -> int:
    s = f"{birthdate.isoformat()}-{offset}"
    return int(hashlib.md5(s.encode()).hexdigest(), 16)


def generate_mock_natal_chart(
    birthdate: date,
    birth_time: str | None = None,
    birth_location: str | None = None,
) -> dict:
    sun_sign = get_sun_sign(birthdate)
    seed = _hash_seed(birthdate)

    # Deterministic planet assignments
    planets = {}
    planet_names = [
        "sun", "moon", "rising", "mercury", "venus", "mars",
        "jupiter", "saturn", "uranus", "neptune", "pluto",
    ]
    for i, planet in enumerate(planet_names):
        if planet == "sun":
            sign = sun_sign
        else:
            idx = _hash_seed(birthdate, i + 1) % 12
            sign = ALL_SIGNS[idx]

        degree = (_hash_seed(birthdate, i + 100) % 29) + 1
        house = (i % 12) + 1

        # Look up interpretation
        planet_data = PLANET_MEANINGS.get(planet, {})
        interpretation = planet_data.get(sign, "")
        role = planet_data.get("_role", "")

        planets[planet] = {
            "sign": sign,
            "degree": degree,
            "house": house,
            "interpretation": interpretation,
            "role": role,
        }

    # Calculate element/modality distribution
    elements = {"fire": 0, "earth": 0, "air": 0, "water": 0}
    modalities = {"cardinal": 0, "fixed": 0, "mutable": 0}
    for p in planets.values():
        el = SIGN_ELEMENTS.get(p["sign"], "fire")
        mod = SIGN_MODALITIES.get(p["sign"], "cardinal")
        elements[el] += 1
        modalities[mod] += 1

    # Determine dominant element and modality
    dominant_element = max(elements, key=elements.get)
    dominant_modality = max(modalities, key=modalities.get)

    return {
        **planets,
        "elements": elements,
        "modalities": modalities,
        "dominant_element": dominant_element,
        "dominant_modality": dominant_modality,
    }
