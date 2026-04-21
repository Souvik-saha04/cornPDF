from firebase_admin import auth as firebase_auth
from django.contrib.auth import get_user_model

User = get_user_model()

def get_user_from_token(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None, "No token provided"

    try:
        token = auth_header.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(token)

        uid = decoded_token.get("uid")
        email = decoded_token.get("email", "")

        user, _ = User.objects.get_or_create(
            username=uid,
            defaults={"email": email}
        )

        return user, None

    except Exception as e:
        return None, str(e)