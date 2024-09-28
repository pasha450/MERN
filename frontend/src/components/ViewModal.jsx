import React from 'react';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function ViewModal({ isOpened, onClosed, developers }) {
  return (
    <>
      <Modal show={isOpened} onHide={onClosed} animation={false}>
        <div className="puu-left">
          <button
            type="button"
            className="btn-close pull-right p-3"
            onClick={onClosed}>
          </button>
        </div>

        <Modal.Body>
          <div className="want-to-edit">
            <div className="popup-heading-block text-center">
              <img src="/assests/images/red-flag-bg.svg" className="img-fluid w-25" alt="" />
              <h3>View For Multiple Images</h3>
              <p>Show here Multiple  Images</p>
            </div>

            {/* Display multiple developer images and names */}
            <div className="developer-list mt-4">
              {developers && developers.length > 0 ? (
                developers.map((developer, index) => (
                  <div key={index} className="developer-item d-flex align-items-center mb-3">
                    <img src={developer.profileImage} alt={developer.name}
                      className="img-fluid rounded-circle"
                      style={{ 
                        width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                           marginRight: '10px' 
                        }}
                    />
                    <span>{developer.name}</span>
                  </div>
                ))
              ) : (
                <p>No developers assigned.</p>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewModal;
