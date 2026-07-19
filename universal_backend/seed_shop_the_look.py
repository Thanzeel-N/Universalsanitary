import os
import sys
import django

# Set up Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'universal_backend.settings')
django.setup()

from core.models import Product, Category, Brand, ProductImage

jaquar, _ = Brand.objects.get_or_create(name='Jaquar')
bath_category, _ = Category.objects.get_or_create(name='Bath Accessories')

products_data = [
    {
        "title": "Freestanding Bath Tube",
        "desc": "An elegantly contoured freestanding bath that serves as the luxurious centerpiece of the modern bathroom.",
        "slug": "freestanding-bath-tube",
        "image": "images/space/bath_tube.webp"
    },
    {
        "title": "Thin Rim Table Top Basin",
        "desc": "Solo by Jaquar presents JDS series washbasins with a thin rim table top design.",
        "slug": "thin-rim-table-top-basin",
        "image": "images/space/wash_basin.webp"
    },
    {
        "title": "Rimless Wall-Hung WC",
        "desc": "Solo by Jaquar presents Rimless WC with hidden installation screws for better aesthetics.",
        "slug": "rimless-wall-hung-wc",
        "image": "images/space/toilet_closet.webp"
    },
    {
        "title": "Beta L-Shaped Shower Enclosure",
        "desc": "Premium L-shaped glass shower enclosure with high-quality hinges and tempered safety glass.",
        "slug": "beta-l-shaped-shower-enclosure",
        "image": "images/space/shower_closet.webp"
    },
    {
        "title": "Concealed Stop Cocks",
        "desc": "Exposed part kit of two concealed stop cocks in Blush Gold Bright PVD finish.",
        "slug": "concealed-stop-cocks",
        "image": "images/space/faucet.webp"
    }
]

for p_data in products_data:
    product, created = Product.objects.get_or_create(
        slug=p_data['slug'],
        defaults={
            'name': p_data['title'],
            'description': p_data['desc'],
            'category': bath_category,
            'brand': jaquar,
            'is_featured': False
        }
    )
    if created:
        # Create an image entry for it if we want, but since they exist in public/images/space it's just for the DB link
        # The frontend expects ProductImage models with 'image' URL
        # We can simulate by saving a mock file path to the DB
        ProductImage.objects.get_or_create(
            product=product,
            image=p_data['image'],
            is_primary=True
        )
        print(f"Created product: {product.name}")
    else:
        print(f"Product already exists: {product.name}")

print("Done.")
