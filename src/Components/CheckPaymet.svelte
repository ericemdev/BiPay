<script>
    let asset = '';
    let address = '';
    let responseMessage = '';
  
    async function checkPayment() {
      try {
        const response = await fetch('http://localhost:3000/api/check-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asset, address })
        });
        const data = await response.json();
        if (response.ok) {
          responseMessage = JSON.stringify(data, null, 2); 
        } else {
          responseMessage = Error: ${data.error};
        }
      } catch (error) {
        responseMessage = 'Error checking payment';
      }
    }
  </script>

  
  <div class="max-w-md mx-auto mt-10 p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-4">Check Payment</h2>
    <div class="mb-4">
      <label class="block mb-2">Asset</label>
      <input type="text" class="w-full p-2 border rounded" bind:value={asset} />
    </div>
    <div class="mb-4">
      <label class="block mb-2">Address</label>
      <input type="text" class="w-full p-2 border rounded" bind:value={address} />
    </div>
    <button class="w-full p-2 bg-blue-500 text-white rounded" on:click={checkPayment}>Check Payment</button>
    {#if responseMessage}
      <pre class="mt-4 bg-gray-100 p-4 rounded">{responseMessage}</pre>
    {/if}
  </div>