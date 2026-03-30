import React from 'react';
import { IoClose } from 'react-icons/io5';
import './ElitePawsContactModal.scss';

export default function ElitePawsContactModal({ isClosing, onClose }) {
  return (
    <div className={`elite-paws-contact-modal-wrap ${isClosing ? 'is-closing' : 'is-open'}`}>
      <button
        type="button"
        className="elite-paws-contact-modal-backdrop"
        onClick={onClose}
        aria-label="Close contact form"
      />

      <section className="elite-paws-contact-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          className="elite-paws-contact-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose />
        </button>

        <div className="elite-paws-contact-modal-content">
          <p className="elite-paws-contact-modal-step">01</p>
          <h3>Tell us a little bit of you</h3>

          <form className="elite-paws-contact-modal-form">
            <label>
              First name
              <input type="text" placeholder="Bill" />
            </label>
            <label>
              Name
              <input type="text" placeholder="Trumendous" />
            </label>
            <label>
              Company
              <input type="text" placeholder="..." />
            </label>
            <label>
              E-mail
              <input type="email" placeholder="name@mail.com" />
            </label>
            <label className="full">
              Phone
              <input type="tel" placeholder="06 12 34 56 78" />
            </label>
          </form>

          <div className="elite-paws-contact-modal-actions">
            <button type="button" className="ghost">Previous</button>
            <button type="button" className="primary">Final step</button>
          </div>
          <p className="elite-paws-contact-modal-note">All fields are required</p>
        </div>
      </section>
    </div>
  );
}
