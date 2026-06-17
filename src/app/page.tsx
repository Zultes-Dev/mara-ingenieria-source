// app/page.tsx
//
// La página principal es solo un orquestador.
// No contiene lógica ni estilos — solo importa secciones en orden.
// Esto hace que sea trivial reorganizar, agregar o quitar secciones.

import { Navbar }      from '@components/layout/Navbar'
import { Footer }      from '@components/layout/Footer'
import { WhatsAppFloat } from '@components/ui/WhatsAppFloat'
import { Hero }        from '@sections/Hero'
import { TrustBar }    from '@sections/TrustBar'
import { About }       from '@sections/About'
import { Services }    from '@sections/Services'
import { ClientTypes } from '@sections/ClientTypes'
import { Process }     from '@sections/Process'
import { WhyMara }     from '@sections/WhyMara'
import { Coverage }    from '@sections/Coverage'
import { Contact }     from '@sections/Contact'

// Esta página se genera como HTML estático en build time (SSG)
// → Lighthouse score máximo, sin runtime de servidor
export const dynamic = 'force-static'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero        />
        <TrustBar    />
        <About       />
        <Services    />
        <ClientTypes />
        <Process     />
        <WhyMara     />
        <Coverage    />
        <Contact     />
      </main>

      <Footer        />
      <WhatsAppFloat />
    </>
  )
}
