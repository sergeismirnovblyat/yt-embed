javascript:!function(t){var e={};function i(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(n,s,function(e){return t[e]}.bind(null,s));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){const n=i(1);if(window._ytBookmarklet)confirm("YT bookmarklet has already run. Destroy?")&&window._ytBookmarklet.destroy();else try{(new n).start().catch(console.log)}catch(t){console.log(t)}},function(t,e,i){const n=i(2),s=i(3),o=i(4),r=i(5),a=i(6),l={bookmarkName:{defaultValue:"ytBookmark",inputType:"text"},x:{inputType:"number"},y:{inputType:"number"},width:{inputType:"number"},height:{inputType:"number"},opacity:{defaultValue:1,inputType:"number"},runWithMiniPlayer:{defaultValue:!1,inputType:"checkbox"},showDebugMessages:{defaultValue:!1,inputType:"checkbox"},autoFocusPlayer:{defaultValue:!0,inputType:"checkbox"}};t.exports=class{constructor(){this.settings=new n,this.settings.load(),window._ytBookmarklet=this,this.debug("script instance set on window._ytBookmarklet."),Object.entries(l).forEach(([t,e])=>{this.settings.has(t)||void 0===e.defaultValue||this.settings.set(t,e.defaultValue)}),this._onWindowClick=this._onWindowClick.bind(this),this._player=this._miniPlayer=null,this._miniPlayer=null}onURLChange(){this.destroy()}isMiniplayerOpen(){return document.querySelector("ytd-miniplayer").active}getVideoId(){return new URLSearchParams(window.location.search).get("v")}async start(){this.debug("starting up."),this.videoId=this.getVideoId();let t=!1;if(!this.videoId&&this.isMiniplayerOpen()){if(t=!0,this.settings.get("runWithMiniPlayer")||(t=confirm('Looks like you have the miniplayer open. I need to close it and reopen to find the video id. This will happen very fast.\n\nYou can skip this message next time by checking the "runWithMiniPlayer" checkbox under the info panel.\n\nContinue?')),!t)return this.destroy()}else if(!this.videoId)return this.destroyWithAlert("Could not find video id.");t&&(this.debug("hacking around miniplayer..."),await new Promise(async t=>{document.querySelector("ytd-player .ytp-miniplayer-expand-watch-page-button").click(),await new Promise(t=>setTimeout(t,500)),this.videoId=this.getVideoId(),document.querySelector("ytd-player .ytp-miniplayer-button").click(),t()})),this.debug(`found video id "${this.videoId}".`),this._player=new s,this._miniPlayer=r(this.videoId),this.settings.has("opacity")&&(this._miniPlayer.style.opacity=this.settings.get("opacity"),this._miniPlayer.els("slider").value=100*this.settings.get("opacity")),this.updateSettingsHTML();this._draggable=new o(this._miniPlayer,t=>t.target===this._miniPlayer.els("controls")),this._miniPlayer.addEventListener("dragStart",()=>{this._miniPlayer.els("controls").style.cursor="grabbing",this._miniPlayer.els("iframe").style.pointerEvents="none"}),this._miniPlayer.addEventListener("dragEnd",()=>{this._miniPlayer.els("iframe").style.pointerEvents="",this._miniPlayer.els("controls").style.cursor="grab"});const e=this.settings.get("width")||400,i=this.settings.get("height")||280;this._miniPlayer.els("resize").style.width=e+"px",this._miniPlayer.els("resize").style.height=i+"px",requestAnimationFrame(()=>{const t=this._miniPlayer.offsetWidth,e=this._miniPlayer.offsetHeight;let i=this.settings.get("x")||window.innerWidth-t-10,n=this.settings.get("y")||window.innerHeight-e-10;i<0-t&&(i=10),i>window.innerWidth&&(i=window.innerWidth-t-10),n<0-e&&(n=10),n>window.innerHeight&&(n=window.innerHeight-e-10),this._draggable.setPosition(i,n)}),this._miniPlayer.els("exit").addEventListener("click",t=>this.onExit(t)),this._miniPlayer.els("minimize").addEventListener("click",t=>this.onMinimize(t)),this._miniPlayer.els("exitAndApply").addEventListener("click",t=>this.onExitAndApply(t)),this._miniPlayer.els("info").addEventListener("click",t=>this.onInfo(t)),this._miniPlayer.els("slider").addEventListener("input",t=>this.onSlider(t)),this._miniPlayer.els("save").addEventListener("click",t=>this.onSave(t)),this._miniPlayer.els("delete").addEventListener("click",t=>this.onDelete(t)),this._miniPlayer.els("iframe").addEventListener("load",t=>this.onIframeLoad(t)),document.body.prepend(this._miniPlayer),window.addEventListener("click",this._onWindowClick)}_onWindowClick(){this.getVideoId()===this.videoId||this.isMiniplayerOpen()||(this.debug("detecting url change."),this.onURLChange())}updateSettingsHTML(t=this.settings,e){e=e||new Map(Object.entries(l).map(([t,e])=>{const{inputType:i,...n}=e;return[t,{type:i,...n}]}));const i=this._miniPlayer.els("details"),n=`\n\t\t\t${t.getCookie().trim()&&`<details data-el="details">\n\t\t\t\t<summary>Settings are stored in <strong>document.cookie</strong>. See contents</summary>\n\t\t\t\t<code style="display: block; word-break: break-all; font-weight: bold;">${JSON.stringify(t.parseCookie())}</code>\n\t\t\t</details><br/>`}\n\t\t\t${a(t,e)}\n\t\t`;this._miniPlayer.els("settings").innerHTML=n;const s=this._miniPlayer.els("details");s&&(s.open=i&&i.open)}onIframeLoad(){this.debug("loaded youtube embed iframe.");const t=()=>{const e=this._miniPlayer.els("iframe").contentDocument.querySelector("video");if(!e)return this.debug("polling for iframe video..."),setTimeout(t,50);const i=this._player.isAd();i&&this.debug("detected original video is an ad.");const n=i?0:this._player.getVideo().currentTime;e.currentTime=n,this.settings.get("autoFocusPlayer")&&(this.debug("focusing youtube embed iframe."),e.focus()),this._player.setMute(!0),window.addEventListener("beforeunload",()=>{this.destroy()})};t()}onExit(){this.debug("closing."),this.destroy()}onMinimize(){const{style:t}=this._miniPlayer.els("resize");0===parseFloat(t.height)?(t.height=t.getPropertyValue("--height"),t.setProperty("--height","")):(t.setProperty("--height",t.height),t.height="0")}onExitAndApply(){this.debug("closing and applying time+mute to original video.");const t=this._miniPlayer.els("iframe").contentDocument.querySelector("video");this._player.getVideo().currentTime=t.currentTime,this._player.getVideo()[t.paused?"pause":"play"](),this.destroy()}onSave(){const t=this._miniPlayer.els,e=t("resize"),i=this._draggable.getPosition();Object.keys(l).forEach(n=>{if("width"===n||"height"===n)return this.settings.set(n,e["width"===n?"offsetWidth":"offsetHeight"]);if("x"===n||"y"===n)return this.settings.set(n,i["x"===n?0:1]);if("opacity"===n)return this.settings.set(n,parseFloat(this._miniPlayer.style.opacity));const s=t("setting-"+n),o=s.type;this.settings.set(n,s["checkbox"===o?"checked":"value"])}),this.settings.save(),this.updateSettingsHTML(),this.settings.get("showDebugMessages")&&this.debug("settings saved.")}onDelete(){this.settings.clearCookie(),this.settings.clear(),this.updateSettingsHTML(),this.debug("settings cleared.")}onInfo(){const{style:t}=this._miniPlayer.els("infoTag");t.display=t.display?"":"none"}onSlider(t){this._miniPlayer.style.opacity=parseFloat(t.currentTarget.value)/100}debug(){this.settings.get("showDebugMessages")&&console.log(this.settings.get("bookmarkName")+":",...arguments)}destroyWithAlert(t){this.destroy(),window.alert(t)}destroy(){if(window._ytBookmarklet=null,window.removeEventListener("click",this._onWindowClick),this.debug("destroyed."),this._miniPlayer&&this._player){const t=this._miniPlayer.els("iframe").contentDocument,e=t&&t.querySelector("video");e&&e.pause(),this._player.setMute(e.muted)}this._miniPlayer&&this._miniPlayer.remove(),this._draggable&&this._draggable.destroy(),this._player&&this._player.destroy(),this._player=this._miniPlayer=this.settings=null}}},function(t,e){t.exports=class extends Map{getCookie(){return document.cookie.split(";").find(t=>/\s*ytsettings=/.test(t))||""}clearCookie(){document.cookie=`ytsettings=; expires=${new Date};`}parseCookie(t=this.getCookie()){const e=/\s*ytsettings=(.*)/.exec(t);return e?JSON.parse(e[1]):{}}load(){this.clear();const t=this.parseCookie();Object.entries(t).forEach(([t,e])=>this.set(t,e))}save(){const t={};this.forEach((e,i)=>t[i]=e),document.cookie="ytsettings="+JSON.stringify(t)}}},function(t,e){t.exports=class{constructor(t){this.ytdPlayer=t||document.querySelector("ytd-player")}isAd(){return!!this.ytdPlayer.querySelector(".ytp-ad-player-overlay")}getVideo(){return this.ytdPlayer.querySelector("video")}setMute(t){t!==this.getVideo().muted&&this.ytdPlayer.querySelector(".ytp-mute-button").click()}destroy(){this.ytdPlayer=null}}},function(t,e){t.exports=class{constructor(t,e){this.el=t,this.filter=e,this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.isDragging=!1,this.startX=this.startY=null,[this.x,this.y]=this.getPosition(),window.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove)}getPosition(){if(!this.el.style.transform)return[0,0];return/translate\(([\d\.]+)px,\s*([\d\.]+)px\)/.exec(this.el.style.transform).slice(1,3).map(t=>parseFloat(t))}setPosition(t,e){this.el.style.transform=`translate(${t}px, ${e}px)`,this.isDragging||([this.x,this.y]=[t,e])}onMouseDown(t){this.filter&&!this.filter(t)||(this.isDragging=!0,this.startX=t.clientX,this.startY=t.clientY,this.el.dispatchEvent(new Event("dragStart")))}onMouseUp(t){this.isDragging&&(this.isDragging=!1,this.x=this.x+t.clientX-this.startX,this.y=this.y+t.clientY-this.startY,this.startX=this.startY=null,this.el.dispatchEvent(new Event("dragEnd")))}onMouseMove(t){if(!this.isDragging)return;const e=this.x+t.clientX-this.startX,i=this.y+t.clientY-this.startY;this.setPosition(e,i)}destroy(){window.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove)}}},function(t,e){const i={position:"fixed",top:0,left:0,"z-index":9999,background:"#d0d0d0",padding:"4px","box-shadow":"0px 0px 16px rgba(0, 0, 0, 0.6)","border-radius":"6px","will-change":"transform,opacity"};t.exports=(t,e=0,n)=>{n=n?{...i,...n}:i;const s=function(t,e=0){const i=document.createElement("div"),n=`https://www.youtube.com/embed/${t}?autoplay=1&start=${~~e}`,s="height: 1px; background: #6f6f6f; margin: 4px 0;",o="flex: 0 0 var(--button-width); margin-right: 4px;";return i.innerHTML=`\n\t\t<div>\n\t\t\t<div data-el="controls" style="cursor: grab; --button-width: 30px; display: flex; flex-wrap: wrap; user-select: none;">\n\t\t\t\t<button style="${o}" data-el="exit" title="Exit">×</button>\n\t\t\t\t<button style="${o}" data-el="minimize" title="Minimize">–</button>\n\t\t\t\t<button style="${o}" data-el="exitAndApply" title="Exit and replace video">↑</button>\n\t\t\t\t<button style="${o} margin-right: 0;" data-el="info" title="Toggle info panel">ⓘ</button>\n\t\t\t\t<input title="Adjust opacity" type="range" data-el="slider" value="100" min="30" style="width: 30px; transform: rotate(-90deg); cursor: ns-resize;"/>\n\t\t\t</div>\n\t\t\t<div style="${s}"></div>\n\t\t\t<div data-el="resize" style="resize: both; overflow: scroll; min-width: 186px;">\n\t\t\t\t<div data-el="infoTag" style="display: none; font-size: 12px;">\n\t\t\t\t\t<a style="display: none;" href="https://github.com" target="_blank" rel="noopener noreferrer">${((t=20,e=20)=>`<svg style="width: ${t}px; height: ${e}px;" class="octicon octicon-mark-github v-align-middle" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">`)()}</path></svg></a>\n\t\t\t\t\t<p><strong>Legend</strong></p>\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t<li><strong>×</strong>: close window.</li>\n\t\t\t\t\t\t<li><strong>–</strong>: minimize window.</li>\n\t\t\t\t\t\t<li><strong>↑</strong>: close window and apply time+mute to original.</li>\n\t\t\t\t\t\t<li><strong>ⓘ</strong>: toggle info panel.</li>\n\t\t\t\t\t\t<li><strong>slider</strong>: adjust window opacity.</li>\n\t\t\t\t\t</ul>\n\t\t\t\t\t<div style="${s}"></div>\n\t\t\t\t\t<p><strong>Settings</strong></p>\n\t\t\t\t\t<div data-el="settings"></div>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button data-el="save" title="Save all settings">save</button>\n\t\t\t\t\t<button data-el="delete" title="Clear all settings">clear</button>\n\t\t\t\t\t<div style="${s}"></div>\n\t\t\t\t</div>\n\t\t\t\t<iframe data-el="iframe" src="${n}" style="width: 100%; height: 99%;"></iframe>\n\t\t\t</div>\n\t\t</div>\n\t`,i.children[0]}(t,e);return Object.entries(n).forEach(([t,e])=>s.style.setProperty(t,e)),s.els=t=>s.querySelector(`[data-el="${t}"]`),Array.from(s.querySelectorAll("button")).forEach(t=>{t.style.cursor="pointer"}),s}},function(t,e){t.exports=(t,e)=>`\n\t\t<ul>\n\t\t\t${Array.from(e.entries()).map(([e,i={type:"text"}])=>{const n=t.get(e);return"text"!==i.type&&"number"!==i.type||n&&(i.value=n),"checkbox"===i.type&&n?i.checked="true":"number"===i.type&&(i.style="width: 40px;"),((t,e,i)=>`<li>${t}: <input ${Object.entries(i).map(([t,e])=>`${t}="${e}"`).join("")} data-el="setting-${t}"/></li>`)(e,0,i)}).join("")}\n\t\t</ul>\n\t`}]);