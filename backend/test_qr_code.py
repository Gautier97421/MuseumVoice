import qrcode
from time import sleep, strftime
from datetime import datetime


img = qrcode.make('https://ruby-disharmonious-fetchingly.ngrok-free.dev'+'/test?token=abc')
img.save('static/audioguidemusee_qr.png')
