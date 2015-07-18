webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83);


/***/ },

/***/ 53:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var assign                 = __webpack_require__(3);
	var recalcMediaQueryStyles = __webpack_require__(89);

	var matchMedia = null;
	if (typeof window !== 'undefined' && !window.__ReactStyle__) {
	  matchMedia = window.matchMedia;
	}
	var mediaQueryBreakPoints = {};
	var hasVisibilityChangeListener = false;

	function applyMediaQueries(registeredMediaQueries, stylesheet, register) {
	  var newStyleSheet = {};
	  var styleNames = Object.keys(stylesheet);

	  function recalc() {
	    recalcMediaQueryStyles(registeredMediaQueries);
	  }

	  if (!hasVisibilityChangeListener
	      && typeof document !== 'undefined'
	      && 'visibilityState' in document) {
	    hasVisibilityChangeListener = true;
	    document.addEventListener("visibilitychange", function() {
	      if (document.visibilityState === 'visible') {
	        recalc();
	      }
	    });
	  }

	  for (var i = 0, l = styleNames.length; i < l; i++) {
	    var styleName = styleNames[i];
	    var style = stylesheet[styleName];
	    // only position 0 = false, so !0 = true
	    if (!styleName.indexOf('@media')) {
	      var mediaQuery = styleName.substr('@media '.length);
	      var isMediaQueryActive = false;

	      if (matchMedia && matchMedia(mediaQuery).matches) {
	        isMediaQueryActive = true;
	        var mqStyleNames = Object.keys(style);
	        for (var j = 0, l2 = mqStyleNames.length; j < l2; j++) {
	          var mqStyleName = mqStyleNames[j];

	          // warn for undeclared block
	          if ("production" !== process.env.NODE_ENV) {
	            if (!stylesheet[mqStyleName]) {
	              console.warn('Media query \'' + styleName + '\' referred to undeclared style block \'' + mqStyleName + '\'.');
	              continue;
	            }
	          }
	          newStyleSheet[mqStyleName] = assign({}, newStyleSheet[mqStyleName], style[mqStyleName]);
	        }
	      }

	      // register media query for recalc
	      if (register) {
	        registeredMediaQueries.push({
	          compiled: newStyleSheet,
	          elements: [],
	          isActive: isMediaQueryActive,
	          query: mediaQuery,
	          styleNames: styleNames,
	          stylesheet: stylesheet
	        });

	        if (matchMedia && !mediaQueryBreakPoints[mediaQuery]) {
	          matchMedia(mediaQuery).addListener(recalc);
	          mediaQueryBreakPoints[mediaQuery] = true;
	        }
	      }
	    }
	    else {
	      newStyleSheet[styleName] = style;
	    }
	  }

	  return newStyleSheet;
	}


	module.exports = applyMediaQueries;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var CSSProperty = __webpack_require__(30);
	var isArray     = Array.isArray;
	var keys        = Object.keys;

	var COMPLEX_OVERRIDES = CSSProperty.shorthandPropertyExpansions;

	function applyClassName(props, className, order, maxOverridesLength) {
	  if (!props.className) {
	    props.className = '';
	  }
	  var length = !maxOverridesLength || (order + 1) <= maxOverridesLength ? order + 1 : maxOverridesLength;
	  var uniquePartSplit = className.split('_');
	  var unique = uniquePartSplit[uniquePartSplit.length - 1];
	  for (var j = 0; j < length; j++) {
	    var selector = j === 0 ? className : unique;
	    props.className += ' ' + selector + (j === 0 ? '' : j);
	  }

	  return order + 1;
	}

	function applyInlineStyle(props, style, order) {
	  if (!props.style) {
	    props.style = {};
	  }
	  var styleKeys = keys(style);
	  for (var i = 0, l = styleKeys.length; i < l; i++) {
	    var key = styleKeys[i];
	    props.style[key] = style[key];
	    applyOverrides(props, key);
	  }

	  return order;
	}

	function applyOverrides(props, key) {
	  var overrides = COMPLEX_OVERRIDES[key];
	  if (overrides) {
	    var overridesKeys = keys(overrides);
	    for (var i = 0, l = overridesKeys.length; i < l; i++) {
	      var overrideKey = overridesKeys[i];
	      props.style[overrideKey] = '';
	    }
	  }
	}

	function applyStyle(props, style, order, maxOverridesLength) {
	  if (style === null || style === undefined || style === false) {
	    return order;
	  }
	  else if (typeof style === 'string' && order < 10) {
	    return applyClassName(props, style, order, maxOverridesLength);
	  }
	  else {
	    return applyInlineStyle(props, style, order);
	  }
	}

	function applyStyles(props, styles, order, inline, maxOverridesLength) {
	  if (order === undefined) {
	    order = 0;
	    inline = false;
	  }

	  if (isArray(styles)) {
	    for (var i = 0, len = styles.length; i < len; i++) {
	      var style = styles[i];
	      if ("production" !== process.env.NODE_ENV && style) {
	        if (typeof style === 'object' && !Array.isArray(style)) {
	          inline = true;
	        }
	        else if (inline && typeof style === 'string') {
	          console.warn('You are trying to override inline styles with a ' +
	                       'class, which might cause issues due to classes ' +
	                       'having lower CSS specificity then inline styles.');
	        }
	      }
	      order = applyStyles(props, style, order, inline, maxOverridesLength);
	    }
	    return order;
	  }
	  else {
	    return applyStyle(props, styles, order, maxOverridesLength);
	  }
	}

	module.exports = applyStyles;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 83:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52),
	    StyleSheet = __webpack_require__(88),
	    Request = __webpack_require__(159),
	    UIList = __webpack_require__(84);

	var styl = StyleSheet.create({
	  repo: {
	    height: '100px'
	  },
	  reposList: {
	    height: '300px',
	    overflowY: 'scroll',
	    WebkitOverflowScrolling: 'touch'
	  }
	});

	var App = React.createClass({
	  displayName: 'App',

	  getInitialState: function getInitialState() {
	    return { repos: [] };
	  },

	  componentDidMount: function componentDidMount() {
	    var url = 'https://api.github.com/users/facebook/repos';
	    Request.get(url).end((function (err, res) {
	      this.setState({ repos: JSON.parse(res.text) });
	    }).bind(this));
	  },

	  renderItem: function renderItem(index, key) {
	    var repo = this.state.repos[index];
	    return React.createElement(
	      'div',
	      { style: styl.repo, key: key },
	      React.createElement(
	        'h3',
	        null,
	        React.createElement(
	          'a',
	          { href: repo.url },
	          repo.name
	        )
	      ),
	      React.createElement(
	        'p',
	        null,
	        repo.description
	      )
	    );
	  },

	  render: function render() {
	    var repos = this.state.repos;
	    var size = repos.length;
	    return React.createElement(
	      'div',
	      { className: 'app' },
	      React.createElement(
	        'h2',
	        null,
	        'Facebook Repos'
	      ),
	      React.createElement(
	        'div',
	        { style: styl.reposList },
	        size > 0 ? React.createElement(UIList, { item: this.renderItem, type: 'uniform', length: size }) : null
	      )
	    );
	  }

	});

	document.addEventListener('DOMContentLoaded', function (e) {
	  React.render(React.createElement(App, null), document.body);
	});

/***/ },

/***/ 84:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(52);

	var isEqualSubset = function isEqualSubset(a, b) {
	  for (var key in a) {
	    if (a[key] !== b[key]) return false;
	  }
	  return true;
	};

	var isEqual = function isEqual(a, b) {
	  return isEqualSubset(a, b) && isEqualSubset(b, a);
	};

	var CLIENT_START_KEYS = { x: 'clientTop', y: 'clientLeft' },
	    CLIENT_SIZE_KEYS = { x: 'clientWidth', y: 'clientHeight' },
	    END_KEYS = { x: 'right', y: 'bottom' },
	    INNER_SIZE_KEYS = { x: 'innerWidth', y: 'innerHeight' },
	    OVERFLOW_KEYS = { x: 'overflowX', y: 'overflowY' },
	    SCROLL_KEYS = { x: 'scrollLeft', y: 'scrollTop' },
	    SIZE_KEYS = { x: 'width', y: 'height' },
	    START_KEYS = { x: 'left', y: 'top' };

	var UIList = React.createClass({
	  displayName: 'UIList',

	  propTypes: {
	    axis: React.PropTypes.oneOf(['x', 'y']),
	    initialIndex: React.PropTypes.number,
	    itemSizeGetter: React.PropTypes.func,
	    item: React.PropTypes.func,
	    itemsList: React.PropTypes.func,
	    length: React.PropTypes.number,
	    pageSize: React.PropTypes.number,
	    threshold: React.PropTypes.number,
	    type: React.PropTypes.oneOf(['simple', 'variable', 'uniform'])
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      axis: 'y',
	      initialIndex: 0,
	      pageSize: 10,
	      length: 0,
	      threshold: 100,
	      type: 'simple',
	      item: function item(index, key) {
	        return React.createElement(
	          'div',
	          { key: key },
	          index
	        );
	      },
	      itemsList: function itemsList(items, ref) {
	        return React.createElement(
	          'div',
	          { ref: ref },
	          items
	        );
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    var _props = this.props;
	    var initialIndex = _props.initialIndex;
	    var length = _props.length;
	    var pageSize = _props.pageSize;
	    var itemsPerRow = 1;
	    var startFrom = this.constrainFrom(initialIndex, length, itemsPerRow);
	    var size = this.constrainSize(pageSize, length, pageSize, startFrom);
	    return {
	      startFrom: startFrom,
	      size: size,
	      itemsPerRow: itemsPerRow
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(next) {
	    var _state = this.state;
	    var itemsPerRow = _state.itemsPerRow;
	    var startFrom = _state.startFrom;
	    var size = _state.size;
	    var length = next.length;
	    var pageSize = next.pageSize;
	    var sFrom = this.constrainFrom(startFrom, length, itemsPerRow);
	    var size = this.constrainSize(size, length, pageSize, sFrom);
	    this.setState({ startFrom: sFrom, size: size });
	  },

	  componentWillMount: function componentWillMount() {
	    this.cache = {};
	  },

	  componentDidMount: function componentDidMount() {
	    var initialIndex = this.props.initialIndex;

	    this.scrollParent = this.getScrollParent();
	    this.updateFrame = this.updateFrame;
	    window.addEventListener('resize', this.updateFrame);
	    this.scrollParent.addEventListener('scroll', this.updateFrame);
	    this.updateFrame();
	    if (initialIndex == null) return;
	    this.afId = requestAnimationFrame(this.scrollTo.bind(this, initialIndex));
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(props, state) {
	    return !isEqual(props, this.props) || !isEqual(state, this.state);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.updateFrame();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.updateFrame);
	    this.scrollParent.removeEventListener('scroll', this.updateFrame);
	    cancelAnimationFrame(this.afId);
	  },

	  getScrollParent: function getScrollParent() {
	    var el = this.getDOMNode(this),
	        overflowKey = OVERFLOW_KEYS[this.props.axis];
	    while (el = el.parentElement) {
	      var overflow = window.getComputedStyle(el)[overflowKey];
	      if (overflow === 'auto' || overflow === 'scroll') return el;
	    }
	    return window;
	  },

	  getScroll: function getScroll() {
	    var scrollParent = this.scrollParent;
	    var axis = this.props.axis;
	    var startKey = START_KEYS[axis];
	    var elStart = this.getDOMNode(this).getBoundingClientRect()[startKey];
	    if (scrollParent === window) return -elStart;
	    var scrollParentStart = scrollParent.getBoundingClientRect()[startKey],
	        scrollParentClientStart = scrollParent[CLIENT_START_KEYS[axis]];
	    return scrollParentStart + scrollParentClientStart - elStart;
	  },

	  setScroll: function setScroll(offset) {
	    var scrollParent = this.scrollParent;
	    var axis = this.props.axis;
	    var startKey = START_KEYS[axis];
	    if (scrollParent === window) {
	      var elStart = this.getDOMNode(this).getBoundingClientRect()[startKey],
	          winStart = document.documentElement.getBoundingClientRect()[startKey];
	      return window.scrollTo(0, Math.round(elStart) - winStart + offset);
	    }
	    scrollParent[SCROLL_KEYS[axis]] += offset - this.getScroll();
	  },

	  getViewportSize: function getViewportSize() {
	    var scrollParent = this.scrollParent;
	    var axis = this.props.axis;

	    return scrollParent === window ? window[INNER_SIZE_KEYS[axis]] : scrollParent[CLIENT_SIZE_KEYS[axis]];
	  },

	  getStartAndEnd: function getStartAndEnd() {
	    var threshold = this.props.threshold;
	    var start = Math.max(0, this.getScroll() - threshold);
	    var end = start + this.getViewportSize() + threshold * 2;
	    return { start: start, end: end };
	  },

	  getItemSizeAndItemsPerRow: function getItemSizeAndItemsPerRow() {
	    var itemEls = this.getDOMNode(this.items).children;
	    if (!itemEls.length) return {};
	    var firstRect = itemEls[0].getBoundingClientRect();
	    var itemSize = this.state.itemSize;
	    var axis = this.props.axis;
	    var sizeKey = SIZE_KEYS[axis];
	    var firstRectSize = firstRect[sizeKey];
	    var delta = Math.abs(firstRectSize - itemSize);
	    if (isNaN(delta) || delta >= 1) itemSize = firstRectSize;
	    if (!itemSize) return {};
	    var startKey = START_KEYS[axis],
	        firstRowEnd = Math.round(firstRect[END_KEYS[axis]]),
	        itemsPerRow = 1;
	    for (var item = itemEls[itemsPerRow]; item && Math.round(item.getBoundingClientRect()[startKey]) < firstRowEnd; item = itemEls[itemsPerRow]) {
	      itemsPerRow++;
	    }
	    return { itemSize: itemSize, itemsPerRow: itemsPerRow };
	  },

	  updateFrame: function updateFrame() {
	    switch (this.props.type) {
	      case 'simple':
	        return this.updateSimpleFrame();
	      case 'variable':
	        return this.updateVariableFrame();
	      case 'uniform':
	        return this.updateUniformFrame();
	    }
	  },

	  updateSimpleFrame: function updateSimpleFrame() {
	    var getStartAndEnd = this.getStartAndEnd(),
	        end = getStartAndEnd.end,
	        itemEls = this.getDOMNode(this).children,
	        elEnd = 0;
	    if (itemEls.length) {
	      var axis = this.props.axis;
	      var firstItemEl = itemEls[0];
	      var lastItemEl = itemEls[itemEls.length - 1];
	      elEnd = lastItemEl.getBoundingClientRect()[END_KEYS[axis]] - firstItemEl.getBoundingClientRect()[START_KEYS[axis]];
	    }
	    if (elEnd > end) return;
	    var _props2 = this.props;
	    var pageSize = _props2.pageSize;
	    var length = _props2.length;

	    this.setState({ size: Math.min(this.state.size + pageSize, length) });
	  },

	  updateVariableFrame: function updateVariableFrame() {
	    if (!this.props.itemSizeGetter) this.cacheSizes();
	    var getStartAndEnd = this.getStartAndEnd();
	    var start = getStartAndEnd.start;
	    var end = getStartAndEnd.end;
	    var _props3 = this.props;
	    var length = _props3.length;
	    var pageSize = _props3.pageSize;
	    var space = 0;
	    var startFrom = 0;
	    var size = 0;
	    var maxFrom = length - 1;
	    while (startFrom < maxFrom) {
	      var itemSize = this.getSizeOf(startFrom);
	      if (isNaN(itemSize) || space + itemSize > start) break;
	      space += itemSize;
	      startFrom++;
	    }
	    var maxSize = length - startFrom;
	    while (size < maxSize && space < end) {
	      var itemSize = this.getSizeOf(startFrom + size);
	      if (isNaN(itemSize)) {
	        size = Math.min(size + pageSize, maxSize);
	        break;
	      }
	      space += itemSize;
	      size++;
	    }
	    this.setState({ startFrom: startFrom, size: size });
	  },

	  updateUniformFrame: function updateUniformFrame() {
	    var getItemSizeAndItemsPerRow = this.getItemSizeAndItemsPerRow(),
	        itemSize = getItemSizeAndItemsPerRow.itemSize,
	        itemsPerRow = getItemSizeAndItemsPerRow.itemsPerRow;
	    if (!itemSize || !itemsPerRow) return;
	    var _props4 = this.props;
	    var length = _props4.length;
	    var pageSize = _props4.pageSize;
	    var getStartAndEnd = this.getStartAndEnd();
	    var start = getStartAndEnd.start;
	    var end = getStartAndEnd.end;
	    var startFrom = this.constrainFrom(Math.floor(start / itemSize) * itemsPerRow, length, itemsPerRow);
	    var size = this.constrainSize((Math.ceil((end - start) / itemSize) + 1) * itemsPerRow, length, pageSize, startFrom);
	    return this.setState({ itemsPerRow: itemsPerRow, startFrom: startFrom, itemSize: itemSize, size: size });
	  },

	  getSpaceBefore: function getSpaceBefore(index) {
	    var _state2 = this.state;
	    var itemSize = _state2.itemSize;
	    var itemsPerRow = _state2.itemsPerRow;
	    var space = 0;
	    if (itemSize) return Math.ceil(index / itemsPerRow) * itemSize;
	    for (var i = 0; i < index; i++) {
	      var _itemSize = this.getSizeOf(i);
	      if (isNaN(_itemSize)) break;
	      space += _itemSize;
	    }
	    return space;
	  },

	  cacheSizes: function cacheSizes() {
	    var cache = this.cache;
	    var startFrom = this.state.startFrom;
	    var itemEls = this.getDOMNode(this.items).children;
	    var sizeKey = SIZE_KEYS[this.props.axis];
	    for (var i = 0, l = itemEls.length; i < l; i++) {
	      cache[startFrom + i] = itemEls[i].getBoundingClientRect()[sizeKey];
	    }
	  },

	  getSizeOf: function getSizeOf(index) {
	    var itemSize = this.state.itemSize;

	    if (itemSize) return itemSize;
	    var itemSizeGetter = this.props.itemSizeGetter;
	    if (itemSizeGetter) return itemSizeGetter(index);
	    var cache = this.cache;
	    if (cache[index]) return cache[index];
	    return NaN;
	  },

	  constrainFrom: function constrainFrom(startFrom, length, itemsPerRow) {
	    if (this.props.type === 'simple') return 0;
	    if (!startFrom) return 0;
	    return Math.max(Math.min(startFrom, length - itemsPerRow - length % itemsPerRow), 0);
	  },

	  constrainSize: function constrainSize(size, length, pageSize, startFrom) {
	    return Math.min(Math.max(size, pageSize), length - startFrom);
	  },

	  scrollTo: function scrollTo(index) {
	    this.setScroll(this.getSpaceBefore(index));
	  },

	  scrollAround: function scrollAround(index) {
	    var current = this.getScroll(),
	        max = this.getSpaceBefore(index);
	    if (current > max) return this.setScroll(max);
	    var min = max - this.getViewportSize() + this.getSizeOf(index);
	    if (current < min) this.setScroll(min);
	  },

	  getItems: function getItems() {
	    var uiList = this;
	    var _state3 = this.state;
	    var startFrom = _state3.startFrom;
	    var size = _state3.size;
	    var items = [];
	    for (var i = 0; i < size; i++) {
	      items.push(this.props.item(startFrom + i, i));
	    }
	    return this.props.itemsList(items, function (c) {
	      return uiList.items = c;
	    });
	  },

	  render: function render() {
	    var items = this.getItems();
	    console.log('>>> Items', this.items);
	    if (this.props.type === 'simple') return items;
	    var axis = this.props.axis,
	        size = this.getSpaceBefore(this.props.length),
	        offset = this.getSpaceBefore(this.state.startFrom),
	        x = axis === 'x' ? offset : 0,
	        y = axis === 'y' ? offset : 0,
	        transform = 'translate(' + x + 'px, ' + y + 'px)',
	        listStyle = { position: 'relative' },
	        containerStyle = { WebkitTransform: transform, transform: transform };

	    if (size && axis === 'x') listStyle.overflowX = 'hidden';
	    listStyle[SIZE_KEYS[axis]] = size;
	    return React.createElement(
	      'div',
	      { style: listStyle },
	      React.createElement(
	        'div',
	        { style: containerStyle },
	        items
	      )
	    );
	  }

	});

	module.exports = UIList;

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var helperObj = {};

	var ReactCompositeComponent = __webpack_require__(8);
	var ReactComponent = __webpack_require__(18);
	var originalMountComponent;
	var mountExtensionPoint;

	if (ReactCompositeComponent.Mixin) {
	  mountExtensionPoint = ReactCompositeComponent;
	  originalMountComponent = ReactCompositeComponent.Mixin.mountComponent;
	} else {
	  mountExtensionPoint = ReactComponent;
	  originalMountComponent = ReactComponent.Mixin.mountComponent;
	}

	mountExtensionPoint.Mixin.mountComponent = function(rootID, transaction, context) {
	  var call = originalMountComponent.call(this, rootID, transaction, context);
	  var instance = !this._instance ? this : this._instance;
	  var props = instance.props;
	  if (props && props.__cachedStyles) {
	    helperObj.associateToMediaQuery(instance);
	  }
	  return call;
	};

	module.exports = helperObj;


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactElement  = __webpack_require__(4);
	var assign        = __webpack_require__(3);
	var applyStyles   = __webpack_require__(54);
	var isArray       = Array.isArray;

	var helperObj = {};

	function buildProps(props) {
	  var builtProps = {
	    className: props.className || null,
	    style: props.style ? assign({}, props.style) : null,
	    styles: undefined
	  };
	  applyStyles(builtProps, props.styles, 0, null, helperObj.maxOverridesLength);
	  return builtProps;
	}

	var originalCreateElement = ReactElement.createElement;
	ReactElement.createElement = function(type, props) {
	  var args = arguments;
	  if (props &&
	      props.styles &&
	      !props.__cachedStyles &&
	      typeof type === 'string') {
	    props.__cachedStyles = isArray(props.styles) ? props.styles : [props.styles];
	    assign(props, buildProps(props));
	  }
	  return originalCreateElement.apply(this, [type, props].concat(Array.prototype.slice.call(args, 2)));
	};

	module.exports = helperObj;


/***/ },

/***/ 87:
/***/ function(module, exports) {

	'use strict';

	var currCSSKey = 0;
	var allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	/**
	 * Get an unique CSS key for the className in a file. It supports up
	 * to 140608 classNames.
	 *
	 * @return {string}
	 */
	function generateUniqueCSSClassName() {
	  var allowedCharactersLength = allowedCharacters.length;
	  var key1unit = allowedCharactersLength * allowedCharactersLength;
	  var key1pos = Math.floor(currCSSKey / key1unit);
	  var key1 = allowedCharacters[key1pos - 1];
	  var key2pos = Math.floor((currCSSKey -
	  (key1 ? key1pos * key1unit : 0)) / allowedCharactersLength);
	  var key2 = allowedCharacters[key2pos - 1];
	  var key3 = allowedCharacters[(currCSSKey -
	                               (key1 ? (key1pos * key1unit) : 0) -
	                               (key2 ? key2pos * allowedCharactersLength : 0))];
	  var key = '';
	  if (key1) {
	    key += key1;
	  }
	  if (key2) {
	    key += key2;
	  }
	  if (key3) {
	    key += key3;
	  }
	  currCSSKey++;

	  return key;
	}

	module.exports = generateUniqueCSSClassName;

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var assign                          = __webpack_require__(3);
	var ReactElementExtended            = __webpack_require__(86);
	var ReactCompositeComponentExtended = __webpack_require__(85);
	var ExecutionEnvironment            = __webpack_require__(5);

	var applyMediaQueries               = __webpack_require__(53);
	var generateUniqueCSSClassName      = __webpack_require__(87);
	var stylesToCSS                     = __webpack_require__(90);

	var isArray                         = Array.isArray;
	var keys                            = Object.keys;

	var registeredMediaQueries          = [];
	var styles                          = [];
	var mediaQueries                    = {};

	var isProduction                    = process.env.NODE_ENV === 'production';

	function createStyle(props, className, uniqueKey) {
	  styles.push({
	    style: props,
	    className: className,
	    uniqueKey: uniqueKey
	  });
	  return className;
	}

	function createStyleSheet(stylesheet, useClassName) {
	  if (!useClassName) {
	    // default
	    stylesheet = applyMediaQueries(registeredMediaQueries, stylesheet, true);
	    return stylesheet;
	  }
	  else {
	    ReactElementExtended.maxOverridesLength = StyleSheet.maxOverridesLength;

	    // export to separate CSS classes
	    var styleSheetStyles = keys(stylesheet);
	    var results = {};
	    for (var i = 0, l = styleSheetStyles.length; i < l; i++) {
	      var styleName = styleSheetStyles[i];
	      var isMediaQuery = !styleName.indexOf('@media ');
	      var style = stylesheet[styleName];
	      var origUniqueKey = generateUniqueCSSClassName();
	      var uniqueKey = origUniqueKey;
	      if (!isProduction) {
	        uniqueKey = styleName + '_' + uniqueKey;
	      }

	      if (isMediaQuery) {
	        var mqStyleNames = keys(style);
	        var newStyle = {};
	        for (var i2 = 0, l2 = mqStyleNames.length; i2 < l2; i2++) {
	          var mqStyleName = mqStyleNames[i2];
	          var mqStyle = style[mqStyleName];
	          var uniqueKey2 = results[mqStyleName];
	          if (uniqueKey2) {
	            newStyle[uniqueKey2] = mqStyle;
	          }
	        }

	        if (!mediaQueries[styleName]) {
	          mediaQueries[styleName] = {};
	        }

	        keys(newStyle).reduce(function (acc, key) {
	          if (!acc[key]) {
	            acc[key] = newStyle[key];
	          }
	          return acc;
	        }, mediaQueries[styleName]);

	          continue;
	      }
	      results[styleName] = createStyle(style, isMediaQuery ? styleName : uniqueKey, origUniqueKey);
	    }

	    return results;
	  }
	}

	var StyleSheet = {
	  compile: function(maxLength) {
	    var mq = keys(mediaQueries).map(function(query){
	      return {
	        style: mediaQueries[query],
	        className: query,
	        uniqueKey: ''
	      };
	    });

	    return stylesToCSS(styles.concat(mq), maxLength || 10);
	  },
	  create: createStyleSheet
	};

	ReactCompositeComponentExtended.associateToMediaQuery = function(comp) {
	  var styles = comp.props.__cachedStyles;
	  for (var i = 0, l = styles.length; i < l; i++) {
	    var style = styles[i];
	    for (var j = 0, l2 = registeredMediaQueries.length; j < l2; j++) {
	      var registeredMediaQuery = registeredMediaQueries[j];
	      var stylesheet = registeredMediaQuery.compiled;
	      var stylesheetNames = registeredMediaQuery.styleNames;
	      for (var i2 = 0, l3 = stylesheetNames.length; i2 < l3; i2++) {
	        var styleName = stylesheetNames[i2];
	        var compiledStyle = stylesheet[styleName];
	        if (style === compiledStyle) {
	          registeredMediaQuery.elements.push(comp);
	        }
	      }
	    }
	  }
	};


	module.exports = StyleSheet;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var assign                          = __webpack_require__(3);
	var applyStyles                     = __webpack_require__(54);
	var enqueueForceUpdate;

	var ReactElement = __webpack_require__(4);
	var ReactUpdates;

	// fugly
	try {
	  // React 0.13
	  enqueueForceUpdate = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"react/lib/ReactUpdateQueue\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).enqueueForceUpdate;
	  ReactUpdates = __webpack_require__(9);

	} catch(e) {
	  // React 0.12
	  enqueueForceUpdate = __webpack_require__(9).enqueueUpdate;
	}
	var matchMedia = null;
	if (typeof window !== 'undefined' && !window.__ReactStyle__) {
	  matchMedia = window.matchMedia;
	}

	function recalcMediaQueryStyles(registeredMediaQueries) {
	  for (var i = 0, l = registeredMediaQueries.length; i < l; i++) {
	    var registeredMediaQuery = registeredMediaQueries[i];
	    var matchesQuery = matchMedia(registeredMediaQuery.query).matches;
	    var isActive = registeredMediaQuery.isActive;
	    if ((matchesQuery && !isActive) || (!matchesQuery && isActive)) {
	      recalcMediaQueryStyle(registeredMediaQuery, registeredMediaQueries);
	    }
	  }
	}

	function recalcMediaQueryStyle(registeredMediaQuery, registeredMediaQueries) {
	  var applyMediaQueries = __webpack_require__(53);
	  registeredMediaQuery.isActive = !registeredMediaQuery.isActive;
	  var compiledStyleSheet = applyMediaQueries(registeredMediaQueries, registeredMediaQuery.stylesheet, false);
	  var elements = registeredMediaQuery.elements;
	  var i, l;
	  for (i = 0, l = elements.length; i < l; i++) {
	    var element = elements[i];
	    recalcElementStyles(registeredMediaQuery, element, compiledStyleSheet);
	  }

	  var styleNames = registeredMediaQuery.styleNames;
	  for (i = 0, l = styleNames.length; i < l; i++) {
	    var styleName = styleNames[i];
	    registeredMediaQuery.compiled[styleName] = compiledStyleSheet[styleName];
	  }
	}

	function recalcElementStyles(registeredMediaQuery, element, newCompiledStyleSheet) {
	  var styleSheetNames = registeredMediaQuery.styleNames;
	  var oldCompiledStyleSheet = registeredMediaQuery.compiled;
	  var oldElementStyles = element.props.__cachedStyles;
	  var newElementStyles = [];
	  for (var i = 0, l = oldElementStyles.length; i < l; i++) {
	    var oldElementStyle = oldElementStyles[i];
	    _setElementStyles(
	      newElementStyles,
	      i,
	      oldElementStyle,
	      styleSheetNames,
	      oldCompiledStyleSheet,
	      newCompiledStyleSheet);
	  }
	  var newProps = {};
	  applyStyles(newProps, newElementStyles, 0);
	  if (element._setPropsInternal) {

	    // React 0.12
	    element._setPropsInternal({
	      style: newProps.style,
	      __cachedStyles: newElementStyles});
	  } else {

	    // React 0.13
	    var instance = element._reactInternalInstance;
	    instance._setPropsInternal({
	      style : newProps.style,
	      __cachedStyles: newElementStyles
	    });
	  }

	  setChildElementStyles(element, styleSheetNames, oldCompiledStyleSheet, newCompiledStyleSheet);
	  enqueueForceUpdate(element);
	}

	function setChildElementStyles(element, styleSheetNames, oldCompiledStyleSheet, newCompiledStyleSheet) {
	  var children = element.props.children;
	  if (children) {
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      if (child.props && child.props.styles) {
	        var newChildStyles = [];
	        var childStyles = child.props.styles;
	        for (var childStyleIndex = 0, childStylesLength = childStyles.length; childStyleIndex < childStylesLength; childStyleIndex++) {
	          var childStyle = childStyles[childStyleIndex];
	          _setElementStyles(
	            newChildStyles,
	            childStyleIndex,
	            childStyle,
	            styleSheetNames,
	            oldCompiledStyleSheet,
	            newCompiledStyleSheet
	          );
	        }
	        if ("production" !== process.env.NODE_ENV) {
	          if (child._store.originalProps) {
	            child._store.originalProps.styles = newChildStyles;
	          }
	          else {
	            child._store.props.styles = newChildStyles;
	          }
	        }
	        child.props.styles = newChildStyles;
	      }
	    }
	  }
	}

	function _setElementStyles(elementStyles, j, elementStyle, styleSheetNames, oldCompiledStyleSheet, newCompiledStyleSheet) {
	  elementStyles[j] = elementStyle;
	  if (!elementStyle) {
	    return;
	  }
	  for (var i = 0, l = styleSheetNames.length; i < l; i++) {
	    var styleName = styleSheetNames[i];
	    var oldCompiledStyle = oldCompiledStyleSheet[styleName];
	    var newCompiledStyle = newCompiledStyleSheet[styleName];
	    if (oldCompiledStyle === elementStyle) {
	      elementStyles[j] = newCompiledStyle;
	    }
	  }
	}

	module.exports = recalcMediaQueryStyles;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var isUnitlessNumber = __webpack_require__(30).isUnitlessNumber;
	var hyphenateStyleName = __webpack_require__(77);
	var isArray = Array.isArray;
	var keys = Object.keys;
	var unsupportedPseudoClasses = __webpack_require__(91);

	var counter = 1;
	// Follows syntax at https://developer.mozilla.org/en-US/docs/Web/CSS/content,
	// including multiple space separated values.
	var unquotedContentValueRegex = /^(normal|none|(\b(url\([^)]*\)|chapter_counter|attr\([^)]*\)|(no-)?(open|close)-quote|inherit)((\b\s*)|$|\s+))+)$/;

	function buildRule(result, key, value, selector) {
	  if (!isUnitlessNumber[key] && typeof value === 'number') {
	    value = '' + value + 'px';
	  }
	  else if (key === 'content' && !unquotedContentValueRegex.test(value)) {
	    value = "'" + value.replace(/'/g, "\\'") + "'";
	  }

	  result.css += '  ' + hyphenateStyleName(key) + ': ' + value + ';\n';
	}

	function buildRules(result, rules, uniqueKey, selector, maxLength, key) {
	  if (!rules || keys(rules).length === 0) {
	    return result;
	  }

	  var replicatedSelector = replicateSelector(selector, uniqueKey, maxLength, key);
	  result.css += replicatedSelector + ' {\n';
	  var styleKeys = keys(rules);
	  for (var j = 0, l = styleKeys.length; j < l; j++) {
	    var styleKey = styleKeys[j];
	    var value = rules[styleKey];

	    if (unsupportedPseudoClasses[styleKey.split('(')[0].trim()]) {
	      if ("production" !== process.env.NODE_ENV) {
	        console.warn('You are trying to use pseudo class ' + styleKey +
	        ', which we don\'t support as this is better implemented using ' +
	        'JavaScript.');
	      }

	      continue;
	    }

	    if (isArray(value)) {
	      for (var i = 0, len = value.length; i < len; i++) {
	        buildRule(result, styleKey, value[i], selector, maxLength);
	      }
	    }
	    else {
	      buildRule(result, styleKey, value, selector, maxLength);
	    }
	  }
	  result.css += '}\n';

	  return result;
	}

	function buildMediaQuery(result, rules, selector, maxLength) {
	  result.css += selector + '{\n';
	  var ruleKeys = keys(rules);
	  for (var i = 0, l = ruleKeys.length; i < l; i++) {
	    var ruleKey = ruleKeys[i];
	    var rule = rules[ruleKey];
	    var ruleKeySplit = ruleKey.split('_');
	    var uniqueKey = ruleKeySplit[ruleKeySplit.length - 1];
	    buildRules(result, rule, uniqueKey, '.' + ruleKey, maxLength);
	  }
	  result.css += '}\n';
	}

	function replicateSelector(selector, uniqueKey, max, key) {
	  var maxLength = max || 10;
	  var _key = key || '';
	  var replicatedSelector = [];
	  for (var i = 0; i < maxLength; i++) {
	    var newSelector = '';
	    for (var j = 0, l2 = i + 1; j < l2; j++) {
	      var selectorX = j === 0 ? selector : '.' + uniqueKey;
	      newSelector += selectorX + (j !==0 ? j : '');
	    }
	    replicatedSelector[i] = newSelector + _key;
	  }
	  return replicatedSelector.join(',');
	}

	function buildStyle(result, style, selector, maxLength) {
	  if (!style.className) {
	    return;
	  }
	  if (!selector && result.classNames[style.className]) {
	    return;
	  }
	  if (!selector) {
	    result.classNames[style.className] = counter++;
	    selector = '.' + style.className;
	  }
	  if (!selector.indexOf('.@media ')) {
	    buildMediaQuery(result, style.style, selector.substr(1), maxLength);
	  }
	  else {
	    buildRules(result, style.style, style.uniqueKey, selector, maxLength);
	  }
	}

	function stylesToCSS(styles, maxLength) {
	  if (!isArray(styles)) {
	    styles = [styles];
	  }

	  var result = {css: '', classNames: {}};
	  for (var i = 0, len = styles.length; i < len; i++) {
	    var style = styles[i];
	    buildStyle(result, style, null, maxLength);
	  }
	  return result;
	}

	module.exports = stylesToCSS;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 91:
/***/ function(module, exports) {

	/**
	 * A list of unsupported pseudo classes
	 */
	'use strict';

	var unsupportedPseudoClasses = {
	  ':active': true,
	  ':checked': true,
	  ':default': true,
	  ':dir': true,
	  ':disabled': true,
	  ':empty': true,
	  ':enabled': true,
	  ':first': true,
	  ':first-child': true,
	  ':first-of-type': true,
	  ':fullscreen': true,
	  ':focus': true,
	  ':hover': true,
	  ':indeterminate': true,
	  ':in-range': true,
	  ':invalid': true,
	  ':lang': true,
	  ':last-child': true,
	  ':last-of-type': true,
	  ':left': true,
	  ':link': true,
	  ':not': true,
	  ':nth-child': true,
	  ':nth-last-child': true,
	  ':nth-last-of-type': true,
	  ':nth-of-type': true,
	  ':only-child': true,
	  ':only-of-type': true,
	  ':optional': true,
	  ':out-of-range': true,
	  ':read-only': true,
	  ':read-write': true,
	  ':required': true,
	  ':right': true,
	  ':root': true,
	  ':scope': true,
	  ':target': true,
	  ':valid': true,
	  ':visited': true
	};

	module.exports = unsupportedPseudoClasses;


/***/ },

/***/ 159:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var Emitter = __webpack_require__(160);
	var reduce = __webpack_require__(161);

	/**
	 * Root reference for iframes.
	 */

	var root = 'undefined' == typeof window
	  ? (this || self)
	  : window;

	/**
	 * Noop.
	 */

	function noop(){};

	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isHost(obj) {
	  var str = {}.toString.call(obj);

	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Determine XHR.
	 */

	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  return false;
	};

	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */

	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */

	function isObject(obj) {
	  return obj === Object(obj);
	}

	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */

	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    if (null != obj[key]) {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(obj[key]));
	    }
	  }
	  return pairs.join('&');
	}

	/**
	 * Expose serialization method.
	 */

	 request.serializeObject = serialize;

	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */

	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var parts;
	  var pair;

	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    parts = pair.split('=');
	    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
	  }

	  return obj;
	}

	/**
	 * Expose parser.
	 */

	request.parseString = parseString;

	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */

	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};

	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */

	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };

	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */

	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};

	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;

	  lines.pop(); // trailing CRLF

	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }

	  return fields;
	}

	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */

	function type(str){
	  return str.split(/ *; */).shift();
	};

	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function params(str){
	  return reduce(str.split(/ *; */), function(obj, str){
	    var parts = str.split(/ *= */)
	      , key = parts.shift()
	      , val = parts.shift();

	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};

	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */

	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this.setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this.setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this.parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}

	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */

	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};

	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */

	Response.prototype.setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);

	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};

	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */

	Response.prototype.parseBody = function(str){
	  var parse = request.parse[this.type];
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};

	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */

	Response.prototype.setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }

	  var type = status / 100 | 0;

	  // status / class
	  this.status = status;
	  this.statusType = type;

	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;

	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};

	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */

	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;

	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;

	  return err;
	};

	/**
	 * Expose `Response`.
	 */

	request.Response = Response;

	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */

	function Request(method, url) {
	  var self = this;
	  Emitter.call(this);
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {};
	  this._header = {};
	  this.on('end', function(){
	    var err = null;
	    var res = null;

	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      return self.callback(err);
	    }

	    self.emit('response', res);

	    if (err) {
	      return self.callback(err, res);
	    }

	    if (res.status >= 200 && res.status < 300) {
	      return self.callback(err, res);
	    }

	    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	    new_err.original = err;
	    new_err.response = res;
	    new_err.status = res.status;

	    self.callback(err || new_err, res);
	  });
	}

	/**
	 * Mixin `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Allow for extension
	 */

	Request.prototype.use = function(fn) {
	  fn(this);
	  return this;
	}

	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.timeout = function(ms){
	  this._timeout = ms;
	  return this;
	};

	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.clearTimeout = function(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};

	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */

	Request.prototype.abort = function(){
	  if (this.aborted) return;
	  this.aborted = true;
	  this.xhr.abort();
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};

	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};

	/**
	 * Remove header `field`.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};

	/**
	 * Get case-insensitive header `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 */

	Request.prototype.getHeader = function(field){
	  return this._header[field.toLowerCase()];
	};

	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};

	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.auth = function(user, pass){
	  var str = btoa(user + ':' + pass);
	  this.set('Authorization', 'Basic ' + str);
	  return this;
	};

	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/

	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};

	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File} val
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.field = function(name, val){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(name, val);
	  return this;
	};

	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.attach = function(field, file, filename){
	  if (!this._formData) this._formData = new root.FormData();
	  this._formData.append(field, file, filename);
	  return this;
	};

	/**
	 * Send `data`, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // querystring
	 *       request.get('/search')
	 *         .end(callback)
	 *
	 *       // multiple data "writes"
	 *       request.get('/search')
	 *         .send({ search: 'query' })
	 *         .send({ range: '1..5' })
	 *         .send({ order: 'desc' })
	 *         .end(callback)
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"})
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	  *      request.post('/user')
	  *        .send('name=tobi')
	  *        .send('species=ferret')
	  *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.send = function(data){
	  var obj = isObject(data);
	  var type = this.getHeader('Content-Type');

	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    if (!type) this.type('form');
	    type = this.getHeader('Content-Type');
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }

	  if (!obj || isHost(data)) return this;
	  if (!type) this.type('json');
	  return this;
	};

	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */

	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};

	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */

	Request.prototype.crossDomainError = function(){
	  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
	  err.crossDomain = true;
	  this.callback(err);
	};

	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */

	Request.prototype.timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};

	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */

	Request.prototype.withCredentials = function(){
	  this._withCredentials = true;
	  return this;
	};

	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */

	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var query = this._query.join('&');
	  var timeout = this._timeout;
	  var data = this._formData || this._data;

	  // store callback
	  this._callback = fn || noop;

	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;

	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }

	    if (0 == status) {
	      if (self.timedout) return self.timeoutError();
	      if (self.aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };

	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }

	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }

	  // querystring
	  if (query) {
	    query = request.serializeObject(query);
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }

	  // initiate request
	  xhr.open(this.method, this.url, true);

	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;

	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
	    // serialize stuff
	    var serialize = request.serialize[this.getHeader('Content-Type')];
	    if (serialize) data = serialize(data);
	  }

	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }

	  // send stuff
	  this.emit('request', this);
	  xhr.send(data);
	  return this;
	};

	/**
	 * Expose `Request`.
	 */

	request.Request = Request;

	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */

	function request(method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new Request('GET', method).end(url);
	  }

	  // url first
	  if (1 == arguments.length) {
	    return new Request('GET', method);
	  }

	  return new Request(method, url);
	}

	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.del = function(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} data
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} data or fn
	 * @param {Function} fn
	 * @return {Request}
	 * @api public
	 */

	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};

	/**
	 * Expose `request`.
	 */

	module.exports = request;


/***/ },

/***/ 160:
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */

	module.exports = Emitter;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};

	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },

/***/ 161:
/***/ function(module, exports) {

	
	/**
	 * Reduce `arr` with `fn`.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Mixed} initial
	 *
	 * TODO: combatible error handling?
	 */

	module.exports = function(arr, fn, initial){  
	  var idx = 0;
	  var len = arr.length;
	  var curr = arguments.length == 3
	    ? initial
	    : arr[idx++];

	  while (idx < len) {
	    curr = fn.call(null, curr, arr[idx], ++idx, arr);
	  }
	  
	  return curr;
	};

/***/ }

});