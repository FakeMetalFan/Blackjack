!function(t){var e={};function s(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=e,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(i,a,function(e){return t[e]}.bind(null,a));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,s){},function(t,e,s){"use strict";s.r(e);class i{constructor(t){this.cards=[],this._elem=void 0,this._elem=t}push(t){this.cards.push(t),this._elem.append(t.elem)}pop(){return this.cards.pop()}get count(){return this.cards.length}get rect(){return this._elem.getBoundingClientRect()}get top(){return this.cards[this.count-1]}}const a="Blackjack!",r="Push!",n="You won!",o="You lost!",d="ace",l="two",h="three",c="four",u="five",p="six",_="seven",y="eight",m="nine",g="ten",b="jack",f="queen",w="king",k=(new Map).set(d,(t,e)=>t<11&&e<2?11:1).set(l,()=>2).set(h,()=>3).set(c,()=>4).set(u,()=>5).set(p,()=>6).set(_,()=>7).set(y,()=>8).set(m,()=>9).set(g,()=>10).set(b,()=>10).set(f,()=>10).set(w,()=>10),v=[d,l,h,c,u,p,_,y,m,g,b,f,w],P=["clubs","spades","hearts","diamonds"];class E extends i{empty(){this.cards=[]}getTopPosition(t){return{x:(2===this.count?0:this.count-2)*t,y:this.rect.y}}getValue(){return this.cards.reduce((t,{rank:e},s)=>t+k.get(e)(t,s),0)}isBlackjacked(){return 21===this.getValue()&&2===this.count}isBusted(){return this.getValue()>21}get isCardsLimitReached(){return 5===this.count}}class C extends E{revealSecondCard(){this.cards[1].show()}canDrawCard(){return this.getValue()<17}}const S=t=>new Promise(e=>{const s=t.map(t=>({...t,hasStarted:!1,hasEnded:!1}));requestAnimationFrame((function t(){if(!s.some(({hasEnded:t})=>!t))return e();const i=Date.now();s.forEach(t=>{const{start:e,end:s,onStart:a,onProgress:r,onEnd:n,hasStarted:o,hasEnded:d}=t;var l;d||i<e||(o||(t.hasStarted=!0,null==a||a()),null==r||r((l=(i-e)/(s-e))<.5?4*l**3:(l-1)*(2*l-2)*(2*l-2)+1),i>s&&(t.hasEnded=!0,null==n||n()))}),requestAnimationFrame(t)}))}),x=(t,e,s)=>t+(e-t)*s;class D{constructor(t,e,s,i,a){this.elem=document.createElement("div"),this.rank=void 0,this._backClassName="card back",this._faceClassName=void 0,this.rank=t,this.setPosition(s,i),this.foreground=a,this._faceClassName=`card ${t}-of-${e}`,this._className=this._backClassName}show(){this._className=this._faceClassName}hide(){this._className=this._backClassName}getPosition(){return(t=>{const[,,,,e,s]=getComputedStyle(t).getPropertyValue("transform").replace(/[^0-9\-.,]/g,"").split(",");return{x:+e||0,y:+s||0}})(this.elem)}setPosition(t,e){this._style.transform=`translate(${t}px, ${e}px)`}getWidth(){return t=this.elem,parseFloat(getComputedStyle(t).getPropertyValue("width"));var t}set foreground(t){this._style.zIndex=t}set opacity(t){this._style.opacity=t}get _style(){return this.elem.style}set _className(t){this.elem.className=t}}class B{constructor({delay:t=0,duration:e=0,onStart:s,onProgress:i,onEnd:a}){this.start=void 0,this.end=void 0,this.onStart=void 0,this.onProgress=void 0,this.onEnd=void 0,this.start=t+Date.now(),this.end=this.start+e,this.onStart=s,this.onProgress=i,this.onEnd=a}}class j extends i{constructor(t,e,s){super(t),e.forEach(t=>{s.forEach(e=>{const s=-this.count/4;this.push(new D(e,t,s,s,this.count))})})}async intro(){this.cards.forEach((t,e)=>{const s=-e/4;t.show(),t.setPosition(s,-250+s),t.opacity=0}),await S(this.cards.map((t,e)=>{const{x:s,y:i}=t.getPosition(),a=-e/4;return new B({delay:500+10*e,duration:1e3,onProgress:e=>{t.setPosition(x(s,a,e),x(i,a,e)),t.opacity=x(0,1,e)},onEnd:()=>{t.opacity=""}})}))}async shuffle(){for(let t=this.count-1;t;t--){const e=Math.random()*(t+1)|0;[this.cards[t],this.cards[e]]=[this.cards[e],this.cards[t]]}await S(this.cards.reduce((t,e,s)=>{const i=2*s,{x:a,y:r}=e.getPosition(),n=(2*Math.round(Math.random())-1)*(40*Math.random()+20)*parseFloat(getComputedStyle(document.body).getPropertyValue("font-size"))/16,o=-s/4;return t.push(new B({delay:i,duration:200,onProgress:t=>{e.setPosition(x(a,n,t),x(r,o,t))}}),new B({duration:200,delay:200+i,onStart:()=>{e.foreground=s},onProgress:t=>{e.setPosition(x(n,o,t),o)}})),t},[]))}toForeground(){this._style.zIndex="1"}toBackground(){this._style.zIndex="-1"}getTopPosition(){const{x:t,y:e}=this.rect,{x:s,y:i}=this.top.getPosition();return{x:t+s,y:e+i}}get _style(){return this._elem.style}}class O{constructor(t){this.elem=void 0,this._elem=t}attachHandler(t){this._elem.onclick=t}disable(){this._elem.setAttribute("disabled","")}enable(){this._elem.removeAttribute("disabled")}}class A{constructor(t,e,s,i){this.deal=void 0,this.reset=void 0,this.hit=void 0,this.stand=void 0,this.deal=new O(t),this.reset=new O(e),this.hit=new O(s),this.stand=new O(i)}disableAll(){this.deal.disable(),this.reset.disable(),this.hit.disable(),this.stand.disable()}allowHitOrStand(){this.hit.enable(),this.stand.enable()}}class W{constructor(t){this._elem=void 0,this._elem=t}show(t){this._elem.innerText=t,S([new B({duration:200,onProgress:t=>{this._opacity=x(0,1,t)},onEnd:()=>{this._opacity=""}})])}hide(){this._isVisible&&S([new B({duration:300,onProgress:t=>{this._opacity=x(1,0,t)},onEnd:()=>{this._opacity=0}})])}get _style(){return this._elem.style}set _opacity(t){this._style.opacity=t}get _isVisible(){return"0"!==this._style.opacity}}const F=(t,e,s)=>({get(){const t=s.value.bind(this);return Object.defineProperty(this,e,{value:t,writable:!0}),t}});class I{constructor(t,e,s){this._dealer=void 0,this._deck=void 0,this._player=void 0,this._dealer=t,this._deck=e,this._player=s}async supplyPlayerWithCard(){await this._dragCardFromDeck(this._player)}async supplyDealerWithCard(t){await this._dragCardFromDeck(this._dealer,t)}async supplyDeckWithCards(){const{count:t,cards:e}=this._player;await S([...e.map((t,e)=>this._getDragCardToDeckAnimation(t,this._player,e)),...this._dealer.cards.map((e,s)=>this._getDragCardToDeckAnimation(e,this._dealer,t+s))])}async _dragCardFromDeck(t,e=!0){const s=this._deck.pop(),{x:i,y:a}=t.getTopPosition(s.getWidth());await S([this._getCardDragAnimation({card:s,dx:i,dy:a-this._deck.rect.y,onEnd:()=>{s.setPosition(i,0),e&&s.show(),t.push(s)}})])}_getCardDragAnimation({card:t,dx:e,dy:s,onEnd:i}){const{x:a,y:r}=t.getPosition();return new B({onEnd:i,duration:300,onProgress:i=>{t.setPosition(x(a,e,i),x(r,s,i))}})}_getDragCardToDeckAnimation(t,{rect:e},s){t.hide();const i=this._deck.count+s;t.foreground=i;const{x:a,y:r}=this._deck.getTopPosition(),n=s/4;return this._getCardDragAnimation({card:t,dx:a-e.x-n,dy:r-e.y-n,onEnd:()=>{const e=-i/4;t.setPosition(e,e),this._deck.push(t)}})}}var N;function V(t,e,s,i,a){var r={};return Object.keys(i).forEach((function(t){r[t]=i[t]})),r.enumerable=!!r.enumerable,r.configurable=!!r.configurable,("value"in r||r.initializer)&&(r.writable=!0),r=s.slice().reverse().reduce((function(s,i){return i(t,e,s)||s}),r),a&&void 0!==r.initializer&&(r.value=r.initializer?r.initializer.call(a):void 0,r.initializer=void 0),void 0===r.initializer&&(Object.defineProperty(t,e,r),r=null),r}let z=(V((N=class{constructor({dealerElem:t,deckElem:e,playerElem:s,popupElem:i,dealBtnElem:a,resetBtnElem:r,hitBtnElem:n,standBtnElem:o}){this._dealer=void 0,this._deck=void 0,this._player=void 0,this._popup=void 0,this._buttons=void 0,this._cardSupplier=void 0,this._dealer=new C(t),this._deck=new j(e,P,v),this._player=new E(s),this._popup=new W(i),this._buttons=new A(a,r,n,o),this._cardSupplier=new I(this._dealer,this._deck,this._player),this._buttons.deal.attachHandler(this._deal),this._buttons.reset.attachHandler(this._reset),this._buttons.hit.attachHandler(this._hit),this._buttons.stand.attachHandler(this._stand),(async()=>{await this._deck.intro(),this._buttons.deal.enable()})()}async _deal(){this._popup.hide(),this._buttons.disableAll(),this._deck.toForeground(),await this._deck.shuffle(),await this._deck.shuffle(),await this._cardSupplier.supplyPlayerWithCard(),await this._cardSupplier.supplyPlayerWithCard(),await this._cardSupplier.supplyDealerWithCard(),await this._cardSupplier.supplyDealerWithCard(!1),this._buttons.reset.enable(),this._checkForBlackjack()}async _reset(){this._popup.hide(),this._buttons.disableAll(),this._deck.toBackground(),await this._cardSupplier.supplyDeckWithCards(),this._dealer.empty(),this._player.empty(),await this._deck.shuffle(),await this._deck.shuffle(),this._buttons.deal.enable()}async _hit(){this._buttons.disableAll(),await this._cardSupplier.supplyPlayerWithCard(),this._player.isBusted()?(this._dealer.revealSecondCard(),this._popup.show(o),this._buttons.reset.enable()):this._player.isCardsLimitReached?this._stand():(this._buttons.reset.enable(),this._buttons.allowHitOrStand())}async _stand(){this._buttons.disableAll(),this._dealer.revealSecondCard(),await this._supplyDealerWithCards(),this._conclude()}_checkForBlackjack(){this._player.isBlackjacked()||this._dealer.isBlackjacked()?(this._popup.show(a),this._dealer.revealSecondCard()):this._buttons.allowHitOrStand()}async _supplyDealerWithCards(){this._dealer.canDrawCard()&&!this._dealer.isCardsLimitReached&&(await this._cardSupplier.supplyDealerWithCard(),await this._supplyDealerWithCards())}_conclude(){const t=this._player.getValue(),e=this._dealer.getValue();let s=o;this._dealer.isBusted()||t>e?s=n:t===e&&(s=r),this._popup.show(s),this._buttons.reset.enable()}}).prototype,"_deal",[F],Object.getOwnPropertyDescriptor(N.prototype,"_deal"),N.prototype),V(N.prototype,"_reset",[F],Object.getOwnPropertyDescriptor(N.prototype,"_reset"),N.prototype),V(N.prototype,"_hit",[F],Object.getOwnPropertyDescriptor(N.prototype,"_hit"),N.prototype),V(N.prototype,"_stand",[F],Object.getOwnPropertyDescriptor(N.prototype,"_stand"),N.prototype),N);s(0);new z({dealerElem:document.getElementById("dealer"),deckElem:document.getElementById("deck"),playerElem:document.getElementById("player"),popupElem:document.getElementById("popup"),dealBtnElem:document.getElementById("deal-btn"),resetBtnElem:document.getElementById("reset-btn"),hitBtnElem:document.getElementById("hit-btn"),standBtnElem:document.getElementById("stand-btn")})}]);