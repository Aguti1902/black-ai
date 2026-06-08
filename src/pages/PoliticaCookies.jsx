import PolicyLayout from '../components/PolicyLayout.jsx'
import SEO from '../components/SEO.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function PoliticaCookies() {
  const { lang } = useApp()
  const isEs = lang === 'es'

  return (
    <>
      <SEO
        title={isEs ? 'Política de Cookies' : 'Cookie Policy'}
        description={isEs ? 'Política de cookies de Black AI.' : 'Cookie policy of Black AI.'}
        path="/cookies"
      />
      <PolicyLayout
        eyebrow="Legal"
        title={isEs ? 'Política de Cookies' : 'Cookie Policy'}
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
        This Cookie Policy explains how Black AI, S.L. (<strong>"Black AI"</strong>, <strong>"we"</strong>,
        <strong>"our"</strong>) uses cookies and similar tracking technologies on{' '}
        <a href="https://black-ai.com">black-ai.com</a>. It should be read alongside our{' '}
        <a href="/privacidad">Privacy Policy</a>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files placed on your device (computer, smartphone or tablet) when you visit a
        website. They allow the website to recognise your device on subsequent visits, remember your preferences
        and collect analytical data about how the site is used.
      </p>
      <p>
        Similar technologies include web beacons, pixels and local storage — we refer to all of these collectively
        as "cookies" in this Policy.
      </p>

      <h2>2. Types of Cookies We Use</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Examples</th>
            <th>Consent required?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Strictly necessary</strong></td>
            <td>Essential for the Website to function correctly. Cannot be disabled.</td>
            <td>Session ID, CSRF token, language preference, theme preference.</td>
            <td>No</td>
          </tr>
          <tr>
            <td><strong>Analytics &amp; performance</strong></td>
            <td>Help us understand how visitors interact with the Website so we can improve it.</td>
            <td>Google Analytics (_ga, _gid), page-view counters.</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><strong>Functional</strong></td>
            <td>Remember your choices to provide a more personalised experience.</td>
            <td>Language selection, dark/light mode, cookie-consent status.</td>
            <td>No (stored locally)</td>
          </tr>
          <tr>
            <td><strong>Marketing &amp; third-party</strong></td>
            <td>Used to deliver relevant advertisements and track conversions across websites.</td>
            <td>LinkedIn Insight Tag, Meta Pixel (if activated).</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Specific Cookies We Set</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cookie_consent</td>
            <td>Black AI</td>
            <td>Stores your cookie consent preference.</td>
            <td>1 year (localStorage)</td>
          </tr>
          <tr>
            <td>theme</td>
            <td>Black AI</td>
            <td>Remembers your light/dark mode preference.</td>
            <td>Persistent (localStorage)</td>
          </tr>
          <tr>
            <td>lang</td>
            <td>Black AI</td>
            <td>Remembers your language preference (en/es).</td>
            <td>Persistent (localStorage)</td>
          </tr>
          <tr>
            <td>_ga</td>
            <td>Google Analytics</td>
            <td>Distinguishes unique users for analytics.</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Google Analytics</td>
            <td>Distinguishes users over a session.</td>
            <td>24 hours</td>
          </tr>
        </tbody>
      </table>

      <h2>4. How to Manage Cookies</h2>
      <p>
        When you first visit our Website, we display a cookie consent banner. You can accept or decline
        non-essential cookies at that point. You can change your preferences at any time by clearing your
        browser's local storage or cookies.
      </p>
      <p>
        You can also control cookies directly through your browser settings. Most browsers allow you to:
      </p>
      <ul>
        <li>View and delete individual cookies.</li>
        <li>Block cookies from specific websites.</li>
        <li>Block third-party cookies entirely.</li>
        <li>Block all cookies (note: this may impair Website functionality).</li>
        <li>Delete cookies when you close your browser.</li>
      </ul>
      <p>For instructions, visit your browser's help documentation:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/en-us/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>
      <p>
        To opt out of Google Analytics specifically, you can use the{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
      </p>

      <h2>5. Third-Party Cookies</h2>
      <p>
        Some cookies are set by third-party services that appear on our pages. We do not control these cookies.
        Please refer to the relevant third-party privacy policies for more information on how they use cookies.
      </p>

      <h2>6. Updates to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other
        operational, legal or regulatory reasons. Please re-visit this page regularly to stay informed.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about our use of cookies, please contact us at{' '}
        <a href="mailto:info@blackai.com">info@blackai.com</a>.
      </p>
    </>
  )
}

function ContentEs() {
  return (
    <>
      <p>
        Esta Política de Cookies explica cómo Black AI, S.L. (<strong>"Black AI"</strong>,{' '}
        <strong>"nosotros"</strong>) utiliza cookies y tecnologías de seguimiento similares en{' '}
        <a href="https://black-ai.com">black-ai.com</a>. Debe leerse junto con nuestra{' '}
        <a href="/privacidad">Política de Privacidad</a>.
      </p>

      <h2>1. ¿Qué Son las Cookies?</h2>
      <p>
        Las cookies son pequeños archivos de texto que se depositan en tu dispositivo (ordenador, smartphone o
        tableta) cuando visitas un sitio web. Permiten que el sitio reconozca tu dispositivo en visitas
        posteriores, recuerde tus preferencias y recopile datos analíticos sobre el uso del sitio.
      </p>
      <p>
        Tecnologías similares incluyen balizas web, píxeles y almacenamiento local. En esta Política nos
        referimos a todas ellas colectivamente como "cookies".
      </p>

      <h2>2. Tipos de Cookies que Utilizamos</h2>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Finalidad</th>
            <th>Ejemplos</th>
            <th>¿Requiere consentimiento?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Estrictamente necesarias</strong></td>
            <td>Imprescindibles para el funcionamiento del Sitio Web. No pueden desactivarse.</td>
            <td>ID de sesión, token CSRF, preferencia de idioma, tema visual.</td>
            <td>No</td>
          </tr>
          <tr>
            <td><strong>Analíticas y de rendimiento</strong></td>
            <td>Nos ayudan a entender cómo interactúan los visitantes con el Sitio para mejorar su funcionamiento.</td>
            <td>Google Analytics (_ga, _gid), contadores de visitas.</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td><strong>Funcionales</strong></td>
            <td>Recuerdan tus preferencias para ofrecer una experiencia más personalizada.</td>
            <td>Selección de idioma, modo oscuro/claro, estado del consentimiento de cookies.</td>
            <td>No (almacenadas localmente)</td>
          </tr>
          <tr>
            <td><strong>Marketing y terceros</strong></td>
            <td>Se utilizan para mostrar anuncios relevantes y rastrear conversiones entre sitios web.</td>
            <td>LinkedIn Insight Tag, Meta Pixel (si está activado).</td>
            <td>Sí</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Cookies Específicas que Utilizamos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Proveedor</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cookie_consent</td>
            <td>Black AI</td>
            <td>Almacena tu preferencia de consentimiento de cookies.</td>
            <td>1 año (localStorage)</td>
          </tr>
          <tr>
            <td>theme</td>
            <td>Black AI</td>
            <td>Recuerda tu preferencia de modo claro/oscuro.</td>
            <td>Persistente (localStorage)</td>
          </tr>
          <tr>
            <td>lang</td>
            <td>Black AI</td>
            <td>Recuerda tu preferencia de idioma (en/es).</td>
            <td>Persistente (localStorage)</td>
          </tr>
          <tr>
            <td>_ga</td>
            <td>Google Analytics</td>
            <td>Distingue usuarios únicos para analítica.</td>
            <td>2 años</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Google Analytics</td>
            <td>Distingue usuarios durante una sesión.</td>
            <td>24 horas</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Cómo Gestionar las Cookies</h2>
      <p>
        Cuando visitas nuestro Sitio Web por primera vez, mostramos un banner de consentimiento de cookies.
        Puedes aceptar o rechazar las cookies no esenciales en ese momento. Puedes cambiar tus preferencias en
        cualquier momento borrando las cookies o el almacenamiento local de tu navegador.
      </p>
      <p>
        También puedes controlar las cookies directamente desde la configuración de tu navegador. La mayoría
        de los navegadores te permiten:
      </p>
      <ul>
        <li>Ver y eliminar cookies individuales.</li>
        <li>Bloquear cookies de sitios web específicos.</li>
        <li>Bloquear las cookies de terceros por completo.</li>
        <li>Bloquear todas las cookies (esto puede afectar a la funcionalidad del Sitio).</li>
        <li>Eliminar las cookies al cerrar el navegador.</li>
      </ul>
      <p>Para más instrucciones, consulta la documentación de ayuda de tu navegador:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>5. Cookies de Terceros</h2>
      <p>
        Algunas cookies son establecidas por servicios de terceros que aparecen en nuestras páginas. No
        controlamos estas cookies. Para más información sobre cómo las utilizan, consulta las políticas de
        privacidad de los terceros correspondientes.
      </p>

      <h2>6. Actualización de esta Política</h2>
      <p>
        Podemos actualizar esta Política de Cookies periódicamente. Te recomendamos que la revises con
        regularidad para mantenerte informado.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Si tienes alguna pregunta sobre nuestro uso de cookies, escríbenos a{' '}
        <a href="mailto:info@blackai.com">info@blackai.com</a>.
      </p>
    </>
  )
}
