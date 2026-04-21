from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Docs
from utils.firebase_auth import get_user_from_token
import cloudinary.uploader


@api_view(["POST"])
def create_document(request):
    user, error = get_user_from_token(request)

    if error:
        return Response({"error": error}, status=401)

    data = request.data

    doc = Docs.objects.create(
        user=user,
        file_name=data.get("file_name"),
        file_url=data.get("file_url"),
        public_id=data.get("public_id"),
        file_size=data.get("file_size"),
        status="UPLOADED"
    )

    return Response({
        "message": "Document created",
        "document_id": doc.id
    }, status=201)


@api_view(["GET"])
def list_documents(request):
    user, error = get_user_from_token(request)

    if error:
        return Response({"error": error}, status=401)

    docs = Docs.objects.filter(user=user).order_by("-uploaded_at")

    data = [
        {
            "id": doc.id,
            "file_name": doc.file_name,
            "file_url": doc.file_url,
            "status": doc.status,
            "uploaded_at": doc.uploaded_at,
        }
        for doc in docs
    ]

    return Response(data)




@api_view(["GET"])
def retrieve_document(request, doc_id):
    user, error = get_user_from_token(request)

    if error:
        return Response({"error": error}, status=401)

    try:
        doc = Docs.objects.get(id=doc_id, user=user)
    except Docs.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    return Response({
        "id": doc.id,
        "file_name": doc.file_name,
        "file_url": doc.file_url,
        "public_id": doc.public_id,
        "status": doc.status,
        "uploaded_at": doc.uploaded_at,
    })



@api_view(["DELETE"])
def delete_document(request, doc_id):
    user, error = get_user_from_token(request)

    if error:
        return Response({"error": error}, status=401)

    try:
        doc = Docs.objects.get(id=doc_id, user=user)
    except Docs.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    # Delete from Cloudinary
    cloudinary.uploader.destroy(doc.public_id)

    # Delete from DB
    doc.delete()

    return Response({"message": "Deleted successfully"})