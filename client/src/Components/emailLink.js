
import React from 'react';
import { Button } from 'primereact/button';

function EmailLink(props) {
  const email = props.email;
  const subject = 'Subject of the email';
  const body = 'Body of the email';

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink}>
      <Button icon="pi pi-send" tooltip={props.tooltip} className="p-button-rounded"></Button>
    </a>
  );
}

export default EmailLink;
