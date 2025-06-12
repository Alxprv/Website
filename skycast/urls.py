"""
URL configuration for myecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from store import views
from django.contrib.auth.views import PasswordResetView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', views.home),
    path('logout/', views.logout_view, name='logout'),
    path('', views.home, name='home'),
    path('index/', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('products/', views.products, name='products'),
    path('services/', views.services, name='services'),
    path('news/', views.news, name='news'),
    path('contact/', views.contact, name='contact'),
    path('login/', views.login_view, name='login'),
    path('cart/', views.cart, name='cart'),
    path('register/', views.register_view, name='register'),
    path('password_reset/', PasswordResetView.as_view(
        template_name='store/password_reset_form.html',
        email_template_name='store/password_reset_email.html',
        subject_template_name='store/password_reset_subject.txt',
        success_url='/password_reset_done/'
    ), name='password_reset'),
    path('request_quote/', views.request_quote, name='request_quote'),
    path('customer_portal/', views.customer_portal, name='customer_portal'),
    path('order_history/', views.order_history, name='order_history'),
    path('inquiry_history/', views.inquiry_history, name='inquiry_history'),
    path('support/', views.support, name='support'),
    path('profile_settings/', views.profile_settings, name='profile_settings'),
    path('store/', views.store, name='store'),
    path('checkout/', views.checkout, name='checkout'),
    path('api/products/', views.product_list_api, name='product_list_api'),
    path('request-quote/', views.request_quote, name='request_quote'),
    path('submit-quote/', views.submit_quote, name='submit_quote'),
    path('contact-quote/', views.contact_quote, name='contact_quote'),
    path('home-quote/', views.home_quote, name='home_quote'),
    path('cart-quote/', views.cart_quote, name='cart_quote'),
    path('discover-more/', views.discover_more, name='discover_more'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
