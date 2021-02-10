import React from 'react';
import * as go from 'gojs';

function initDiagram(handleClick: (key: string) => void) {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    'undoManager.isEnabled': true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    model: $(go.GraphLinksModel, {
      linkKeyProperty: 'key', // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    'Auto',
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
      go.Point.stringify,
    ),

    $(
      go.Shape,
      'RoundedRectangle',
      {
        name: 'SHAPE',
        fill: 'transparent',
        strokeWidth: 1,
        height: 40,
      },
      // Shape.fill is bound to Node.data.color
    ),
    $(
      go.Picture,
      {
        position: new go.Point(100, 100),
        width: 30,
        height: 30,
        segmentOffset: new go.Point(0, 0),
        margin: 5,
        alignment: go.Spot.Left,
      },
      new go.Binding('source'),
    ),
    $(go.TextBlock, { margin: 8 }, new go.Binding('text').makeTwoWay()),

    {
      doubleClick: (e, node) => {
        diagram.zoomToRect(node.actualBounds);
      },
      click: (e, node: any) => {
        handleClick(node.part?.data.key);
        diagram.startTransaction('highlight');
        // remove any previous highlighting
        diagram.clearHighlighteds();
        // for each Link coming out of the Node, set Link.isHighlighted
        node.findLinksOutOf().each((l: any) => {
          l.isHighlighted = true;
        });
        // for each Node destination for the Node, set Node.isHighlighted
        node.findNodesOutOf().each((n: any) => {
          n.isHighlighted = true;
        });
        diagram.commitTransaction('highlight');
      },
    },
  );

  diagram.linkTemplate = $(
    go.Link,
    { curviness: 50, toShortLength: 4 },
    $(
      go.Shape,
      new go.Binding('stroke', 'isHighlighted', (h) => {
        return h ? 'red' : 'black';
      }).ofObject(),
      new go.Binding('strokeWidth', 'isHighlighted', (h) => {
        return h ? 3 : 1;
      }).ofObject(),
    ),
    $(
      go.Shape,
      { toArrow: 'Standard', strokeWidth: 0 },
      new go.Binding('fill', 'isHighlighted', (h) => {
        return h ? 'red' : 'black';
      }).ofObject(),
    ),
    $(go.Picture, {
      source: '/images/plane-icon.svg',
      width: 30,
      height: 30,
      segmentOffset: new go.Point(0, 0),
    }),
  );

  // when the user clicks on the background of the Diagram, remove all highlighting
  diagram.click = (e) => {
    e.diagram.commit((d) => {
      d.clearHighlighteds();
      handleClick('');
    }, 'no highlighteds');
  };

  return () => diagram;
}

export default initDiagram;
