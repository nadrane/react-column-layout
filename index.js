"use strict";

import React from "react";
import { range, debounce } from "lodash";

import { gallery, image, photoWrapper } from "./gallery.scss";

let galleryStyle = {
  position: "relative", // So that the images in the gallery can be positioned absolutely: em;
  marginLeft: "auto",
  marginRight: "auto",
}

const imageStyle = {
  display: "block",
  width: "100%",
  cursor: "pointer",
}

const photoWrapperStyle = {
  width: "100%",
  padding: ".075rem",
}

export default class columnLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryWidth: 0
    };
    this.handleResize = this.handleResize.bind(this);
    // this.handleResize = debounce(this.handleResize.bind(this), 50, {
    //   leading: true
    // });
  }

  componentDidMount() {
    this.setState({
      galleryWidth: this._galleryDiv.clientWidth
    });

    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({
      galleryWidth: this._galleryDiv.clientWidth
    });
  }

  componentWillUpdate() {}

  getColumnWidth(columnMinWidth, columnMaxWidth, gutter, idealMargin) {
    const { galleryWidth } = this.state;
    const errorInMarginTolerance = 10;
    const numberOfColumns = this.getNumberOfColumns((columnMaxWidth + columnMinWidth) / 2, gutter, idealMargin);

    const computeMargin = columnWidth => galleryWidth - this.computeWidth(numberOfColumns, columnWidth, gutter);
    const nearby = (value1, value2) => Math.abs(value1 - value2) < errorInMarginTolerance;
    const distanceFromIdeal = column => Math.abs(column.margin - idealMargin);
    const bestMargin = (column1, column2) =>
      distanceFromIdeal(column1) > distanceFromIdeal(column2) ? column2 : column1;

    // TODO we can easily reduce this from O(N) to log(N) with a binary search of some sort
    // +1 is necessary because the range function's maximum is not inclusive
    const calculatedColumnWidth = range(columnMinWidth, columnMaxWidth + 1).reduce(
      (bestColumnWidth, columnWidth) => {
        const margin = computeMargin(columnWidth);
        return margin > 0 ? bestMargin({ columnWidth, margin }, bestColumnWidth) : bestColumnWidth;
      },
      {
        margin: Infinity,
        columnWidth: (columnMinWidth + columnMaxWidth) / 2
      }
    ).columnWidth;

    if (!nearby(idealMargin, computeMargin(calculatedColumnWidth))) {
      console.warn(
        `Warning: Could not caclulate a column width that creates a margin equal to your idealMargin+/-10px (${idealMargin - 10}px - ${idealMargin + 10}px). Please increase the range between columnMinWidth and columnMaxWidth. Generally increasing the columnMaxWidth helps.`
      );
    }
    return calculatedColumnWidth;
  }

  getColumnRange(columnMinWidth, columnMaxWidth) {
    return range(this.getNumberOfColumns(columnMinWidth), this.getNumberOfColumns(columnMaxWidth));
  }

  getNumberOfColumns(columnWidth, gutter, margin) {
    const { galleryWidth } = this.state;

    // Sometimes when the DOM is initializing, the width of the element will be 0
    if (galleryWidth === 0) return 1;

    margin *= 2;
    const numberOfColumns = Math.floor((galleryWidth - margin) / (columnWidth + gutter));

    /* Because we round down, it's possible to have a zero columns acording to the above calculation. Obviously this is ridiculous. Remember that we calculate the number of columns
    using the maximum column width! This means that although for the maximum width, a single
    column might be too large, there still might (not really might but better be otherwise we need a wider column range) be a a column width within range that allows a single column to fit.
    */
    return numberOfColumns <= 0 ? 1 : numberOfColumns;
  }

  initializeColumnMinimums(numberOfColumns) {
    return new Array(numberOfColumns).fill(0);
  }

  getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter) {
    const minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
    return {
      x: minimumColumnIndex * columnWidth + minimumColumnIndex * gutter,
      y: columnMinimums[minimumColumnIndex] + gutter
    };
  }

  findMinimumColumnIndex(columnMinimums) {
    return columnMinimums.indexOf(Math.min(...columnMinimums));
  }

  findMaxColumnHeight(columnMinimums) {
    if (columnMinimums.length === 0) return 0;
    return Math.max(...columnMinimums);
  }

  updateColumnMiniums(photo, scalingFactor, gutter, columnMinimums) {
    const minimumColumnIndex = this.findMinimumColumnIndex(columnMinimums);
    columnMinimums[minimumColumnIndex] += Math.round(photo.thumbnailHeight * scalingFactor + gutter);
    return columnMinimums;
  }

  computeWidth(numberOfColumns, columnWidth, gutter) {
    if (numberOfColumns === 0) return 0;
    return numberOfColumns * columnWidth + (numberOfColumns - 1) * gutter;
  }

  render() {
    const gutter = this.props.gutter || 10;
    const columnMinWidth = this.props.columnMinWidth || 100;
    const columnMaxWidth = this.props.columnMaxWidth || 300;
    const idealMargin = this.props.idealMargin || 20;
    const { photos, clickHandler } = this.props;

    const numberOfColumns = this.getNumberOfColumns((columnMaxWidth + columnMinWidth) / 2, gutter, idealMargin);

    const columnWidth = this.getColumnWidth(columnMinWidth, columnMaxWidth, gutter, idealMargin);
    let columnMinimums = this.initializeColumnMinimums(numberOfColumns);

    const imgJSX = photos.map(photoToPlace => {
      let scalingFactor = columnWidth / photoToPlace.thumbnailWidth;
      const offset = this.getPhotoOffsetOfNextPhoto(columnMinimums, columnWidth, gutter);

      columnMinimums = this.updateColumnMiniums(photoToPlace, scalingFactor, gutter, columnMinimums);
      const style = {
        transform: `translateX(${offset.x}px) translateY(${offset.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
        width: columnWidth
      };
      return (
        <div key={photoToPlace.id} style={photoWrapper} style={style}>
          <img style={image} onClick={e => clickHandler(e, photoToPlace)} src={photoToPlace.thumbnailSrc} />
        </div>
      );
    });
    galleryStyle = Object.assign(galleryStyle, {
      height: this.findMaxColumnHeight(columnMinimums),
      width: this.computeWidth(numberOfColumns, columnWidth, gutter),
    });

    return (
      <div ref={gallery => (this._galleryDiv = gallery)}>
        <div style={galleryStyle}>
          {imgJSX}
        </div>
      </div>
    );
  }
}
