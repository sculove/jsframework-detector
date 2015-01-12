(function() {
	function detect() {
		var framework = ["jindo", "jQuery", "_", "Backbone", "angular", "React", "requirejs"];
		if(typeof window.___dectector___str == "undefined") {
			window.___dectector___check = {};
			framework.forEach(function(v,i,a) {
				window.___dectector___check[v] = false;
			});
			window.___dectector___count = 3;
			window.___dectector___str = "";
		}
		window.___dectector___count--;
		if(!window.___dectector___check["jindo"] && 'jindo' in window) {
			window.___dectector___check["jindo"] = true;
			var version = jindo.$Jindo.VERSION || jindo.$Jindo().version || jindo.VERSION || '';
			___dectector___str = 'Jindo <font color="red">' + version + '</font> was detected<br>';
			var jmc_version = "unknown";
			var jc_version = "unknown";
			// JMC 버전
			if(jindo.m){
			    var c = jindo.m;
			    // jindo.m.Component.VERSION에서 확인
			    // JMC는 1.4.0까지 jindo.Component를 사용함. (JC는 1.2.0)
			    if(c.Component && c.Component.VERSION && /\d+/.test(c.Component.VERSION)){
			        jmc_version = c.Component.VERSION.replace(/\.[a-z]+/gi,'');
			    } else if(c.sVersion){
			        // jindo.m.sVersion으로 확인
			        if(c.sVersion == "1.3.1") {
			            if(typeof c.getDeviceInfo().optimusLte2 == "undefined") {
			                jmc_version = "1.3.1";
			            } else if(typeof c.getDeviceInfo().optimusLte2 != "undefined" && typeof c.getDeviceInfo(). samsung == "undefined") {
			                jmc_version = "1.3.5";
			            } else if(typeof c.getDeviceInfo().samsung != "undefined") {
			                jmc_version = "1.4.0";
			            }
			        } else {
			            jmc_version = c.sVersion;
			        }
			    } else{
			        if(typeof c.getDeviceInfo(). galaxyS == "undefined") {
			            jmc_version ="0.9.0";
			        } else if(typeof c.getDeviceInfo(). galaxyTab2 == "undefined") {
			            jmc_version ="1.0.0";
			        } else {
			            if(typeof c._getDefaultUseCss3d  != "undefined") {
			                jmc_version ="1.2.0";
			            } else {
			                jmc_version ="1.1.0";
			            }
			        }
			    }
			    window.___dectector___str += "JMC <font color='red'>" + jmc_version + '</font> was detected<br>';
			}

			// JC는 1.3.0부터 버전이 들어감
			if(jindo.Component) {
				// JC 1.3.0 이상
				if(jindo.Component.VERSION && /\d+/.test(jindo.Component.VERSION)) {
					 jc_version = jindo.Component.VERSION.replace(/\.[a-z]+/gi,'');
				}

				if( (jmc_version <= "1.4.0") && (jc_version == "unknown") ) {
					// JMC에서 jindo.Compont를 사용. ???
				} else {
					window.___dectector___str += "JC <font color='red'>" + jc_version + '</font> was detected<br>';
				}
			}
		}

		var isOK = true;
		framework.forEach(function(v,i,a) {
			if(v != "jindo" ) {
				if(!window.___dectector___check[v] && v in window) {
					window.___dectector___check[v] = true;
					var version = "";
					switch(v) {
						case "_" : version = _.VERSION;
							break;
						case "Backbone" : version = Backbone.VERSION;
							break;
						case "jQuery" : version = jQuery.fn.jquery;
							break;
						case "angular" : version = angular.version.full;
							break;
						case "React" : version = React.version;
							break;
						case "requirejs" : version = requirejs.version;
							break;
					}
					window.___dectector___str += v + " <font color='red'>" + version + '</font> was detected<br>';
				}
			}
			if(window.___dectector___check[v] == false) {
				isOK = false;
			}
		});
		if(!isOK && window.___dectector___count >= 0) {
			// 못 찾았으면 Jindo 를 Lazy Loading 할 수도 있으니 3초마다 반복
			setTimeout(detect, 500);
			return;
		}

		if(window.___dectector___str != "") {
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
			layer.innerHTML = ___dectector___str.substring(0,___dectector___str.lastIndexOf("<br>"));
			document.body.appendChild(layer);

			// console.log(___dectector___str);

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
	}

	if (!document.xmlVersion) {
		var script = document.createElement('script');
		script.appendChild(document.createTextNode('('+ detect +')();'));
		document.documentElement.appendChild(script);
	}

})();