<script lang="ts">
    import { getContext } from 'svelte';
    import MediaQuery from '@lib/svelte/MediaQuery.svelte';
    import { Swiper, SwiperSlide } from 'swiper/svelte';

    //    import 'swiper/swiper.scss';
    //    import 'swiper/components/pagination/pagination.min.css';

    import SwiperCore, { Autoplay, Pagination } from 'swiper/core';

    SwiperCore.use([Autoplay, Pagination]);

    const images: Array<any> = getContext('context');
</script>

<!-- Mobile image slider -->
<MediaQuery query="(max-width: 1023px)" let:matches>
    {#if matches}
        <Swiper
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            class="swiper-dots"
        >
            {#each images as item}
                <SwiperSlide>
                    <img src={item.url} alt={item.alt} />
                </SwiperSlide>
            {/each}
        </Swiper>
    {/if}
</MediaQuery>

<!-- Desktop image block -->
<MediaQuery query="(min-width: 1024px)" let:matches>
    {#if matches}
        <div class="imageblock">
            {#each images.slice(0, 5) as item, i}
                <div class="imageblock-container">
                    {#if i === 0}
                        <img src={item.url + '?fit=crop&w=684&h=450'} alt={item.alt} />
                    {:else}
                        <img src={item.url + '?fit=crop&w=220&h=220'} alt={item.alt} />
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</MediaQuery>
