# from pydub import AudioSegment

import ffmpeg
stream = ffmpeg.input('folder/False_False_False.mp3')
stream = ffmpeg.hflip(stream)
stream = ffmpeg.output(stream, 'output.mp4')
ffmpeg.run(stream)

# AudioSegment.ffmpeg = "C:\\ffmpeg\\bin\\ffmpeg.exe"

# sound = AudioSegment.from_mp3("folder/False_False_False.mp3")
# sound2 = AudioSegment.from_mp3("./mp3/True_True_True.mp3")

# # len() and slicing are in milliseconds
# halfway_point = len(sound) / 2
# second_half = sound[halfway_point:]

# # Concatenation is just adding
# second_half_3_times = sound + sound2

# # writing mp3 files is a one liner
# second_half_3_times.export("./mp3/test.mp3", format="mp3")
