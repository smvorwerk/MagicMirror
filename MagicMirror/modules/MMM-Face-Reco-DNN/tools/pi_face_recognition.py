#인식과정에 필요한 패키지 import
from imutils.video import VideoStream
from imutils.video import FPS
import face_recognition
import argparse
import imutils
import pickle
import time
import cv2

#인식과정을 수행하기 위한 데이터 추가 
ap = argparse.ArgumentParser()
# harrcascade file이 경로상에 있다면 추가
ap.add_argument("-c", "--cascade", required=True,
	help = "path to where the face cascade resides")
# encodings가 완료된 파일이 경로상에 있다면 추가
ap.add_argument("-e", "--encodings", required=True,
	help="path to serialized db of facial encodings")
#객체의 어트리뷰트를 저장하는데 사용되는 딕셔너리 매핑 객체의 어트리뷰트를 돌려줌
args = vars(ap.parse_args())

print("[INFO] loading encodings + face detector...")
#인코딩이 완료된 데이터 파일을 읽음
data = pickle.loads(open(args["encodings"], "rb").read())
# Haar feature기반 다단계 분류를 이용한 객체 검출
detector = cv2.CascadeClassifier(args["cascade"])

print("[INFO] starting video stream...")

#라즈베리파이와 연결된 카메라 모듈 실행
vs = VideoStream(usePiCamera=True).start()

#실행후 2초간 프로세스 정지 (과부화방지)
time.sleep(2.0)
#카메라 실행 후 사진 촬영
fps = FPS().start()

#videoStream frame 반복함.
while True:
	#카메라 모듈에 촬영된 사진을 frame에 대입(프레임 읽기)
	frame = vs.read()
	#frame을 resize(크기 조절함)
	frame = imutils.resize(frame, width=500)

	#찍은 사진을 흑백으로 변환함
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	#찍은 사진을 컬러로 변환함
	rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

	#image에서 face detect함 ,scaleFactor는 이미지에서 얼굴 크기가 서로 다른 것을 보상해 주는 값
	rects = detector.detectMultiScale(gray, scaleFactor=1.1, 
	#얼굴 사이의 최소 간격(픽셀) =5, 얼굴의 최소크기 30x30
		minNeighbors=5, minSize=(30, 30))


#검출된 얼굴 주변에 사각형 박스 그리기
	boxes = [(y, x + w, y + h, x) for (x, y, w, h) in rects]
#인코딩 됬었던 데이터를 불러옴
	encodings = face_recognition.face_encodings(rgb, boxes)
	names = []

#촬영중 사진 인코딩된 사진, 저장된 인코딩된 사진을 비교, dataset에 저장된 인코딩사진들을 전부 비교하는 함수
	for encoding in encodings:
    	#dataset에 저장된 
		matches = face_recognition.compare_faces(data["encodings"],
			encoding)
		#아래 if문에서 match가 되지 않을시 Unknown
		name = "Unknown"

		#촬영사진과 dataset 사진과 비교
		if True in matches:
			matchedIdxs = [i for (i, b) in enumerate(matches) if b]
			counts = {}
			for i in matchedIdxs:
				name = data["names"][i]
				counts[name] = counts.get(name, 0) + 1
			name = max(counts, key=counts.get)
		names.append(name)

#얼굴이 검출된 박스를 재생성하고 dataset에 있는 사용자면 name을 해당 사용자로 변경
	for ((top, right, bottom, left), name) in zip(boxes, names):
		cv2.rectangle(frame, (left, top), (right, bottom),
			(0, 255, 0), 2)
		y = top - 15 if top - 15 > 15 else top + 15
		cv2.putText(frame, name, (left, y), cv2.FONT_HERSHEY_SIMPLEX,
			0.75, (0, 255, 0), 2)
	cv2.imshow("Frame", frame)
	key = cv2.waitKey(1) & 0xFF
	#카메라 정지하는 키='q'지정
	if key == ord("q"):
		break
	fps.update()

#사진 촬영기능 중지
fps.stop()
print("[INFO] elasped time: {:.2f}".format(fps.elapsed()))
print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))
cv2.destroyAllWindows()
vs.stop()