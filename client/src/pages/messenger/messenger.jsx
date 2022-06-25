import React from 'react';
import './messenger.css';
import Topbar from '../../components/topbar/topbar';

export default function Messenger() {
  return (
      <>
        <Topbar/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">

                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">

                </div>
            </div>
        </div>
      </>
  )
}
