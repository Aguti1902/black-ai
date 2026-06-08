import PolicyLayout from '../components/PolicyLayout.jsx'
import SEO from '../components/SEO.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function AvisoLegal() {
  const { lang } = useApp()
  const isEs = lang === 'es'

  return (
    <>
      <SEO
        title={isEs ? 'Aviso Legal' : 'Legal Notice & Terms of Use'}
        description={isEs ? 'Aviso legal y términos de uso de Black AI.' : 'Legal notice and terms of use of Black AI.'}
        path="/aviso-legal"
      />
      <PolicyLayout
        eyebrow="Legal"
        title={isEs ? 'Aviso Legal y Términos de Uso' : 'Legal Notice & Terms of Use'}
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
      <h2>1. Website Owner</h2>
      <p>
        In accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE),
        the following information is provided about the website owner:
      </p>
      <ul>
        <li><strong>Company name:</strong> Black AI, S.L.</li>
        <li><strong>Registered address:</strong> Avenida de la Constitución 36, 2nd Floor, 41001 Sevilla, Spain</li>
        <li><strong>Email:</strong> <a href="mailto:info@blackai.com">info@blackai.com</a></li>
        <li><strong>Website:</strong> <a href="https://black-ai.com">https://black-ai.com</a></li>
      </ul>

      <h2>2. Purpose of the Website</h2>
      <p>
        This Website provides general information about Black AI, its activities in AI infrastructure development
        and investment, its team and its projects. It is intended for informational purposes only and does not
        constitute an offer or solicitation to purchase or sell any financial instruments or investment products.
      </p>

      <h2>3. Intellectual Property</h2>
      <p>
        All content on this Website — including but not limited to text, images, graphics, logos, icons, design,
        code and audio-visual content — is the property of Black AI, S.L. or its content suppliers, and is
        protected by applicable intellectual property laws.
      </p>
      <p>
        No part of this Website may be reproduced, distributed, modified, adapted, translated, publicly communicated
        or otherwise used for commercial purposes without the prior written consent of Black AI.
      </p>
      <p>
        You may print or download content from this Website for personal, non-commercial use only, provided you do
        not modify it and you retain all copyright and proprietary notices.
      </p>

      <h2>4. Trademarks</h2>
      <p>
        "Black AI" and associated logos are trademarks or trade names of Black AI, S.L. Unauthorised use of these
        marks is strictly prohibited.
      </p>

      <h2>5. Accuracy of Information</h2>
      <p>
        The information on this Website is provided in good faith and for general information purposes only. Black
        AI makes no warranty, express or implied, as to the accuracy, completeness or suitability of any
        information provided. We reserve the right to update, modify or remove content at any time without prior
        notice.
      </p>
      <p>
        Nothing on this Website constitutes financial, legal, tax or investment advice. You should obtain
        independent professional advice before making any investment or business decision.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, Black AI shall not be liable for any direct, indirect,
        incidental, special or consequential damages arising from your use of — or inability to use — this Website
        or its content, including but not limited to loss of profits, data or goodwill.
      </p>
      <p>
        Black AI is not responsible for the content of external websites linked to or from this Website. Links are
        provided for convenience only and do not imply endorsement.
      </p>

      <h2>7. Governing Law and Jurisdiction</h2>
      <p>
        These Terms of Use are governed by Spanish law. Any disputes arising out of or in connection with this
        Website shall be subject to the exclusive jurisdiction of the courts of Sevilla, Spain, unless mandatory
        consumer protection laws provide otherwise.
      </p>

      <h2>8. Changes to These Terms</h2>
      <p>
        We reserve the right to modify these Terms of Use at any time. Changes will take effect upon publication
        on this page. Your continued use of the Website constitutes acceptance of the updated Terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any legal queries, please contact us at <a href="mailto:info@blackai.com">info@blackai.com</a> or by
        post at: Black AI, S.L., Avenida de la Constitución 36, 2nd Floor, 41001 Sevilla, Spain.
      </p>
    </>
  )
}

function ContentEs() {
  return (
    <>
      <h2>1. Datos del Titular del Sitio Web</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
        Comercio Electrónico (LSSI-CE), se facilita la siguiente información sobre el titular del sitio web:
      </p>
      <ul>
        <li><strong>Denominación social:</strong> Black AI, S.L.</li>
        <li><strong>Domicilio social:</strong> Avenida de la Constitución 36, 2.ª Planta, 41001 Sevilla, España</li>
        <li><strong>Correo electrónico:</strong> <a href="mailto:info@blackai.com">info@blackai.com</a></li>
        <li><strong>Sitio web:</strong> <a href="https://black-ai.com">https://black-ai.com</a></li>
      </ul>

      <h2>2. Objeto del Sitio Web</h2>
      <p>
        Este Sitio Web proporciona información general sobre Black AI, sus actividades de desarrollo e inversión
        en infraestructura de inteligencia artificial, su equipo y sus proyectos. Tiene un carácter meramente
        informativo y no constituye una oferta ni una solicitud de compra o venta de instrumentos financieros o
        productos de inversión.
      </p>

      <h2>3. Propiedad Intelectual e Industrial</h2>
      <p>
        Todos los contenidos de este Sitio Web — incluyendo, sin limitación, textos, imágenes, gráficos, logotipos,
        iconos, diseño, código y contenido audiovisual — son propiedad de Black AI, S.L. o de sus proveedores de
        contenido, y están protegidos por la legislación de propiedad intelectual e industrial aplicable.
      </p>
      <p>
        Queda prohibida la reproducción, distribución, modificación, adaptación, traducción, comunicación pública
        o cualquier otro uso comercial de los contenidos de este Sitio Web sin la previa autorización escrita de
        Black AI.
      </p>
      <p>
        Se permite la impresión o descarga de contenidos de este Sitio Web para uso personal y no comercial,
        siempre que no se modifiquen y se mantengan todos los avisos de derechos de autor y de propiedad.
      </p>

      <h2>4. Marcas Comerciales</h2>
      <p>
        "Black AI" y los logotipos asociados son marcas comerciales o nombres comerciales de Black AI, S.L. Su
        uso no autorizado queda estrictamente prohibido.
      </p>

      <h2>5. Exactitud de la Información</h2>
      <p>
        La información de este Sitio Web se proporciona de buena fe y únicamente con carácter informativo general.
        Black AI no garantiza, expresa ni implícitamente, la exactitud, integridad o idoneidad de la información
        proporcionada. Nos reservamos el derecho de actualizar, modificar o eliminar contenidos en cualquier momento
        y sin previo aviso.
      </p>
      <p>
        Nada de lo contenido en este Sitio Web constituye asesoramiento financiero, jurídico, fiscal o de inversión.
        Antes de tomar cualquier decisión de inversión o empresarial, debes obtener asesoramiento profesional
        independiente.
      </p>

      <h2>6. Limitación de Responsabilidad</h2>
      <p>
        En la medida en que lo permita la ley aplicable, Black AI no será responsable de daños directos,
        indirectos, incidentales, especiales o consecuentes derivados del uso — o de la imposibilidad de uso —
        de este Sitio Web o de su contenido, incluidos entre otros la pérdida de beneficios, datos o reputación.
      </p>
      <p>
        Black AI no es responsable del contenido de los sitios web externos enlazados desde este Sitio Web. Los
        enlaces se facilitan únicamente por conveniencia y no implican ningún tipo de respaldo o patrocinio.
      </p>

      <h2>7. Legislación Aplicable y Jurisdicción</h2>
      <p>
        Las presentes condiciones de uso se rigen por la legislación española. Cualquier controversia que surja
        en relación con este Sitio Web estará sometida a la jurisdicción exclusiva de los juzgados y tribunales
        de Sevilla, salvo que la normativa de protección al consumidor establezca otra cosa de forma imperativa.
      </p>

      <h2>8. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar el presente Aviso Legal en cualquier momento. Las modificaciones
        entrarán en vigor con su publicación en esta página. El uso continuado del Sitio Web implica la aceptación
        de las condiciones actualizadas.
      </p>

      <h2>9. Contacto</h2>
      <p>
        Para cualquier consulta de carácter jurídico, puedes contactarnos en{' '}
        <a href="mailto:info@blackai.com">info@blackai.com</a> o por correo postal en: Black AI, S.L., Avenida
        de la Constitución 36, 2.ª Planta, 41001 Sevilla, España.
      </p>
    </>
  )
}
