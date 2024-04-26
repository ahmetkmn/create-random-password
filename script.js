document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.querySelector(".password-box input");
    const generateButton = document.querySelector(".generate-button");
    const copyButton = document.querySelector(".copy-icon");
    const rangeInput = document.querySelector(".range-box input");
    const sliderNumber = document.querySelector(".slider-number");

    // Slider değeri değiştiğinde şifre uzunluğunu güncelleme
    rangeInput.addEventListener("input", function() {
        sliderNumber.textContent = this.value;
        updateSliderStyle();
    });

    // Slider stili güncelleme fonksiyonu
    function updateSliderStyle() {
        const newValue = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100;
        rangeInput.style.background = `linear-gradient(to right, #927dfc 0%, #927dfc ${newValue}%, #f0f0f0 ${newValue}%, #f0f0f0 100%)`;
    }

    // Şifre oluşturma fonksiyonu
    function generatePassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // Generate Password butonu tıklanması
    generateButton.addEventListener("click", function() {
        const passwordLength = rangeInput.value;
        const newPassword = generatePassword(passwordLength);
        passwordInput.value = newPassword;
        // butonuna tıklandığında kopyalama ikonunu yenileme
        resetCopyIcon();
    });

    // Copy iconuna tıklama olayı
    copyButton.addEventListener("click", function() {
        copyPassword();
    });

    // Şifreyi kopyalama fonksiyonu
    function copyPassword() {
        const tempInput = document.createElement("textarea");
        tempInput.value = passwordInput.value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        // Kopyalama ikonunun değişmesi
        copyButton.classList.remove("uil-copy");
        copyButton.classList.add("uil-check");
    }

    // Generate Password butonuna tıkladığımızda kopyalama ikonunu yenilenmesi
    function resetCopyIcon() {
        copyButton.classList.remove("uil-check");
        copyButton.classList.add("uil-copy");
    }

    // Sayfa yüklendiğinde range inputun değişmesi
    updateSliderStyle();
});
