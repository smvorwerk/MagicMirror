#인코딩 과정을 수행하기 위한 모듈 import
from imutils import paths
import face_recognition
import argparse
import pickle
import cv2
import os

#인코딩 과정을 수행하기 위한 데이터 추가
ap = argparse.ArgumentParser()
#dataset 폴더의 image파일들 추가
ap.add_argument("-i", "--dataset", required=False, default="../dataset/",
	help="path to input directory of faces + images")
# python3 encode.py -i ../dataset/ -e encodings.pickle -d hog 인코딩 과정 수행후 encoding.pickle파일 추가
ap.add_argument("-e", "--encodings", required=False, default="encodings.pickle",
	help="path to serialized db of facial encodings")
#face detection 모델을 hog 방식으로 함
ap.add_argument("-d", "--detection-method", type=str, default="hog",
	help="face detection model to use: either `hog` or `cnn`")
args = vars(ap.parse_args())

# detaset폴더에 있는 이미지 리스트 불러옴
print("[INFO] quantifying faces...")
imagePaths = list(paths.list_images(args["dataset"]))

# known 인코딩 리스트와 known 이름들을 설정하여 리스트에 저장
knownEncodings = []
knownNames = []

# 이미지가 저장된 경로에 반복문을 수행함
for (i, imagePath) in enumerate(imagePaths):
	# 이미지 경로에 name들을 추출함
	print("[INFO] processing image {}/{} - {}".format(i + 1,
		len(imagePaths),
		imagePath))
	name = os.path.basename(os.path.dirname(imagePath))

	# 입력된 이미지를 불러오고 RGB 색상으로 변환한다. (OpenCV ordering)
	image = cv2.imread(imagePath)
	rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

	# 입력된 각각의 이미지에서 얼굴에 해당하는 부분을 감지하고 그 부분의 bounding box 좌표를 조절함.
	boxes = face_recognition.face_locations(rgb,
		model=args["detection_method"])

	# 각 얼굴에 대한 128개의 측정값을 임베딩 한다.
	encodings = face_recognition.face_encodings(rgb, boxes)

	# 인코딩된 파일에 대해 반복함.
	for encoding in encodings:
		# 인코딩된 파일안에 각 이미지마다 name을 부여하고 known 클래스에 추가
		knownEncodings.append(encoding)
		knownNames.append(name)

# 위에서 인코딩된 이미지 파일을 .pickle에 쓰기모드로 저장함.
print("[INFO] serializing encodings...")
data = {"encodings": knownEncodings, "names": knownNames}
f = open(args["encodings"], "wb")
f.write(pickle.dumps(data))
f.close()
