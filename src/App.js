import WebViewer from '@pdftron/webviewer';
import React, { useEffect, useRef } from 'react';
import './App.css';

const polygonRedactToolBase64 = "data:image/png;base64,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"

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
        initialDoc: '/files/newsletter.pdf',
        enableFilePicker: true,
        enableRedaction: true,
        fullAPI: true,
        licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations, Tools } = instance.Core;

      const polyRedactTool = new instance.Core.Tools.PolygonCreateTool(documentViewer);
      polyRedactTool.redactionAnnotations = [];
      instance.UI.registerTool({ toolName: "PolygonRedactCreateTool", toolObject: polyRedactTool, buttonImage: polygonRedactToolBase64, });
      instance.UI.setHeaderItems(header => {
        const toolbarHeader = header.getHeader('toolbarGroup-Redact')
        const items = toolbarHeader.getItems();
        items.splice(3, 0,
          {
            type: 'toolButton',
            toolName: 'PolygonRedactCreateTool',
          }
        )
      });

      let quads = []

      polyRedactTool.addEventListener("annotationAdded", async (annot) => {
        await createRedactedPolygon(annot);
      })

      const createRedactedPolygon = async (polygon) => {
        const polyPoints = polygon.getPath();
        const largestRectangle = getPolygonBoundingRectangle(polyPoints);
        const depth = 6;

        const rectFullyWithinPoly = isRectFullyWithinPolygon(largestRectangle, polygon);
        if (rectFullyWithinPoly) {
          return;
        }

        await splitRectangle(largestRectangle, polygon, polyPoints, depth);

        const annot = new Annotations.RedactionAnnotation({
          PageNumber: documentViewer.getCurrentPage(),
          Quads: quads,
          StrokeColor: new Annotations.Color(255, 0, 0, 1),
          IsText: true,
        });

        annotationManager.addAnnotation(annot);
        annotationManager.redrawAnnotation(annot);
        await annotationManager.applyRedactions([annot]);
        quads = [];
      }

      const splitRectangle = async (rectangle, polygon, polyPoints, depth) => {
        if (depth === 0) {
          return;
        }

        const midX = (rectangle.x1 + rectangle.x2) / 2;
        const midY = (rectangle.y1 + rectangle.y2) / 2;

        const rect1 = {
          x1: rectangle.x1,
          y1: rectangle.y1,
          x2: midX,
          y2: midY
        };

        const rect2 = {
          x1: midX,
          y1: rectangle.y1,
          x2: rectangle.x2,
          y2: midY
        };

        const rect3 = {
          x1: rectangle.x1,
          y1: midY,
          x2: midX,
          y2: rectangle.y2
        };

        const rect4 = {
          x1: midX,
          y1: midY,
          x2: rectangle.x2,
          y2: rectangle.y2
        };

        const rects = [rect1, rect2, rect3, rect4];

        // For each split rectangle we need to check if is is fully within the polygon
        for (let i = 0; i < rects.length; i++) {
          const rectFullyWithinPoly = isRectFullyWithinPolygon(rects[i], polygon);
          if (rectFullyWithinPoly) {
            // convert Rect to Quad
            const padding = 2
            const quad = new Annotations.Quad(
              rects[i].x1 - padding, rects[i].y1 -padding,
              rects[i].x2 + padding, rects[i].y1 - padding, 
              rects[i].x2 + padding, rects[i].y2 + padding, 
              rects[i].x1 - padding, rects[i].y2 + padding
            );
            quads.push(quad);
          }
          if (!rectFullyWithinPoly) {
            await splitRectangle(rects[i], polygon, polyPoints, depth - 1);
          }
        }
      }

      // This gets the rectangle that surrounds the entire polygon
      const getPolygonBoundingRectangle = (polygonPoints) => {
        const highestPoint = polygonPoints.reduce((acc, point) => {
          return point.y < acc.y ? point : acc;
        })

        const lowestPoint = polygonPoints.reduce((acc, point) => {
          return point.y > acc.y ? point : acc;
        });

        const leftMostPoint = polygonPoints.reduce((acc, point) => {
          return point.x < acc.x ? point : acc;
        });

        const rightMostPoint = polygonPoints.reduce((acc, point) => {
          return point.x > acc.x ? point : acc;
        });

        const points = {
          x1: leftMostPoint.x,
          y1: highestPoint.y,
          x2: rightMostPoint.x,
          y2: lowestPoint.y

        }
        return points;
      }

      // Checks if the rectangle is fully within the polygon
      const isRectFullyWithinPolygon = (rectangle, polygon) => {
        const polyPoints = polygon.getPath();
        const rectPoints = [
          { x: rectangle.x1, y: rectangle.y1 },
          { x: rectangle.x2, y: rectangle.y1 },
          { x: rectangle.x2, y: rectangle.y2 },
          { x: rectangle.x1, y: rectangle.y2 }
        ];

        for (let i = 0; i < rectPoints.length; i++) {
          if (!isPointWithinPolygon(rectPoints[i], polyPoints)) {
            return false;
          }
        }

        return true;
      }

      // Checks if a given point is within a set of polygon points
      const isPointWithinPolygon = (point, polyPoints) => {
        let isInside = false;
        for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          if ((polyPoints[i].y > point.y) !== (polyPoints[j].y > point.y) &&
            (point.x < (polyPoints[j].x - polyPoints[i].x) * (point.y - polyPoints[i].y) / (polyPoints[j].y - polyPoints[i].y) + polyPoints[i].x)) {
            isInside = !isInside;
          }
        }
        return isInside;
      }

    });

  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
