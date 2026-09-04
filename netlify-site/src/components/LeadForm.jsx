import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function LeadForm({ bookingLink }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const submit = () => {
    if (!name.trim() || !email.trim()) {
      alert('Please enter your name and email so we know where to send it.');
      return;
    }
    alert('This form is a template — connect it to your CRM, Zapier, or email tool to actually capture leads.');
  };

  return (
    <div className="lead-wrap">
      <div className="lead-card">
        <div className="field2"><label>Full Name</label><div className="num-field"><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Contractor" /></div></div>
        <div className="field2"><label>Email Address</label><div className="num-field"><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@yourcompany.com" /></div></div>
        <div className="field2"><label>Phone Number</label><div className="num-field"><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" /></div></div>
        <button className="btn btn-primary" onClick={submit}><span className="sheen" />Send Me My Next Step</button>
        <div className="or-divider">or</div>
        <a href={bookingLink} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
          <Calendar size={15} /> Skip ahead — book a call directly
        </a>
        <p className="micro" style={{ marginTop: 16, textAlign: 'center' }}>Template form — connect this to your CRM or email tool to go live.</p>
      </div>
    </div>
  );
}
