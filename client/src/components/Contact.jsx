import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CircleAlert,
  CircleCheck,
  Clock,
  Copy,
  Github,
  Linkedin,
  LoaderCircle,
  Send,
} from 'lucide-react';
import { budgets, projectTypes, site } from '../data/site.js';
import { Reveal } from './Reveal.jsx';

const initialForm = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
  website: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span className="field-error" id={id}>
      <CircleAlert size={13} aria-hidden="true" />
      {message}
    </span>
  );
}

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);
  const successHeadingRef = useRef(null);

  useEffect(
    () => () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (status === 'success') {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }

    if (status === 'error') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (form.message.trim().length < 20) {
      nextErrors.message = 'Please add a little more detail (at least 20 characters).';
    }

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];

    if (firstError) {
      window.requestAnimationFrame(() => {
        document.getElementById(`contact-${firstError}`)?.focus();
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;
    if (!validate()) return;

    setStatus('submitting');
    setStatusMessage('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      website: form.website,
    };

    if (form.projectType) payload.projectType = form.projectType;
    if (form.budget) payload.budget = form.budget;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const firstError = Object.keys(data.errors)[0];
          if (firstError) {
            window.requestAnimationFrame(() => {
              document.getElementById(`contact-${firstError}`)?.focus();
            });
          }
        }
        setStatus('error');
        setStatusMessage(
          data.message || 'Something went wrong. Please try again in a moment.'
        );
        return;
      }

      setStatus('success');
      setStatusMessage(data.message || 'Thanks for reaching out. I will be in touch soon.');
      setForm(initialForm);
      setErrors({});
    } catch {
      setStatus('error');
      setStatusMessage(
        `I could not reach the server. Please try again, or email me directly at ${site.email}.`
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setStatusMessage('');
    setForm(initialForm);
    setErrors({});
    window.requestAnimationFrame(() => {
      document.getElementById('contact-name')?.focus();
    });
  };

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__panel">
          <div className="contact__intro">
            <div className="contact__topline">
              <div className="section-label section-label--dark">
                <span className="section-label__index">04</span>
                <span>Contact</span>
              </div>
              <span className="availability availability--dark">
                <span className="availability__dot" aria-hidden="true" />
                {site.availability}
              </span>
            </div>

            <h2 id="contact-title">
              Have an idea?
              <br />
              <em>Let&apos;s build it.</em>
            </h2>

            <p className="contact__description">
              Tell me what you are working on, where you are stuck, or what you want to bring to
              life. I read every message and reply within two business days.
            </p>

            <div className="contact__direct">
              <span>Prefer a direct line?</span>
              <button
                type="button"
                className="email-copy"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${site.email}`}
              >
                <span>{site.email}</span>
                {copied ? (
                  <Check size={17} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Copy size={16} strokeWidth={1.8} aria-hidden="true" />
                )}
              </button>
              <span className="copy-status" role="status" aria-live="polite">
                {copied ? 'Email copied to clipboard.' : ''}
              </span>
            </div>

            <div className="contact__socials">
              <a href={site.socials[0].href} target="_blank" rel="noreferrer">
                <Github size={16} aria-hidden="true" />
                GitHub
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={site.socials[1].href} target="_blank" rel="noreferrer">
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="contact__meta">
              <Clock size={15} aria-hidden="true" />
              Usually replies within 2 business days
              <span aria-hidden="true">·</span>
              {site.location}
            </div>
          </div>

          <div className="contact__form-panel">
            {status === 'success' ? (
              <div className="form-success" role="status">
                <span className="form-success__icon">
                  <CircleCheck size={30} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="eyebrow">Message sent</span>
                <h3 ref={successHeadingRef} tabIndex={-1}>
                  Thanks for reaching out.
                </h3>
                <p>{statusMessage}</p>
                <button type="button" className="button button--accent" onClick={resetForm}>
                  Send another message
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__header">
                  <h3>Start a project</h3>
                  <span>No obligation, just a conversation.</span>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ada Lovelace"
                      value={form.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      required
                    />
                    <FieldError id="contact-name-error" message={errors.name} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-email">Email address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="ada@example.com"
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      required
                    />
                    <FieldError id="contact-email-error" message={errors.email} />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="contact-projectType">
                      Project type <span>Optional</span>
                    </label>
                    <div className="select-wrap">
                      <select
                        id="contact-projectType"
                        name="projectType"
                        value={form.projectType}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.projectType)}
                      >
                        <option value="">Select a project type</option>
                        {projectTypes.map((type) => (
                          <option value={type} key={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <FieldError id="contact-projectType-error" message={errors.projectType} />
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-budget">
                      Budget range <span>Optional</span>
                    </label>
                    <div className="select-wrap">
                      <select
                        id="contact-budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.budget)}
                      >
                        <option value="">Select a budget</option>
                        {budgets.map((budget) => (
                          <option value={budget} key={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                    <FieldError id="contact-budget-error" message={errors.budget} />
                  </div>
                </div>

                <div className="form-field">
                  <div className="label-row">
                    <label htmlFor="contact-message">Project details</label>
                    <span
                      className={`char-count ${form.message.length > 1900 ? 'is-near-limit' : ''}`.trim()}
                    >
                      {form.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="A little context, the problem you are solving, and what success looks like..."
                    value={form.message}
                    onChange={handleChange}
                    maxLength={2000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    required
                  />
                  <FieldError id="contact-message-error" message={errors.message} />
                </div>

                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {status === 'error' ? (
                  <p className="form-alert" role="alert">
                    <CircleAlert size={16} aria-hidden="true" />
                    {statusMessage}
                  </p>
                ) : null}

                <div className="contact-form__footer">
                  <button
                    type="submit"
                    className="button button--accent contact-form__submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        Sending
                        <LoaderCircle
                          className="spin"
                          size={17}
                          aria-hidden="true"
                        />
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <span>Your details stay private. No newsletters.</span>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
