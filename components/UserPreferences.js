import React, { useState, useEffect } from 'react';
import { fetchTypesList } from '../services/pokeapi';

const UserPreferences = ({ onPreferenceSelect }) => {
  const [preferences, setPreferences] = useState([]);
  const [selectedPreference, setSelectedPreference] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [types, setTypes] = useState([]);
  const [newPreference, setNewPreference] = useState('');

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences')) || [];
    setPreferences(savedPreferences);

    // Fetch types for the modal dropdown
    const fetchTypes = async () => {
      try {
        const data = await fetchTypesList();
        setTypes(data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  // Handle preference selection
  const handlePreferenceChange = (e) => {
    const selected = e.target.value;
    setSelectedPreference(selected);
    onPreferenceSelect(selected);
  };

  // Open modal
  const handleAddPreference = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewPreference('');
  };

  // Handle new preference selection in modal
  const handleNewPreferenceChange = (e) => {
    setNewPreference(e.target.value);
  };

  // Add new preference
  const handleNewPreferenceSubmit = (e) => {
    e.preventDefault();
    if (newPreference && !preferences.includes(newPreference)) {
      const updatedPreferences = [...preferences, newPreference];
      setPreferences(updatedPreferences);
      localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    }
    handleModalClose();
  };

  return (
    <div className="mb-6">
      {/* User Preference Dropdown */}
      <label htmlFor="userPreference" className="block text-gray-700 dark:text-gray-200 mb-2">
        User Preference
      </label>
      <select
        id="userPreference"
        value={selectedPreference}
        onChange={handlePreferenceChange}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="">Select Preference</option>
        {preferences.map((preference, index) => (
          <option key={index} value={preference}>
            {preference}
          </option>
        ))}
      </select>

      {/* Add User Preference Button */}
      <button
        onClick={handleAddPreference}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add User Preference
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Add User Preference
            </h2>
            <form onSubmit={handleNewPreferenceSubmit}>
              <label htmlFor="newPreference" className="block text-gray-700 dark:text-gray-200 mb-2">
                Select Type
              </label>
              <select
                id="newPreference"
                value={newPreference}
                onChange={handleNewPreferenceChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white mb-4"
                required
              >
                <option value="">Select Type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferences;
