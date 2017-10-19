import React, { Component } from "react";
import ReactDOM from "react-dom";
import ColumnLayout from "../src";

let photos = [
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/200/400",
    thumbnailWidth: 200,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/200/400",
    thumbnailWidth: 200,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/200/400",
    thumbnailWidth: 200,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/200/400",
    thumbnailWidth: 200,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/300/200",
    thumbnailWidth: 300,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/250/200",
    thumbnailWidth: 250,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/600/400",
    thumbnailWidth: 600,
    thumbnailHeight: 400
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/1000",
    thumbnailWidth: 400,
    thumbnailHeight: 1000
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  },
  {
    thumbnailSrc: "http://lorempixel.com/400/200",
    thumbnailWidth: 400,
    thumbnailHeight: 200
  }
];
let id = 0
photos = photos.map(photo => {
  photo.id = ++id;
  return photo;
})
class Demo extends Component {
  render() {
    return <ColumnLayout columnMinWidth={300} margin={15} gutter={2} photos={photos} />;
  }
}
ReactDOM.render(<Demo />, document.getElementById("demo"));
