import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { GetMyPolicies } from '../services';
import './MyPolicies.css';

const fallbackPolicies = [
  {
    policyNumber: '10001234',
    insuredName: 'Acme Manufacturing',
    producerName: 'Republic Agency',
    effDate: '2025-01-01',
    expDate: '2026-01-01',
    defaultPolicy: true
  },
  {
    policyNumber: '10005678',
    insuredName: 'Valley Logistics',
    producerName: 'Regional Brokers',
    effDate: '2025-03-15',
    expDate: '2026-03-15',
    defaultPolicy: false
  }
];

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export default function MyPolicies() {
  const [policies, setPolicies] = useState(fallbackPolicies);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadPolicies() {
      try {
        const response = await GetMyPolicies({ username: '' });

        if (isMounted && Array.isArray(response) && response.length > 0) {
          setPolicies(response);
          setWarning('');
        }
      } catch (error) {
        if (isMounted) {
          setWarning('Sample policies are being shown because the service request did not complete.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPolicies();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="app-page">
      <div className="app-panel">
        <div className="mypolicies-header">
          <div>
            <h1>My Policies</h1>
            <p>Sample routed page for starter projects. Replace this with the full implementation when needed.</p>
          </div>
          <Button label="Refresh" icon="pi pi-refresh" outlined onClick={() => window.location.reload()} />
        </div>

        {warning ? <Message severity="warn" text={warning} className="mypolicies-warning" /> : null}

        {loading ? <p>Loading policies...</p> : null}

        <div className="mypolicies-grid">
          {policies.map((policy) => (
            <article className="mypolicies-card" key={`${policy.policyNumber}-${policy.effDate}`}>
              <div className="mypolicies-card__header">
                <h2>{policy.insuredName}</h2>
                {policy.defaultPolicy ? <span className="mypolicies-badge">Default</span> : null}
              </div>
              <dl className="mypolicies-meta">
                <div>
                  <dt>Policy Number</dt>
                  <dd>{policy.policyNumber}</dd>
                </div>
                <div>
                  <dt>Producer</dt>
                  <dd>{policy.producerName}</dd>
                </div>
                <div>
                  <dt>Effective</dt>
                  <dd>{formatDate(policy.effDate)}</dd>
                </div>
                <div>
                  <dt>Expiration</dt>
                  <dd>{formatDate(policy.expDate)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}