<script lang="ts">
    import { getContext, onMount } from 'svelte';

    const products: Array<any> = getContext('context');

    //const tabs = Array.from(document.querySelectorAll('.tab'));
    const tabs = Array.from(document.querySelectorAll('.anchor'));
    const panels = Array.from(document.querySelectorAll('.panel'));
    const firstTab = tabs[0];
    const firstPanel = panels[0];

    for (let i = 0; i < products.length; i++) {
        let category = products[i].category.slug;

        const tab = document.getElementById(category);
        const panel = document.getElementById('panel-' + category);
        tab.addEventListener('click', () => {
            //tabs
            tabs.forEach((element) => element.classList.remove('active'));
            tab.classList.add('active');
            tab.setAttribute('href', '#panel-' + category);
            //panels
            panels.forEach((element) => element.classList.remove('active'));
            panel.classList.add('active');
        });
    }

    onMount(() => {
        const setFirstItemActive = () => {
            firstTab.classList.add('active');
            firstPanel.classList.add('active');
        };

        setFirstItemActive();
    });
</script>
