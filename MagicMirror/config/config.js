var config = {
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "kr",
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
			position: "top_center"
		},

		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "일정 및 공휴일",
			position: "top_right",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						//url: "https://calendar.google.com/calendar/ical/ko.south_korea%23holiday%40group.v.calendar.google.com/public/basic.ics"
						url: "http://www.google.com/calendar/ical/46hp89gvrbnnh1gpadt0a4hdr4%group.calender.google.com/public/basic.ics"
					},
					{
						//구글 캘린더 연동
						url: "https://calendar.google.com/calendar/ical/cbnugrade%40gmail.com/private-2c50420b8f6a3dd4d807573635366158/basic.ics"
					}
				]
			}
		},

//Current Weather original function

		{
			module: "currentweather",
			position: "top_left",
			config: {
				location: "Cheongju, KR",
				locationID: "1845604",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "62eeac7286c33c29902a61152108799f"
			}
		},

		/*
		{
			module: "weatherforecast",
			position: "top_left",
			header: "Weather Forecast",
			config: {
				location: "Cheongju, KR",
				locationID: "1845604",  //ID from https://openweathermap.org/city
				appid: "62eeac7286c33c29902a61152108799f"
			}
		},
*/
		//Air Pollution Display (추가해야함)
		{
			module: 'MMM-AirQuality',
			header: "대기오염",
			position: 'top_left',
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
			module: "MMM-Face-Multi-User-Recognition-SMAI",
			position: "top_right",
			config: {
			  useMMMFaceRecoDNN: true
			}
		  },
		  
{
			module: "compliments",
			position: "lower_third",
			config: {
		        	compliments: {
		          	anytime: [ //아무때나
		            "오늘도 좋은 하루!"
		          	],
		          morning: [ //아침
		            "좋은 아침!",
		            "힘찬 아침!",
		            "잘 잤나요?"
		          ],
		          afternoon: [ //오후
		            "안녕하세요!",
		            "멋져요!",
		            "잘 지내고 있나요!"
		          ],
		          evening: [ //저녁
		            "와우! 잘 지냈나요?",
		            "멋져보이네요!",
		            "반가워요!"
		          ],
		          day_sunny: [//맑은 낮
		            "날씨 좋은데 어디 안나가세요?"
		          ],
		          day_cloudy: [//흐린 낮
		            "구름낀 날씨~~ 혹시 기분도?"
		          ],
		          cloudy: [//흐림
				"날씨가 흐리니 제 마음도 흐리네요"
		          ],
		          cloudy_windy: [//흐리고 바람
				"흐리고 바람도 불어요"
		          ],
		          showers: [//소나기
				"소나기가 내리네요"
		          ],
		          rain: [//비
				"비가 오네요.. 우산있어요?"
		          ],
		          thunderstorm: [//천둥번개
			"천둥번개 치는날 죄지은 사람은 밖으로 나가지 마세요"
		          ],
		          snow: [//눈
				"눈이 내리고 있어요~"
		          ],
		          fog: [//안개
				"오늘처럼 안개낀 날에는 운전 조심!"
		          ],
		          night_clear: [//맑은 밤
				"맑은 밤 별이 보이나요?"
		          ],
		          night_cloudy: [//흐린 밤
				"흐린 밤 우중충한 하늘"
		          ],
		          night_showers: [//소나기 밤
				"소나기 내리는 밤이에요"
		          ],
		          night_rain: [//비오는 밤
				"비오는 밤이군요"
		          ],
		          night_thunderstorm: [//천둥번개 밤
				"천둥번개치는 밤이네요"
		          ],
		          night_snow: [//눈오는 밤
				"눈이 오고 있는 밤입니다. 아침 운전을 조심해야겠네요."
		          ],
		          night_alt_cloudy_windy: [//흐리고 바람부는 밤
				"흐리고 바람부는 밤.. 최악이군"
		          ],
		        }
		}
		}, 
//New Feed(연합뉴스)
		{
			module: "newsfeed",
			position: "bottom_bar",
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
      module: "MMM-NotificationTrigger",
      config: {
        triggers:[
          {
            trigger: "HOTWORD_DETECTED",
            fires: [
              {
                fire:"HOTWORD_PAUSE",

              },
              {
                fire:"ASSISTANT_ACTIVATE",
		delay: 200,
                payload: function(payload) {
                  return {
                    "profile": payload.hotword
                  }
                }
              },
            ]
          },
          {
            trigger: "ASSISTANT_DEACTIVATED",
            fires: [
              {
                fire:"HOTWORD_RESUME"
              }
            ]
          },
  
        ]
      }
},
		{
			module: "MMM-Hotword",
			position: "b",
			config: {
			    chimeOnFinish:null,
			    mic: {
			      recordProgram : "arecord",  
			      device        : "plughw:1",
			    },
			    models: [
			      {
			        hotwords    : "smart_mirror",
			        file        : "smart_mirror.umdl",
			        sensitivity : "0.5",
			      },
			      {
			        hotwords    : "mirror_mirror",
			        file        : "mirrormirror.pmdl",
			        sensitivity : "0.5",
			      },			      
			    ],
			    defaultCommand: {
			      notificationExec: {
			        notification: "ASSISTANT_ACTIVATE",
			        payload: (detected, afterRecord) => {
			          return {profile:"default"}
			        }
			      },
			      afterRecordLimit: 0,
			      autorestart: true,
			      restart: false
			      //restart: true
			    },
  			},
		},
		{
			module: "MMM-AssistantMk2",
			position: "bottom_bar",
			config:
			{
				useScreen: true,
				useWelcomeMessage: "brief today",
				deviceLocation:{
					coordinates: {
					latitude: 37.57,
					longitude: 126.98
				},
			},
			profiles: {
				"default": {
					profileFile: "default.json",
					lang: "ko-KR"
				},
			}
		}
		},
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
