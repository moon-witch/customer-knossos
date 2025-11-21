<script lang="ts">
    // Static placeholder content only.
</script>

<svelte:head>
    <title>Disclaimer | Taverna Knossos</title>
    <meta name="description" content="Placeholder disclaimer for Taverna Knossos website." />
</svelte:head>

<main class="disclaimer">
    <section class="disclaimer__intro">
        <h1>Disclaimer (Placeholder)</h1>
        <p class="disclaimer__notice">
            This page contains placeholder legal text intended solely for design and development
            purposes. It does not represent legally valid or complete information and must be
            replaced with a professionally reviewed disclaimer.
        </p>
    </section>

    <section class="disclaimer__section">
        <h2>General Information</h2>
        <p>
            The content of this website has been created with the greatest possible care.
            However, we do not guarantee the accuracy, completeness, or timeliness of the
            information provided. All content is subject to change without notice.
        </p>
    </section>

    <section class="disclaimer__section">
        <h2>Limitation of Liability</h2>
        <p>
            As a service provider, we are responsible for our own content on these pages under
            general laws. However, we are not obligated to monitor transmitted or stored
            third-party information or to investigate circumstances that indicate illegal
            activity. Liability for damages arising from the use or non-use of the information
            provided is excluded, unless the damage was caused intentionally or through gross
            negligence.
        </p>
    </section>

    <section class="disclaimer__section">
        <h2>External Links</h2>
        <p>
            This website may contain links to external third-party websites. We have no influence
            over the content of these external sites and therefore cannot assume any liability
            for such content. Responsibility for the content of linked pages lies solely with the
            respective provider or operator.
        </p>
    </section>

    <section class="disclaimer__section">
        <h2>Technical Availability</h2>
        <p>
            We strive to ensure uninterrupted availability of this website but cannot guarantee
            continuous access. Maintenance, technical issues, or external factors may result in
            temporary disruptions without prior notice.
        </p>
    </section>

    <section class="disclaimer__section">
        <h2>No Legal Advice</h2>
        <p>
            The information presented on this website does not constitute legal, financial, or
            professional advice of any kind. Users remain solely responsible for how they use the
            content provided.
        </p>
    </section>

    <section class="disclaimer__footer">
        <p class="disclaimer__final">
            <strong>Important:</strong> This disclaimer is a placeholder and does not replace a
            legally compliant document. Please consult a qualified legal professional to ensure
            that your disclaimer meets all regulatory requirements applicable to your business.
        </p>
    </section>
</main>

<style lang="scss">
  .disclaimer {
    max-width: 820px;
    margin: 0 auto;
    padding: 4rem 1.5rem 5rem;
    line-height: 1.6;
    color: #222;
    font-size: 0.98rem;
  }

  .disclaimer__intro {
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

  .disclaimer__section {
    margin-bottom: 2.5rem;
  }

  .disclaimer__notice {
    background: #fff3e6;
    border-left: 3px solid #7c3421;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    font-size: 0.95rem;
  }

  .disclaimer__final {
    font-size: 0.9rem;
    opacity: 0.85;
  }

  @media (min-width: 768px) {
    .disclaimer {
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
