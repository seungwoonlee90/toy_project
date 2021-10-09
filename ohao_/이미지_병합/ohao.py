import os
import glob
from PIL import Image

files = glob.glob("ohao/*.jpeg")
files.sort(key=os.path.getmtime)


canvas_width = 1280
canvas_height = len(files) * 2000

canvas = Image.new('RGB', (canvas_width, canvas_height), 'white')
output_height = 0

for i, file in enumerate(files) :
    image = Image.open(file)
    width, height = image.size
    
    if i == 0 :
        canvas.paste(image, (140, output_height))
        output_height += (height+200)
    else :
        canvas.paste(image, (0, output_height))
        output_height += (height+200)

canvas.save('ohao.jpg')