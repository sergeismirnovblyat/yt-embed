# yt-embed bookmarklet

Drag [this link](javascript:!function(t)%7Bvar%20e%3D%7B%7D%3Bfunction%20i(n)%7Bif(e%5Bn%5D)return%20e%5Bn%5D.exports%3Bvar%20s%3De%5Bn%5D%3D%7Bi%3An%2Cl%3A!1%2Cexports%3A%7B%7D%7D%3Breturn%20t%5Bn%5D.call(s.exports%2Cs%2Cs.exports%2Ci)%2Cs.l%3D!0%2Cs.exports%7Di.m%3Dt%2Ci.c%3De%2Ci.d%3Dfunction(t%2Ce%2Cn)%7Bi.o(t%2Ce)%7C%7CObject.defineProperty(t%2Ce%2C%7Benumerable%3A!0%2Cget%3An%7D)%7D%2Ci.r%3Dfunction(t)%7B%22undefined%22!%3Dtypeof%20Symbol%26%26Symbol.toStringTag%26%26Object.defineProperty(t%2CSymbol.toStringTag%2C%7Bvalue%3A%22Module%22%7D)%2CObject.defineProperty(t%2C%22__esModule%22%2C%7Bvalue%3A!0%7D)%7D%2Ci.t%3Dfunction(t%2Ce)%7Bif(1%26e%26%26(t%3Di(t))%2C8%26e)return%20t%3Bif(4%26e%26%26%22object%22%3D%3Dtypeof%20t%26%26t%26%26t.__esModule)return%20t%3Bvar%20n%3DObject.create(null)%3Bif(i.r(n)%2CObject.defineProperty(n%2C%22default%22%2C%7Benumerable%3A!0%2Cvalue%3At%7D)%2C2%26e%26%26%22string%22!%3Dtypeof%20t)for(var%20s%20in%20t)i.d(n%2Cs%2Cfunction(e)%7Breturn%20t%5Be%5D%7D.bind(null%2Cs))%3Breturn%20n%7D%2Ci.n%3Dfunction(t)%7Bvar%20e%3Dt%26%26t.__esModule%3Ffunction()%7Breturn%20t.default%7D%3Afunction()%7Breturn%20t%7D%3Breturn%20i.d(e%2C%22a%22%2Ce)%2Ce%7D%2Ci.o%3Dfunction(t%2Ce)%7Breturn%20Object.prototype.hasOwnProperty.call(t%2Ce)%7D%2Ci.p%3D%22%22%2Ci(i.s%3D0)%7D(%5Bfunction(t%2Ce%2Ci)%7Bconst%20n%3Di(1)%3Bif(%22www.youtube.com%22%3D%3D%3Dwindow.location.hostname)if(window._ytEmbed)confirm(%22YT%20bookmarklet%20has%20already%20run.%20Destroy%3F%22)%26%26window._ytEmbed.destroy()%3Belse%20try%7B(new%20n).start().catch(console.log)%7Dcatch(t)%7Bconsole.log(t)%7D%7D%2Cfunction(t%2Ce%2Ci)%7Bconst%20n%3Di(2)%2Cs%3Di(3)%2Co%3Di(4)%2Cr%3Di(5)%2Ca%3Di(6)%2Cl%3D%7BbookmarkName%3A%7BdefaultValue%3A%22ytEmbed%22%2CinputType%3A%22text%22%7D%2Cx%3A%7BinputType%3A%22number%22%7D%2Cy%3A%7BinputType%3A%22number%22%7D%2Cwidth%3A%7BinputType%3A%22number%22%7D%2Cheight%3A%7BinputType%3A%22number%22%7D%2Copacity%3A%7BdefaultValue%3A1%2CinputType%3A%22number%22%7D%2CrunWithMiniPlayer%3A%7BdefaultValue%3A!1%2CinputType%3A%22checkbox%22%7D%2CshowDebugMessages%3A%7BdefaultValue%3A!1%2CinputType%3A%22checkbox%22%7D%2CautoFocusPlayer%3A%7BdefaultValue%3A!0%2CinputType%3A%22checkbox%22%7D%7D%3Bt.exports%3Dclass%7Bconstructor()%7Bthis.settings%3Dnew%20n%2Cthis.settings.load()%2Cwindow._ytEmbed%3Dthis%2Cthis.debug(%22script%20instance%20set%20on%20window._ytEmbed.%22)%2CObject.entries(l).forEach((%5Bt%2Ce%5D)%3D%3E%7Bthis.settings.has(t)%7C%7Cvoid%200%3D%3D%3De.defaultValue%7C%7Cthis.settings.set(t%2Ce.defaultValue)%7D)%2Cthis._onWindowClick%3Dthis._onWindowClick.bind(this)%2Cthis._player%3Dthis._miniPlayer%3Dnull%2Cthis._miniPlayer%3Dnull%7DonURLChange()%7Bthis.destroy()%7DisMiniplayerOpen()%7Breturn%20document.querySelector(%22ytd-miniplayer%22).active%7DgetVideoId()%7Breturn%20new%20URLSearchParams(window.location.search).get(%22v%22)%7Dasync%20start()%7Bthis.debug(%22starting%20up.%22)%2Cthis.videoId%3Dthis.getVideoId()%3Blet%20t%3D!1%3Bif(!this.videoId%26%26this.isMiniplayerOpen())%7Bif(t%3D!0%2Cthis.settings.get(%22runWithMiniPlayer%22)%7C%7C(t%3Dconfirm('Looks%20like%20you%20have%20the%20miniplayer%20open.%20I%20need%20to%20close%20it%20and%20reopen%20to%20find%20the%20video%20id.%20This%20will%20happen%20very%20fast.%5Cn%5CnYou%20can%20skip%20this%20message%20next%20time%20by%20checking%20the%20%22runWithMiniPlayer%22%20checkbox%20under%20the%20info%20panel.%5Cn%5CnContinue%3F'))%2C!t)return%20this.destroy()%7Delse%20if(!this.videoId)return%20this.destroyWithAlert(%22Could%20not%20find%20video%20id.%22)%3Bt%26%26(this.debug(%22hacking%20around%20miniplayer...%22)%2Cawait%20new%20Promise(async%20t%3D%3E%7Bdocument.querySelector(%22ytd-player%20.ytp-miniplayer-expand-watch-page-button%22).click()%2Cawait%20new%20Promise(t%3D%3EsetTimeout(t%2C500))%2Cthis.videoId%3Dthis.getVideoId()%2Cdocument.querySelector(%22ytd-player%20.ytp-miniplayer-button%22).click()%2Ct()%7D))%2Cthis.debug(%60found%20video%20id%20%22%24%7Bthis.videoId%7D%22.%60)%2Cthis._player%3Dnew%20s%2Cthis._miniPlayer%3Dr(this.videoId)%2Cthis.settings.has(%22opacity%22)%26%26(this._miniPlayer.style.opacity%3Dthis.settings.get(%22opacity%22)%2Cthis._miniPlayer.els(%22slider%22).value%3D100*this.settings.get(%22opacity%22))%2Cthis.updateSettingsHTML()%3Bthis._draggable%3Dnew%20o(this._miniPlayer%2Ct%3D%3Et.target%3D%3D%3Dthis._miniPlayer.els(%22controls%22))%2Cthis._miniPlayer.addEventListener(%22dragStart%22%2C()%3D%3E%7Bthis._miniPlayer.els(%22controls%22).style.cursor%3D%22grabbing%22%2Cthis._miniPlayer.els(%22iframe%22).style.pointerEvents%3D%22none%22%7D)%2Cthis._miniPlayer.addEventListener(%22dragEnd%22%2C()%3D%3E%7Bthis._miniPlayer.els(%22iframe%22).style.pointerEvents%3D%22%22%2Cthis._miniPlayer.els(%22controls%22).style.cursor%3D%22grab%22%7D)%3Bconst%20e%3Dthis.settings.get(%22width%22)%7C%7C400%2Ci%3Dthis.settings.get(%22height%22)%7C%7C280%3Bthis._miniPlayer.els(%22resize%22).style.width%3De%2B%22px%22%2Cthis._miniPlayer.els(%22resize%22).style.height%3Di%2B%22px%22%2CrequestAnimationFrame(()%3D%3E%7Bconst%20t%3Dthis._miniPlayer.offsetWidth%2Ce%3Dthis._miniPlayer.offsetHeight%3Blet%20i%3Dthis.settings.get(%22x%22)%7C%7Cwindow.innerWidth-t-10%2Cn%3Dthis.settings.get(%22y%22)%7C%7Cwindow.innerHeight-e-10%3Bi%3C0-t%26%26(i%3D10)%2Ci%3Ewindow.innerWidth%26%26(i%3Dwindow.innerWidth-t-10)%2Cn%3C0-e%26%26(n%3D10)%2Cn%3Ewindow.innerHeight%26%26(n%3Dwindow.innerHeight-e-10)%2Cthis._draggable.setPosition(i%2Cn)%7D)%2Cthis._miniPlayer.els(%22exit%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onExit(t))%2Cthis._miniPlayer.els(%22minimize%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onMinimize(t))%2Cthis._miniPlayer.els(%22exitAndApply%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onExitAndApply(t))%2Cthis._miniPlayer.els(%22info%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onInfo(t))%2Cthis._miniPlayer.els(%22slider%22).addEventListener(%22input%22%2Ct%3D%3Ethis.onSlider(t))%2Cthis._miniPlayer.els(%22save%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onSave(t))%2Cthis._miniPlayer.els(%22delete%22).addEventListener(%22click%22%2Ct%3D%3Ethis.onDelete(t))%2Cthis._miniPlayer.els(%22iframe%22).addEventListener(%22load%22%2Ct%3D%3Ethis.onIframeLoad(t))%2Cdocument.body.prepend(this._miniPlayer)%2Cwindow.addEventListener(%22click%22%2Cthis._onWindowClick)%7D_onWindowClick()%7Bthis.getVideoId()%3D%3D%3Dthis.videoId%7C%7Cthis.isMiniplayerOpen()%7C%7C(this.debug(%22detecting%20url%20change.%22)%2Cthis.onURLChange())%7DupdateSettingsHTML(t%3Dthis.settings%2Ce)%7Be%3De%7C%7Cnew%20Map(Object.entries(l).map((%5Bt%2Ce%5D)%3D%3E%7Bconst%7BinputType%3Ai%2C...n%7D%3De%3Breturn%5Bt%2C%7Btype%3Ai%2C...n%7D%5D%7D))%3Bconst%20i%3Dthis._miniPlayer.els(%22details%22)%2Cn%3D%60%5Cn%5Ct%5Ct%5Ct%24%7Bt.getCookie().trim()%26%26%60%3Cdetails%20data-el%3D%22details%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Csummary%3ESettings%20are%20stored%20in%20%3Cstrong%3Edocument.cookie%3C%2Fstrong%3E.%20See%20contents%3C%2Fsummary%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ccode%20style%3D%22display%3A%20block%3B%20word-break%3A%20break-all%3B%20font-weight%3A%20bold%3B%22%3E%24%7BJSON.stringify(t.parseCookie())%7D%3C%2Fcode%3E%5Cn%5Ct%5Ct%5Ct%3C%2Fdetails%3E%3Cbr%2F%3E%60%7D%5Cn%5Ct%5Ct%5Ct%24%7Ba(t%2Ce)%7D%5Cn%5Ct%5Ct%60%3Bthis._miniPlayer.els(%22settings%22).innerHTML%3Dn%3Bconst%20s%3Dthis._miniPlayer.els(%22details%22)%3Bs%26%26(s.open%3Di%26%26i.open)%7DonIframeLoad()%7Bthis.debug(%22loaded%20youtube%20embed%20iframe.%22)%3Bconst%20t%3D()%3D%3E%7Bconst%20e%3Dthis._miniPlayer.els(%22iframe%22).contentDocument.querySelector(%22video%22)%3Bif(!e)return%20this.debug(%22polling%20for%20iframe%20video...%22)%2CsetTimeout(t%2C50)%3Bconst%20i%3Dthis._player.isAd()%3Bi%26%26this.debug(%22detected%20original%20video%20is%20an%20ad.%22)%3Bconst%20n%3Di%3F0%3Athis._player.getVideo().currentTime%3Be.currentTime%3Dn%2Cthis.settings.get(%22autoFocusPlayer%22)%26%26(this.debug(%22focusing%20youtube%20embed%20iframe.%22)%2Ce.focus())%2Cthis._player.setMute(!0)%2Cwindow.addEventListener(%22beforeunload%22%2C()%3D%3E%7Bthis.destroy()%7D)%7D%3Bt()%7DonExit()%7Bthis.debug(%22closing.%22)%2Cthis.destroy()%7DonMinimize()%7Bconst%7Bstyle%3At%7D%3Dthis._miniPlayer.els(%22resize%22)%3B0%3D%3D%3DparseFloat(t.height)%3F(t.height%3Dt.getPropertyValue(%22--height%22)%2Ct.setProperty(%22--height%22%2C%22%22))%3A(t.setProperty(%22--height%22%2Ct.height)%2Ct.height%3D%220%22)%7DonExitAndApply()%7Bthis.debug(%22closing%20and%20applying%20time%2Bmute%20to%20original%20video.%22)%3Bconst%20t%3Dthis._miniPlayer.els(%22iframe%22).contentDocument.querySelector(%22video%22)%3Bthis._player.getVideo().currentTime%3Dt.currentTime%2Cthis._player.getVideo()%5Bt.paused%3F%22pause%22%3A%22play%22%5D()%2Cthis.destroy()%7DonSave()%7Bconst%20t%3Dthis._miniPlayer.els%2Ce%3Dt(%22resize%22)%2Ci%3Dthis._draggable.getPosition()%3BObject.keys(l).forEach(n%3D%3E%7Bif(%22width%22%3D%3D%3Dn%7C%7C%22height%22%3D%3D%3Dn)return%20this.settings.set(n%2Ce%5B%22width%22%3D%3D%3Dn%3F%22offsetWidth%22%3A%22offsetHeight%22%5D)%3Bif(%22x%22%3D%3D%3Dn%7C%7C%22y%22%3D%3D%3Dn)return%20this.settings.set(n%2Ci%5B%22x%22%3D%3D%3Dn%3F0%3A1%5D)%3Bif(%22opacity%22%3D%3D%3Dn)return%20this.settings.set(n%2CparseFloat(this._miniPlayer.style.opacity))%3Bconst%20s%3Dt(%22setting-%22%2Bn)%2Co%3Ds.type%3Bthis.settings.set(n%2Cs%5B%22checkbox%22%3D%3D%3Do%3F%22checked%22%3A%22value%22%5D)%7D)%2Cthis.settings.save()%2Cthis.updateSettingsHTML()%2Cthis.settings.get(%22showDebugMessages%22)%26%26this.debug(%22settings%20saved.%22)%7DonDelete()%7Bthis.settings.clearCookie()%2Cthis.settings.clear()%2Cthis.updateSettingsHTML()%2Cthis.debug(%22settings%20cleared.%22)%7DonInfo()%7Bconst%7Bstyle%3At%7D%3Dthis._miniPlayer.els(%22infoTag%22)%3Bt.display%3Dt.display%3F%22%22%3A%22none%22%7DonSlider(t)%7Bthis._miniPlayer.style.opacity%3DparseFloat(t.currentTarget.value)%2F100%7Ddebug()%7Bthis.settings.get(%22showDebugMessages%22)%26%26console.log(this.settings.get(%22bookmarkName%22)%2B%22%3A%22%2C...arguments)%7DdestroyWithAlert(t)%7Bthis.destroy()%2Cwindow.alert(t)%7Ddestroy()%7Bif(window._ytEmbed%3Dnull%2Cwindow.removeEventListener(%22click%22%2Cthis._onWindowClick)%2Cthis.debug(%22destroyed.%22)%2Cthis._miniPlayer%26%26this._player)%7Bconst%20t%3Dthis._miniPlayer.els(%22iframe%22).contentDocument%2Ce%3Dt%26%26t.querySelector(%22video%22)%3Be%26%26e.pause()%2Cthis._player.setMute(e.muted)%7Dthis._miniPlayer%26%26this._miniPlayer.remove()%2Cthis._draggable%26%26this._draggable.destroy()%2Cthis._player%26%26this._player.destroy()%2Cthis._player%3Dthis._miniPlayer%3Dthis.settings%3Dnull%7D%7D%7D%2Cfunction(t%2Ce)%7Bt.exports%3Dclass%20extends%20Map%7BgetCookie()%7Breturn%20document.cookie.split(%22%3B%22).find(t%3D%3E%2F%5Cs*ytsettings%3D%2F.test(t))%7C%7C%22%22%7DclearCookie()%7Bdocument.cookie%3D%60ytsettings%3D%3B%20expires%3D%24%7Bnew%20Date%7D%3B%60%7DparseCookie(t%3Dthis.getCookie())%7Bconst%20e%3D%2F%5Cs*ytsettings%3D(.*)%2F.exec(t)%3Breturn%20e%3FJSON.parse(e%5B1%5D)%3A%7B%7D%7Dload()%7Bthis.clear()%3Bconst%20t%3Dthis.parseCookie()%3BObject.entries(t).forEach((%5Bt%2Ce%5D)%3D%3Ethis.set(t%2Ce))%7Dsave()%7Bconst%20t%3D%7B%7D%3Bthis.forEach((e%2Ci)%3D%3Et%5Bi%5D%3De)%2Cdocument.cookie%3D%22ytsettings%3D%22%2BJSON.stringify(t)%7D%7D%7D%2Cfunction(t%2Ce)%7Bt.exports%3Dclass%7Bconstructor(t)%7Bthis.ytdPlayer%3Dt%7C%7Cdocument.querySelector(%22ytd-player%22)%7DisAd()%7Breturn!!this.ytdPlayer.querySelector(%22.ytp-ad-player-overlay%22)%7DgetVideo()%7Breturn%20this.ytdPlayer.querySelector(%22video%22)%7DsetMute(t)%7Bt!%3D%3Dthis.getVideo().muted%26%26this.ytdPlayer.querySelector(%22.ytp-mute-button%22).click()%7Ddestroy()%7Bthis.ytdPlayer%3Dnull%7D%7D%7D%2Cfunction(t%2Ce)%7Bt.exports%3Dclass%7Bconstructor(t%2Ce)%7Bthis.el%3Dt%2Cthis.filter%3De%2Cthis.onMouseDown%3Dthis.onMouseDown.bind(this)%2Cthis.onMouseUp%3Dthis.onMouseUp.bind(this)%2Cthis.onMouseMove%3Dthis.onMouseMove.bind(this)%2Cthis.isDragging%3D!1%2Cthis.startX%3Dthis.startY%3Dnull%2C%5Bthis.x%2Cthis.y%5D%3Dthis.getPosition()%2Cwindow.addEventListener(%22mousedown%22%2Cthis.onMouseDown)%2Cwindow.addEventListener(%22mouseup%22%2Cthis.onMouseUp)%2Cwindow.addEventListener(%22mousemove%22%2Cthis.onMouseMove)%7DgetPosition()%7Bif(!this.el.style.transform)return%5B0%2C0%5D%3Breturn%2Ftranslate%5C((%5B%5Cd%5C.%5D%2B)px%2C%5Cs*(%5B%5Cd%5C.%5D%2B)px%5C)%2F.exec(this.el.style.transform).slice(1%2C3).map(t%3D%3EparseFloat(t))%7DsetPosition(t%2Ce)%7Bthis.el.style.transform%3D%60translate(%24%7Bt%7Dpx%2C%20%24%7Be%7Dpx)%60%2Cthis.isDragging%7C%7C(%5Bthis.x%2Cthis.y%5D%3D%5Bt%2Ce%5D)%7DonMouseDown(t)%7Bthis.filter%26%26!this.filter(t)%7C%7C(this.isDragging%3D!0%2Cthis.startX%3Dt.clientX%2Cthis.startY%3Dt.clientY%2Cthis.el.dispatchEvent(new%20Event(%22dragStart%22)))%7DonMouseUp(t)%7Bthis.isDragging%26%26(this.isDragging%3D!1%2Cthis.x%3Dthis.x%2Bt.clientX-this.startX%2Cthis.y%3Dthis.y%2Bt.clientY-this.startY%2Cthis.startX%3Dthis.startY%3Dnull%2Cthis.el.dispatchEvent(new%20Event(%22dragEnd%22)))%7DonMouseMove(t)%7Bif(!this.isDragging)return%3Bconst%20e%3Dthis.x%2Bt.clientX-this.startX%2Ci%3Dthis.y%2Bt.clientY-this.startY%3Bthis.setPosition(e%2Ci)%7Ddestroy()%7Bwindow.removeEventListener(%22mousedown%22%2Cthis.onMouseDown)%2Cwindow.removeEventListener(%22mouseup%22%2Cthis.onMouseUp)%2Cwindow.removeEventListener(%22mousemove%22%2Cthis.onMouseMove)%7D%7D%7D%2Cfunction(t%2Ce)%7Bconst%20i%3D%7Bposition%3A%22fixed%22%2Ctop%3A0%2Cleft%3A0%2C%22z-index%22%3A9999%2Cbackground%3A%22%23d0d0d0%22%2Cpadding%3A%224px%22%2C%22box-shadow%22%3A%220px%200px%2016px%20rgba(0%2C%200%2C%200%2C%200.6)%22%2C%22border-radius%22%3A%226px%22%2C%22will-change%22%3A%22transform%2Copacity%22%7D%3Bt.exports%3D(t%2Ce%3D0%2Cn)%3D%3E%7Bn%3Dn%3F%7B...i%2C...n%7D%3Ai%3Bconst%20s%3Dfunction(t%2Ce%3D0)%7Bconst%20i%3Ddocument.createElement(%22div%22)%2Cn%3D%60https%3A%2F%2Fwww.youtube.com%2Fembed%2F%24%7Bt%7D%3Fautoplay%3D1%26start%3D%24%7B~~e%7D%60%2Cs%3D%22height%3A%201px%3B%20background%3A%20%236f6f6f%3B%20margin%3A%204px%200%3B%22%2Co%3D%22flex%3A%200%200%20var(--button-width)%3B%20margin-right%3A%204px%3B%22%3Breturn%20i.innerHTML%3D%60%5Cn%5Ct%5Ct%3Cdiv%3E%5Cn%5Ct%5Ct%5Ct%3Cdiv%20data-el%3D%22controls%22%20style%3D%22cursor%3A%20grab%3B%20--button-width%3A%2030px%3B%20display%3A%20flex%3B%20flex-wrap%3A%20wrap%3B%20user-select%3A%20none%3B%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%20style%3D%22%24%7Bo%7D%22%20data-el%3D%22exit%22%20title%3D%22Exit%22%3E%C3%97%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%20style%3D%22%24%7Bo%7D%22%20data-el%3D%22minimize%22%20title%3D%22Minimize%22%3E%E2%80%93%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%20style%3D%22%24%7Bo%7D%22%20data-el%3D%22exitAndApply%22%20title%3D%22Exit%20and%20replace%20video%22%3E%E2%86%91%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cbutton%20style%3D%22%24%7Bo%7D%20margin-right%3A%200%3B%22%20data-el%3D%22info%22%20title%3D%22Toggle%20info%20panel%22%3E%E2%93%98%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cinput%20title%3D%22Adjust%20opacity%22%20type%3D%22range%22%20data-el%3D%22slider%22%20value%3D%22100%22%20min%3D%2230%22%20style%3D%22width%3A%2030px%3B%20transform%3A%20rotate(-90deg)%3B%20cursor%3A%20ns-resize%3B%22%2F%3E%5Cn%5Ct%5Ct%5Ct%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%3Cdiv%20style%3D%22%24%7Bs%7D%22%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%3Cdiv%20data-el%3D%22resize%22%20style%3D%22resize%3A%20both%3B%20overflow%3A%20scroll%3B%20min-width%3A%20186px%3B%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Cdiv%20data-el%3D%22infoTag%22%20style%3D%22display%3A%20none%3B%20font-size%3A%2012px%3B%22%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Ca%20href%3D%22https%3A%2F%2Fgithub.com%2Fsergeismirnovblyat%2Fyt-embed%22%20target%3D%22_blank%22%20rel%3D%22noopener%20noreferrer%22%3E%24%7B((t%3D20%2Ce%3D20)%3D%3E%60%3Csvg%20style%3D%22width%3A%20%24%7Bt%7Dpx%3B%20height%3A%20%24%7Be%7Dpx%3B%22%20class%3D%22octicon%20octicon-mark-github%20v-align-middle%22%20viewBox%3D%220%200%2016%2016%22%20version%3D%221.1%22%20aria-hidden%3D%22true%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M8%200C3.58%200%200%203.58%200%208c0%203.54%202.29%206.53%205.47%207.59.4.07.55-.17.55-.38%200-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01%201.08.58%201.23.82.72%201.21%201.87.87%202.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95%200-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12%200%200%20.67-.21%202.2.82.64-.18%201.32-.27%202-.27.68%200%201.36.09%202%20.27%201.53-1.04%202.2-.82%202.2-.82.44%201.1.16%201.92.08%202.12.51.56.82%201.27.82%202.15%200%203.07-1.87%203.75-3.65%203.95.29.25.54.73.54%201.48%200%201.07-.01%201.93-.01%202.2%200%20.21.15.46.55.38A8.013%208.013%200%200016%208c0-4.42-3.58-8-8-8z%22%3E%60)()%7D%3C%2Fpath%3E%3C%2Fsvg%3E%3C%2Fa%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cp%3E%3Cstrong%3ELegend%3C%2Fstrong%3E%3C%2Fp%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cul%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Cli%3E%3Cstrong%3E%C3%97%3C%2Fstrong%3E%3A%20close%20window.%3C%2Fli%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Cli%3E%3Cstrong%3E%E2%80%93%3C%2Fstrong%3E%3A%20minimize%20window.%3C%2Fli%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Cli%3E%3Cstrong%3E%E2%86%91%3C%2Fstrong%3E%3A%20close%20window%20and%20apply%20time%2Bmute%20to%20original.%3C%2Fli%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Cli%3E%3Cstrong%3E%E2%93%98%3C%2Fstrong%3E%3A%20toggle%20info%20panel.%3C%2Fli%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%5Ct%3Cli%3E%3Cstrong%3Eslider%3C%2Fstrong%3E%3A%20adjust%20window%20opacity.%3C%2Fli%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3C%2Ful%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cdiv%20style%3D%22%24%7Bs%7D%22%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cp%3E%3Cstrong%3ESettings%3C%2Fstrong%3E%3C%2Fp%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cdiv%20data-el%3D%22settings%22%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cbr%2F%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cbutton%20data-el%3D%22save%22%20title%3D%22Save%20all%20settings%22%3Esave%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cbutton%20data-el%3D%22delete%22%20title%3D%22Clear%20all%20settings%22%3Eclear%3C%2Fbutton%3E%5Cn%5Ct%5Ct%5Ct%5Ct%5Ct%3Cdiv%20style%3D%22%24%7Bs%7D%22%3E%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3C%2Fdiv%3E%5Cn%5Ct%5Ct%5Ct%5Ct%3Ciframe%20data-el%3D%22iframe%22%20src%3D%22%24%7Bn%7D%22%20style%3D%22width%3A%20100%25%3B%20height%3A%2099%25%3B%22%3E%3C%2Fiframe%3E%5Cn%5Ct%5Ct%5Ct%3C%2Fdiv%3E%5Cn%5Ct%5Ct%3C%2Fdiv%3E%5Cn%5Ct%60%2Ci.children%5B0%5D%7D(t%2Ce)%3Breturn%20Object.entries(n).forEach((%5Bt%2Ce%5D)%3D%3Es.style.setProperty(t%2Ce))%2Cs.els%3Dt%3D%3Es.querySelector(%60%5Bdata-el%3D%22%24%7Bt%7D%22%5D%60)%2CArray.from(s.querySelectorAll(%22button%22)).forEach(t%3D%3E%7Bt.style.cursor%3D%22pointer%22%7D)%2Cs%7D%7D%2Cfunction(t%2Ce)%7Bt.exports%3D(t%2Ce)%3D%3E%60%5Cn%5Ct%5Ct%3Cul%3E%5Cn%5Ct%5Ct%5Ct%24%7BArray.from(e.entries()).map((%5Be%2Ci%3D%7Btype%3A%22text%22%7D%5D)%3D%3E%7Bconst%20n%3Dt.get(e)%3Breturn%22text%22!%3D%3Di.type%26%26%22number%22!%3D%3Di.type%7C%7Cn%26%26(i.value%3Dn)%2C%22checkbox%22%3D%3D%3Di.type%26%26n%3Fi.checked%3D%22true%22%3A%22number%22%3D%3D%3Di.type%26%26(i.style%3D%22width%3A%2040px%3B%22)%2C((t%2Ce%2Ci)%3D%3E%60%3Cli%3E%24%7Bt%7D%3A%20%3Cinput%20%24%7BObject.entries(i).map((%5Bt%2Ce%5D)%3D%3E%60%24%7Bt%7D%3D%22%24%7Be%7D%22%60).join(%22%22)%7D%20data-el%3D%22setting-%24%7Bt%7D%22%2F%3E%3C%2Fli%3E%60)(e%2C0%2Ci)%7D).join(%22%22)%7D%5Cn%5Ct%5Ct%3C%2Ful%3E%5Cn%5Ct%60%7D%5D)%3B) into your bookmarklet bar.

Alternatively, create a new bookmark and set the contents of [bookmarklet.js](bookmarklet.js) as the URL.

## What it does
Only runs on youtube.com when a video is open. Grabs the video id and loads an embedded YouTube video in an iframe, which is prepended to the page. YouTube embed videos don't play ads. When the embedded video is loaded, the original is muted. Closing the video will restore the state of the original video.

<img width="300px" src="https://user-images.githubusercontent.com/69124074/89132978-fa8a3580-d4cc-11ea-9161-81149f151b92.png"/>

More details are shown when clicking the ⓘ button.

## Build locally
You will need Node and some js bundler like Webpack to compile the bookmark.
1. Clone this repo
2. Install a js bundler
3. Set entry as `./src/index.js` and compile to an output file.
4. Prepend "javascript:" to the output file.
5. Copy output file contents to use as the bookmarklet.
