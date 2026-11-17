import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_INFO } from '../data/ambiluxData';
import { MagneticButton, ParallaxFrame, Reveal, StaggerHeading, useDocumentMeta } from '../components/Reveal';

interface ContactPageProps {
  initialEnquiry?: string;
}

export default function ContactPage({ initialEnquiry }: ContactPageProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Commercial Lighting');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialEnquiry) {
      setMessage(`Enquiry regarding: ${initialEnquiry}\n\n`);
      setSubmitted(false);
    }
  }, [initialEnquiry]);

  useDocumentMeta(
    'Contact Us — AmbiLux | Ambient Works Mumbai Studio',
    'Connect with AmbiLux (Ambient Works) in Malad (W), Mumbai at +91 9819 55 29 29 or sales@ambilux.in for architectural lighting enquiries.'
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please enter your name, email address, and project requirements.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section className="relative z-20 bg-[#F7F6F2] pt-32 pb-14 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
            Contact Us · {COMPANY_INFO.legalName}
          </p>
          <StaggerHeading
            lines={[
              { text: 'Let us illuminate' },
              { text: 'your next architectural space.', accent: true },
            ]}
            className="mt-4 max-w-4xl font-display text-4xl leading-[1.04] font-bold tracking-tight text-[#171717] sm:text-6xl"
          />
        </div>
      </section>

      {/* Main Split Contact Details & Interactive Form */}
      <section className="relative z-20 bg-[#F7F6F2] pb-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          {/* Left Verified Address & Direct Contact Info */}
          <div className="space-y-6 lg:col-span-5">
            <Reveal>
              <div className="rounded-xl border border-[#171717]/12 bg-[#ECEAE3] p-7 sm:p-8">
                <h2 className="font-display text-2xl font-bold text-[#171717]">
                  {COMPANY_INFO.legalName}
                </h2>
                <p className="mt-1 font-mono-num text-xs text-[#555555]">
                  {COMPANY_INFO.contact.gst}
                </p>

                <div className="mt-7 space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E52B38]" aria-hidden="true" />
                    <p className="leading-relaxed text-[#171717]">
                      {COMPANY_INFO.contact.address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Phone className="h-4 w-4 shrink-0 text-[#F5A623]" aria-hidden="true" />
                    <a
                      href={COMPANY_INFO.contact.phoneHref}
                      className="font-mono-num font-semibold text-[#171717] transition-colors hover:text-[#1685C7]"
                    >
                      {COMPANY_INFO.contact.phoneDisplay}
                    </a>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Mail className="h-4 w-4 shrink-0 text-[#1685C7]" aria-hidden="true" />
                    <a
                      href={COMPANY_INFO.contact.emailHref}
                      className="font-semibold text-[#171717] transition-colors hover:text-[#1685C7]"
                    >
                      {COMPANY_INFO.contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Globe className="h-4 w-4 shrink-0 text-[#159447]" aria-hidden="true" />
                    <span className="font-mono-num text-[#555555]">
                      {COMPANY_INFO.contact.website}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ParallaxFrame
                src="/assets/ambilux/editorial/contact-twilight-bokeh.jpg"
                alt="Architectural outdoor facade lighting detail"
                aspect="aspect-[16/10]"
                parallaxOffset={14}
                className="rounded-xl"
              />
            </Reveal>

            {/* Clean Directions Summary Card */}
            <Reveal delay={0.14}>
              <div className="rounded-xl border border-[#171717]/12 bg-[#FFFFFF] p-6">
                <p className="font-mono-num text-xs font-medium text-[#555555] uppercase">
                  Studio Location · Malad West, Mumbai
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#555555]">
                  Unit No.-28, Ground Floor, New Sonal Industrial Estate, New Link Rd, Malad (W),
                  Mumbai-400064. Direct consultations by appointment with our lighting engineering
                  team.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Project Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-xl border border-[#171717]/12 bg-[#FFFFFF] p-7 sm:p-10">
                {submitted ? (
                  <div className="py-8">
                    <CheckCircle2 className="h-10 w-10 text-[#159447]" aria-hidden="true" />
                    <h2 className="mt-5 font-display text-3xl font-bold text-[#171717]">
                      Enquiry Recorded for {COMPANY_INFO.legalName}
                    </h2>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#555555]">
                      Thank you, {name}. Your architectural lighting enquiry regarding{' '}
                      <span className="font-semibold text-[#171717]">{projectType}</span> has been
                      prepared for our technical sales desk ({COMPANY_INFO.contact.email}).
                    </p>

                    <div className="mt-6 rounded-lg border border-[#171717]/10 bg-[#ECEAE3] p-5 text-xs text-[#171717]">
                      <p className="font-mono-num uppercase text-[#555555]">Summary</p>
                      <p className="mt-2">
                        <span className="font-semibold">Contact:</span> {email}
                        {phone ? ` · ${phone}` : ''}
                      </p>
                      <p className="mt-1 whitespace-pre-line">
                        <span className="font-semibold">Brief:</span> {message}
                      </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <a
                        href={`${COMPANY_INFO.contact.emailHref}?subject=${encodeURIComponent(
                          `AmbiLux Enquiry — ${projectType} (${name})`
                        )}&body=${encodeURIComponent(
                          `Name: ${name}\nCompany: ${company || '—'}\nPhone: ${
                            phone || '—'
                          }\nCategory: ${projectType}\n\n${message}`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2] hover:bg-[#555555]"
                      >
                        <span>Open in Email Client ({COMPANY_INFO.contact.email})</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setCompany('');
                          setEmail('');
                          setPhone('');
                          setMessage('');
                        }}
                        className="rounded-lg border border-[#171717]/20 px-5 py-3 text-sm font-semibold text-[#171717] hover:border-[#171717]"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="border-b border-[#171717]/10 pb-5">
                      <h2 className="font-display text-2xl font-bold text-[#171717]">
                        Project & Luminaire Enquiry
                      </h2>
                      <p className="mt-1 text-sm text-[#555555]">
                        Share fixture codes, project timelines, or lighting planning requests.
                      </p>
                    </div>

                    {error && (
                      <div
                        role="alert"
                        className="rounded-lg border border-[#E52B38]/30 bg-[#E52B38]/8 px-4 py-3 text-sm font-medium text-[#E52B38]"
                      >
                        {error}
                      </div>
                    )}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                        >
                          Your Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                        >
                          Practice / Organization
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Architecture studio or enterprise"
                          className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                        >
                          Phone Number
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 ..."
                          className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-series"
                        className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                      >
                        Lighting Focus
                      </label>
                      <select
                        id="contact-series"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                      >
                        <option value="Commercial Lighting">Commercial Lights</option>
                        <option value="Decorative Lighting">Decorative Lights</option>
                        <option value="Geometrical Lighting">Geometrical Lights</option>
                        <option value="Acoustic Lighting">Acoustic Lights</option>
                        <option value="Outdoor Lighting">Outdoor Lights</option>
                        <option value="Customized Lighting & Planning">
                          Customized Lighting & Light Planning
                        </option>
                        <option value="Casambi Bluetooth Systems">
                          Casambi Bluetooth Tunable & Dimming
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold tracking-wide text-[#171717] uppercase"
                      >
                        Project Details / Fixture Codes *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe fixture requirements, ceiling conditions, custom dimensions, or requested datasheets..."
                        className="mt-2 w-full rounded-lg border border-[#171717]/18 bg-[#F7F6F2] px-4 py-3 text-sm text-[#171717] focus:border-[#171717] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <MagneticButton
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#171717] px-6 py-4 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#F5A623] hover:text-[#171717] sm:w-auto"
                      >
                        <span>Submit Lighting Enquiry</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </MagneticButton>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
