import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("user_accounts/cornpdf-firebase-adminsdk-fbsvc-94f65f7884.json")

firebase_admin.initialize_app(cred)