from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Category, Brand, Product, Project, ProductImage
from .serializers import CategorySerializer, BrandSerializer, ProductSerializer, ProjectSerializer, ProductImageSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        is_featured = self.request.query_params.get('is_featured', None)
        if is_featured is not None:
            if is_featured.lower() == 'true':
                queryset = queryset.filter(is_featured=True)
            elif is_featured.lower() == 'false':
                queryset = queryset.filter(is_featured=False)
        return queryset

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_image(self, request, slug=None):
        product = self.get_object()
        image = request.FILES.get('image')
        if not image:
            return Response({'detail': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)
        is_primary = request.data.get('is_primary', False) in ['true', 'True', True]
        
        # Optionally, delete existing primary image or set to False if this one is primary
        if is_primary:
            ProductImage.objects.filter(product=product, is_primary=True).update(is_primary=False)
            
        product_image = ProductImage.objects.create(product=product, image=image, is_primary=is_primary)
        return Response(ProductImageSerializer(product_image).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['delete'], url_path='delete_image/(?P<image_id>[^/.]+)')
    def delete_image(self, request, slug=None, image_id=None):
        product = self.get_object()
        try:
            image = ProductImage.objects.get(id=image_id, product=product)
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except ProductImage.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
