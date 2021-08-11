class AssistantResponse{constructor(e,t){this.config=e,this.callbacks=t,this.newChime=e.newChime,this.showing=!1,this.response=null,this.aliveTimer=null,this.allStatus=["hook","standby","reply","error","think","continue","listen","confirmation"],this.myStatus={actual:"standby",old:"standby"},this.loopCount=0,this.chime={beep:this.newChime?"beep.mp3":"Old/beep.mp3",error:this.newChime?"error.mp3":"Old/error.mp3",continue:this.newChime?"continue.mp3":"Old/continue.mp3",open:"Google_beep_open.mp3",close:"Google_beep_close.mp3"},this.config.useNative||(this.audioResponse=new Audio,this.audioResponse.autoplay=!0,this.audioResponse.addEventListener("ended",()=>{log("audio end"),this.end()}),this.audioChime=new Audio,this.audioChime.autoplay=!0),this.fullscreenAbove=!1}tunnel(e){if("TRANSCRIPTION"==e.type){var t=!1;if(e.payload.done)this.status("confirmation"),document.getElementById("GA_SCREENOUTPUT").src="about:blank";e.payload.transcription&&!t&&(this.showTranscription(e.payload.transcription),t=!0)}}doCommand(e,t,s){}playChime(e,t){this.config.useChime&&(this.config.useNative?this.callbacks.sendSocketNotification("PLAY_CHIME","resources/"+(t?e:this.chime[e])):this.audioChime.src="modules/MMM-GoogleAssistant/resources/"+(t?e:this.chime[e]))}status(e,t){this.myStatus.actual=e;var s=document.getElementById("GA_STATUS");t&&"continue"!=this.myStatus.old&&this.playChime("beep"),"error"!=e&&"continue"!=e||this.playChime(e),"WAVEFILE"!=e&&"TEXT"!=e||(this.myStatus.actual="think"),"MIC"==e&&(this.myStatus.actual="continue"==this.myStatus.old?"continue":"listen"),this.myStatus.actual!=this.myStatus.old&&(this.callbacks.myStatus(this.myStatus),this.callbacks.sendNotification("ASSISTANT_"+this.myStatus.actual.toUpperCase()),log("Status from "+this.myStatus.old+" to "+this.myStatus.actual),s.className="hook"==this.myStatus.old?"hook":this.myStatus.actual,this.fullscreenAbove&&s.classList.add("fullscreen_above"),this.myStatus.old=this.myStatus.actual)}prepare(){var e=document.createElement("div");e.id="GA",e.className="out",this.config.screenRotate&&e.classList.add("rotate");var t=document.createElement("div");t.id="GA_CONTENER";var s=document.createElement("div");s.id="GA_STATUS",this.fullscreenAbove&&s.classList.add("fullscreen_above"),t.appendChild(s);var i=document.createElement("div");i.id="GA_TRANSCRIPTION",this.fullscreenAbove&&i.classList.add("fullscreen_above"),t.appendChild(i);var a=document.createElement("div");a.id="GA_LOGO",this.fullscreenAbove&&a.classList.add("fullscreen_above"),t.appendChild(a),e.appendChild(t),document.body.appendChild(e);var o=document.createElement("div");o.id="GA_HELPER",o.classList.add("hidden"),this.fullscreenAbove&&o.classList.add("fullscreen_above");var n=document.createElement("div");n.id="GA_RESULT_WINDOW";var l=document.createElement("iframe");l.id="GA_SCREENOUTPUT",n.appendChild(l),o.appendChild(n),document.body.appendChild(o)}modulePosition(){MM.getModules().withClass("MMM-GoogleAssistant").enumerate(e=>{"fullscreen_above"===e.data.position&&(this.fullscreenAbove=!0)})}showError(e){return this.showTranscription(e,"error"),this.status("error"),!0}showTranscription(e,t="transcription"){var s=document.getElementById("GA_TRANSCRIPTION");s.innerHTML="";var i=document.createElement("p");i.className=t,i.innerHTML=e,s.appendChild(i)}end(){if(this.showing=!1,this.response){var e=this.response;this.response=null,e&&e.continue?(this.loopCount=0,this.status("continue"),log("Continuous Conversation"),this.callbacks.assistantActivate({type:"MIC",profile:e.lastQuery.profile,key:null,lang:e.lastQuery.lang,useScreenOutput:e.lastQuery.useScreenOutput,force:!0},Date.now())):(log("Conversation ends."),this.status("standby"),this.callbacks.endResponse(),clearTimeout(this.aliveTimer),this.aliveTimer=null,this.aliveTimer=setTimeout(()=>{this.stopResponse(()=>{this.fullscreen(!1,this.myStatus)})},this.config.screenOutputTimer))}else this.status("standby"),this.fullscreen(!1,this.myStatus),this.callbacks.endResponse()}start(e){if(this.response=e,clearTimeout(this.aliveTimer),this.aliveTimer=null,this.showing&&this.end(),e.error)return"TRANSCRIPTION_FAILS"==e.error?(log("Transcription Failed. Re-try with text"),void this.callbacks.assistantActivate({type:"TEXT",profile:e.lastQuery.profile,key:e.transcription.transcription,lang:e.lastQuery.lang,useScreenOutput:e.lastQuery.useScreenOutput,force:!0,chime:!1},null)):"NO_RESPONSE"==e.error&&"continue"==e.lastQuery.status&&this.loopCount<3?(this.status("continue"),this.callbacks.assistantActivate({type:"MIC",profile:e.lastQuery.profile,key:null,lang:e.lastQuery.lang,useScreenOutput:e.lastQuery.useScreenOutput,force:!0},Date.now()),this.loopCount+=1,void log("Loop Continuous Count: "+this.loopCount+"/3")):(this.showError(this.callbacks.translate(e.error)),void this.end());var t=e=>{this.showing=!0,this.callbacks.A2D(e),this.status("reply");this.showScreenOutput(e);this.playAudioOutput(e)?log("Wait audio to finish"):(log("No response"),this.end())};this.postProcess(e,()=>{e.continue=!1,this.end()},()=>{t(e)})}stopResponse(e=(()=>{})){this.showing=!1,document.getElementById("GA_HELPER").classList.add("hidden"),this.config.useNative||(this.audioResponse.src=""),document.getElementById("GA_TRANSCRIPTION").innerHTML="",e()}postProcess(e,t=(()=>{}),s=(()=>{})){this.callbacks.postProcess(e,t,s)}playAudioOutput(e){return!(!e.audio||!this.config.useAudioOutput)&&(this.showing=!0,this.config.useNative?this.callbacks.sendAudio(e.audio.path):this.audioResponse.src=this.makeUrl(e.audio.uri),!0)}showScreenOutput(e){return!(this.sercretMode||!e.screen||!this.config.useScreenOutput)&&(e.audio||this.showTranscription(this.callbacks.translate("NO_AUDIO_RESPONSE")),this.showing=!0,document.getElementById("GA_SCREENOUTPUT").src=this.makeUrl(e.screen.uri),document.getElementById("GA_HELPER").classList.remove("hidden"),!0)}makeUrl(e){return"/modules/MMM-GoogleAssistant/"+e+"?seed="+Date.now()}fullscreen(e,t){var s=document.getElementById("GA");document.getElementById("GA_DOM");e?(s.className="in",this.fullscreenAbove?this.config.screenRotate?s.classList.add("rotate_above"):s.classList.add("fullscreen_above"):this.config.screenRotate&&s.classList.add("rotate"),this.fullscreenAbove&&(MM.getModules().exceptWithClass("MMM-GoogleAssistant").enumerate(e=>{e.hide(500,{lockString:"GA_LOCKED"})}),MM.getModules().withClass("MMM-GoogleAssistant").enumerate(e=>{e.show(500,{lockString:"GA_LOCKED"})}))):t&&"standby"==t.actual&&(s.className="out",this.fullscreenAbove?this.config.screenRotate?s.classList.add("rotate_above"):s.classList.add("fullscreen_above"):this.config.screenRotate&&s.classList.add("rotate"),this.fullscreenAbove&&(MM.getModules().exceptWithClass("MMM-GoogleAssistant").enumerate(e=>{e.show(500,{lockString:"GA_LOCKED"})}),MM.getModules().withClass("MMM-GoogleAssistant").enumerate(e=>{e.hide(500,{lockString:"GA_LOCKED"})})))}}