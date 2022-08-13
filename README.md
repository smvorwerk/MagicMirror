# **프로젝트 제목**

개인화 스마트미러 (Personalization Smart Mirror)

## **스마트 미러란?**

단순하게 실물의 이미지를 투영하여 사용자 눈에 반사하는 기존의 일반 거울과 다르게 실제 투영된 이미지와 함께 사용자의 생활 패턴, 모션, 음성, 감정 인식하여 사용자에게 편의를 줄 수 있는 정보, 영상, 사운드를 제공할 수 있는 증강현실 기능이 결합된 거울을 스마트 미러라고 한다.

## **개발 동기**

급변하는 4차 산업혁명시대에 맞추어 정보를 쉽게 습득하며, 빠르게 변화함으로 인해 디바이스에 네트워크(인터넷)가 연결된 기능을 탑재한 새로운 제품들이 개발되고 있다. 사회뿐만 아니라 가정, 일상에서 필수품인 거울은 시대에 맞춰 증강현실, 가상현실을 이용한 다양한 제품들이 제작, 판매되고 있다. 기존의 스마트미러는 (스마트미러 개념 이전의)키오스크와 마찬가지로 특정 장소에서 특정 목적을 가지고 단순한 정보를 제공하여 정보가 한정적이라는 단점이 존재한다. 따라서 사용자 인식 후 사용자가 지정한 정보 제공 목적을 목표로 하여 개발을 시작하려고 한다.

## **개발 목표**

카메라와 OpenCV 라이브러리를 이용한 영상처리를 통해 안면인식 데이터로 개인의 이미지 정보를 각각 저장하고 저장된 인코딩된 데이터를 기반으로 사용자를 구분하여 특정 정보를 제공한다. 거울을 이용하는 사용자의 편리성 증대와 기존의 스마트 미러의 동일한 데이터를 제공하는 단점을 보완하는 것이 목표이다.

## **참여 인원 및 담당 영역**

#### **Team Leader**

한재윤(Han Jaeyoon)

- 프로젝트 전반 코드 작성 및 개발 (OS설치 및 기본환경 셋팅, MagitMirror(이하MM)오픈소스 설치 및 코드 수정, OpenCV,dlib기반 안면인식 과정 코드 작성, WEB을 통한 이미지 업로드 및 등록 코드 작성, MM모듈(날씨(현재,미래,미세먼지), 구글어시스턴트, 뉴스피드 출력...) 추가 후 목적에 맞게 코드 변경, 가독성 향상을 위한 CSS수정)
- 프로젝트 git 관리

#### **Team Member**

강예빈(Kang Yebin)

- MM 캘린더 모듈과 구글 캘린더 연동.
- 스마트미러 외관 설계 (3D print 사용)
- 포스터 및 계획서 제작
- 프로젝트 구성 용품 주문
- 코드 작성에 참고할만한 래퍼런스 검색 및 아이디어 제공

## **프로젝트 진행 기간**

2021.07. ~ 2021.10.28

## **주요 기능**

- 사용자 얼굴 인식 : 사용자가 거울 앞에 대기하면 등록된 이미지 정보를 바탕으로 거울 앞에 선 사람의 얼굴을 인식하여 사용자를 판별한다.
- 정보 제공 : 등록된 사용자에게 맞는 정보를 출력한다
- 일정 출력 : 구글 캘린더와 동기화 일정을 출력한다.
- 스마트미러 제어: WEB으로 스마트 미러를 제어할 수 있다. (전원 끄기, 재부팅, 미러프로그램(Electron)재부팅, 사용자 이미지 업로드 및 등록(인코딩))
- Google Assistant 호출: 스마트폰의 구글어시스턴트를 동일하게 호출하여 사용자가 찾고자 하는 정보를 검색, 유튜브 영상재생을 수행할 수 있음

## **외관**

- 전면<br>![그림1](https://user-images.githubusercontent.com/55140122/138704933-cc8756ca-8ed9-4f83-a84a-80ace2a2c9bb.png)
- 내부<br> ![HW2](https://user-images.githubusercontent.com/55140122/138879476-8acc7336-0ccf-49a2-8a5d-93f5ab60ff03.jpg)
- 후면<br> ![HW3](https://user-images.githubusercontent.com/55140122/138879568-84160d55-bdbf-4ecf-9f1d-c56a9c0e20f1.jpg)

## **세부기능**

![그리임2](https://user-images.githubusercontent.com/55140122/138901111-6eb069e3-d156-450f-8118-004d40f4c3e2.png)

## **WEB Page**

- Home<br>
  ![web1](https://user-images.githubusercontent.com/55140122/138879821-0427393f-dcd7-460d-9d72-32005826b52a.JPG)
  <br><br>
- Image Upload Menu<br>
  ![web2](https://user-images.githubusercontent.com/55140122/138879919-4156b564-81e3-46da-986c-7a334851ff85.JPG)

## **하드웨어 구성**

![ima2](https://user-images.githubusercontent.com/55140122/138902061-03af824a-428d-4538-bc47-abc1e79ea8d5.JPG)

## **개발과정 및 진척도**

1. MagicMirror 오픈소스를 이용하여 디스플레이에 출력 (Electron 기반)
2. 기본 모듈(현재시간, 현재날씨) 추가 및 수정
3. 날씨예보 모듈 추가 및 라이브러리 수정
4. 현재 설정된 지역의 미세먼지 정보 출력 및 코드 수정
5. 개인화를 정보를 저장하기위한 Face-Reco-DNN module 추가 및 카메라(PiCamera) 추가
6. dataset의 이미지를 알고리즘(hog)을 통한 인코딩 과정 수행 및 사용자 이미지 인코딩 데이터 저장과정 수행
7. News Header 추가 및 RSS 링크 수정
8. 구글 캘린더와 연동 및 등록된 사용자 일정 디스플레이 출력
9. 구글 어시스턴트 호출, 구글 검색, 유튜브 영상 재생 기능 추가
10. 스마트미러 외관 틀 설계 및 제작 완료
11. WEB으로 미러 제어하기 위한 홈페이지 추가
12. WEB으로 원격으로 사용자 이미지 등록(storage에 저장), 이미지 인코딩 수행

## **Demo Video**

(1,2: SmartPhone 촬영, 3,4,5:PC에서 VNC viewer로 통한 녹화)

#### 1. 스마트미러 실행, 얼굴인식 수행, 사용자별로 정보 출력, 사용자 등록, 등록한 사용자 출력할 정보 지정.

[https://youtu.be/c7A0egszpHU](https://youtu.be/c7A0egszpHU)

#### 2. 구글 어시스턴트 호출 및 유튜브 영상 재생

[https://youtu.be/1hUnuKBZuKU](https://youtu.be/1hUnuKBZuKU)

#### 3. 카메라에 사용자 인식 수행 과정 (Detail)

[https://youtu.be/I8D6xEGI30w](https://youtu.be/I8D6xEGI30w)

#### 4. WEB에서 등록할 사용자 이미지 업로드 및 인코딩 수행

[https://youtu.be/3kPNe5DLkME](https://youtu.be/3kPNe5DLkME)

#### 5. WEB에서 사용자별로 출력할 정보(모듈) 지정 및 등록된 사용자 로그인시 정보 출력

[https://youtu.be/ciZR28THez8](https://youtu.be/ciZR28THez8)

## **사용된 오픈소스 및 라이브러리**

#### 1. MagicMirror

시중에 판매되는 제품 및 개발용으로 진행되는 대부분 스마트 미러는 이 모듈을 사용한다. 오픈소스이며 사용자가 특정한 기능을 추가하고 싶을 때 3d party module을 따로 추가하여 특정한 기능을 수행이 가능하다. Electron 프레임워크를 사용하며,HTML,CSS, JavaScript를 Node.js(npm)에 실행시키게 만들어 디스플레이에 출력할 수 있도록 하는 원리이다.
<br>공식문서 ([https://magicmirror.builders/](https://magicmirror.builders/))
<br>Electron에 대한 자세한 내용은 다음 링크에 자세히 설명되어 있다. ([https://cyberx.tistory.com/206](https://cyberx.tistory.com/206))

#### 2. OpenCV 4.1

OpenCV는 인텔에서 개발한 실시간 영상처리, 컴퓨터 비전과 기계 학습을 위한 소프트웨어 라이브러리로, 컴퓨터가 인간처럼 ‘시각’을 통해 받아들이는 정보로 다양한 기능들을 구현할 수 있도록 한다. 오픈소스이면서도 BSD 라이센스 하에 있기 때문에 연구및 상업용으로 이용 및 변경 구현 가능하다. 이 라이브러리는 수많은 영상처리와 이를통한 기계학습 알고리즘들을 가지고 있으며 이러한 알고리즘들은 사람의 얼굴을 인식및 감지, 객체 및 움직임 추적, 전체 장면을 위한 이미지들의 연결 등을 가능하게 하고(대표적인 예, 스트리트뷰), 이미 수많은 기업들도 이용하고 있는 라이브러리이다. C와C++로 구현되어 있고 Java, 안드로이드로도 구현할 수 있으며 윈도우, 리눅스, 안드로이드 그리고 MacOS 모두 지원한다.<br>
참고자료 ([https://www.pyimagesearch.com/2018/09/26/install-opencv-4-on-your-raspberry-pi/](https://www.pyimagesearch.com/2018/09/26/install-opencv-4-on-your-raspberry-pi/))

#### 3. dlib

dlib는 이미지 처리, 선형 대수 및 다양한 머신러닝 알고리즘에 활용된다. Cpp로 초기에 작성되었지만, python패키지로 설치하여 사용할 수 있다. HOG알고리즘을 사용하여 얼굴을 검출하는 기능에 많이 사용된다. <br>참고자료([https://hayunjong83.tistory.com/38](https://hayunjong83.tistory.com/38))

#### 4. Google Speech API

사용자가 음성으로 미러에 전달할 때 인식하여 텍스트로 변환하는 작업을 수행하는 API이다. <br>참고자료([https://cloud.google.com/speech-to-text/docs/libraries?hl=ko](https://cloud.google.com/speech-to-text/docs/libraries?hl=ko))

#### 5. Google Assistant API v3,

Google Assistant에 호출 및 명령을 수행할 때 사용되는 API
<br>공식 문서([https://developers.google.com/assistant/sdk/reference/rpc](https://developers.google.com/assistant/sdk/reference/rpc))

## **PPT**

(추후 추가 예정)
