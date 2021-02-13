/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed. (라이센스 주의)
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 * github testing_20210211
 * testingsd
 */

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
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "한국 공휴일",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/ko.south_korea%23holiday%40group.v.calendar.google.com/public/basic.ics"
					}
				]
			}
		},
//Current Weather
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Seoul-teukbyeolsi",
				locationID: "1835847",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "4f8599999999999999999999999993"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Seoul,KR",
				locationID: "1835847",  //ID from https://openweathermap.org/city
				appid: "4f49999999999999999993"
			}
		},
//Air Pollution Display (추가해야함)
	{
		module: 'MMM-AirQuality',
		header: "대기오염",
		position: 'top_center',
		config: {
		  location: 'seoul', // the location to check the index for
		  //lang: en,
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
				"날씨가 흐리니 내마음도 흐리네"
		          ],
		          cloudy_windy: [//흐리고 바람
				"흐리고 바람불고 "
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
				"눈이 내리네~~ 당신이 가버린 지금"
		          ],
		          fog: [//안개
				"안개낀 장충단 공원~~~"
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
				"비오는 밤이군요 멜랑꼴리해져요"
		          ],
		          night_thunderstorm: [//천둥번개 밤
				"천둥번개치는 밤 누군가가 필요해"
		          ],
		          night_snow: [//눈오는 밤
				"눈오는 밤, 늑대목도리 여우허리띠"
		          ],
		          night_alt_cloudy_windy: [//흐리고 바람부는 밤
				"흐리고 바람부는 밤.. 최악이군"
		          ],
		        }
		}
		},
//New Feed(JTBC 뉴스)
		{
			module: "newsfeed",
			position: "middle_center",
			config: {
				feeds: [
					{
						title: "JTBC",
						url: "http://fs.jtbc.joins.com/RSS/newsflash.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true
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
			position: "bottom_center",
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
