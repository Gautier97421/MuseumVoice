import React from 'react';
import './BottomNav.css';

const BottomNav = () => {
    return (
        <div className="bottom-nav-container">
            {/* Nav Hint */}
            <div className="nav-hint">
                <span className="arrow">←</span>
                <span className="hint-text">Glissez pour naviguer</span>
                <span className="arrow">→</span>
            </div>

            {/* Main Bar */}
            <div className="bottom-nav-bar">
                <div className="nav-item">
                    {/* Hamburger Icon SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="nav-label">menu</span>
                </div>

                <div className="nav-item">
                    {/* Map Pin Icon SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="nav-label">carte</span>
                </div>
            </div>
        </div>
    );
};

export default BottomNav;
