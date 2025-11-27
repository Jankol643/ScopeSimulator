'use client';

import React from 'react';

const Crosshairs: React.FC = () => {
    const dotCount = 20; // total mildots on each axis
    const halfCount = Math.floor(dotCount / 2);
    const spacing = 20; // spacing between dots in pixels

    // Generate array for dots
    const dots = Array.from({ length: dotCount }, (_, i) => i - halfCount);

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Vertical Center Line */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: '1px',
                    height: '100%',
                    backgroundColor: 'black',
                    transform: 'translateX(-50%)',
                }}
            />

            {/* Horizontal Center Line */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'black',
                    transform: 'translateY(-50%)',
                }}
            />

            {/* Vertical dots */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {dots.map((i) => (
                    <div
                        key={`vertical-dot-${i}`}
                        style={{
                            margin: `${Math.abs(i) * spacing}px 0`,
                            width: '8px', // increased size
                            height: '8px',
                            backgroundColor: 'black',
                            borderRadius: '50%',
                            border: '1px solid white', // optional outline for visibility
                        }}
                    />
                ))}
            </div>

            {/* Horizontal dots */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    transform: 'translateY(-50%)',
                }}
            >
                {dots.map((i) => (
                    <div
                        key={`horizontal-dot-${i}`}
                        style={{
                            margin: `0 ${Math.abs(i) * spacing}px`,
                            width: '8px', // increased size
                            height: '8px',
                            backgroundColor: 'black',
                            borderRadius: '50%',
                            border: '1px solid white', // optional outline
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Crosshairs;