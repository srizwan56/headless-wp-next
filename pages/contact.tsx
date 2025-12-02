import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');
  async function submit(e: any) {
    e.preventDefault();
    setStatus('sending');
    const form = new FormData(e.target);
    const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(form)), headers: { 'Content-Type': 'application/json' }});
    if (res.ok) { setStatus('sent'); } else { setStatus('error'); }
  }
  return (
    <main>
      <h1>Contact</h1>
      <form onSubmit={submit}>
        <input name="name" placeholder="Name" required /><br/>
        <input name="email" type="email" placeholder="Email" required /><br/>
        <textarea name="message" placeholder="Message" required /><br/>
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
