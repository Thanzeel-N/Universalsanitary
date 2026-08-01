from django.contrib import admin
from .models import Category, Brand, Product, ProductImage, Project

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'order', 'slug')
    list_editable = ('order',)

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name',)

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'get_categories', 'brand', 'is_featured')
    list_filter = ('categories', 'brand', 'is_featured')
    filter_horizontal = ('categories',)
    inlines = [ProductImageInline]

    @admin.display(description='Categories')
    def get_categories(self, obj):
        return ', '.join(c.name for c in obj.categories.all())

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type')
