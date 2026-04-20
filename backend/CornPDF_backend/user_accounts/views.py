from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from firebase_admin import auth

User = get_user_model()

@api_view(['POST'])
def firebase_auth(request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return Response({"error": "No authorization token received"}, status=401)

    try:
        token = auth_header.split(" ")[1]

        decoded_token = auth.verify_id_token(token)

        uid = decoded_token.get("uid")
        email = decoded_token.get("email")

        user, created = User.objects.get_or_create(
            firebase_uid=uid,
            defaults={"username": email, "email": email}
        )

        return Response({
            "message": "User Authenticated successfully",
            "user_id": user.id
        })

    except Exception as e:
        return Response({"error": str(e)}, status=401)
    



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({
        "message": f"Hello {request.user.email}"
    })