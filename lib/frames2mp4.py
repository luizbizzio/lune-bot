from sys import argv
from pathlib import Path
from PIL import Image, ImageSequence
import os
import ffmpy

class main():
    def __init__(self):
        cl = argv[1]
        path = Path(argv[2])
        out = Path(argv[3])

        os.system(f'ffmpeg -r ${cl} -i ../{path} -vcodec png \"../{out}\"')
        
if __name__ == "__main__":
    outPath = main()
