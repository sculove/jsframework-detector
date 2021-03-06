var _checkFWScript = (function() {
	var FRAMEWORKS = ["jindo", "JC", "JMC", "jQuery", "_", "Backbone", "angular", "React", "requirejs", "jQueryMobile", "jQueryUI", "Knockout", "Ember", "Handlebars", "Polymer","IScroll","Hammer"],
		check = {},
		count = 3,
		items = [];
	var JQUERY_METHOD = ["fn", "extend", "expando", "isReady", "error", "noop", "isFunction", "isArray", "isWindow", "isNumeric", "isEmptyObject", "isPlainObject", "type", "globalEval", "camelCase", "nodeName", "each", "trim", "makeArray", "inArray", "merge", "grep", "map", "guid", "proxy", "now", "support", "find", "expr", "unique", "text", "isXMLDoc", "contains", "filter", "dir", "sibling", "Callbacks", "Deferred", "when", "readyWait", "holdReady", "ready", "acceptData", "cache", "noData", "hasData", "data", "removeData", "_data", "_removeData", "queue", "dequeue", "_queueHooks", "access", "event", "removeEvent", "Event", "clone", "buildFragment", "cleanData", "swap", "cssHooks", "cssNumber", "cssProps", "style", "css", "Tween", "easing", "fx", "Animation", "speed", "timers", "valHooks", "attr", "removeAttr", "attrHooks", "propFix", "prop", "propHooks", "parseJSON", "parseXML", "active", "lastModified", "etag", "ajaxSettings", "ajaxSetup", "ajaxPrefilter", "ajaxTransport", "ajax", "getJSON", "getScript", "get", "post", "_evalUrl", "param", "parseHTML", "offset", "noConflict", "attrFix", "attrFn", "bindReady", "boxModel", "browser", "clean", "curCSS", "fragments", "isNaN", "nth", "props", "sub", "uaMatch", "uuid", "handleError", "httpData", "httpNotModified", "httpSuccess", "deletedIds", "handleComplete", "handleSuccess", "triggerGlobal", "bind", "Widget", "addDependents", "jqmData", "jqmRemoveData", "mobile", "removeWithDependents", "ui", "vmouse", "widget", "removeCookie",

		"argumentNames", "bindAsEventListener", "defer", "delay",
		"abovethetop", "belowthefold", "inviewport", "leftofbegin", "rightoffold", "placeholder", "addOutsideEvent"
	],
	JC = ["Accordion", "AjaxHistory", "BrowseButton", "Cache", "Calendar", "Canvas", "CheckBox", "CircularRolling", "Clipboard", "Component", "DataBridge", "DatePicker", "DefaultTextValue", "Dialog", "DragArea" , "DropArea", "DynamicTree", "Effect", "FileUploader", "FloatingLayer", "Foggy", "Formatter", "HTMLComponent", "InlineTextEdit", "Keyframe", "LayerEffect", "LayerManager" , "LayerPosition", "LazyLoading", "ModalDialog", "Morph", "MouseGesture", "MultipleAjaxRequest", "NumberFormatter", "NumericStepper", "Pagination", "Rolling", "RollingChart", "RolloverArea", "RolloverClick", "ScrollBar", "ScrollBox", "SelectArea", "SelectBox", "Slider", "StarRating", "TabControl", "TextRange", "Timer", "Transition", "Tree", "UIComponent", "UploadQueue", "Visible","WatchInput"
	],
	JMC = ["Accordion","AjaxHistory","Animation","Calendar","CheckBox","CheckRadioCore","CircularFlicking","Component","ContractEffect","CorePagination","CoreScroll","CoreTab","Cover","CoverFlicking","Cube","CubeFlicking","CubeReveal","CurrencyValidator","DateValidator","Datepicker","Dialog","DragArea","DropArea","DynamicPlugin","Effect","EmailValidator","ExpandEffect","FadeEffect","Flick","Flicking","FlipEffect","FloatingLayer","IndexScroll","InfiniteCard","Keyframe","LayerEffect","LayerManager","LayerPosition","Loading","MoreContentButton","Morph","MovableCoord","NumberValidator","PageLayoutUI","PageNavigation","PopEffect","PreventClickEvent","PreviewFlicking","PullPlugin","RadioButton","RequireValidator","RevealCommon","RevealSidebarUI","Scroll","ScrollEnd","Selectbox","Slide","SlideEffect","SlideFlicking","SlideReveal","SlideTab","Slider","SwipeCommon","Tab","TelValidator","TextArea","TextInput","ToggleSlider","Touch","Transition","UIComponent","UrlValidator","Validation","Validator","Visible"];

	FRAMEWORKS.forEach(function(v, i, a) {
		check[v] = false;
	});

	var _ = {
		detect: function() {
			var isOK = true;
			count--;
			FRAMEWORKS.forEach(function(v, i, a, t) {
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
					str += "<li>" + v.name + " <font color='red'>" + v.version + "</font> was detected</li>";
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
					window.___jsframework___ = items;
					console.info("jsframework-info",items);
				}, 3000);
				return;
			}
		},
		_getDetailJQuery : function(properties) {
			var plugins = [],
				exist;
			for(var p in jQuery) {
				exist = false;
				properties.forEach(function(v,i,a) {
					if(p == v) {
						exist = true;
						return;
					}
				});
				if(exist == false) {
		            	if(!/^_/.test(p)) {
			                plugins.push(p);
			            }
		      	}

			}
			return plugins.sort();
		},
		_getJindoJsDetail: function(name, properties) {
			var components = [],
				exist,
				p,
				target;
			if (name == "JC") {
				target = jindo;
			} else if (name == "JMC") {
				target = jindo.m;
			}

			for (p in target) {
				exist = false;
				properties.forEach(function(v) {
					if(p == v) {
						exist = true;
						return;
					}
				});
				if(exist)  {
					components.push(p);
				}
			}
			return components.sort();
		},
		isFw: function(s) {
			switch(s) {
				case "jindo" : return !check[s] && (s in window || '$Jindo' in window  || 'JINDO' in window);
				case "JMC" : return !check[s] && 'jindo' in window && jindo.m;
				case "JC" : return !check[s] && 'jindo' in window && jindo.Component;
				case "jQueryMobile" : return !check[s] && 'jQuery' in window && 'mobile' in jQuery;
				case "jQueryUI" : return !check[s] && 'jQuery' in window && 'ui' in jQuery;
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
					case "Hammer" :
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
					case "jQueryUI" :
						version = jQuery.ui.version || "pre 1.6";
						break;
					case "angular":
						version = angular.version.full;
						break;
					case "IScroll" :
						version = IScroll.prototype.version;
						break;
				}
				if (typeof version != "undefined") {
					// console.log(v, version);
					check[v] = true;
					var returnVal = {
						"name": v,
						"version": version
					};
					("JC" == v) && (returnVal.detail = this._getJindoJsDetail(v, JC));
					("JMC" == v) && (returnVal.detail = this._getJindoJsDetail(v, JMC));
					('jQuery' == v) && (returnVal.detail = this._getDetailJQuery(JQUERY_METHOD));
					return returnVal;

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