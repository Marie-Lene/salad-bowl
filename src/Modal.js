export default function Modal({ toggleModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button
          onClick={() => {
            toggleModal();
          }}
          className="modal-close"
        >
          &times;
        </button>
        <h2>Hit space to mix your bowl!</h2>
        <p>Get inspired with simple, healthy and nutritious salad bowls.</p>
      </div>
    </div>
  );
}
