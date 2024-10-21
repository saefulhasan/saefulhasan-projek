document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form default

    // Ambil nilai input
    var username = document.querySelector('.input-group input[type="text"]').value;
    var password = document.querySelector('.input-group input[type="password"]').value;

    // Validasi sederhana
    if (username === "" || password === "") {
        alert("Harap isi semua kolom!");
        return; // Hentikan pengiriman form
    }

    // Tampilkan pesan sukses (Anda bisa mengganti dengan logic autentikasi)
    alert("Login Berhasil!");

    // Jika ingin melanjutkan pengiriman form, hapus baris di atas dan uncomment di bawah
    // this.submit();
});
