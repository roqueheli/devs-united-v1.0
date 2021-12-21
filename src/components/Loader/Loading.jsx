import React from 'react';
import '../../styles/loading.css';

function Loading() {
    return (
        <div className="loader_container">
            <div className="loader">
                <div className="loader-inner ball-grid-beat">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Loading;
