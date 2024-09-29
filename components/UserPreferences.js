import React from 'react';
import { getUserPreferences } from '../services/configService';

const UserPreferences = ({ onPreferenceSelect }) => {
  const preferences = getUserPreferences();

  return (
    <div className="user-preferences">
      <button onClick={() => onPreferenceSelect(preferences.preferredType)}>
        Show {preferences.preferredType} Pokémon
      </button>
    </div>
  );
};

export default UserPreferences;
