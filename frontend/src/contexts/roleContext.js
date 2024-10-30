import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const useRoleContext = () => useContext(RoleContext);

const RoleProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/roles');
        if (!response.ok) {
          throw new Error('Failed to fetch roles');
        }
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles(); 
  }, []);

  const value = { roles };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export default RoleProvider;