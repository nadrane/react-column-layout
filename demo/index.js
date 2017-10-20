import React, { Component } from "react";
import ReactDOM from "react-dom";
import ColumnLayout from "../src/lib";
import range from "../src/range";

const photoSizes = [300, 400, 500, 600, 700, 800, 900];
const photos = range(0, 30).map(photoId => {
  const height = photoSizes[Math.floor(Math.random() * photoSizes.length)];
  const width = photoSizes[Math.floor(Math.random() * photoSizes.length)];
  return {
    id: photoId,
    thumbnailSrc: `http://lorempixel.com/${width}/${height}/abstract`,
    thumbnailWidth: width,
    thumbnailHeight: height
  };
});
class Demo extends Component {
  render() {
    return <ColumnLayout columnMinWidth={300} margin={15} gutter={2} photos={photos} />;
  }
}
ReactDOM.render(<Demo />, document.getElementById("demo"));
