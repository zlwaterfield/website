"use client";

import { init, Cursors as ICursors } from '@instantdb/react';
import { ReactNode } from 'react';

const db = init({ appId: "59aafa92-a900-4b3d-aaf1-45032ee8d415" });
const presenceRoom = db.room('zlwaterfield-website-p', 'zlwaterfield-website-p-main');
const cursorsRoom = db.room('zlwaterfield-website-c', 'zlwaterfield-website-c-main');

const userId = Math.random().toString(36).slice(2, 6);
const randomDarkColor = '#' + [0, 0, 0].map(() => Math.floor(Math.random() * 200).toString(16).padStart(2, '0')).join('');

export const PresenceIndicator = () => {
    presenceRoom.useSyncPresence({ name: userId, color: randomDarkColor });
  
    const presence = presenceRoom.usePresence();
  
    return (
      <div className="fixed top-0 right-0 m-4">
        {presence.user ? (
          <Avatar key={'user'} name={presence.user.name} color={presence.user.color} />
        ) : null}
        {Object.entries(presence.peers).map(([id, peer]) => (
          <Avatar key={id} name={peer.name} color={peer.color} />
        ))}
      </div>
    );
  }
  
  function Avatar({ name, color }: { name: string; color: string }) {
    return (
      <div key={'user'} className={avatarClassNames} style={{ borderColor: color, }}>
        {name?.slice(0, 1)}
        <div className="hidden group-hover:flex absolute z-10 bottom-10 text-sm text-gray-800 bg-gray-200 rounded px-2">
          {name}
        </div>
      </div>
    );
  }
  
  const avatarClassNames = 'group relative select-none h-10 w-10 bg-gray-50 border border-4 border-black user-select rounded-full first:ml-0 flex justify-center items-center -ml-2 first:ml-0 relative';
  
  export const Cursors = ({ children }: { children: ReactNode }) => {
    return (
        <ICursors room={cursorsRoom} userCursorColor={randomDarkColor} className={cursorsClassNames}>
            {children}
        </ICursors>
    );
  }
  
  const cursorsClassNames = 'flex h-screen w-screen items-center justify-center overflow-hidden font-mono text-sm text-gray-800';