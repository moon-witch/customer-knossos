<script lang="ts">
    import { onMount } from 'svelte';

    export let showOverlay = false;

    let pdfjsLib: any = null;
    let pdfDoc: any = null;
    let currentPage = 1;
    let totalPages = 0;
    let canvasEl: HTMLCanvasElement;
    let backgroundImage: string | null = null;

    const pdfPath = '/menu.pdf';

    onMount(async () => {
        if (typeof window === 'undefined') return;

        const mod = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.mjs?url');
        mod.GlobalWorkerOptions.workerSrc = worker.default;
        pdfjsLib = mod;
    });

    export async function openOverlay() {
        showOverlay = true;
        document.body.style.overflow = 'hidden';
        await loadPDF();
    }

    export function closeOverlay() {
        showOverlay = false;
        document.body.style.overflow = '';
        pdfDoc = null;
        currentPage = 1;
        totalPages = 0;
        backgroundImage = null;
    }

    async function loadPDF() {
        if (!pdfjsLib) return;
        try {
            const loadingTask = pdfjsLib.getDocument(pdfPath);
            pdfDoc = await loadingTask.promise;
            totalPages = pdfDoc.numPages;

            // Generate blurred background from first page
            await generateBackground();

            // Render first page normally
            await renderPage(currentPage);
        } catch (err) {
            console.error('PDF load error', err);
        }
    }

    async function generateBackground() {
        if (!pdfDoc) return;
        const page = await pdfDoc.getPage(1);
        const viewport = page.getViewport({ scale: 0.5 });
        const tempCanvas = document.createElement('canvas');
        const context = tempCanvas.getContext('2d');
        tempCanvas.width = viewport.width;
        tempCanvas.height = viewport.height;
        await page.render({ canvasContext: context!, viewport }).promise;
        backgroundImage = tempCanvas.toDataURL('image/png');
    }

    async function renderPage(num: number) {
        if (!pdfDoc || !canvasEl) return;
        const page = await pdfDoc.getPage(num);
        const viewport = page.getViewport({ scale: 1.5 });
        const context = canvasEl.getContext('2d');
        if (!context) return;

        canvasEl.height = viewport.height;
        canvasEl.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport
        }).promise;
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage(currentPage);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    }

    let touchStartX: number | null = null;
    let touchEndX: number | null = null;

    function handleTouchStart(e: TouchEvent) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e: TouchEvent) {
        if (touchStartX === null) return;
        touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) nextPage();
            else prevPage();
        }

        touchStartX = null;
        touchEndX = null;
    }
</script>

{#if showOverlay}
    <div class="overlay" style={backgroundImage ? `--bg-image: url(${backgroundImage});` : ''}>
        <div
                class="overlay-content"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
        >
            <button class="close-btn" on:click={closeOverlay}>✕</button>

            <div class="pdf-container">
                <canvas bind:this={canvasEl}></canvas>
            </div>

            <div class="controls">
                <button on:click={prevPage} disabled={currentPage === 1}>← Prev</button>
                <span class="page-indicator">{currentPage} / {totalPages}</span>
                <button on:click={nextPage} disabled={currentPage === totalPages}>Next →</button>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
  /* Overlay with blurred PDF background */
  .overlay {
    position: fixed;
    inset: 0;
    width: 100dvw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    overflow: hidden;

    /* dynamic PDF background */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--bg-image);
      background-size: cover;
      background-position: center;
      filter: blur(10px) brightness(0.7);
      z-index: 0;
    }

    .overlay-content {
      position: relative;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(6px);
      padding: 1rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 90vw;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      z-index: 1;
    }

    .close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.75rem;
      background: none;
      border: none;
      color: #222;
      font-size: 1.5rem;
      cursor: pointer;
      font-weight: bold;
      z-index: 2;

      &:hover {
        color: #000;
      }
    }

    .pdf-container {
      display: flex;
      justify-content: center;
      overflow: auto;
      max-width: 95%;
      max-height: 80vh;

      canvas {
        max-width: 100%;
        height: auto;
        object-fit: scale-down;
        border-radius: 0.25rem;
        background: transparent;
        margin-top: 30%;

        @media (min-width: 768px) {
          margin-top: 0;
        }
      }
    }

    .controls {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 2;

      button {
        background: $primary;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 0.25rem;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }

      .page-indicator {
        font-size: 1rem;
        color: #333;
        font-weight: 500;
      }
    }

    @media (max-width: 768px) {
      .overlay-content {
        width: 95%;
        height: 100%;
        border-radius: 0;
        padding: 0.5rem;
      }
    }
  }
</style>