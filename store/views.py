from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import EmailAuthenticationForm, RegisterForm
from django.contrib.auth.forms import AuthenticationForm
from django.conf import settings
from .forms import UserProfileForm
from .models import UserProfile
from .models import Product
import requests
import json
from decimal import Decimal

# Create your views here.
# def home(request):
#     return HttpResponse("Hello, World!")

def home(request):
    context = {}
    return render(request, 'store/home.html', context)

def about(request):
    context = {}
    return render(request, 'store/about.html', context)

def products(request):
    context = {}
    return render(request, 'store/product.html', context)

def services(request):
    context = {}
    return render(request, 'store/service.html', context)

def news(request):
    context = {}
    return render(request, 'store/news.html', context)

def contact(request):
    context = {}
    return render(request, 'store/contact.html', context)

def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            # auto login
            #login(request, user)
            return redirect("login")
    else:
        form = RegisterForm()
    return render(request, "store/register.html", {"form": form})

def login_view(request):
    if request.method == "POST":
        form = EmailAuthenticationForm(request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("/index")
    else:
        form = EmailAuthenticationForm()
    return render(request, "store/login.html", {"form": form})

def logout_view(request):
    logout(request)
    return redirect("home")

def forgot_password(request):
    context = {}
    return render(request, 'store/password_reset_form.html', context)

def request_quote(request):
    context = {}
    return render(request, 'store/request_quote.html', context)

def customer_portal(request):
    context = {}
    return render(request, 'store/customer_portal.html', context)

def order_history(request):
    context = {}
    return render(request, 'store/order_history.html', context)

def inquiry_history(request):
    context = {}
    return render(request, 'store/inquiry_history.html', context)

def support(request):
    context = {}
    return render(request, 'store/support.html', context)

@login_required
def profile_settings(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()

            current_password = request.POST.get('current-password')
            new_password = request.POST.get('new-password')
            confirm_password = request.POST.get('confirm-password')

            if current_password or new_password or confirm_password:
                if not request.user.check_password(current_password):
                    messages.error(request, "Current password is incorrect.")
                elif new_password != confirm_password:
                    messages.error(request, "New passwords do not match.")
                else:
                    request.user.set_password(new_password)
                    request.user.save()
                    update_session_auth_hash(request, request.user)
                    messages.success(request, "Password updated successfully.")

            return redirect('profile_settings')
    else:
        form = UserProfileForm(instance=profile)

    return render(request, 'store/profile_settings.html', {'user': user, 'form': form, 'profile': profile,})

def request_quote(request):
    context = {}
    return render(request, 'store/request_quote.html', context)

def submit_quote(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'message': 'Login required.', 'redirect': '/login/'})
    if request.method == 'POST':
        user_profile = request.user.userprofile  # when User and UserProfile connect with OneToOneField

        telegram_username = user_profile.telegram_name  # example: "@me0wnggi"

        # take Form fields
        first_name = request.POST.get('first-name')
        last_name = request.POST.get('last-name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        product_type = request.POST.get('product')
        quantity = request.POST.get('quantity')
        requirements = request.POST.get('requirements')

        # configure telegram message
        message = (
            f"📩 [Quote Request]\n\n"
            f"👤 Name: {first_name} {last_name}\n"
            f"📧 Email: {email}\n"
            f"📞 Phone: {phone}\n"
            f"📦 Product: {product_type} (x{quantity})\n"
            f"📝 Notes: {requirements}"
        )

        send_telegram_message(telegram_username, message)

        return JsonResponse({'success': True, 'message': 'Your quote request has been sent!'})

    return JsonResponse({'success': False, 'message': 'Invalid request.'})

def contact_quote(request):
    if request.method == 'POST':
        telegram_username = "@me0wnggi"

        # take Form fields
        first_name = request.POST.get('first-name')
        last_name = request.POST.get('last-name')
        company = request.POST.get('company')
        email = request.POST.get('email')
        enquiry = request.POST.get('enquiry')
        marketing = request.POST.get('marketing-consent') == 'on'

        # configure telegram message
        message = (
            f"📩 [Contact]\n\n"
            f"👤 Name: {first_name} {last_name}\n"
            f"🏢 Company: {company}\n"
            f"📧 Email: {email}\n"
            f"💬 Enquiry: {enquiry or 'No message provided.'}\n"
            f"📣 Marketing Opt-in: {'Yes' if marketing else 'No'}"
        )

        send_telegram_message(telegram_username, message)

        return JsonResponse({'success': True, 'message': 'Your quote request has been sent!'})

    return JsonResponse({'success': False, 'message': 'Invalid request.'})

def home_quote(request):
    if request.method == 'POST':
        telegram_username = "@me0wnggi"

        # take Form fields
        full_name = request.POST.get('full-name')
        email = request.POST.get('email')
        company = request.POST.get('phone')
        subject = request.POST.get('subject')
        msg = request.POST.get('message')

        # configure telegram message
        message = (
            f"📩 [Request Quotation From Home page]\n\n"
            f"👤 Name: {full_name} \n"
            f"📧 Email: {email}\n"
            f"🏢 Company: {company}\n"            
            f"🏢 Subject: {subject}\n"            
            f"💬 Message: {msg or 'No message provided.'}\n"
        )

        send_telegram_message(telegram_username, message)

        return JsonResponse({'success': True, 'message': 'Your quote request has been sent!'})

    return JsonResponse({'success': False, 'message': 'Invalid request.'})

def cart_quote(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'message': 'Login required.', 'redirect': '/login/'})
    if request.method == 'POST':
        user_profile = request.user.userprofile  # when User and UserProfile connect with OneToOneField
        fullname = f"{request.user.first_name} {request.user.last_name}"
        telegram_username = user_profile.telegram_name  # example: "@me0wnggi"

        # take Form fields
        cart_json = request.POST.get('cart', '[]')
        try:
            cart_items = json.loads(cart_json)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid cart data.'})

        # configure telegram message
        message = (
            f"📩 [Cart Request]\n\n"
            f"👤 Name: {fullname} \n"
            f"📝 Cart:\n"
        )

        total = Decimal('0.00')
        for item in cart_items:
            name = item.get('name', 'Unknown Product')
            quantity = item.get('quantity', 1)
            price = Decimal(str(item.get('price', '0')))
            subtotal = price * quantity
            total += subtotal
            message += f"- {name} x{quantity} @ ${price:.2f} = ${subtotal:.2f}\n"

        message += f"\n💰 Total: ${total:.2f}"
        send_telegram_message(telegram_username, message)

        return JsonResponse({'success': True, 'message': 'Your quote request has been sent!'})

    return JsonResponse({'success': False, 'message': 'Invalid request.'})

def send_telegram_message(username, text):
    token = settings.TELEGRAM_BOT_TOKEN
    chatID = settings.CHART_ID
    url = f'https://api.telegram.org/bot{token}/sendMessage'

    payload = {
        'chat_id': chatID,
        'text': text,
        'parse_mode': 'Markdown'
    }
    response = requests.post(url, data=payload)
    return response.ok

def main(request):
    context = {}
    return render(request, 'store/main.html', context)

def store(request):
    context = {}
    return render(request, 'store/store.html', context)

def cart(request):
    context = {}
    return render(request, 'store/cart.html', context)

def checkout(request):
    context = {}
    return render(request, 'store/checkout.html', context)

def product_list_api(request):
    products = Product.objects.all()
    data = [
        {
            'id': product.id,
            'name': product.name,
            'price': float(product.price),
            'image': product.image,
            'description': product.description,
        }
        for product in products
    ]
    return JsonResponse(data, safe=False)

def discover_more(request):
    context = {}
    return render(request, 'store/discover_more.html', context)