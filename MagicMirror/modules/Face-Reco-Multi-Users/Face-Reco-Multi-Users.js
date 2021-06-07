Module.register("Face-Reco-Multi-Users", {
	defaults: {
		updateInterval: 10000,
		retryDelay: 5000,
		width: "200px",
		position: "top_right",
		useMMMFaceRecoDNN: false,
		interval: 2000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
	},
	requiresVersion: "2.1.0", 
	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;
		this.userName = "Guest";
		this.userImage = "guest.gif";
		this.timer = null;
		this.loggedIn = false;
		this.loaded = false;
	},

	getDom: function() {
		var self = this;
		var wrapper = document.createElement("div");
		// wrapper.innerHTML = this.translate('TITLE');
		wrapper.className = "face-image";

		var message = this.translate('WELCOME');
		var imgHolderElement = document.createElement("p");
		imgHolderElement.innerHTML = message + " " + this.capitalizeWords(this.userName);
		imgHolderElement.classList.add(this.config.position);
		imgHolderElement.style.width = this.config.width;

		var img = document.createElement("img");
		var newImg = new Image;
		newImg.src = "modules/Face-Reco-Multi-Users/Users_img/" + this.userImage;
		newImg.onload = function()
		{
			img.src = this.src;
		}
		imgHolderElement.appendChild(img);

		wrapper.appendChild(imgHolderElement);
		return wrapper;

	},
	
	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"Face-Reco-Multi-Users.css",
		];
	},

	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
				ko: "translations/ko.json"
		};
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;

		// Log.log("Got Notificaiton: " + notification + " Payload: " + payload);
		switch (notification)
		{
			case "USERS_LOGIN":
			{
				// Face Rec sends multiple notifications even if user is already logged in and logout timer still active.
				if (this.config.useMMMFaceRecoDNN === true && this.loggedIn == false )
				{
					Log.log("Notificaiton: " + notification + " from Mirror. Logging in " + payload);
					// Fetch the users image.
					this.loggedIn = true;
					this.userName = payload;
					this.userImage = payload + ".jpg"; //Assume for now.
					self.updateDom(100);
				}
				break;
			}
			case "USERS_LOGOUT_MODULES":
			{
				Log.log("Notificaiton: " + notification + " from Mirror. Logging out " + payload);
				this.loggedIn = false;
				this.userName = "Mr. Nobody";
				this.userImage = "guest.gif";
				self.updateDom(100);
				break;
			}
		}		
	},

	// Local helper functions
	capitalizeWords: function(str)
	{
	 return str.toString().toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
	},
	
});
