"use client";
import React, { useState } from 'react';
import { Profile, Password, MangXaHoi } from './setting';

const Page = () => {
    const [view, setView] = useState('profile');

    const renderView = () => {
        switch (view) {
            case 'profile':
                return <Profile />;
            case 'password':
                return <Password />;
            case 'social':
                return <MangXaHoi />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className="col-lg-9">
            <div className="settings-wrapper-dashed">
                <h5 className="title">Settings</h5>
                <ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${view === 'profile' ? 'active' : ''}`}
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected={view === 'profile'}
                            onClick={() => setView('profile')}
                        >
                            Profile
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${view === 'password' ? 'active' : ''}`}
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected={view === 'password'}
                            onClick={() => setView('password')}
                        >
                            Password
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${view === 'social' ? 'active' : ''}`}
                            id="pills-profile-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-profile"
                            type="button"
                            role="tab"
                            aria-controls="pills-profile"
                            aria-selected={view === 'social'}
                            onClick={() => setView('social')}
                        >
                            Social
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    {renderView()}
                </div>
            </div>
        </div>
    );
};

export default Page;