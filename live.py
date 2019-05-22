from gtts import gTTS
import os

from flask import Flask, request
app = Flask(__name__)

@app.route('/say/', methods=['GET'])
def talk():
	to_talk = request.args.get('t')
	if str(to_talk) == '':
		return '200 OK'
	tts_obj = gTTS(text=to_talk, slow=False)
	tts_obj.save("main.mp3")
	os.system("omxplayer --vol 352  main.mp3")
	os.remove("main.mp3")
	return '200 OK'

if __name__ == '__main__':
	app.run()