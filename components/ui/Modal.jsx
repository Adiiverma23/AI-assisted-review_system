/**
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {ReactNode} children
 */
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;