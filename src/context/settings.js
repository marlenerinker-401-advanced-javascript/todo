import React, { useState } from 'react';

export const SettingsContext = React.createContext();


const SettingsProvider = (props) => {

  let defaultSettings = {showCompleted: true, pageMax: 2, sort: 'difficulty'};

  const [ settings, setSettings ] = useState([defaultSettings]);

  const state = {
    settings,
    changeSetting: (setting) => setSettings({...settings, setting}),
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;