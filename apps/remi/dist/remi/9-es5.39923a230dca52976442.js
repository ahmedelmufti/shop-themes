(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"28y5":function(t,e,i){var n=i("xGBF");"string"==typeof n&&(n=[[t.i,n,""]]),i("x0aW")(n,{hmr:!0,transform:void 0,insertInto:void 0}),n.locals&&(t.exports=n.locals)},EHyY:function(t,e,i){"use strict";i.r(e);var n=i("UNrv"),c=i("0PO+"),o=i("8kP6"),a=(i("TC+D"),i("ShHR")),s=i("UjMZ"),r=i("bKIz");Object(a.a)({_template:s.a`
    <style>
      :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
      }

      #baseURIAnchor {
        display: none;
      }

      #sizedImgDiv {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        display: none;
      }

      #img {
        display: block;
        width: var(--iron-image-width, auto);
        height: var(--iron-image-height, auto);
      }

      :host([sizing]) #sizedImgDiv {
        display: block;
      }

      :host([sizing]) #img {
        display: none;
      }

      #placeholder {
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;

        background-color: inherit;
        opacity: 1;

        @apply --iron-image-placeholder;
      }

      #placeholder.faded-out {
        transition: opacity 0.5s linear;
        opacity: 0;
      }
    </style>

    <a id="baseURIAnchor" href="#"></a>
    <div id="sizedImgDiv" role="img" hidden$="[[_computeImgDivHidden(sizing)]]" aria-hidden$="[[_computeImgDivARIAHidden(alt)]]" aria-label$="[[_computeImgDivARIALabel(alt, src)]]"></div>
    <img id="img" alt$="[[alt]]" hidden$="[[_computeImgHidden(sizing)]]" crossorigin$="[[crossorigin]]" on-load="_imgOnLoad" on-error="_imgOnError">
    <div id="placeholder" hidden$="[[_computePlaceholderHidden(preload, fade, loading, loaded)]]" class$="[[_computePlaceholderClassName(preload, fade, loading, loaded)]]"></div>
`,is:"iron-image",properties:{src:{type:String,value:""},alt:{type:String,value:null},crossorigin:{type:String,value:null},preventLoad:{type:Boolean,value:!1},sizing:{type:String,value:null,reflectToAttribute:!0},position:{type:String,value:"center"},preload:{type:Boolean,value:!1},placeholder:{type:String,value:null,observer:"_placeholderChanged"},fade:{type:Boolean,value:!1},loaded:{notify:!0,readOnly:!0,type:Boolean,value:!1},loading:{notify:!0,readOnly:!0,type:Boolean,value:!1},error:{notify:!0,readOnly:!0,type:Boolean,value:!1},width:{observer:"_widthChanged",type:Number,value:null},height:{observer:"_heightChanged",type:Number,value:null}},observers:["_transformChanged(sizing, position)","_loadStateObserver(src, preventLoad)"],created:function(){this._resolvedSrc=""},_imgOnLoad:function(){this.$.img.src===this._resolveSrc(this.src)&&(this._setLoading(!1),this._setLoaded(!0),this._setError(!1))},_imgOnError:function(){this.$.img.src===this._resolveSrc(this.src)&&(this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",this._setLoading(!1),this._setLoaded(!1),this._setError(!0))},_computePlaceholderHidden:function(){return!this.preload||!this.fade&&!this.loading&&this.loaded},_computePlaceholderClassName:function(){return this.preload&&this.fade&&!this.loading&&this.loaded?"faded-out":""},_computeImgDivHidden:function(){return!this.sizing},_computeImgDivARIAHidden:function(){return""===this.alt?"true":void 0},_computeImgDivARIALabel:function(){return null!==this.alt?this.alt:""===this.src?"":this._resolveSrc(this.src).replace(/[?|#].*/g,"").split("/").pop()},_computeImgHidden:function(){return!!this.sizing},_widthChanged:function(){this.style.width=isNaN(this.width)?this.width:this.width+"px"},_heightChanged:function(){this.style.height=isNaN(this.height)?this.height:this.height+"px"},_loadStateObserver:function(t,e){var i=this._resolveSrc(t);i!==this._resolvedSrc&&(this._resolvedSrc="",this.$.img.removeAttribute("src"),this.$.sizedImgDiv.style.backgroundImage="",""===t||e?(this._setLoading(!1),this._setLoaded(!1),this._setError(!1)):(this._resolvedSrc=i,this.$.img.src=this._resolvedSrc,this.$.sizedImgDiv.style.backgroundImage='url("'+this._resolvedSrc+'")',this._setLoading(!0),this._setLoaded(!1),this._setError(!1)))},_placeholderChanged:function(){this.$.placeholder.style.backgroundImage=this.placeholder?'url("'+this.placeholder+'")':""},_transformChanged:function(){var t=this.$.sizedImgDiv.style,e=this.$.placeholder.style;t.backgroundSize=e.backgroundSize=this.sizing,t.backgroundPosition=e.backgroundPosition=this.sizing?this.position:"",t.backgroundRepeat=e.backgroundRepeat=this.sizing?"no-repeat":""},_resolveSrc:function(t){var e=Object(r.c)(t,this.$.baseURIAnchor.href);return e.length>=2&&"/"===e[0]&&"/"!==e[1]&&(e=(location.origin||location.protocol+"//"+location.host)+e),e}}),i("WMfi");var l=i("fW1Z"),d=i("+BUq"),h=i("wHHa"),u=i("vnL/"),p=function(t){function e(e,i){var n=t.call(this,e,i)||this;return n.scheduler=e,n.work=i,n.pending=!1,n}return n.d(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var i=this.id,n=this.scheduler;return null!=i&&(this.id=this.recycleAsyncId(n,i,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,i){return void 0===i&&(i=0),setInterval(t.flush.bind(t,this),i)},e.prototype.recycleAsyncId=function(t,e,i){if(void 0===i&&(i=0),null!==i&&this.delay===i&&!1===this.pending)return e;clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var i=this._execute(t,e);if(i)return i;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var i=!1,n=void 0;try{this.work(t)}catch(c){i=!0,n=!!c&&c||new Error(c)}if(i)return this.unsubscribe(),n},e.prototype._unsubscribe=function(){var t=this.id,e=this.scheduler,i=e.actions,n=i.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&i.splice(n,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null},e}(function(t){function e(e,i){return t.call(this)||this}return n.d(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(i("Z0pB").a)),g=function(){function t(e,i){void 0===i&&(i=t.now),this.SchedulerAction=e,this.now=i}return t.prototype.schedule=function(t,e,i){return void 0===e&&(e=0),new this.SchedulerAction(this,t).schedule(i,e)},t.now=function(){return Date.now()},t}(),b=new(function(t){function e(i,n){void 0===n&&(n=g.now);var c=t.call(this,i,function(){return e.delegate&&e.delegate!==c?e.delegate.now():n()})||this;return c.actions=[],c.active=!1,c.scheduled=void 0,c}return n.d(e,t),e.prototype.schedule=function(i,n,c){return void 0===n&&(n=0),e.delegate&&e.delegate!==this?e.delegate.schedule(i,n,c):t.prototype.schedule.call(this,i,n,c)},e.prototype.flush=function(t){var e=this.actions;if(this.active)e.push(t);else{var i;this.active=!0;do{if(i=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,i){for(;t=e.shift();)t.unsubscribe();throw i}}},e}(g))(p);function m(t){return!Object(d.a)(t)&&t-parseFloat(t)+1>=0}function y(t){return t&&"function"==typeof t.schedule}function x(t){var e=t.index,i=t.period,n=t.subscriber;if(n.next(e),!n.closed){if(-1===i)return n.complete();t.index=e+1,this.schedule(t,i)}}var v=i("I+7C"),B=i("aea6"),G=function(){function t(t){this.durationSelector=t}return t.prototype.call=function(t,e){return e.subscribe(new I(t,this.durationSelector))},t}(),I=function(t){function e(e,i){var n=t.call(this,e)||this;return n.durationSelector=i,n.hasValue=!1,n.durationSubscription=null,n}return n.d(e,t),e.prototype._next=function(t){try{var e=this.durationSelector.call(this,t);e&&this._tryNext(t,e)}catch(i){this.destination.error(i)}},e.prototype._complete=function(){this.emitValue(),this.destination.complete()},e.prototype._tryNext=function(t,e){var i=this.durationSubscription;this.value=t,this.hasValue=!0,i&&(i.unsubscribe(),this.remove(i)),(i=Object(B.a)(this,e))&&!i.closed&&this.add(this.durationSubscription=i)},e.prototype.notifyNext=function(t,e,i,n,c){this.emitValue()},e.prototype.notifyComplete=function(){this.emitValue()},e.prototype.emitValue=function(){if(this.hasValue){var e=this.value,i=this.durationSubscription;i&&(this.durationSubscription=null,i.unsubscribe(),this.remove(i)),this.value=null,this.hasValue=!1,t.prototype._next.call(this,e)}},e}(v.a);let X=class extends c.a{constructor(){super(...arguments),this.active=!1,this.isEditable=!1,this.placeholder="Enter Text",this.value=null}static get styles(){return c.b`
      :host([contenteditable]) {
        outline: none;
      }
      :host {
        display: inline-block;
        cursor: text;
      }
    `}get previewText(){return this.placeholder}render(){return c.d`
      <slot></slot>
    `}firstUpdated(){var t;this.input$=function t(e,i,n,c){return Object(h.a)(n)&&(c=n,n=void 0),c?t(e,i,n).pipe(Object(u.a)(function(t){return Object(d.a)(t)?c.apply(void 0,t):c(t)})):new l.a(function(t){!function t(e,i,n,c,o){var a;if(e&&"function"==typeof e.addEventListener&&"function"==typeof e.removeEventListener){var s=e;e.addEventListener(i,n,o),a=function(){return s.removeEventListener(i,n,o)}}else if(e&&"function"==typeof e.on&&"function"==typeof e.off){var r=e;e.on(i,n),a=function(){return r.off(i,n)}}else if(e&&"function"==typeof e.addListener&&"function"==typeof e.removeListener){var l=e;e.addListener(i,n),a=function(){return l.removeListener(i,n)}}else{if(!e||!e.length)throw new TypeError("Invalid event target");for(var d=0,h=e.length;d<h;d++)t(e[d],i,n,c,o)}c.add(a)}(e,i,function(e){t.next(arguments.length>1?Array.prototype.slice.call(arguments):e)},t,n)})}(this,"focusout").pipe((t=(t=>(function(t,e,i){void 0===t&&(t=0);var n=-1;return m(e)?n=Number(e)<1?1:Number(e):y(e)&&(i=e),y(i)||(i=b),new l.a(function(e){var c=m(t)?t:+t-i.now();return i.schedule(x,c,{index:0,period:n,subscriber:e})})})(100)),function(e){return e.lift(new G(t))})),this._keyPressSub=this.input$.subscribe(t=>this.changed(t))}changed(t){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.innerText}})),0===this.innerText.length&&(this.innerText=this.placeholder)}updated(t){t.has("isEditable")&&this.toggleEditable()}toggleEditable(){this.isEditable?this.setAttribute("contenteditable",""):this.removeAttribute("contenteditable")}disconnectedCallback(){this._keyPressSub.unsubscribe()}};n.c([Object(c.e)({type:Boolean}),n.e("design:type",Object)],X.prototype,"active",void 0),n.c([Object(c.e)({type:Boolean}),n.e("design:type",Object)],X.prototype,"isEditable",void 0),n.c([Object(c.e)({type:String}),n.e("design:type",Object)],X.prototype,"placeholder",void 0),n.c([Object(c.e)({type:String}),n.e("design:type",Object)],X.prototype,"value",void 0),X=n.c([Object(c.c)("biness-text")],X);let w=class extends c.a{constructor(){super()}static get styles(){return[c.b`
      :host {
        display: block;
        height: 375px;
        position: relative;
        overflow: hidden;
      }
      :host([shadow]) {
        box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
      }
      :host(:not([featured])) .cart-icon {
        display: none;
      }
      .product-media {
        width: 100%;
        height: calc(100% - 104px);
        border-radius: 14px;
        overflow: hidden;
      }
      .wrapper,
      iron-image {
        width: 100%;
        height: 100%;
      }
      footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 105px;
        background: white;
      }
      .title {
        font-size: 1rem;
        font-weight: 600;
        color: #000000db;
        padding-bottom: 8px;
        margin: 0;
      }
      .price-tag {
        color: #d80b6d;
        font-size: 16px;
      }
      .flexed {
        display: flex;
      }
      .pad {
        padding: 1em;
      }
      button {
        color: white;
        border-radius: 25px !important;
        --mdc-theme-primary: var(--app-secondary-color);
      }
      .stats-item {
        margin-right: 12px;
        font-size: 12px;
        color: #5f5f5f;
      }
      .stats-item iron-icon {
        color: #bdbdbd;
        margin-right: 4px;
      }
      .stats {
        justify-content: center;
        align-items: center;
        margin-top: 12px;
      }
      @media only screen and (max-device-width: 480px) and (min-device-width: 320px) {
        .title {
          font-size: 0.8rem;
        }
      }
    `]}render(){return c.d`
      <div class="wrapper">
        <header></header>
        <div class="product-media">
          <iron-image style="background-color: lightgray;" sizing="cover" preload fade .src="${this.thumbnail}">
          </iron-image>
        </div>
        <footer>
          <div class="pad">
            <h4 class="title">${this.data.name}</h4>
            <div class="flexed">
              <span class="price-tag">$${this.data.price.value}</span>
              <span style="flex:1"></span>
              <!-- <button
                        class="mdc-button mdc-button--dense mdc-button--raised"
                      >
                        Add to Cart
                      </button> -->
            </div>
        </footer>
      </div>
    `}get thumbnail(){return this.data.media.length>0&&this.data.media[0].downloadURL}_firstRendered(){}_didRender(t,e){}};n.c([Object(c.e)({type:Object}),n.e("design:type",Object)],w.prototype,"data",void 0),w=n.c([Object(c.c)("remi-product-item"),n.e("design:paramtypes",[])],w),i("28y5");var f=i("AoU+"),Z=i("qfCs");i.d(e,"Home",function(){return Q});let Q=class extends o.a{constructor(){super(),this.active=!1,this.latest=[]}render(){return c.d`
      <div class="page-wrapper">
        <section class="app-hero pad">
          <div class="content layout horizontal center-center app-hero-content">
            <div class="hero-content pad flex">
              <h1 class="mdc-typography--headline2">
                <biness-text>Adu Matte Liquid Lipstick</biness-text>
              </h1>
              <p class="mdc-typography--body2">
                <biness-text
                  >Senses is the smart sleep tracker that improves your sleep,
                  wakes you up feeling great, and shoes how the envirnment of
                  your room affects yourrest.</biness-text
                >
              </p>
              <div class="call-action-wrapper center">
                <a href="/shop">
                  <mwc-button outlined class="accent-btn">
                    <biness-text>Shop Now </biness-text>
                  </mwc-button>
                </a>
              </div>
            </div>
            <div class="hero-media hidden-on-small pad flex">
              <div class="some-component"></div>
            </div>
          </div>
        </section>
        <div class="hero-bottom-wave">
          <svg
            class="white-wave"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2185.67598 163.5116"
            preserveAspectRatio="none"
          >
            <g fill="#FFF">
              <path
                id="wave-hero-a"
                d="M0.00014879508281249998,169.299133541075 C0,121.45670655968749 0,73.61032456187499 0,25.77386223625 510.57,74.124400495 866.45,56.7873953784375 1102.43,29.9850213009375 1165.08,22.871175317812497 1217.35,15.314639165625 1305.37,8.8993063053125 1663.92,-17.2141530103125 1974.87,22.398967115625002 2185.67,61.323413463125 2185.67,97.31330516125 2185.67,133.303196859375 2185.67,169.2931688853125 1457.11,169.2931688853125 728.55,169.2931688853125 0,169.2931688853125 z"
                data-original="M0,36.13176c510.57341-49.1484,866.45316-31.52357,1102.43632-4.28682,62.644,7.23026,114.91521,14.91582,202.936,21.4341C1663.92411,79.83119,1974.87411,39.56043,2185.676,0V163.5116H0Z"
                data-svg-origin="0 0"
                style="transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);"
              ></path>
              <path
                id="wave-hero-b"
                class="filler"
                d="M.00015,169.346,0,25.69084c510.57343,49.14831,866.45322,31.52344,1102.43639,4.28665,62.644-7.23023,114.91523-14.91579,202.936-21.43411,358.55178-26.55218,669.50178,13.71854,880.30381,53.27894l.00014,107.5234Z"
              ></path>
            </g>
          </svg>
        </div>
        <section
          class="app-section content layout horizontal center highlight-product pad"
        >
          <div class="media">
            <iron-image
              sizing="cover"
              preload
              src="/assets/images/banner.jpeg"
            ></iron-image>
          </div>
          <span class="flex"></span>
          <div class="pad">
            <h1 class="mdc-typography--headline3">
              <biness-text>Beauty in real Life</biness-text>
            </h1>
            <p class="mdc-typography--body2">
              <biness-text
                >Create colorful dimension from cheeks to eyes to
                templates.</biness-text
              >
            </p>
            <a href="/shop">
              <mwc-button style="margin: 2em 0" outlined class="accent-btn">
                <biness-text>Shop Now</biness-text>
              </mwc-button>
            </a>
          </div>
        </section>

        <section class="app-section feature" style="padding-bottom: 4em;">
          <div class="content">
            <div class="center heading-wrapper pad">
              <h1 class="mdc-typography--headline5">Latest</h1>
            </div>
            <div class="feature-grid">
              ${this.latest.map(t=>c.d`
                  <a href="/product/${t.id}" class="feature-item">
                    <remi-product-item
                      featured
                      .data=${t}
                    ></remi-product-item>
                  </a>
                `)}
              <!-- Show loaders -->
              ${this.latest.length<1?this.renderLoaders():""}
            </div>
          </div>
        </section>

        <section class="app-section" style="height: 70vh; position: relative;">
          <iron-image
            style="width:100%; height:100%; background-color: lightgray;"
            sizing="cover"
            preload
            fade
            src="/assets/images/pexels-photo-457704.jpeg"
          ></iron-image>
          <div class="layout vertical center-center bottom-banner-info fit">
            <div class="title mdc-typography--headline5">
              <small style="font-size:18px">NEW!</small>
              <br />Matte Liquid Lipstick
            </div>
            <div
              class="mdc-typography--body"
              style="padding: 0 24px;text-align: center;"
            >
              Stunning Metalic Look that Touch Glow Skin Tone you love.
            </div>
            <a href="/shop">
              <mwc-button class="white-btn" outlined>
                Shop Now
              </mwc-button>
            </a>
          </div>
        </section>
      </div>
    `}renderLoaders(){return[1,2,3].map(t=>c.d`
        <div class="remi-product-item-placeholder feature-item">
          <div class="remi-product-item-placeholder--image"></div>
          <div class="remi-product-item-footer pad">
            <div
              class="remi-product-item-placeholder--title placeholder-shimmer"
            ></div>
            <div
              class="remi-product-item-placeholder--price placeholder-shimmer"
            ></div>
          </div>
        </div>
      `)}firstUpdated(){return n.b(this,void 0,void 0,function*(){yield i.e(2).then(i.bind(null,"CBqr")),this.latestProducts$=f.b.products().latest(5).pipe(Object(Z.a)(t=>t.length>0)),this.latestProducts$.subscribe(t=>{this.latest=t.slice(0,6),this.requestUpdate()})})}};n.c([Object(c.e)({type:Boolean}),n.e("design:type",Object)],Q.prototype,"active",void 0),Q=n.c([Object(c.c)("remi-home"),n.e("design:paramtypes",[])],Q)},xGBF:function(t,e){t.exports=".app-hero {\n  height: 60vh;\n  background-color: var(--app-primary-color);\n  background-size: cover;\n}\n\n.app-hero-content {\n  height: 100%;\n}\n\n.hero-inner {\n  height: 60vh;\n}\n\n.hero-media > div {\n  height: 331px;\n  border-radius: 12px;\n  max-width: 600px;\n  background: #b1b1b4;\n  box-shadow: 0px 17px 27px -26px rgba(0, 0, 0, 0.7);\n  background-image: url(https://cdn.shopify.com/s/files/1/1385/7027/t/7/assets/slide_2_1024x1024.jpg?14226104591786434212);\n  background-size: cover;\n}\n\nbutton {\n  --mdc-theme-primary: var(--app-secondary-color);\n  padding: 0px 24px;\n}\n\n.hero-inner button {\n  margin: 16px;\n  padding: 0 52px;\n}\n\n.app-hero {\n  height: 80vh;\n}\n\n.hero-content {\n  color: var(--app-light-text-color);\n}\n\n.hero-content p {\n  max-width: 500px;\n}\n\n.hero-content h1 {\n  max-width: 300px;\n}\n\n.call-action-wrapper {\n  margin: 2em 0;\n}\n\n.white-wave {\n  width: 100%;\n  height: 100%;\n}\n\n.hero-bottom-wave {\n  position: relative;\n  height: 20vh;\n  margin-top: -60px;\n  z-index: 0;\n}\n\n.white-btn {\n  --mdc-theme-primary: white;\n  padding: 0px 28px !important;\n}\n\n.subtitle {\n  padding: 1em;\n}\n\n.bottom-banner-info {\n  background: #a25d707a;\n  color: white;\n}\n\n.bottom-banner-info > * {\n  margin: 8px 0;\n}\n\n.feature-grid {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  grid-gap: 24px;\n}\n\n.feature-item {\n  grid-column-end: span 2;\n}\n\nremi-product-item {\n  height: 513px;\n}\n\niron-image {\n  width: 100%;\n  height: 100%;\n  background-color: lightgray;\n}\n\n.highlight-product .media {\n  max-width: 500px;\n  height: 350px;\n  width: 100%;\n}\n\n@media only screen and (max-device-width: 768px) {\n  remi-product-item {\n    height: 363px;\n  }\n\n  .feature-grid {\n    display: block;\n    margin-bottom: -17px;\n    overflow-x: auto;\n    overflow-y: hidden;\n    padding-bottom: 17px;\n    padding-left: 40px;\n    white-space: nowrap;\n    -webkit-overflow-scrolling: touch;\n    -ms-scroll-snap-type: x mandatory;\n        scroll-snap-type: x mandatory;\n  }\n  .feature-grid > * {\n    scroll-snap-align: center;\n  }\n\n  .highlight-product {\n    display: block !important;\n    padding: 0;\n  }\n\n  .feature-item {\n    display: inline-block;\n    height: 100%;\n    max-width: 400px;\n    margin-right: 8px;\n    width: calc(47% + 24px);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9tbnQvZC9jb2RlL3Nob3AtdGhlbWVzL2FwcHMvcmVtaS9zcmMvYXBwL3BhZ2VzL2hvbWUvc3R5bGUuc2NzcyIsImFwcHMvcmVtaS9zcmMvYXBwL3BhZ2VzL2hvbWUvc3R5bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSwwQ0FBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0RBQUE7RUFDQSx3SEFBQTtFQUNBLHNCQUFBO0FDQ0Y7O0FERUE7RUFDRSwrQ0FBQTtFQUNBLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0Usa0NBQUE7QUNDRjs7QURFQTtFQUNFLGdCQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtBQ0NGOztBREVBO0VBQ0UsMEJBQUE7RUFDQSw0QkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UscUJBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxjQUFBO0FDQ0Y7O0FERUE7RUFDRSx1QkFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtBQ0NGOztBREVBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtBQ0NGOztBREVBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtBQ0NGOztBREVBO0VBQ0U7SUFDRSxhQUFBO0VDQ0Y7O0VEQ0E7SUFDRSxjQUFBO0lBQ0Esb0JBQUE7SUFDQSxnQkFBQTtJQUNBLGtCQUFBO0lBQ0Esb0JBQUE7SUFDQSxrQkFBQTtJQUNBLG1CQUFBO0lBQ0EsaUNBQUE7SUFDQSxpQ0FBQTtRQUFBLDZCQUFBO0VDRUY7RURERTtJQUNFLHlCQUFBO0VDR0o7O0VEQ0E7SUFDRSx5QkFBQTtJQUNBLFVBQUE7RUNFRjs7RURDQTtJQUNFLHFCQUFBO0lBQ0EsWUFBQTtJQUNBLGdCQUFBO0lBQ0EsaUJBQUE7SUFDQSx1QkFBQTtFQ0VGO0FBQ0YiLCJmaWxlIjoiYXBwcy9yZW1pL3NyYy9hcHAvcGFnZXMvaG9tZS9zdHlsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFwcC1oZXJvIHtcclxuICBoZWlnaHQ6IDYwdmg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYXBwLXByaW1hcnktY29sb3IpO1xyXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbn1cclxuXHJcbi5hcHAtaGVyby1jb250ZW50IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbi5oZXJvLWlubmVyIHtcclxuICBoZWlnaHQ6IDYwdmg7XHJcbn1cclxuXHJcbi5oZXJvLW1lZGlhID4gZGl2IHtcclxuICBoZWlnaHQ6IDMzMXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgbWF4LXdpZHRoOiA2MDBweDtcclxuICBiYWNrZ3JvdW5kOiAjYjFiMWI0O1xyXG4gIGJveC1zaGFkb3c6IDBweCAxN3B4IDI3cHggLTI2cHggcmdiYSgwLCAwLCAwLCAwLjcpO1xyXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5zaG9waWZ5LmNvbS9zL2ZpbGVzLzEvMTM4NS83MDI3L3QvNy9hc3NldHMvc2xpZGVfMl8xMDI0eDEwMjQuanBnPzE0MjI2MTA0NTkxNzg2NDM0MjEyKTtcclxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gIC0tbWRjLXRoZW1lLXByaW1hcnk6IHZhcigtLWFwcC1zZWNvbmRhcnktY29sb3IpO1xyXG4gIHBhZGRpbmc6IDBweCAyNHB4O1xyXG59XHJcblxyXG4uaGVyby1pbm5lciBidXR0b24ge1xyXG4gIG1hcmdpbjogMTZweDtcclxuICBwYWRkaW5nOiAwIDUycHg7XHJcbn1cclxuXHJcbi5hcHAtaGVybyB7XHJcbiAgaGVpZ2h0OiA4MHZoO1xyXG59XHJcblxyXG4uaGVyby1jb250ZW50IHtcclxuICBjb2xvcjogdmFyKC0tYXBwLWxpZ2h0LXRleHQtY29sb3IpO1xyXG59XHJcblxyXG4uaGVyby1jb250ZW50IHAge1xyXG4gIG1heC13aWR0aDogNTAwcHg7XHJcbn1cclxuXHJcbi5oZXJvLWNvbnRlbnQgaDEge1xyXG4gIG1heC13aWR0aDogMzAwcHg7XHJcbn1cclxuXHJcbi5jYWxsLWFjdGlvbi13cmFwcGVyIHtcclxuICBtYXJnaW46IDJlbSAwO1xyXG59XHJcblxyXG4ud2hpdGUtd2F2ZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uaGVyby1ib3R0b20td2F2ZSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGhlaWdodDogMjB2aDtcclxuICBtYXJnaW4tdG9wOiAtNjBweDtcclxuICB6LWluZGV4OiAwO1xyXG59XHJcblxyXG4ud2hpdGUtYnRuIHtcclxuICAtLW1kYy10aGVtZS1wcmltYXJ5OiB3aGl0ZTtcclxuICBwYWRkaW5nOiAwcHggMjhweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uc3VidGl0bGUge1xyXG4gIHBhZGRpbmc6IDFlbTtcclxufVxyXG5cclxuLmJvdHRvbS1iYW5uZXItaW5mbyB7XHJcbiAgYmFja2dyb3VuZDogI2EyNWQ3MDdhO1xyXG4gIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmJvdHRvbS1iYW5uZXItaW5mbyA+ICoge1xyXG4gIG1hcmdpbjogOHB4IDA7XHJcbn1cclxuXHJcbi5mZWF0dXJlLWdyaWQge1xyXG4gIGRpc3BsYXk6IGdyaWQ7XHJcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcclxuICBncmlkLWdhcDogMjRweDtcclxufVxyXG5cclxuLmZlYXR1cmUtaXRlbSB7XHJcbiAgZ3JpZC1jb2x1bW4tZW5kOiBzcGFuIDI7XHJcbn1cclxuXHJcbnJlbWktcHJvZHVjdC1pdGVtIHtcclxuICBoZWlnaHQ6IDUxM3B4O1xyXG59XHJcblxyXG5pcm9uLWltYWdlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xyXG59XHJcblxyXG4uaGlnaGxpZ2h0LXByb2R1Y3QgLm1lZGlhIHtcclxuICBtYXgtd2lkdGg6IDUwMHB4O1xyXG4gIGhlaWdodDogMzUwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDc2OHB4KSB7XHJcbiAgcmVtaS1wcm9kdWN0LWl0ZW0ge1xyXG4gICAgaGVpZ2h0OiAzNjNweDtcclxuICB9XHJcbiAgLmZlYXR1cmUtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIG1hcmdpbi1ib3R0b206IC0xN3B4O1xyXG4gICAgb3ZlcmZsb3cteDogYXV0bztcclxuICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxN3B4O1xyXG4gICAgcGFkZGluZy1sZWZ0OiA0MHB4O1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcclxuICAgIHNjcm9sbC1zbmFwLXR5cGU6IHggbWFuZGF0b3J5O1xyXG4gICAgPiAqIHtcclxuICAgICAgc2Nyb2xsLXNuYXAtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5oaWdobGlnaHQtcHJvZHVjdCB7XHJcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZzogMDtcclxuICB9XHJcblxyXG4gIC5mZWF0dXJlLWl0ZW0ge1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiA0MDBweDtcclxuICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgd2lkdGg6IGNhbGMoNDclICsgMjRweCk7XHJcbiAgfVxyXG59XHJcbiIsIi5hcHAtaGVybyB7XG4gIGhlaWdodDogNjB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYXBwLXByaW1hcnktY29sb3IpO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uYXBwLWhlcm8tY29udGVudCB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmhlcm8taW5uZXIge1xuICBoZWlnaHQ6IDYwdmg7XG59XG5cbi5oZXJvLW1lZGlhID4gZGl2IHtcbiAgaGVpZ2h0OiAzMzFweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWF4LXdpZHRoOiA2MDBweDtcbiAgYmFja2dyb3VuZDogI2IxYjFiNDtcbiAgYm94LXNoYWRvdzogMHB4IDE3cHggMjdweCAtMjZweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChodHRwczovL2Nkbi5zaG9waWZ5LmNvbS9zL2ZpbGVzLzEvMTM4NS83MDI3L3QvNy9hc3NldHMvc2xpZGVfMl8xMDI0eDEwMjQuanBnPzE0MjI2MTA0NTkxNzg2NDM0MjEyKTtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuYnV0dG9uIHtcbiAgLS1tZGMtdGhlbWUtcHJpbWFyeTogdmFyKC0tYXBwLXNlY29uZGFyeS1jb2xvcik7XG4gIHBhZGRpbmc6IDBweCAyNHB4O1xufVxuXG4uaGVyby1pbm5lciBidXR0b24ge1xuICBtYXJnaW46IDE2cHg7XG4gIHBhZGRpbmc6IDAgNTJweDtcbn1cblxuLmFwcC1oZXJvIHtcbiAgaGVpZ2h0OiA4MHZoO1xufVxuXG4uaGVyby1jb250ZW50IHtcbiAgY29sb3I6IHZhcigtLWFwcC1saWdodC10ZXh0LWNvbG9yKTtcbn1cblxuLmhlcm8tY29udGVudCBwIHtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbn1cblxuLmhlcm8tY29udGVudCBoMSB7XG4gIG1heC13aWR0aDogMzAwcHg7XG59XG5cbi5jYWxsLWFjdGlvbi13cmFwcGVyIHtcbiAgbWFyZ2luOiAyZW0gMDtcbn1cblxuLndoaXRlLXdhdmUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uaGVyby1ib3R0b20td2F2ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgaGVpZ2h0OiAyMHZoO1xuICBtYXJnaW4tdG9wOiAtNjBweDtcbiAgei1pbmRleDogMDtcbn1cblxuLndoaXRlLWJ0biB7XG4gIC0tbWRjLXRoZW1lLXByaW1hcnk6IHdoaXRlO1xuICBwYWRkaW5nOiAwcHggMjhweCAhaW1wb3J0YW50O1xufVxuXG4uc3VidGl0bGUge1xuICBwYWRkaW5nOiAxZW07XG59XG5cbi5ib3R0b20tYmFubmVyLWluZm8ge1xuICBiYWNrZ3JvdW5kOiAjYTI1ZDcwN2E7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmJvdHRvbS1iYW5uZXItaW5mbyA+ICoge1xuICBtYXJnaW46IDhweCAwO1xufVxuXG4uZmVhdHVyZS1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNiwgMWZyKTtcbiAgZ3JpZC1nYXA6IDI0cHg7XG59XG5cbi5mZWF0dXJlLWl0ZW0ge1xuICBncmlkLWNvbHVtbi1lbmQ6IHNwYW4gMjtcbn1cblxucmVtaS1wcm9kdWN0LWl0ZW0ge1xuICBoZWlnaHQ6IDUxM3B4O1xufVxuXG5pcm9uLWltYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xufVxuXG4uaGlnaGxpZ2h0LXByb2R1Y3QgLm1lZGlhIHtcbiAgbWF4LXdpZHRoOiA1MDBweDtcbiAgaGVpZ2h0OiAzNTBweDtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC1kZXZpY2Utd2lkdGg6IDc2OHB4KSB7XG4gIHJlbWktcHJvZHVjdC1pdGVtIHtcbiAgICBoZWlnaHQ6IDM2M3B4O1xuICB9XG5cbiAgLmZlYXR1cmUtZ3JpZCB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWJvdHRvbTogLTE3cHg7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XG4gICAgcGFkZGluZy1ib3R0b206IDE3cHg7XG4gICAgcGFkZGluZy1sZWZ0OiA0MHB4O1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoO1xuICAgIHNjcm9sbC1zbmFwLXR5cGU6IHggbWFuZGF0b3J5O1xuICB9XG4gIC5mZWF0dXJlLWdyaWQgPiAqIHtcbiAgICBzY3JvbGwtc25hcC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLmhpZ2hsaWdodC1wcm9kdWN0IHtcbiAgICBkaXNwbGF5OiBibG9jayAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICAuZmVhdHVyZS1pdGVtIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgd2lkdGg6IGNhbGMoNDclICsgMjRweCk7XG4gIH1cbn0iXX0= */"}}]);