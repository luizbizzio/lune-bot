from sys import argv
from pathlib import Path
from PIL import Image, ImageSequence
import ffmpy

class main():
    def __init__(self):
        path = Path(argv[1])
        out = Path(argv[2])

        img = Image.open(path)

        frames: list[Image.Image] = []
        for frame in ImageSequence.Iterator(img):
            im2 = Image.new("RGB", frame.size, (255, 255, 255))
            im2.paste(frame)
            frames.append(im2.convert('RGB'))

        frames[0].save(out.with_suffix('.gif'),
                    format='gif',
                    save_all=True,
                    append_images=frames[1:],
                    optimize=False,
                    duration=img.info.get("duration", 10),
                    loop=1,
                    quality=100)
        
        self.gif2mp4(out.with_suffix('.gif'), out.with_suffix('.mp4'))

    # get all frames and do a .mp4 file
    def gif2mp4(self, path: Path, out: Path):
        ff = ffmpy.FFmpeg(
            inputs={path: None},
            outputs={out: None}
        )
        ff.run()

if __name__ == "__main__":
    outPath = main()
