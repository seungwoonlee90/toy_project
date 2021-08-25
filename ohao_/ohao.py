import glob
from PIL import Image

files = glob.glob("ohao/*.jpeg")

canvas_width = 896
canvas_height = 17654

canvas = Image.new('RGB', (canvas_width, canvas_height), 'white')
output_height = 0

for i in files :
    image = Image.open(i)
    width, height = image.size
    canvas.paste(image, (0, output_height))
    output_height += (height+160)

canvas.save('ohao.jpg')