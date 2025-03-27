import { MetaFunction } from "@remix-run/node";
import { Company } from "Constant";
import React from "react";
import RootLayout from "./_layout";
export const meta: MetaFunction = () => {
  return [
    { title: "GAMCA Token Privacy Policy" },
    { name: "description", content: "Privacy Policy for GAMCA Token" },
    {
      name: "keywords",
      content:
        "#wafidmedicalpakistan #wafidmedicalsliponline #gamcamedicalpakistan #wafid #gamcapakistan #wafidpakistan #dubaimedical #gamcamedical #gamcaappointment #wafidappointment #wafidmedical #saudiarabia🇸🇦 #gamcaislamabad #gamcamedicalappointment #gamcamedicalonline #Gamcalahore #gamcapeshawar #gamcamedicalcheck #gamcagujranwala #gamcakarachi #gamcamultan #gamcarawalpindi #Gamcamedicalstatus #GamcaMedicalfeesforsaudiarabia #GamcaMedicalfeesforuae #GamcaMedicalfeesforoman #saudiarabia #گیمکا #Gamca #gamcamedicalreport #omanmedical #muscatmedical #bahrainmedical #sudiamedical #kuwaitmedical #qatarmedical @gamcapakistanfee #gamcaappointment #wafidappointment #wafidreportchek #wafidonlinereport #wafidmedicalappointment #wafidpakistan",
    },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "google", content: "notranslate" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "author", content: "Muhammad Saleem" },
    { name: "rating", content: "general" },
    { name: "distribution", content: "global" },
    { name: "revisit-after", content: "7 days" },
    { name: "language", content: "EN" },
    { name: "reply-to", content: Company.email },
  ];
};

const PrivacyPolicy = () => {
  return (
    <RootLayout>
      <div
        className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg my-40 pt-10 border-t-4 border-blue-700"
        style={{
          fontFamily: "Poppins",
        }}
      >
        <div className="max-w-3xl mx-auto ">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">gamcatoken.online</span>, we are
            committed to safeguarding your personal information. This Privacy
            Policy outlines how we collect, use, disclose, and protect your data
            when you use our website and services. By using our website, you
            agree to the practices described in this policy.
          </p>

          <InformationCollection />
          <UsageOfInformation />
          <SharingInformation />
          <DataRetention />

          <Sections
            title="5. Cookies and Tracking Technologies"
            items={[
              "Enhance your browsing experience.",
              "Remember your preferences.",
              "Analyze website traffic and performance.",
              "You can disable cookies via your browser settings, but doing so may impact certain website features.",
            ]}
          />

          <Sections
            title="6. Security Measures"
            items={[
              "Encryption of sensitive information during transmission.",
              "Secure servers and databases.",
              "Regular security audits.",
            ]}
          />

          <Sections
            title="7. Your Rights"
            items={[
              "Access: Request a copy of your personal data.",
              "Correction: Request updates or corrections to inaccurate data.",
              "Deletion: Request deletion of your personal data, subject to legal requirements.",
              "Objection: Object to specific uses of your data.",
              "To exercise these rights, please contact us using the details provided below.",
            ]}
          />

          <Sections
            title="8. Third-Party Links"
            items={[
              "Our website may contain links to external websites.",
              "We are not responsible for the privacy practices of these third-party websites, and we encourage you to review their privacy policies.",
            ]}
          />

          <Sections
            title="9. Changes to This Privacy Policy"
            items={[
              "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.",
              "Updated versions will be posted on this page with a revised 'Effective Date'.",
            ]}
          />
        </div>
      </div>
    </RootLayout>
  );
};

export default PrivacyPolicy;

const InformationCollection = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        1. Information We Collect
      </h2>
      <p className="text-gray-700">
        We collect and process the following categories of information:
      </p>
      <h2 className="text-lg font-semibold text-gray-800 my-4">
        a) Personal Information
      </h2>
      <Sections
        title=""
        items={[
          "Full Name",
          "Contact details (email, phone number, address)",
          "Date of Birth",
          "Gender",
        ]}
      />
      <h2 className="text-lg font-semibold text-gray-800 my-4">
        b) Health and Medical Information
      </h2>
      <Sections
        title=""
        items={[
          "Medical history and reports",
          "Current health conditions",
          "Appointment details (date, time, and nature of consultation)",
        ]}
      />
      <h2 className="text-lg font-semibold text-gray-800 my-4">
        c) Technical Information
      </h2>

      <Sections
        title=""
        items={[
          "IP address",
          "Browser type and version",
          "Device information",
          "Website usage data (e.g., pages visited, time spent)",
        ]}
      />
      <h2 className="text-lg font-semibold text-gray-800 my-4">
        d) Payment Information
      </h2>
      <Sections title="">
        <p className="text-gray-600">
          If you make payments on our platform, we collect billing details
          (e.g., credit/debit card information or payment account details).
          Payment processing is handled by secure third-party services.
        </p>
      </Sections>
    </div>
  );
};

const Sections = ({
  title,
  items,
  children,
}: {
  title: string;
  items?: any;
  children?: React.ReactNode;
}) => (
  <div className="mt-4">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
    {items ? (
      <ul className="list-disc list-inside text-gray-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      children
    )}
  </div>
);

const UsageOfInformation = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>
          <strong>Service Delivery:</strong> To schedule, confirm, and manage
          appointments.
        </li>
        <li>
          <strong>Communication:</strong> To send reminders, updates, and
          follow-ups regarding your appointments.
        </li>
        <li>
          <strong>Medical Services:</strong> To provide accurate medical
          assistance and maintain records for future consultations.
        </li>
        <li>
          <strong>Improvement:</strong> To analyze website usage and improve our
          services and user experience.
        </li>
        <li>
          <strong>Legal Compliance:</strong> To meet legal and regulatory
          requirements.
        </li>
      </ul>
    </div>
  );
};

const SharingInformation = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        3. How We Share Your Information
      </h2>
      <p className="text-gray-600 mb-4">
        We respect your privacy and do not sell your information. However, your
        information may be shared in the following cases:
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>
          <strong>With Healthcare Providers:</strong> To ensure proper medical
          assistance.
        </li>
        <li>
          <strong>With Third-Party Service Providers:</strong> For processing
          payments or sending notifications.
        </li>
        <li>
          <strong>Legal Obligations:</strong> If required by law, regulation, or
          court order.
        </li>
        <li>
          <strong>With Your Consent:</strong> When you explicitly authorize us.
        </li>
      </ul>
    </div>
  );
};
const DataRetention = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      4. Data Retention
    </h2>
    <p className="text-gray-600">
      We retain your information only as long as it is necessary for the
      purposes outlined in this policy or as required by applicable laws. Once
      no longer needed, your data will be securely deleted or anonymized.
    </p>
  </div>
);
const ContactUs = () => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      10. Contact Us
    </h2>
    <p className="text-gray-600">
      If you have any questions, concerns, or requests regarding this Privacy
      Policy, please contact us:
    </p>
    <p className="text-gray-600">
      <strong>Email:</strong> [Insert Email Address]
    </p>
    <p className="text-gray-600">
      <strong>Phone:</strong> [Insert Phone Number]
    </p>
  </div>
);
