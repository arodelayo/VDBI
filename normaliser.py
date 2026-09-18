from PIL import Image
from pathlib import Path
import io

# --- Choisis la méthode de détourage ---
# "rembg"    -> gratuit, en local, illimité (installer : pip install rembg pillow onnxruntime)
# "removebg" -> API remove.bg, meilleure sur les détails fins mais payante au-delà de 50 img/mois
METHODE = "rembg"

# Si tu utilises remove.bg, mets ta clé API ici (ou en variable d'environnement)
REMOVEBG_API_KEY = "EkNkNUNF8GXxD7HJrUjuDcnd"

SOURCE = Path("a-traiter")
DESTINATION = Path("normalisees")

CANVAS_SIZE = 1000
PRODUCT_SIZE = 820

DESTINATION.mkdir(exist_ok=True)

EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}


def detourer_rembg(source_path):
    from rembg import remove
    with open(source_path, "rb") as f:
        resultat = remove(f.read())
    return Image.open(io.BytesIO(resultat)).convert("RGBA")


def detourer_removebg(source_path):
    import requests
    with open(source_path, "rb") as f:
        reponse = requests.post(
            "https://api.remove.bg/v1.0/removebg",
            files={"image_file": f},
            data={"size": "auto"},
            headers={"X-Api-Key": REMOVEBG_API_KEY},
        )
    if reponse.status_code != requests.codes.ok:
        raise Exception(f"remove.bg a répondu {reponse.status_code} : {reponse.text}")
    return Image.open(io.BytesIO(reponse.content)).convert("RGBA")


def obtenir_image_detouree(source_path):
    # Si l'image a déjà un fond transparent, on ne repasse pas par le détourage
    image_test = Image.open(source_path)
    if image_test.mode == "RGBA" and image_test.getchannel("A").getextrema()[0] < 255:
        return image_test.convert("RGBA")

    if METHODE == "rembg":
        return detourer_rembg(source_path)
    elif METHODE == "removebg":
        return detourer_removebg(source_path)
    else:
        raise ValueError(f"Méthode inconnue : {METHODE}")


def normaliser_image(source, destination):
    image = obtenir_image_detouree(source)

    # Récupérer uniquement la zone visible
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()

    if bbox:
        image = image.crop(bbox)

    # Redimensionnement proportionnel
    ratio = min(
        PRODUCT_SIZE / image.width,
        PRODUCT_SIZE / image.height
    )

    new_width = round(image.width * ratio)
    new_height = round(image.height * ratio)

    image = image.resize(
        (new_width, new_height),
        Image.Resampling.LANCZOS
    )

    # Canevas transparent 1000 × 1000
    canvas = Image.new(
        "RGBA",
        (CANVAS_SIZE, CANVAS_SIZE),
        (255, 255, 255, 0)
    )

    # Centrer la basket
    x = (CANVAS_SIZE - image.width) // 2
    y = (CANVAS_SIZE - image.height) // 2

    canvas.alpha_composite(image, (x, y))

    canvas.save(
        destination,
        "PNG",
        optimize=True
    )


images = [
    file for file in SOURCE.iterdir()
    if file.suffix.lower() in EXTENSIONS
]

if not images:
    print("Aucune image trouvée dans 'a-traiter'.")

else:
    for image in images:
        output_path = DESTINATION / f"{image.stem}.png"

        try:
            normaliser_image(image, output_path)
            print(f"✓ {image.name} → {output_path.name}")

        except Exception as error:
            print(f"✗ Erreur avec {image.name} : {error}")

    print()
    print(f"Terminé ! {len(images)} image(s) traitée(s).")