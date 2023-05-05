import time
import random


while True:
    time.sleep(1)
    f = open(r"C:\Users\sstee\OneDrive\Documents\School_Samantha\23_SP_Software_Engineering_1_CS361\peasel\randomColor.txt")
    line = f.readline()
    if line == "request":
        randColor = lambda: random.randint(0,255)
        colorString = ('#%02X%02X%02X' % (randColor(), randColor(), randColor()))
        f.close()
        f = open(r"C:\Users\sstee\OneDrive\Documents\School_Samantha\23_SP_Software_Engineering_1_CS361\peasel\randomColor.txt", 'w')
        f.write(colorString)
    f.close()