import React, { useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './ElitePawsContactModal.scss';
import { groomingMenu } from '../../../Datasets/groomingMenu';
import { services } from '../../../Datasets/services';
import closeIconDark from '../../../assets/Icons/close-dark.png';

export default function ElitePawsContactModal({ isClosing, onClose }) {
  const [step, setStep] = useState(1);

  // As per requirement: user can pick either ONE grooming plan OR ONE other service (optional).
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const stepLabel = useMemo(() => (step === 1 ? '01' : '02'), [step]);

  const onPickPlan = (id) => {
    setSelectedPlanId((prev) => (prev === id ? null : id));
    setSelectedServiceId(null);
  };

  const onPickService = (id) => {
    setSelectedServiceId((prev) => (prev === id ? null : id));
    setSelectedPlanId(null);
  };

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
          <img src={closeIconDark} alt="" aria-hidden="true" />
        </button>

        <div className="elite-paws-contact-modal-content">
          <p className="elite-paws-contact-modal-step">{stepLabel}</p>

          {step === 1 ? (
            <>
              <h3>How could we help you?</h3>

              <div className="elite-paws-contact-modal-choices">
                <fieldset className="elite-paws-contact-modal-checklist">
                  {groomingMenu.map((plan) => {
                    const checked = selectedPlanId === plan.id;
                    return (
                      <label key={plan.id} className={`elite-paws-contact-modal-check ${checked ? 'is-checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onPickPlan(plan.id)}
                          aria-label={plan.name}
                        />
                        <span>{plan.name}</span>
                      </label>
                    );
                  })}
                </fieldset>

                <p className="elite-paws-contact-modal-other-title">Other service</p>

                <fieldset className="elite-paws-contact-modal-checklist">
                  {services.map((service) => {
                    const checked = selectedServiceId === service.id;
                    return (
                      <label key={service.id} className={`elite-paws-contact-modal-check ${checked ? 'is-checked' : ''}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onPickService(service.id)}
                          aria-label={service.title}
                        />
                        <span>{service.title}</span>
                      </label>
                    );
                  })}
                </fieldset>
              </div>

              <div className="elite-paws-contact-modal-actions elite-paws-contact-modal-actions--single">
                <button type="button" className="primary" onClick={() => setStep(2)}>
                  Next step
                </button>
              </div>
            </>
          ) : (
            <>
              <h3>Tell us a little bit of you</h3>

              <form className="elite-paws-contact-modal-form">
                {/* Preserve the selection for later submit handling */}
                <input type="hidden" name="selectedPlanId" value={selectedPlanId ?? ''} />
                <input type="hidden" name="selectedServiceId" value={selectedServiceId ?? ''} />

                <label>
                  Your name
                  <input type="text" placeholder="Bill" />
                </label>
                <label>
                  E-mail
                  <input type="email" placeholder="name@mail.com" />
                </label>
                <label>
                  Phone
                  <input type="tel" placeholder="06 12 34 56 78" />
                </label>
                
                <label>
                  Pet name
                  <input type="text" placeholder="Buddy" />
                </label>
                <label>
                  Pet type / breed
                  <input type="text" placeholder="Dog / Golden Retriever" />
                </label>
                <label>
                  Age
                  <input type="text" placeholder="e.g. 2 years" />
                </label>
                <label>
                  Size / weight
                  <input type="text" placeholder="e.g. Small / 7kg" />
                </label>

                {/* <label className="full">
                  Coat condition
                  <input type="text" placeholder="e.g. Light shedding / Slight tangles / Matted" />
                </label>
                <label className="full">
                  Preferred date / time
                  <input type="text" placeholder="e.g. Tomorrow evening" />
                </label>
                <label className="full">
                  Notes for the groomer
                  <textarea rows={4} placeholder="Anything we should know about your pet?" />
                </label> */}
              </form>

              <div className="elite-paws-contact-modal-actions">
                <button type="button" className="ghost" onClick={() => setStep(1)}>
                  Previous
                </button>
                <button type="button" className="primary">
                  {/* Final step */}
                  Submit
                </button>
              </div>

              <p className="elite-paws-contact-modal-note">All fields are required</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
