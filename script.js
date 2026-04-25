const ctas = document.querySelectorAll('.cta');

ctas.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (button.getAttribute('href') === '#') {
      event.preventDefault();
      alert('Terima kasih! Bahagian pembelian boleh disambungkan ke WhatsApp / checkout anda.');
    }
  });
});
