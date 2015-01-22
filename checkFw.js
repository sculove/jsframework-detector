var _checkFWScript = (function() {
	var framework = ["jindo", "JC", "JMC", "jQuery", "_", "Backbone", "angular", "React", "requirejs", "jQueryMobile", "Knockout", "Ember", "Handlebars", "Polymer"],
		check = {},
		count = 3,
		items = [];

	framework.forEach(function(v, i, a) {
		check[v] = false;
	});

	var _ = {
		detect: function() {
			var isOK = true;
			count--;
			framework.forEach(function(v, i, a, t) {
				t = this._detectFw(v);
				// console.info(t);
				t && items.push(t);
				if (check[v] == false) {
					isOK = false;
				}
			}, this);
			if (!isOK && count >= 0) {
				// 못 찾았으면 Jindo 를 Lazy Loading 할 수도 있으니 3초마다 반복
				// console.info("다시 찾아라");
				var self = this;
				setTimeout(function() {
					self.detect();
				}, 500);
				return;
			}
			if (items.length != 0) {
				var layer = document.createElement('div');
				layer.style.cssText = [
					'position:absolute',
					'padding:5px',
					'margin:0',
					'left:' + (window.innerWidth - 150) + 'px',
					'top:0',
					'width:300px',
					'margin-left:-150px',
					'font-size:15px',
					'line-height:1.5',
					'border:0',
					'box-shadow:2px 2px 5px rgba(0,0,0,.5)',
					'z-index:99999',
					'background-color:#eee',
					'text-align:center',
					'color:#000',
					'font-weight:normal',
					'cursor:pointer',
					'-왜kit-transform:translateY(-100%)',
					'transform:translateY(-100%)',
					'-webkit-transition:all .5s ease',
					'transition:all .5s ease',
					"font-family:'나눔고딕',NanumGothic,'돋움',Dotum,'굴림',Gulim,Helvetica,sans-serif"
				].join(' !important;') + ' !important;';

				var str = "<ul>";
				items.forEach(function(v,i,a) {
					str += "<li>" + v.title + " <font color='red'>" + v.message + "</font> was detected</li>";
				});

				// layer.innerHTML = str.substring(0,str.lastIndexOf("<br>"));
				layer.innerHTML = str + "</ul>";

				document.body.appendChild(layer);

				setTimeout(function() {
					layer.style.webkitTransform =
					layer.style.transform = '';
				}, 0);

				setTimeout(layer.onclick = function() {
					layer.style.webkitTransform =
					layer.style.transform = 'translateY(-100%)';
				}, 4000);
				return;
			}
		},
		isFw: function(s) {
			switch(s) {
				case "jindo" : return !check[s] && (s in window || '$Jindo' in window  || 'JINDO' in window);
				case "JMC" : return !check[s] && 'jindo' in window && jindo.m;
				case "JC" : return !check[s] && 'jindo' in window && jindo.Component;
				case "jQueryMobile" : return !check[s] && 'jQuery' in window && 'mobile' in jQuery;
				case "Knockout" : return !check[s] && 'ko' in window;
				default : return !check[s] && s in window;
			}
		},
		_detectJindo : function() {
			var version = "unknown";
			try {
				var isMobile = false;
				if(typeof jindo != "undefined") {
					version = jindo.$Jindo.VERSION || jindo.$Jindo().version || jindo.VERSION;
					isMobile = typeof jindo.$Element._domready != "function";
				} else {
					version = $Jindo.VERSION || $Jindo().version || $.VERSION;
					isMobile = typeof $Element._domready != "function";
				}
				if(version == "@version@"){
					version = "2.1.0";
				} else if(version == "$$version$$"){
					version = "1.4.6";
				}
				// 2.0부터 모바일 버전이 존재함.
				if(parseInt(version,10) >= 2) {
					if(jindo && jindo.TYPE) {
						isMobile = jindo.TYPE  == "desktop" ? false : true;
					}
					version = (isMobile ? "mobile " : "") + version;
				}
			} catch(e) {
				if($$ && parseFloat($$.version,10) < 2.3) {
					version = "under 1.3.x";
				}
				if(typeof JINDO != "undefined") {
					version = "under 1.x";
				}
			}
			return version;
		},
		_detectJMC: function() {
			// JMC 버전
			var c = jindo.m,
				jmc_version = "unknown";
			// jindo.m.Component.VERSION에서 확인
			// JMC는 1.4.0까지 jindo.Component를 사용함. (JC는 1.2.0)
			if (c.Component && c.Component.VERSION && /\d+/.test(c.Component.VERSION)) {
				jmc_version = c.Component.VERSION.replace(/\.[a-z]+/gi, '');
			} else if (c.sVersion) {
				// jindo.m.sVersion으로 확인
				if (c.sVersion == "1.3.1") {
					if (typeof c.getDeviceInfo().optimusLte2 == "undefined") {
						jmc_version = "1.3.1";
					} else if (typeof c.getDeviceInfo().optimusLte2 != "undefined" && typeof c.getDeviceInfo().samsung == "undefined") {
						jmc_version = "1.3.5";
					} else if (typeof c.getDeviceInfo().samsung != "undefined") {
						jmc_version = "1.4.0";
					}
				} else {
					jmc_version = c.sVersion;
				}
			} else {
				if (typeof c.getDeviceInfo().galaxyS == "undefined") {
					jmc_version = "0.9.0";
				} else if (typeof c.getDeviceInfo().galaxyTab2 == "undefined") {
					jmc_version = "1.0.0";
				} else {
					if (typeof c._getDefaultUseCss3d != "undefined") {
						jmc_version = "1.2.0";
					} else {
						jmc_version = "1.1.0";
					}
				}
			}
			return jmc_version;
		},
		_detectFw: function(v) {
			// console.log(v, this.isFw(v));
			if (this.isFw(v)) {
				var version = "";
				switch (v) {
					case "jindo":
						version = this._detectJindo();
						break;
					case "JC" :
						version = "unknown";
						// JC 1.3.0 이상
						if (jindo.Component.VERSION && /\d+/.test(jindo.Component.VERSION)) {
							version = jindo.Component.VERSION.replace(/\.[a-z]+/gi, '');
						}
						break;
					case "JMC" :
						version = this._detectJMC();
						break;

					case "_":
					case "Backbone":
					case "Ember" :
					case "Handlebars" :
						version = eval(v+ ".VERSION");
						break;

					case "React":
					case "Knockout" :
					case "requirejs":
					case "Polymer":
						version = eval(v+ ".version");
						break;

					case "jQuery":
						version = jQuery.fn.jquery;
						break;
					case "jQueryMobile" :
						version = jQuery.mobile.version;
						break;
					case "angular":
						version = angular.version.full;
						break;
				}
				if (typeof version != "undefined") {
					// console.log(v, version);
					check[v] = true;
					return {
						"title": v,
						"message": version
					};
				}
			}
		}
	};
	_.detect();
});

if (!document.xmlVersion) {
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ _checkFWScript +')();'));
	document.documentElement.appendChild(script);
}