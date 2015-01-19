var _checkFWScript = (function() {
	var framework = ["jindo", "JC", "JMC", "jQuery", "_", "Backbone", "angular", "React", "requirejs"],
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
					'-webkit-transform:translateY(-100%)',
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
			if(s == "JC") {
				return !check[s] && 'jindo' in window && jindo.Component;
			} else if(s == "JMC") {
				return !check[s] && 'jindo' in window && jindo.m;
			} else {
				return !check[s] && s in window;
			}
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
			if (this.isFw(v)) {
				var version = "";
				switch (v) {
					case "jindo":
						version = jindo.$Jindo.VERSION || jindo.$Jindo().version || jindo.VERSION;
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
						version = _.VERSION;
						break;
					case "Backbone":
						version = Backbone.VERSION;
						break;
					case "jQuery":
						version = jQuery.fn.jquery;
						break;
					case "angular":
						version = angular.version.full;
						break;
					case "React":
						version = React.version;
						break;
					case "requirejs":
						version = requirejs.version;
						break;
				}

				if (typeof version != "undefined") {
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