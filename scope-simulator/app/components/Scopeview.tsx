// components/ScopeView.tsx
'use client';

import Slider from '@mui/material/Slider';
import { useMemo, useState } from 'react';
import Crosshairs from './Crosshairs';

const ScopeView = () => {
    const [zoom, setZoom] = useState(1);
    const [distance, setDistance] = useState(10); // meters
    const [targetWidth, setTargetWidth] = useState(1); // target width in meters
    const [targetHeight, setTargetHeight] = useState(1); // target height in meters

    const handleZoomChange = (
        event: Event | React.SyntheticEvent,
        newValue: number | number[]
    ) => {
        if (typeof newValue === 'number') {
            setZoom(newValue);
        }
    };

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value > 0) {
            setDistance(value);
        }
    };

    const handleTargetWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value > 0) {
            setTargetWidth(value);
        }
    };

    const handleTargetHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value > 0) {
            setTargetHeight(value);
        }
    };

    const scaleFactor = 100; // pixels per meter at 1m distance

    // Calculate size based on target dimensions and distance
    const baseWidth = (targetWidth / distance) * scaleFactor;
    const baseHeight = (targetHeight / distance) * scaleFactor;

    const displayedSize = useMemo(() => {
        const width = Math.max(baseWidth * zoom, 10);
        const height = Math.max(baseHeight * zoom, 10);
        return { width, height };
    }, [baseWidth, baseHeight, zoom]);

    const zoomMarks = [
        { value: 1, label: '1x' },
        { value: 5, label: '5x' },
        { value: 10, label: '10x' },
        { value: 20, label: '20x' },
    ];

    return (
        <div className="scope-container">
            {/* Image and overlay */}
            <div className="image-wrapper">
                <div
                    className="background-image"
                    style={{
                        transform: `scale(${zoom})`,
                    }}
                >
                    {/* Target rectangle with width and height */}
                    <div
                        className="target-rectangle"
                        style={{
                            width: `${displayedSize.width}px`,
                            height: `${displayedSize.height}px`,
                        }}
                    />
                    {/* Crosshairs overlay */}
                    <Crosshairs />
                </div>
            </div>

            {/* Controls */}
            <div className="controls">
                {/* Distance input */}
                <div className="control-group">
                    <label htmlFor="distance-input" className="label">
                        Distance (meters):
                    </label>
                    <input
                        id="distance-input"
                        type="number"
                        value={distance}
                        onChange={handleDistanceChange}
                        step={0.1}
                        min={0.1}
                        className="distance-input"
                    />
                </div>
                {/* Target Width input */}
                <div className="control-group">
                    <label htmlFor="target-width-input" className="label">
                        Target Width (m):
                    </label>
                    <input
                        id="target-width-input"
                        type="number"
                        value={targetWidth}
                        onChange={handleTargetWidthChange}
                        step={0.1}
                        min={0.1}
                        className="dimension-input"
                    />
                </div>
                {/* Target Height input */}
                <div className="control-group">
                    <label htmlFor="target-height-input" className="label">
                        Target Height (m):
                    </label>
                    <input
                        id="target-height-input"
                        type="number"
                        value={targetHeight}
                        onChange={handleTargetHeightChange}
                        step={0.1}
                        min={0.1}
                        className="dimension-input"
                    />
                </div>
                {/* Zoom slider */}
                <div className="zoom-label">Zoom: {zoom.toFixed(1)}x</div>
                <Slider
                    aria-label="Zoom level"
                    value={zoom}
                    onChange={handleZoomChange}
                    getAriaValueText={(value) => `${value}x`}
                    valueLabelDisplay="auto"
                    step={0.5}
                    marks={zoomMarks}
                    min={1}
                    max={20}
                    className="zoom-slider"
                />
            </div>
            <style jsx>{`
        .scope-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
          gap: 2rem;
          width: 100%;
          padding: 2rem;
          box-sizing: border-box;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f9f9f9;
        }

        .image-wrapper {
          position: relative;
          flex: 1 1 300px;
          max-width: 70%;
          aspect-ratio: 3 / 2;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          background-color: #fff;
        }

        .background-image {
          width: 100%;
          height: 100%;
          background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80');
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
          border-radius: 50%;
          position: relative;
        }

        .target-rectangle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid #3f51b5;
          background-color: rgba(63, 81, 181, 0.2);
          border-radius: 4px; /* Optional: for rectangle shape */
        }

        .controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 200px;
        }

        .control-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .label {
          font-weight: 600;
          font-size: 0.9rem;
          color: #555;
        }

        .distance-input,
        .dimension-input {
          width: 80px;
          margin-left: 0.75rem;
          padding: 0.4rem 0.6rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .distance-input:focus,
        .dimension-input:focus {
          border-color: #3f51b5;
          outline: none;
        }

        .zoom-label {
          margin-bottom: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          color: #333;
        }

        .zoom-slider {
          width: 200px;
        }

        @media(max-width: 768px) {
          .scope-container {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
          }

          .image-wrapper {
            max-width: 90%;
            aspect-ratio: auto;
            height: auto;
          }

          .zoom-slider {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
};

export default ScopeView;