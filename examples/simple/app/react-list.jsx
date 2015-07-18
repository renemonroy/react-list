var React = require('react');

var isEqualSubset = function(a, b) {
  for ( var key in a ) {
    if ( a[key] !== b[key] ) return false;
  }
  return true;
};

var isEqual = function(a, b) {
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

  propTypes : {
    axis : React.PropTypes.oneOf(['x', 'y']),
    initialIndex : React.PropTypes.number,
    itemSizeGetter: React.PropTypes.func,
    item : React.PropTypes.func,
    itemsList : React.PropTypes.func,
    length : React.PropTypes.number,
    pageSize : React.PropTypes.number,
    threshold : React.PropTypes.number,
    type: React.PropTypes.oneOf(['simple', 'variable', 'uniform'])
  },

  getDefaultProps : function() {
    return {
      axis : 'y',
      initialIndex : 0,
      pageSize : 10,
      length : 0,
      threshold : 100,
      type : 'simple',
      item : function(index, key) {
        return <div key={key}>{index}</div>;
      },
      itemsList : function(items, ref) {
        return <div ref={ref}>{items}</div>;
      }
    };
  },

  getInitialState : function() {
    var { initialIndex, length, pageSize } = this.props,
      itemsPerRow = 1,
      startFrom = this.constrainFrom(initialIndex, length, itemsPerRow),
      size = this.constrainSize(pageSize, length, pageSize, startFrom);
    return {
      startFrom : startFrom,
      size : size,
      itemsPerRow : itemsPerRow
    };
  },

  componentWillReceiveProps : function(next) {
    var { itemsPerRow, startFrom, size } = this.state,
      length = next.length,
      pageSize = next.pageSize,
      sFrom = this.constrainFrom(startFrom, length, itemsPerRow),
      size = this.constrainSize(size, length, pageSize, sFrom);
    this.setState({ startFrom : sFrom, size : size });
  },

  componentWillMount : function() {
    this.cache = {};
  },

  componentDidMount : function() {
    var { initialIndex } = this.props;
    this.scrollParent = this.getScrollParent();
    this.updateFrame = this.updateFrame;
    window.addEventListener('resize', this.updateFrame);
    this.scrollParent.addEventListener('scroll', this.updateFrame);
    this.updateFrame();
    if ( initialIndex == null ) return;
    this.afId = requestAnimationFrame(this.scrollTo.bind(this, initialIndex));
  },

  shouldComponentUpdate : function(props, state) {
    return !isEqual(props, this.props) || !isEqual(state, this.state);
  },

  componentDidUpdate : function() {
    this.updateFrame();
  },

  componentWillUnmount : function() {
    window.removeEventListener('resize', this.updateFrame);
    this.scrollParent.removeEventListener('scroll', this.updateFrame);
    cancelAnimationFrame(this.afId);
  },

  getScrollParent : function() {
    var el = this.getDOMNode(this),
      overflowKey = OVERFLOW_KEYS[this.props.axis];
    while ( el = el.parentElement ) {
      var overflow = window.getComputedStyle(el)[overflowKey];
      if ( overflow === 'auto' || overflow === 'scroll' ) return el;
    }
    return window;
  },

  getScroll : function() {
    var scrollParent = this.scrollParent,
      { axis } = this.props,
      startKey = START_KEYS[axis],
      elStart = this.getDOMNode(this).getBoundingClientRect()[startKey];
    if ( scrollParent === window ) return -elStart;
    var scrollParentStart = scrollParent.getBoundingClientRect()[startKey],
      scrollParentClientStart = scrollParent[CLIENT_START_KEYS[axis]];
    return scrollParentStart + scrollParentClientStart - elStart;
  },

  setScroll : function(offset) {
    var scrollParent = this.scrollParent,
      { axis } = this.props,
      startKey = START_KEYS[axis];
    if ( scrollParent === window ) {
      var elStart = this.getDOMNode(this).getBoundingClientRect()[startKey],
        winStart = document.documentElement.getBoundingClientRect()[startKey];
      return window.scrollTo(0, Math.round(elStart) - winStart + offset);
    }
    scrollParent[SCROLL_KEYS[axis]] += offset - this.getScroll();
  },

  getViewportSize : function() {
    var scrollParent = this.scrollParent,
      { axis } = this.props;
    return scrollParent === window ?
      window[INNER_SIZE_KEYS[axis]] : scrollParent[CLIENT_SIZE_KEYS[axis]];
  },

  getStartAndEnd : function() {
    var { threshold } = this.props,
      start = Math.max(0, this.getScroll() - threshold),
      end = start + this.getViewportSize() + threshold * 2;
    return { start : start, end : end };
  },

  getItemSizeAndItemsPerRow : function() {
    var itemEls = this.getDOMNode(this.items).children;
    if ( !itemEls.length ) return {};
    var firstRect = itemEls[0].getBoundingClientRect(),
      { itemSize } = this.state,
      { axis } = this.props,
      sizeKey = SIZE_KEYS[axis],
      firstRectSize = firstRect[sizeKey],
      delta = Math.abs(firstRectSize - itemSize);
    if ( isNaN(delta) || delta >= 1 ) itemSize = firstRectSize;
    if ( !itemSize ) return {};
    var startKey = START_KEYS[axis],
      firstRowEnd = Math.round(firstRect[END_KEYS[axis]]),
      itemsPerRow = 1;
    for ( var item = itemEls[itemsPerRow]; item && Math.round(item.getBoundingClientRect()[startKey]) < firstRowEnd; item = itemEls[itemsPerRow] ) {
      itemsPerRow++;
    }
    return { itemSize : itemSize, itemsPerRow : itemsPerRow };
  },

  updateFrame : function() {
    switch ( this.props.type ) {
      case 'simple' :
        return this.updateSimpleFrame();
      case 'variable' :
        return this.updateVariableFrame();
      case 'uniform' :
        return this.updateUniformFrame();
    }
  },

  updateSimpleFrame : function() {
    var getStartAndEnd = this.getStartAndEnd(),
      end = getStartAndEnd.end,
      itemEls = this.getDOMNode(this).children,
      elEnd = 0;
    if ( itemEls.length ) {
      var { axis } = this.props,
        firstItemEl = itemEls[0],
        lastItemEl = itemEls[itemEls.length - 1];
      elEnd = lastItemEl.getBoundingClientRect()[END_KEYS[axis]] - firstItemEl.getBoundingClientRect()[START_KEYS[axis]];
    }
    if ( elEnd > end ) return;
    var { pageSize, length } = this.props;
    this.setState({ size : Math.min(this.state.size + pageSize, length) });
  },

  updateVariableFrame : function() {
    if ( !this.props.itemSizeGetter ) this.cacheSizes();
    var getStartAndEnd = this.getStartAndEnd(),
      start = getStartAndEnd.start,
      end = getStartAndEnd.end,
      { length, pageSize } = this.props,
      space = 0,
      startFrom = 0,
      size = 0,
      maxFrom = length - 1;
    while ( startFrom < maxFrom ) {
      var itemSize = this.getSizeOf(startFrom);
      if ( isNaN(itemSize) || space + itemSize > start ) break;
      space += itemSize;
      startFrom++;
    }
    var maxSize = length - startFrom;
    while ( size < maxSize && space < end ) {
      var itemSize = this.getSizeOf(startFrom + size);
      if ( isNaN(itemSize) ) {
        size = Math.min(size + pageSize, maxSize);
        break;
      }
      space += itemSize;
      size++
    }
    this.setState({ startFrom : startFrom, size : size });
  },

  updateUniformFrame : function() {
    var getItemSizeAndItemsPerRow = this.getItemSizeAndItemsPerRow(),
      itemSize = getItemSizeAndItemsPerRow.itemSize,
      itemsPerRow = getItemSizeAndItemsPerRow.itemsPerRow;
    if ( !itemSize || !itemsPerRow ) return;
    var { length, pageSize } = this.props,
      getStartAndEnd = this.getStartAndEnd(),
      start = getStartAndEnd.start,
      end = getStartAndEnd.end,
      startFrom = this.constrainFrom(Math.floor(start / itemSize) * itemsPerRow, length, itemsPerRow),
      size = this.constrainSize((Math.ceil((end - start) / itemSize) + 1) * itemsPerRow, length, pageSize, startFrom);
    return this.setState({ itemsPerRow : itemsPerRow, startFrom : startFrom, itemSize : itemSize, size : size });
  },

  getSpaceBefore : function(index) {
    var { itemSize, itemsPerRow } = this.state,
      space = 0;
    if ( itemSize ) return Math.ceil(index / itemsPerRow) * itemSize;
    for ( var i=0; i<index; i++ ) {
      var _itemSize = this.getSizeOf(i);
      if ( isNaN(_itemSize) ) break;
      space += _itemSize;
    }
    return space;
  },

  cacheSizes : function() {
    var cache = this.cache,
      { startFrom } = this.state,
      itemEls = this.getDOMNode(this.items).children,
      sizeKey = SIZE_KEYS[this.props.axis];
    for ( var i=0, l=itemEls.length; i<l; i++ ) {
      cache[startFrom + i] = itemEls[i].getBoundingClientRect()[sizeKey];
    }
  },

  getSizeOf : function(index) {
    var { itemSize } = this.state;
    if ( itemSize ) return itemSize;
    var itemSizeGetter = this.props.itemSizeGetter;
    if ( itemSizeGetter ) return itemSizeGetter(index);
    var cache = this.cache;
    if ( cache[index] ) return cache[index];
    return NaN;
  },

  constrainFrom : function(startFrom, length, itemsPerRow) {
    if ( this.props.type === 'simple' ) return 0;
    if ( !startFrom ) return 0;
    return Math.max(Math.min(startFrom, length - itemsPerRow - length % itemsPerRow), 0);
  },

  constrainSize : function(size, length, pageSize, startFrom) {
    return Math.min(Math.max(size, pageSize), length - startFrom);
  },

  scrollTo : function(index) {
    this.setScroll(this.getSpaceBefore(index));
  },

  scrollAround : function(index) {
    var current = this.getScroll(),
      max = this.getSpaceBefore(index);
    if ( current > max ) return this.setScroll(max);
    var min = max - this.getViewportSize() + this.getSizeOf(index);
    if ( current < min ) this.setScroll(min);
  },

  getItems : function() {
    var uiList = this,
      { startFrom, size } = this.state,
      items = [];
    for ( var i=0; i<size; i++ ) {
      items.push(this.props.item(startFrom + i, i));
    }
    return this.props.itemsList(items, function(c) {
      return uiList.items = c;
    });
  },

  render : function() {
    var items = this.getItems();
    console.log('>>> Items', this.items);
    if ( this.props.type === 'simple' ) return items;
    var axis = this.props.axis,
      size = this.getSpaceBefore(this.props.length),
      offset = this.getSpaceBefore(this.state.startFrom),
      x = (axis === 'x') ? offset : 0,
      y = (axis === 'y') ? offset : 0,
      transform = 'translate(' + x + 'px, ' + y + 'px)',
      listStyle = { position : 'relative' },
      containerStyle = { WebkitTransform : transform, transform : transform };

    if ( size && axis === 'x' ) listStyle.overflowX = 'hidden';
    listStyle[SIZE_KEYS[axis]] = size;
    return (
      <div style={listStyle}>
        <div style={containerStyle}>
          {items}
        </div>
      </div>
    );
  }

});

module.exports = UIList;