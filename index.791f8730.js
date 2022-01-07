function t(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},i=e.parcelRequire2fe5;function s(t,e){e&&(t.state.activePlatforms=[]),t.platforms.forEach((n=>{n.x<t.state.pos.x-40||n.x>t.state.pos.x+220||(e?n.isInFront(t)&&(n.draw(t),t.state.activePlatforms.push(n)):n.isInFront(t)||n.draw(t))}));for(let e=0;e<t.state.activePlatforms.length;e++)t.state.activePlatforms[e].drawFront(t)}function o(t){return t}function a(t){return"function"==typeof t}function l(t){return function(e){if(function(t){return a(null==t?void 0:t.lift)}(e))return e.lift((function(e){try{return t(e,this)}catch(t){this.error(t)}}));throw new TypeError("Unable to lift unknown Observable type")}}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */null==i&&((i=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){r[t]=e},e.parcelRequire2fe5=i),i.register("bXuNP",(function(e,n){var r,i;t(e.exports,"register",(()=>r),(t=>r=t)),t(e.exports,"resolve",(()=>i),(t=>i=t));var s={};r=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)s[e[n]]=t[e[n]]},i=function(t){var e=s[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),i("bXuNP").register(JSON.parse('{"kyWCV":"index.791f8730.js","2tNeJ":"state=standing.ba016a78.svg","cHqAS":"state=jumping.b96e2621.svg","3azoX":"state=jumpingdown.b671e51c.svg","fyF46":"state=running.d0f4de5b.svg","hwkjF":"state=walking.9bf4b991.svg","2Y9IQ":"thunder-rumble.8aefcfcc.mp3","bcCjA":"running.eaae51b0.mp3","gGtgZ":"jump-up.420299c8.mp3","6st5N":"jump-down.9a12dd6f.mp3","cW1G3":"dead-scream.c8f2cef1.mp3"}'));var u=function(t,e){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)};function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}Object.create;function p(t){var e="function"==typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function h(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,s=n.call(t),o=[];try{for(;(void 0===e||e-- >0)&&!(r=s.next()).done;)o.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=s.return)&&n.call(s)}finally{if(i)throw i.error}}return o}function d(t,e,n){if(n||2===arguments.length)for(var r,i=0,s=e.length;i<s;i++)!r&&i in e||(r||(r=Array.prototype.slice.call(e,0,i)),r[i]=e[i]);return t.concat(r||Array.prototype.slice.call(e))}Object.create;function f(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}var m=f((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function y(t,e){if(t){var n=t.indexOf(e);0<=n&&t.splice(n,1)}}var g=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._teardowns=null}var e;return t.prototype.unsubscribe=function(){var t,e,n,r,i;if(!this.closed){this.closed=!0;var s=this._parentage;if(s)if(this._parentage=null,Array.isArray(s))try{for(var o=p(s),l=o.next();!l.done;l=o.next()){l.value.remove(this)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(e=o.return)&&e.call(o)}finally{if(t)throw t.error}}else s.remove(this);var u=this.initialTeardown;if(a(u))try{u()}catch(t){i=t instanceof m?t.errors:[t]}var c=this._teardowns;if(c){this._teardowns=null;try{for(var f=p(c),y=f.next();!y.done;y=f.next()){var g=y.value;try{b(g)}catch(t){i=null!=i?i:[],t instanceof m?i=d(d([],h(i)),h(t.errors)):i.push(t)}}}catch(t){n={error:t}}finally{try{y&&!y.done&&(r=f.return)&&r.call(f)}finally{if(n)throw n.error}}}if(i)throw new m(i)}},t.prototype.add=function(e){var n;if(e&&e!==this)if(this.closed)b(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._teardowns=null!==(n=this._teardowns)&&void 0!==n?n:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&y(e,t)},t.prototype.remove=function(e){var n=this._teardowns;n&&y(n,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),w=g.EMPTY;function v(t){return t instanceof g||t&&"closed"in t&&a(t.remove)&&a(t.add)&&a(t.unsubscribe)}function b(t){a(t)?t():t.unsubscribe()}var x={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},S={setTimeout:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=S.delegate;return((null==n?void 0:n.setTimeout)||setTimeout).apply(void 0,d([],h(t)))},clearTimeout:function(t){var e=S.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function _(t){S.setTimeout((function(){var e=x.onUnhandledError;if(!e)throw t;e(t)}))}function j(){}var k=P("C",void 0,void 0);function P(t,e,n){return{kind:t,value:e,error:n}}var E=null;function F(t){if(x.useDeprecatedSynchronousErrorHandling){var e=!E;if(e&&(E={errorThrown:!1,error:null}),t(),e){var n=E,r=n.errorThrown,i=n.error;if(E=null,r)throw i}}else t()}function R(t){x.useDeprecatedSynchronousErrorHandling&&E&&(E.errorThrown=!0,E.error=t)}var C=function(t){function e(e){var n=t.call(this)||this;return n.isStopped=!1,e?(n.destination=e,v(e)&&e.add(n)):n.destination=H,n}return c(e,t),e.create=function(t,e,n){return new A(t,e,n)},e.prototype.next=function(t){this.isStopped?B(function(t){return P("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?B(P("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?B(k,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(g),A=function(t){function e(e,n,r){var i,s=t.call(this)||this;if(a(e))i=e;else if(e){var o;i=e.next,n=e.error,r=e.complete,s&&x.useDeprecatedNextContext?(o=Object.create(e)).unsubscribe=function(){return s.unsubscribe()}:o=e,i=null==i?void 0:i.bind(o),n=null==n?void 0:n.bind(o),r=null==r?void 0:r.bind(o)}return s.destination={next:i?L(i,s):j,error:L(null!=n?n:U,s),complete:r?L(r,s):j},s}return c(e,t),e}(C);function L(t,e){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{t.apply(void 0,d([],h(e)))}catch(t){x.useDeprecatedSynchronousErrorHandling?R(t):_(t)}}}function U(t){throw t}function B(t,e){var n=x.onStoppedNotification;n&&S.setTimeout((function(){return n(t,e)}))}var H={closed:!0,next:j,error:U,complete:j},I=function(t){function e(e,n,r,i,s){var o=t.call(this,e)||this;return o.onFinalize=s,o._next=n?function(t){try{n(t)}catch(t){e.error(t)}}:t.prototype._next,o._error=i?function(t){try{i(t)}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._error,o._complete=r?function(){try{r()}catch(t){e.error(t)}finally{this.unsubscribe()}}:t.prototype._complete,o}return c(e,t),e.prototype.unsubscribe=function(){var e,n=this.closed;t.prototype.unsubscribe.call(this),!n&&(null===(e=this.onFinalize)||void 0===e||e.call(this))},e}(C);function T(t,e){return void 0===e&&(e=o),t=null!=t?t:O,l((function(n,r){var i,s=!0;n.subscribe(new I(r,(function(n){var o=e(n);!s&&t(i,o)||(s=!1,i=o,r.next(n))})))}))}function O(t,e){return t===e}var N="function"==typeof Symbol&&Symbol.observable||"@@observable";function W(t){return 0===t.length?o:1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}}var $=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var n=new t;return n.source=this,n.operator=e,n},t.prototype.subscribe=function(t,e,n){var r,i=this,s=(r=t)&&r instanceof C||function(t){return t&&a(t.next)&&a(t.error)&&a(t.complete)}(r)&&v(r)?t:new A(t,e,n);return F((function(){var t=i,e=t.operator,n=t.source;s.add(e?e.call(s,n):n?i._subscribe(s):i._trySubscribe(s))})),s},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var n=this;return new(e=D(e))((function(e,r){var i=new A({next:function(e){try{t(e)}catch(t){r(t),i.unsubscribe()}},error:r,complete:e});n.subscribe(i)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[N]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return W(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=D(t))((function(t,n){var r;e.subscribe((function(t){return r=t}),(function(t){return n(t)}),(function(){return t(r)}))}))},t.create=function(e){return new t(e)},t}();function D(t){var e;return null!==(e=null!=t?t:x.Promise)&&void 0!==e?e:Promise}var M=f((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),Y=function(t){function e(){var e=t.call(this)||this;return e.closed=!1,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return c(e,t),e.prototype.lift=function(t){var e=new q(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new M},e.prototype.next=function(t){var e=this;F((function(){var n,r;if(e._throwIfClosed(),!e.isStopped){var i=e.observers.slice();try{for(var s=p(i),o=s.next();!o.done;o=s.next()){o.value.next(t)}}catch(t){n={error:t}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(n)throw n.error}}}}))},e.prototype.error=function(t){var e=this;F((function(){if(e._throwIfClosed(),!e.isStopped){e.hasError=e.isStopped=!0,e.thrownError=t;for(var n=e.observers;n.length;)n.shift().error(t)}}))},e.prototype.complete=function(){var t=this;F((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var e=t.observers;e.length;)e.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,n=e.hasError,r=e.isStopped,i=e.observers;return n||r?w:(i.push(t),new g((function(){return y(i,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,n=e.hasError,r=e.thrownError,i=e.isStopped;n?t.error(r):i&&t.complete()},e.prototype.asObservable=function(){var t=new $;return t.source=this,t},e.create=function(t,e){return new q(t,e)},e}($),q=function(t){function e(e,n){var r=t.call(this)||this;return r.destination=e,r.source=n,r}return c(e,t),e.prototype.next=function(t){var e,n;null===(n=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===n||n.call(e,t)},e.prototype.error=function(t){var e,n;null===(n=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===n||n.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,n;return null!==(n=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==n?n:w},e}(Y),J=function(t){function e(e){var n=t.call(this)||this;return n._value=e,n}return c(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var n=t.prototype._subscribe.call(this,e);return!n.closed&&e.next(this._value),n},e.prototype.getValue=function(){var t=this,e=t.hasError,n=t.thrownError,r=t._value;if(e)throw n;return this._throwIfClosed(),r},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(Y);class V{get state(){return this.state$.getValue()}constructor(t){this.state$=new J(t)}select(t){return this.state$.asObservable().pipe((e=e=>t(e),l((function(t,r){var i=0;t.subscribe(new I(r,(function(t){r.next(e.call(n,t,i++))})))}))),T());var e,n}setState(t){this.state$.next({...this.state,...t})}}const X=new class{_getArrow(t){switch(t){case"ArrowLeft":return"left";case"ArrowRight":return"right";case"ArrowUp":return"up";case"ArrowDown":return"down"}}_inArrows(t){return this._arrows.includes(t)}_isSpace(t){return" "===t}_getKey(t){return t.toLowerCase()}_getState(t){return this._inArrows(t)?this._getArrow(t):this._isSpace(t)?"space":this._getKey(t)}initialize(){window.addEventListener("keydown",this._setState),window.addEventListener("keyup",this._setState)}stop(){window.removeEventListener("keydown",this._setState),window.removeEventListener("keyup",this._setState)}constructor(){this.state=new J(null),this.state$=this.state.asObservable().pipe(T(((t,e)=>t===e))),this._arrows=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"],this._setState=t=>{this.state.next(this._getState(t.key))}}};function z(t,e,n,r,i,s){const o=t.createLinearGradient(e,0,e+n,0);o.addColorStop(0,i),o.addColorStop(1,s),t.fillStyle=o,t.fillRect(e,0,n,r)}class G{constructor(t,e){this.width=t,this.height=e;let n=document.createElement("canvas");n.width=t,n.height=e,this.ctx=n.getContext("2d"),this.canvas=n}}function K(t,e,n){var r=n/180*Math.PI;return e+t*Math.cos(r)}function Q(t,e,n){const r=new G(t.tower.width,e);t.brick.padding;let i=t.brick.padding,s={x:0,y:0},o=t.brick.width;const a=t.brick.width;let l=!0;const u=r.ctx.createLinearGradient(0,0,r.canvas.width,e);u.addColorStop(0,"black"),u.addColorStop(.35,"#353637"),u.addColorStop(.65,"#353637"),u.addColorStop(1,"black"),r.ctx.fillStyle=u,r.ctx.fillRect(0,0,r.canvas.width,r.canvas.height);for(let e=0;e<2;e++){for(let e=180+n;e<=360;e+=a)s=K(600,600,e),l&&(e+=a/2,l=!1),o=K(600,600,e+a),r.ctx.fillStyle=t.brick.color,r.ctx.fillRect(s,i,o-s-t.brick.padding,t.brick.height),r.ctx.fillStyle=t.brick.shade,r.ctx.fillRect(s,i,o-s-t.brick.padding,3);i+=t.brick.padding,i+=t.brick.height}return r.canvas}function Z(t,e,...n){t.ctx.fillStyle=e,t.ctx.beginPath(),t.ctx.moveTo(n[0].x,n[0].y);for(let e=1;e<n.length;e++)t.ctx.lineTo(n[e].x,n[e].y);t.ctx.fill()}function tt(t,e,n){let r=K(e,800,n-t.platform.width/2),i=K(e,800,n+t.platform.width/2);return{left:r,right:i,width:i-r,unit:(i-r)/8}}class et{constructor(t,e){this.x=t,this.y=e,this.x=t,this.y=e}}let nt=0;class rt{constructor(t,e){this.x=t,this.y=e,this.n=nt++,this.x=t,this.y=e,this.infront=!1,this.outerBox=null}getY(t){return this.y+t.state.pos.y}isInFront(t){let e=this.x-t.state.pos.x,n=(tt(t,600,e),tt(t,680,e));return this.infront=n.left>n.right,this.infront}drawFront(t){t.ctx.fillStyle=t.colors.wood2,t.ctx.fillRect(this.outerBox.left,this.getY(t),this.outerBox.width,t.platform.height)}draw(t){let e=this.x-t.state.pos.x,n=tt(t,600,e),r=tt(t,680,e),i=n.left>r.left;this.infront=r.left>r.right;for(let e of["left","right"]){let s="left"===e?r.unit:6*r.unit,o={top:{left:new et(r.left+s,this.getY(t)+t.platform.height),right:new et(r.left+r.unit+s,this.getY(t)+t.platform.height)},bottom:{left:new et(n.left+s,this.getY(t)+70),right:new et(n.left+n.unit+s,this.getY(t)+70)}},a={top:{left:new et(r.left+s,this.getY(t)+(t.platform.height-10)),right:new et(r.left+r.unit+s,this.getY(t)+(t.platform.height-10))},bottom:{left:new et(n.left+s,this.getY(t)+60),right:new et(n.left+n.unit+s,this.getY(t)+60)}};Z(t,t.colors.wood3,a.top.left,a.bottom.left,a.bottom.right,a.top.right),Z(t,t.colors.wood4,o.top.left,o.bottom.left,o.bottom.right,o.top.right),i?Z(t,t.colors.wood5,a.top.left,o.top.left,o.bottom.left,a.bottom.left):Z(t,t.colors.wood5,a.top.right,o.top.right,o.bottom.right,a.bottom.right)}t.ctx.fillStyle=t.colors.wood1,i?t.ctx.fillRect(n.left,this.getY(t),r.left-n.left,t.platform.height):t.ctx.fillRect(r.right,this.getY(t),n.left-r.left,t.platform.height),this.outerBox=r}}const it=new class extends V{jumpUp(){this.setState({jumping:!0})}jumpDown(){this.setState({jumping:!1})}setSpeed(t){this.setState({speed:t})}run(){this.setState({running:!0})}idle(){this.setState({running:!1})}pause(){this.setState({paused:!0})}resume(){this.setState({paused:!1})}constructor(...t){super(...t),this.jumping$=this.select((t=>t.jumping)),this.running$=this.select((t=>t.running)),this.paused$=this.select((t=>t.paused)),this.dir$=this.select((t=>t.dir)),this.pos$=this.select((t=>t.pos)),this.speed$=this.select((t=>t.speed))}}({jumping:!1,running:!1,paused:!1,dir:1,pos:new et(0,0),speed:0});function st(t,e,n){37===e.keyCode&&(t.input.left=n),39===e.keyCode&&(t.input.right=n),32===e.keyCode&&(t.input.jump=n)}function ot(t,e,n,r,i){let s=new G(317,300),o=new Image;return o.onload=function(){i&&(s.ctx.save(),s.ctx.scale(-1,1)),s.ctx.drawImage(o,0,0,317*(i?-1:1),300),i&&s.ctx.restore(),t.animationFrames[n][r]=s.canvas},o.src=e,s.canvas}function at(t,e,n,r,i,s){return s&&(t.ctx.fillStyle=s,t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height)),t.ctx.fillStyle=e,t.ctx.beginPath(),t.ctx.moveTo(n,90),t.ctx.lineTo(n,90+i),t.ctx.lineTo(n+r,90+i),t.ctx.lineTo(n+r,90),t.ctx.ellipse(n+r/2,90,r/2,90,0,0,Math.PI,!0),t.ctx.fill(),t.canvas}class lt{constructor(t,e){this.x=t,this.y=e,this.x=t,this.y=e}draw(t){const e=this.x-t.state.pos.x,n=K(600,800,e-t.platform.width/2),r=K(600,800,e+t.platform.width/2);if(n>r){const i=K(560,800,e-t.platform.width/2),s=K(560,800,e+t.platform.width/2),o=new G(1600,250),a=at(new G(1600,250),"#2A3849",s,i-s,250,"#262525"),l=at(o,t.ctx.createPattern(a,"no-repeat"),r,n-r,250);t.ctx.drawImage(l,0,this.y+t.state.pos.y)}}}function ut(t){t.rect=t.container.getBoundingClientRect(),t.canvas.height>window.innerHeight&&(t.container.style.transform=`scale(${window.innerHeight/t.canvas.height})`)}const ct=new G(10,10).canvas,pt=document.querySelector("form").elements.namedItem("points"),ht={container:null,canvas:null,ctx:null,rect:null,platforms:[new rt(1600,600),new rt(1585,600),new rt(1570,600),new rt(1540,500),new rt(1525,500),new rt(1480,500),new rt(1465,500),new rt(1435,400),new rt(1415,270),new rt(1435,135),new rt(1465,40),new rt(1480,40),new rt(1500,-80),new rt(1520,-200),new rt(1520,-335),new rt(1490,-460),new rt(1460,-535),new rt(1430,-610),new rt(1415,-610),new rt(1370,-610),new rt(1355,-610),new rt(1355,-610),new rt(1330,-710),new rt(1305,-810),new rt(1280,-910),new rt(1265,-910),new rt(1220,-910),new rt(1205,-910)],openings:[new lt(1600,350),new lt(1205,-1160)],brick:{shine:"",shade:"rgba(256, 256, 256, 0.8)",color:"rgba(143, 153, 163, 1)",width:16,height:48,padding:4},platform:{height:22,width:13,color:"#5A4142"},tower:{width:1200,shadowWidth:130,skyWidth:200},sky:{bg:"#092A50",starSizes:[2,3,4,5],starColors:["#1E728C","#98ECFF","#7AEFFF","#FFF385"]},colors:{bg:"#FBD0D0",wood1:"#B5754C",wood2:"#CB946D",wood3:"#4B3937",wood4:"#EB9A67",wood5:"#B46736"},settings:{maxSpeed:.09,minSpeed:.01,friction:.7,acceleration:.02,jump:{gravity:{boost:.0014,normal:.003,down:.004},maxSpeed:.6,fallStartSpeed:.07,friction:.98}},storage:{bricks:null,sky:null,shadows:null},input:{left:!1,right:!1,jump:!1},animationFrames:{standing:[ct,ct],jumpingUp:[ct,ct],jumpingDown:[ct,ct],runningLeft:[ct,ct,ct,ct],runningRight:[ct,ct,ct,ct]},savedState:null,state:{paused:!1,points:0,lastPlatform:null,titles:{opacity:0,ready:!1,text:"Tente outra vez : )"},climbstarted:!1,time:null,dt:null,climbspeed:{normal:.05,fast:.12},pos:{x:1510,y:0},activePlatforms:[],jump:{isGrounded:!0,isJumping:!1,isBoosting:!1,speed:0,nextY:0},player:{dir:1,x:725,y:350,prevY:350,speed:0,animationFrame:0,animationFrameCount:0}}},dt=new class extends V{setState(t){super.setState({...this.state,...t})}jump(t){this.setState({jump:{...this.state.jump,...t}})}player(t){this.setState({player:{...this.state.player,...t}})}pos(t){this.setState({pos:{...this.state.pos,...t}})}pause(){this.setState({paused:!0})}resume(){this.setState({paused:!1})}points(t){this.setState({points:t})}constructor(...t){super(...t),this.lastPlatform$=this.select((t=>t.lastPlatform)),this.points$=this.select((t=>t.points)),this.player$=this.select((t=>t.player)),this.paused$=this.select((t=>t.paused)),this.jump$=this.select((t=>t.jump)),this.pos$=this.select((t=>t.pos))}}(ht.state);ht.container=document.querySelector("#container"),ht.canvas=document.querySelector("canvas"),ht.ctx=ht.canvas.getContext("2d");var ft;i.register("kPq84",(function(e,n){var r;t(e.exports,"getBundleURL",(()=>r),(t=>r=t));var i={};function s(t){return(""+t).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(t){var e=i[t];return e||(e=function(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(t)return s(t[2])}return"/"}(),i[t]=e),e}})),ft=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("2tNeJ");var mt;mt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("cHqAS");var yt;yt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("3azoX");var gt;gt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("fyF46");var wt;wt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("hwkjF");let vt=!1;function bt(t,e){t.lastPlatform&&e.n>t.lastPlatform.n&&(e.n===t.lastPlatform.n+1?t.points+=10*e.n:t.points+=10*e.n*(10*t.player.speed),pt.value=(0|t.points).toString(),t.lastPlatform=e)}ut(ht),window.addEventListener("resize",(()=>ut(ht))),ht.savedState||(ht.savedState=JSON.parse(JSON.stringify(ht.state))),function(){const t=new URL(ft),e=new URL(mt),n=new URL(yt),r=new URL(gt),i=new URL(wt);ot(ht,t.pathname,"standing",0,!1),ot(ht,t.pathname,"standing",1,!0),ot(ht,e.pathname,"jumpingUp",0,!1),ot(ht,e.pathname,"jumpingUp",1,!0),ot(ht,n.pathname,"jumpingDown",0,!1),ot(ht,n.pathname,"jumpingDown",1,!0),ot(ht,r.pathname,"runningLeft",0,!1),ot(ht,r.pathname,"runningLeft",1,!1),ot(ht,i.pathname,"runningLeft",2,!1),ot(ht,i.pathname,"runningLeft",3,!1),ot(ht,r.pathname,"runningRight",0,!0),ot(ht,r.pathname,"runningRight",1,!0),ot(ht,i.pathname,"runningRight",2,!0),ot(ht,i.pathname,"runningRight",3,!0)}(),function t(){let e=document.timeline.currentTime??0;var n;ht.state.dt=e-(ht.state.time||e),ht.state.time=e,ht.state.paused||function(){ht.input.left?ht.state.player.speed+=ht.settings.acceleration:ht.input.right?ht.state.player.speed-=ht.settings.acceleration:0!==ht.state.player.speed&&(ht.state.player.speed*=ht.state.jump.isJumping?ht.settings.jump.friction:ht.settings.friction);Math.abs(ht.state.player.speed)>ht.settings.maxSpeed?ht.state.player.speed=ht.state.player.speed>0?ht.settings.maxSpeed:-1*ht.settings.maxSpeed:Math.abs(ht.state.player.speed)<ht.settings.minSpeed&&(it.idle(),dt.player({speed:0}),ht.state.player.speed=0);if(0!==ht.state.player.speed){ht.state.jump.isJumping||it.run();const t=ht.state.jump.isJumping?.7*ht.state.player.speed:ht.state.player.speed;ht.state.pos.x+=ht.state.player.speed<0?Math.ceil(t*ht.state.dt):Math.floor(t*ht.state.dt),ht.state.player.dir=t>0?0:1,dt.player(ht.state.player)}!ht.state.climbstarted&&ht.input.jump&&(ht.state.climbstarted=!0);if((ht.input.jump||ht.state.jump.isJumping)&&(ht.state.jump.isGrounded&&(it.jumpUp(),it.idle(),ht.state.jump.isGrounded=!1,ht.state.jump.isJumping=!0,ht.state.jump.isBoosting=!0,ht.state.jump.speed=ht.settings.jump.maxSpeed),ht.state.jump.isJumping)){const t=ht.state.jump.speed>0,e=ht.state.dt<30?30-ht.state.dt:0;!t&&ht.state.jump.isBoosting&&(ht.state.jump.isBoosting=!1),ht.state.player.prevY=ht.state.player.y,ht.state.player.y-=ht.state.jump.speed*ht.state.dt,ht.state.jump.speed-=(ht.settings.jump.gravity[t?ht.state.jump.isBoosting?"boost":"normal":"down"]-2e-5*e)*ht.state.dt}ht.state.jump.isBoosting&&!ht.input.jump&&(ht.state.jump.isBoosting=!1);ht.state.climbstarted&&ht.state.pos.y<1440&&(ht.state.pos.y+=(ht.state.player.y+ht.state.pos.y<250?ht.state.climbspeed.fast:ht.state.climbspeed.normal)*ht.state.dt);(function(){if(ht.state.jump.isJumping&&ht.state.jump.speed<0)for(let t=0;t<ht.state.activePlatforms.length;t++){const e=ht.state.activePlatforms[t];if(Math.abs(e.x-(ht.state.pos.x+90))<10){const t=ht.state.player.y+250,n=ht.state.player.prevY+250;t>e.y&&n<e.y&&(it.jumpDown(),it.idle(),ht.state.player.y=e.y-250,ht.state.jump.isGrounded=!0,ht.state.jump.isJumping=!1,ht.state.jump.isBoosting=!1,ht.state.jump.speed=0)}}else if(ht.state.jump.isGrounded){let t=!1;for(let e=0;e<ht.state.activePlatforms.length;e++){let n=ht.state.activePlatforms[e];if(Math.abs(n.x-(ht.state.pos.x+90))<10&&(bt(ht.state,n),n.y-(ht.state.player.y+250)==0)){t=!0;break}}t||(it.jumpUp(),ht.state.jump.isGrounded=!1,ht.state.jump.isJumping=!0,ht.state.jump.isBoosting=!0,ht.state.jump.speed=ht.settings.jump.fallStartSpeed)}})(),ht.state.player.y+ht.state.pos.y>900&&(it.idle(),ht.state.paused=!0);dt.setState(ht.state)}(),ht.state.paused||100===ht.state.titles.opacity||(function(t){if(null==t.storage.sky){const e=t.canvas.height,n=new G(t.canvas.width,e);n.ctx.fillStyle=t.sky.bg,n.ctx.fillRect(0,0,t.canvas.width,e);for(let r=0;r<150;r++){const r=Math.floor(Math.random()*t.sky.starSizes.length);n.ctx.fillStyle=t.sky.starColors[r],n.ctx.beginPath(),n.ctx.arc(Math.floor(Math.random()*t.canvas.width),Math.floor(Math.random()*e),t.sky.starSizes[r],0,2*Math.PI),n.ctx.fill()}t.storage.sky=n.canvas}else{const e=(t.state.pos.x-2e3)%200*-8,n=t.state.pos.y%t.canvas.height;t.ctx.drawImage(t.storage.sky,e,n),t.ctx.drawImage(t.storage.sky,e-t.canvas.width,n),t.ctx.drawImage(t.storage.sky,e,n-t.canvas.height),t.ctx.drawImage(t.storage.sky,e-t.canvas.width,n-t.canvas.height)}}(ht),s(ht,!1),function(t){const e=2*t.brick.height+2*t.brick.padding;if(!t.storage.bricks){t.storage.bricks={};for(let n=0;n<16;n++)t.storage.bricks["brick"+n]=Q(t,e,n)}for(let n=-1;n<12;n++)t.ctx.drawImage(t.storage.bricks["brick"+t.state.pos.x%t.brick.width],t.tower.skyWidth,e*n+t.state.pos.y%e)}(ht),(n=ht).openings.forEach((t=>{t.x<n.state.pos.x-40||t.x>n.state.pos.x+220||t.draw(n)})),function(t){if(t.storage.shadows)t.ctx.drawImage(t.storage.shadows,t.tower.skyWidth,0);else{const e=new G(t.tower.width,t.canvas.height);z(e.ctx,0,t.tower.shadowWidth+80,t.canvas.height,"#727C80","transparent"),z(e.ctx,0,t.tower.shadowWidth,t.canvas.height,"#00011F","transparent"),z(e.ctx,e.canvas.width-(t.tower.shadowWidth+80),t.tower.shadowWidth+80,t.canvas.height,"transparent","#727C80"),z(e.ctx,e.canvas.width-t.tower.shadowWidth,t.tower.shadowWidth,t.canvas.height,"transparent","#00011F"),t.storage.shadows=e.canvas}}(ht),s(ht,!0),function(t){const e=t.state.player.y+t.state.pos.y-48,n=t.state.player.x-(t.state.player.dir?120:80);t.state.jump.isJumping?t.state.jump.speed>0?t.ctx.drawImage(t.animationFrames.jumpingUp[t.state.player.dir],n,e):t.ctx.drawImage(t.animationFrames.jumpingDown[t.state.player.dir],n,e):0!==t.state.player.speed?t.state.player.dir?t.ctx.drawImage(t.animationFrames.runningRight[t.state.player.animationFrame],n,e):t.ctx.drawImage(t.animationFrames.runningLeft[t.state.player.animationFrame],n,e):t.ctx.drawImage(t.animationFrames.standing[t.state.player.dir],n,e),t.state.player.animationFrameCount+=t.state.dt,t.state.player.animationFrameCount>50&&(t.state.player.animationFrame+=1,t.state.player.animationFrameCount=0),t.state.player.animationFrame>3&&(t.state.player.animationFrame=0)}(ht)),ht.state.paused&&(!function(t){t.state.dt&&t.state.titles.opacity<100&&(t.state.titles.opacity+=Math.floor(.2*t.state.dt)),t.state.titles.opacity>100&&(t.state.titles.opacity=100),t.ctx.fillStyle="rgba(0, 0, 0, "+t.state.titles.opacity/100+")",t.ctx.rect(0,0,t.canvas.width,t.canvas.height),t.ctx.fill(),t.ctx.fillStyle="rgba(245, 245, 245, "+t.state.titles.opacity/100+")",t.ctx.font="48px 'Germania One', cursive",t.ctx.fillText(t.state.titles.text,600,520-40*function(t){const e=1.70158;return--t*t*((e+1)*t+e)+1}(t.state.titles.opacity/100)),100!=t.state.titles.opacity||t.input.jump||(t.state.titles.ready=!0),t.state.titles.ready&&t.input.jump&&(t.state=JSON.parse(JSON.stringify(t.savedState)))}(ht),vt||(Pt.scream.play(),vt=!0)),requestAnimationFrame(t)}(),ht.state.lastPlatform||(ht.state.lastPlatform=ht.platforms[0]),window.addEventListener("keydown",(t=>function(t,e){st(t,e,!0)}(ht,t)),!1),window.addEventListener("keyup",(t=>function(t,e){st(t,e,!1)}(ht,t)),!1);var xt;xt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("2Y9IQ");var St;St=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("bcCjA");var _t;_t=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("gGtgZ");var jt;jt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("6st5N");var kt;kt=i("kPq84").getBundleURL("kyWCV")+i("bXuNP").resolve("cW1G3");const Pt={thunder:new Audio(new URL(xt).pathname),running:new Audio(new URL(St).pathname),jumpUp:new Audio(new URL(_t).pathname),jumpDown:new Audio(new URL(jt).pathname),scream:new Audio(new URL(kt).pathname)};Pt.thunder.loop=!0,Pt.running.loop=!0,X.initialize();let Et=!1;dt.jump$.subscribe((t=>{console.log(t)})),it.jumping$.subscribe((t=>{t||(Pt.jumpDown.play(),Pt.jumpUp.pause()),t&&(Pt.jumpUp.play(),Pt.jumpDown.pause())})),it.running$.subscribe((t=>{!Et&&t&&(Pt.thunder.play(),Et=!0),t||Pt.running.pause(),t&&Pt.running.play()}));
//# sourceMappingURL=index.791f8730.js.map
