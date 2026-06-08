import PolicyLayout from '../components/PolicyLayout.jsx'
import SEO from '../components/SEO.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Privacidad() {
  const { lang } = useApp()
  const isEs = lang === 'es'

  return (
    <>
      <SEO
        title={isEs ? 'Política de Privacidad' : 'Privacy Policy'}
        description={isEs ? 'Política de privacidad de Black AI.' : 'Privacy policy of Black AI.'}
        path="/privacidad"
      />
      <PolicyLayout
        eyebrow="Legal"
        title={isEs ? 'Política de Privacidad' : 'Privacy Policy'}
        lastUpdated={isEs ? 'Última actualización: junio de 2025' : 'Last updated: June 2025'}
      >
        {isEs ? <ContentEs /> : <ContentEn />}
      </PolicyLayout>
    </>
  )
}

function ContentEn() {
  return (
    <>
      <p>
        Black AI, S.L. (hereinafter <strong>"Black AI"</strong>, <strong>"we"</strong> or <strong>"us"</strong>) is
        committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we
        collect, use, store and protect your personal information when you visit{' '}
        <a href="https://black-ai.com">black-ai.com</a> (the <strong>"Website"</strong>) or contact us directly.
      </p>

      <h2>1. Data Controller</h2>
      <p>
        <strong>Black AI, S.L.</strong><br />
        Avenida de la Constitución 36, 2nd Floor<br />
        41001 Sevilla, Spain<br />
        Email: <a href="mailto:info@blackai.com">info@blackai.com</a>
      </p>

      <h2>2. Data We Collect</h2>
      <p>We may collect the following categories of personal data:</p>
      <ul>
        <li><strong>Contact data:</strong> name, email address, company name and phone number when you fill in the contact form or send us an email.</li>
        <li><strong>Usage data:</strong> IP address, browser type, pages visited, time spent on pages and referral source, collected automatically via cookies and analytics tools.</li>
        <li><strong>Communications:</strong> content of messages or emails you send us.</li>
      </ul>
      <p>We do not collect sensitive categories of personal data (health, religion, political opinions, etc.).</p>

      <h2>3. Legal Basis for Processing</h2>
      <ul>
        <li><strong>Performance of a contract or pre-contractual steps:</strong> when you request information about our services.</li>
        <li><strong>Legitimate interests:</strong> to operate and improve the Website, to ensure security and to respond to enquiries.</li>
        <li><strong>Consent:</strong> for non-essential cookies and direct marketing communications (where applicable).</li>
        <li><strong>Legal obligation:</strong> to comply with applicable laws and regulations.</li>
      </ul>

      <h2>4. How We Use Your Data</h2>
      <ul>
        <li>To respond to your enquiries and requests via the contact form.</li>
        <li>To analyse Website traffic and improve user experience.</li>
        <li>To send you relevant information about our projects and activities, where you have given consent.</li>
        <li>To comply with our legal and regulatory obligations.</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell your personal data to third parties. We may share your data with:
      </p>
      <ul>
        <li><strong>Service providers:</strong> hosting providers, analytics platforms and email services acting as data processors under our instructions.</li>
        <li><strong>Legal authorities:</strong> when required by law, court order or regulatory obligation.</li>
        <li><strong>Professional advisers:</strong> lawyers, accountants and auditors, under strict confidentiality obligations.</li>
      </ul>
      <p>
        Where we transfer data outside the European Economic Area, we ensure adequate safeguards are in place (e.g.
        Standard Contractual Clauses approved by the European Commission).
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal data only for as long as necessary for the purposes described in this Policy, or as
        required by law. Contact form data is retained for a maximum of <strong>3 years</strong> from the last
        interaction. Analytics data is anonymised or deleted after <strong>26 months</strong>.
      </p>

      <h2>7. Your Rights</h2>
      <p>Under the GDPR and applicable Spanish law (LOPD-GDD), you have the following rights:</p>
      <ul>
        <li><strong>Right of access:</strong> to obtain a copy of your personal data.</li>
        <li><strong>Right of rectification:</strong> to correct inaccurate data.</li>
        <li><strong>Right of erasure:</strong> to request deletion of your data ("right to be forgotten").</li>
        <li><strong>Right to restriction:</strong> to limit how we process your data.</li>
        <li><strong>Right to data portability:</strong> to receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to object:</strong> to processing based on legitimate interests or for direct marketing.</li>
        <li><strong>Right to withdraw consent:</strong> at any time, without affecting the lawfulness of prior processing.</li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{' '}
        <a href="mailto:info@blackai.com">info@blackai.com</a>. You also have the right to lodge a complaint with the
        Spanish Data Protection Authority (AEPD) at{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>8. Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect your personal data against
        unauthorised access, loss, destruction or alteration. However, no internet transmission is entirely secure
        and we cannot guarantee absolute security.
      </p>

      <h2>9. Cookies</h2>
      <p>
        We use cookies and similar technologies on our Website. For full details, please read our{' '}
        <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
        the new version on this page with an updated date. We encourage you to review this Policy periodically.
      </p>

      <h2>11. Contact</h2>
      <p>
        For any questions or requests relating to this Privacy Policy, please contact:<br />
        <a href="mailto:info@blackai.com">info@blackai.com</a><br />
        Black AI, S.L. — Avenida de la Constitución 36, 2nd Floor, 41001 Sevilla, Spain.
      </p>
    </>
  )
}

function ContentEs() {
  return (
    <>
      <p>
        Black AI, S.L. (en adelante <strong>"Black AI"</strong>, <strong>"nosotros"</strong> o{' '}
        <strong>"nos"</strong>) se compromete a proteger tus datos personales y a respetar tu privacidad. Esta
        Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tu información personal
        cuando visitas <a href="https://black-ai.com">black-ai.com</a> (el <strong>"Sitio Web"</strong>) o te pones
        en contacto con nosotros directamente.
      </p>

      <h2>1. Responsable del Tratamiento</h2>
      <p>
        <strong>Black AI, S.L.</strong><br />
        Avenida de la Constitución 36, 2.ª Planta<br />
        41001 Sevilla, España<br />
        Correo: <a href="mailto:info@blackai.com">info@blackai.com</a>
      </p>

      <h2>2. Datos que Recopilamos</h2>
      <p>Podemos recopilar las siguientes categorías de datos personales:</p>
      <ul>
        <li><strong>Datos de contacto:</strong> nombre, dirección de correo electrónico, empresa y teléfono cuando rellenas el formulario de contacto o nos envías un email.</li>
        <li><strong>Datos de uso:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo en página y fuente de referencia, recopilados automáticamente mediante cookies y herramientas de análisis.</li>
        <li><strong>Comunicaciones:</strong> contenido de los mensajes o correos que nos envíes.</li>
      </ul>
      <p>No recopilamos categorías especiales de datos personales (salud, religión, opiniones políticas, etc.).</p>

      <h2>3. Base Legal del Tratamiento</h2>
      <ul>
        <li><strong>Ejecución de un contrato o medidas precontractuales:</strong> cuando solicitas información sobre nuestros servicios.</li>
        <li><strong>Intereses legítimos:</strong> para operar y mejorar el Sitio Web, garantizar la seguridad y responder a consultas.</li>
        <li><strong>Consentimiento:</strong> para cookies no esenciales y comunicaciones de marketing directo (cuando proceda).</li>
        <li><strong>Obligación legal:</strong> para cumplir con las leyes y normativas aplicables.</li>
      </ul>

      <h2>4. Cómo Usamos tus Datos</h2>
      <ul>
        <li>Para responder a tus consultas y solicitudes a través del formulario de contacto.</li>
        <li>Para analizar el tráfico del Sitio Web y mejorar la experiencia del usuario.</li>
        <li>Para enviarte información relevante sobre nuestros proyectos y actividades, cuando hayas dado tu consentimiento.</li>
        <li>Para cumplir nuestras obligaciones legales y regulatorias.</li>
      </ul>

      <h2>5. Cesión de Datos</h2>
      <p>No vendemos tus datos personales a terceros. Podemos compartir tus datos con:</p>
      <ul>
        <li><strong>Proveedores de servicios:</strong> proveedores de hosting, plataformas de análisis y servicios de correo electrónico que actúan como encargados del tratamiento bajo nuestras instrucciones.</li>
        <li><strong>Autoridades legales:</strong> cuando lo exija la ley, una orden judicial o una obligación regulatoria.</li>
        <li><strong>Asesores profesionales:</strong> abogados, contables y auditores, bajo estrictas obligaciones de confidencialidad.</li>
      </ul>
      <p>
        Cuando transferimos datos fuera del Espacio Económico Europeo, nos aseguramos de que existan garantías
        adecuadas (p. ej., cláusulas contractuales tipo aprobadas por la Comisión Europea).
      </p>

      <h2>6. Conservación de los Datos</h2>
      <p>
        Conservamos tus datos personales únicamente durante el tiempo necesario para los fines descritos en esta
        Política o según lo exija la ley. Los datos del formulario de contacto se conservan un máximo de{' '}
        <strong>3 años</strong> desde la última interacción. Los datos analíticos se anonimiza o eliminan tras{' '}
        <strong>26 meses</strong>.
      </p>

      <h2>7. Tus Derechos</h2>
      <p>Conforme al RGPD y la LOPD-GDD, tienes los siguientes derechos:</p>
      <ul>
        <li><strong>Derecho de acceso:</strong> a obtener una copia de tus datos personales.</li>
        <li><strong>Derecho de rectificación:</strong> a corregir datos inexactos.</li>
        <li><strong>Derecho de supresión:</strong> a solicitar la eliminación de tus datos ("derecho al olvido").</li>
        <li><strong>Derecho de limitación:</strong> a restringir cómo tratamos tus datos.</li>
        <li><strong>Derecho a la portabilidad:</strong> a recibir tus datos en un formato estructurado y legible por máquina.</li>
        <li><strong>Derecho de oposición:</strong> al tratamiento basado en intereses legítimos o para marketing directo.</li>
        <li><strong>Derecho a retirar el consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escríbenos a{' '}
        <a href="mailto:info@blackai.com">info@blackai.com</a>. También tienes derecho a presentar una reclamación
        ante la Agencia Española de Protección de Datos (AEPD) en{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas apropiadas para proteger tus datos personales frente a accesos
        no autorizados, pérdida, destrucción o alteración. No obstante, ninguna transmisión por internet es
        completamente segura y no podemos garantizar una seguridad absoluta.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Utilizamos cookies y tecnologías similares en nuestro Sitio Web. Para más información, consulta nuestra{' '}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>10. Cambios en esta Política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos los cambios significativos
        publicando la nueva versión en esta página con una fecha actualizada. Te recomendamos que la revises con
        regularidad.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier consulta o solicitud relacionada con esta Política de Privacidad:<br />
        <a href="mailto:info@blackai.com">info@blackai.com</a><br />
        Black AI, S.L. — Avenida de la Constitución 36, 2.ª Planta, 41001 Sevilla, España.
      </p>
    </>
  )
}
