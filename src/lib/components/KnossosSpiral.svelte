<script lang="ts">
    import { onMount } from 'svelte';
    import { animate, svg as svgHelpers } from 'animejs';

    let svgElement: SVGSVGElement;

    function animateSpiral() {
        // select all the line and path elements inside the SVG
        const elements = svgElement.querySelectorAll<SVGLineElement|SVGPathElement>('line, path');

        // convert NodeList to Array of drawables
        const drawables = svgHelpers.createDrawable(elements);

        animate(drawables, {
            draw: ['0 0', '0 1'],
            opacity: [0, 1],
            filter: ['brightness(0.2)', 'brightness(1.3)', 'brightness(1)'],
            strokeWidth: [5, 30],
            blur: [1, 0.5, 0],
            easing: 'spring(1, 90, 8, 0)',
            duration: 500,
            delay: (el, i) => i * 50,
            fill: 'forwards'
        });
    }

    onMount(() => {
        animateSpiral()
    });
</script>

<button type="button" title="animate spiral" on:click={animateSpiral}>
    <svg bind:this={svgElement} viewBox="135 135 400 350" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <line transform="rotate(90 333.531 304.613)" stroke="#000" stroke-width="30" id="svg_14" y2="304.61313" x2="363.02501" y1="304.61313" x1="304.03756" fill="none"/>
            <line stroke="#000" stroke-width="30" id="svg_16" y2="289.84319" x2="348.12553" y1="289.84319" x1="268.54986" fill="none"/>
            <line transform="rotate(90 272.456 327.49)" stroke="#000" stroke-width="30" id="svg_18" y2="327.4903" x2="325.18448" y1="327.4903" x1="219.72647" fill="none"/>
            <line stroke="#000" stroke-width="30" id="svg_19" y2="383.96089" x2="398.71389" y1="383.96089" x1="257.37353" fill="none"/>
            <line transform="rotate(90 393.926 308.079)" stroke="#000" stroke-width="30" id="svg_20" y2="308.07862" x2="484.5964" y1="308.07862" x1="303.25604" fill="none"/>
            <line stroke="#000" stroke-width="30" id="svg_21" y2="232.1962" x2="408.714" y1="232.1962" x1="219.13832" fill="none"/>
            <line transform="rotate(90 210.985 323.667)" stroke="#000" stroke-width="30" id="svg_22" y2="323.66675" x2="317.24338" y1="323.66675" x1="104.72653" fill="none"/>
            <line stroke="#000" stroke-width="30" id="svg_23" y2="441.90205" x2="463.12574" y1="441.90205" x1="195.90302" fill="none"/>
            <path transform="rotate(90 455.228 315.257)" id="svg_24" d="m313.67517,316.01456l283.10506,-1.51455" opacity="undefined" stroke-width="30" stroke="#000" fill="none"/>
            <line stroke="#000" stroke-width="30" id="svg_25" y2="173.66678" x2="469.5963" y1="173.66678" x1="195.903" fill="none"/>
        </g>
    </svg>
</button>

<style lang="scss">
  button {
    border: none;
    background: none;
    cursor: default;
    padding: 0;
    margin: 0;
  }

  svg {
      height: 50px;
      display: flex;

    @media (min-width: 768px) {
        height: 120px;
      }
  }

  line, path {
      stroke: #7c3421;
  }
</style>
