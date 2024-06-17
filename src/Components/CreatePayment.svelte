<script>
    import { onMount } from 'svelte';
    let asset = '';
    let amount = '';
    let address = '';
    let responseMessage = '';
  
    async function createPayment() {
      try {
        const response = await fetch('http://localhost:3000/api/create-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asset, amount, address })
        });
        const data = await response.json();
        responseMessage = JSON.stringify(data);
      } catch (error) {
        responseMessage = 'Error creating payment';
      }
    }
  </script>
  
  <div class="max-w-md mx-auto mt-10 p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-4">Create Payment</h2>
    <div class="mb-4">
      <label class="block mb-2">Asset</label>
      <input type="text" class="w-full p-2 border rounded" bind:value={asset} />
    </div>
    <div class="mb-4">
      <label class="block mb-2">Amount</label>
      <input type="number" class="w-full p-2 border rounded" bind:value={amount} />
    </div>
    <div class="mb-4">
      <label class="block mb-2">Address</label>
      <input type="text" class="w-full p-2 border rounded" bind:value={address} />
    </div>
    <button class="w-full p-2 bg-blue-500 text-white rounded" on:click={createPayment}>Create Payment</button>
    {#if responseMessage}
      <p class="mt-4">{responseMessage}</p>
    {/if}
  </div>