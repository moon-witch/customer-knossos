<script lang="ts">
    // No logic required; static placeholder content.
</script>

<svelte:head>
    <title>Imprint | Taverna Knossos</title>
    <meta name="description" content="Placeholder imprint for Taverna Knossos." />
</svelte:head>

<main class="imprint">
    <section class="imprint__section imprint__section--intro">
        <h1>Imprint (Placeholder)</h1>
        <p class="imprint__note">
            This page is a placeholder imprint for development and design purposes only.
            All information below is dummy content and must be replaced with legally compliant data.
        </p>
    </section>

    <section class="imprint__section">
        <h2>Service Provider</h2>
        <p>
            <strong>Taverna Knossos</strong><br />
            Nikolaou Grammatikaki<br />
            70007 Malia, Crete<br />
            Greece
        </p>
    </section>

    <section class="imprint__section">
        <h2>Contact</h2>
        <p>
            Phone: +30 694 329 1233<br />
            E-mail: info@example.com
        </p>
    </section>

    <section class="imprint__section">
        <h2>Responsible for Content</h2>
        <p>
            Placeholder Name<br />
            (Responsible according to applicable media law – replace with correct legal information.)
        </p>
    </section>

    <section class="imprint__section">
        <h2>EU Online Dispute Resolution</h2>
        <p>
            The European Commission provides a platform for online dispute resolution (OS):<br />
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noreferrer">
                https://ec.europa.eu/consumers/odr
            </a><br />
            Our e-mail address can be found in the contact section above.
        </p>
    </section>

    <section class="imprint__section">
        <h2>Liability for Content</h2>
        <p>
            All texts on this page are placeholders and do not represent binding or legally
            reviewed information. Please replace this paragraph with your own legally verified
            liability notice.
        </p>
    </section>

    <section class="imprint__section">
        <h2>Liability for Links</h2>
        <p>
            This is placeholder text describing liability for external links. In a real imprint,
            you may state that you have no influence on the content of external websites and
            therefore cannot assume liability for such content, and that responsibility lies with
            the respective provider or operator of those websites.
        </p>
    </section>

    <section class="imprint__section">
        <h2>Copyright</h2>
        <p>
            This placeholder section is intended for copyright information (e.g. ownership of
            texts, photos, graphics, and layout). Please insert your own copyright notice and
            usage conditions here.
        </p>
    </section>

    <section class="imprint__section imprint__section--footer">
        <p class="imprint__disclaimer">
            <strong>Important:</strong> This imprint is a non-binding placeholder and does not
            constitute legal advice. Please consult a qualified professional to create a legally
            compliant imprint for your business.
        </p>
    </section>
</main>

<style lang="scss">
  .imprint {
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 1.5rem 5rem;
    font-size: 0.98rem;
    line-height: 1.6;
    color: #222;
  }

  .imprint__section {
    margin-bottom: 2.5rem;
  }

  .imprint__section--intro {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #7c3421;
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
    color: #7c3421;
  }

  .imprint__note {
    font-size: 0.95rem;
    background: #fff3e6;
    border-left: 3px solid #7c3421;
    padding: 0.75rem 1rem;
    border-radius: 4px;
  }

  .imprint__disclaimer {
    font-size: 0.9rem;
    opacity: 0.85;
  }

  a {
    color: #7c3421;
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    .imprint {
      padding: 5rem 2rem 6rem;
      font-size: 1rem;
    }

    h1 {
      font-size: 2.2rem;
    }

    h2 {
      font-size: 1.4rem;
    }
  }
</style>
