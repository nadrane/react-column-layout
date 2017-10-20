"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _range = require("./range");

var _range2 = _interopRequireDefault(_range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Gallery = function (_React$Component) {
  _inherits(Gallery, _React$Component);

  function Gallery(props) {
    _classCallCheck(this, Gallery);

    var _this = _possibleConstructorReturn(this, (Gallery.__proto__ || Object.getPrototypeOf(Gallery)).call(this, props));

    _this.state = {
      galleryWidth: 0
    };
    _this.handleResize = _this.handleResize.bind(_this);
    return _this;
  }

  _createClass(Gallery, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        galleryWidth: this._galleryDiv.clientWidth
      });

      window.addEventListener("resize", this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.setState({
        galleryWidth: this._galleryDiv.clientWidth
      });
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {}
  }, {
    key: "getColumnWidth",
    value: function getColumnWidth(columnMinWidth, gutter, desiredMargin) {
      var _this2 = this;

      var galleryWidth = this.state.galleryWidth;

      var numberOfColumns = this.getNumberOfColumns(columnMinWidth, gutter, desiredMargin);
      var columnMaxWidth = columnMinWidth * 2;
      var computeMargin = function computeMargin(columnWidth) {
        return galleryWidth - _this2.computeWidth(numberOfColumns, columnWidth, gutter);
      };
      var distanceFromIdeal = function distanceFromIdeal(column) {
        return Math.abs(column.margin - desiredMargin);
      };
      var bestMargin = function bestMargin(column1, column2) {
        return distanceFromIdeal(column1) > distanceFromIdeal(column2) ? column2 : column1;
      };

      // TODO we can easily reduce this from O(N) to log(N) with a binary search of some sort
      var bestColumnWidth = {
        margin: Infinity,
        columnWidth: (columnMinWidth + columnMaxWidth) / 2
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _range2.default)(columnMinWidth, columnMaxWidth)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var columnWidth = _step.value;

          var margin = computeMargin(columnWidth);
          bestColumnWidth = margin > 0 ? bestMargin({ columnWidth: columnWidth, margin: margin }, bestColumnWidth) : bestColumnWidth;
          // The margin will only get farther from the ideal after this point
          if (margin < desiredMargin) break;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return bestColumnWidth.columnWidth;
    }
  }, {
    key: "getNumberOfColumns",
    value: function getNumberOfColumns(columnWidth, gutter, margin) {
      var galleryWidth = this.state.galleryWidth;

      // Sometimes when the DOM is initializing, the width of the element will be 0

      if (galleryWidth === 0) return 1;

      margin *= 2;
      var numberOfColumns = Math.floor((galleryWidth - margin) / (columnWidth + gutter));

      /* Because we round down, it's possible to have a zero columns acording to the above calculation. Obviously this is ridiculous. Remember that we calculate the number of columns
      using the maximum column width! This means that although for the maximum width, a single
      column might be too large, there still might (not really might but better be otherwise we need a wider column range) be a a column width within range that allows a single column to fit.
      */
      return numberOfColumns <= 0 ? 1 : numberOfColumns;
    }
  }, {
    key: "initializeColumnMinimums",
    value: function initializeColumnMinimums(numberOfColumns) {
      return new Array(numberOfColumns).fill(0);
    }
  }, {
    key: "getPhotoOffsetOfNextPhoto",
    value: function getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter) {
      var minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
      return {
        x: minimumColumnIndex * columnWidth + minimumColumnIndex * gutter,
        y: columnMinimums[minimumColumnIndex] + gutter
      };
    }
  }, {
    key: "findMinimumColumnIndex",
    value: function findMinimumColumnIndex(columnMinimums) {
      return columnMinimums.indexOf(Math.min.apply(Math, _toConsumableArray(columnMinimums)));
    }
  }, {
    key: "findMaxColumnHeight",
    value: function findMaxColumnHeight(columnMinimums) {
      if (columnMinimums.length === 0) return 0;
      return Math.max.apply(Math, _toConsumableArray(columnMinimums));
    }
  }, {
    key: "updateColumnMiniums",
    value: function updateColumnMiniums(photo, scalingFactor, gutter, columnMinimums) {
      var minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
      columnMinimums[minimumColumnIndex] += Math.round(photo.thumbnailHeight * scalingFactor + gutter);
      return columnMinimums;
    }
  }, {
    key: "computeWidth",
    value: function computeWidth(numberOfColumns, columnWidth, gutter) {
      if (numberOfColumns === 0) return 0;
      return numberOfColumns * columnWidth + (numberOfColumns - 1) * gutter;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var galleryStyle = {
        position: "relative", // So that the images in the gallery can be positioned absolutely: em;
        marginLeft: "auto",
        marginRight: "auto"
      };

      var imageStyle = {
        display: "block",
        width: "100%",
        cursor: "pointer"
      };

      var photoWrapperStyle = {
        width: "100%",
        padding: ".075rem"
      };

      var gutter = this.props.gutter || 3;
      var columnMinWidth = this.props.columnMinWidth || 100;
      var margin = this.props.margin || 20;
      var _props = this.props,
          photos = _props.photos,
          clickHandler = _props.clickHandler;


      var numberOfColumns = this.getNumberOfColumns(columnMinWidth, gutter, margin);

      var columnWidth = this.getColumnWidth(columnMinWidth, gutter, margin);
      var columnMinimums = this.initializeColumnMinimums(numberOfColumns);

      var imgJSX = photos.map(function (photoToPlace) {
        var scalingFactor = columnWidth / photoToPlace.thumbnailWidth;
        var offset = _this3.getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter);

        columnMinimums = _this3.updateColumnMiniums(photoToPlace, scalingFactor, gutter, columnMinimums);
        photoWrapperStyle = Object.assign({}, photoWrapperStyle, {
          transform: "translateX(" + offset.x + "px) translateY(" + offset.y + "px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: columnWidth
        });
        return _react2.default.createElement(
          "div",
          { key: photoToPlace.id, style: photoWrapperStyle },
          _react2.default.createElement("img", { style: imageStyle, onClick: function onClick(e) {
              return clickHandler(e, photoToPlace);
            }, src: photoToPlace.thumbnailSrc })
        );
      });
      galleryStyle = Object.assign({}, galleryStyle, {
        height: this.findMaxColumnHeight(columnMinimums),
        width: this.computeWidth(numberOfColumns, columnWidth, gutter)
      });
      return _react2.default.createElement(
        "div",
        { ref: function ref(gallery) {
            return _this3._galleryDiv = gallery;
          } },
        _react2.default.createElement(
          "div",
          { style: galleryStyle },
          imgJSX
        )
      );
    }
  }]);

  return Gallery;
}(_react2.default.Component);

exports.default = Gallery;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;
function range(start, stop) {
  var next = start;
  var arr = [];
  while (next <= stop) {
    arr.push(next);
    next++;
  }
  return arr;
}
