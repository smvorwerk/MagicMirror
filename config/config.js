let config = {
	address: "0.0.0.0", 	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/", 	// The URL path where MagicMirror is hosted. If you are using a Reverse proxy
					// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1","::ffff:192.168.35.X" ,"::ffff:X.X.X.X","X.X.X.X","192.168.35.126","192.168.35.X"], 	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "kr",
	timeFormat: 24,
	units: "metric",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging

	modules: [
		{
			module: "clock",
			position: "top_left",
			classes: 'always',
		},

		{
			module: "compliments",
			position: "lower_third"
		},

		//Current Weather original function
		{
			module: "currentweather",
			position: "top_left",
			classes: 'always',
			config: {
				location: "Cheongju, KR",
				locationID: "1845604",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "62eeac7286c33c29902a61152108799f"
			}
		},

		//Air Pollution Display
		{
			module: 'MMM-AirQuality',
			header: "대기오염",
			position: 'top_left',
			classes: 'always',
			//lang: en,
			config: {
				location: 'cheongju', // the location to check the index for
			}

		},

		//날씨 예보
		{
			disabled: false,
			module: 'MMM-WeatherOrNot',
			position: 'top_left',
			classes: 'always',
			config: {
				location: "cheongju-si",                // See instructions
				locationCode: "36d64127d49",              // See instructions
				languages: "en",                          // See Languages list
				tempUnits: "C",                           // F or C
				font: "Tahoma",                           // See Font list
				textColor: "#ffffff",                     // Hex color codes.
				htColor: "#ffffff",                       // high temp color. Hex color codes.
				ltColor: "#00dfff",                       // low temp color. Hex color codes.
				sunColor: "#febc2f",                      // Hex color codes.
				moonColor: "#dfdede",                     // Hex color codes.
				cloudColor: "#dfdede",                    // Hex color codes.
				cloudFill: "#1f567c",                     // Hex color codes.
				rainColor: "#93bffe",                     // Hex color codes.
				snowColor: "#dfdede",                     // Hex color codes.
				height: "220px",                          // module is responsive to changes
				width: "350px",                          // module is responsive to changes
				label: "New Dorp",                        // Location seems logical . .
				label2: "Staten Island",                  // . . . or anything you like
				days: "7",                                // 3, 5 or 7
				theme: "dark",                            // See Themes list *** theme overrides bgColor. ***
				bgColor: "#000000",                       // theme overrides bgColor.
				icons: "Climacons Animated",              // Iconvault, Climacons or Climacons Animated
				animationSpeed: 3000,
				updateInterval: 10 * 60 * 1000,
			}
		},

		{
			module: 'calendar_monthly',
			position: 'top_center',
			classes: 'Billgates',
			config: {
				// The config property is optional
				// Without a config, a default month view is shown
				// Please see the 'Configuration Options' section for more information
			}
		},

		// {
		// 	module: "calendar",
		// 	header: "calendar_Detail",
		// 	classes: 'Billgates',
		//  	position: "top_center",
		// 	config: {
		// 		calendars: [
		// 			{
		// 				symbol: "calendar-check",
		// 				url: "https://calendar.google.com/calendar/ical/cbnugrade%40gmail.com/private-2c50420b8f6a3dd4d807573635366158/basic.ics"					}
		// 		]
		// 	}
		// },

		{
			module: "newsfeed",
			position: "bottom_center",
			classes: 'Biden',
			config: {
				feeds: [
					{
						title: "연합뉴스",
						url: "https://www.yonhapnewstv.co.kr/browse/feed/"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},

		{
			module: 'MMM-SmartTouch',
			position: "bottom_center",    // This can be any of the regions.(bottom-center Recommended)
			classes: 'always',
			config: {
				// None configuration options defined 
			}
		},
		
		{
			module: 'MMM-Face-Reco-DNN',
			classes: 'always',
			config: {
				// 15초동안 사람이 감지되지 않으면 로그아웃됨
				logoutDelay: 15000,
				// 2초간 계속 카메라 실행
				checkInterval: 2000,
				// 사람이 감지되지 않으면 noFace 클래스로 지정
				noFaceClass: 'noface',
				// dataset에 없는 사람이 감지되면 unknown 클래스로 지정
				unknownClass: 'unknown',
				// dataset에 있는 사람이면 known 클래스로 지정
				knownClass: 'known',
				// 미확인 인물 또는 사람감지 되지 않을 시 기본값으로 설정
				defaultClass: 'default',
				// 어떤 얼굴이 감지되도 everyone클래스로 지정된 모듈 출력함
				everyoneClass: 'everyone',
				// always 클래스로 지정된 모듈은 항상 출력함
				alwaysClass: 'always',
				// haarcascade로 사람얼굴 탐지 방법을 사용할 시 해당 알고리즘 파일 경로
				cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
				// dataset에서 인코딩된 결과파일 경로
				encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
				// 라즈베리파이 카메라 이용하므로 1
				usePiCamera: 1,
				source: 0,
				// 무회전 카메라이므로 default 0으로 설정
				rotateCamera: 0,
				// 얼굴인식 방법 (encoding 방법 설정)
				// dnn = deep neural network, haar = haarcascade
				method: 'dnn',
				// 얼굴 탐지 방법 설정
				// "hog" : 정확도 낮지만 Cpu부하가 적고 연산속도 빠름
				// "cnn" : 정확도 높지만 CPU/GPU 둘다 사용해야 하므로 부하가 많이 듦
				detectionMethod: 'hog',
				// 모듈 on/off시 대기시간
				animationSpeed: 0,
				// 오류발생시 경로지정
				pythonPath: null,
				// MagicMirror오류발생시 default page출력
				welcomeMessage: true,
				// Unknown user가 카메라에 찍힐시 이 사람도 인코딩 할 것인가 false (추후 기능 추가 예정)
				extendDataset: false,
				// dataset경로
				dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
				tolerance: 0.6,
				multiUser: 0,
			}
		},

		{
			module: "Face-Reco-Multi-Users",
			position: "top_right",
			classes: 'always',
			config: {
				useMMMFaceRecoDNN: true,
				// showTitle: true,
				width: "200px",
			}
		},
	
	
		  {
			module: 'MMM-Remote-Control',
			// uncomment the following line to show the URL of the remote control on the mirror
			position: 'bottom_right',
			classes: 'always',
			// you can hide this module afterwards from the remote control itself
			config: {
				customCommand: {},  // Optional, See "Using Custom Commands" below
				showModuleApiMenu: true, // Optional, Enable the Module Controls menu
				secureEndpoints: true, // Optional, See API/README.md
				// uncomment any of the lines below if you're gonna use it
				// customMenu: "custom_menu.json", // Optional, See "Custom Menu Items" below
				// apiKey: "", // Optional, See API/README.md for details
				// classes: {} // Optional, See "Custom Classes" below
			}
		},

		{
			module: "MMM-Detector",
			position: "top_left",
			classes: 'always',
			configDeepMerge: true,
			config: {
			  debug: false,
			  autoStart: true,
			  useLogos: true,
			  micConfig: {
				recorder: "auto",
				device: "default",
				// only for snowboy:
				audioGain: 2.0,
				applyFrontend: true // When you use only `snowboy` and `smart_mirror`, `false` is better. But with other models, `true` is better.
			  },
			  newLogos: {
				default: "default.png"
			  },
			  detectors: [
				{
				  detector: "Snowboy",
				  Model: "jarvis",
				  Sensitivity: null,
				  Logo: "google",
				  autoRestart: false,
				  onDetected: {
					notification: "GA_ACTIVATE"
				  }
				}
			  ],
			  NPMCheck: {
				useChecker: true,
				delay: 10 * 60 * 1000,
				useAlert: true
			  }
			}
		  },

		  {
			module: "MMM-GoogleAssistant",
			position: "top_left",
			classes: 'always',
			configDeepMerge: true,
			config: {
			  debug: false,
			  assistantConfig: {
				lang: "ko-KR",
				latitude: 36.62915581059808,
				longitude: 127.45630791144228,
			  },
			  responseConfig: {
				chimes: {},
				imgStatus: {},
				zoom: {}
			  },
			  micConfig: {},
			  Extented: {
				useEXT: false,
				youtube: {},
				links: {},
				photos: {},
				volume: {},
				welcome: {},
				screen: {},
				touch: {},
				pir: {},
				governor: {},
				internet: {},
				cast: {},
				spotify: {
				  useSpotify: false,
				  visual: {},
				  player: {}
				},
			  },
			  recipes: [],
			  NPMCheck: {}
			}
		  },



	]
};
if (typeof module !== "undefined") {module.exports = config;}