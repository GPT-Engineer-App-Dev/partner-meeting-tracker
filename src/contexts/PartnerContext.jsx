import React, { createContext, useState, useContext, useEffect } from 'react';

const PartnerContext = createContext();

export const usePartners = () => useContext(PartnerContext);

export const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const storedPartners = localStorage.getItem('designPartners');
    if (storedPartners) {
      setPartners(JSON.parse(storedPartners));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('designPartners', JSON.stringify(partners));
  }, [partners]);

  const addPartner = (partner) => {
    setPartners([...partners, { ...partner, id: Date.now() }]);
  };

  const updatePartner = (updatedPartner) => {
    setPartners(partners.map(p => p.id === updatedPartner.id ? updatedPartner : p));
  };

  const deletePartner = (id) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  return (
    <PartnerContext.Provider value={{ partners, addPartner, updatePartner, deletePartner }}>
      {children}
    </PartnerContext.Provider>
  );
};