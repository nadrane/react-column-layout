# React-Column-Layout

This React component will allow you to render photos of potentially varying heights in a column-based layout.

# Installation

```npm install --save react-column-layout```

# Features

A dynamic number of columns designed to fit the screen. Media queries and breakpoints not needed!
- Images automatically and intelligently resize as screen size adjusts.
- Customizable margins and gutters (space between images).
- Specifiable minimum and maximum image widths.

# Demo

# Usage
```js
const photos = [
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

class Demo extends Component {
  render() {
    return <ColumnLayout columnMinWidth={300} margin={15} gutter={2} photos={photos} />;
  }
}
```
