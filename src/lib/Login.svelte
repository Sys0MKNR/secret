<script lang="ts">
  import { store } from './store'

  function onSubmit(e) {
    const formData = new FormData(e.target)

    const data: any = {}
    for (let field of formData) {
      const [key, value] = field
      data[key] = value
    }

    store.login(data.password)
  }
</script>

<div class="w-full h-full flex  items-center justify-center just bg-main ">
  <form action="#" method="POST" on:submit|preventDefault={onSubmit}>
    <div class="w-80 flex flex-col items-center justify-center bg-accent p-12">
      <div class="w-full pb-4 text-accent">
        <label for="password" class="sr-only">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="w-full appearance-none rounded bg-main p-4 "
          placeholder="Password"
        />
      </div>
      <div class="w-full text-accent">
        <button class="w-full appearance-none rounded bg-main p-4">Login</button
        >
      </div>
    </div>
  </form>
</div>

<style>
</style>
