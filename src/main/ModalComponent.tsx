// src/main/ModalComponent.tsx
import React from 'react';

const ModalComponent: React.FC = () => {
  return (
    <div id="houseModal" className="modal">
      <div className="modal-content">
        <span className="close">&times;</span>
        <h2 id="modalTitle"></h2>
        <div id="modalContent"></div>
      </div>
    </div>
  );
};

export default ModalComponent;
