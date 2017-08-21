# React-Column-Layout

This React component will allow you to render photos of potentially varying heights in a column-based layout.

# Installation

```npm install --save react-column-layout```

# Features

A dynamic number of columns designed to fit the screen. Media queries and breakpoints not needed!
Images automatically and intelligently resize as screen size adjusts.
Customizable margins and gutters (space between images).
Specifiable minimum and maximum image widths.

# Demo

# Usage

Simply pass a list of nodes to the <Columns> component and either set a fixed number of columns or pass in a set of media queries for it to respond to. If you know the dimensions of your nodes upfront you can pass those in as a separate property and Columns will fill up the columns more intelligently by looping through the nodes and always adding it to the shortest column.
