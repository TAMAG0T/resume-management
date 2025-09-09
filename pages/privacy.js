import React from 'react';

/**
 * PrivacyPolicy component displays the privacy policy of the application.
 *
 * It's structured with common sections found in a privacy policy.
 * IMPORTANT: This is a template. You should replace the placeholder
 * content with your actual privacy policy details and consult with a
 * legal professional to ensure compliance with applicable laws.
 */
const PrivacyPolicy = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </header>

      <main>
        <section style={{ marginBottom: '30px' }}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to [Your Company/Application Name] ("we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at [Your Contact Email].
          </p>
          <p>
            This privacy policy applies to all information collected through our website ([Your Website URL]), and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Services").
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>2. What Information Do We Collect?</h2>
          <p>
            <strong>Personal Information You Disclose to Us</strong>
          </p>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and services, when you participate in activities on the Services or otherwise when you contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Phone Number, etc.
          </p>
          <br/>
          <p>
            <strong>Information Automatically Collected</strong>
          </p>
          <p>
            We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>3. How Do We Use Your Information?</h2>
          <p>
            We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <ul>
            <li>To facilitate account creation and logon process.</li>
            <li>To post testimonials with your consent.</li>
            <li>To send you marketing and promotional communications.</li>
            <li>To send administrative information to you.</li>
            <li>To protect our Services.</li>
            <li>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>4. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <p>
            We may need to share your information with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>5. Do We Use Cookies and Other Tracking Technologies?</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>6. How Long Do We Keep Your Information?</h2>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>7. How Do We Keep Your Information Safe?</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>8. What Are Your Privacy Rights?</h2>
          <p>
            In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
          </p>
          <p>
            If you would like to make such a request, please use the contact details provided below.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2>9. Do We Make Updates to This Policy?</h2>
          <p>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
          </p>
        </section>

        <section>
          <h2>10. How Can You Contact Us About This Policy?</h2>
          <p>
            If you have questions or comments about this policy, you may email us at [Your Contact Email] or by post to:
          </p>
          <address>
            [Your Company Name]<br />
            [Your Company Address Line 1]<br />
            [Your Company Address Line 2]<br />
            [City, State/Province, ZIP/Postal Code]<br />
            [Country]
          </address>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;