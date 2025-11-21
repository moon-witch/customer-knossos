<script lang="ts">
    import { _ } from "svelte-i18n";

    let address = $_('findUs.address');
    let phone = $_('findUs.phone');

    let openingHours = [
        { day: $_('findUs.sunday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.monday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.tuesday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.wednesday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.thursday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.friday'), hours: "1 PM – 11 PM" },
        { day: $_('findUs.saturday'), hours: "1 PM – 11 PM" }
    ];

    $: {
        address = $_('findUs.address');
        phone = $_('findUs.phone');
        openingHours = [
            { day: $_('findUs.sunday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.monday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.tuesday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.wednesday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.thursday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.friday'), hours: "1 PM – 11 PM" },
            { day: $_('findUs.saturday'), hours: "1 PM – 11 PM" }
        ]
    }
</script>

<section class="find-us">
    <h2 class="title">{$_('findUs.headline')}</h2>

    <div class="find-us__container">
        <!-- Info Column -->
        <div class="info">
            <div class="block">
                <h3>{$_('findUs.location')}</h3>
                <p>{address}</p>
            </div>

            <div class="block">
                <h3>{$_('findUs.contact')}</h3>
                <p>
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                </p>
            </div>

            <div class="seasonal-notice">
                <strong>{$_('findUs.seasonal.headline')}</strong>
                <p>{$_('findUs.seasonal.info')}</p>
            </div>

            <div class="block">
                <h3>{$_('findUs.openingHours')}</h3>
                <ul>
                    {#each openingHours as entry}
                        <li>
                            <span>{entry.day}</span>
                            <span>{entry.hours}</span>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <!-- Map Column -->
        <div class="map">
            <iframe
                    title="Taverna Knossos location"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d203.54031889186038!2d25.459818525155548!3d35.2899490623366!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149a6556b2aafcdd%3A0x1d9021d672177f66!2sKnossos%20taverna%20Malia!5e0!3m2!1sen!2sus!4v1763734336134!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style="border:0;"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</section>

<style lang="scss">
  .find-us {
    padding: 3rem 2rem;
    background: $background;
  }

  .title {
    text-align: center;
    font-family: 'Gelio Pasteli', sans-serif;
    font-size: 2rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      font-size: 2.4rem;
    }
  }

  .find-us__container {
    max-width: 1100px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1.2fr;
      align-items: center;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .block h3 {
    margin: 0 0 0.4rem;
    font-size: 1.1rem;
    color: #7c3421;
  }

  .block p {
    margin: 0;
    line-height: 1.5;
  }

  .block a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  .block a:hover {
    text-decoration: underline;
  }

  .seasonal-notice {
    background: #fff3e6;
    border-left: 3px solid #7c3421;
    padding: 0.75rem 1rem;
    border-radius: 6px;

    strong {
      display: block;
      margin-bottom: 0.25rem;
      color: #7c3421;
    }

    p {
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.4;
    }
  }


  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(124, 52, 33, 0.15);
    padding: 0.4rem 0;
    font-size: 0.95rem;
  }

  .map iframe {
    width: 100%;
    height: 320px;
    border: none;
    border-radius: 10px;

    @media (min-width: 768px) {
      height: 380px;
    }
  }
</style>
