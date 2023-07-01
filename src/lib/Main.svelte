<script lang="ts">
  import Icon from './icons/Icon.svelte'
  import { IconChevronLeft, IconChevronRight } from './icons/icons'
  import { onMount, onDestroy } from 'svelte'

  import * as THREE from 'three'
  import NET from 'vanta/dist/vanta.net.min'
  import { store } from './store'

  let index = 0
  let canvas
  let vantaEffect

  let statement
  let header

  const unSubStatement = store.subStatement((value) => {
    statement = value
  })

  const unSubHeader = store.subHeader((value) => {
    header = value
  })

  onDestroy(() => {
    unSubHeader()
    unSubStatement()
  })

  onMount(() => {
    vantaEffect = NET({
      el: canvas,
      THREE: THREE,
      color: 0xff3f81,
      backgroundColor: 0xb0816,
      mouseControls: false,
      touchControls: false,
      gyroControls: false
    })
  })

  onDestroy(() => {
    if (vantaEffect) {
      vantaEffect.destroy()
    }
  })

  let active = statement[index]

  $: {
    active = statement[index]
  }

  function changeReason(num: number) {
    const newIndex = index + num

    if (newIndex < 0) {
      index = statement.length - 1
    } else if (newIndex >= statement.length) {
      index = 0
    } else {
      index = newIndex
    }
  }
</script>

<div class="absolute top-0 left-0 z-0 w-screen h-screen" bind:this={canvas}>
  <div
    class="absolute top-0 left-0 z-2 w-screen h-screen flex  flex-col items-center bg-transparent "
  >
    <div class="basis-1/2 flex items-center">
      <h1
        class="text-4xl sm:text-8xl font-extrabold antialiased text-gray-100 text-center"
      >
        {header}
      </h1>
    </div>
    <div class=" flex flex-row w-full sm:w-auto justify-between">
      <div class="pt-8">
        <button class="cursor-pointer" on:click={(e) => changeReason(-1)}>
          <Icon
            class="active:stroke-purple-500 hover:opacity-90"
            data={IconChevronLeft}
            stroke="white"
            width={64}
            height={64}
          />
        </button>
      </div>
      <div class="sm:w-[36rem] flex sm:mx-12 p-8 bg-main rounded">
        <p class="text-2xl break-words sm:text-6xl leading-snug text-accent ">
          {active}
        </p>
      </div>
      <div class="pt-8 ">
        <button class="cursor-pointer" on:click={(e) => changeReason(1)}>
          <Icon
            class="active:stroke-accent hover:opacity-90"
            data={IconChevronRight}
            stroke="white"
            width={64}
            height={64}
          />
        </button>
      </div>
    </div>
  </div>
</div>

<style>
</style>
