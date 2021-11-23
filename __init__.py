from flask import Flask

UPLOAD_FOLDER = ''
ALLOWED_EXTENSIONS = set('*.doc')

app = Flask(__name__)
app.config.from_object('config')