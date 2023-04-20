import React from 'react';

function EmailLink() {
  const email = '213865298@mby.co.il';
  const subject = 'Subject of the email';
  const body = 'Body of the email';

  const mailtoLink = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <a href={mailtoLink}>Send email</a>
  );
}

export default EmailLink;