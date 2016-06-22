(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("Plugins.ls", function(exports, require, module) {
var MenuStore, Overview, Checking, Savings, PeerAssets;
MenuStore = require('./stores/MenuStore');
Overview = require('./components/main/Overview');
Checking = require('./components/main/Checking');
Savings = require('./components/main/Savings');
PeerAssets = require('./components/main/PeerAssets');
module.exports = {
  init: function(){
    MenuStore.register('Overview', Overview);
    MenuStore.register('Checking', Checking);
    MenuStore.register('Savings', Savings);
    return MenuStore.register('PeerAssets', PeerAssets);
  }
};
});

;require.register("actions/KeyActions.ls", function(exports, require, module) {
var AppDispatcher, KeyConstants;
AppDispatcher = require('../dispatcher/AppDispatcher');
KeyConstants = require('../constants/KeyConstants');
module.exports = {
  setLockedKey: function(lockedKey){
    return AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_SET_LOCKED,
      lockedKey: lockedKey
    });
  },
  generateLockedKey: function(password){
    return AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_GENERATE,
      password: password
    });
  },
  unlock: function(lockedKey, password){
    return AppDispatcher.dispatch({
      actionType: KeyConstants.KEY_UNLOCK,
      lockedKey: lockedKey,
      password: password
    });
  }
};
});

;require.register("actions/MenuActions.ls", function(exports, require, module) {
var AppDispatcher, MenuConstants;
AppDispatcher = require('../dispatcher/AppDispatcher');
MenuConstants = require('../constants/MenuConstants');
module.exports = {
  toggle: function(){
    return AppDispatcher.dispatch({
      actionType: MenuConstants.MENU_TOGGLE
    });
  },
  select: function(id){
    return AppDispatcher.dispatch({
      actionType: MenuConstants.MENU_SELECT,
      id: id
    });
  }
};
});

;require.register("components/WalletApp.ls", function(exports, require, module) {
var React, div, KeyStore, Splash, Main, getWalletState;
React = require('react');
div = React.DOM.div;
KeyStore = require('../stores/KeyStore');
Splash = require('./splash/Splash');
Main = require('./main/Main');
getWalletState = function(){
  return {
    lockedKey: KeyStore.getLockedKey(),
    locked: KeyStore.locked()
  };
};
module.exports = React.createClass({
  content: function(){
    if (this.state.locked) {
      return React.createElement(Splash, {
        lockedKey: this.state.lockedKey
      });
    } else {
      return React.createElement(Main);
    }
  },
  render: function(){
    return div({
      id: 'wa-content',
      className: 'container'
    }, this.content());
  },
  getInitialState: getWalletState,
  _onChange: function(){
    return this.setState(getWalletState());
  },
  componentDidMount: function(){
    return KeyStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    return KeyStore.removeChangeListener(this._onChange);
  }
});
});

;require.register("components/main/Checking.ls", function(exports, require, module) {
var KeyStore, FormModal, map, React, ref$, a, i, input, div, h2, table, thead, tbody, th, tr, td, h4, form, getState, accountRow;
KeyStore = require('../../stores/KeyStore');
FormModal = require('./FormModal');
map = require('prelude-ls').map;
React = require('react');
ref$ = React.DOM, a = ref$.a, i = ref$.i, input = ref$.input, div = ref$.div, h2 = ref$.h2, table = ref$.table, thead = ref$.thead, tbody = ref$.tbody, th = ref$.th, tr = ref$.tr, td = ref$.td, h4 = ref$.h4, form = ref$.form;
getState = function(){
  return {
    accounts: KeyStore.getCheckingAccounts(),
    totalBalance: KeyStore.getCheckingBalance()
  };
};
module.exports = React.createClass({
  getInitialState: getState,
  render: function(){
    return div(null, h2({
      className: 'ui blue header'
    }, 'Checking'), div({
      className: 'ui two column stackable grid container'
    }, div({
      className: 'column'
    }, div({
      className: 'ui large form'
    }, div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Send'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Receive'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'To Savings'))), div({
      className: 'column'
    }, div({
      className: 'ui container'
    }, table({
      className: 'ui celled table'
    }, thead(null, tr(null, th(null), th(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'Total'), div({
      className: 'sub header'
    }, ''))), th(null, this.state.totalBalance + ' PPC'))), tbody(null, map(function(i){
      return accountRow(i);
    })(
    this.state.accounts)))))), React.createElement(FormModal, {
      title: 'Receive'
    }, div(null, h4(null, 'Provide the sender the following address:'), div({
      className: 'field'
    }, div({
      className: 'ui left icon input'
    }, i({
      className: 'money icon'
    }), input({
      id: 'addr',
      value: 'address',
      readOnly: true
    }))), div({
      className: 'ui field middle aligned center aligned grid'
    }, div({
      id: 'qrcode'
    })))));
  },
  componentDidMount: function(){
    return $('.checking-popup').popup({
      on: 'click',
      position: 'bottom left'
    });
  }
});
accountRow = function(acc){
  return tr({
    key: acc.address
  }, td(null, div({
    className: 'ui basic icon button checking-popup'
  }, i({
    className: 'exchange icon'
  })), div({
    className: 'ui flowing popup transition'
  }, div({
    className: 'ui four column divided center aligned grid'
  }, div({
    className: 'column'
  }, 1), div({
    className: 'column'
  }, 2), div({
    className: 'column'
  }, 3), div({
    className: 'column'
  }, 4)))), td(null, h4({
    className: 'ui header'
  }, div({
    className: 'sub header'
  }, acc.address.substr(0, 15) + '...'))), td(null, acc.balance + ' PPC'));
};
});

;require.register("components/main/FormModal.ls", function(exports, require, module) {
var React, ref$, div, form, h2, h4;
React = require('react');
ref$ = React.DOM, div = ref$.div, form = ref$.form, h2 = ref$.h2, h4 = ref$.h4;
module.exports = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    submitText: React.PropTypes.string,
    submitCallback: React.PropTypes.func,
    hidden: React.PropTypes.bool
  },
  getDefaultProps: function(){
    return {
      id: 'modal',
      submitText: 'Close',
      submitCallback: function(){
        return false;
      },
      hidden: false
    };
  },
  render: function(){
    return div({
      id: this.props.id,
      className: 'ui basic modal'
    }, div({
      className: 'ui middle aligned center aligned grid'
    }, div({
      className: 'twelve wide column'
    }, form({
      className: 'ui form'
    }, h2(null, this.props.title), this.props.children, div({
      className: 'ui field fluid large blue button',
      onClick: this.submit
    }, this.props.submitText)))));
  },
  submit: function(){
    this.props.submitCallback();
    return this.hide();
  },
  show: function(){
    return $('#' + this.props.id).modal('show');
  },
  hide: function(){
    return $('#' + this.props.id).modal('hide');
  },
  componentDidMount: function(){
    $('#' + this.props.id).modal({
      detachable: false,
      onApprove: this.ok,
      onDeny: this.cancel
    });
    $('#' + this.props.id).modal('setting', 'closable', false);
    if (!this.props.hidden) {
      return this.show();
    }
  },
  componentWillUnmount: function(){
    return this.hide();
  }
});
});

;require.register("components/main/Main.ls", function(exports, require, module) {
var React, ref$, a, i, div, form, h4, p, MenuStore, MenuActions, getMenuState, handleClick;
React = require('react');
ref$ = React.DOM, a = ref$.a, i = ref$.i, div = ref$.div, form = ref$.form, h4 = ref$.h4;
p = require('prelude-ls');
MenuStore = require('../../stores/MenuStore');
MenuActions = require('../../actions/MenuActions');
getMenuState = function(){
  return {
    isCollapsed: MenuStore.isCollapsed(),
    menuItems: MenuStore.getAllItems(),
    selectedId: MenuStore.getSelectedId()
  };
};
module.exports = React.createClass({
  menuItems: function(){
    var selectedId;
    selectedId = this.state.selectedId;
    return p.map(function(item){
      if (item.id === selectedId) {
        return a({
          className: 'active item',
          key: item.id,
          onClick: handleClick(item.id)
        }, item.name);
      } else {
        return a({
          className: 'item',
          key: item.id,
          onClick: handleClick(item.id)
        }, item.name);
      }
    })(
    this.state.menuItems);
  },
  createSelectedElement: function(){
    var selectedId, comp;
    selectedId = this.state.selectedId;
    return comp = p.head(
    p.map(function(i){
      if (i.comp) {
        return React.createElement(i.comp);
      }
    })(
    p.filter(function(i){
      return i.id === selectedId;
    })(
    this.state.menuItems)));
  },
  render: function(){
    return div({
      className: ''
    }, div({
      className: 'ui small menu fixed wa-computer'
    }, div({
      className: 'item'
    }, h4({
      className: 'ui blue header'
    }, 'PeerKeeper')), this.menuItems(), div({
      className: 'item aligned right'
    }, 'Minting: ACTIVE')), div({
      className: 'ui stackable small menu fixed wa-mobile'
    }, div({
      className: 'item',
      onClick: MenuActions.toggle
    }, h4({
      className: 'ui blue header'
    }, div({
      className: 'horizontal'
    }, i({
      className: 'sidebar icon'
    }), 'PeerKeeper'))), !this.state.isCollapsed ? this.menuItems() : void 8), div({
      className: 'ui secondary menu placeholder'
    }), div({
      className: 'ui text container'
    }, this.createSelectedElement()));
  },
  getInitialState: getMenuState,
  _onChange: function(){
    return this.setState(getMenuState());
  },
  componentDidMount: function(){
    return MenuStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    return MenuStore.removeChangeListener(this._onChange);
  }
});
handleClick = curry$(function(id, args){
  return MenuActions.select(id);
});
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
});

;require.register("components/main/Overview.ls", function(exports, require, module) {
var KeyStore, React, ref$, a, i, div, h2, table, thead, tbody, th, tr, td, h4, getState;
KeyStore = require('../../stores/KeyStore');
React = require('react');
ref$ = React.DOM, a = ref$.a, i = ref$.i, div = ref$.div, h2 = ref$.h2, table = ref$.table, thead = ref$.thead, tbody = ref$.tbody, th = ref$.th, tr = ref$.tr, td = ref$.td, h4 = ref$.h4;
getState = function(){
  return {
    checkingBalance: KeyStore.getCheckingBalance(),
    savingsBalance: 1000
  };
};
module.exports = React.createClass({
  propTypes: {
    initialKey: React.PropTypes.string
  },
  getInitialState: getState,
  render: function(){
    return div({
      className: 'ui two column stackable grid container'
    }, div({
      className: 'column'
    }, h2({
      className: 'ui blue header'
    }, 'Balances'), div({
      className: 'ui container'
    }, table({
      className: 'ui celled table'
    }, thead(null, tr(null, th(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'Total'), div({
      className: 'sub header'
    }, ''))), th(null, this.state.checkingBalance + this.state.savingsBalance + ' PPC'))), tbody(null, tr(null, td(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'Checking'), div({
      className: 'sub header'
    }, 'Payment accounts'))), td(null, this.state.checkingBalance + ' PPC')), tr(null, td(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'Savings'), div({
      className: 'sub header'
    }, 'Hardened minting accounts'))), td(null, this.state.savingsBalance + ' PPC')))))), div({
      className: 'column'
    }, h2({
      className: 'ui blue header'
    }, 'Recent transactions'), div({
      className: 'ui fluid vertical steps'
    }, a({
      className: 'step'
    }, i({
      className: 'green download icon'
    }), div({
      className: 'content'
    }, div({
      className: 'title'
    }, '100 PPC'), div({
      className: 'description'
    }, '01/01/2016 12:03'))), a({
      className: 'step'
    }, i({
      className: 'red upload icon'
    }), div({
      className: 'content'
    }, div({
      className: 'title'
    }, '-350 PPC'), div({
      className: 'description'
    }, '10/10/2015 14:22'))))));
  }
});
});

;require.register("components/main/PeerAssets.ls", function(exports, require, module) {
var React, ref$, div, h2;
React = require('react');
ref$ = React.DOM, div = ref$.div, h2 = ref$.h2;
module.exports = React.createClass({
  render: function(){
    return div(null, h2({
      className: 'ui blue header'
    }, 'PeerAssets'), div({
      className: 'column'
    }, div({
      className: 'ui large form'
    }, div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Trade Assets'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Create Asset'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Explore Assets'))));
  }
});
});

;require.register("components/main/Savings.ls", function(exports, require, module) {
var React, ref$, a, i, div, h2, table, thead, tbody, th, tr, td, h4, form;
React = require('react');
ref$ = React.DOM, a = ref$.a, i = ref$.i, div = ref$.div, h2 = ref$.h2, table = ref$.table, thead = ref$.thead, tbody = ref$.tbody, th = ref$.th, tr = ref$.tr, td = ref$.td, h4 = ref$.h4, form = ref$.form;
module.exports = React.createClass({
  render: function(){
    return div(null, h2({
      className: 'ui blue header'
    }, 'Savings'), div({
      className: 'ui two column stackable grid container'
    }, div({
      className: 'column'
    }, div({
      className: 'ui large form'
    }, div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Pause minting'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Group outputs'), div({
      className: 'ui field fluid large basic blue submit button'
    }, 'Export keys'))), div({
      className: 'column'
    }, div({
      className: 'ui container'
    }, table({
      className: 'ui celled table'
    }, thead(null, tr(null, th(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'Total'), div({
      className: 'sub header'
    }, ''))), th(null, '1000 PPC'))), tbody(null, tr(null, td(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'a38rc1ab83...'), div({
      className: 'sub header'
    }, 'Maturing'))), td(null, div({
      className: 'ui red label'
    }, '120 PPC'))), tr(null, td(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, '82c1a4f7f2...'), div({
      className: 'sub header'
    }, '85% Probability (10min)'))), td(null, div({
      className: 'ui green label'
    }, '650 PPC'))), tr(null, td(null, h4({
      className: 'ui header'
    }, div({
      className: 'content'
    }, 'cc65d2229...'), div({
      className: 'sub header'
    }, 'Low stake'))), td(null, div({
      className: 'ui yellow label'
    }, '50 PPC')))))))));
  }
});
});

;require.register("components/splash/Splash.ls", function(exports, require, module) {
var React, ref$, div, form, Welcome, Unlock;
React = require('react');
ref$ = React.DOM, div = ref$.div, form = ref$.form;
Welcome = require('./Welcome');
Unlock = require('./Unlock');
module.exports = React.createClass({
  propTypes: {
    lockedKey: React.PropTypes.string
  },
  child: function(){
    if (this.props.lockedKey === undefined) {
      return React.createElement(Welcome);
    } else {
      return React.createElement(Unlock, {
        initialKey: this.props.lockedKey
      });
    }
  },
  render: function(){
    return div({
      id: 'splash',
      className: 'ui middle aligned center aligned grid'
    }, this.child());
  }
});
});

;require.register("components/splash/Unlock.ls", function(exports, require, module) {
var React, ref$, div, form, h2, img, i, input, p, KeyStore, KeyActions, unlock;
React = require('react');
ref$ = React.DOM, div = ref$.div, form = ref$.form, h2 = ref$.h2, img = ref$.img, i = ref$.i, input = ref$.input, p = ref$.p;
KeyStore = require('../../stores/KeyStore');
KeyActions = require('../../actions/KeyActions');
module.exports = React.createClass({
  propTypes: {
    initialKey: React.PropTypes.string
  },
  render: function(){
    var error;
    error = KeyStore.getError();
    return div({
      className: 'column'
    }, form({
      className: 'ui large form',
      onSubmit: unlock
    }, div({
      className: 'ui segment'
    }, h2({
      className: 'ui blue image header'
    }, div(null, 'Unlock PeerKeeper')), div({
      className: 'field'
    }, div({
      className: 'ui left icon input'
    }, i({
      className: 'privacy icon'
    }), input({
      id: 'key',
      type: 'text',
      name: 'key',
      placeholder: 'Locked root key',
      defaultValue: this.props.initialKey
    }))), div({
      className: 'field'
    }, div({
      className: 'ui left icon input'
    }, i({
      className: 'lock icon'
    }), input({
      id: 'password',
      type: 'password',
      name: 'password',
      placeholder: 'Password',
      autoFocus: true
    }))), input({
      type: 'submit',
      className: 'ui field fluid large blue button',
      value: 'Unlock'
    })), error ? div({
      className: 'ui visible error message'
    }, p(null, error)) : void 8));
  }
});
unlock = function(e){
  if (e) {
    e.preventDefault();
  }
  return KeyActions.unlock(document.getElementById('key').value, document.getElementById('password').value);
};
});

;require.register("components/splash/Welcome.ls", function(exports, require, module) {
var React, ref$, div, h2, h4, form, i, input, KeyActions, iHaveKey, generateKey, generateLockedKey;
React = require('react');
ref$ = React.DOM, div = ref$.div, h2 = ref$.h2, h4 = ref$.h4, form = ref$.form, i = ref$.i, input = ref$.input;
KeyActions = require('../../actions/KeyActions');
module.exports = React.createClass({
  render: function(){
    return div({
      className: 'column'
    }, form({
      className: 'ui large form'
    }, div({
      className: 'ui segment'
    }, h2({
      className: 'ui blue image header'
    }, div({
      className: 'content'
    }, 'PeerKeeper')), div({
      className: 'ui field fluid large basic blue button',
      onClick: iHaveKey
    }, 'I have a key'), div({
      className: 'ui field fluid large primary button',
      onClick: generateKey
    }, 'Generate me a key')), div({
      className: 'ui error message'
    })), div({
      className: 'ui basic modal'
    }, div({
      className: 'content'
    }, div({
      className: 'ui middle aligned center aligned grid'
    }, div({
      className: 'column'
    }, form({
      className: 'ui large form',
      onSubmit: generateLockedKey
    }, h4(null, 'Choose a password to lock your new key.'), div({
      className: 'field'
    }, div({
      className: 'ui left icon input'
    }, i({
      className: 'lock icon'
    }), input({
      id: 'new-password',
      type: 'password',
      name: 'password',
      placeholder: 'Password'
    }))), div({
      className: 'ui field fluid large blue button',
      onClick: generateLockedKey
    }, 'Generate')))))));
  },
  componentDidMount: function(){
    return $('.ui.modal').modal({
      detachable: false,
      onApprove: this.ok,
      onDeny: this.cancel
    });
  },
  componentWillUnmount: function(){
    return $('.ui.modal').modal('hide');
  }
});
iHaveKey = function(){
  return KeyActions.setLockedKey('');
};
generateKey = function(){
  return $('.ui.modal').modal('show');
};
generateLockedKey = function(e){
  if (e) {
    e.preventDefault();
  }
  return KeyActions.generateLockedKey(
  document.getElementById('new-password').value);
};
});

;require.register("constants/KeyConstants.ls", function(exports, require, module) {
var keyMirror;
keyMirror = require('keymirror');
module.exports = keyMirror({
  KEY_SET_LOCKED: null,
  KEY_GENERATE: null,
  KEY_UNLOCK: null
});
});

;require.register("constants/MenuConstants.ls", function(exports, require, module) {
var keyMirror;
keyMirror = require('keymirror');
module.exports = keyMirror({
  MENU_TOGGLE: null,
  MENU_SELECT: null
});
});

;require.register("dispatcher/AppDispatcher.ls", function(exports, require, module) {
var Dispatcher, _dispatcher;
Dispatcher = require('flux').Dispatcher;
_dispatcher = new Dispatcher();
module.exports = _dispatcher;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WalletApp = require('components/WalletApp');

var _WalletApp2 = _interopRequireDefault(_WalletApp);

var _Plugins = require('./Plugins');

var _Plugins2 = _interopRequireDefault(_Plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Plugins2.default.init();

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_WalletApp2.default, null), document.querySelector('#app'));
});
});

require.register("stores/KeyStore.ls", function(exports, require, module) {
var AppDispatcher, EventEmitter, KeyConstants, assign, urlParams, keygen, ref$, map, fold, filter, DEFAULT_LOGN, CHANGE_EVENT, sum, _locked, _lockedKey, _checkingRoot, _error, _checkingAccounts, _savingsUtxos, KeyStore;
AppDispatcher = require('../dispatcher/AppDispatcher');
EventEmitter = require('events').EventEmitter;
KeyConstants = require('../constants/KeyConstants');
assign = require('object-assign');
urlParams = require('../utils/url-params');
keygen = require('../utils/keygen');
ref$ = require('prelude-ls'), map = ref$.map, fold = ref$.fold, filter = ref$.filter;
DEFAULT_LOGN = 4;
CHANGE_EVENT = 'change';
sum = fold(curry$(function(x$, y$){
  return x$ + y$;
}), 0);
_locked = true;
_lockedKey = urlParams['key'];
_checkingRoot = null;
_error = false;
_checkingAccounts = [];
_savingsUtxos = [];
KeyStore = assign({}, EventEmitter.prototype, {
  locked: function(){
    return _locked;
  },
  getLockedKey: function(){
    return _lockedKey;
  },
  getError: function(){
    return _error;
  },
  getCheckingAccounts: function(){
    return filter(function(i){
      return i.balance !== 0;
    })(
    _checkingAccounts);
  },
  getCheckingBalance: function(){
    return sum(
    map(function(i){
      return i.balance;
    })(
    this.getCheckingAccounts()));
  },
  updateCheckingAccounts: function(){
    return _checkingAccounts = map(function(i){
      return {
        address: _checkingRoot.derive(i).publicKey.toAddress().toString(),
        balance: i * 10
      };
    })(
    [0, 1, 2, 3, 4, 5, 6]);
  },
  emitChange: function(){
    return this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    return this.removeListener(CHANGE_EVENT, callback);
  }
});
AppDispatcher.register(function(action){
  var randomSeed;
  _error = false;
  switch (action.actionType) {
  case KeyConstants.KEY_SET_LOCKED:
    _lockedKey = action.lockedKey;
    return KeyStore.emitChange();
  case KeyConstants.KEY_GENERATE:
    randomSeed = keygen.generateRandomSeed();
    return keygen.generateLockedKey(randomSeed, action.password, DEFAULT_LOGN, function(lockedKey){
      _lockedKey = lockedKey;
      return KeyStore.emitChange();
    });
  case KeyConstants.KEY_UNLOCK:
    _lockedKey = action.lockedKey;
    return keygen.unlockKey(_lockedKey, action.password, function(unlockedKey){
      if (unlockedKey) {
        return keygen.generateHdroot(unlockedKey, function(hdroot){
          _checkingRoot = hdroot.hdPublicKey.derive(0);
          KeyStore.updateCheckingAccounts();
          _locked = false;
          return KeyStore.emitChange();
        });
      } else {
        _error = 'Incorrect password';
        return KeyStore.emitChange();
      }
    });
  }
});
module.exports = KeyStore;
function curry$(f, bound){
  var context,
  _curry = function(args) {
    return f.length > 1 ? function(){
      var params = args ? args.concat() : [];
      context = bound ? context || this : this;
      return params.push.apply(params, arguments) <
          f.length && arguments.length ?
        _curry.call(context, params) : f.apply(context, params);
    } : f;
  };
  return _curry();
}
});

require.register("stores/MenuStore.ls", function(exports, require, module) {
var AppDispatcher, EventEmitter, MenuConstants, assign, CHANGE_EVENT, _components, _isCollapsed, _id, _selectedId, MenuStore;
AppDispatcher = require('../dispatcher/AppDispatcher');
EventEmitter = require('events').EventEmitter;
MenuConstants = require('../constants/MenuConstants');
assign = require('object-assign');
CHANGE_EVENT = 'change';
_components = [];
_isCollapsed = true;
_id = 0;
_selectedId = 0;
MenuStore = assign({}, EventEmitter.prototype, {
  register: function(name, comp){
    var id;
    id = _id;
    _id = _id + 1;
    return _components.push({
      id: id,
      name: name,
      comp: comp
    });
  },
  isCollapsed: function(){
    return _isCollapsed;
  },
  getAllItems: function(){
    return _components;
  },
  getSelectedId: function(){
    return _selectedId;
  },
  emitChange: function(){
    return this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    return this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    return this.removeListener(CHANGE_EVENT, callback);
  }
});
AppDispatcher.register(function(action){
  switch (action.actionType) {
  case MenuConstants.MENU_TOGGLE:
    _isCollapsed = !_isCollapsed;
    return MenuStore.emitChange();
  case MenuConstants.MENU_SELECT:
    _selectedId = action.id;
    _isCollapsed = true;
    return MenuStore.emitChange();
  }
});
module.exports = MenuStore;
});

require.register("utils/keygen.ls", function(exports, require, module) {
var scrypt, bitcore, sum, CHECKSUM_BIT, KEY_LENGTH, myScrypt, reduceSeed, cleanMetaByte, putChecksumByte, readChecksumByte, hasChecksum, putIterationFactor, readIterationFactor, byteToHexString, hexStringToByte, keygen;
scrypt = require('scrypt-async');
bitcore = require('bitcore-lib');
sum = require('prelude-ls').sum;
CHECKSUM_BIT = 128;
KEY_LENGTH = 32;
myScrypt = function(pw, salt, itFac, callback){
  return scrypt(pw, salt, itFac, 8, KEY_LENGTH, 1000, callback);
};
reduceSeed = function(seed, passwordLength){
  return seed.subarray(passwordLength + 1, seed.length - 1);
};
cleanMetaByte = function(array){
  array[0] = 0;
  return array;
};
putChecksumByte = function(array, checksumByte){
  array[0] = array[0] | CHECKSUM_BIT;
  array[1] = checksumByte;
  return array;
};
readChecksumByte = function(array){
  return array[1];
};
hasChecksum = function(array){
  return (array[0] & CHECKSUM_BIT) !== 0;
};
putIterationFactor = function(array, iterations){
  array[0] = array[0] | iterations;
  return array;
};
readIterationFactor = function(array){
  var mask;
  mask = 0xff ^ CHECKSUM_BIT;
  return array[0] & mask;
};
byteToHexString = function(uint8arr){
  var hexStr, i$, to$, i, hex;
  if (!uint8arr) {
    '';
  }
  hexStr = '';
  for (i$ = 0, to$ = uint8arr.length - 1; i$ <= to$; ++i$) {
    i = i$;
    hex = (uint8arr[i] & 0xff).toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    hexStr += hex;
  }
  return hexStr;
};
hexStringToByte = function(str){
  var a, i$, to$, i;
  if (!str) {
    new Uint8Array();
  }
  a = [];
  for (i$ = 0, to$ = str.length - 1; i$ <= to$; i$ += 2) {
    i = i$;
    a.push(parseInt(str.substr(i, 2), 16));
  }
  return new Uint8Array(a);
};
module.exports = keygen = {
  generateRandomSeed: function(){
    return bitcore.crypto.Random.getRandomBuffer(KEY_LENGTH);
  },
  generateLockedKey: function(seed, password, itFac, callback){
    return myScrypt(password, reduceSeed(seed, password.length), itFac, function(hash){
      return callback(
      byteToHexString(
      putIterationFactor(putChecksumByte(cleanMetaByte(
      seed), hash[0]), itFac)));
    });
  },
  unlockKey: function(lockedKey, password, callback){
    var keyBuffer, itFac;
    keyBuffer = bitcore.util.buffer.hexToBuffer(lockedKey);
    itFac = readIterationFactor(keyBuffer);
    if (hasChecksum(keyBuffer)) {
      return myScrypt(password, reduceSeed(keyBuffer, password.length), itFac, function(hash){
        var checksum;
        checksum = readChecksumByte(
        keyBuffer);
        if (hash[0] === checksum) {
          return myScrypt(password, keyBuffer, itFac, callback);
        } else {
          return callback(false);
        }
      });
    } else {
      return myScrypt(password, keyBuffer, itFac, callback);
    }
  },
  generateHdroot: function(unlockedKey, callback){
    if (!unlockedKey) {
      false;
    }
    return callback(
    bitcore.HDPrivateKey.fromSeed(
    new Buffer(unlockedKey)));
  }
};
bitcore.Networks.add({
  name: 'peercoin',
  alias: 'ppcoin',
  pubkeyhash: 0x37,
  privatekey: 0xb7,
  scripthash: 0x75,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4
});
bitcore.Networks.add({
  name: 'peercoin-testnet',
  alias: 'ppcoin-test',
  pubkeyhash: 0x6f,
  privatekey: 0xef,
  scripthash: 0xc4,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394
});
bitcore.Networks.defaultNetwork = bitcore.Networks.get('peercoin');
});

;require.register("utils/url-params.js", function(exports, require, module) {
"use strict";

var urlParams;
(window.onpopstate = function () {
    var match,
        pl = /\+/g,
        // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
        decode = function decode(s) {
        return decodeURIComponent(s.replace(pl, " "));
    },
        query = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query)) {
        urlParams[decode(match[1])] = decode(match[2]);
    }
})();

module.exports = urlParams;
});

require.alias("events/events.js", "events");
require.alias("buffer/index.js", "buffer");
require.alias("crypto-browserify/index.js", "crypto");
require.alias("process/browser.js", "process");
require.alias("assert/assert.js", "assert");
require.alias("url/url.js", "url");
require.alias("punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("util/util.js", "sys");
require.alias("stream-browserify/index.js", "stream");
require.alias("string_decoder/index.js", "string_decoder");
require.alias("vm-browserify/index.js", "vm");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map