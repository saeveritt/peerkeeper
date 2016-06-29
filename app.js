!function(){"use strict";var e="undefined"==typeof window?global:window;if("function"!=typeof e.require){var t={},n={},s={},r={}.hasOwnProperty,a=/^\.\.?(\/|$)/,i=function(e,t){for(var n,s=[],r=(a.test(t)?e+"/"+t:t).split("/"),i=0,o=r.length;o>i;i++)n=r[i],".."===n?s.pop():"."!==n&&""!==n&&s.push(n);return s.join("/")},o=function(e){return e.split("/").slice(0,-1).join("/")},c=function(t){return function(n){var s=i(o(t),n);return e.require(s,t)}},l=function(e,t){var s=null;s=g&&g.createHot(e);var r={id:e,exports:{},hot:s};return n[e]=r,t(r.exports,c(e),r),r.exports},u=function(e){return s[e]?u(s[e]):e},d=function(e,t){return u(i(o(e),t))},m=function(e,s){null==s&&(s="/");var a=u(e);if(r.call(n,a))return n[a].exports;if(r.call(t,a))return l(a,t[a]);throw new Error("Cannot find module '"+e+"' from '"+s+"'")};m.alias=function(e,t){s[t]=e};var p=/\.[^.\/]+$/,h=/\/index(\.[^\/]+)?$/,f=function(e){if(p.test(e)){var t=e.replace(p,"");r.call(s,t)&&s[t].replace(p,"")!==t+"/index"||(s[t]=e)}if(h.test(e)){var n=e.replace(h,"");r.call(s,n)||(s[n]=e)}};m.register=m.define=function(e,s){if("object"==typeof e)for(var a in e)r.call(e,a)&&m.register(a,e[a]);else t[e]=s,delete n[e],f(e)},m.list=function(){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e};var g=e._hmr&&new e._hmr(d,m,t,n);m._cache=n,m.hmr=g&&g.wrap,m.brunch=!0,e.require=m}}(),function(){var e;window;require.register("Plugins.ls",function(e,t,n){var s,r,a,i,o;s=t("./stores/MenuStore"),r=t("./components/main/Overview"),a=t("./components/main/Checking"),i=t("./components/main/Savings"),o=t("./components/main/PeerAssets"),n.exports={init:function(){return s.register("Overview",r),s.register("Checking",a),s.register("Savings",i),s.register("PeerAssets",o)}}}),require.register("actions/CheckingActions.ls",function(e,t,n){var s,r,a,i,o,c;s=t("../dispatcher/AppDispatcher"),r=t("../constants/CheckingConstants"),a=t("react"),i=t("../components/modals/FormModal"),o=t("../components/modals/SendModal"),c=t("../components/modals/ReceiveModal"),n.exports={closeModal:function(){return s.dispatch({actionType:r.CHECKING_STATE_NONE,addr:null})},send:function(e){return s.dispatch({actionType:r.CHECKING_STATE_SEND,addr:e})},receive:function(e){return s.dispatch({actionType:r.CHECKING_STATE_RECEIVE,addr:e})},toSavings:function(){return s.dispatch({actionType:r.CHECKING_STATE_TOSAVINGS,addr:null})},toChecking:function(){return s.dispatch({actionType:r.CHECKING_STATE_TOCHECKING,addr:null})},renderCheckingModal:function(e,t){switch(e){case r.CHECKING_STATE_SEND:return a.createElement(o,{fromAddress:t,hidden:!1,submitCallback:this.closeModal});case r.CHECKING_STATE_RECEIVE:return a.createElement(c,{toAddress:t,hidden:!1,submitCallback:this.closeModal});case r.CHECKING_STATE_TOSAVINGS:return a.createElement(i,{title:"Deposit to Savings",hidden:!1,submitCallback:this.closeModal});case r.CHECKING_STATE_TOCHECKING:return a.createElement(i,{title:"Withdraw to Checking",hidden:!1,submitCallback:this.closeModal});default:return null}}}}),require.register("actions/KeyActions.ls",function(e,t,n){var s,r;s=t("../dispatcher/AppDispatcher"),r=t("../constants/KeyConstants"),n.exports={setLockedKey:function(e){return s.dispatch({actionType:r.KEY_SET_LOCKED,lockedKey:e})},generateLockedKey:function(e){return s.dispatch({actionType:r.KEY_GENERATE,password:e})},unlock:function(e,t){return s.dispatch({actionType:r.KEY_UNLOCK,lockedKey:e,password:t})}}}),require.register("actions/MenuActions.ls",function(e,t,n){var s,r;s=t("../dispatcher/AppDispatcher"),r=t("../constants/MenuConstants"),n.exports={toggle:function(){return s.dispatch({actionType:r.MENU_TOGGLE})},select:function(e){return s.dispatch({actionType:r.MENU_SELECT,id:e})}}}),require.register("components/WalletApp.ls",function(e,t,n){var s,r,a,i,o,c;s=t("react"),r=s.DOM.div,a=t("../stores/KeyStore"),i=t("./splash/Splash"),o=t("./main/Main"),c=function(){return{lockedKey:a.getLockedKey(),locked:a.locked()}},n.exports=s.createClass({content:function(){return this.state.locked?s.createElement(i,{lockedKey:this.state.lockedKey}):s.createElement(o)},render:function(){return r({id:"wa-content",className:"container"},this.content())},getInitialState:c,_onChange:function(){return this.setState(c())},componentDidMount:function(){return a.addChangeListener(this._onChange)},componentWillUnmount:function(){return a.removeChangeListener(this._onChange)}})}),require.register("components/main/Checking.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h,f,g,N,C,b,v,y,k,E,T,S;s=t("../../stores/CheckingStore"),r=t("../../constants/CheckingConstants"),a=t("../../actions/CheckingActions"),i=t("../../stores/KeyStore"),o=t("prelude-ls").map,c=t("react"),l=c.DOM,u=l.a,d=l.i,m=l.div,p=l.h2,h=l.table,f=l.thead,g=l.tbody,N=l.th,C=l.tr,b=l.td,v=l.h4,y=function(){return{accounts:i.getCheckingAccounts(),totalBalance:i.getCheckingBalance(),viewState:s.getState(),selectedAddr:s.getSelectedAddr()}},n.exports=c.createClass({render:function(){return m(null,p({className:"ui blue header"},"Checking"),m({className:"ui two column stackable grid container"},m({className:"row"},m({className:"five wide column"},m({className:"ui large form"},m({className:"ui field fluid large basic blue submit button",onClick:k(null)},"Send"),m({className:"ui field fluid large basic blue submit button",onClick:E(null)},"Receive"),m({className:"ui field fluid large basic blue submit button",onClick:a.toSavings},"To Savings"))),m({className:"eleven wide column"},m({className:"ui container"},m({className:"ui fluid card"},m({className:"content"},m({className:"right floated"},this.state.totalBalance+" PPC"),m({className:"header"},"Total"))),o(function(e){return S(e)})(this.state.accounts))))),a.renderCheckingModal(this.state.viewState,this.state.selectedAddr))},getInitialState:y,_onChange:function(){return this.setState(y())},componentDidMount:function(){return s.addChangeListener(this._onChange)},componentWillUnmount:function(){return s.removeChangeListener(this._onChange)}}),k=function(e){return function(){return a.send(e)}},E=function(e){return function(){return a.receive(e)}},T=function(e){return 0===e.txns.length?m({className:"ui teal label"},"empty address"):u({className:"ui label"},e.txns.length+" transactions")},S=function(e){return m({className:"ui fluid card",key:e.address},m({className:"content"},m({className:"right floated"},e.balance+" PPC"),m({className:"header"},e.address.substr(0,15)+"..."),m({className:"description"},T(e))),m({className:"extra content"},m({className:"ui two buttons"},m({className:"ui basic green button",onClick:E(e.address)},"Receive"),m({className:"ui basic red button",onClick:k(e.address)},"Send"))))}}),require.register("components/main/Main.ls",function(e,t,n){function s(e,t){var n,s=function(r){return e.length>1?function(){var a=r?r.concat():[];return n=t?n||this:this,a.push.apply(a,arguments)<e.length&&arguments.length?s.call(n,a):e.apply(n,a)}:e};return s()}var r,a,i,o,c,l,u,d,m,p,h,f;r=t("react"),a=r.DOM,i=a.a,o=a.i,c=a.div,l=a.form,u=a.h4,d=t("prelude-ls"),m=t("../../stores/MenuStore"),p=t("../../actions/MenuActions"),h=function(){return{isCollapsed:m.isCollapsed(),menuItems:m.getAllItems(),selectedId:m.getSelectedId()}},n.exports=r.createClass({menuItems:function(){var e;return e=this.state.selectedId,d.map(function(t){return t.id===e?i({className:"active item",key:t.id,onClick:f(t.id)},t.name):i({className:"item",key:t.id,onClick:f(t.id)},t.name)})(this.state.menuItems)},createSelectedElement:function(){var e,t;return e=this.state.selectedId,t=d.head(d.map(function(e){return e.comp?r.createElement(e.comp):void 0})(d.filter(function(t){return t.id===e})(this.state.menuItems)))},render:function(){return c({className:""},c({className:"ui small menu fixed wa-computer"},c({className:"item"},u({className:"ui blue header"},"PeerKeeper")),this.menuItems(),c({className:"item aligned right"},"Minting: ACTIVE")),c({className:"ui stackable small menu fixed wa-mobile"},c({className:"item",onClick:p.toggle},u({className:"ui blue header"},c({className:"horizontal"},o({className:"sidebar icon"}),"PeerKeeper"))),this.state.isCollapsed?void 0:this.menuItems()),c({className:"ui secondary menu placeholder"}),c({className:"ui text container"},this.createSelectedElement()))},getInitialState:h,_onChange:function(){return this.setState(h())},componentDidMount:function(){return m.addChangeListener(this._onChange)},componentWillUnmount:function(){return m.removeChangeListener(this._onChange)}}),f=s(function(e,t){return p.select(e)})}),require.register("components/main/Overview.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h,f,g,N,C,b,v,y;s=t("../../stores/KeyStore"),r=t("../../stores/CheckingStore"),a=t("../../actions/CheckingActions"),i=t("prelude-ls"),o=i.map,c=i.sum,l=t("react"),i=l.DOM,u=i.a,d=i.i,m=i.div,p=i.h2,h=i.table,f=i.thead,g=i.tbody,N=i.th,C=i.tr,b=i.td,v=i.h4,y=function(){return{checkingBalance:s.getCheckingBalance(),savingsBalance:1e3,checkingState:r.getState()}},n.exports=l.createClass({render:function(){return m({className:"ui two column stackable grid container"},m({className:"row"},m({className:"nine wide column"},p({className:"ui blue header"},"Balances"),m({className:"ui container"},m({className:"ui fluid card"},m({className:"content"},m({className:"right floated"},this.state.checkingBalance+this.state.savingsBalance+" PPC"),m({className:"header"},"Total"))),m({className:"ui fluid card"},m({className:"content"},m({className:"right floated"},this.state.checkingBalance+" PPC"),m({className:"header"},"Checking"),m({className:"meta"},"Payment accounts"),m({className:"description"},u({className:"ui label"},this.getTotalTxnCount()+" transactions"))),m({className:"extra content"},m({className:"ui two buttons"},m({className:"ui basic green button",onClick:a.receive},"Receive"),m({className:"ui basic red button",onClick:a.send},"Send")))),m({className:"ui fluid card"},m({className:"content"},m({className:"right floated"},this.state.savingsBalance+" PPC"),m({className:"header"},"Savings"),m({className:"meta"},"Hardened minting accounts")),m({className:"extra content"},m({className:"ui two buttons"},m({className:"ui basic green button",onClick:a.toSavings},"Deposit"),m({className:"ui basic red button",onClick:a.toChecking},"Withdraw")))))),m({className:"seven wide column"},p({className:"ui blue header"},"Recent transactions"),m({className:"ui fluid vertical steps"},u({className:"step"},d({className:"green download icon"}),m({className:"content"},m({className:"title"},"100 PPC"),m({className:"description"},"01/01/2016 12:03"))),u({className:"step"},d({className:"red upload icon"}),m({className:"content"},m({className:"title"},"-350 PPC"),m({className:"description"},"10/10/2015 14:22")))))),a.renderCheckingModal(this.state.checkingState,null))},getInitialState:y,getTotalTxnCount:function(){return c(o(function(e){return e.txns.length})(s.getCheckingAccounts()))},_onChange:function(){return this.setState(y())},componentDidMount:function(){return r.addChangeListener(this._onChange)},componentWillUnmount:function(){return r.removeChangeListener(this._onChange)}})}),require.register("components/main/PeerAssets.ls",function(e,t,n){var s,r,a,i;s=t("react"),r=s.DOM,a=r.div,i=r.h2,n.exports=s.createClass({render:function(){return a(null,i({className:"ui blue header"},"PeerAssets"),a({className:"column"},a({className:"ui large form"},a({className:"ui field fluid large basic blue submit button"},"Trade Assets"),a({className:"ui field fluid large basic blue submit button"},"Create Asset"),a({className:"ui field fluid large basic blue submit button"},"Explore Assets"))))}})}),require.register("components/main/Savings.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h,f,g,N,C;s=t("react"),r=s.DOM,a=r.a,i=r.i,o=r.input,c=r.label,l=r.div,u=r.h2,d=r.table,m=r.thead,p=r.tbody,h=r.th,f=r.tr,g=r.td,N=r.h4,C=r.form,n.exports=s.createClass({render:function(){return l(null,u({className:"ui blue header"},"Savings"),l({className:"ui two column stackable grid container"},l({className:"row"},l({className:"five wide column"},l({className:"ui large form"},l({className:"ui field fluid large basic blue submit button"},"Pause minting"),l({className:"ui field fluid large basic blue submit button"},"Group outputs"),l({className:"ui field fluid large basic blue submit button"},"Export keys"))),l({className:"eleven wide column"},l({className:"ui container"},d({className:"ui celled table"},m(null,f(null,h(null,h(null,N({className:"ui header"},l({className:"content"},"Total"),l({className:"sub header"},"")))),h(null,"1000 PPC"))),p(null,f(null,g(null,l({className:"ui checkbox"},o({type:"checkbox","class":"hidden"}),c(null,""))),g(null,N({className:"ui header"},l({className:"content"},"a38rc1ab83..."),l({className:"sub header"},"Maturing"))),g(null,l({className:"ui red label"},"120 PPC"))),f(null,g(null,l({className:"ui checkbox"},o({type:"checkbox","class":"hidden"}),c(null,""))),g(null,N({className:"ui header"},l({className:"content"},"82c1a4f7f2..."),l({className:"sub header"},"85% Probability (10min)"))),g(null,l({className:"ui green label"},"650 PPC"))),f(null,g(null,l({className:"ui checkbox"},o({type:"checkbox","class":"hidden"}),c(null,""))),g(null,N({className:"ui header"},l({className:"content"},"cc65d2229..."),l({className:"sub header"},"Low stake"))),g(null,l({className:"ui yellow label"},"50 PPC"))))))))))}})}),require.register("components/modals/FormModal.ls",function(e,t,n){var s,r,a,i,o,c;s=t("react"),r=s.DOM,a=r.div,i=r.form,o=r.h2,c=r.h4,n.exports=s.createClass({propTypes:{id:s.PropTypes.string,title:s.PropTypes.string,submitText:s.PropTypes.string,submitCallback:s.PropTypes.func,hidden:s.PropTypes.bool},getDefaultProps:function(){return{id:"form-modal",submitText:"Close",submitCallback:function(){return!1},hidden:!1}},render:function(){return a({id:this.props.id,className:"ui basic modal"},a({className:"ui middle aligned center aligned grid"},a({className:"twelve wide column"},i({className:"ui form"},o(null,this.props.title),this.props.children,a({className:"field"}),a({className:"ui field fluid large blue button",onClick:this.submit},this.props.submitText)))))},submit:function(){return this.props.submitCallback(),this.hide()},show:function(){return $("#"+this.props.id).modal("show")},hide:function(){return $("#"+this.props.id).modal("hide")},componentDidMount:function(){return $("#"+this.props.id).modal({detachable:!1,onApprove:this.ok,onDeny:this.cancel}),$("#"+this.props.id).modal("setting","closable",!1),this.props.hidden?void 0:this.show()},componentWillUnmount:function(){return this.hide()}})}),require.register("components/modals/ReceiveModal.ls",function(e,t,n){var s,r,a,i,o,c,l,u;s=t("react"),r=s.DOM,a=r.div,i=r.h4,o=r.i,c=r.input,l=t("./FormModal"),u=t("../../stores/KeyStore"),n.exports=s.createClass({propTypes:{id:s.PropTypes.string,toAddress:s.PropTypes.string,submitCallback:s.PropTypes.func,hidden:s.PropTypes.bool},getDefaultProps:function(){return{id:"send-modal",submitCallback:function(){return!1},hidden:!1}},getToAddress:function(){return this.props.toAddress?this.props.toAddress:u.getCheckingAccounts()[0].address},render:function(){return s.createElement(l,{title:"Receive",id:this.props.id,hidden:this.props.hidden,submitCallback:this.props.submitCallback},a(null,i(null,"Provide the sender the following address:"),a({className:"field"},a({className:"ui left icon input"},o({className:"money icon"}),c({id:"addr",value:this.getToAddress().substr(0,15)+"...",readOnly:!0}))),a({className:"ui field middle aligned center aligned grid"},a({id:"qrcode"}))))}})}),require.register("components/modals/SendModal.ls",function(e,t,n){var s,r,a,i,o,c,l;s=t("react"),r=s.DOM,a=r.div,i=r.h4,o=r.i,c=r.input,l=t("./FormModal"),n.exports=s.createClass({propTypes:{id:s.PropTypes.string,fromAddress:s.PropTypes.string,submitCallback:s.PropTypes.func,hidden:s.PropTypes.bool},getDefaultProps:function(){return{id:"send-modal",submitCallback:function(){return!1},hidden:!1}},render:function(){return s.createElement(l,{title:this.props.fromAddress?"Send from: "+this.props.fromAddress.substr(0,10)+"...":"Send",submitText:"Send",id:this.props.id,hidden:this.props.hidden,submitCallback:this.props.submitCallback},a(null,i(null,"Fill in receiver address and amount:"),a({className:"field"},a({className:"ui left icon input"},o({className:"mail icon"}),c({id:"addr",placeholder:"Receiver address"}))),a({className:"field"},a({className:"ui left icon input"},o({className:"money icon"}),c({id:"addr",placeholder:"Amount"})))))}})}),require.register("components/splash/Splash.ls",function(e,t,n){var s,r,a,i,o,c;s=t("react"),r=s.DOM,a=r.div,i=r.form,o=t("./Welcome"),c=t("./Unlock"),n.exports=s.createClass({propTypes:{lockedKey:s.PropTypes.string},child:function(){return void 0===this.props.lockedKey?s.createElement(o):s.createElement(c,{initialKey:this.props.lockedKey})},render:function(){return a({id:"splash",className:"ui middle aligned center aligned grid"},this.child())}})}),require.register("components/splash/Unlock.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h;s=t("react"),r=s.DOM,a=r.div,i=r.form,o=r.h2,c=r.img,l=r.i,u=r.input,d=r.p,m=t("../../stores/KeyStore"),p=t("../../actions/KeyActions"),n.exports=s.createClass({propTypes:{initialKey:s.PropTypes.string},render:function(){var e;return e=m.getError(),a({className:"column"},i({className:"ui large form",onSubmit:h},a({className:"ui segment"},o({className:"ui blue image header"},a(null,"Unlock PeerKeeper")),a({className:"field"},a({className:"ui left icon input"},l({className:"privacy icon"}),u({id:"key",type:"text",name:"key",placeholder:"Locked root key",defaultValue:this.props.initialKey}))),a({className:"field"},a({className:"ui left icon input"},l({className:"lock icon"}),u({id:"password",type:"password",name:"password",placeholder:"Password",autoFocus:!0}))),u({type:"submit",className:"ui field fluid large blue button",value:"Unlock"})),e?a({className:"ui visible error message"},d(null,e)):void 0))}}),h=function(e){return e&&e.preventDefault(),p.unlock(document.getElementById("key").value,document.getElementById("password").value)}}),require.register("components/splash/Welcome.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h;s=t("react"),r=s.DOM,a=r.div,i=r.h2,o=r.h4,c=r.form,l=r.i,u=r.input,d=t("../../actions/KeyActions"),n.exports=s.createClass({render:function(){return a({className:"column"},c({className:"ui large form"},a({className:"ui segment"},i({className:"ui blue image header"},a({className:"content"},"PeerKeeper")),a({className:"ui field fluid large basic blue button",onClick:m},"I have a key"),a({className:"ui field fluid large primary button",onClick:p},"Generate me a key")),a({className:"ui error message"})),a({className:"ui basic modal"},a({className:"content"},a({className:"ui middle aligned center aligned grid"},a({className:"column"},c({className:"ui large form",onSubmit:h},o(null,"Choose a password to lock your new key."),a({className:"field"},a({className:"ui left icon input"},l({className:"lock icon"}),u({id:"new-password",type:"password",name:"password",placeholder:"Password"}))),a({className:"ui field fluid large blue button",onClick:h},"Generate")))))))},componentDidMount:function(){return $(".ui.modal").modal({detachable:!1,onApprove:this.ok,onDeny:this.cancel})},componentWillUnmount:function(){return $(".ui.modal").modal("hide")}}),m=function(){return d.setLockedKey("")},p=function(){return $(".ui.modal").modal("show")},h=function(e){return e&&e.preventDefault(),d.generateLockedKey(document.getElementById("new-password").value)}}),require.register("constants/CheckingConstants.ls",function(e,t,n){var s;s=t("keymirror"),n.exports=s({CHECKING_STATE_NONE:null,CHECKING_STATE_RECEIVE:null,CHECKING_STATE_SEND:null,CHECKING_STATE_TOSAVINGS:null,CHECKING_STATE_TOCHECKING:null})}),require.register("constants/KeyConstants.ls",function(e,t,n){var s;s=t("keymirror"),n.exports=s({KEY_SET_LOCKED:null,KEY_GENERATE:null,KEY_UNLOCK:null})}),require.register("constants/MenuConstants.ls",function(e,t,n){var s;s=t("keymirror"),n.exports=s({MENU_TOGGLE:null,MENU_SELECT:null})}),require.register("dispatcher/AppDispatcher.ls",function(e,t,n){var s,r;s=t("flux").Dispatcher,r=new s,n.exports=r}),require.register("initialize.js",function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}var r=t("react-dom"),a=s(r),i=t("react"),o=s(i),c=t("components/WalletApp"),l=s(c),u=t("./Plugins"),d=s(u);d["default"].init(),document.addEventListener("DOMContentLoaded",function(){a["default"].render(o["default"].createElement(l["default"],null),document.querySelector("#app"))})}),require.register("stores/CheckingStore.ls",function(e,t,n){var s,r,a,i,o,c,l,u;s=t("../dispatcher/AppDispatcher"),r=t("events").EventEmitter,a=t("../constants/CheckingConstants"),i=t("object-assign"),o="change",c=a.CHECKING_STATE_NONE,l=null,u=i({},r.prototype,{getState:function(){return c},getSelectedAddr:function(){return l},emitChange:function(){return this.emit(o)},addChangeListener:function(e){return this.on(o,e)},removeChangeListener:function(e){return this.removeListener(o,e)}}),s.register(function(e){switch(e.actionType){case a.CHECKING_STATE_NONE:case a.CHECKING_STATE_SEND:case a.CHECKING_STATE_RECEIVE:case a.CHECKING_STATE_TOSAVINGS:case a.CHECKING_STATE_TOCHECKING:return c=e.actionType,l=e.addr,u.emitChange()}}),n.exports=u}),require.register("stores/KeyStore.ls",function(e,t,n){function s(e,t){var n,s=function(r){return e.length>1?function(){var a=r?r.concat():[];return n=t?n||this:this,a.push.apply(a,arguments)<e.length&&arguments.length?s.call(n,a):e.apply(n,a)}:e};return s()}var r,a,i,o,c,l,u,d,m,p,h,f,g,N,C,b,v,y,k,E,T;r=t("../dispatcher/AppDispatcher"),a=t("events").EventEmitter,i=t("../constants/KeyConstants"),o=t("object-assign"),c=t("../utils/url-params"),l=t("../utils/keygen"),u=t("prelude-ls"),d=u.map,m=u.fold,p=u.filter,h=u.reverse,f=4,g="change",N=m(s(function(e,t){return e+t}),0),C=!0,b=c.key,v=null,y=!1,k=[],E=[],T=o({},a.prototype,{locked:function(){return C},getLockedKey:function(){return b},getError:function(){return y},getCheckingAccounts:function(){return h(p(function(e){return 0!==e.balance||0===e.txns.length})(k))},getCheckingBalance:function(){return N(d(function(e){return e.balance})(this.getCheckingAccounts()))},updateCheckingAccounts:function(){return k=d(function(e){return{keyIdx:e,address:v.derive(e).publicKey.toAddress().toString(),balance:10*e,txns:function(){var e,t,n=[];for(e=0,t=Math.round(10*Math.random());t>=e;++e)n.push(e);return n}()}})([0,1,2,3,4,5,6]),k[6].balance=0,k[6].txns=[]},emitChange:function(){return this.emit(g)},addChangeListener:function(e){return this.on(g,e)},removeChangeListener:function(e){return this.removeListener(g,e)}}),r.register(function(e){var t;switch(y=!1,e.actionType){case i.KEY_SET_LOCKED:return b=e.lockedKey,T.emitChange();case i.KEY_GENERATE:return t=l.generateRandomSeed(),l.generateLockedKey(t,e.password,f,function(e){return b=e,T.emitChange()});case i.KEY_UNLOCK:return b=e.lockedKey,l.unlockKey(b,e.password,function(e){return e?l.generateHdroot(e,function(e){return v=e.hdPublicKey.derive(0),T.updateCheckingAccounts(),C=!1,T.emitChange()}):(y="Incorrect password",T.emitChange())})}}),n.exports=T}),require.register("stores/MenuStore.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m;s=t("../dispatcher/AppDispatcher"),r=t("events").EventEmitter,a=t("../constants/MenuConstants"),i=t("object-assign"),o="change",c=[],l=!0,u=0,d=0,m=i({},r.prototype,{register:function(e,t){var n;return n=u,u+=1,c.push({id:n,name:e,comp:t})},isCollapsed:function(){return l},getAllItems:function(){return c},getSelectedId:function(){return d},emitChange:function(){return this.emit(o)},addChangeListener:function(e){return this.on(o,e)},removeChangeListener:function(e){return this.removeListener(o,e)}}),s.register(function(e){switch(e.actionType){case a.MENU_TOGGLE:return l=!l,m.emitChange();case a.MENU_SELECT:return d=e.id,l=!0,m.emitChange()}}),n.exports=m}),require.register("utils/keygen.ls",function(e,t,n){var s,r,a,i,o,c,l,u,d,m,p,h,f,g,N,C;s=t("scrypt-async"),r=t("bitcore-lib"),a=t("prelude-ls").sum,i=128,o=32,c=function(e,t,n,r){return s(e,t,n,8,o,1e3,r)},l=function(e,t){return e.subarray(t+1,e.length-1)},u=function(e){return e[0]=0,e},d=function(e,t){return e[0]=e[0]|i,e[1]=t,e},m=function(e){return e[1]},p=function(e){return 0!==(e[0]&i)},h=function(e,t){return e[0]=e[0]|t,e},f=function(e){var t;return t=255^i,e[0]&t},g=function(e){var t,n,s,r,a;for(t="",n=0,s=e.length-1;s>=n;++n)r=n,a=(255&e[r]).toString(16),1===a.length&&(a="0"+a),t+=a;return t},N=function(e){var t,n,s,r;for(e||new Uint8Array,t=[],n=0,s=e.length-1;s>=n;n+=2)r=n,t.push(parseInt(e.substr(r,2),16));return new Uint8Array(t)},n.exports=C={generateRandomSeed:function(){return r.crypto.Random.getRandomBuffer(o)},generateLockedKey:function(e,t,n,s){return c(t,l(e,t.length),n,function(t){return s(g(h(d(u(e),t[0]),n)))})},unlockKey:function(e,t,n){var s,a;return s=r.util.buffer.hexToBuffer(e),a=f(s),p(s)?c(t,l(s,t.length),a,function(e){var r;return r=m(s),e[0]===r?c(t,s,a,n):n(!1)}):c(t,s,a,n)},generateHdroot:function(e,t){return t(r.HDPrivateKey.fromSeed(new Buffer(e)))}},r.Networks.add({name:"peercoin",alias:"ppcoin",pubkeyhash:55,privatekey:183,scripthash:117,xpubkey:76067358,xprivkey:76066276}),r.Networks.add({name:"peercoin-testnet",alias:"ppcoin-test",pubkeyhash:111,privatekey:239,scripthash:196,xpubkey:70617039,xprivkey:70615956}),r.Networks.defaultNetwork=r.Networks.get("peercoin")}),require.register("utils/url-params.js",function(e,t,n){"use strict";var s;(window.onpopstate=function(){var e,t=/\+/g,n=/([^&=]+)=?([^&]*)/g,r=function(e){return decodeURIComponent(e.replace(t," "))},a=window.location.search.substring(1);for(s={};e=n.exec(a);)s[r(e[1])]=r(e[2])})(),n.exports=s}),require.alias("events/events.js","events"),require.alias("buffer/index.js","buffer"),require.alias("crypto-browserify/index.js","crypto"),require.alias("process/browser.js","process"),require.alias("assert/assert.js","assert"),require.alias("url/url.js","url"),require.alias("punycode/punycode.js","punycode"),require.alias("querystring-es3/index.js","querystring"),require.alias("util/util.js","sys"),require.alias("stream-browserify/index.js","stream"),require.alias("string_decoder/index.js","string_decoder"),require.alias("vm-browserify/index.js","vm"),e=require("process"),require.register("___globals___",function(e,t,n){})}(),require("___globals___");