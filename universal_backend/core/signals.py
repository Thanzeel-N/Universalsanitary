import os
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from .models import Category, Brand, ProductImage, Project

def delete_file_if_exists(file_field):
    """Deletes a file from the filesystem if it exists."""
    if file_field and hasattr(file_field, 'path'):
        try:
            if os.path.isfile(file_field.path):
                os.remove(file_field.path)
        except Exception as e:
            print(f"Error deleting old image file {file_field.path}: {e}")

def handle_pre_save_image_change(sender, instance, image_field_name):
    """
    Checks if an image field has changed on save, and deletes the old file if it was replaced.
    """
    if not instance.pk:
        return
    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_file = getattr(old_instance, image_field_name, None)
    new_file = getattr(instance, image_field_name, None)

    if old_file and old_file != new_file:
        delete_file_if_exists(old_file)

# ── PRE-SAVE SIGNALS (Remove old file when image is replaced) ────────────────
@receiver(pre_save, sender=ProductImage)
def product_image_pre_save(sender, instance, **kwargs):
    handle_pre_save_image_change(sender, instance, 'image')

@receiver(pre_save, sender=Category)
def category_pre_save(sender, instance, **kwargs):
    handle_pre_save_image_change(sender, instance, 'hero_image')

@receiver(pre_save, sender=Brand)
def brand_pre_save(sender, instance, **kwargs):
    handle_pre_save_image_change(sender, instance, 'logo')

@receiver(pre_save, sender=Project)
def project_pre_save(sender, instance, **kwargs):
    handle_pre_save_image_change(sender, instance, 'featured_image')

# ── POST-DELETE SIGNALS (Remove file when database record is deleted) ────────
@receiver(post_delete, sender=ProductImage)
def product_image_post_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.image)

@receiver(post_delete, sender=Category)
def category_post_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.hero_image)

@receiver(post_delete, sender=Brand)
def brand_post_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.logo)

@receiver(post_delete, sender=Project)
def project_post_delete(sender, instance, **kwargs):
    delete_file_if_exists(instance.featured_image)
